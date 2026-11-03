import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string | undefined | null, currency: string = "USD"): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function formatNumber(val: number | string | undefined | null, decimals: number = 2): string {
  if (val === undefined || val === null || isNaN(Number(val))) return "0";
  return Number(val).toFixed(decimals);
}
