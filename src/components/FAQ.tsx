import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";

const faqs = [
  {
    q: "Is this allowed?",
    a: "Yes. Regrade requests and grade appeals are standard academic processes, documented in most syllabi and college policies. Regrade helps you use a process you already have, with evidence instead of frustration.",
  },
  {
    q: "Is it cheating?",
    a: "No. Regrade never writes or edits assignments. It only reviews work that has already been graded and audits the grading line by line.",
  },
  {
    q: "Will it email my professor?",
    a: "Never. Regrade does not send anything. You get a draft, you edit it, and you send it from your own email if you decide the case is worth making.",
  },
  {
    q: "What does it cost?",
    a: "Free during the private beta. The first 100 waitlist members receive Pro Max free for 12 months at launch.",
  },
  {
    q: "What do I need to use it?",
    a: "Your graded work, the assignment sheet, and any feedback you received. PDFs, documents, and screenshots all work. No school login required.",
  },
  {
    q: "What happens to my files?",
    a: "They are used to analyze your grade and draft your appeal, nothing else. You can delete them from your account at any time.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-[120px] bg-[#f8f6f3] pb-[clamp(80px,10vw,128px)] pt-[clamp(64px,8vw,96px)] sm:scroll-mt-[132px]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader eyebrow="FAQ" title="Common questions." />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-10 max-w-[720px] divide-y divide-black/[0.06]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-[16px] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-blue"
                  >
                    {f.q}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-faint transition-transform duration-200",
                        isOpen && "rotate-180 text-blue"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[600px] pb-5 text-[16px] leading-[1.65] text-muted">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
