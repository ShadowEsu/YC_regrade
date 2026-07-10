import { SectionReveal } from "./SectionReveal";

const trust = [
  {
    title: "Clear evidence",
    body: "Marks, rubric, and uncertainty stay distinct.",
    image: "/icons/trust-evidence.png",
    alt: "Clear evidence icon",
  },
  {
    title: "Honest uncertainty",
    body: "Unclear marks are flagged — never invented.",
    image: "/icons/trust-uncertainty.png",
    alt: "Honest uncertainty icon",
  },
  {
    title: "You stay in control",
    body: "You review every draft. Nothing sends itself.",
    image: "/icons/trust-control.png",
    alt: "You stay in control icon",
  },
];

export function TrustSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-[120px] border-y border-black/[0.07] bg-cream py-[clamp(64px,8vw,96px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
              Trust · private beta
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Evidence first.{" "}
              <span className="text-gradient-live">You decide.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-relaxed text-muted">
              Regrade does not decide if a grade is “fair.” It helps you read what is visible and ask
              a clearer question.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {trust.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <div className="hover-lift flex h-full flex-col items-center rounded-[24px] border border-black/[0.08] bg-white p-7 text-center shadow-[0_12px_36px_rgba(9,9,11,0.05)]">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-[24px] object-contain shadow-[0_12px_28px_-10px_rgba(9,9,11,0.35)]"
                />
                <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-[15px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
