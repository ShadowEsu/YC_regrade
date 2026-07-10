import { REGRADE_CONFIG } from "../lib/site-config";
import { RegradeLogo } from "./RegradeLogo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Review, Appeal, Study, Coach", href: "/#product" },
      { label: "Trust and evidence", href: "/#trust" },
      { label: "Supervisor private beta", href: "/#supervisor" },
      { label: "Join waitlist", href: "/#waitlist" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Founder note", href: "/#proof" },
      { label: "regradeteam@gmail.com", href: "mailto:regradeteam@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy.html" },
      { label: "Terms of service", href: "/terms.html" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/regrade_app", external: true },
      { label: "X", href: "https://x.com/regrade_app", external: true },
      { label: "Book an interview", href: REGRADE_CONFIG.calendlyUrl, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d1d42] text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(157,181,255,0.2)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="section-shell relative py-16 sm:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <div className="max-w-[400px]">
            <a
              href="/#top"
              className="inline-flex items-center transition-transform duration-300 hover:scale-105"
            >
              <RegradeLogo variant="wordmark" size={52} invert />
            </a>
            <p className="mt-6 font-display text-[clamp(17px,2vw,19px)] font-medium leading-[1.6] tracking-[-0.01em] text-white/85">
              Understand your grade. Learn from it. Make the strongest appeal.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/55">
              Regrade provides educational support, not legal or institutional decision-making.
              Students should review original marked work and follow their school&apos;s policy before
              submitting an appeal.
            </p>
          </div>

          <div className="grid w-full max-w-[720px] grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-white/55">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-ui text-[16px] leading-snug text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[14px] text-white/60">
            © {new Date().getFullYear()} Preston Jay Susanto. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f26522] font-display text-[11px] font-bold text-white">
              Y
            </span>
            <span className="font-display text-[14px] font-medium tracking-[-0.01em] text-white/90">
              Applying to Y Combinator · Winter 2026 Batch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
