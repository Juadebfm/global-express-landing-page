import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import calculator from "../../assets/calculator.png";
import Footer from "../../components/Footer";
import { publicApi } from "../../api/publicApi";
import EstimateResult from "./EstimateResult";
import D2DIntakeForm from "./D2DIntakeForm";
import D2DCompareResult from "./D2DCompareResult";
import ErrorToast from "./ErrorToast";
import {
  INPUT_CLASS,
  INPUT_ERROR_CLASS,
  DEFAULT_SHIPMENT_TYPES,
  DEFAULT_D2D_FORM,
  DEFAULT_D2D_REQUIRED_FIELDS,
  RESULT_AUTO_REVERT_MS,
  ERROR_TOAST_DURATION_MS,
  LOCATIONS_API_BASE_URL,
  DELIVERY_COUNTRY,
  NIGERIA_STATES,
  KNOWN_FORM_FIELDS,
  BACKEND_FIELD_ALIASES,
  normalizeShipmentType,
  hasTextValue,
  parsePositiveNumber,
  formatFieldList,
  getValidationDetailMessage,
  getFieldFromInstancePath,
  getFieldFromSchemaPath,
} from "./utils";

const ShipmentCalculator = () => {
  const [formData, setFormData] = useState({
    shipmentType: DEFAULT_SHIPMENT_TYPES[0].key,
    weightKg: "",
    cbm: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
  });
  const [d2dForm, setD2dForm] = useState(DEFAULT_D2D_FORM);
  const [result, setResult] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [nigeriaStates] = useState(NIGERIA_STATES);
  const [deliveryCities, setDeliveryCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [locationLoadError, setLocationLoadError] = useState("");
  const [shipmentTypes, setShipmentTypes] = useState(DEFAULT_SHIPMENT_TYPES);
  const [typesLoading, setTypesLoading] = useState(true);

  const activeShipmentType = useMemo(
    () =>
      shipmentTypes.find((item) => item.key === formData.shipmentType) ||
      shipmentTypes[0] ||
      DEFAULT_SHIPMENT_TYPES[0],
    [shipmentTypes, formData.shipmentType]
  );

  const shipmentModeKey = String(
    activeShipmentType?.coreShipmentType || activeShipmentType?.key || ""
  ).toLowerCase();
  const isD2DMode = shipmentModeKey === "d2d" || activeShipmentType?.key === "d2d";
  const isAirLikeMode = shipmentModeKey.includes("air");
  const isOceanLikeMode =
    shipmentModeKey.includes("sea") || shipmentModeKey.includes("ocean");
  const derivedCbmPreview = useMemo(() => {
    const parsedLengthCm = parsePositiveNumber(formData.lengthCm);
    const parsedWidthCm = parsePositiveNumber(formData.widthCm);
    const parsedHeightCm = parsePositiveNumber(formData.heightCm);

    if (
      parsedLengthCm === null ||
      parsedWidthCm === null ||
      parsedHeightCm === null
    ) {
      return null;
    }

    const derivedValue =
      (parsedLengthCm * parsedWidthCm * parsedHeightCm) / 1000000;

    if (!Number.isFinite(derivedValue) || derivedValue <= 0) return null;
    return Number(derivedValue.toFixed(6));
  }, [formData.lengthCm, formData.widthCm, formData.heightCm]);
  const cbmInputValue =
    formData.cbm || (derivedCbmPreview !== null ? String(derivedCbmPreview) : "");

  const intakeRequiredFields = useMemo(
    () => (isD2DMode ? DEFAULT_D2D_REQUIRED_FIELDS : []),
    [isD2DMode]
  );

  const isIntakeFieldRequired = (fieldName) =>
    isD2DMode && intakeRequiredFields.includes(fieldName);

  useEffect(() => {
    let mounted = true;

    const loadShipmentTypes = async () => {
      try {
        const response = await publicApi.getShipmentTypes();
        if (!mounted) return;

        const items = response?.data?.items || [];
        if (items.length > 0) {
          const normalized = items.map(normalizeShipmentType);
          setShipmentTypes(normalized);
          setFormData((prev) => {
            if (normalized.some((item) => item.key === prev.shipmentType)) return prev;
            return { ...prev, shipmentType: normalized[0].key };
          });
        }
      } finally {
        if (mounted) setTypesLoading(false);
      }
    };

    loadShipmentTypes();
    return () => {
      mounted = false;
    };
  }, []);

  const clearCalculatorInputs = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      weightKg: "",
      cbm: "",
      lengthCm: "",
      widthCm: "",
      heightCm: "",
    }));
  }, []);

  const resetEstimateToForm = useCallback(() => {
    setResult(null);
    setComparisonResult(null);
    clearCalculatorInputs();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
  }, [clearCalculatorInputs]);

  useEffect(() => {
    if (!result && !comparisonResult) return;
    const timer = setTimeout(resetEstimateToForm, RESULT_AUTO_REVERT_MS);
    return () => clearTimeout(timer);
  }, [result, comparisonResult, resetEstimateToForm]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(
      () => setToast({ visible: false, message: "" }),
      ERROR_TOAST_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, [toast.visible, toast.message]);

  useEffect(() => {
    if (!isD2DMode) return;

    const selectedState = d2dForm.deliveryState.trim();
    if (!selectedState) {
      setDeliveryCities([]);
      setCitiesLoading(false);
      setLocationLoadError("");
      setD2dForm((prev) =>
        prev.deliveryCity ? { ...prev, deliveryCity: "" } : prev
      );
      return;
    }

    let cancelled = false;

    const loadCities = async () => {
      setCitiesLoading(true);
      setLocationLoadError("");
      try {
        const query = new URLSearchParams({
          country: DELIVERY_COUNTRY,
          state: selectedState,
        }).toString();
        const response = await fetch(
          `${LOCATIONS_API_BASE_URL}/countries/state/cities/q?${query}`
        );
        if (!response.ok) throw new Error("Unable to load delivery cities.");

        const payload = await response.json();
        const cities = Array.isArray(payload?.data)
          ? payload.data.filter(Boolean).sort((a, b) => a.localeCompare(b))
          : [];

        if (!cancelled) {
          setDeliveryCities(cities);
          setD2dForm((prev) =>
            prev.deliveryCity && !cities.includes(prev.deliveryCity)
              ? { ...prev, deliveryCity: "" }
              : prev
          );
        }
      } catch {
        if (!cancelled) {
          setDeliveryCities([]);
          setLocationLoadError("Could not load delivery cities for this state.");
        }
      } finally {
        if (!cancelled) setCitiesLoading(false);
      }
    };

    loadCities();
    return () => {
      cancelled = true;
    };
  }, [isD2DMode, d2dForm.deliveryState]);

  const airShipmentType = useMemo(
    () =>
      shipmentTypes.find(
        (item) =>
          item.estimatorMode !== "INTAKE" &&
          String(item.coreShipmentType || item.key).toLowerCase() === "air"
      ) || null,
    [shipmentTypes]
  );

  const oceanShipmentType = useMemo(
    () =>
      shipmentTypes.find(
        (item) =>
          item.estimatorMode !== "INTAKE" &&
          ["ocean", "sea"].includes(
            String(item.coreShipmentType || item.key).toLowerCase()
          )
      ) || null,
    [shipmentTypes]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleD2DChange = (e) => {
    const { name, value } = e.target;
    setD2dForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const getInputClass = (fieldName) =>
    `${INPUT_CLASS} ${fieldErrors[fieldName] ? INPUT_ERROR_CLASS : ""}`;

  const showError = (message, fields = []) => {
    const uniqueFields = [...new Set(fields)].filter((field) =>
      KNOWN_FORM_FIELDS.has(field)
    );
    setFieldErrors(
      uniqueFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    );
    setToast({ visible: true, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
    setResult(null);
    setComparisonResult(null);

    const { shipmentType, weightKg, cbm: cbmInput, lengthCm, widthCm, heightCm } = formData;
    const parsedWeightKg = parsePositiveNumber(weightKg);
    const parsedCbmInput = parsePositiveNumber(cbmInput);
    const parsedLengthCm = parsePositiveNumber(lengthCm);
    const parsedWidthCm = parsePositiveNumber(widthCm);
    const parsedHeightCm = parsePositiveNumber(heightCm);
    const hasSomeDimensions =
      hasTextValue(lengthCm) || hasTextValue(widthCm) || hasTextValue(heightCm);
    const allDimensionsProvided =
      parsedLengthCm !== null &&
      parsedWidthCm !== null &&
      parsedHeightCm !== null;

    let derivedCbm = null;
    if (allDimensionsProvided) {
      derivedCbm =
        (parsedLengthCm * parsedWidthCm * parsedHeightCm) / 1000000;
      if (!Number.isFinite(derivedCbm) || derivedCbm <= 0) {
        showError("Please enter valid dimensions greater than zero.", [
          "lengthCm",
          "widthCm",
          "heightCm",
        ]);
        return;
      }
    } else if (hasSomeDimensions && !parsedCbmInput) {
      showError(
        "Provide all package dimensions or enter CBM directly.",
        ["cbm", "lengthCm", "widthCm", "heightCm"]
      );
      return;
    }

    const resolvedCbm = parsedCbmInput ?? derivedCbm;

    if (isD2DMode) {
      const d2dValues = {
        city: d2dForm.city.trim(),
        country: d2dForm.country.trim(),
        goodsDescription: d2dForm.goodsDescription.trim(),
        deliveryState: d2dForm.deliveryState.trim(),
        deliveryCity: d2dForm.deliveryCity.trim(),
      };

      const missingD2dFields = intakeRequiredFields.filter(
        (field) => !String(d2dValues[field] || "").trim()
      );

      if (missingD2dFields.length > 0) {
        showError(
          `Please fill in ${formatFieldList(missingD2dFields)}.`,
          missingD2dFields
        );
        return;
      }

      if (d2dForm.goodsDescription.trim().length < 3) {
        showError(
          "Description is too short. It must be at least 3 characters.",
          ["goodsDescription"]
        );
        return;
      }

      if (!parsedWeightKg) {
        showError(
          "Weight is required so we can estimate the air delivery option.",
          ["weightKg"]
        );
        return;
      }

      if (!resolvedCbm) {
        showError(
          "Provide CBM or full dimensions so we can estimate the ocean delivery option.",
          ["cbm", "lengthCm", "widthCm", "heightCm"]
        );
        return;
      }

      if (!airShipmentType || !oceanShipmentType) {
        showError(
          "We couldn't load the air and ocean shipment options needed for this comparison."
        );
        return;
      }
    } else {
      if (isAirLikeMode && !parsedWeightKg) {
        showError(
          "Weight is required and must be greater than zero for air shipments.",
          ["weightKg"]
        );
        return;
      }
      if (isOceanLikeMode && !resolvedCbm) {
        showError(
          "For ocean shipments, provide CBM or all three package dimensions.",
          ["cbm", "lengthCm", "widthCm", "heightCm"]
        );
        return;
      }
      if (!isAirLikeMode && !isOceanLikeMode && !parsedWeightKg && !resolvedCbm) {
        showError(
          "Provide either weight or CBM (or full dimensions) to calculate an estimate.",
          ["weightKg", "cbm", "lengthCm", "widthCm", "heightCm"]
        );
        return;
      }
    }

    setLoading(true);
    try {
      if (isD2DMode) {
        const baseEstimatePayload = {};
        if (parsedWeightKg) baseEstimatePayload.weightKg = parsedWeightKg;
        if (allDimensionsProvided) {
          baseEstimatePayload.lengthCm = parsedLengthCm;
          baseEstimatePayload.widthCm = parsedWidthCm;
          baseEstimatePayload.heightCm = parsedHeightCm;
        }
        if (resolvedCbm) {
          baseEstimatePayload.cbm = Number(resolvedCbm.toFixed(6));
        }

        const [airResponse, oceanResponse] = await Promise.all([
          publicApi.estimateShipment({
            shipmentType: airShipmentType.key,
            ...baseEstimatePayload,
          }),
          publicApi.estimateShipment({
            shipmentType: oceanShipmentType.key,
            ...baseEstimatePayload,
          }),
        ]);

        setComparisonResult({
          airResult: airResponse?.data || null,
          oceanResult: oceanResponse?.data || null,
          context: {
            shipmentType: "d2d",
            originCountry: d2dForm.country.trim(),
            originCity: d2dForm.city.trim(),
            deliveryCountry: DELIVERY_COUNTRY,
            deliveryState: d2dForm.deliveryState.trim(),
            deliveryCity: d2dForm.deliveryCity.trim(),
            goodsDescription: d2dForm.goodsDescription.trim(),
            weightKg: parsedWeightKg,
            cbm: resolvedCbm ? Number(resolvedCbm.toFixed(6)) : null,
            dimensionsCm: allDimensionsProvided
              ? {
                  length: parsedLengthCm,
                  width: parsedWidthCm,
                  height: parsedHeightCm,
                }
              : null,
            estimates: {
              air: {
                shipmentType: airShipmentType.key,
                estimatedCostUsd: airResponse?.data?.estimatedCostUsd ?? null,
                estimatedCostNgn: airResponse?.data?.estimatedCostNgn ?? null,
                estimatedTransitDays: airResponse?.data?.estimatedTransitDays ?? null,
              },
              ocean: {
                shipmentType: oceanShipmentType.key,
                estimatedCostUsd: oceanResponse?.data?.estimatedCostUsd ?? null,
                estimatedCostNgn: oceanResponse?.data?.estimatedCostNgn ?? null,
                estimatedTransitDays: oceanResponse?.data?.estimatedTransitDays ?? null,
              },
            },
          },
        });
        setToast({ visible: false, message: "" });
      } else {
        const estimatePayload = { shipmentType };
        if (parsedWeightKg) estimatePayload.weightKg = parsedWeightKg;
        if (allDimensionsProvided) {
          estimatePayload.lengthCm = parsedLengthCm;
          estimatePayload.widthCm = parsedWidthCm;
          estimatePayload.heightCm = parsedHeightCm;
        }
        if (resolvedCbm) estimatePayload.cbm = Number(resolvedCbm.toFixed(6));

        const response = await publicApi.estimateShipment(estimatePayload);
        setResult(response?.data || null);
        setToast({ visible: false, message: "" });
      }
    } catch (err) {
      const responseData = err.response?.data;
      const backendErrors = Array.isArray(responseData?.errors)
        ? responseData.errors
        : [];
      const mappedBackendErrors = backendErrors.map((item) => {
        const rawParamPath = Array.isArray(item?.params?.path)
          ? item.params.path[item.params.path.length - 1]
          : item?.params?.path;
        const rawFieldCandidates = [
          getFieldFromInstancePath(item?.instancePath),
          typeof item?.field === "string" ? item.field : null,
          typeof item?.path === "string"
            ? item.path.replace(/^\//, "").split("/").filter(Boolean).at(-1)
            : null,
          typeof rawParamPath === "string" ? rawParamPath : null,
          getFieldFromSchemaPath(item?.schemaPath),
        ].filter(Boolean);
        const rawField = rawFieldCandidates.find((candidate) => {
          const mapped = BACKEND_FIELD_ALIASES[candidate] || candidate;
          return KNOWN_FORM_FIELDS.has(mapped);
        });
        const mappedField = rawField
          ? BACKEND_FIELD_ALIASES[rawField] || rawField
          : null;
        return {
          item,
          mappedField:
            mappedField && KNOWN_FORM_FIELDS.has(mappedField)
              ? mappedField
              : null,
        };
      });

      const backendFields = mappedBackendErrors
        .map((entry) => entry.mappedField)
        .filter(Boolean);
      const primaryValidationMessage = mappedBackendErrors
        .map((entry) => getValidationDetailMessage(entry.item, entry.mappedField))
        .find(Boolean);
      const backendMessage =
        typeof responseData?.message === "string" ? responseData.message : null;
      const userFriendlyMessage = primaryValidationMessage
        ? primaryValidationMessage
        : backendMessage
          ? backendMessage
          : backendFields.length > 0
            ? `We couldn't submit your request yet. Please check ${formatFieldList([
                ...new Set(backendFields),
              ])} and try again.`
            : "We couldn't process your request right now. Please try again in a moment.";

      showError(userFriendlyMessage, backendFields);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="page-shell pt-24 pb-0 lg:pt-20 max-sm:pt-16">
        <div className="page-frame">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="w-full lg:w-1/2 lg:order-2">
            <div>
              <h4 className="text-[color:var(--accent)] text-[30px] font-bold max-md:text-3xl max-sm:text-2xl">
                Shipment Cost Estimator
              </h4>
              <p className="text-[color:var(--text-muted)] mt-2 max-lg:w-full">
                Check standard freight estimates or compare likely door-to-door
                air and ocean costs before continuing to your dashboard.
              </p>
            </div>

            {comparisonResult ? (
              <D2DCompareResult
                comparisonResult={comparisonResult}
                onReset={() => {
                  setComparisonResult(null);
                  setD2dForm(DEFAULT_D2D_FORM);
                  clearCalculatorInputs();
                  setFieldErrors({});
                  setToast({ visible: false, message: "" });
                }}
              />
            ) : result ? (
              <EstimateResult result={result} onReset={resetEstimateToForm} />
            ) : (
              <form className="mt-12 max-sm:mt-8" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3 text-[color:var(--text)]">
                    Shipment Type<span className="text-red-700">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {shipmentTypes.map((type) => {
                      const isSelected = formData.shipmentType === type.key;
                      return (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              shipmentType: type.key,
                            }))
                          }
                          onFocus={() => {
                            setFieldErrors((prev) => {
                              if (!prev.shipmentType) return prev;
                              const next = { ...prev };
                              delete next.shipmentType;
                              return next;
                            });
                          }}
                          className={`px-5 py-2.5 font-semibold text-sm rounded-lg border transition-colors ${
                            isSelected
                              ? "bg-[color:var(--accent)] text-white border-[color:var(--accent)]"
                              : "bg-transparent text-[color:var(--text)] border-[color:var(--border)]"
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                  {typesLoading && (
                    <p className="text-xs text-[color:var(--text-muted)] mt-2">
                      Loading shipment types...
                    </p>
                  )}
                </div>

                {!isD2DMode && (
                  <>
                    <p className="text-xs text-[color:var(--text-muted)] mb-4">
                      Air shipments require weight. Ocean shipments require CBM or
                      full dimensions (length, width, and height).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Weight (kg)
                          {isAirLikeMode && <span className="text-red-700">*</span>}
                        </label>
                        <input
                          type="number"
                          name="weightKg"
                          value={formData.weightKg}
                          onChange={handleChange}
                          placeholder="Enter weight in kg"
                          className={getInputClass("weightKg")}
                          min="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          CBM
                          {isOceanLikeMode && <span className="text-red-700">*</span>}
                        </label>
                        <input
                          type="number"
                          name="cbm"
                          value={cbmInputValue}
                          onChange={handleChange}
                          placeholder="Enter CBM directly (optional)"
                          className={getInputClass("cbm")}
                          min="0"
                          step="any"
                        />
                        {!formData.cbm && derivedCbmPreview !== null && (
                          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
                            Auto-calculated from dimensions: {derivedCbmPreview} CBM
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Length (cm)
                        </label>
                        <input
                          type="number"
                          name="lengthCm"
                          value={formData.lengthCm}
                          onChange={handleChange}
                          placeholder="Enter length in cm"
                          className={getInputClass("lengthCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Width (cm)
                        </label>
                        <input
                          type="number"
                          name="widthCm"
                          value={formData.widthCm}
                          onChange={handleChange}
                          placeholder="Enter width in cm"
                          className={getInputClass("widthCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          name="heightCm"
                          value={formData.heightCm}
                          onChange={handleChange}
                          placeholder="Enter height in cm"
                          className={getInputClass("heightCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                    </div>
                  </>
                )}

                {isD2DMode && (
                  <>
                    <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 text-sm text-[color:var(--text)]">
                      <p className="font-semibold">How this works</p>
                      <p className="mt-2 text-[color:var(--text-muted)]">
                        Enter your route once, then add the cargo basics we need
                        to estimate both D2D air and D2D ocean side by side.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Weight (kg)<span className="text-red-700">*</span>
                        </label>
                        <input
                          type="number"
                          name="weightKg"
                          value={formData.weightKg}
                          onChange={handleChange}
                          placeholder="Required for the air estimate"
                          className={getInputClass("weightKg")}
                          min="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          CBM<span className="text-red-700">*</span>
                        </label>
                        <input
                          type="number"
                          name="cbm"
                          value={cbmInputValue}
                          onChange={handleChange}
                          placeholder="Or calculate from dimensions below"
                          className={getInputClass("cbm")}
                          min="0"
                          step="any"
                        />
                        {!formData.cbm && derivedCbmPreview !== null && (
                          <p className="mt-2 text-xs text-[color:var(--text-muted)]">
                            Auto-calculated from dimensions: {derivedCbmPreview} CBM
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Length (cm)
                        </label>
                        <input
                          type="number"
                          name="lengthCm"
                          value={formData.lengthCm}
                          onChange={handleChange}
                          placeholder="Length"
                          className={getInputClass("lengthCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Width (cm)
                        </label>
                        <input
                          type="number"
                          name="widthCm"
                          value={formData.widthCm}
                          onChange={handleChange}
                          placeholder="Width"
                          className={getInputClass("widthCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          name="heightCm"
                          value={formData.heightCm}
                          onChange={handleChange}
                          placeholder="Height"
                          className={getInputClass("heightCm")}
                          min="0"
                          step="any"
                        />
                      </div>
                    </div>

                    <D2DIntakeForm
                      d2dForm={d2dForm}
                      handleD2DChange={handleD2DChange}
                      getInputClass={getInputClass}
                      isIntakeFieldRequired={isIntakeFieldRequired}
                      nigeriaStates={nigeriaStates}
                      deliveryCities={deliveryCities}
                      citiesLoading={citiesLoading}
                      locationLoadError={locationLoadError}
                    />
                  </>
                )}

                <div className="flex justify-center pt-4 max-sm:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Processing..."
                      : isD2DMode
                        ? "Compare D2D Options"
                        : "Calculate Estimate"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="w-full lg:w-1/2 lg:order-1">
            <img src={calculator} alt="shipment-calculator" className="w-full" />
          </div>
          </div>
        </div>
      </div>
      <Footer topSpacingClass="mt-10 max-md:mt-8 max-sm:mt-6" />
      <ErrorToast
        toast={toast}
        onDismiss={() => setToast({ visible: false, message: "" })}
      />
    </div>
  );
};

export default ShipmentCalculator;
