import { SectionReveal } from "./SectionReveal";
import { WaitlistForm } from "./WaitlistForm";
import { scrollToId } from "../lib/scroll";
import { REGRADE_CONFIG } from "../lib/site-config";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

export function CTASection() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-[120px] overflow-hidden bg-[linear-gradient(165deg,#050b1f_0%,#0b1a4a_40%,#1236c9_100%)] sm:scroll-mt-[132px]"
    >
      <div className="section-shell relative flex items-center py-[clamp(72px,10vw,112px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="mb-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-[#9db5ff]">
              Start in the browser
            </p>
            <h2 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              <span className="text-gradient-live">Bring One Marked Exam.</span>
            </h2>
            <div className="mx-auto mt-6 grid max-w-[560px] gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-left backdrop-blur-sm">
                <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#9db5ff]">
                  When you start
                </p>
                <p className="mt-1 font-display text-[clamp(1.25rem,3vw,1.55rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                  2 months Plus free trial
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-left backdrop-blur-sm">
                <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#9db5ff]">
                  Waitlist offer
                </p>
                <p className="mt-1 font-display text-[clamp(1.25rem,3vw,1.55rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                  First {REGRADE_CONFIG.waitlistDisplayMax} get Pro free for 1 year
                </p>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-[420px] font-ui text-[14px] leading-relaxed text-white/60">
              Powered by OpenAI. No download required.
            </p>

            <div className="mx-auto mt-8 flex w-full max-w-[480px] flex-col items-center gap-3">
              <a
                href={REGRADE_CONFIG.webAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-white px-8 text-[16px] font-bold text-blue shadow-[0_14px_36px_-14px_rgba(255,255,255,0.35)] transition-transform duration-300 hover:scale-[1.02]"
              >
                Open web app
              </a>
              <button
                type="button"
                onClick={() => scrollToId("#download")}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 text-[14px] font-semibold text-white/90 transition-colors hover:border-white hover:bg-white/10"
              >
                Download desktop
              </button>
            </div>

            <div className="mx-auto mt-10 w-full max-w-[640px]">
              <p className="mb-3 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-white/55">
                Or join the waitlist
              </p>
              <WaitlistForm
                source="offer"
                submitLabel="Get early access"
                variant="dark"
                layout="inline"
                size="lg"
              />
            </div>

            <p className="mx-auto mt-5 max-w-[480px] font-ui text-[13px] leading-relaxed text-white/55">
              Questions?{" "}
              <a
                href="mailto:preston@regrade.org"
                className="text-[#9db5ff] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                preston@regrade.org
              </a>
              {" · "}
              Updates and CS jobs on{" "}
              <a
                href={REGRADE_CONFIG.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9db5ff] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                LinkedIn
              </a>
            </p>

            <div className="mx-auto mt-9 flex max-w-[420px] justify-center gap-8 text-center">
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1 font-ui text-[12px] text-white/55">Joined</p>
              </div>
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-[#9db5ff]">{spotsLeft}</p>
                <p className="mt-1 font-ui text-[12px] text-white/55">Pro spots left</p>
              </div>
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-white">$0</p>
                <p className="mt-1 font-ui text-[12px] text-white/55">During beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
