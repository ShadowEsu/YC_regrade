import { Eye, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";

const trust = [
  {
    icon: Eye,
    title: "Clear evidence",
    body: "Marks, rubric, and uncertainty stay distinct.",
  },
  {
    icon: ShieldCheck,
    title: "Honest uncertainty",
    body: "Unclear marks are flagged — never invented.",
  },
  {
    icon: LockKeyhole,
    title: "You stay in control",
    body: "You review every draft. Nothing sends itself.",
  },
];

export function TrustSupervisorSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-[120px] border-y border-black/[0.07] bg-cream py-[clamp(64px,8vw,96px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
              Trust
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Evidence first.{" "}
              <span className="text-gradient-live">You decide.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-relaxed text-muted">
              Regrade does not decide if a grade is “fair.” It helps you read what is visible and ask
              a clearer question.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trust.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="hover-lift h-full rounded-2xl border border-black/[0.08] bg-white p-6 text-center">
                <item.icon className="mx-auto h-5 w-5 text-blue" />
                <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.1}>
          <div
            id="supervisor"
            className="mt-12 grid gap-6 overflow-hidden rounded-[24px] bg-ink p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-[0.09em] text-blue-muted">
                <UsersRound className="h-3.5 w-3.5" />
                Supervisor · private beta
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
                Support a learner without taking over.
              </h2>
              <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/65">
                Consent-first. The learner chooses what to share and can revoke anytime.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue px-5 font-ui text-[14px] font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Request access
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
