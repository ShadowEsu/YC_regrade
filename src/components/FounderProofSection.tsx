import { SectionReveal } from "./SectionReveal";

export function FounderProofSection() {
  return (
    <section
      id="proof"
      className="scroll-mt-[var(--site-header)] border-b border-black/[0.07] bg-paper py-[clamp(56px,7vw,80px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
              Founder note
            </p>
            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.35rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink">
              Built from a confusing mark — not a pitch deck story.
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[16px] leading-[1.65] text-muted">
              One rubric line was counted twice on my essay. Regrade surfaced the same gaps in
              minutes. It does not promise a grade change — it helps you see what is visible.
            </p>
            <div className="mt-8 inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-[12px] font-semibold text-white">
                PS
              </div>
              <div className="text-left">
                <p className="text-[14px] font-semibold text-ink">Preston Susanto</p>
                <p className="text-[13px] text-muted">Founder · EECS student</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
