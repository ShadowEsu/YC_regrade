import type { LucideIcon } from "lucide-react";
import { Search, TrendingUp, FileText, Mail } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Search,
    title: "Point finder",
    body: "Scans every rubric line for credit you may already deserve.",
  },
  {
    icon: TrendingUp,
    title: "GPA impact",
    body: "See what recovered points could do to your grade before you decide anything.",
  },
  {
    icon: FileText,
    title: "Clear case summary",
    body: "Plain English breakdown of what matches and what was marked harshly.",
  },
  {
    icon: Mail,
    title: "Professor-safe email",
    body: "Optional respectful draft. Nothing sends without you.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-paper scroll-mt-[100px] border-y border-black/[0.05] py-[clamp(80px,10vw,128px)] sm:scroll-mt-[108px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Features"
            title="Free points are already in your grade."
            description="Scan your work, see what you can recover, and decide your next step. Built for students who want a stronger transcript."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.05}>
              <div className="card-pro surface-hover h-full p-7">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue">
                  <f.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>
                <h3 className="mb-2 font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {f.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-muted">{f.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
