import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";

type Connector = {
  name: string;
  logo: string;
  logoClass?: string;
  aliases?: string[];
};

const icon = "h-10 w-10 sm:h-12 sm:w-12 object-contain";

const connectors: Connector[] = [
  { name: "Google Classroom", logo: "/logos/google-classroom.svg", aliases: ["google", "classroom", "gclassroom"] },
  { name: "Canvas", logo: "/logos/canvas-lms.svg", aliases: ["instructure", "canvas lms"] },
  { name: "Gradescope", logo: "/logos/gradescope.png", aliases: ["grade scope"] },
  { name: "Moodle", logo: "/logos/moodle.svg" },
  { name: "Blackboard", logo: "/logos/blackboard.png", logoClass: `${icon} rounded-[22%] object-cover`, aliases: ["bb", "blackboard learn"] },
  { name: "Brightspace", logo: "/logos/brightspace.png", aliases: ["d2l", "desire2learn", "desire to learn"] },
  { name: "Schoology", logo: "/logos/schoology.png", aliases: ["powerschool schoology"] },
  { name: "Turnitin", logo: "/logos/turnitin.png", aliases: ["turn it in", "similarity"] },
  { name: "Microsoft Teams", logo: "/logos/teams.png", aliases: ["teams", "ms teams", "office 365"] },
  { name: "Google Drive", logo: "/logos/googledrive.svg", aliases: ["gdrive", "drive"] },
  { name: "OneDrive", logo: "/logos/onedrive.svg", aliases: ["onedrive", "microsoft onedrive"] },
  { name: "Dropbox", logo: "/logos/dropbox.svg" },
  { name: "Box", logo: "/logos/box.svg" },
  { name: "SharePoint", logo: "/logos/sharepoint.png", aliases: ["share point"] },
  { name: "Apple Files", logo: "/logos/apple.svg", logoClass: `${icon} opacity-90`, aliases: ["icloud", "files app", "apple"] },
  { name: "Sakai", logo: "/logos/sakai.png" },
  { name: "itslearning", logo: "/logos/itslearning.png", aliases: ["its learning"] },
  { name: "ManageBac+", logo: "/logos/managebac.png", aliases: ["managebac", "manage bac", "ib"] },
  { name: "Open edX", logo: "/logos/openedx.png", aliases: ["edx", "openedx"] },
  { name: "Toddle", logo: "/logos/toddle.png" },
  { name: "Classter", logo: "/logos/classter.png" },
  { name: "Clever", logo: "/logos/clever.png" },
  { name: "ClassLink", logo: "/logos/classlink.png", aliases: ["class link"] },
  { name: "Skyward", logo: "/logos/skyward.png" },
  { name: "Infinite Campus", logo: "/logos/infinitecampus.png", aliases: ["campus"] },
  { name: "Veracross", logo: "/logos/veracross.png" },
  { name: "FACTS", logo: "/logos/facts.png", aliases: ["renweb", "facts sis"] },
  { name: "Alma", logo: "/logos/alma.png", aliases: ["getalma"] },
  { name: "Fedena", logo: "/logos/fedena.png" },
  { name: "Teachmint", logo: "/logos/teachmint.png" },
  { name: "Edunext", logo: "/logos/edunext.png" },
  { name: "Vidyalaya", logo: "/logos/vidyalaya.png" },
  { name: "DingTalk", logo: "/logos/dingtalk.png", aliases: ["ding talk", "dingding"] },
  { name: "Lark", logo: "/logos/lark.png", aliases: ["feishu", "larksuite"] },
  { name: "WeCom", logo: "/logos/wecom.png", aliases: ["wechat work", "enterprise wechat"] },
];

function matchesQuery(item: Connector, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [item.name, ...(item.aliases ?? [])].join(" ").toLowerCase();
  return haystack.includes(q) || q.split(/\s+/).every((part) => haystack.includes(part));
}

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
          className={cn("pointer-events-none shrink-0 select-none", item.logoClass ?? icon)}
          draggable={false}
        />
      ))}
    </div>
  );
}

export function ConnectionsSection() {
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;
  const results = useMemo(
    () => connectors.filter((item) => matchesQuery(item, query)),
    [query]
  );

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
        <p className="mx-auto mt-4 max-w-[520px] font-ui text-[15px] leading-relaxed text-muted sm:text-[16px]">
          Search your school platform. If it is here, you can bring marked work in through it —
          or upload manually anytime.
        </p>

        <div className="relative mx-auto mt-7 max-w-[480px]">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={2.25}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your connector… Canvas, Schoology, Drive"
            aria-label="Search connectors"
            className="h-12 w-full rounded-xl border border-black/10 bg-paper pl-11 pr-4 text-[15px] text-ink shadow-sm outline-none transition placeholder:text-faint focus:border-blue focus:ring-2 focus:ring-blue/15 sm:h-14 sm:text-[16px]"
          />
        </div>
      </div>

      {searching ? (
        <div className="section-shell">
          {results.length > 0 ? (
            <>
              <p className="mb-4 text-center font-ui text-[13px] font-semibold text-blue">
                {results.length} connector{results.length === 1 ? "" : "s"} found
              </p>
              <ul className="mx-auto grid max-w-[920px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {results.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 rounded-2xl border border-blue/15 bg-paper px-3.5 py-3.5 text-left"
                  >
                    <img
                      src={item.logo}
                      alt=""
                      className={cn("shrink-0", item.logoClass ?? icon)}
                      draggable={false}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-ink sm:text-[15px]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-ui text-[11px] font-semibold uppercase tracking-[0.06em] text-blue">
                        Supported
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mx-auto max-w-[480px] rounded-2xl border border-blue/15 bg-paper px-6 py-8 text-center">
              <p className="text-[16px] font-semibold text-ink">No exact match for “{query.trim()}”</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Manual upload always works — PDF, screenshot, or photo of marked work.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="mask-fade-x overflow-hidden" aria-label="Connected platforms">
            <LogoTrack />
          </div>
          <div className="mask-fade-x mt-10 overflow-hidden sm:mt-12" aria-hidden>
            <LogoTrack reverse />
          </div>
          <p className="mt-8 text-center font-ui text-[13px] text-muted">
            {connectors.length}+ platforms · search above to check yours
          </p>
        </>
      )}
    </section>
  );
}
