import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY } from "../constant/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  price: number,
  currency: string,
  locale: string = "en-US"
): string => {
  let fractionDigits: number;

  if (price >= 1) {
    fractionDigits = 2;
  } else if (price >= 0.01) {
    fractionDigits = 4;
  } else {
    return price.toLocaleString(locale, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 12,
    });
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(price);
};

export const formatMarketCap = (
  marketCap: number,
  currency: string = CURRENCY,
  locale: string = "en-US"
): string => {
  if (marketCap >= 1e12) {
    return `${formatCurrency(marketCap / 1e12, currency, locale)}T`;
  }
  if (marketCap >= 1e9) {
    return `${formatCurrency(marketCap / 1e9, currency, locale)}B`;
  }
  if (marketCap >= 1e6) {
    return `${formatCurrency(marketCap / 1e6, currency, locale)}M`;
  }
  return formatCurrency(marketCap, currency, locale);
};
