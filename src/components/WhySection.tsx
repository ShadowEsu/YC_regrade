import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";

const cards = [
  {
    when: "Before you submit",
    title: "Writing tools",
    body: "Grammar checkers, AI detectors, tutors. They help you write — not once the grade is in.",
    featured: false,
  },
  {
    when: "While it's graded",
    title: "Grading platforms",
    body: "Gradescope, Turnitin, LMS rubrics. Built for instructors. You are the subject, not the user.",
    featured: false,
  },
  {
    when: "After grades drop",
    title: "Regrade",
    body: "The only tool on your side after the grade comes back. It checks the grading, not your writing.",
    featured: true,
  },
];

export function WhySection() {
  return (
    <section
      id="why"
      className="section-paper scroll-mt-[100px] border-y border-black/[0.05] py-[clamp(80px,10vw,128px)] sm:scroll-mt-[108px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="The gap"
            title={
              <>
                Every tool grades you.
                <br />
                <span className="text-muted">Nothing defends you.</span>
              </>
            }
            description="Writing assistants help before you submit. Grading platforms work for professors. Once the grade is posted, you are on your own."
          />
        </SectionReveal>

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-[9px] hidden h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent md:block"
            aria-hidden
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {cards.map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.06}>
                <div className="relative md:pt-0">
                  <div
                    className={cn(
                      "mb-6 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full ring-[5px] ring-paper",
                      c.featured ? "bg-blue" : "bg-black/[0.12]"
                    )}
                    aria-hidden
                  >
                    {c.featured && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  <p
                    className={cn(
                      "mb-2 font-ui text-[11px] font-semibold uppercase tracking-[0.12em]",
                      c.featured ? "text-blue" : "text-faint"
                    )}
                  >
                    {c.when}
                  </p>
                  <h3
                    className={cn(
                      "mb-3 font-display text-[20px] font-semibold tracking-[-0.02em]",
                      c.featured ? "text-blue-deep" : "text-ink"
                    )}
                  >
                    {c.title}
                  </h3>
                  <p className="text-[16px] leading-[1.65] text-muted">{c.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={0.15}>
          <p className="mt-12 max-w-[640px] text-[16px] leading-[1.65] text-muted">
            Regrade requests are standard academic policy at most schools. Most students never file
            one because building the case takes hours. Regrade makes it take minutes.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
