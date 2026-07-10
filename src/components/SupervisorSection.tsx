import { Check, Link2, Shield, Sparkles, UsersRound } from "lucide-react";
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
      className="relative scroll-mt-[120px] overflow-hidden border-y border-blue/20 bg-[linear-gradient(165deg,#071433_0%,#0b1a4a_28%,#1236c9_58%,#1e4fff_100%)] py-[clamp(110px,14vw,180px)] text-white"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-white/20 blur-3xl animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#8b6bff]/40 blur-3xl animate-blob-slow"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <div className="mx-auto max-w-[900px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-white sm:text-[14px]">
              <Sparkles className="h-4 w-4" />
              Introducing Supervisor Mode · private beta
            </p>
            <h2 className="mt-8 font-display text-[clamp(3rem,7vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              The biggest add-on yet.
            </h2>
            <p className="mx-auto mt-6 max-w-[640px] text-[clamp(18px,2.2vw,22px)] leading-relaxed text-white/85">
              Support a learner without taking over their account. Consent-first. Scoped sharing.
              Revoke anytime.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="mt-10 inline-flex h-14 items-center rounded-2xl bg-white px-9 text-[16px] font-bold text-[#1236c9] shadow-[0_18px_40px_-12px_rgba(9,9,11,0.45)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Request Supervisor access
            </button>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-14 grid max-w-[980px] gap-5 md:grid-cols-3">
          {points.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="glass-dark h-full rounded-[24px] p-7">
                <item.icon className="h-6 w-6 text-white" />
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.12}>
          <div className="glass-dark mx-auto mt-8 max-w-[980px] rounded-[24px] p-7 sm:p-8">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.1em] text-white/80">
              What Supervisor is not
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                "Not opening a child’s account without consent",
                "Not live class analytics from a student upload",
                "Not automatic emails to teachers",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[14px] text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
