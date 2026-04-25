import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import calculator from "../assets/calculator.png";
import Footer from "../components/Footer";
import { publicApi } from "../api/publicApi";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-transparent border border-[color:var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] text-[color:var(--text)]";
const INPUT_ERROR_CLASS =
  "border-2 border-red-600 focus:ring-red-600 bg-red-50/30";

const DEFAULT_SHIPMENT_TYPES = [
  { key: "air", label: "Air", coreShipmentType: "air", estimatorMode: "CALCULATOR" },
  { key: "sea", label: "Sea", coreShipmentType: "sea", estimatorMode: "CALCULATOR" },
  { key: "d2d", label: "Door-to-Door (D2D)", coreShipmentType: "d2d", estimatorMode: "INTAKE" },
];

const DEFAULT_D2D_FORM = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  goodsDescription: "",
  deliveryPhone: "",
  deliveryAddressLine1: "",
  deliveryState: "",
  deliveryCity: "",
  deliveryPostalCode: "",
  deliveryLandmark: "",
  wantsAccount: false,
  consentAcknowledgement: false,
};

const DEFAULT_D2D_REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "city",
  "country",
  "goodsDescription",
  "deliveryPhone",
  "deliveryAddressLine1",
  "consentAcknowledgement",
];

const RESULT_AUTO_REVERT_MS = 5 * 60 * 1000;
const ERROR_TOAST_DURATION_MS = 20 * 1000;
const DELIVERY_COUNTRY = "Nigeria";
const LOCATIONS_API_BASE_URL = "https://countriesnow.space/api/v0.1";

const KNOWN_FORM_FIELDS = new Set([
  "shipmentType",
  "weightKg",
  "lengthCm",
  "widthCm",
  "heightCm",
  "fullName",
  "email",
  "phone",
  "city",
  "country",
  "goodsDescription",
  "deliveryPhone",
  "deliveryAddressLine1",
  "deliveryState",
  "deliveryCity",
  "deliveryPostalCode",
  "deliveryLandmark",
  "wantsAccount",
  "consentAcknowledgement",
]);

const BACKEND_FIELD_ALIASES = {
  shipment_type: "shipmentType",
  weight_kg: "weightKg",
  length_cm: "lengthCm",
  width_cm: "widthCm",
  height_cm: "heightCm",
  full_name: "fullName",
  goods_description: "goodsDescription",
  delivery_phone: "deliveryPhone",
  delivery_address_line1: "deliveryAddressLine1",
  delivery_state: "deliveryState",
  delivery_city: "deliveryCity",
  delivery_postal_code: "deliveryPostalCode",
  delivery_landmark: "deliveryLandmark",
  "delivery.phone": "deliveryPhone",
  "delivery.addressLine1": "deliveryAddressLine1",
  "delivery.state": "deliveryState",
  "delivery.city": "deliveryCity",
  "delivery.postalCode": "deliveryPostalCode",
  "delivery.landmark": "deliveryLandmark",
  "delivery/phone": "deliveryPhone",
  "delivery/addressLine1": "deliveryAddressLine1",
  "delivery/state": "deliveryState",
  "delivery/city": "deliveryCity",
  "delivery/postalCode": "deliveryPostalCode",
  "delivery/landmark": "deliveryLandmark",
  addressLine1: "deliveryAddressLine1",
  postalCode: "deliveryPostalCode",
  landmark: "deliveryLandmark",
  estimatedWeightKg: "weightKg",
  estimated_weight_kg: "weightKg",
};

const FIELD_LABELS = {
  shipmentType: "shipment type",
  weightKg: "weight",
  lengthCm: "length",
  widthCm: "width",
  heightCm: "height",
  fullName: "full name",
  email: "email",
  phone: "phone number",
  city: "city",
  country: "country",
  goodsDescription: "goods description",
  deliveryPhone: "delivery phone number",
  deliveryAddressLine1: "delivery address",
  deliveryState: "delivery state",
  deliveryCity: "delivery city",
  deliveryPostalCode: "delivery postal code",
  deliveryLandmark: "delivery landmark",
  wantsAccount: "account preference",
  consentAcknowledgement: "consent acknowledgement",
};

