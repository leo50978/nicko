import { CURRENCY_META, SUPPORTED_CURRENCIES } from "./currencies.js";

const CURRENCY_KEY = "lgov-currency";

export function getCurrency() {
  const stored = window.localStorage.getItem(CURRENCY_KEY);
  return stored && SUPPORTED_CURRENCIES.includes(stored) ? stored : "USD";
}

export function setCurrency(code) {
  const safeCode = SUPPORTED_CURRENCIES.includes(code) ? code : "USD";
  window.localStorage.setItem(CURRENCY_KEY, safeCode);
  return safeCode;
}

export function getSupportedCurrencies() {
  return [...SUPPORTED_CURRENCIES];
}

export function formatMoney(amount, code = getCurrency()) {
  const meta = CURRENCY_META[code] || CURRENCY_META.USD;

  try {
    return new Intl.NumberFormat(meta.locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    return `${meta.symbol}${Number(amount).toFixed(2)}`;
  }
}
