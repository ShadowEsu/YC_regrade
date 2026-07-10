import { FileUp, SearchCheck, Compass } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    icon: FileUp,
    number: "01",
    title: "Upload",
    body: "Marked PDF, screenshot, rubric, or feedback.",
  },
  {
    icon: SearchCheck,
    number: "02",
    title: "Read the evidence",
    body: "Visible marks, rubric support, and uncertainty — kept separate.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Pick a next step",
    body: "Clarify, appeal, study, or ask Mr Whale.",
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
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.08}>
              <article className="hover-lift group h-full rounded-2xl border border-black/[0.08] bg-white p-7 text-center shadow-[0_10px_30px_rgba(9,9,11,0.04)] md:text-left">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-[13px] font-bold tracking-[0.09em] text-blue">
                    {step.number}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.1] text-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-blue group-hover:text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{step.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
