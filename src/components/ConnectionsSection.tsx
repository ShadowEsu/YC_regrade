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
    logoClass: "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 object-contain",
  },
  {
    name: "Canvas",
    logo: "/logos/canvas-wordmark.png",
    logoClass: "h-14 w-auto max-w-[260px] sm:h-16 object-contain",
  },
  {
    name: "Gradescope",
    logo: "/logos/gradescope-wordmark.svg",
    logoClass: "h-12 w-auto max-w-[280px] sm:h-14 object-contain",
  },
  {
    name: "Moodle",
    logo: "/logos/moodle.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Blackboard",
    logo: "/logos/blackboard.png",
    logoClass: "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 rounded-[22%] object-cover",
  },
  {
    name: "Brightspace",
    logo: "/logos/brightspace.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Schoology",
    logo: "/logos/schoology-mark.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Microsoft Teams",
    logo: "/logos/teams.png",
    logoClass: "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 object-contain",
  },
  {
    name: "Google Drive",
    logo: "/logos/googledrive.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "OneDrive",
    logo: "/logos/onedrive.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Dropbox",
    logo: "/logos/dropbox.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain",
  },
  {
    name: "Apple Files",
    logo: "/logos/apple.svg",
    logoClass: "h-16 w-16 sm:h-20 sm:w-20 object-contain opacity-90",
  },
];

function LogoTrack({ reverse = false }: { reverse?: boolean }) {
  const loop = [...connectors, ...connectors];
  return (
    <div
      className={cn(
        "flex w-max items-center gap-16 sm:gap-24 md:gap-28",
        reverse ? "animate-marquee-connectors-reverse" : "animate-marquee-connectors"
      )}
    >
      {loop.map((item, index) => (
        <img
          key={`${item.name}-${index}`}
          src={item.logo}
          alt=""
          aria-hidden
          className={cn("pointer-events-none shrink-0 select-none", item.logoClass)}
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
      className="scroll-mt-[120px] overflow-hidden border-y border-blue/10 bg-blue-soft py-[clamp(48px,7vw,88px)]"
    >
      <div className="section-shell mb-8 text-center sm:mb-10">
        <h2 className="font-display text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          Connections{" "}
          <span className="text-gradient-live">all over the world.</span>
        </h2>
      </div>

      <div className="mask-fade-x overflow-hidden" aria-label="Connected platforms">
        <LogoTrack />
      </div>
      <div className="mask-fade-x mt-10 overflow-hidden sm:mt-12" aria-hidden>
        <LogoTrack reverse />
      </div>
    </section>
  );
}
