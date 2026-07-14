export type CurrencyCode =
  | "USD"
  | "AUD"
  | "IDR"
  | "JPY"
  | "CNY"
  | "INR"
  | "AED"
  | "SAR"
  | "QAR"
  | "EGP"
  | "BRL"
  | "ARS"
  | "CLP"
  | "COP"
  | "MXN"
  | "PEN";

export type CurrencyOption = {
  code: CurrencyCode;
  label: string;
  region: string;
  locale: string;
  zeroDecimal?: boolean;
};

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "USD", label: "US Dollar (USD)", region: "Default", locale: "en-US" },
  { code: "AUD", label: "Australian Dollar (AUD)", region: "Australia", locale: "en-AU" },
  { code: "IDR", label: "Indonesian Rupiah (IDR)", region: "Indonesia", locale: "id-ID", zeroDecimal: true },
  { code: "JPY", label: "Japanese Yen (JPY)", region: "Japan", locale: "ja-JP", zeroDecimal: true },
  { code: "CNY", label: "Chinese Yuan (CNY)", region: "China", locale: "zh-CN" },
  { code: "INR", label: "Indian Rupee (INR)", region: "India", locale: "en-IN" },
  { code: "AED", label: "UAE Dirham (AED)", region: "Middle East", locale: "ar-AE" },
  { code: "SAR", label: "Saudi Riyal (SAR)", region: "Middle East", locale: "ar-SA" },
  { code: "QAR", label: "Qatari Riyal (QAR)", region: "Middle East", locale: "ar-QA" },
  { code: "EGP", label: "Egyptian Pound (EGP)", region: "Middle East", locale: "ar-EG" },
  { code: "BRL", label: "Brazilian Real (BRL)", region: "South America", locale: "pt-BR" },
  { code: "ARS", label: "Argentine Peso (ARS)", region: "South America", locale: "es-AR" },
  { code: "CLP", label: "Chilean Peso (CLP)", region: "South America", locale: "es-CL", zeroDecimal: true },
  { code: "COP", label: "Colombian Peso (COP)", region: "South America", locale: "es-CO", zeroDecimal: true },
  { code: "MXN", label: "Mexican Peso (MXN)", region: "South America", locale: "es-MX" },
  { code: "PEN", label: "Peruvian Sol (PEN)", region: "South America", locale: "es-PE" },
];

export const CURRENCY_REGIONS = [
  "Default",
  "Australia",
  "Indonesia",
  "Japan",
  "China",
  "India",
  "Middle East",
  "South America",
] as const;

/** Fallback mid-market rates if the live converter is unreachable */
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  AUD: 1.53,
  IDR: 16250,
  JPY: 157,
  CNY: 7.25,
  INR: 85.5,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  EGP: 50.5,
  BRL: 5.7,
  ARS: 1050,
  CLP: 950,
  COP: 4150,
  MXN: 19.5,
  PEN: 3.75,
};

const STORAGE_KEY = "regrade_currency_v1";
const RATES_CACHE_KEY = "regrade_fx_rates_v1";
const RATES_TTL_MS = 1000 * 60 * 60 * 12;

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCY_OPTIONS.some((option) => option.code === value);
}

export function getCurrency(code: CurrencyCode): CurrencyOption {
  return CURRENCY_OPTIONS.find((option) => option.code === code) ?? CURRENCY_OPTIONS[0];
}

export function loadSavedCurrency(): CurrencyCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isCurrencyCode(saved)) return saved;
  } catch {
    /* ignore */
  }
  return "USD";
}

export function saveCurrency(code: CurrencyCode) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
}

function readCachedRates(): Record<CurrencyCode, number> | null {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; rates: Record<string, number> };
    if (!parsed?.at || Date.now() - parsed.at > RATES_TTL_MS) return null;
    return mergeRates(parsed.rates);
  } catch {
    return null;
  }
}

function writeCachedRates(rates: Record<string, number>) {
  try {
    localStorage.setItem(
      RATES_CACHE_KEY,
      JSON.stringify({ at: Date.now(), rates })
    );
  } catch {
    /* ignore */
  }
}

function mergeRates(incoming: Record<string, number>): Record<CurrencyCode, number> {
  const next = { ...FALLBACK_RATES };
  for (const option of CURRENCY_OPTIONS) {
    const rate = incoming[option.code];
    if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) {
      next[option.code] = rate;
    }
  }
  next.USD = 1;
  return next;
}

export async function fetchExchangeRates(): Promise<Record<CurrencyCode, number>> {
  const cached = readCachedRates();
  if (cached) return cached;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`fx ${res.status}`);
    const data = (await res.json()) as { result?: string; rates?: Record<string, number> };
    if (data.result !== "success" || !data.rates) throw new Error("fx payload");
    const merged = mergeRates(data.rates);
    writeCachedRates(merged);
    return merged;
  } catch {
    return { ...FALLBACK_RATES };
  }
}

export function convertFromUsd(
  amountUsd: number,
  code: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number {
  const rate = rates[code] ?? FALLBACK_RATES[code] ?? 1;
  const converted = amountUsd * rate;
  const option = getCurrency(code);
  if (option.zeroDecimal) return Math.round(converted);
  return Math.round(converted * 100) / 100;
}

export function formatMoney(
  amountUsd: number,
  code: CurrencyCode,
  rates: Record<CurrencyCode, number>
): string {
  const option = getCurrency(code);
  const value = convertFromUsd(amountUsd, code, rates);
  return new Intl.NumberFormat(option.locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: option.zeroDecimal ? 0 : 2,
    maximumFractionDigits: option.zeroDecimal ? 0 : 2,
  }).format(value);
}
