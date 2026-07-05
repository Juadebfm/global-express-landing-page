export const INPUT_CLASS =
  "w-full px-4 py-3 bg-transparent border border-[color:var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] text-[color:var(--text)]";
export const INPUT_ERROR_CLASS =
  "border-2 border-red-600 focus:ring-red-600 bg-red-50/30";

export const DEFAULT_SHIPMENT_TYPES = [
  { key: "air", label: "Air", coreShipmentType: "air", estimatorMode: "CALCULATOR" },
  { key: "sea", label: "Sea", coreShipmentType: "sea", estimatorMode: "CALCULATOR" },
  { key: "d2d", label: "Door-to-Door (D2D)", coreShipmentType: "d2d", estimatorMode: "INTAKE" },
];

export const DEFAULT_D2D_FORM = {
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

export const DEFAULT_D2D_REQUIRED_FIELDS = [
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

export const RESULT_AUTO_REVERT_MS = 5 * 60 * 1000;
export const ERROR_TOAST_DURATION_MS = 20 * 1000;
export const DELIVERY_COUNTRY = "Nigeria";
export const LOCATIONS_API_BASE_URL = "https://countriesnow.space/api/v0.1";

export const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export const KNOWN_FORM_FIELDS = new Set([
  "shipmentType",
  "weightKg",
  "cbm",
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

export const BACKEND_FIELD_ALIASES = {
  shipment_type: "shipmentType",
  weight_kg: "weightKg",
  cbm: "cbm",
  cbm_input: "cbm",
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
  estimatedCbm: "cbm",
  estimated_cbm: "cbm",
};

export const FIELD_LABELS = {
  shipmentType: "shipment type",
  weightKg: "weight",
  cbm: "cbm",
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

export const CHARGE_BASIS_LABELS = {
  actual_weight: "Actual Weight",
  volumetric_weight: "Volumetric Weight",
  cbm_converted_to_kg: "CBM Converted to Kg",
  intake_required: "Intake Required",
};

export const normalizeShipmentType = (item) => ({
  key: item.key,
  label: item.label || item.key.toUpperCase(),
  coreShipmentType: item.coreShipmentType || item.key,
  estimatorMode: item.estimatorMode || "CALCULATOR",
  intake: item.intake || null,
});

export const hasValue = (value) => value !== null && value !== undefined && value !== "";
export const hasTextValue = (value) => String(value ?? "").trim().length > 0;
export const parsePositiveNumber = (value) => {
  if (!hasTextValue(value)) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const formatNumber = (value, fractionDigits = 3) => {
  if (!hasValue(value)) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  });
};

export const formatCurrency = (value, currency = "USD") => {
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

export const formatChargeBasis = (value) => {
  if (!hasValue(value)) return null;
  return CHARGE_BASIS_LABELS[value] || value;
};

export const formatShipmentTypeValue = (value) => {
  if (!hasValue(value)) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  if (/^d2d$/i.test(normalized)) return "D2D";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
};

const decodeJsonPointerToken = (token) =>
  token.replace(/~1/g, "/").replace(/~0/g, "~");

export const getFieldFromInstancePath = (instancePath) => {
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

export const getFieldFromSchemaPath = (schemaPath) => {
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

export const formatFieldList = (fields) => {
  if (fields.length === 0) return "";
  const labels = fields.map((field) => FIELD_LABELS[field] || field);
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
};

export const resolveIntakeFieldKey = (fieldConfig) => {
  if (typeof fieldConfig === "string") return fieldConfig;
  if (!fieldConfig || typeof fieldConfig !== "object") return null;
  return fieldConfig.key || fieldConfig.name || fieldConfig.field || null;
};

export const getValidationDetailMessage = (validationError, mappedField) => {
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
