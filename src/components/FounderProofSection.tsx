import { SectionReveal } from "./SectionReveal";

const results = [
  { label: "Essay score", before: "82", after: "91", note: "B− → A− on one assignment" },
  { label: "Semester GPA", before: "3.4", after: "3.6", note: "After one regrade request" },
  { label: "Time spent", before: "4 hrs", after: "8 min", note: "Manual check vs. Regrade" },
];

export function FounderProofSection() {
  return (
    <section
      id="proof"
      className="scroll-mt-[var(--site-header)] border-y border-black/[0.05] bg-[linear-gradient(150deg,var(--color-paper)_0%,var(--color-blue-wash)_60%,var(--color-paper)_100%)] py-[clamp(56px,8vw,88px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[720px]">
            <p className="mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
              Real result · Founder&apos;s own grade
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              I used Regrade on <span className="text-gradient-live">my own work</span> before shipping it.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-muted">
              One rubric line was counted twice on a final essay. I spent four hours building the
              case by hand. Same upload through Regrade took eight minutes and surfaced the same
              gaps — with a line-by-line breakdown and a draft email ready to send.{" "}
              <a
                href="#resources"
                className="font-medium text-blue underline decoration-blue/30 underline-offset-2 transition-colors hover:decoration-blue"
              >
                See how universities handle grade appeals
              </a>
              .
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-10 grid max-w-[720px] gap-3 sm:grid-cols-3">
            {results.map((r) => (
              <div key={r.label} className="card-pro p-5 text-center">
                <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                  {r.label}
                </p>
                <p className="mt-2 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]">
                  <span className="text-ink">{r.before}</span>
                  <span className="mx-2 text-faint">→</span>
                  <span className="text-blue">{r.after}</span>
                </p>
                <p className="mt-1.5 font-ui text-[13px] text-muted">{r.note}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-[720px] items-center gap-4 border-t border-black/[0.06] pt-8">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-[12px] font-semibold text-white">
              PS
            </div>
            <div className="text-left">
              <p className="text-[15px] font-semibold text-ink">Preston Susanto</p>
              <p className="text-[14px] text-muted">
                Founder, EECS student · These are my actual numbers, not a placeholder quote.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
