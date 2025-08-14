import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY } from "../constant/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number | string,
  currency: string,
  locale: string = "en-US",
  fractionDigits?: number
): string => {
  const digits =
    fractionDigits !== undefined
      ? {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }
      : { minimumFractionDigits: 2, maximumFractionDigits: 6 };

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...digits,
  }).format(Number(amount));
};

export const formatMarketCap = (
  marketCap: number,
  currency: string = CURRENCY,
  locale: string = "en-US"
): string => {
  if (marketCap >= 1e12) {
    return `${formatCurrency(marketCap / 1e12, currency, locale, 2)}T`;
  }
  if (marketCap >= 1e9) {
    return `${formatCurrency(marketCap / 1e9, currency, locale, 2)}B`;
  }
  if (marketCap >= 1e6) {
    return `${formatCurrency(marketCap / 1e6, currency, locale, 2)}M`;
  }
  return formatCurrency(marketCap, currency, locale, 0);
};

export const formatCryptoPrice = (price: number) => {
  if (price >= 1) {
    return formatCurrency(price, CURRENCY, "en-US", 2);
  } else if (price >= 0.01) {
    return formatCurrency(price, CURRENCY, "en-US", 4);
  } else {
    return price?.toLocaleString("en-US", {
      minimumFractionDigits: 8,
      maximumFractionDigits: 12,
    });
  }
};
