import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardCheck,
  History,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { RegradeLogo } from "./RegradeLogo";
import { cn } from "../lib/utils";

const features = [
  {
    id: "understand",
    label: "Understand",
    blurb: "Open one marked exam and see marks, rubric rows, and notes.",
    title: "See the grade, not just the number.",
    description: "Marks, rubric rows, and feedback — with uncertainty called out.",
    labelText: "This exam",
    icon: Sparkles,
    image: "/icons/how-scan.png",
    imageAlt: "Understand a marked exam",
    panel: "chat" as const,
  },
  {
    id: "review",
    label: "Review",
    blurb: "Look back at mistakes. AI collects patterns from every upload.",
    title: "Review mistakes. Build the next attempt.",
    description:
      "History across your marked exams — weak spots, repeats, and what to practise next.",
    labelText: "History · reinforcement",
    icon: History,
    image: "/icons/how-checklist.png",
    imageAlt: "Review mistakes from uploaded exams",
    panel: "review" as const,
  },
  {
    id: "appeal",
    label: "Appeal",
    blurb: "Appealing agent — draft a respectful ask when evidence supports it.",
    title: "Ask with the right evidence.",
    description: "A calm draft when a real discrepancy exists. You send it.",
    labelText: "Appealing agent",
    icon: ClipboardCheck,
    image: "/icons/how-match.png",
    imageAlt: "Appealing agent draft",
    panel: "chat" as const,
  },
  {
    id: "coach",
    label: "Coach",
    blurb: "Mr Whale beside the work — plain answers, no invented guarantees.",
    title: "Mr Whale beside the work.",
    description: "Ask about a mark in plain language. One focused follow-up at a time.",
    labelText: "Ask Mr Whale",
    icon: MessageCircle,
    image: "/logo-mark-app.png",
    imageAlt: "Coach with Mr Whale",
    panel: "chat" as const,
  },
] as const;

const chatScript = [
  {
    question: "Why did I lose points on question 4?",
    answer:
      "Your claim is clear. The note is about the explanation after quote two — practise that before the final.",
  },
  {
    question: "Is this worth appealing?",
    answer:
      "Only if the rubric row and the mark do not match. Here the deduction is explained — review first, appeal only if still unclear.",
  },
  {
    question: "What should I practise before the final?",
    answer:
      "Link evidence to your claim. It shows up across two exams — drill that first.",
  },
  {
    question: "Can you draft a polite email?",
    answer:
      "Yes. Ask how the deduction maps to the evidence criterion, attach the rubric line, and keep the tone respectful.",
  },
  {
    question: "Explain this mark simply.",
    answer:
      "You got credit for a clear claim. The deduction is the link after quote two. Restate that link next time.",
  },
] as const;

const reviewItems = [
  {
    title: "Link evidence to claim",
    detail: "Teacher note on Q4 · appears in 2 exams",
    done: false,
  },
  {
    title: "Explain after the quote",
    detail: "Rubric row · Evidence and analysis",
    done: false,
  },
  {
    title: "Check source count against rubric",
    detail: "Visible strength in Exam 1 · keep it",
    done: true,
  },
];

type FeatureId = (typeof features)[number]["id"];
type ChatItem =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "whale"; text: string; typing?: boolean };

const bubbleMotion = {
  initial: { opacity: 0, y: 28, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -22, scale: 0.96 },
  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
};

