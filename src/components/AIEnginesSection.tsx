import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const engines = [
  {
    name: "Gemini",
    provider: "Google",
    body: "Fast default. Good for most rubrics and shorter assignments.",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    body: "Strong on long essays and dense marking guides.",
  },
  {
    name: "Hybrid",
    provider: "Gemini + Claude",
    body: "Both models check your upload. You get the sharper result.",
  },
];

export function AIEnginesSection() {
  return (
    <section className="section-cream border-y border-black/[0.05] py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="AI engines"
            title="Pick Gemini, Claude, or both."
            description="Choose in Profile → AI Engine. Switch anytime. Your uploads are not used to train models."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {engines.map((e, i) => (
            <SectionReveal key={e.name} delay={i * 0.05}>
              <div className="card-pro h-full p-6">
                <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                  {e.provider}
                </p>
                <h3 className="mt-2 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {e.name}
                </h3>
                <p className="mt-2 text-[15px] leading-snug text-muted">{e.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
