import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { cn } from "../lib/utils";

type Connector = {
  name: string;
  category: "LMS" | "Files";
  how: string;
  logo: string;
  logoClass?: string;
};

const connectors: Connector[] = [
  {
    name: "Google Classroom",
    category: "LMS",
    how: "Search your class, pick a marked assignment, or upload the file directly.",
    logo: "/logos/googleclassroom.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Canvas",
    category: "LMS",
    how: "Connect when supported, then pull marked work and the rubric into Review.",
    logo: "/logos/canvas-lms.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Gradescope",
    category: "LMS",
    how: "Bring graded submissions and rubric rows into the evidence map.",
    logo: "/logos/gradescope.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Moodle",
    category: "LMS",
    how: "Connect your course space or upload the marked export manually.",
    logo: "/logos/moodle.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Blackboard",
    category: "LMS",
    how: "Link the course when available, or drop in the graded PDF.",
    logo: "/logos/blackboard.png",
    logoClass: "h-10 w-10 rounded-xl object-cover",
  },
  {
    name: "Brightspace",
    category: "LMS",
    how: "Search the course, then review marked work with Mr Whale beside it.",
    logo: "/logos/brightspace.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Schoology",
    category: "LMS",
    how: "Connect later when keys are ready — manual upload always works.",
    logo: "/logos/schoology-mark.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Microsoft Teams",
    category: "LMS",
    how: "Find class files from Teams and open them in Review Studio.",
    logo: "/logos/teams.png",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Google Drive",
    category: "Files",
    how: "Search Drive for marked exams, rubrics, and feedback sheets.",
    logo: "/logos/googledrive.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "OneDrive",
    category: "Files",
    how: "Pull school files from OneDrive without leaving Regrade.",
    logo: "/logos/onedrive.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Dropbox",
    category: "Files",
    how: "Connect Dropbox or paste a shared marked-work file.",
    logo: "/logos/dropbox.svg",
    logoClass: "h-10 w-10 object-contain",
  },
  {
    name: "Apple Files",
    category: "Files",
    how: "Import from Files on iPhone or Mac — screenshots and PDFs welcome.",
    logo: "/logos/apple.svg",
    logoClass: "h-10 w-10 object-contain opacity-90",
  },
];

export function ConnectionsSection() {
  return (
    <section
      id="connections"
      className="scroll-mt-[120px] border-b border-black/[0.07] bg-[linear-gradient(180deg,#eef2ff_0%,var(--color-paper)_42%,var(--color-paper)_100%)] py-[clamp(72px,10vw,120px)]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            centered
            eyebrow="Connections · private beta"
            title={
              <>
                Connected to the platforms{" "}
                <span className="text-gradient-live">you already use.</span>
              </>
            }
            description="Google Classroom, Canvas, Gradescope, Moodle, Blackboard, Brightspace, Schoology, Teams, Drive, OneDrive, Dropbox, and Apple Files. Search, connect when ready, or upload — manual upload always works."
          />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="mx-auto mt-10 grid max-w-[980px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {connectors.map((item) => (
              <article
                key={item.name}
                className="group flex flex-col items-center rounded-[22px] border border-blue/15 bg-white px-4 py-6 text-center shadow-[0_14px_40px_-24px_rgba(30,79,255,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-wash">
                  <img
                    src={item.logo}
                    alt=""
                    aria-hidden
                    className={cn("shrink-0", item.logoClass)}
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-[16px]">
                  {item.name}
                </h3>
                <p className="mt-1 font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-blue">
                  {item.category} · Private beta
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.how}</p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-[14px] leading-relaxed text-muted">
            Connection status stays honest. If sync is not live yet, Regrade never pretends it is —
            you can always upload the marked exam yourself.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
