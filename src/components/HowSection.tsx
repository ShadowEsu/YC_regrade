import { FileUp, SearchCheck, Compass } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    icon: FileUp,
    number: "01",
    title: "Bring one marked exam",
    body: "Upload a marked PDF, image, screenshot, rubric, or feedback. Manual upload always works — connect Classroom, Canvas, or Moodle later if you want.",
  },
  {
    icon: SearchCheck,
    number: "02",
    title: "Read the evidence",
    body: "Regrade separates visible marks, rubric support, and uncertainty. Unclear handwriting is flagged, never guessed.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Choose your next step",
    body: "Clarify the mark, prepare a respectful appeal, ask Mr Whale, or add the pattern to your finals Study plan.",
  },
];

export function HowSection() {
  return (
    <section
      id="how"
      className="scroll-mt-[120px] border-b border-black/[0.07] bg-cream py-[clamp(72px,9vw,116px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="How it works"
            title={
              <>
                One marked exam.{" "}
                <span className="text-gradient-live">A clearer next step.</span>
              </>
            }
            description="Regrade starts after the grade comes back — when you have real evidence and a real reason to understand it."
          />
        </SectionReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.08}>
              <article className="hover-lift group h-full rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_10px_30px_rgba(9,9,11,0.04)]">
                <div className="flex items-start justify-between">
                  <span className="font-ui text-[13px] font-bold tracking-[0.09em] text-blue">
                    {step.number}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-blue group-hover:text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-9 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{step.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
