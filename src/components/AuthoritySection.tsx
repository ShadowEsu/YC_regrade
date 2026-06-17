import { ExternalLink, BookOpen } from "lucide-react";
import { AUTHORITY_REFERENCES } from "../data/site-seo";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

export function AuthoritySection() {
  return (
    <section
      id="resources"
      className="scroll-mt-[120px] border-t border-black/[0.06] bg-white py-[clamp(64px,8vw,96px)] sm:scroll-mt-[132px]"
      aria-labelledby="resources-heading"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Grade appeal resources"
            title="Built on how schools actually handle regrades."
            description="Grade reviews are a standard academic right at universities worldwide. Regrade helps you prepare the evidence those policies require — rubric, syllabus, and graded work in one place."
          />
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <p className="mx-auto mt-6 max-w-[720px] text-center text-[15px] leading-[1.7] text-muted">
            Most institutions require written appeals backed by the original{" "}
            <a
              href="https://en.wikipedia.org/wiki/Rubric_(academic)"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue underline decoration-blue/30 underline-offset-2 transition-colors hover:decoration-blue"
            >
              rubric
            </a>
            , syllabus, and graded assignment. A single missed criterion can affect your entire{" "}
            <a
              href="https://en.wikipedia.org/wiki/Grade_point_average"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue underline decoration-blue/30 underline-offset-2 transition-colors hover:decoration-blue"
            >
              GPA
            </a>
            . Regrade automates that cross-check so you can focus on the appeal itself.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <ul className="mx-auto mt-10 grid max-w-[880px] gap-3 sm:grid-cols-2">
            {AUTHORITY_REFERENCES.map((ref) => (
              <li key={ref.href}>
                <a
                  href={ref.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full gap-4 rounded-xl border border-black/[0.06] bg-cream/50 p-5 transition-colors hover:border-blue/20 hover:bg-blue-soft/40"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue/[0.08] text-blue transition-colors group-hover:bg-blue/[0.12]">
                    <BookOpen className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[15px] font-semibold leading-snug tracking-[-0.02em] text-ink group-hover:text-blue">
                      {ref.title}
                      <ExternalLink
                        className="ml-1.5 inline h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-70"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </p>
                    <p className="mt-1 font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                      {ref.source}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-snug text-muted">{ref.context}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="mx-auto mt-8 max-w-[640px] text-center font-ui text-[13px] leading-relaxed text-faint">
            Regrade is an independent student tool. It is not affiliated with any university or LMS
            provider. Always follow your institution&apos;s official grade appeal policy.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
