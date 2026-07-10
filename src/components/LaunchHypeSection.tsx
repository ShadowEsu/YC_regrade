import { GraduationCap, HeartHandshake } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

export function LaunchHypeSection() {
  return (
    <section
      id="launch"
      className="relative overflow-hidden border-y border-blue/10 bg-[linear-gradient(140deg,#e8edff_0%,#f5f8ff_30%,#eef2ff_55%,#e3ecff_80%,#e8edff_100%)] bg-animated-gradient"
    >
      <div
        className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-blue/15 blur-[90px] animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#8b6bff]/15 blur-[90px] animate-blob-slow"
        aria-hidden
      />

      <div className="section-shell relative py-[clamp(56px,8vw,88px)]">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-display text-[15px] font-semibold uppercase tracking-[0.1em] text-blue">
              Hey. Meet Regrade 2.0.
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              Grading has been unaccountable for a century.
              <br />
              <span className="text-gradient-live">We are the layer that fixes it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] font-display text-[clamp(1.25rem,2.6vw,1.6rem)] font-bold leading-[1.4] tracking-[-0.02em] text-ink">
              A student advocate that catches rubric errors and drafts your appeal in 60 seconds.
            </p>
            <p className="mx-auto mt-3 max-w-[560px] text-[17px] leading-[1.65] text-muted">
              Parent Mode that gives families the same clarity. One mission: every grade should be
              explainable, and every student deserves the advocate wealthy students get for free.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="glass animate-breathe inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-ui text-[12px] font-semibold text-ink">
                <GraduationCap className="h-3.5 w-3.5 text-blue" strokeWidth={2.5} />
                For students
              </span>
              <span
                className="glass animate-breathe inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-ui text-[12px] font-semibold text-ink"
                style={{ animationDelay: "-2s" }}
              >
                <HeartHandshake className="h-3.5 w-3.5 text-blue" strokeWidth={2.5} />
                For parents
              </span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <div className="glass mx-auto mt-8 max-w-[700px] rounded-[24px] border-2 border-blue/20 px-8 py-7 text-center shadow-[0_24px_60px_-16px_rgba(30,79,255,0.26)] sm:px-10">
            <p className="font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-[1.3] tracking-[-0.025em] text-ink">
              Built for <span className="text-gradient-live">every grade, K-12 through college.</span>
            </p>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] font-medium leading-[1.65] text-muted">
              Most of the students losing points every day are in middle school and high school —
              and it's their parents doing the fighting. Parent Mode gives them the exact same
              rubric-level advocate that college students get.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
