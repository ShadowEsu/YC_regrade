import { cn } from "../lib/utils";

type Connector = {
  name: string;
  logo: string;
  logoClass: string;
};

const connectors: Connector[] = [
  {
    name: "Google Classroom",
    logo: "/logos/google-classroom.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Canvas",
    logo: "/logos/canvas-wordmark.png",
    logoClass: "h-14 w-auto max-w-[240px] sm:h-16 object-contain",
  },
  {
    name: "Gradescope",
    logo: "/logos/gradescope-wordmark.svg",
    logoClass: "h-12 w-auto max-w-[260px] sm:h-14 object-contain",
  },
  {
    name: "Moodle",
    logo: "/logos/moodle.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "Blackboard",
    logo: "/logos/blackboard.png",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover",
  },
  {
    name: "Brightspace",
    logo: "/logos/brightspace.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "Schoology",
    logo: "/logos/schoology-mark.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "Microsoft Teams",
    logo: "/logos/teams.png",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Google Drive",
    logo: "/logos/googledrive.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "OneDrive",
    logo: "/logos/onedrive.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "Dropbox",
    logo: "/logos/dropbox.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain",
  },
  {
    name: "Apple Files",
    logo: "/logos/apple.svg",
    logoClass: "h-14 w-14 sm:h-16 sm:w-16 object-contain opacity-90",
  },
];

function LogoRow({
  items,
  reverse = false,
}: {
  items: Connector[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        "flex w-max items-center gap-14 py-3 sm:gap-20 md:gap-24",
        reverse ? "animate-marquee-connectors-reverse" : "animate-marquee-connectors"
      )}
    >
      {loop.map((item, index) => (
        <img
          key={`${item.name}-${index}`}
          src={item.logo}
          alt={index < items.length ? item.name : ""}
          aria-hidden={index >= items.length}
          className={cn("shrink-0", item.logoClass)}
          draggable={false}
        />
      ))}
    </div>
  );
}

export function ConnectionsSection() {
  return (
    <section
      id="connections"
      className="scroll-mt-[120px] overflow-hidden border-b border-black/[0.07] bg-paper py-[clamp(56px,8vw,96px)]"
    >
      <div className="section-shell mb-10 text-center sm:mb-12">
        <p className="font-ui text-[14px] font-bold uppercase tracking-[0.14em] text-blue sm:text-[15px]">
          Connections · private beta
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.35rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          Works with the platforms{" "}
          <span className="text-gradient-live">you already use.</span>
        </h2>
      </div>

      <div className="mask-fade-x overflow-hidden" aria-label="Connected platforms">
        <LogoRow items={connectors} />
      </div>
      <div className="mask-fade-x mt-8 overflow-hidden sm:mt-10" aria-hidden>
        <LogoRow items={[...connectors].reverse()} reverse />
      </div>
    </section>
  );
}
