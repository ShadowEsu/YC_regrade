import { Check } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";
import { REGRADE_CONFIG } from "../lib/site-config";
import { cn } from "../lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "Try one essay and one test, or one exam and one recheck.",
    featured: false,
    features: [
      "2 exams / month",
      "25 Mr Whale messages / month",
      "Manual upload only",
      "Study checklist included",
      "No Auto Mode",
    ],
  },
  {
    name: "Student Pack",
    price: "$9.99",
    period: "/ month",
    blurb: "One serious student’s monthly workload — without uploading every homework page.",
    featured: true,
    features: [
      "30 exams / month",
      "300 Mr Whale messages / month",
      "Full Study mode",
      "Full appeal drafting",
      "Connectors",
      "History / library",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/ month",
    blurb: "Meaningfully powerful for heavy use, families, and priority runs.",
    featured: false,
    features: [
      "100 exams / month",
      "600 Mr Whale messages / month",
      "Auto Mode",
      "Priority processing",
      "Parent / supervisor linking",
      "Advanced reports",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-[120px] border-b border-blue/10 bg-paper py-[clamp(72px,10vw,120px)]">
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-blue">
              Pricing · private beta
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
              Simple plans.{" "}
              <span className="text-gradient-live">Real monthly limits.</span>
            </h2>
            <div className="mx-auto mt-6 max-w-[640px] rounded-[20px] border-2 border-blue bg-blue-wash px-5 py-4 sm:px-7 sm:py-5">
              <p className="font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                First {REGRADE_CONFIG.waitlistDisplayMax} waitlist users get{" "}
                <span className="text-blue">Pro free for 1 year.</span>
              </p>
              <p className="mt-2 font-ui text-[15px] text-muted">
                Join early. Lock in Pro before paid launch.
              </p>
            </div>
            <p className="mx-auto mt-5 max-w-[520px] font-ui text-[16px] leading-relaxed text-muted">
              Unused exam credits roll over for 1 month — so limits feel fair without making cost
              unpredictable.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.06}>
              <article
                className={cn(
                  "group flex h-full flex-col rounded-[28px] border bg-white p-7 transition-all duration-300 sm:p-8",
                  "hover:-translate-y-2 hover:border-blue/40 hover:shadow-[0_28px_60px_-24px_rgba(30,79,255,0.35)]",
                  plan.featured
                    ? "border-blue shadow-[0_20px_50px_-24px_rgba(30,79,255,0.4)]"
                    : "border-blue/15 shadow-[0_12px_36px_rgba(30,79,255,0.08)]"
                )}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-blue px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-blue">
                  {plan.name}
                </h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-ink">
                    {plan.price}
                  </span>
                  <span className="font-ui text-[14px] text-muted">{plan.period}</span>
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[15px] text-ink-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => scrollToId("#waitlist")}
                  className={cn(
                    "mt-8 inline-flex h-14 items-center justify-center rounded-xl px-5 text-[16px] font-bold transition-transform duration-300 group-hover:scale-[1.02]",
                    plan.featured
                      ? "btn-pro"
                      : "border border-blue/25 bg-blue-wash text-blue hover:bg-blue hover:text-white"
                  )}
                >
                  Join waitlist
                </button>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