const CHARGE_BASIS_LABELS = {
  actual_weight: "Actual Weight",
  volumetric_weight: "Volumetric Weight",
  cbm_converted_to_kg: "CBM Converted to Kg",
  intake_required: "Intake Required",
};

const normalizeShipmentType = (item) => ({
  key: item.key,
  label: item.label || item.key.toUpperCase(),
  coreShipmentType: item.coreShipmentType || item.key,
  estimatorMode: item.estimatorMode || "CALCULATOR",
  intake: item.intake || null,
});

const hasValue = (value) => value !== null && value !== undefined && value !== "";

const formatNumber = (value, fractionDigits = 3) => {
  if (!hasValue(value)) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  });
};

const formatCurrency = (value, currency = "USD") => {
  if (!hasValue(value)) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  return number.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatChargeBasis = (value) => {
  if (!hasValue(value)) return null;
  return CHARGE_BASIS_LABELS[value] || value;
};

const formatShipmentTypeValue = (value) => {
  if (!hasValue(value)) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  if (/^d2d$/i.test(normalized)) return "D2D";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
};

const decodeJsonPointerToken = (token) =>
  token.replace(/~1/g, "/").replace(/~0/g, "~");

const getFieldFromInstancePath = (instancePath) => {
  if (typeof instancePath !== "string") return null;
  const segments = instancePath
    .split("/")
    .filter(Boolean)
    .map(decodeJsonPointerToken);
  if (segments.length === 0) return null;
  if (segments[0] === "delivery" && segments.length > 1) {
    const nestedField = segments[segments.length - 1];
    return `delivery${nestedField.charAt(0).toUpperCase()}${nestedField.slice(1)}`;
  }
  return segments[segments.length - 1];
};

const getFieldFromSchemaPath = (schemaPath) => {
  if (typeof schemaPath !== "string") return null;
  const segments = schemaPath
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean)
    .map(decodeJsonPointerToken);
  if (segments.length === 0) return null;
  if (segments[0] === "delivery" && segments.length > 1) {
    const nestedField = segments[1];
    return `delivery${nestedField.charAt(0).toUpperCase()}${nestedField.slice(1)}`;
  }
  return segments[0];
};

const toSentenceCase = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatFieldList = (fields) => {
  if (fields.length === 0) return "";
  const labels = fields.map((field) => FIELD_LABELS[field] || field);
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
};

const resolveIntakeFieldKey = (fieldConfig) => {
  if (typeof fieldConfig === "string") return fieldConfig;
  if (!fieldConfig || typeof fieldConfig !== "object") return null;
  return fieldConfig.key || fieldConfig.name || fieldConfig.field || null;
};

const getValidationDetailMessage = (validationError, mappedField) => {
  if (!validationError) return null;
  const fieldLabel =
    mappedField === "goodsDescription"
      ? "Description"
      : toSentenceCase(FIELD_LABELS[mappedField] || "This field");
  const keyword = validationError.keyword;
  const params = validationError.params || {};

  if (
    keyword === "too_small" &&
    typeof params.minimum === "number" &&
    params.origin === "string"
  ) {
    return `${fieldLabel} is too short. It must be at least ${params.minimum} characters.`;
  }

  if (keyword === "invalid_type" && params.received === "undefined") {
    return `${fieldLabel} is required.`;
  }

  if (keyword === "invalid_format") {
    if (mappedField === "email") {
      return "Please enter a valid email address.";
    }
    return `${fieldLabel} format is invalid.`;
  }

  return `${fieldLabel} is invalid. Please update it and try again.`;
};

