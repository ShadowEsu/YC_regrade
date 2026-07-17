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
  const [position, setPosition] = useState<number | undefined>();
  const [duplicate, setDuplicate] = useState(false);

  const successMessage = duplicate
    ? "You're already on the list — we'll email you when your invite is ready."
    : position
      ? `You're #${position} on the list — we'll email you when your invite is ready.`
      : "You're on the list — we'll email you when your invite is ready.";

  const { output: typedSuccess, done: typingDone } = useTypewriter(
    success ? successMessage : "",
    28,
    200
  );

  const large = size === "lg";
  // Always stack for large forms so the email field stays full width on laptops
  const stacked = layout === "stacked" || large;
  const fieldHeight = large ? "h-16" : "h-14";
  const fieldText = large ? "text-[20px]" : "text-[17px]";
  const buttonText = large ? "text-[18px]" : "text-[16px]";

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
      setDuplicate(Boolean(result.duplicate));
      setPosition(result.position);
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
    "w-full min-w-0 rounded-2xl border px-5 tracking-[-0.01em] outline-none transition-colors",
    fieldHeight,
    fieldText,
    "focus:border-blue/55 focus:ring-2 focus:ring-blue/15",
    variant === "dark"
      ? "border border-white/25 bg-[#0b1a4a]/45 text-white placeholder:text-white/50 focus:border-[#9db5ff] focus:ring-[#9db5ff]/25"
      : variant === "offer"
        ? "border border-white/40 bg-[#0b1a4a]/35 text-white placeholder:text-white/55 focus:border-white/70 focus:ring-white/20"
        : "border border-black/10 bg-paper text-ink placeholder:text-faint shadow-sm"
  );

  const buttonClass = cn(
    "w-full shrink-0 cursor-pointer rounded-2xl px-8 font-ui font-bold tracking-[-0.02em] transition-all duration-300",
    fieldHeight,
    buttonText,
    "disabled:cursor-not-allowed disabled:opacity-50",
    variant === "dark"
      ? "btn-pro shadow-[0_12px_32px_-10px_rgba(30,79,255,0.8)]"
      : "btn-pro"
  );

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex gap-3 rounded-2xl border px-5 py-5 text-left",
          variant === "dark"
            ? "border-emerald-400/25 bg-emerald-500/12"
            : "border-emerald-200 bg-emerald-50"
        )}
      >
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.5} />
        <div>
          <p className="text-[17px] font-semibold text-emerald-900">
            {typingDone ? (duplicate ? "Already on the list" : "You're on the list") : "Submitting…"}
          </p>
          <p className="typewriter-cursor mt-1 text-[15px] leading-relaxed text-emerald-800/90">
            {typedSuccess}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={cn(
          stacked
            ? "flex w-full flex-col gap-3"
            : "flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
        )}
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
          className={cn(inputClass, !stacked && "sm:w-[34%] sm:min-w-[220px]")}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          autoComplete="email"
          aria-label="Email address"
          required
          className={cn(inputClass, !stacked && "sm:min-w-[280px] sm:flex-1")}
        />
        <button type="submit" disabled={loading} className={cn(buttonClass, !stacked && "sm:w-auto sm:min-w-[200px]")}>
          {loading ? "Joining…" : submitLabel}
        </button>
      </form>
      {error && (
        <p
          className={cn(
            "mt-3 text-[15px] font-medium",
            variant === "dark"
              ? "text-rose-300"
              : variant === "offer"
                ? "text-rose-200"
                : "text-rose-500"
          )}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
