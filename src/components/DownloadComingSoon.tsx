import { Monitor, Smartphone } from "lucide-react";
import { cn } from "../lib/utils";
import { scrollToId } from "../lib/scroll";

const platforms = [
  { id: "windows", label: "Download for Windows", icon: Monitor },
  { id: "desktop", label: "Download for Desktop", icon: Monitor },
  { id: "ios", label: "Download for iOS", icon: Smartphone },
] as const;

type Props = {
  className?: string;
  tone?: "light" | "dark";
  showWaitlistCta?: boolean;
};

export function DownloadComingSoon({
  className,
  tone = "light",
  showWaitlistCta = true,
}: Props) {
  const isDark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-[28px] border px-5 py-6 sm:px-7 sm:py-7",
          isDark
            ? "border-white/15 bg-white/8"
            : "border-blue/20 bg-paper shadow-[0_18px_44px_-28px_rgba(30,79,255,0.45)]"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className={cn(
                "font-ui text-[11px] font-bold uppercase tracking-[0.14em]",
                isDark ? "text-[#9db5ff]" : "text-blue"
              )}
            >
              App status
            </p>
            <h3
              className={cn(
                "mt-1.5 font-display text-[clamp(1.35rem,3vw,1.7rem)] font-semibold leading-tight tracking-[-0.03em]",
                isDark ? "text-white" : "text-ink"
              )}
            >
              Final private beta mode
            </h3>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1.5 font-ui text-[12px] font-bold uppercase tracking-[0.08em]",
              isDark ? "bg-white/12 text-white" : "bg-blue text-white"
            )}
          >
            Coming soon
          </span>
        </div>

        <p
          className={cn(
            "mt-3 max-w-[520px] font-ui text-[14px] leading-relaxed sm:text-[15px]",
            isDark ? "text-white/70" : "text-muted"
          )}
        >
          Windows and desktop downloads are not open yet. The app is in its final private beta —
          production-ready bits, last onboarding polish.
        </p>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className={cn(
                  "flex cursor-not-allowed flex-col items-start rounded-2xl border px-4 py-3.5 text-left opacity-60",
                  isDark
                    ? "border-white/15 bg-white/5 text-white"
                    : "border-black/10 bg-blue-soft text-ink"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="font-ui text-[13px] font-semibold leading-snug">
                    {platform.label}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em]",
                    isDark ? "text-[#9db5ff]" : "text-blue"
                  )}
                >
                  Coming soon
                </span>
              </button>
            );
          })}
        </div>

        {showWaitlistCta && (
          <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="btn-pro inline-flex min-h-12 items-center justify-center rounded-2xl px-6 text-[15px] font-bold"
            >
              Join waitlist for onboarding access
            </button>
            <p
              className={cn(
                "font-ui text-[13px] leading-snug sm:max-w-[280px]",
                isDark ? "text-white/60" : "text-muted"
              )}
            >
              Get a chance to see the app onboarding in its final production-ready form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
