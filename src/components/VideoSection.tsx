import { Play } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { REGRADE_CONFIG } from "../lib/site-config";

export function VideoSection() {
  const { demoVideoUrl } = REGRADE_CONFIG;

  return (
    <section className="section-paper py-[clamp(56px,8vw,88px)]">
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
              60-second walkthrough
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              See what the app actually does.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-muted">
              Upload → scan rubric → see recoverable points → optional email draft. That&apos;s the
              whole flow.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-10 max-w-[800px]">
            {demoVideoUrl ? (
              <div className="aspect-video overflow-hidden rounded-2xl border border-black/[0.08] shadow-[0_8px_40px_rgba(9,9,11,0.08)]">
                <iframe
                  src={demoVideoUrl}
                  title="Regrade demo"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/[0.08] bg-gradient-to-br from-blue-soft via-white to-cream shadow-[0_8px_40px_rgba(9,9,11,0.06)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-blue text-white shadow-[0_4px_24px_rgba(30,79,255,0.35)]">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
                  </div>
                  <p className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                    Demo video coming soon
                  </p>
                  <p className="mt-2 max-w-[360px] text-[15px] leading-relaxed text-muted">
                    A short screen recording of a real upload and score change will go here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
