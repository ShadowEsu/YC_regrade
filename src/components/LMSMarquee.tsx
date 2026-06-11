type Platform = {
  name: string;
  logo?: string;
  logoClassName?: string;
  color?: string;
};

const platforms: Platform[] = [
  { name: "Canvas", logo: "/logos/canvas.png", logoClassName: "h-7 w-auto max-w-[148px]" },
  { name: "Blackboard", color: "#111827" },
  { name: "Google Classroom", color: "#0F9D58" },
  { name: "D2L Brightspace", color: "#F57C00" },
  { name: "Gradescope", color: "#0095FF" },
  { name: "Moodle", color: "#F98012" },
  { name: "Schoology", logo: "/logos/schoology.png", logoClassName: "h-7 w-7" },
  { name: "Turnitin", color: "#007398" },
  { name: "PowerSchool", color: "#004B87" },
  { name: "Sakai", color: "#4B5563" },
  { name: "Instructure", logo: "/logos/instructure.png", logoClassName: "h-5 w-auto max-w-[132px]" },
  { name: "Impact", color: "#00853E" },
  { name: "Mastery", color: "#00853E" },
];

function PlatformChip({ platform }: { platform: Platform }) {
  return (
    <div className="flex h-[52px] shrink-0 items-center justify-center rounded-lg border border-black/[0.05] bg-white px-6">
      {platform.logo ? (
        <img
          src={platform.logo}
          alt={platform.name}
          className={platform.logoClassName ?? "h-6 w-auto"}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="whitespace-nowrap font-ui text-[14px] font-semibold tracking-[-0.02em]"
          style={{ color: platform.color ?? "#374151" }}
        >
          {platform.name}
        </span>
      )}
    </div>
  );
}

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...platforms, ...platforms];

  return (
    <div className={`flex w-max gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
      {items.map((platform, i) => (
        <PlatformChip key={`${platform.name}-${i}`} platform={platform} />
      ))}
    </div>
  );
}

export function LMSMarquee() {
  return (
    <section className="overflow-hidden border-y border-black/[0.05] bg-[#f8f6f3] py-10">
      <div className="section-shell mb-7 text-center">
        <p className="font-ui text-[13px] font-semibold uppercase tracking-[0.1em] text-blue">
          Compatible with your LMS
        </p>
        <h2 className="font-display mt-2 text-[clamp(1.4rem,2.5vw,1.85rem)] font-semibold tracking-[-0.02em] text-ink">
          Works where you already submit work
        </h2>
      </div>

      <div className="mask-fade-x mb-3 overflow-hidden">
        <Track />
      </div>
      <div className="mask-fade-x overflow-hidden">
        <Track reverse />
      </div>
    </section>
  );
}
