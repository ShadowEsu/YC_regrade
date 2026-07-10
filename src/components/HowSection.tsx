import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    number: "01",
    title: "Connect your student up",
    body: "Or bring the marked work in — upload a PDF or screenshot anytime.",
    image: "/icons/how-scan.png",
    alt: "Connect your student account or bring marked work in",
  },
  {
    number: "02",
    title: "Regrade reads the evidence",
    body: "It maps marks, rubric rows, and teacher notes — and flags what is unclear.",
    image: "/icons/how-match.png",
    alt: "Regrade reads the evidence on the marked work",
  },
  {
    number: "03",
    title: "Choose what to do next",
    body: "Clarify the mark, draft an appeal, build a study plan, or ask Mr Whale.",
    image: "/icons/how-checklist.png",
    alt: "Choose the next step after review",
  },
];

export function HowSection() {
  return (
    <section
      id="how"
      className="scroll-mt-[120px] border-b border-blue/10 bg-blue-soft py-[clamp(64px,8vw,96px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="How it works"
            title={
              <>
                Three steps.{" "}
                <span className="text-gradient-live">No guesswork.</span>
              </>
            }
          />
        </SectionReveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.08}>
              <article className="hover-lift group flex h-full flex-col items-center rounded-[24px] border border-blue/15 bg-paper p-7 text-center">
                <img
                  src={step.image}
                  alt={step.alt}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-[28px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <p className="mt-6 font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
                  Step {step.number}
                </p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-muted">
                  {step.body}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