export function ProductShowcase() {
  const [mode, setMode] = useState<FeatureId>("understand");
  const [message, setMessage] = useState<string>(chatScript[0].question);
  const [thread, setThread] = useState<ChatItem[]>([]);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [pairKey, setPairKey] = useState(0);
  const selected = features.find((item) => item.id === mode)!;
  const showChat = selected.panel === "chat";

  useEffect(() => {
    if (!showChat) return;

    let cancelled = false;
    const timers: number[] = [];
    setThread([]);
    setScriptIndex(0);
    setPairKey(0);

    async function runLoop() {
      let index = 0;
      while (!cancelled) {
        const pair = chatScript[index % chatScript.length];
        const cycle = index;
        setScriptIndex(index % chatScript.length);
        setPairKey(cycle);
        setMessage(pair.question);

        setThread([{ id: `u-${cycle}`, role: "user", text: pair.question }]);

        await wait(650, timers, () => cancelled);
        if (cancelled) return;

        setThread((prev) => [
          ...prev,
          { id: `t-${cycle}`, role: "whale", text: "", typing: true },
        ]);

        await wait(1100, timers, () => cancelled);
        if (cancelled) return;

        setThread([
          { id: `u-${cycle}`, role: "user", text: pair.question },
          { id: `w-${cycle}`, role: "whale", text: pair.answer },
        ]);

        await wait(2800, timers, () => cancelled);
        if (cancelled) return;

        setThread([]);
        await wait(420, timers, () => cancelled);
        if (cancelled) return;

        index += 1;
      }
    }

    runLoop();
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [mode, showChat]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value) return;
    const id = `manual-${Date.now()}`;
    setThread([
      { id: `${id}-u`, role: "user", text: value },
      {
        id: `${id}-w`,
        role: "whale",
        text: chatScript[scriptIndex % chatScript.length].answer,
      },
    ]);
  }

  return (
    <section id="product" className="scroll-mt-[120px] bg-blue-soft py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="Review Studio"
            title={
              <>
                Four features.{" "}
                <span className="text-gradient-live">One marked exam.</span>
              </>
            }
          />
          <p className="mx-auto mt-3 max-w-[520px] text-center font-ui text-[14px] leading-relaxed text-muted sm:text-[15px]">
            Click a feature to see what it does — Understand, Review, Appeal, and Coach.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="mt-6 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  aria-pressed={active}
                  className={cn(
                    "group flex flex-col rounded-[18px] border p-4 text-left transition-all duration-300",
                    active
                      ? "border-blue bg-blue text-white shadow-[0_14px_32px_-14px_rgba(30,79,255,0.5)]"
                      : "border-black/10 bg-paper text-ink hover:border-blue/40 hover:shadow-[0_12px_28px_-18px_rgba(30,79,255,0.28)]"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                      active ? "bg-white/15 text-white" : "bg-[#eef2ff] text-blue"
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <span className="mt-3 font-display text-[1.15rem] font-semibold tracking-[-0.03em]">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 text-[12px] leading-snug sm:text-[13px]",
                      active ? "text-white/85" : "text-muted"
                    )}
                  >
                    {item.blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-5 overflow-hidden rounded-[22px] border border-blue/20 bg-paper shadow-[0_20px_50px_rgba(30,79,255,0.12)] sm:mt-6 sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="border-b border-blue/12 bg-[#f7f9ff] p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  width={72}
                  height={72}
                  className="h-12 w-12 rounded-[14px] object-contain sm:h-16 sm:w-16 sm:rounded-[16px]"
                />
                <p className="mt-4 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-blue sm:mt-6 sm:text-[12px]">
                  {selected.labelText}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.45rem,2.8vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
                  {selected.title}
                </h3>
                <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-muted sm:text-[15px]">
                  {selected.description}
                </p>
                <div className="mt-4 rounded-xl border border-blue/15 bg-paper p-3.5 sm:mt-5 sm:p-4">
                  <p className="font-ui text-[10px] font-bold uppercase tracking-[0.08em] text-blue sm:text-[11px]">
                    Evidence in view
                  </p>
                  <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-ink sm:text-[14px]">
                    Rubric: “Explain how evidence supports the claim.”
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                    Teacher note: “Explain the link after quote two.”
                  </p>
                </div>
              </div>

              {selected.panel === "review" ? (
                <div className="flex min-h-[320px] flex-col bg-paper p-4 sm:min-h-[380px] sm:p-6 lg:min-h-[400px]">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[0.09em] text-blue">
                      Review history · from your uploads
                    </span>
                    <span className="rounded-full bg-blue/15 px-2.5 py-0.5 font-ui text-[10px] font-bold text-blue">
                      2 exams
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    AI collects weak spots across marked work so you can look back and reinforce
                    what keeps costing points.
                  </p>
                  <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                    {reviewItems.map((item) => (
                      <li
                        key={item.title}
                        className={cn(
                          "rounded-xl border px-3.5 py-3 transition-colors",
                          item.done
                            ? "border-green/20 bg-green/[0.05]"
                            : "border-blue/12 bg-[#f7f9ff]"
                        )}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border",
                              item.done
                                ? "border-green bg-green text-white"
                                : "border-blue/25 bg-paper"
                            )}
                          >
                            {item.done ? <CheckCircle2 className="h-3 w-3" /> : null}
                          </span>
                          <div>
                            <p
                              className={cn(
                                "text-[14px] font-semibold text-ink",
                                item.done && "line-through opacity-70"
                              )}
                            >
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-[12px] text-muted">{item.detail}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex min-h-[340px] flex-col bg-paper p-0 sm:min-h-[380px] lg:min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-blue/12 px-4 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef2ff] animate-whale">
                        <RegradeLogo variant="whale" size={20} />
                      </span>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-ink">
                          {mode === "appeal" ? "Appealing agent" : "Mr Whale"}
                        </p>
                        <p className="font-ui text-[10px] text-blue">
                          Live demo · {(scriptIndex % chatScript.length) + 1}/{chatScript.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-1 flex-col justify-end gap-3 overflow-hidden bg-[#f4f7ff] px-4 py-4 sm:px-5 sm:py-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pairKey}
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AnimatePresence initial={false}>
                          {thread.map((item) =>
                            item.role === "user" ? (
                              <motion.div
                                key={item.id}
                                {...bubbleMotion}
                                className="flex justify-end"
                              >
                                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-blue px-3.5 py-2.5 text-[13px] leading-relaxed text-white sm:max-w-[80%] sm:text-[14px]">
                                  {item.text}
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key={item.id}
                                {...bubbleMotion}
                                className="flex items-end gap-2"
                              >
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#eef2ff]">
                                  <RegradeLogo variant="whale" size={18} />
                                </span>
                                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-blue/15 bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed text-ink shadow-sm sm:max-w-[82%] sm:text-[14px]">
                                  {item.typing ? (
                                    <span
                                      className="inline-flex gap-1 px-1 py-0.5"
                                      aria-label="Typing"
                                    >
                                      <i className="typing-dot" />
                                      <i className="typing-dot" />
                                      <i className="typing-dot" />
                                    </span>
                                  ) : (
                                    item.text
                                  )}
                                </div>
                              </motion.div>
                            )
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <form
                    onSubmit={submit}
                    className="flex gap-2 border-t border-blue/12 bg-paper px-3.5 py-3 sm:px-4 sm:py-3.5"
                  >
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      aria-label="Ask about the mark"
                      placeholder={
                        mode === "appeal" ? "Ask the appealing agent…" : "Ask about this mark…"
                      }
                      className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#f7f9ff] px-3.5 py-2.5 text-[13px] text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15 sm:text-[14px]"
                    />
                    <button
                      type="submit"
                      className="btn-pro grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function wait(ms: number, timers: number[], isCancelled: () => boolean) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      resolve();
    }, ms);
    timers.push(id);
    if (isCancelled()) {
      window.clearTimeout(id);
      resolve();
    }
  });
}
