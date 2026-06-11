import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const pains = [
  {
    step: "01",
    title: "The grade drops",
    body: "You open the LMS, see the score, and something feels off — but you cannot prove it yet.",
  },
  {
    step: "02",
    title: "The grading is buried",
    body: "Deductions reference rules spread across the syllabus, assignment sheet, and comment box.",
  },
  {
    step: "03",
    title: "The appeal takes hours",
    body: "Most students accept the grade. Those who appeal spend an evening building a case by hand.",
  },
];

export function ProblemSection() {
  return (
    <section className="section-dark py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            dark
            eyebrow="The problem"
            title={
              <>
                You did the work.
                <br />
                <span className="text-white/55">The grading might not have.</span>
              </>
            }
            description="Grading gets applied inconsistently. Points get double-deducted. Syllabus policies get ignored. You deserve to know — with evidence."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-0 border-t border-white/[0.08] md:grid-cols-3">
          {pains.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.06}>
              <div
                className={`h-full py-8 md:px-8 md:py-10 ${i > 0 ? "border-t border-white/[0.08] md:border-l md:border-t-0" : "md:pl-0"} ${i === pains.length - 1 ? "md:pr-0" : ""}`}
              >
                <p className="mb-4 font-ui text-[12px] font-semibold tabular-nums tracking-[0.12em] text-[#9db5ff]">
                  {p.step}
                </p>
                <h3 className="mb-3 font-display text-[18px] font-semibold tracking-[-0.02em] text-white">
                  {p.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-white/55">{p.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
