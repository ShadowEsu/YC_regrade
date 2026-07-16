import { Monitor, Smartphone } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";
import { cn } from "../lib/utils";

const platforms = [
  { id: "windows", label: "Download for Windows" },
  { id: "desktop", label: "Download for Desktop / Mac" },
  { id: "ios", label: "Download for iOS" },
] as const;

export function DownloadSection() {
  return (
    <section
      id="download"
      className="scroll-mt-[120px] border-b border-blue/10 bg-paper py-[clamp(56px,7vw,88px)] sm:scroll-mt-[132px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-blue">
              Final private beta
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              Windows & desktop downloads{" "}
              <span className="text-gradient-live">coming soon</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] font-ui text-[clamp(16px,2vw,18px)] leading-[1.65] text-muted">
              The app is in its final private beta — production-ready bits, last onboarding polish.
              Installers are not open yet, so these buttons stay locked.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-8 grid max-w-[720px] gap-3 sm:grid-cols-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className={cn(
                  "flex cursor-not-allowed flex-col items-start rounded-2xl border border-black/10 bg-blue-soft px-4 py-4 text-left opacity-60"
                )}
              >
                <span className="inline-flex items-center gap-2 text-ink">
                  {platform.id === "ios" ? (
                    <Smartphone className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <Monitor className="h-4 w-4 shrink-0" aria-hidden />
                  )}
                  <span className="font-ui text-[13px] font-semibold leading-snug">
                    {platform.label}
                  </span>
                </span>
                <span className="mt-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
                  Coming soon
                </span>
              </button>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-[520px] flex-col items-center gap-3 text-center">
            <button
              type="button"
              onClick={() => scrollToId("#waitlist")}
              className="btn-pro inline-flex min-h-14 w-full items-center justify-center rounded-2xl px-8 text-[16px] font-bold sm:w-auto sm:min-w-[320px]"
            >
              Join waitlist for onboarding access
            </button>
            <p className="max-w-[460px] font-ui text-[14px] leading-relaxed text-muted">
              Get a chance to see the app onboarding in its final production-ready form before
              downloads open.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
