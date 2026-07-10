import { useEffect, useState } from "react";
import type { FormEvent } from "react";
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
    question: "Why did I lose points on question 4?",
    answer:
      "Your claim is clear. The note is about the explanation after quote two — practise that before the final.",
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
    question: "Help me ask about the evidence deduction.",
    answer:
      "The rubric awards four points for evidence. Ask how the deduction maps to that criterion before requesting a regrade.",
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
    question: "What should I practise before the final?",
    answer:
      "Link evidence to your claim. It shows up across two exams — drill that first.",
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
    question: "Explain this mark simply.",
    answer:
      "You got credit for a clear claim. The deduction is the link after quote two. Practise restating that link.",
    icon: CheckCircle2,
    image: "/logo-mark-app.png",
    imageAlt: "Regrade Coach with Mr Whale",
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

export function ProductShowcase() {
  const [mode, setMode] = useState<ModeId>("review");
  const [message, setMessage] = useState<string>(modes[0].question);
  const [sent, setSent] = useState<string>(modes[0].question);
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const selected = modes.find((item) => item.id === mode)!;

  useEffect(() => {
    setMessage(selected.question);
    setSent(selected.question);
    setLoading(true);
    setTyped("");
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      let index = 0;
      timer = window.setInterval(() => {
        index += 2;
        setTyped(selected.answer.slice(0, index));
        if (index >= selected.answer.length) {
          if (timer) window.clearInterval(timer);
          setLoading(false);
        }
      }, 16);
    }, 680);
    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [selected]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value) return;
    setSent(value);
    setLoading(true);
    setTyped("");
    window.setTimeout(() => {
      let index = 0;
      const timer = window.setInterval(() => {
        index += 2;
        setTyped(selected.answer.slice(0, index));
        if (index >= selected.answer.length) {
          window.clearInterval(timer);
          setLoading(false);
        }
      }, 16);
    }, 680);
  }

  return (
    <section id="product" className="scroll-mt-[120px] bg-blue-soft py-[clamp(64px,11vw,140px)]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:max-w-[1360px]">
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
          <div className="mt-8 overflow-hidden rounded-[24px] border border-blue/25 bg-blue-wash shadow-[0_28px_80px_rgba(30,79,255,0.14)] sm:mt-12 sm:rounded-[32px]">
            <div className="flex gap-1 overflow-x-auto border-b border-blue/15 bg-[#d7e2ff] px-3 py-3 sm:gap-1.5 sm:px-6 sm:py-4">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-3.5 py-2 font-ui text-[13px] font-semibold transition-all duration-300 sm:rounded-xl sm:px-5 sm:py-3 sm:text-[15px]",
                    mode === item.id
                      ? "bg-blue text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)]"
                      : "text-muted hover:bg-blue-soft hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-[.95fr_1.05fr]">
              <div className="border-b border-blue/15 bg-blue-wash p-5 sm:p-9 lg:border-b-0 lg:border-r lg:p-12 xl:p-14">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  width={88}
                  height={88}
                  className="h-14 w-14 rounded-[16px] object-contain sm:h-[88px] sm:w-[88px] sm:rounded-[20px]"
                />
                <p className="mt-5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-blue sm:mt-9 sm:text-[13px]">
                  {selected.labelText}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.65rem,3.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:mt-3">
                  {selected.title}
                </h3>
                <p className="mt-3 max-w-[480px] text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-[18px]">
                  {selected.description}
                </p>
                <div className="mt-5 rounded-2xl border border-blue/20 bg-paper p-4 sm:mt-9 sm:p-6">
                  <p className="font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-blue sm:text-[12px]">
                    Evidence in view
                  </p>
                  <p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink sm:text-[16px]">
                    Rubric: “Explain how evidence supports the claim.”
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted sm:text-[16px]">
                    Teacher note: “Explain the link after quote two.”
                  </p>
                </div>
              </div>

              {mode === "study" ? (
                <div className="flex min-h-[420px] flex-col bg-paper p-5 sm:min-h-[640px] sm:p-8 lg:min-h-[720px] lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[0.09em] text-blue sm:text-[13px]">
                      Study checklist · from marked exams
                    </span>
                    <span className="rounded-full bg-blue/15 px-3 py-1 font-ui text-[11px] font-bold text-blue">
                      2 exams
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-1 flex-col gap-3 sm:mt-8 sm:gap-3.5">
                    {studyItems.map((item) => (
                      <li
                        key={item.title}
                        className={cn(
                          "rounded-2xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-4",
                          item.done
                            ? "border-green/20 bg-green/[0.05]"
                            : "border-blue/15 bg-blue-wash"
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
                                "text-[15px] font-semibold text-ink sm:text-[16px]",
                                item.done && "line-through opacity-70"
                              )}
                            >
                              {item.title}
                            </p>
                            <p className="mt-1 text-[13px] text-muted sm:text-[14px]">{item.detail}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-ui text-[13px] leading-relaxed text-muted sm:mt-6 sm:text-[14px]">
                    Uses exams only. Check-offs stay on your profile with links back to the original
                    feedback.
                  </p>
                </div>
              ) : (
                <div className="flex min-h-[420px] flex-col bg-paper p-0 sm:min-h-[640px] lg:min-h-[720px]">
                  <div className="flex items-center justify-between border-b border-blue/15 px-4 py-4 sm:px-9 sm:py-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-wash animate-whale sm:h-11 sm:w-11">
                        <RegradeLogo variant="whale" size={26} />
                      </span>
                      <div className="text-left">
                        <p className="text-[14px] font-semibold text-ink sm:text-[15px]">Mr Whale</p>
                        <p className="font-ui text-[11px] text-blue sm:text-[12px]">
                          Beside the work · evidence-linked
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-blue-soft/60 px-4 py-5 sm:gap-5 sm:px-9 sm:py-7">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[14px] leading-relaxed text-white sm:max-w-[78%] sm:px-5 sm:py-3.5 sm:text-[16px]">
                        {sent}
                      </div>
                    </div>
                    <div className="flex items-end gap-2.5 sm:gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-wash sm:h-9 sm:w-9">
                        <RegradeLogo variant="whale" size={22} />
                      </span>
                      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-blue/20 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink sm:max-w-[82%] sm:px-5 sm:py-3.5 sm:text-[16px]">
                        {loading ? (
                          <span
                            className="inline-flex gap-1 px-1 py-1"
                            aria-label="Mr Whale is typing"
                          >
                            <i className="typing-dot" />
                            <i className="typing-dot" />
                            <i className="typing-dot" />
                          </span>
                        ) : (
                          typed
                        )}
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={submit}
                    className="flex gap-2 border-t border-blue/15 bg-paper px-4 py-4 sm:gap-2.5 sm:px-8 sm:py-5"
                  >
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      aria-label="Ask Mr Whale about the mark"
                      placeholder="Ask about this mark…"
                      className="min-w-0 flex-1 rounded-xl border border-blue/25 bg-blue-wash px-4 py-3 text-[14px] text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-[16px]"
                    />
                    <button
                      type="submit"
                      className="btn-pro grid h-11 w-11 shrink-0 place-items-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl"
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
