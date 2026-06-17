import { REGRADE_CONFIG } from "../lib/site-config";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

const stats = [
  { value: String(spotsLeft), label: "Pro Max spots left", accent: "text-blue" },
  { value: "16", label: "Regions supported", accent: "text-ink" },
  { value: "3", label: "Steps to recover points", accent: "text-ink" },
  { value: "$0", label: "Cost in beta", accent: "text-green" },
];

export function StatsStrip() {
  return (
    <div className="border-b border-black/[0.06] bg-white py-8">
      <div className="section-shell">
        <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-4 py-5 text-center">
              <p className={`font-display text-[clamp(1.5rem,3vw,1.85rem)] font-semibold tabular-nums ${s.accent}`}>
                {s.value}
              </p>
              <p className="mt-1 font-ui text-[12px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
