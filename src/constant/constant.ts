export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const CURRENCY = import.meta.env.VITE_CURRENCY;
export const VALID_EMAIL = import.meta.env.VITE_VALID_EMAIL;
export const VALID_PASSWORD = import.meta.env.VITE_VALID_PASSWORD;

export const timeframeButtons = [
  { key: "1d" as const, label: "1D", value: 1 },
  { key: "7d" as const, label: "7D", value: 7 },
  { key: "30d" as const, label: "1M", value: 30 },
  { key: "1y" as const, label: "1Y", value: 365 },
];
