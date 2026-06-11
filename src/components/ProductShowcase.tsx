import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cn } from "../lib/utils";

const gaps = [
  {
    id: "evidence",
    label: "Evidence & sources",
    pts: "+5 pts",
    text: "Grading awards full credit for 3+ credible sources. You cited four and scored 5/10.",
    detail: "C3 · 10 pts for 3+ credible sources",
  },
  {
    id: "structure",
    label: "Structure",
    pts: "+2 pts",
    text: "The same intro issue was deducted twice — under Structure and again under Clarity.",
    detail: "C5 + C6 · Duplicate penalty on one issue",
  },
  {
    id: "formatting",
    label: "Formatting",
    pts: "+2 pts",
    text: "Docked for MLA style. Syllabus §4 accepts MLA or APA.",
    detail: "C7 · Syllabus allows MLA or APA",
  },
];

const line = {
  hidden: { opacity: 0, x: -16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(gaps[0].id);
  const selected = gaps.find((g) => g.id === active)!;

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const idx = gaps.findIndex((g) => g.id === prev);
        return gaps[(idx + 1) % gaps.length].id;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} className="section-shell relative">
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[920px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white text-left shadow-[0_20px_60px_rgba(30,79,255,0.06)]"
        aria-label="Preview of a Regrade analysis"
      >
        <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#f8f6f3] px-5 py-3.5">
          <div className="flex gap-1.5">
            <i className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <i className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <i className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto max-w-[280px] flex-1 rounded-md border border-black/[0.06] bg-white px-3 py-1.5 text-center font-ui text-[12px] font-medium text-faint">
            app.regradeapp.tech
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px]">
          <div className="border-b border-black/[0.05] bg-[#fafafa] p-7 lg:border-b-0 lg:border-r lg:p-8">
            <motion.p
              custom={0}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-1.5 font-ui text-[13px] font-semibold uppercase tracking-[0.08em] text-blue/70"
            >
              ENGL 1A · Spring 2026
            </motion.p>
            <motion.div
              custom={1}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-5 flex items-baseline justify-between gap-3"
            >
              <span className="text-[clamp(18px,2.2vw,22px)] font-semibold tracking-[-0.02em] text-ink">
                Essay 2 · Rhetorical Analysis
              </span>
              <span className="text-[17px] font-semibold tabular-nums text-rose-500">82/100</span>
            </motion.div>
            <motion.div
              custom={2}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-5 rounded-lg border border-blue/15 bg-blue/[0.05] px-4 py-3 text-[15px] font-semibold text-blue-deep"
            >
              3 grading gaps · up to{" "}
              <span className="text-green">+9 pts recoverable</span>
            </motion.div>
            <div className="flex flex-col gap-2.5">
              {gaps.map((g, i) => (
                <motion.button
                  key={g.id}
                  type="button"
                  custom={i + 3}
                  variants={line}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  onClick={() => setActive(g.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left transition-colors duration-300",
                    active === g.id
                      ? "border-blue/25 bg-white shadow-[inset_3px_0_0_0_#1e4fff]"
                      : "border-black/[0.05] bg-white hover:border-blue/15 hover:bg-blue/[0.02]"
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-ink">{g.label}</span>
                    <span className="text-[14px] font-semibold text-green">{g.pts}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted">{g.text}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/[0.05] bg-blue-soft/50 p-6 lg:border-t-0 lg:p-7">
            <span className="font-ui text-[13px] font-semibold uppercase tracking-[0.07em] text-blue/70">
              Case summary
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg border border-blue/10 bg-white p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-blue">
                  Selected gap
                </p>
                <p className="mt-2 text-[15px] font-semibold leading-relaxed text-ink">
                  {selected.detail}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="rounded-lg border border-blue/10 bg-white p-4">
              <div className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.03em] text-green">
                +9 pts
              </div>
              <div className="mt-1 font-ui text-[13px] text-faint">Total recoverable</div>
            </div>
            <div className="rounded-lg border border-blue/10 bg-white p-4">
              <div className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                82 <span className="text-blue">→</span> 91
              </div>
              <div className="mt-1 font-ui text-[13px] text-faint">Projected grade</div>
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="btn-pro mt-auto rounded-xl py-3 text-[15px]"
            >
              Draft appeal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
