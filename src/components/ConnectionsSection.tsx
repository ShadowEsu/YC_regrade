import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { cn } from "../lib/utils";

type Connector = {
  name: string;
  category: "LMS" | "Files";
  status: "Live" | "Private beta";
  how: string;
  logo?: string;
  logoClass?: string;
  mark?: string;
  markColor?: string;
};

const connectors: Connector[] = [
  {
    name: "Google Classroom",
    category: "LMS",
    status: "Private beta",
    how: "Search your class, pick a marked assignment, or upload the file directly.",
    logo: "/logos/google-classroom.png",
    logoClass: "h-9 w-9 object-contain",
  },
  {
    name: "Canvas",
    category: "LMS",
    status: "Private beta",
    how: "Connect when supported, then pull the marked work and rubric into Review.",
    logo: "/logos/canvas.png",
    logoClass: "h-8 w-auto max-w-[120px] object-contain",
  },
  {
    name: "Gradescope",
    category: "LMS",
    status: "Private beta",
    how: "Bring graded submissions and rubric rows into the evidence map.",
    mark: "Gs",
    markColor: "#0095FF",
  },
  {
    name: "Moodle",
    category: "LMS",
    status: "Private beta",
    how: "Connect your course space or upload the marked export manually.",
    logo: "/logos/moodle.svg",
    logoClass: "h-8 w-8 object-contain",
  },
  {
    name: "Blackboard",
    category: "LMS",
    status: "Private beta",
    how: "Link the course when available, or drop in the graded PDF.",
    logo: "/logos/blackboard.png",
    logoClass: "h-10 w-10 rounded-lg object-cover",
  },
  {
    name: "Brightspace",
    category: "LMS",
    status: "Private beta",
    how: "Search the course, then review marked work with Mr Whale beside it.",
    mark: "Bs",
    markColor: "#F57C00",
  },
  {
    name: "Schoology",
    category: "LMS",
    status: "Private beta",
    how: "Connect later when keys are ready — manual upload always works.",
    logo: "/logos/schoology.png",
    logoClass: "h-8 w-8 object-contain",
  },
  {
    name: "Microsoft Teams",
    category: "LMS",
    status: "Private beta",
    how: "Find class files from Teams and open them in Review Studio.",
    logo: "/logos/teams.png",
    logoClass: "h-9 w-9 object-contain",
  },
  {
    name: "Google Drive",
    category: "Files",
    status: "Private beta",
    how: "Search Drive for marked exams, rubrics, and feedback sheets.",
    logo: "/logos/googledrive.svg",
    logoClass: "h-8 w-8 object-contain",
  },
  {
    name: "OneDrive",
    category: "Files",
    status: "Private beta",
    how: "Pull school files from OneDrive without leaving Regrade.",
    logo: "/logos/onedrive.svg",
    logoClass: "h-8 w-8 object-contain",
  },
  {
    name: "Dropbox",
    category: "Files",
    status: "Private beta",
    how: "Connect Dropbox or paste a shared marked-work file.",
    logo: "/logos/dropbox-si.svg",
    logoClass: "h-8 w-8 object-contain",
  },
  {
    name: "Apple Files",
    category: "Files",
    status: "Private beta",
    how: "Import from Files on iPhone or Mac — screenshots and PDFs welcome.",
    logo: "/logos/apple.svg",
    logoClass: "h-8 w-8 object-contain opacity-80",
  },
];

function ConnectorMark({ item }: { item: Connector }) {
  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt=""
        aria-hidden
        className={cn("shrink-0", item.logoClass)}
      />
    );
  }
  return (
    <span
      className="grid h-9 w-9 place-items-center rounded-lg font-ui text-[13px] font-bold text-white"
      style={{ background: item.markColor ?? "#1e4fff" }}
    >
      {item.mark}
    </span>
  );
}

export function ConnectionsSection() {
  return (
    <section
      id="connections"
      className="scroll-mt-[120px] border-b border-black/[0.07] bg-paper py-[clamp(64px,8vw,96px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="Connections · private beta"
            title={
              <>
                Bring work from the places{" "}
                <span className="text-gradient-live">you already use.</span>
              </>
            }
            description="Search a platform, connect when supported, or upload a marked file directly. Manual upload always works."
          />
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mx-auto mt-10 overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_18px_50px_-20px_rgba(9,9,11,0.12)]">
            <div className="hidden grid-cols-[1.1fr_.7fr_1.6fr] gap-4 border-b border-black/[0.06] bg-cream px-6 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-faint md:grid">
              <span>Platform</span>
              <span>Status</span>
              <span>How it works</span>
            </div>
            <ul>
              {connectors.map((item, index) => (
                <li
                  key={item.name}
                  className={cn(
                    "grid gap-3 px-5 py-4 sm:px-6 md:grid-cols-[1.1fr_.7fr_1.6fr] md:items-center md:gap-4",
                    index !== connectors.length - 1 && "border-b border-black/[0.06]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <ConnectorMark item={item} />
                    <div>
                      <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">
                        {item.name}
                      </p>
                      <p className="font-ui text-[12px] font-medium text-faint md:hidden">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex rounded-full border border-blue/20 bg-blue-wash px-2.5 py-1 font-ui text-[11px] font-bold uppercase tracking-[0.06em] text-blue">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted">{item.how}</p>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[640px] text-center text-[14px] leading-relaxed text-muted">
            Connection status stays honest. If sync is not live yet, Regrade never pretends it is —
            you can always upload the marked exam yourself.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
