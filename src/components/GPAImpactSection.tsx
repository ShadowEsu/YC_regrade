import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

type MetricRow =
  | {
      type: "arrow";
      from: string;
      to: string;
      caption: string;
    }
  | {
      type: "single";
      value: string;
      caption: string;
    };

const metrics: MetricRow[] = [
  {
    type: "arrow",
    from: "82",
    to: "91",
    caption: "One essay, B- to A-",
  },
  {
    type: "arrow",
    from: "3.4",
    to: "3.6",
    caption: "Semester GPA, one letter grade",
  },
  {
    type: "single",
    value: "5 min",
    caption: "Average case build time",
  },
  {
    type: "single",
    value: "$0",
    caption: "Cost during beta",
  },
];

function MetricValue({ row }: { row: MetricRow }) {
  if (row.type === "arrow") {
    return (
      <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em]">
        <span className="text-ink">{row.from}</span>
        <span className="mx-3 text-faint">→</span>
        <span className="text-blue">{row.to}</span>
      </p>
    );
  }

  return (
    <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
      {row.value}
    </p>
  );
}

export function GPAImpactSection() {
  return (
    <section className="section-paper py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Why it matters"
            title="Small points. Outsized outcomes."
            description={
              <>
                A higher mark on one assignment lifts your final grade. Your final grade lifts your
                GPA, your rank, and your applications.{" "}
                <span className="font-semibold text-ink">That&apos;s the leverage of checking.</span>
              </>
            }
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="card-pro mx-auto mt-14 max-w-[640px] overflow-hidden">
            {metrics.map((row, i) => (
              <div
                key={row.caption}
                className={`px-8 py-8 text-center ${i < metrics.length - 1 ? "border-b border-black/[0.06]" : ""}`}
              >
                <MetricValue row={row} />
                <p className="mt-2.5 font-ui text-[14px] font-medium text-muted">{row.caption}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-[520px] text-center font-ui text-[13px] leading-relaxed text-faint">
            Illustrative figures. Your result depends on your rubric and your professor&apos;s
            decision.
          </p>
          <p className="mx-auto mt-10 max-w-[640px] text-center text-[16px] leading-[1.65] text-muted">
            Most students leave points on the table every semester because checking feels like too
            much work. Regrade does the checking in minutes.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
