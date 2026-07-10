import { cn } from "../lib/utils";

type Connector = {
  name: string;
  logo: string;
  logoClass: string;
};

const icon = "h-14 w-14 sm:h-20 sm:w-20 object-contain";
const word = "h-10 w-auto max-w-[200px] sm:h-12 object-contain";

const connectors: Connector[] = [
  { name: "Google Classroom", logo: "/logos/google-classroom.svg", logoClass: icon },
  { name: "Canvas", logo: "/logos/canvas-lms.svg", logoClass: icon },
  { name: "Gradescope", logo: "/logos/gradescope-wordmark.svg", logoClass: word },
  { name: "Moodle", logo: "/logos/moodle.svg", logoClass: icon },
  { name: "Blackboard", logo: "/logos/blackboard.png", logoClass: `${icon} rounded-[22%] object-cover` },
  { name: "Brightspace", logo: "/logos/brightspace.svg", logoClass: word },
  { name: "Schoology", logo: "/logos/schoology.svg", logoClass: word },
  { name: "Turnitin", logo: "/logos/turnitin.png", logoClass: icon },
  { name: "Microsoft Teams", logo: "/logos/teams.png", logoClass: icon },
  { name: "Google Drive", logo: "/logos/googledrive.svg", logoClass: icon },
  { name: "OneDrive", logo: "/logos/onedrive.svg", logoClass: icon },
  { name: "Dropbox", logo: "/logos/dropbox.svg", logoClass: icon },
  { name: "Box", logo: "/logos/box.svg", logoClass: icon },
  { name: "SharePoint", logo: "/logos/sharepoint.svg", logoClass: word },
  { name: "Apple Files", logo: "/logos/apple.svg", logoClass: `${icon} opacity-90` },
  { name: "Sakai", logo: "/logos/sakai.svg", logoClass: word },
  { name: "itslearning", logo: "/logos/itslearning.svg", logoClass: word },
  { name: "ManageBac+", logo: "/logos/managebac.svg", logoClass: word },
  { name: "Open edX", logo: "/logos/openedx.svg", logoClass: word },
  { name: "Toddle", logo: "/logos/toddle.svg", logoClass: word },
  { name: "Classter", logo: "/logos/classter.svg", logoClass: word },
  { name: "Clever", logo: "/logos/clever.svg", logoClass: word },
  { name: "ClassLink", logo: "/logos/classlink.svg", logoClass: word },
  { name: "Skyward", logo: "/logos/skyward.svg", logoClass: word },
  { name: "Infinite Campus", logo: "/logos/infinitecampus.svg", logoClass: word },
  { name: "Veracross", logo: "/logos/veracross.svg", logoClass: word },
  { name: "FACTS", logo: "/logos/facts.svg", logoClass: word },
  { name: "Alma", logo: "/logos/alma.svg", logoClass: word },
  { name: "Fedena", logo: "/logos/fedena.svg", logoClass: word },
  { name: "Teachmint", logo: "/logos/teachmint.svg", logoClass: word },
  { name: "Edunext", logo: "/logos/edunext.svg", logoClass: word },
  { name: "Vidyalaya", logo: "/logos/vidyalaya.svg", logoClass: word },
  { name: "DingTalk", logo: "/logos/dingtalk.svg", logoClass: word },
  { name: "Lark", logo: "/logos/lark.svg", logoClass: word },
  { name: "WeCom", logo: "/logos/wecom.svg", logoClass: word },
];

function LogoTrack({ reverse = false }: { reverse?: boolean }) {
  const loop = [...connectors, ...connectors];
  return (
    <div
      className={cn(
        "flex w-max items-center gap-12 sm:gap-20 md:gap-24",
        reverse ? "animate-marquee-connectors-reverse" : "animate-marquee-connectors"
      )}
    >
      {loop.map((item, index) => (
        <img
          key={`${item.name}-${index}`}
          src={item.logo}
          alt=""
          aria-hidden
          title={item.name}
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
