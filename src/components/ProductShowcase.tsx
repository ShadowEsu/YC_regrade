import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ClipboardCheck, GraduationCap, MessageCircle, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { RegradeLogo } from "./RegradeLogo";
import { cn } from "../lib/utils";

const modes = [
  {
    id: "review",
    label: "Review",
    title: "See the grade, not just the number.",
    description: "Marks, rubric rows, and feedback — with uncertainty called out.",
    labelText: "Question review",
    icon: MessageCircle,
    image: "/icons/how-scan.png",
    imageAlt: "Upload and scan a marked exam",
  },
  {
    id: "appeal",
    label: "Appeal",
    title: "Ask with the right evidence.",
    description: "A respectful draft when a real discrepancy exists. You send it.",
    labelText: "Potential issue",
    icon: ClipboardCheck,
    image: "/icons/how-match.png",
    imageAlt: "Read the evidence against the rubric",
  },
  {
    id: "study",
    label: "Study",
    title: "Turn marks into a study plan.",
    description: "Recurring patterns from marked exams become your finals checklist.",
    labelText: "Finals Prep",
    icon: GraduationCap,
    image: "/icons/how-checklist.png",
    imageAlt: "Pick a next step from your study checklist",
  },
  {
    id: "coach",
    label: "Coach",
    title: "Mr Whale beside the work.",
    description: "Plain-language help on the selected mark. No invented guarantees.",
    labelText: "Ask Mr Whale",
    icon: CheckCircle2,
    image: "/logo-mark-app.png",
    imageAlt: "Regrade Coach with Mr Whale",
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
      "Only if the rubric row and the mark do not match. Here the deduction is explained — study first, appeal only if still unclear.",
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

const studyItems = [
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

type ModeId = (typeof modes)[number]["id"];
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
  const [mode, setMode] = useState<ModeId>("review");
  const [message, setMessage] = useState<string>(chatScript[0].question);
  const [thread, setThread] = useState<ChatItem[]>([]);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [pairKey, setPairKey] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const selected = modes.find((item) => item.id === mode)!;

  useEffect(() => {
    if (mode === "study") return;

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
  }, [mode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [thread]);

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
    <section id="product" className="scroll-mt-[120px] bg-blue-soft py-[clamp(64px,11vw,140px)]">
      <div className="mx-auto w-full max-w-[1680px] px-3 sm:px-6 xl:px-10">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="Review Studio"
            title={
              <>
                Four modes.{" "}
                <span className="text-gradient-live">One marked exam.</span>
              </>
            }
          />
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <div className="mt-8 overflow-hidden rounded-[28px] border border-blue/20 bg-paper shadow-[0_32px_90px_rgba(30,79,255,0.16)] sm:mt-12 sm:rounded-[40px]">
            <div className="flex gap-1 overflow-x-auto border-b border-blue/12 bg-[#eef2ff] px-3 py-3.5 sm:gap-1.5 sm:px-7 sm:py-5">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-3.5 py-2.5 font-ui text-[13px] font-semibold transition-all duration-300 sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-[16px]",
                    mode === item.id
                      ? "bg-blue text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
                      : "text-muted hover:bg-blue-soft hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-[.82fr_1.18fr]">
              <div className="border-b border-blue/12 bg-[#f7f9ff] p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-14 xl:p-16">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  width={96}
                  height={96}
                  className="h-16 w-16 rounded-[18px] object-contain sm:h-28 sm:w-28 sm:rounded-[24px]"
                />
                <p className="mt-6 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-blue sm:mt-12 sm:text-[13px]">
                  {selected.labelText}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.9rem,4vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink sm:mt-3">
                  {selected.title}
                </h3>
                <p className="mt-3 max-w-[540px] text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-[20px]">
                  {selected.description}
                </p>
                <div className="mt-6 rounded-2xl border border-blue/15 bg-paper p-4 sm:mt-12 sm:p-8">
                  <p className="font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-blue sm:text-[12px]">
                    Evidence in view
                  </p>
                  <p className="mt-2 text-[15px] font-semibold leading-relaxed text-ink sm:text-[18px]">
                    Rubric: “Explain how evidence supports the claim.”
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted sm:text-[18px]">
                    Teacher note: “Explain the link after quote two.”
                  </p>
                </div>
              </div>

              {mode === "study" ? (
                <div className="flex min-h-[520px] flex-col bg-paper p-5 sm:min-h-[780px] sm:p-9 lg:min-h-[900px] lg:p-12">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[0.09em] text-blue sm:text-[13px]">
                      Study checklist · from marked exams
                    </span>
                    <span className="rounded-full bg-blue/15 px-3 py-1 font-ui text-[11px] font-bold text-blue">
                      2 exams
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-1 flex-col gap-3 sm:mt-8 sm:gap-4">
                    {studyItems.map((item) => (
                      <li
                        key={item.title}
                        className={cn(
                          "rounded-2xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-5",
                          item.done
                            ? "border-green/20 bg-green/[0.05]"
                            : "border-blue/12 bg-[#f7f9ff]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                              item.done
                                ? "border-green bg-green text-white"
                                : "border-blue/25 bg-paper"
                            )}
                          >
                            {item.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                          </span>
                          <div>
                            <p
                              className={cn(
                                "text-[15px] font-semibold text-ink sm:text-[17px]",
                                item.done && "line-through opacity-70"
                              )}
                            >
                              {item.title}
                            </p>
                            <p className="mt-1 text-[13px] text-muted sm:text-[15px]">{item.detail}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex min-h-[560px] flex-col bg-paper p-0 sm:min-h-[780px] lg:min-h-[900px]">
                  <div className="flex items-center justify-between border-b border-blue/12 px-4 py-4 sm:px-10 sm:py-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef2ff] animate-whale sm:h-12 sm:w-12">
                        <RegradeLogo variant="whale" size={28} />
                      </span>
                      <div className="text-left">
                        <p className="text-[15px] font-semibold text-ink sm:text-[16px]">Mr Whale</p>
                        <p className="font-ui text-[11px] text-blue sm:text-[12px]">
                          Live demo · question {(scriptIndex % chatScript.length) + 1} of{" "}
                          {chatScript.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-1 flex-col justify-end gap-5 overflow-hidden bg-[#f4f7ff] px-4 py-6 sm:gap-6 sm:px-10 sm:py-9">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pairKey}
                        className="flex flex-col gap-5 sm:gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35 }}
                      >
                        <AnimatePresence initial={false}>
                          {thread.map((item) =>
                            item.role === "user" ? (
                              <motion.div
                                key={item.id}
                                {...bubbleMotion}
                                className="flex justify-end"
                              >
                                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-blue px-4 py-3.5 text-[15px] leading-relaxed text-white sm:max-w-[78%] sm:px-6 sm:py-4 sm:text-[17px]">
                                  {item.text}
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key={item.id}
                                {...bubbleMotion}
                                className="flex items-end gap-2.5 sm:gap-3"
                              >
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef2ff] sm:h-10 sm:w-10">
                                  <RegradeLogo variant="whale" size={24} />
                                </span>
                                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-blue/15 bg-paper px-4 py-3.5 text-[15px] leading-relaxed text-ink shadow-sm sm:max-w-[82%] sm:px-6 sm:py-4 sm:text-[17px]">
                                  {item.typing ? (
                                    <span
                                      className="inline-flex gap-1.5 px-1 py-1"
                                      aria-label="Mr Whale is typing"
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
                    <div ref={bottomRef} />
                  </div>
                  <form
                    onSubmit={submit}
                    className="flex gap-2 border-t border-blue/12 bg-paper px-4 py-4 sm:gap-3 sm:px-9 sm:py-6"
                  >
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      aria-label="Ask Mr Whale about the mark"
                      placeholder="Ask about this mark…"
                      className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#f7f9ff] px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-[17px]"
                    />
                    <button
                      type="submit"
                      className="btn-pro grid h-12 w-12 shrink-0 place-items-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
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
