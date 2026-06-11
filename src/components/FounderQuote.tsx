import { SectionReveal } from "./SectionReveal";

export function FounderQuote() {
  return (
    <section className="section-cream border-t border-black/[0.05] py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <div className="relative mx-auto max-w-[780px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-8 py-10 sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(30,79,255,0.1)_0%,transparent_70%)]"
              aria-hidden
            />
            <div className="absolute left-0 top-0 h-full w-1 bg-blue" aria-hidden />

            <p className="mb-6 text-[14px] font-semibold uppercase tracking-[0.1em] text-blue">
              From the founder
            </p>
            <blockquote className="relative font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-medium leading-[1.5] tracking-[-0.02em] text-ink">
              &ldquo;I built Regrade after losing points to a rubric line that was applied twice.
              The regrade request took{" "}
              <span className="font-semibold text-blue">four hours</span> to write. It worked — and
              it should not take four hours. Most students accept the grade.{" "}
              <span className="italic text-ink/80">Regrade exists so they do not have to.</span>
              &rdquo;
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-[13px] font-semibold text-white">
                PS
              </div>
              <div>
                <div className="text-[16px] font-semibold text-ink">Preston Susanto</div>
                <div className="text-[14px] text-muted">Founder · EECS student · Applying to YC W26</div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
