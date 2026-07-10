import type { LucideIcon } from "lucide-react";
import { DollarSign, GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";
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
      className="relative scroll-mt-[100px] overflow-hidden border-y border-black/[0.05] bg-[linear-gradient(160deg,var(--color-blue-wash)_0%,#f5f3ff_45%,var(--color-paper)_100%)] bg-animated-gradient py-[clamp(80px,10vw,128px)] sm:scroll-mt-[108px]"
    >
      <div
        className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-blue/10 blur-[100px] animate-blob-slow"
        aria-hidden
      />
      <div className="section-shell relative">
        <SectionReveal>
          <SectionHeader
            eyebrow="Regrade 2.0"
            title={
              <>
                Every student deserves <span className="text-gradient-live">an advocate.</span>
              </>
            }
            description="Regrade started as a grade appeal app. Now it is the accountability layer for grading — for students who need a student advocate, and parents who need Parent Mode."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div className="card-pro surface-hover hover-lift group h-full p-7">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue group-hover:text-white">
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
          <div className="glass relative mx-auto mt-12 max-w-[780px] scale-[1.03] rounded-[28px] border-2 border-blue/25 px-8 py-9 text-center shadow-[0_32px_80px_-20px_rgba(30,79,255,0.32)] sm:px-14 sm:py-12">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-blue text-white shadow-[0_10px_24px_-6px_rgba(30,79,255,0.5)]">
              <DollarSign className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <p className="mx-auto max-w-[600px] font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold leading-[1.4] tracking-[-0.02em] text-ink">
              Completely{" "}
              <span className="rounded bg-yellow-200 px-1.5 py-0.5">free</span> during the beta —{" "}
              <span className="rounded bg-yellow-200 px-1.5 py-0.5">$0</span>, no card required.
            </p>
            <p className="mx-auto mt-4 max-w-[580px] text-[15px] leading-[1.65] text-muted">
              Student advocate for university appeals. Parent Mode for K-12 families. One engine that
              reads the work, checks the marking, and helps you fight for the points already earned.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
