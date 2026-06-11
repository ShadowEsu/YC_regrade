import { motion } from "framer-motion";
import { ScrollHint } from "./ScrollHint";
import { WaitlistForm } from "./WaitlistForm";
import { REGRADE_CONFIG } from "../lib/site-config";

const ease = [0.16, 1, 0.3, 1] as const;

const word = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.65, ease },
  },
};

const block = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

function FadeWords({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          variants={word}
          style={{ display: "inline-block" }}
        >
          {part}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  );
}

type Props = {
  ready: boolean;
};

export function Hero({ ready }: Props) {
  const spotsLeft =
    REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

  return (
    <header
      id="top"
      className="relative flex min-h-[calc(100vh-108px)] flex-col items-center justify-center bg-gradient-to-b from-blue-soft via-[#f5f3ef] to-[#f8f6f3] px-6 pt-[116px] text-center sm:min-h-[calc(100vh-112px)] sm:pt-[124px]"
    >
      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
        }}
        className="mx-auto w-full max-w-[960px]"
      >
        <motion.div variants={block}>
          <motion.h1
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
            }}
            className="font-display text-[clamp(3.1rem,7.2vw,6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          >
            <FadeWords text="The rubric was clear." />
            <br />
            <em className="italic text-blue">
              <FadeWords text="Your grade wasn't." />
            </em>
          </motion.h1>
        </motion.div>

        <motion.p
          variants={block}
          className="mx-auto mt-10 max-w-[680px] font-display text-[clamp(20px,2.5vw,24px)] font-medium leading-[1.55] tracking-[-0.02em] text-muted"
        >
          Upload your graded work. Regrade checks every point against the rubric and drafts a
          respectful appeal you send yourself.
        </motion.p>

        <motion.div variants={block} className="mx-auto mt-11 w-full max-w-[720px]">
          <WaitlistForm
            source="hero"
            submitLabel="Join waitlist"
            variant="light"
            layout="inline"
            accent="ink"
            size="lg"
          />
        </motion.div>

        <motion.p
          variants={block}
          className="mt-6 font-display text-[clamp(16px,1.8vw,18px)] font-medium tabular-nums text-ink/50"
        >
          {REGRADE_CONFIG.waitlistDisplayCount} joined · {spotsLeft} spots left · Pro Max free for
          12 months
        </motion.p>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0">
        <ScrollHint />
      </div>
    </header>
  );
}
