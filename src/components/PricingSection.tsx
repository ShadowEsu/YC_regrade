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
    <section id="pricing" className="scroll-mt-[120px] border-b border-blue/10 bg-blue-soft py-[clamp(72px,10vw,120px)]">
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
            <p className="mx-auto mt-6 max-w-[560px] font-display text-[clamp(1.25rem,2.6vw,1.7rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              First {REGRADE_CONFIG.waitlistDisplayMax} waitlist users get{" "}
              <span className="text-blue">Pro free for 1 year.</span>
            </p>
            <p className="mx-auto mt-3 max-w-[520px] font-ui text-[15px] leading-relaxed text-muted">
              Unused exam credits roll over for 1 month.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.06}>
              <article
                className={cn(
                  "group flex h-full flex-col rounded-[28px] border border-blue/20 bg-blue-wash p-7 transition-all duration-300 sm:p-8",
                  "opacity-70 brightness-95",
                  "hover:z-10 hover:scale-[1.03] hover:border-blue hover:bg-[#e0e8ff] hover:opacity-100 hover:brightness-110 hover:shadow-[0_28px_60px_-20px_rgba(30,79,255,0.4)]",
                  plan.featured && "border-blue/40 opacity-85"
                )}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-blue px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink group-hover:text-blue">
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
                    "mt-8 inline-flex h-14 items-center justify-center rounded-xl px-5 text-[16px] font-bold transition-all duration-300",
                    plan.featured
                      ? "btn-pro"
                      : "border border-blue/30 bg-paper text-blue group-hover:bg-blue group-hover:text-white"
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
