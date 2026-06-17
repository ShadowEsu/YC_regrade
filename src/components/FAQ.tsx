import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";
import { FAQ_ITEMS } from "../data/faqs";

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
            {FAQ_ITEMS.map((f, i) => {
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
