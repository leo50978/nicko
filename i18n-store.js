import fr from "./fr.js";

const LOCALE = "fr";
const DICTIONARY = fr;
const listeners = new Set();

function getValue(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function getLocale() {
  return LOCALE;
}

export function setLocale() {
  document.documentElement.lang = LOCALE;
  listeners.forEach((listener) => listener(LOCALE));
  return LOCALE;
}

export function t(key, params = {}) {
  const direct = getValue(DICTIONARY, key);
  const nested = direct !== undefined ? direct : getValue(DICTIONARY, `labels.${key}`);
  const value = nested !== undefined ? nested : key;

  if (typeof value !== "string") {
    return value;
  }

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) => result.replaceAll(`{${paramKey}}`, String(paramValue)),
    value
  );
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSupportedLocales() {
  return [LOCALE];
}
