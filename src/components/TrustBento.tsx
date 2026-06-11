import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    title: "You send everything",
    body: "Regrade never emails anyone. Every appeal leaves from your inbox, with your name on it.",
    span: "md:col-span-6",
    accent: "blue",
  },
  {
    title: "Evidence only",
    body: "Every claim points to a rubric line, the syllabus, or your submitted work — not opinion.",
    span: "md:col-span-6",
    accent: "ink",
  },
  {
    title: "Respectful by default",
    body: "Drafts are professional and measured. If it reads accusatory, it does not ship.",
    span: "md:col-span-4",
    accent: "blue",
  },
  {
    title: "Your data, your control",
    body: "Files are used to analyze your grade and nothing else. Delete them anytime from your account.",
    span: "md:col-span-8",
    accent: "ink",
  },
];

export function TrustBento() {
  return (
    <section className="section-paper py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Trust"
            title="Professor-safe by design."
            description="An appeal only works if your instructor takes it seriously. Regrade is built to keep it that way."
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-12 gap-3">
          {items.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.05} className={`col-span-12 ${item.span}`}>
              <div className="card-pro surface-hover h-full p-7">
                <h3
                  className={`mb-2 text-[17px] font-semibold tracking-[-0.02em] ${item.accent === "blue" ? "text-blue-deep" : "text-ink"}`}
                >
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-muted">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
