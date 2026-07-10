import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    number: "01",
    title: "Upload",
    body: "Marked PDF, screenshot, rubric, or feedback.",
    image: "/icons/how-scan.png",
    alt: "Scan a marked document",
  },
  {
    number: "02",
    title: "Read the evidence",
    body: "Visible marks, rubric support, and uncertainty — kept separate.",
    image: "/icons/how-match.png",
    alt: "Match marks against the rubric",
  },
  {
    number: "03",
    title: "Pick a next step",
    body: "Clarify, appeal, study, or ask Mr Whale.",
    image: "/icons/how-checklist.png",
    alt: "Checklist of next steps",
  },
];

export function HowSection() {
  return (
    <section
      id="how"
      className="scroll-mt-[120px] border-b border-black/[0.07] bg-cream py-[clamp(64px,8vw,96px)]"
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
              <article className="hover-lift group flex h-full flex-col items-center rounded-[24px] border border-black/[0.08] bg-white p-7 text-center shadow-[0_12px_36px_rgba(9,9,11,0.05)]">
                <img
                  src={step.image}
                  alt={step.alt}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-[28px] object-contain shadow-[0_14px_30px_-12px_rgba(9,9,11,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
                <p className="mt-6 font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
                  Step {step.number}
                </p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-[15px] leading-relaxed text-muted">
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
