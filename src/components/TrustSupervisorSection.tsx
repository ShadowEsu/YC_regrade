import { Eye, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";

const trust = [
  {
    icon: Eye,
    title: "Clear evidence",
    body: "Visible marks, rubric support, and uncertainty stay distinct.",
  },
  {
    icon: ShieldCheck,
    title: "Honest uncertainty",
    body: "Unclear handwriting and incomplete feedback are flagged, never invented.",
  },
  {
    icon: LockKeyhole,
    title: "You stay in control",
    body: "You review every draft. Regrade never sends anything for you.",
  },
];

export function TrustSupervisorSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-[120px] border-y border-black/[0.07] bg-cream py-[clamp(72px,9vw,116px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
              Trust, not theatrics
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink">
              Clear evidence. Honest uncertainty.{" "}
              <span className="text-gradient-live">You stay in control.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Regrade does not decide whether a grade is “fair.” It helps you read the marked work,
              identify what is visible, and ask a clearer question. You review every draft before it
              goes anywhere.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trust.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="hover-lift h-full rounded-2xl border border-black/[0.08] bg-white p-6">
                <item.icon className="h-5 w-5 text-blue" />
                <h3 className="mt-8 text-[18px] font-semibold tracking-[-0.02em] text-ink">
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
            className="mt-14 grid gap-7 overflow-hidden rounded-[24px] bg-[#0d1d42] p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-[0.09em] text-blue-200">
                <UsersRound className="h-3.5 w-3.5" />
                Supervisor · private beta
              </div>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                Support a learner without taking over their account.
              </h2>
              <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-white/70">
                For a parent, educator, or advocate helping a student. The learner accepts access,
                chooses what to share, and can revoke it at any time. Institution analytics and class
                reports require authorized gradebook connections — never inferred from a student
                upload.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 font-ui text-[14px] font-bold text-ink transition-transform hover:scale-[1.02]"
            >
              Request Supervisor access
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
