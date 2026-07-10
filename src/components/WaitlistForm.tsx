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
  accent: _accent = "ink",
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
  const fieldHeight = large ? "h-14" : "h-12";
  const fieldText = large ? "text-[18px]" : "text-[16px]";
  const buttonText = large ? "text-[17px]" : "text-[15px]";

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
    "w-full rounded-xl border px-4 tracking-[-0.01em] outline-none transition-colors",
    fieldHeight,
    fieldText,
    "focus:border-blue/55 focus:ring-2 focus:ring-blue/15",
    variant === "dark"
      ? "border border-white/25 bg-[#0b1a4a]/45 text-white placeholder:text-white/50 focus:border-[#9db5ff] focus:ring-[#9db5ff]/25"
      : variant === "offer"
        ? "border border-white/40 bg-[#0b1a4a]/35 text-white placeholder:text-white/55 focus:border-white/70 focus:ring-white/20"
        : "border border-blue/25 bg-blue-wash text-ink placeholder:text-faint"
  );

  const buttonClass = cn(
    "shrink-0 cursor-pointer rounded-xl px-7 font-ui font-bold tracking-[-0.02em] transition-all duration-300",
    fieldHeight,
    buttonText,
    "disabled:cursor-not-allowed disabled:opacity-50",
    inline ? "w-full sm:w-auto" : "w-full",
    variant === "dark"
      ? "btn-pro px-8 shadow-[0_12px_32px_-10px_rgba(30,79,255,0.8)]"
      : "btn-pro"
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
          className={cn(inputClass, inline && (large ? "sm:max-w-[240px]" : "sm:max-w-[200px]"))}
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
