import { AlertTriangle } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const pains = [
  {
    step: "01",
    title: "The score hides the story",
    body: "You get a number back. You don't get a breakdown of every point you may have already earned.",
  },
  {
    step: "02",
    title: "Checking is a full-time job",
    body: "Rubric here. Syllabus there. Comments in the LMS. Most students never have the time to dig in.",
  },
  {
    step: "03",
    title: "One grade drags everything down",
    body: "A single harsh mark on a midterm or final can sit on your GPA for the rest of the semester.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0909] py-[clamp(80px,10vw,128px)] text-[#fafafa]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(225, 29, 72, 0.04) 14px, rgba(225, 29, 72, 0.04) 15px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(ellipse_70%_80%_at_50%_-30%,rgba(225,29,72,0.18),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/50 to-transparent" aria-hidden />

      <div className="section-shell relative">
        <SectionReveal>
          <div className="max-w-[640px]">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose/70 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
              </span>
              <AlertTriangle className="h-3.5 w-3.5 text-rose" strokeWidth={2.5} aria-hidden />
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-rose">
                The problem
              </p>
            </div>

            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-cream">
              You did the work.
              <br />
              <span className="text-rose/75">Your transcript might not show it yet.</span>
            </h2>

            <p className="mt-5 max-w-[560px] text-[clamp(17px,2vw,19px)] leading-[1.65] tracking-[-0.01em] text-white/55">
              Students leave free points on the table every semester. Not because they don&apos;t care.
              Because checking every{" "}
              <a href="#resources" className="text-white/70 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/90">
                rubric line against university appeal standards
              </a>{" "}
              takes hours nobody has.{" "}
              <a href="#how" className="text-white/70 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/90">
                Regrade does it in minutes
              </a>
              .
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-0 border-t border-rose/15 md:grid-cols-3">
          {pains.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.06}>
              <div
                className={`group relative h-full py-10 md:px-9 md:py-12 ${i > 0 ? "border-t border-rose/15 md:border-l md:border-t-0" : "md:pl-0"} ${i === pains.length - 1 ? "md:pr-0" : ""}`}
              >
                <div className="absolute left-0 top-10 hidden h-8 w-[3px] rounded-full bg-rose/70 md:block md:top-12" aria-hidden />
                <div className="mb-5 flex items-center gap-2">
                  <span className="font-ui text-[13px] font-semibold tabular-nums tracking-[0.14em] text-rose">
                    {p.step}
                  </span>
                  <AlertTriangle className="h-3 w-3 text-rose/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" strokeWidth={2.5} aria-hidden />
                </div>
                <h3 className="mb-4 font-display text-[clamp(1.25rem,2.2vw,1.5rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
                  {p.title}
                </h3>
                <p className="text-[clamp(17px,1.8vw,18px)] leading-[1.7] text-white/60">{p.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
