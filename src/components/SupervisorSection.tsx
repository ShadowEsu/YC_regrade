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
    body: "Choose what is visible — marked work, Review history, or draft appeals.",
  },
  {
    icon: Link2,
    title: "Revoke anytime",
    body: "Access can be removed by the learner. Audit-friendly and consent-first.",
  },
];

const headlineClass =
  "font-display text-[clamp(2.8rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.045em]";

export function SupervisorSection() {
  return (
    <section
      id="supervisor"
      className="scroll-mt-[120px] border-y border-blue/15 bg-blue-soft py-[clamp(96px,12vw,160px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[920px] text-center">
            <p className="font-ui text-[14px] font-bold uppercase tracking-[0.16em] text-blue sm:text-[15px]">
              Private beta
            </p>
            <h2 className={`mt-5 ${headlineClass}`}>
              <span className="text-gradient-live">Introducing Supervisor Mode</span>
            </h2>
            <p className={`mt-4 ${headlineClass} text-ink`}>The biggest add-on yet.</p>
            <p className="mx-auto mt-6 max-w-[620px] font-ui text-[clamp(17px,2vw,20px)] leading-relaxed text-muted">
              Support a learner without taking over their account. Consent-first. Scoped sharing.
              Revoke anytime.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="btn-pro mt-10 inline-flex h-16 items-center rounded-2xl px-10 text-[18px] font-bold"
            >
              Join waitlist for Supervisor
            </button>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-14 grid max-w-[980px] gap-5 md:grid-cols-3">
          {points.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="h-full rounded-[24px] border border-blue/20 bg-blue-wash p-7">
                <item.icon className="h-6 w-6 text-blue" />
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-[980px] rounded-[24px] border border-blue/20 bg-blue-wash p-7 sm:p-8">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.1em] text-blue">
              What Supervisor is not
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                "Not opening a child’s account without consent",
                "Not live class analytics from a student upload",
                "Not automatic emails to teachers",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.5} />
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
