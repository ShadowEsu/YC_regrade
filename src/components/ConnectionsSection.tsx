import { cn } from "../lib/utils";

type Connector = {
  name: string;
  logo: string;
  logoClass: string;
};

const icon = "h-12 w-12 sm:h-16 sm:w-16 object-contain";

const connectors: Connector[] = [
  { name: "Google Classroom", logo: "/logos/google-classroom.svg", logoClass: icon },
  { name: "Canvas", logo: "/logos/canvas-lms.svg", logoClass: icon },
  { name: "Gradescope", logo: "/logos/gradescope.png", logoClass: icon },
  { name: "Moodle", logo: "/logos/moodle.svg", logoClass: icon },
  { name: "Blackboard", logo: "/logos/blackboard.png", logoClass: `${icon} rounded-[22%] object-cover` },
  { name: "Brightspace", logo: "/logos/brightspace.png", logoClass: icon },
  { name: "Schoology", logo: "/logos/schoology.png", logoClass: icon },
  { name: "Turnitin", logo: "/logos/turnitin.png", logoClass: icon },
  { name: "Microsoft Teams", logo: "/logos/teams.png", logoClass: icon },
  { name: "Google Drive", logo: "/logos/googledrive.svg", logoClass: icon },
  { name: "OneDrive", logo: "/logos/onedrive.svg", logoClass: icon },
  { name: "Dropbox", logo: "/logos/dropbox.svg", logoClass: icon },
  { name: "Box", logo: "/logos/box.svg", logoClass: icon },
  { name: "SharePoint", logo: "/logos/sharepoint.png", logoClass: icon },
  { name: "Apple Files", logo: "/logos/apple.svg", logoClass: `${icon} opacity-90` },
  { name: "Sakai", logo: "/logos/sakai.png", logoClass: icon },
  { name: "itslearning", logo: "/logos/itslearning.png", logoClass: icon },
  { name: "ManageBac+", logo: "/logos/managebac.png", logoClass: icon },
  { name: "Open edX", logo: "/logos/openedx.png", logoClass: icon },
  { name: "Toddle", logo: "/logos/toddle.png", logoClass: icon },
  { name: "Classter", logo: "/logos/classter.png", logoClass: icon },
  { name: "Clever", logo: "/logos/clever.png", logoClass: icon },
  { name: "ClassLink", logo: "/logos/classlink.png", logoClass: icon },
  { name: "Skyward", logo: "/logos/skyward.png", logoClass: icon },
  { name: "Infinite Campus", logo: "/logos/infinitecampus.png", logoClass: icon },
  { name: "Veracross", logo: "/logos/veracross.png", logoClass: icon },
  { name: "FACTS", logo: "/logos/facts.png", logoClass: icon },
  { name: "Alma", logo: "/logos/alma.png", logoClass: icon },
  { name: "Fedena", logo: "/logos/fedena.png", logoClass: icon },
  { name: "Teachmint", logo: "/logos/teachmint.png", logoClass: icon },
  { name: "Edunext", logo: "/logos/edunext.png", logoClass: icon },
  { name: "Vidyalaya", logo: "/logos/vidyalaya.png", logoClass: icon },
  { name: "DingTalk", logo: "/logos/dingtalk.png", logoClass: icon },
  { name: "Lark", logo: "/logos/lark.png", logoClass: icon },
  { name: "WeCom", logo: "/logos/wecom.png", logoClass: icon },
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
