const ROUTE_NOT_FOUND_PATTERN = /route\s+(get|post|put|patch|delete)\s*:/i;
const CANNOT_METHOD_PATTERN = /cannot\s+(get|post|put|patch|delete)\s+/i;
const HTML_RESPONSE_PATTERN = /^\s*<!doctype html/i;

export const extractRawApiError = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "";

const isSafeUserMessage = (message) => {
  if (typeof message !== "string") return false;

  const normalized = message.trim();
  if (!normalized) return false;
  if (ROUTE_NOT_FOUND_PATTERN.test(normalized)) return false;
  if (CANNOT_METHOD_PATTERN.test(normalized)) return false;
  if (HTML_RESPONSE_PATTERN.test(normalized)) return false;

  return true;
};

export const getUserFacingApiError = (error, fallbackMessage) => {
  const message = extractRawApiError(error);
  return isSafeUserMessage(message) ? message : fallbackMessage;
};
