import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";
import { REGRADE_CONFIG } from "../lib/site-config";
import { cn } from "../lib/utils";
import {
  CURRENCY_OPTIONS,
  CURRENCY_REGIONS,
  FALLBACK_RATES,
  type CurrencyCode,
  fetchExchangeRates,
  formatMoney,
  loadSavedCurrency,
  saveCurrency,
} from "../lib/currency";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

const plans = [
  {
    name: "Free",
    usdAmount: 0,
    period: "forever",
    blurb: "Start here. When you begin using Regrade, you get Plus free for 2 months.",
    featured: false,
    isPro: false,
    isPlus: false,
    badge: "2 months Plus free trial",
    features: [
      "3 marked exams / month",
      "25 Mr Whale messages / month",
      "Manual upload only",
      "Review checklist",
      "Plus trial unlocks when you start",
    ],
  },
  {
    name: "Plus",
    usdAmount: 6.99,
    period: "/ mo",
    blurb: "A serious student’s monthly workload — 2 months Plus free trial when you start.",
    featured: true,
    isPro: false,
    isPlus: true,
    badge: "2 months Plus free trial",
    features: [
      "10 marked exams / month",
      "50 Mr Whale messages / month",
      "Full Review history",
      "Appealing agent",
      "Connectors",
    ],
  },
  {
    name: "Pro",
    usdAmount: 11.99,
    period: "/ mo",
    blurb: "Heavy use, families, and priority runs.",
    featured: false,
    isPro: true,
    isPlus: false,
    badge: `Free for first ${REGRADE_CONFIG.waitlistDisplayMax}`,
    features: [
      "30 marked exams / month",
      "100 Mr Whale messages / month",
      "Auto Mode",
      "Priority processing",
      "Parent / supervisor linking",
    ],
  },
];

export function PricingSection() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    setCurrency(loadSavedCurrency());
    let cancelled = false;
    fetchExchangeRates().then((next) => {
      if (!cancelled) setRates(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const groupedOptions = useMemo(
    () =>
      CURRENCY_REGIONS.map((region) => ({
        region,
        options: CURRENCY_OPTIONS.filter((option) => option.region === region),
      })).filter((group) => group.options.length > 0),
    []
  );

  function onCurrencyChange(next: CurrencyCode) {
    setCurrency(next);
    saveCurrency(next);
  }

  return (
    <section
      id="pricing"
      className="scroll-mt-[120px] border-b border-blue/10 bg-blue-soft py-[clamp(56px,7vw,88px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-blue">
              Pricing · private beta
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              Simple plans. Real limits.
            </h2>
            <div className="mx-auto mt-5 grid max-w-[560px] gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue/30 bg-blue px-4 py-3.5 text-white">
                <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-white/75">
                  When you start
                </p>
                <p className="mt-1 font-display text-[clamp(1.2rem,2.8vw,1.45rem)] font-semibold leading-tight tracking-[-0.02em]">
                  2 months Plus free trial
                </p>
              </div>
              <div className="rounded-2xl border border-blue/20 bg-paper px-4 py-3.5">
                <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-blue">
                  Waitlist offer
                </p>
                <p className="mt-1 font-display text-[clamp(1.2rem,2.8vw,1.45rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  First {REGRADE_CONFIG.waitlistDisplayMax} get Pro free for 1 year
                </p>
              </div>
            </div>

            <div className="mx-auto mt-6 flex max-w-[340px] flex-col items-center gap-2">
              <label
                htmlFor="pricing-currency"
                className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-blue"
              >
                Currency
              </label>
              <div className="relative w-full">
                <select
                  id="pricing-currency"
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                  className="h-12 w-full appearance-none rounded-2xl border border-blue/25 bg-paper px-4 pr-11 text-left font-ui text-[14px] font-semibold text-ink shadow-[0_10px_28px_-18px_rgba(30,79,255,0.45)] outline-none transition-colors focus:border-blue"
                >
                  {groupedOptions.map((group) => (
                    <optgroup key={group.region} label={group.region}>
                      {group.options.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue"
                  aria-hidden
                />
              </div>
              <p className="font-ui text-[12px] text-muted">
                Prices convert from USD · approximate live rates
              </p>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:gap-4">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.05}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-paper p-5 transition-all duration-300 sm:p-5",
                  plan.featured
                    ? "border-blue/40 shadow-[0_14px_36px_-22px_rgba(30,79,255,0.4)] ring-1 ring-blue/20"
                    : "border-black/10 hover:border-blue/30"
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      "mb-2.5 inline-flex w-fit rounded-full px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-[0.08em]",
                      plan.isPlus || plan.featured
                        ? "bg-blue text-white"
                        : "bg-blue-wash text-blue"
                    )}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
                  {plan.name}
                </h3>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                  <span className="font-display text-[clamp(1.45rem,4vw,1.85rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                    {formatMoney(plan.usdAmount, currency, rates)}
                  </span>
                  <span className="font-ui text-[12px] text-muted">{plan.period}</span>
                </p>
                <p className="mt-2.5 text-[13px] leading-snug text-muted">{plan.blurb}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] text-ink-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={REGRADE_CONFIG.webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-5 inline-flex min-h-11 items-center justify-center rounded-xl px-3 py-2.5 text-center font-bold transition-all duration-300",
                    plan.isPro || plan.isPlus
                      ? "btn-pro text-[12px] leading-snug sm:text-[13px]"
                      : "border border-blue/30 bg-paper text-[13px] text-blue hover:bg-blue hover:text-white"
                  )}
                >
                  {plan.isPro
                    ? `Open web app · ${spotsLeft} Pro spots via waitlist`
                    : plan.isPlus
                      ? "Open web app · 2 months Plus free trial"
                      : "Open web app"}
                </a>
                <button
                  type="button"
                  onClick={() => scrollToId("#download")}
                  className="mt-2 inline-flex min-h-9 items-center justify-center rounded-xl px-3 py-2 text-center font-ui text-[12px] font-semibold text-blue transition-colors hover:underline"
                >
                  Download desktop
                </button>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
