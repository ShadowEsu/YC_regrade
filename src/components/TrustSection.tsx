import type { LucideIcon } from "lucide-react";
import { Send, ClipboardCheck, MessageCircle, Lock } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";

const items: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Send,
    title: "You send everything",
    body: "Nothing leaves your inbox unless you hit send.",
  },
  {
    icon: ClipboardCheck,
    title: "Evidence only",
    body: "Rubric, syllabus, your work. No opinions.",
  },
  {
    icon: MessageCircle,
    title: "Tone-checked",
    body: "Respectful drafts. Accusatory ones don't ship.",
  },
  {
    icon: Lock,
    title: "Private & deletable",
    body: "We never contact your school. Delete anytime.",
  },
];

export function TrustSection() {
  return (
    <section className="section-cream border-y border-black/[0.05] py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Professor-safe by design"
            title="Built to be taken seriously."
            description="Short, evidence-based, and always from you."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.05}>
              <div className="card-pro surface-hover h-full p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-blue/[0.08] text-blue">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>
                <h3 className="mb-1.5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-snug text-muted">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
