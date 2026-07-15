import { Download } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { REGRADE_CONFIG } from "../lib/site-config";

export function DownloadSection() {
  const { appVersion, downloadMacArm64, downloadMacIntel, downloadWindows, releaseNotesUrl } =
    REGRADE_CONFIG;

  return (
    <section
      id="download"
      className="scroll-mt-[120px] border-b border-blue/10 bg-paper py-[clamp(56px,7vw,88px)] sm:scroll-mt-[132px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-blue">
              Desktop v{appVersion}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              Download Regrade for Mac or Windows
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] font-ui text-[clamp(16px,2vw,18px)] leading-[1.65] text-muted">
              Install the desktop app, sign in, and start reviewing marked exams. Unsigned beta
              builds may need a right-click Open the first time on Mac.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-10 flex max-w-[720px] flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={downloadMacArm64}
              className="btn-pro inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-bold shadow-[0_14px_36px_-14px_rgba(30,79,255,0.65)] transition-transform duration-300 hover:scale-[1.02] sm:min-w-[240px] sm:flex-none"
            >
              <Download className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              Mac (Apple Silicon)
            </a>
            <a
              href={downloadWindows}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-blue/30 bg-paper px-6 text-[15px] font-bold text-blue transition-all duration-300 hover:border-blue hover:bg-blue hover:text-white sm:min-w-[200px] sm:flex-none"
            >
              <Download className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              Windows
            </a>
          </div>
          <p className="mx-auto mt-5 max-w-[560px] text-center font-ui text-[13px] text-muted">
            <a
              href={downloadMacIntel}
              className="font-semibold text-blue underline-offset-2 transition-colors hover:underline"
            >
              Intel Mac DMG
            </a>
            {" · "}
            <a
              href={releaseNotesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue underline-offset-2 transition-colors hover:underline"
            >
              Release notes
            </a>
            {" · "}
            Version {appVersion}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
