import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { joinWaitlist } from "../lib/waitlist";
import { useTypewriter } from "../hooks/useTypewriter";
import { cn } from "../lib/utils";

type Props = {
  source: string;
  submitLabel?: string;
  variant?: "light" | "dark" | "offer";
  accent?: "ink" | "blue";
  layout?: "stacked" | "inline";
  size?: "md" | "lg";
};

const SUCCESS_MESSAGE =
  "You're on the list — we'll email you when your invite is ready.";

export function WaitlistForm({
  source,
  submitLabel = "Join waitlist",
  variant = "light",
  accent = "ink",
  layout = "stacked",
  size = "md",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const { output: typedSuccess, done: typingDone } = useTypewriter(
    success ? SUCCESS_MESSAGE : "",
    28,
    200
  );

  const inline = layout === "inline";
  const large = size === "lg";
  const fieldHeight = large ? "h-12" : "h-11";
  const fieldText = large ? "text-[17px]" : "text-[16px]";
  const buttonText = large ? "text-[16px]" : "text-[15px]";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) {
      setSuccess(true);
      return;
    }

    setError("");
    setLoading(true);
    const result = await joinWaitlist(name, email, source);

    if (result.ok) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    if (result.error === "invalid_name") setError("Please enter your full name.");
    else if (result.error === "invalid_email") setError("Please use a valid email.");
    else setError("Something went wrong. Please try again.");
  }

  const inputClass = cn(
    "w-full rounded-xl border px-4 tracking-[-0.01em] outline-none backdrop-blur-md transition-colors",
    fieldHeight,
    fieldText,
    "focus:border-blue/45 focus:ring-2 focus:ring-blue/12",
    variant === "dark"
      ? "border-white/12 bg-white/[0.08] text-white placeholder:text-white/40"
      : variant === "offer"
        ? "border-white/35 bg-white/20 text-white placeholder:text-white/50 focus:border-white/70 focus:ring-white/20"
        : "border-white/70 bg-white/40 text-ink placeholder:text-faint"
  );

  const buttonClass = cn(
    "shrink-0 cursor-pointer rounded-xl px-6 font-ui font-semibold tracking-[-0.02em] transition-all duration-300",
    fieldHeight,
    buttonText,
    "disabled:cursor-not-allowed disabled:opacity-50",
    inline ? "w-full sm:w-auto" : "w-full",
    variant === "dark"
      ? "bg-white text-ink hover:bg-white/92"
      : variant === "offer" || accent === "ink"
        ? "btn-pro"
        : "bg-blue text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),0_8px_24px_-12px_rgba(30,79,255,0.45)] hover:bg-blue-deep"
  );

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex gap-3 rounded-lg border px-5 py-4 text-left",
          variant === "dark"
            ? "border-emerald-400/25 bg-emerald-500/12"
            : "border-emerald-200 bg-emerald-50"
        )}
      >
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
        <div>
          <p className="text-[15px] font-semibold text-emerald-900">
            {typingDone ? "You're on the list" : "Submitting…"}
          </p>
          <p className="typewriter-cursor mt-1 text-[14px] leading-relaxed text-emerald-800/90">
            {typedSuccess}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={inline ? "w-full" : undefined}>
      <form
        onSubmit={handleSubmit}
        className={cn(inline ? "flex flex-col gap-2.5 sm:flex-row sm:items-center" : "space-y-2.5")}
      >
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
          aria-label="Full name"
          required
          className={cn(inputClass, inline && (large ? "sm:max-w-[210px]" : "sm:max-w-[180px]"))}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          autoComplete="email"
          aria-label="Email address"
          required
          className={cn(inputClass, inline && "sm:flex-1")}
        />
        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? "Joining…" : submitLabel}
        </button>
      </form>
      {error && (
        <p
          className={cn(
            "mt-2.5 text-[14px] font-medium",
            inline ? "text-center sm:text-left" : "",
            variant === "dark" ? "text-rose-300" : variant === "offer" ? "text-rose-200" : "text-rose-500"
          )}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
