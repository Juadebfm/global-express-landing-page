import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import calculator from "../../assets/calculator.png";
import Footer from "../../components/Footer";
import { publicApi } from "../../api/publicApi";
import { TurnstileWidget } from "../../components/TurnstileWidget";
import IntakeResult from "./IntakeResult";
import EstimateResult from "./EstimateResult";
import D2DIntakeForm from "./D2DIntakeForm";
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
  FIELD_LABELS,
  normalizeShipmentType,
  hasTextValue,
  parsePositiveNumber,
  formatNumber,
  formatFieldList,
  resolveIntakeFieldKey,
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
  const [d2dCaptchaToken, setD2dCaptchaToken] = useState(null);
  const handleD2dCaptchaToken = useCallback((token) => setD2dCaptchaToken(token), []);
  const [result, setResult] = useState(null);
  const [intakeResult, setIntakeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [nigeriaStates] = useState(NIGERIA_STATES);
  const [deliveryCities, setDeliveryCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [locationLoadError, setLocationLoadError] = useState("");
  const [rates, setRates] = useState(null);
  const [shipmentTypes, setShipmentTypes] = useState(DEFAULT_SHIPMENT_TYPES);
  const [typesLoading, setTypesLoading] = useState(true);

  const activeShipmentType = useMemo(
    () =>
      shipmentTypes.find((item) => item.key === formData.shipmentType) ||
      shipmentTypes[0] ||
      DEFAULT_SHIPMENT_TYPES[0],
    [shipmentTypes, formData.shipmentType]
  );

  const isIntakeMode =
    activeShipmentType?.estimatorMode === "INTAKE" ||
    activeShipmentType?.key === "d2d";
  const shipmentModeKey = String(
    activeShipmentType?.coreShipmentType || activeShipmentType?.key || ""
  ).toLowerCase();
  const isAirLikeMode = shipmentModeKey.includes("air");
  const isOceanLikeMode =
    shipmentModeKey.includes("sea") || shipmentModeKey.includes("ocean");

  const intakeRequiredFields = useMemo(() => {
    const backendRequiredFields = Array.isArray(activeShipmentType?.intake?.requiredFields)
      ? activeShipmentType.intake.requiredFields
      : [];

    const normalized = backendRequiredFields
      .map(resolveIntakeFieldKey)
      .filter(Boolean)
      .map((field) => BACKEND_FIELD_ALIASES[field] || field)
      .filter((field) => KNOWN_FORM_FIELDS.has(field));

    if (normalized.length === 0) return DEFAULT_D2D_REQUIRED_FIELDS;
    return [...new Set(normalized)];
  }, [activeShipmentType]);

  const isIntakeFieldRequired = (fieldName) =>
    isIntakeMode && intakeRequiredFields.includes(fieldName);

  const ratePreview = useMemo(() => {
    if (!rates) return null;
    const mode = activeShipmentType?.coreShipmentType || activeShipmentType?.key;
    if (!mode) return null;
    return (
      rates[mode] ||
      (mode === "ocean" ? rates.sea : null) ||
      (mode === "sea" ? rates.ocean : null)
    );
  }, [rates, activeShipmentType]);

  const publicRateCards = useMemo(() => {
    if (!rates || typeof rates !== "object") return [];
    return Object.entries(rates)
      .map(([key, value]) => {
        if (!value || typeof value !== "object") return null;
        return {
          key,
          unit: value.unit || null,
          tiers: Array.isArray(value.tiers) ? value.tiers : [],
          flatRateUsdPerCbm:
            typeof value.flatRateUsdPerCbm === "number" ? value.flatRateUsdPerCbm : null,
        };
      })
      .filter(Boolean);
  }, [rates]);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [ratesResponse, typesResponse] = await Promise.allSettled([
          publicApi.getCalculatorRates(),
          publicApi.getShipmentTypes(),
        ]);
        if (!mounted) return;
        if (ratesResponse.status === "fulfilled") {
          setRates(ratesResponse.value?.data || null);
        }
        if (typesResponse.status === "fulfilled") {
          const items = typesResponse.value?.data?.items || [];
          if (items.length > 0) {
            const normalized = items.map(normalizeShipmentType);
            setShipmentTypes(normalized);
            setFormData((prev) => {
              if (normalized.some((item) => item.key === prev.shipmentType)) return prev;
              return { ...prev, shipmentType: normalized[0].key };
            });
          }
        }
      } finally {
        if (mounted) setTypesLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  const clearCalculatorInputs = useCallback(() => {
    setFormData((prev) => ({ ...prev, weightKg: "", cbm: "", lengthCm: "", widthCm: "", heightCm: "" }));
  }, []);

  const resetEstimateToForm = useCallback(() => {
    setResult(null);
    clearCalculatorInputs();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
  }, [clearCalculatorInputs]);

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(resetEstimateToForm, RESULT_AUTO_REVERT_MS);
    return () => clearTimeout(timer);
  }, [result, resetEstimateToForm]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast({ visible: false, message: "" }), ERROR_TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast.visible, toast.message]);

  useEffect(() => {
    if (!isIntakeMode) return;
    const selectedState = d2dForm.deliveryState.trim();
    if (!selectedState) {
      setDeliveryCities([]);
      setCitiesLoading(false);
      setLocationLoadError("");
      setD2dForm((prev) => prev.deliveryCity ? { ...prev, deliveryCity: "" } : prev);
      return;
    }
    let cancelled = false;
    const loadCities = async () => {
      setCitiesLoading(true);
      setLocationLoadError("");
      try {
        const query = new URLSearchParams({ country: DELIVERY_COUNTRY, state: selectedState }).toString();
        const response = await fetch(`${LOCATIONS_API_BASE_URL}/countries/state/cities/q?${query}`);
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
    return () => { cancelled = true; };
  }, [isIntakeMode, d2dForm.deliveryState]);

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
    const { name, value, type, checked } = e.target;
    setD2dForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    const uniqueFields = [...new Set(fields)].filter((field) => KNOWN_FORM_FIELDS.has(field));
    setFieldErrors(uniqueFields.reduce((acc, field) => { acc[field] = true; return acc; }, {}));
    setToast({ visible: true, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
    setResult(null);
    setIntakeResult(null);

    const { shipmentType, weightKg, cbm: cbmInput, lengthCm, widthCm, heightCm } = formData;
    const parsedWeightKg = parsePositiveNumber(weightKg);
    const parsedCbmInput = parsePositiveNumber(cbmInput);
    const parsedLengthCm = parsePositiveNumber(lengthCm);
    const parsedWidthCm = parsePositiveNumber(widthCm);
    const parsedHeightCm = parsePositiveNumber(heightCm);
    const hasSomeDimensions = hasTextValue(lengthCm) || hasTextValue(widthCm) || hasTextValue(heightCm);
    const allDimensionsProvided = parsedLengthCm !== null && parsedWidthCm !== null && parsedHeightCm !== null;

    let derivedCbm = null;
    if (allDimensionsProvided) {
      derivedCbm = (parsedLengthCm * parsedWidthCm * parsedHeightCm) / 1000000;
      if (!Number.isFinite(derivedCbm) || derivedCbm <= 0) {
        showError("Please enter valid dimensions greater than zero.", ["lengthCm", "widthCm", "heightCm"]);
        return;
      }
    } else if (hasSomeDimensions && !parsedCbmInput) {
      showError("Provide all package dimensions or enter CBM directly.", ["cbm", "lengthCm", "widthCm", "heightCm"]);
      return;
    }

    const resolvedCbm = parsedCbmInput ?? derivedCbm;

    if (isIntakeMode) {
      const intakeFieldValues = {
        fullName: d2dForm.fullName.trim(),
        email: d2dForm.email.trim(),
        phone: d2dForm.phone.trim(),
        city: d2dForm.city.trim(),
        country: d2dForm.country.trim(),
        goodsDescription: d2dForm.goodsDescription.trim(),
        deliveryPhone: d2dForm.deliveryPhone.trim(),
        deliveryAddressLine1: d2dForm.deliveryAddressLine1.trim(),
        deliveryState: d2dForm.deliveryState.trim(),
        deliveryCity: d2dForm.deliveryCity.trim(),
        deliveryPostalCode: d2dForm.deliveryPostalCode.trim(),
        deliveryLandmark: d2dForm.deliveryLandmark.trim(),
        wantsAccount: d2dForm.wantsAccount,
        consentAcknowledgement: d2dForm.consentAcknowledgement,
      };

      const missingIntakeFields = intakeRequiredFields.filter((field) => {
        if (field === "wantsAccount" || field === "consentAcknowledgement") return !intakeFieldValues[field];
        return !String(intakeFieldValues[field] || "").trim();
      });

      if (missingIntakeFields.length > 0) {
        showError(`Please fill in ${formatFieldList(missingIntakeFields)}.`, missingIntakeFields);
        return;
      }

      if (isIntakeFieldRequired("goodsDescription") && d2dForm.goodsDescription.trim().length < 3) {
        showError("Description is too short. It must be at least 3 characters.", ["goodsDescription"]);
        return;
      }

      if (isIntakeFieldRequired("consentAcknowledgement") && !d2dForm.consentAcknowledgement) {
        showError("Please acknowledge consent before submitting.", ["consentAcknowledgement"]);
        return;
      }
    } else {
      if (isAirLikeMode && !parsedWeightKg) {
        showError("Weight is required and must be greater than zero for air shipments.", ["weightKg"]);
        return;
      }
      if (isOceanLikeMode && !resolvedCbm) {
        showError("For ocean shipments, provide CBM or all three package dimensions.", ["cbm", "lengthCm", "widthCm", "heightCm"]);
        return;
      }
      if (!isAirLikeMode && !isOceanLikeMode && !parsedWeightKg && !resolvedCbm) {
        showError("Provide either weight or CBM (or full dimensions) to calculate an estimate.", ["weightKg", "cbm", "lengthCm", "widthCm", "heightCm"]);
        return;
      }
    }

    setLoading(true);
    try {
      if (isIntakeMode) {
        const payload = {
          fullName: d2dForm.fullName.trim(),
          email: d2dForm.email.trim(),
          phone: d2dForm.phone.trim(),
          city: d2dForm.city.trim(),
          country: d2dForm.country.trim(),
          goodsDescription: d2dForm.goodsDescription.trim(),
          deliveryPhone: d2dForm.deliveryPhone.trim(),
          deliveryAddressLine1: d2dForm.deliveryAddressLine1.trim(),
          deliveryState: d2dForm.deliveryState.trim() || "",
          deliveryCity: d2dForm.deliveryCity.trim() || "",
          deliveryPostalCode: d2dForm.deliveryPostalCode.trim() || "",
          deliveryLandmark: d2dForm.deliveryLandmark.trim() || "",
          wantsAccount: d2dForm.wantsAccount,
          consentAcknowledgement: d2dForm.consentAcknowledgement,
        };
        if (parsedWeightKg) payload.estimatedWeightKg = parsedWeightKg;
        if (resolvedCbm) payload.estimatedCbm = Number(resolvedCbm.toFixed(6));

        const response = await publicApi.submitD2DIntake(payload, d2dCaptchaToken);
        setIntakeResult(response?.data || null);
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
      const backendErrors = Array.isArray(responseData?.errors) ? responseData.errors : [];
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
        const mappedField = rawField ? BACKEND_FIELD_ALIASES[rawField] || rawField : null;
        return {
          item,
          mappedField: mappedField && KNOWN_FORM_FIELDS.has(mappedField) ? mappedField : null,
        };
      });

      const backendFields = mappedBackendErrors.map((entry) => entry.mappedField).filter(Boolean);
      const primaryValidationMessage = mappedBackendErrors
        .map((entry) => getValidationDetailMessage(entry.item, entry.mappedField))
        .find(Boolean);
      const backendMessage = typeof responseData?.message === "string" ? responseData.message : null;
      const userFriendlyMessage = primaryValidationMessage
        ? primaryValidationMessage
        : backendMessage
        ? backendMessage
        : backendFields.length > 0
        ? `We couldn't submit your request yet. Please check ${formatFieldList([...new Set(backendFields)])} and try again.`
        : "We couldn't process your request right now. Please try again in a moment.";

      showError(userFriendlyMessage, backendFields);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 lg:pt-20 max-sm:pt-16 px-4 sm:px-8 lg:px-16 pb-0">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-1/2 lg:order-2">
            <div>
              <h4 className="text-[color:var(--accent)] text-[30px] font-bold max-md:text-3xl max-sm:text-2xl">
                Shipment Cost Estimator
              </h4>
              <p className="text-[color:var(--text-muted)] mt-2 max-lg:w-full">
                Check cost estimates for standard shipments or submit an
                assisted request for door-to-door delivery.
              </p>
            </div>

            {intakeResult ? (
              <IntakeResult
                intakeResult={intakeResult}
                onReset={() => {
                  setIntakeResult(null);
                  setD2dForm(DEFAULT_D2D_FORM);
                  clearCalculatorInputs();
                }}
              />
            ) : result ? (
              <EstimateResult result={result} onReset={resetEstimateToForm} />
            ) : (
              <form className="mt-12 max-sm:mt-8" onSubmit={handleSubmit}>
                {/* Shipment type selector */}
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
                          onClick={() => setFormData((prev) => ({ ...prev, shipmentType: type.key }))}
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

                {/* Air/Sea calculator fields */}
                {!isIntakeMode && (
                  <>
                    <p className="text-xs text-[color:var(--text-muted)] mb-4">
                      Air shipments require weight. Ocean shipments require CBM or full
                      dimensions (length, width, and height).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Weight (kg){isAirLikeMode && <span className="text-red-700">*</span>}
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
                          CBM{isOceanLikeMode && <span className="text-red-700">*</span>}
                        </label>
                        <input
                          type="number"
                          name="cbm"
                          value={formData.cbm}
                          onChange={handleChange}
                          placeholder="Enter CBM directly (optional)"
                          className={getInputClass("cbm")}
                          min="0"
                          step="any"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Length (cm)
                        </label>
                        <input type="number" name="lengthCm" value={formData.lengthCm} onChange={handleChange} placeholder="Enter length in cm" className={getInputClass("lengthCm")} min="0" step="any" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Width (cm)
                        </label>
                        <input type="number" name="widthCm" value={formData.widthCm} onChange={handleChange} placeholder="Enter width in cm" className={getInputClass("widthCm")} min="0" step="any" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Height (cm)
                        </label>
                        <input type="number" name="heightCm" value={formData.heightCm} onChange={handleChange} placeholder="Enter height in cm" className={getInputClass("heightCm")} min="0" step="any" />
                      </div>
                    </div>
                  </>
                )}

                {/* D2D intake form fields */}
                {isIntakeMode && (
                  <D2DIntakeForm
                    d2dForm={d2dForm}
                    handleD2DChange={handleD2DChange}
                    getInputClass={getInputClass}
                    isIntakeFieldRequired={isIntakeFieldRequired}
                    nigeriaStates={nigeriaStates}
                    deliveryCities={deliveryCities}
                    citiesLoading={citiesLoading}
                    locationLoadError={locationLoadError}
                    fieldErrors={fieldErrors}
                  />
                )}

                {/* Rate preview cards (air/sea only) */}
                {!isIntakeMode && (
                  <div className="mt-4 space-y-3">
                    {ratePreview && (
                      <p className="text-xs text-[color:var(--text-muted)]">
                        {ratePreview.flatRateUsdPerCbm
                          ? `Current flat rate: $${ratePreview.flatRateUsdPerCbm}/CBM`
                          : ratePreview.tiers?.[0]?.rateUsdPerKg
                          ? `Current rate starts at $${ratePreview.tiers[0].rateUsdPerKg}/kg`
                          : "Current pricing table loaded from backend."}
                      </p>
                    )}
                    {publicRateCards.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {publicRateCards.map((card) => (
                          <div key={card.key} className="rounded-lg border border-[color:var(--border)] p-3 bg-white/20">
                            <p className="text-sm font-semibold text-[color:var(--text)]">
                              {card.key.charAt(0).toUpperCase() + card.key.slice(1).toLowerCase()}
                            </p>
                            {card.unit && (
                              <p className="text-xs text-[color:var(--text-muted)] mt-1">Unit: {card.unit}</p>
                            )}
                            {card.flatRateUsdPerCbm !== null && (
                              <p className="text-sm mt-2 text-[color:var(--text)]">
                                Flat Rate: ${formatNumber(card.flatRateUsdPerCbm, 2)} / CBM
                              </p>
                            )}
                            {card.tiers.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {card.tiers.map((tier, index) => (
                                  <p key={`${card.key}-tier-${index}`} className="text-xs">
                                    {formatNumber(tier.minKg, 2)}kg to{" "}
                                    {tier.maxKg != null ? `${formatNumber(tier.maxKg, 2)}kg` : "above"}: $
                                    {formatNumber(tier.rateUsdPerKg, 2)} / kg
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {isIntakeMode && (
                  <div className="flex justify-center pt-6">
                    <TurnstileWidget onToken={handleD2dCaptchaToken} />
                  </div>
                )}
                <div className="flex justify-center pt-4 max-sm:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : isIntakeMode ? "Submit D2D Request" : "Calculate Estimate"}
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
      <Footer topSpacingClass="mt-10 max-md:mt-8 max-sm:mt-6" />
      <ErrorToast toast={toast} onDismiss={() => setToast({ visible: false, message: "" })} />
    </div>
  );
};

export default ShipmentCalculator;