const ShipmentCalculator = () => {
  const [formData, setFormData] = useState({
    shipmentType: DEFAULT_SHIPMENT_TYPES[0].key,
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
  });
  const [d2dForm, setD2dForm] = useState(DEFAULT_D2D_FORM);
  const [result, setResult] = useState(null);
  const [intakeResult, setIntakeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });
  const [nigeriaStates, setNigeriaStates] = useState([]);
  const [deliveryCities, setDeliveryCities] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
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

  const intakeRequiredFields = useMemo(() => {
    const backendRequiredFields = Array.isArray(activeShipmentType?.intake?.requiredFields)
      ? activeShipmentType.intake.requiredFields
      : [];

    const normalized = backendRequiredFields
      .map(resolveIntakeFieldKey)
      .filter(Boolean)
      .map((field) => BACKEND_FIELD_ALIASES[field] || field)
      .filter((field) => KNOWN_FORM_FIELDS.has(field));

    if (normalized.length === 0) {
      return DEFAULT_D2D_REQUIRED_FIELDS;
    }

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
              if (normalized.some((item) => item.key === prev.shipmentType)) {
                return prev;
              }
              return { ...prev, shipmentType: normalized[0].key };
            });
          }
        }
      } finally {
        if (mounted) {
          setTypesLoading(false);
        }
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => {
      resetEstimateToForm();
    }, RESULT_AUTO_REVERT_MS);
    return () => clearTimeout(timer);
  }, [result, resetEstimateToForm]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, ERROR_TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast.visible, toast.message]);

  useEffect(() => {
    if (!isIntakeMode || nigeriaStates.length > 0) return;
    let cancelled = false;

    const loadStates = async () => {
      setStatesLoading(true);
      setLocationLoadError("");
      try {
        const response = await fetch(`${LOCATIONS_API_BASE_URL}/countries/states`);
        if (!response.ok) {
          throw new Error("Unable to load delivery states.");
        }
        const payload = await response.json();
        const nigeria = Array.isArray(payload?.data)
          ? payload.data.find((item) => item?.name === DELIVERY_COUNTRY)
          : null;
        const states = Array.isArray(nigeria?.states)
          ? nigeria.states
              .map((item) => item?.name)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b))
          : [];
        if (!cancelled) {
          setNigeriaStates(states);
        }
      } catch {
        if (!cancelled) {
          setLocationLoadError("Could not load Nigerian states right now.");
        }
      } finally {
        if (!cancelled) {
          setStatesLoading(false);
        }
      }
    };

    loadStates();
    return () => {
      cancelled = true;
    };
  }, [isIntakeMode, nigeriaStates.length]);

  useEffect(() => {
    if (!isIntakeMode) return;
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
        if (!response.ok) {
          throw new Error("Unable to load delivery cities.");
        }
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
        if (!cancelled) {
          setCitiesLoading(false);
        }
      }
    };

    loadCities();
    return () => {
      cancelled = true;
    };
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
    setD2dForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    setToast({
      visible: true,
      message,
    });
  };

  const clearCalculatorInputs = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      weightKg: "",
      lengthCm: "",
      widthCm: "",
      heightCm: "",
    }));
  }, []);

  const resetEstimateToForm = useCallback(() => {
    setResult(null);
    clearCalculatorInputs();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
  }, [clearCalculatorInputs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setToast({ visible: false, message: "" });
    setResult(null);
    setIntakeResult(null);

    const { shipmentType, weightKg, lengthCm, widthCm, heightCm } = formData;

    const allDimensionsProvided = weightKg && lengthCm && widthCm && heightCm;
    const hasSomeDimensions = weightKg || lengthCm || widthCm || heightCm;

    let cbm;
    if (allDimensionsProvided) {
      cbm =
        (Number(lengthCm) * Number(widthCm) * Number(heightCm)) / 1000000;
      if (!Number.isFinite(cbm) || cbm <= 0) {
        showError("Please enter valid dimensions greater than zero.", [
          "lengthCm",
          "widthCm",
          "heightCm",
        ]);
        return;
      }
    } else if (hasSomeDimensions && !isIntakeMode) {
      showError("Please fill in all package dimensions and weight.", [
        "weightKg",
        "lengthCm",
        "widthCm",
        "heightCm",
      ]);
      return;
    }

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
        if (field === "wantsAccount" || field === "consentAcknowledgement") {
          return !intakeFieldValues[field];
        }
        return !String(intakeFieldValues[field] || "").trim();
      });

      if (missingIntakeFields.length > 0) {
        showError(
          `Please fill in ${formatFieldList(missingIntakeFields)}.`,
          missingIntakeFields
        );
        return;
      }

      if (
        isIntakeFieldRequired("goodsDescription") &&
        d2dForm.goodsDescription.trim().length < 3
      ) {
        showError(
          "Description is too short. It must be at least 3 characters.",
          ["goodsDescription"]
        );
        return;
      }

      if (
        isIntakeFieldRequired("consentAcknowledgement") &&
        !d2dForm.consentAcknowledgement
      ) {
        showError("Please acknowledge consent before submitting.", [
          "consentAcknowledgement",
        ]);
        return;
      }
    } else if (!allDimensionsProvided) {
      showError("Please fill in all package dimensions and weight.", [
        ...(!weightKg ? ["weightKg"] : []),
        ...(!lengthCm ? ["lengthCm"] : []),
        ...(!widthCm ? ["widthCm"] : []),
        ...(!heightCm ? ["heightCm"] : []),
      ]);
      return;
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

        if (weightKg) {
          payload.estimatedWeightKg = Number(weightKg);
        }
        if (cbm) {
          payload.estimatedCbm = Number(cbm.toFixed(6));
        }

        const response = await publicApi.submitD2DIntake(payload);
        setIntakeResult(response?.data || null);
        setToast({ visible: false, message: "" });
      } else {
        const response = await publicApi.estimateShipment({
          shipmentType,
          weightKg: Number(weightKg),
          lengthCm: Number(lengthCm),
          widthCm: Number(widthCm),
          heightCm: Number(heightCm),
          cbm: Number(cbm.toFixed(6)),
        });
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
        const mappedField = rawField ? BACKEND_FIELD_ALIASES[rawField] || rawField : null;
        return {
          item,
          mappedField: mappedField && KNOWN_FORM_FIELDS.has(mappedField) ? mappedField : null,
        };
      });

      const backendFields = mappedBackendErrors
        .map((entry) => entry.mappedField)
        .filter(Boolean);
      const primaryValidationMessage = mappedBackendErrors
        .map((entry) => getValidationDetailMessage(entry.item, entry.mappedField))
        .find(Boolean);
      const userFriendlyMessage = primaryValidationMessage
        ? primaryValidationMessage
        : backendFields.length > 0
        ? `We couldn't submit your request yet. Please check ${formatFieldList(
            [...new Set(backendFields)]
          )} and try again.`
        : "We couldn't process your request right now. Please try again in a moment.";

      showError(userFriendlyMessage, backendFields);
    } finally {
      setLoading(false);
    }
  };

  const estimateDetails = result?.estimateDetails || null;
  const estimateInput = estimateDetails?.input || null;
  const estimateCalculation = estimateDetails?.calculation || null;
  const estimatePricing = estimateDetails?.pricing || null;
  const intakeRequest = intakeResult?.intakeRequest || null;
  const intakeDelivery = intakeRequest?.delivery || null;
  const finalEstimateDisplay = formatCurrency(
    result?.estimatedCostUsd ?? estimatePricing?.estimatedCostUsd,
    estimatePricing?.currency || "USD"
  );

  const inputRows = estimateInput
    ? [
        { label: "Shipment Type", value: formatShipmentTypeValue(estimateInput.shipmentType) },
        { label: "Weight Input (kg)", value: formatNumber(estimateInput.weightKgInput) },
        { label: "Length Input (cm)", value: formatNumber(estimateInput.lengthCmInput) },
        { label: "Width Input (cm)", value: formatNumber(estimateInput.widthCmInput) },
        { label: "Height Input (cm)", value: formatNumber(estimateInput.heightCmInput) },
        { label: "CBM Input", value: formatNumber(estimateInput.cbmInput, 6) },
      ].filter((row) => hasValue(row.value))
    : [];

  const calculationRows = estimateCalculation
    ? [
        { label: "Charge Basis", value: formatChargeBasis(estimateCalculation.chargeBasis) },
        { label: "Actual Weight (kg)", value: formatNumber(estimateCalculation.actualWeightKg) },
        { label: "Volumetric Weight (kg)", value: formatNumber(estimateCalculation.volumetricWeightKg) },
        { label: "Chargeable Weight (kg)", value: formatNumber(estimateCalculation.chargeableWeightKg) },
        { label: "CBM Used", value: formatNumber(estimateCalculation.cbmUsed, 6) },
      ].filter((row) => hasValue(row.value))
    : [];

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
              <div className="mt-12 max-sm:mt-8 border border-[color:var(--border)] rounded-lg p-6 max-sm:p-4">
                <h5 className="text-lg font-bold text-[color:var(--text)] mb-4">
                  Door-to-Door Request Submitted
                </h5>
                {intakeResult.ticket?.ticketNumber && (
                  <p className="text-sm text-[color:var(--text)] mb-4">
                    Your D2D request has been submitted successfully. Reference:{" "}
                    <span className="font-semibold">
                      {intakeResult.ticket.ticketNumber}
                    </span>
                    . Our team will review your request and contact you.
                  </p>
                )}
                <div className="space-y-3 text-sm">
                  {intakeResult.ticket?.ticketNumber && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Ticket Number
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeResult.ticket.ticketNumber}
                      </span>
                    </div>
                  )}
                  {intakeResult.ticket?.status && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Ticket Status
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {formatShipmentTypeValue(
                          String(intakeResult.ticket.status).replace(/_/g, " ")
                        )}
                      </span>
                    </div>
                  )}
                  {intakeResult.ticket?.subject && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Subject
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeResult.ticket.subject}
                      </span>
                    </div>
                  )}
                  {intakeRequest?.fullName && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">Full Name</span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeRequest.fullName}
                      </span>
                    </div>
                  )}
                  {intakeRequest?.email && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">Email</span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeRequest.email}
                      </span>
                    </div>
                  )}
                  {intakeRequest?.phone && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">Phone</span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeRequest.phone}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.phone && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery Phone
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeDelivery.phone}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.addressLine1 && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery Address
                      </span>
                      <span className="font-semibold text-[color:var(--text)] text-right">
                        {intakeDelivery.addressLine1}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.city && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery City
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeDelivery.city}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.state && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery State
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeDelivery.state}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.postalCode && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery Postal Code
                      </span>
                      <span className="font-semibold text-[color:var(--text)]">
                        {intakeDelivery.postalCode}
                      </span>
                    </div>
                  )}
                  {intakeDelivery?.landmark && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[color:var(--text-muted)]">
                        Delivery Landmark
                      </span>
                      <span className="font-semibold text-[color:var(--text)] text-right">
                        {intakeDelivery.landmark}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIntakeResult(null);
                      setD2dForm(DEFAULT_D2D_FORM);
                      clearCalculatorInputs();
                    }}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : result ? (
              <div className="mt-12 max-sm:mt-8 border border-[color:var(--border)] rounded-lg p-6 max-sm:p-4">
                <h5 className="text-lg font-bold text-[color:var(--text)] mb-4">
                  Estimate Details
                </h5>

                {finalEstimateDisplay && (
                  <div className="mb-5 rounded-md border border-[color:var(--border)] p-4 bg-white/20">
                    <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                      Approximate Final Price
                    </p>
                    <p className="text-[40px] max-sm:text-[32px] font-extrabold leading-none text-[color:var(--accent)] mt-1">
                      ≈ {finalEstimateDisplay}
                    </p>
                  </div>
                )}

                {inputRows.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                      Input
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-[color:var(--border)] rounded-md overflow-hidden">
                        <thead>
                          <tr className="border-b border-[color:var(--border)] bg-white/20">
                            <th className="text-left px-3 py-2 font-semibold text-[color:var(--text)]">
                              Field
                            </th>
                            <th className="text-right px-3 py-2 font-semibold text-[color:var(--text)]">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {inputRows.map((row) => (
                            <tr
                              key={row.label}
                              className="border-b border-[color:var(--border)] last:border-b-0"
                            >
                              <th
                                scope="row"
                                className="text-left font-medium text-[color:var(--text-muted)] px-3 py-2 pr-4"
                              >
                                {row.label}
                              </th>
                              <td className="text-right font-semibold text-[color:var(--text)] px-3 py-2">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {calculationRows.length > 0 && (
                  <div className="space-y-2 pt-4">
                    <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                      Calculation
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-[color:var(--border)] rounded-md overflow-hidden">
                        <thead>
                          <tr className="border-b border-[color:var(--border)] bg-white/20">
                            <th className="text-left px-3 py-2 font-semibold text-[color:var(--text)]">
                              Field
                            </th>
                            <th className="text-right px-3 py-2 font-semibold text-[color:var(--text)]">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculationRows.map((row) => (
                            <tr
                              key={row.label}
                              className="border-b border-[color:var(--border)] last:border-b-0"
                            >
                              <th
                                scope="row"
                                className="text-left font-medium text-[color:var(--text-muted)] px-3 py-2 pr-4"
                              >
                                {row.label}
                              </th>
                              <td className="text-right font-semibold text-[color:var(--text)] px-3 py-2">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex justify-center pt-6">
                  <button
                    type="button"
                    onClick={resetEstimateToForm}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    Start New Estimate
                  </button>
                </div>
              </div>
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

                {!isIntakeMode && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Weight (kg)<span className="text-red-700">*</span>
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
                          Length (cm)<span className="text-red-700">*</span>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Width (cm)<span className="text-red-700">*</span>
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
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Height (cm)<span className="text-red-700">*</span>
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

                {isIntakeMode && (
                  <div className="mt-8 border border-[color:var(--border)] rounded-lg p-4 space-y-4">
                    <h6 className="font-semibold text-[color:var(--text)]">
                      Door-to-Door Intake Details
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Full Name
                          {isIntakeFieldRequired("fullName") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={d2dForm.fullName}
                          onChange={handleD2DChange}
                          placeholder="Enter full name"
                          className={getInputClass("fullName")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Email
                          {isIntakeFieldRequired("email") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={d2dForm.email}
                          onChange={handleD2DChange}
                          placeholder="Enter email address"
                          className={getInputClass("email")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Phone Number
                          {isIntakeFieldRequired("phone") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={d2dForm.phone}
                          onChange={handleD2DChange}
                          placeholder="Enter phone number"
                          className={getInputClass("phone")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          City
                          {isIntakeFieldRequired("city") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={d2dForm.city}
                          onChange={handleD2DChange}
                          placeholder="Enter city"
                          className={getInputClass("city")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Origin Country
                          {isIntakeFieldRequired("country") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={d2dForm.country}
                          onChange={handleD2DChange}
                          placeholder="Enter origin country"
                          className={getInputClass("country")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery Phone
                          {isIntakeFieldRequired("deliveryPhone") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="deliveryPhone"
                          value={d2dForm.deliveryPhone}
                          onChange={handleD2DChange}
                          placeholder="Enter delivery contact phone"
                          className={getInputClass("deliveryPhone")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery Country
                        </label>
                        <input
                          type="text"
                          value={DELIVERY_COUNTRY}
                          readOnly
                          className={`${INPUT_CLASS} bg-gray-100/70 cursor-not-allowed`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery City
                        </label>
                        <select
                          name="deliveryCity"
                          value={d2dForm.deliveryCity}
                          onChange={handleD2DChange}
                          className={getInputClass("deliveryCity")}
                          disabled={!d2dForm.deliveryState || citiesLoading}
                        >
                          <option value="">
                            {d2dForm.deliveryState
                              ? citiesLoading
                                ? "Loading cities..."
                                : "Select delivery city"
                              : "Select delivery state first"}
                          </option>
                          {deliveryCities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery State
                        </label>
                        <select
                          name="deliveryState"
                          value={d2dForm.deliveryState}
                          onChange={handleD2DChange}
                          className={getInputClass("deliveryState")}
                          disabled={statesLoading}
                        >
                          <option value="">
                            {statesLoading
                              ? "Loading states..."
                              : "Select delivery state"}
                          </option>
                          {nigeriaStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery Postal Code
                        </label>
                        <input
                          type="text"
                          name="deliveryPostalCode"
                          value={d2dForm.deliveryPostalCode}
                          onChange={handleD2DChange}
                          placeholder="Enter postal code"
                          className={getInputClass("deliveryPostalCode")}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery Address Line 1
                          {isIntakeFieldRequired("deliveryAddressLine1") && (
                            <span className="text-red-700">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="deliveryAddressLine1"
                          value={d2dForm.deliveryAddressLine1}
                          onChange={handleD2DChange}
                          placeholder="Enter delivery address"
                          className={getInputClass("deliveryAddressLine1")}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                          Delivery Landmark
                        </label>
                        <input
                          type="text"
                          name="deliveryLandmark"
                          value={d2dForm.deliveryLandmark}
                          onChange={handleD2DChange}
                          placeholder="Enter nearby landmark (optional)"
                          className={getInputClass("deliveryLandmark")}
                        />
                      </div>
                    </div>
                    {locationLoadError && (
                      <p className="text-xs text-red-700">{locationLoadError}</p>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                        Goods Description
                        {isIntakeFieldRequired("goodsDescription") && (
                          <span className="text-red-700">*</span>
                        )}
                      </label>
                      <textarea
                        name="goodsDescription"
                        value={d2dForm.goodsDescription}
                        onChange={handleD2DChange}
                        placeholder="Describe the goods"
                        rows={3}
                        className={getInputClass("goodsDescription")}
                      />
                    </div>
                    <label
                      className={`flex items-center gap-2 text-sm text-[color:var(--text)] rounded-md px-2 py-1 ${
                        fieldErrors.wantsAccount
                          ? "border-2 border-red-600 bg-red-50/30"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="wantsAccount"
                        checked={d2dForm.wantsAccount}
                        onChange={handleD2DChange}
                      />
                      I want to create an account after this request
                    </label>
                    <label
                      className={`flex items-start gap-2 text-sm text-[color:var(--text)] rounded-md px-2 py-1 ${
                        fieldErrors.consentAcknowledgement
                          ? "border-2 border-red-600 bg-red-50/30"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="consentAcknowledgement"
                        checked={d2dForm.consentAcknowledgement}
                        onChange={handleD2DChange}
                        className="mt-1"
                      />
                      I confirm that the information provided is accurate and I
                      consent to be contacted for this shipment request.
                      {isIntakeFieldRequired("consentAcknowledgement") && (
                        <span className="text-red-700">*</span>
                      )}
                    </label>
                  </div>
                )}

                {ratePreview && !isIntakeMode && (
                  <p className="text-xs text-[color:var(--text-muted)] mt-4">
                    {ratePreview.flatRateUsdPerCbm
                      ? `Current flat rate: $${ratePreview.flatRateUsdPerCbm}/CBM`
                      : ratePreview.tiers?.[0]?.rateUsdPerKg
                      ? `Current rate starts at $${ratePreview.tiers[0].rateUsdPerKg}/kg`
                      : "Current pricing table loaded from backend."}
                  </p>
                )}

                <div className="flex justify-center pt-10 max-sm:pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Processing..."
                      : isIntakeMode
                      ? "Submit D2D Request"
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
      <Footer topSpacingClass="mt-10 max-md:mt-8 max-sm:mt-6" />
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,420px)]">
          <div className="rounded-xl border-2 border-red-600 bg-gradient-to-br from-red-50 via-red-50 to-[#fff4ef] shadow-2xl p-4 ring-1 ring-red-200">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold shadow">
                !
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-700">
                  We Couldn&apos;t Submit Your Request
                </p>
                <p className="text-sm text-red-900 mt-1 leading-snug">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToast({ visible: false, message: "" })}
                className="text-red-500 hover:text-red-700 leading-none"
                aria-label="Dismiss error notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentCalculator;
