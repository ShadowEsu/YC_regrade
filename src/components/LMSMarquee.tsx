import { cn } from "../lib/utils";

type TextPart = {
  text: string;
  color: string;
  size: string;
  weight: number;
  family: string;
  tracking?: string;
  transform?: "none" | "uppercase" | "lowercase";
};

type Platform = {
  name: string;
  bg: string;
  border: string;
  logo?: string;
  logoClassName?: string;
  parts?: TextPart[];
};

const sans = '"Source Sans 3", ui-sans-serif, system-ui, sans-serif';
const roboto = "Roboto, ui-sans-serif, system-ui, sans-serif";
const nunito = "Nunito, ui-sans-serif, system-ui, sans-serif";

const platforms: Platform[] = [
  {
    name: "Canvas",
    logo: "/logos/canvas-lms.png",
    logoClassName: "h-8 w-auto max-w-[160px]",
    bg: "#fff",
    border: "rgba(231, 36, 41, 0.14)",
  },
  {
    name: "Blackboard",
    parts: [
      {
        text: "Blackboard",
        color: "#111827",
        size: "1.35rem",
        weight: 800,
        family: sans,
        tracking: "0.06em",
        transform: "uppercase",
      },
    ],
    bg: "#fafafa",
    border: "rgba(17, 24, 39, 0.1)",
  },
  {
    name: "Google Classroom",
    parts: [
      { text: "Google ", color: "#5F6368", size: "1.25rem", weight: 500, family: roboto, tracking: "-0.01em" },
      { text: "Classroom", color: "#0F9D58", size: "1.25rem", weight: 500, family: roboto, tracking: "-0.01em" },
    ],
    bg: "#fff",
    border: "rgba(15, 157, 88, 0.16)",
  },
  {
    name: "Brightspace",
    parts: [
      { text: "bright", color: "#F57C00", size: "1.5rem", weight: 700, family: nunito, tracking: "-0.02em", transform: "lowercase" },
      { text: "space", color: "#C2410C", size: "1.5rem", weight: 700, family: nunito, tracking: "-0.02em", transform: "lowercase" },
    ],
    bg: "#fffaf5",
    border: "rgba(245, 124, 0, 0.18)",
  },
  {
    name: "Gradescope",
    parts: [
      { text: "Grade", color: "#0095FF", size: "1.45rem", weight: 700, family: sans, tracking: "-0.03em" },
      { text: "scope", color: "#0369A1", size: "1.45rem", weight: 400, family: sans, tracking: "-0.03em" },
    ],
    bg: "#fff",
    border: "rgba(0, 149, 255, 0.16)",
  },
  {
    name: "Moodle",
    parts: [
      { text: "moodle", color: "#F98012", size: "1.75rem", weight: 800, family: nunito, tracking: "-0.02em", transform: "lowercase" },
    ],
    bg: "#fffaf5",
    border: "rgba(249, 128, 18, 0.2)",
  },
  {
    name: "Schoology",
    logo: "/logos/schoology.png",
    logoClassName: "h-8 w-8",
    bg: "#fff",
    border: "rgba(37, 99, 235, 0.14)",
  },
  {
    name: "Turnitin",
    parts: [
      { text: "turn", color: "#007398", size: "1.4rem", weight: 600, family: sans, tracking: "-0.02em" },
      { text: "itin", color: "#0E7490", size: "1.4rem", weight: 300, family: sans, tracking: "-0.02em" },
    ],
    bg: "#fff",
    border: "rgba(0, 115, 152, 0.16)",
  },
  {
    name: "PowerSchool",
    parts: [
      { text: "Power", color: "#004B87", size: "1.25rem", weight: 700, family: sans, tracking: "-0.01em" },
      { text: "School", color: "#0077C8", size: "1.25rem", weight: 700, family: sans, tracking: "-0.01em" },
    ],
    bg: "#f8fbff",
    border: "rgba(0, 75, 135, 0.16)",
  },
  {
    name: "Sakai",
    parts: [
      { text: "Sakai", color: "#4B5563", size: "1.6rem", weight: 500, family: sans, tracking: "0.08em" },
    ],
    bg: "#fafafa",
    border: "rgba(75, 85, 99, 0.12)",
  },
  {
    name: "Instructure",
    logo: "/logos/instructure.png",
    logoClassName: "h-6 w-auto max-w-[140px]",
    bg: "#fff",
    border: "rgba(40, 122, 159, 0.14)",
  },
];

function PlatformChip({ platform }: { platform: Platform }) {
  return (
    <div
      className="glass flex h-[84px] shrink-0 items-center justify-center rounded-2xl px-8 transition-transform duration-300 hover:scale-[1.03]"
      style={{
        borderColor: platform.border,
      }}
    >
      {platform.logo ? (
        <img
          src={platform.logo}
          alt={platform.name}
          className={cn("object-contain", platform.logoClassName)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <p className="whitespace-nowrap leading-none">
          {platform.parts?.map((part, i) => (
            <span
              key={`${part.text}-${i}`}
              style={{
                color: part.color,
                fontSize: part.size,
                fontWeight: part.weight,
                fontFamily: part.family,
                letterSpacing: part.tracking,
                textTransform: part.transform ?? "none",
              }}
            >
              {part.text}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...platforms, ...platforms];

  return (
    <div
      className={cn(
        "flex w-max gap-4 py-1",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
    >
      {items.map((platform, i) => (
        <PlatformChip key={`${platform.name}-${i}`} platform={platform} />
      ))}
    </div>
  );
}

export function LMSMarquee() {
  return (
    <section className="overflow-hidden border-y border-black/[0.05] bg-[#f8f6f3] py-[clamp(40px,5vw,56px)]">
      <div className="section-shell mb-6 text-center">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
          Works with your LMS
        </p>
      </div>

      <div className="marquee-pause mask-fade-x mb-3 overflow-hidden">
        <Track />
      </div>
      <div className="marquee-pause mask-fade-x overflow-hidden">
        <Track reverse />
      </div>
    </section>
  );
}
