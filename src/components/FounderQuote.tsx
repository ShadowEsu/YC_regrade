import { SectionReveal } from "./SectionReveal";
import { REGRADE_CONFIG } from "../lib/site-config";
import { Calendar } from "lucide-react";

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
              &ldquo;I built Regrade after losing points on one rubric line that was counted twice.
              Getting those points back took{" "}
              <span className="font-semibold text-blue">four hours</span> of work. It moved my grade.
              Most students never check.{" "}
              <span className="italic text-ink/80">Regrade finds the points in minutes.</span>
              &rdquo;
            </blockquote>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-[13px] font-semibold text-white">
                  PS
                </div>
                <div>
                  <div className="text-[16px] font-semibold text-ink">Preston Susanto</div>
                  <div className="text-[14px] text-muted">Founder · EECS student · Applying to YC W26</div>
                </div>
              </div>
              <a
                href={REGRADE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue/20 bg-blue-soft px-5 py-2.5 font-ui text-[14px] font-semibold text-blue transition-colors hover:border-blue/35 hover:bg-blue/[0.12]"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
                Book an interview
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
