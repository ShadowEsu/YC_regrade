import type { LucideIcon } from "lucide-react";
import { GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const audiences: {
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Students",
    tagline: "Your advocate in your pocket",
    body: "Regrade reads your graded work, checks every rubric line, and drafts the appeal in 60 seconds. Never accept a grade you cannot explain.",
  },
  {
    icon: HeartHandshake,
    title: "Parents",
    tagline: "Parent Mode",
    body: "Photograph your child's marked work and see exactly why every point was lost. Get a parent-teacher conference prep sheet with the questions worth asking.",
  },
  {
    icon: ShieldCheck,
    title: "Grading accountability",
    tagline: "The layer grading never had",
    body: "Turnitin checks student work. Regrade checks the grading. We are building the accountability infrastructure behind the number that decides scholarships, visas, and futures.",
  },
];

export function VisionSection() {
  return (
    <section
      id="vision"
      className="section-wash scroll-mt-[100px] border-y border-black/[0.05] py-[clamp(80px,10vw,128px)] sm:scroll-mt-[108px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Regrade 2.0"
            title="Every student deserves an advocate."
            description="Regrade started as a grade appeal app. Now it is the accountability layer for grading — for students who need a student advocate, and parents who need Parent Mode."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div className="card-pro surface-hover h-full p-7">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>
                <p className="mb-1 font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-blue">
                  {item.tagline}
                </p>
                <h3 className="mb-3 font-display text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-muted">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.18}>
          <div className="mx-auto mt-10 max-w-[760px] rounded-2xl border border-blue/15 bg-gradient-to-br from-blue-soft to-white px-6 py-6 text-center sm:px-10 sm:py-8">
            <p className="font-display text-[clamp(1.1rem,2.2vw,1.35rem)] font-semibold leading-[1.45] tracking-[-0.02em] text-ink">
              Every student deserves the advocate wealthy students get for free.
            </p>
            <p className="mx-auto mt-3 max-w-[580px] text-[15px] leading-[1.65] text-muted">
              Student advocate for university appeals. Parent Mode for K-12 families. One engine that
              reads the work, checks the marking, and helps you fight for the points already earned.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
