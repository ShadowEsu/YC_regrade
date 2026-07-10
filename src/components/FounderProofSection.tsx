import { SectionReveal } from "./SectionReveal";

const results = [
  {
    label: "What changed",
    value: "Clearer question",
    note: "From a confusing deduction to a specific ask",
  },
  {
    label: "Evidence used",
    value: "Rubric + notes",
    note: "Visible marks kept separate from uncertainty",
  },
  {
    label: "Time to prepare",
    value: "Minutes",
    note: "Same gaps I spent hours finding by hand",
  },
];

export function FounderProofSection() {
  return (
    <section
      id="proof"
      className="scroll-mt-[var(--site-header)] border-b border-black/[0.07] bg-paper py-[clamp(56px,8vw,88px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
              Founder note
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              I built Regrade to turn a confusing mark into a{" "}
              <span className="text-gradient-live">clearer next step</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-[1.65] text-muted">
              One rubric line was counted twice on a final essay. Building the case by hand took
              hours. The same upload through Regrade surfaced the same evidence gaps — with a
              line-by-line read and a draft I could edit before anything went out. Regrade does not
              promise a grade change. It helps you see what is visible and ask a better question.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-10 grid max-w-[720px] gap-3 sm:grid-cols-3">
            {results.map((r) => (
              <div
                key={r.label}
                className="hover-lift rounded-2xl border border-black/[0.08] bg-white p-5 text-center shadow-[0_10px_28px_rgba(9,9,11,0.04)]"
              >
                <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                  {r.label}
                </p>
                <p className="mt-2 font-display text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-[-0.03em] text-ink">
                  {r.value}
                </p>
                <p className="mt-1.5 font-ui text-[13px] text-muted">{r.note}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-[720px] items-center justify-center gap-4 border-t border-black/[0.06] pt-8">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-[12px] font-semibold text-white">
              PS
            </div>
            <div className="text-left">
              <p className="text-[15px] font-semibold text-ink">Preston Susanto</p>
              <p className="text-[14px] text-muted">
                Founder, EECS student · Built from my own marked work, not a placeholder story.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
