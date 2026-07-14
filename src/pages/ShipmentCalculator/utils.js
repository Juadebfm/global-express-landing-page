export const INPUT_CLASS =
  "w-full px-4 py-3 bg-transparent border border-[color:var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] text-[color:var(--text)]";
export const INPUT_ERROR_CLASS =
  "border-2 border-red-600 focus:ring-red-600 bg-red-50/30";

export const DEFAULT_SHIPMENT_TYPES = [
  { key: "air", label: "Air", coreShipmentType: "air", estimatorMode: "CALCULATOR" },
  { key: "sea", label: "Sea", coreShipmentType: "sea", estimatorMode: "CALCULATOR" },
  { key: "d2d", label: "Door-to-Door (D2D)", coreShipmentType: "d2d", estimatorMode: "INTAKE" },
];

export const ORIGIN_COUNTRY = "South Korea";
export const ORIGIN_CITY = "Goyang-si";

export const DEFAULT_D2D_FORM = {
  city: ORIGIN_CITY,
  country: ORIGIN_COUNTRY,
  goodsDescription: "",
  deliveryState: "",
  deliveryCity: "",
};

export const DEFAULT_D2D_REQUIRED_FIELDS = [
  "city",
  "country",
  "goodsDescription",
  "deliveryState",
  "deliveryCity",
];

export const RESULT_AUTO_REVERT_MS = 5 * 60 * 1000;
export const ERROR_TOAST_DURATION_MS = 20 * 1000;
export const DELIVERY_COUNTRY = "Nigeria";
export const LOCATIONS_API_BASE_URL = "https://countriesnow.space/api/v0.1";

export const NIGERIA_STATES = [
  { label: "Abia", value: "Abia State" },
  { label: "Adamawa", value: "Adamawa State" },
  { label: "Akwa Ibom", value: "Akwa Ibom State" },
  { label: "Anambra", value: "Anambra State" },
  { label: "Bauchi", value: "Bauchi State" },
  { label: "Bayelsa", value: "Bayelsa State" },
  { label: "Benue", value: "Benue State" },
  { label: "Borno", value: "Borno State" },
  { label: "Cross River", value: "Cross River State" },
  { label: "Delta", value: "Delta State" },
  { label: "Ebonyi", value: "Ebonyi State" },
  { label: "Edo", value: "Edo State" },
  { label: "Ekiti", value: "Ekiti State" },
  { label: "Enugu", value: "Enugu State" },
  { label: "FCT", value: "Federal Capital Territory" },
  { label: "Gombe", value: "Gombe State" },
  { label: "Imo", value: "Imo State" },
  { label: "Jigawa", value: "Jigawa State" },
  { label: "Kaduna", value: "Kaduna State" },
  { label: "Kano", value: "Kano State" },
  { label: "Katsina", value: "Katsina State" },
  { label: "Kebbi", value: "Kebbi State" },
  { label: "Kogi", value: "Kogi State" },
  { label: "Kwara", value: "Kwara State" },
  { label: "Lagos", value: "Lagos State" },
  { label: "Nasarawa", value: "Nasarawa State" },
  { label: "Niger", value: "Niger State" },
  { label: "Ogun", value: "Ogun State" },
  { label: "Ondo", value: "Ondo State" },
  { label: "Osun", value: "Osun State" },
  { label: "Oyo", value: "Oyo State" },
  { label: "Plateau", value: "Plateau State" },
  { label: "Rivers", value: "Rivers State" },
  { label: "Sokoto", value: "Sokoto State" },
  { label: "Taraba", value: "Taraba State" },
  { label: "Yobe", value: "Yobe State" },
  { label: "Zamfara", value: "Zamfara State" },
];

export const KNOWN_FORM_FIELDS = new Set([
  "shipmentType",
  "weightKg",
  "cbm",
  "lengthCm",
  "widthCm",
  "heightCm",
  "city",
  "country",
  "goodsDescription",
  "deliveryState",
  "deliveryCity",
]);

export const BACKEND_FIELD_ALIASES = {
  shipment_type: "shipmentType",
  weight_kg: "weightKg",
  cbm: "cbm",
  cbm_input: "cbm",
  length_cm: "lengthCm",
  width_cm: "widthCm",
  height_cm: "heightCm",
  goods_description: "goodsDescription",
  delivery_state: "deliveryState",
  delivery_city: "deliveryCity",
  "delivery.state": "deliveryState",
  "delivery.city": "deliveryCity",
  "delivery/state": "deliveryState",
  "delivery/city": "deliveryCity",
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
  city: "city",
  country: "country",
  goodsDescription: "goods description",
  deliveryState: "delivery state",
  deliveryCity: "delivery city",
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
