/**
 * Arabic-locale formatting helpers. Uses the "ar" locale so numbers render in
 * Arabic-Indic numerals (٠١٢٣) — the most native presentation for the platform.
 */

const AR = "ar";

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(AR).format(value);
}

/** Currency formatting. Defaults to Israeli New Shekel (₪), common in Palestine. */
export function formatCurrency(value: number, currency = "ILS"): string {
  return new Intl.NumberFormat(AR, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat(AR, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/** Localized date, e.g. "١٣ يوليو ٢٠٢٦". Accepts an ISO string or Date. */
export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(AR, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
