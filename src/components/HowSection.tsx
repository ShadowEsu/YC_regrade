import { FileUp, SearchCheck, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";

const steps = [
  { icon: FileUp, number: "01", title: "Bring one marked exam", body: "Upload a marked PDF, image, screenshot, rubric, or feedback. Manual upload always works." },
  { icon: SearchCheck, number: "02", title: "Read the evidence", body: "Regrade separates visible marks, rubric support, and uncertainty instead of guessing what happened." },
  { icon: Send, number: "03", title: "Choose your next step", body: "Clarify the mark, prepare a respectful appeal, or add the pattern to your finals review plan." },
];

export function HowSection() {
  return (
    <section id="how" className="scroll-mt-[120px] border-b border-black/[0.07] bg-cream py-[clamp(72px,9vw,116px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader eyebrow="How it works" title={<>One marked exam. <span className="text-blue">A clearer next step.</span></>} description="Regrade starts after the grade comes back — when you have real evidence and a real reason to understand it." />
        </SectionReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_10px_30px_rgba(9,9,11,0.04)]">
                <div className="flex items-start justify-between"><span className="font-ui text-[13px] font-bold tracking-[0.09em] text-blue">{step.number}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue"><step.icon className="h-5 w-5" /></span></div>
                <h3 className="mt-9 text-[22px] font-semibold tracking-[-0.03em] text-ink">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{step.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
