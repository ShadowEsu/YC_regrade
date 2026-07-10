import { Check, Link2, Shield, Sparkles, UsersRound } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";
import { RegradeLogo } from "./RegradeLogo";

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
      className="relative scroll-mt-[120px] overflow-hidden border-y border-blue/15 bg-[linear-gradient(165deg,#0b1a4a_0%,#1236c9_42%,#1e4fff_72%,#6b8cff_100%)] py-[clamp(96px,12vw,160px)] text-white"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-white/15 blur-3xl animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#8b6bff]/35 blur-3xl animate-blob-slow"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <div className="mx-auto max-w-[860px] rounded-[32px] border border-white/20 bg-white/[0.1] p-8 shadow-[0_40px_100px_-30px_rgba(9,9,11,0.55)] backdrop-blur-xl sm:p-12 md:p-14">
            <div className="flex flex-col items-center text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Supervisor Mode · private beta
              </p>
              <div className="mt-7">
                <RegradeLogo size={72} className="shadow-[0_12px_40px_rgba(9,9,11,0.25)]" />
              </div>
              <h2 className="mt-7 font-display text-[clamp(2.6rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                The biggest add-on yet.
                <br />
                <span className="text-white/95">Support a learner without taking over.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-relaxed text-white/80 sm:text-[19px]">
                Families and educators finally get a real seat beside the student — consent-first,
                scoped sharing, revoke anytime. This is Supervisor Mode.
              </p>
              <button
                type="button"
                onClick={() => scrollToId("#waitlist")}
                className="mt-8 inline-flex h-14 items-center rounded-2xl bg-white px-8 text-[16px] font-bold text-[#1236c9] shadow-[0_18px_40px_-12px_rgba(9,9,11,0.45)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Request Supervisor access
              </button>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {points.map((item) => (
                <div
                  key={item.title}
                  className="h-full rounded-2xl border border-white/20 bg-white/[0.12] p-6"
                >
                  <item.icon className="h-6 w-6 text-white" />
                  <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/75">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-[#0b1a4a]/35 p-6 sm:p-8">
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
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
