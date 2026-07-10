import { Check, Link2, Shield, UsersRound } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";

const points = [
  {
    icon: UsersRound,
    title: "Invitation, not takeover",
    body: "A parent or educator invites. The learner accepts before anything is shared.",
  },
  {
    icon: Shield,
    title: "Selected sharing scopes",
    body: "Choose what is visible — marked work, Study checklist, or draft appeals.",
  },
  {
    icon: Link2,
    title: "Revoke anytime",
    body: "Access can be removed by the learner. Audit-friendly and consent-first.",
  },
];

export function SupervisorSection() {
  return (
    <section
      id="supervisor"
      className="scroll-mt-[120px] border-y border-black/[0.07] bg-ink py-[clamp(72px,9vw,112px)] text-white"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-[#ffb08a]">
              Supervisor · private beta
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              Support a learner without{" "}
              <span className="text-gradient-live">taking over their account.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/65">
              A big addition for families and educators. Supervisor Mode is built for helping —
              never for bypassing the student.
            </p>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-12 grid max-w-[960px] gap-4 md:grid-cols-3">
          {points.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                <item.icon className="h-5 w-5 text-[#ffb08a]" />
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.12}>
          <div className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.1em] text-[#ffb08a]">
              What Supervisor is not
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Not a way to open a child’s account without consent",
                "Not live class analytics from a student upload",
                "Not automatic emails to teachers",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[15px] text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb08a]" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="btn-pro mt-7 inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-bold"
            >
              Request Supervisor access
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
