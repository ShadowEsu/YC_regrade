import { FAQ_ITEMS } from "./faqs";

export const SITE_URL = "https://regradeapp.tech";
export const SITE_NAME = "Regrade";
export const SITE_TAGLINE = "Understand your grade. Learn from it. Make the strongest appeal.";
export const SITE_DESCRIPTION =
  "Regrade helps students inspect marked work, understand what happened, prepare evidence-led appeals when appropriate, and turn marked exams into better finals preparation — with Mr Whale as a calm guide beside the work.";
export const OG_DESCRIPTION =
  "Know what happened on your grade. Know what to do next. Review, Appeal, Study, and Coach — powered by OpenAI.";
export const OG_IMAGE = `${SITE_URL}/logo.png`;

export const FOUNDER = {
  name: "Preston Jay Susanto",
  jobTitle: "Founder",
  alumniOf: "EECS",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/regrade_app",
  x: "https://x.com/regrade_app",
  email: "mailto:regradeteam@gmail.com",
} as const;

export const KEYWORDS = [
  "grade appeal",
  "marked exam review",
  "rubric checker",
  "evidence-led appeal",
  "finals prep from marked exams",
  "Mr Whale",
  "student grade review",
  "professor appeal email",
  "assignment rubric",
  "academic appeal",
].join(", ");

export const HOW_TO_STEPS = [
  {
    name: "Connect your student up",
    text: "Or bring the marked work in — upload a marked PDF, image, screenshot, rubric, or feedback. Manual upload always works.",
  },
  {
    name: "Regrade reads the evidence",
    text: "Regrade separates visible marks, rubric support, and uncertainty instead of guessing what happened.",
  },
  {
    name: "Choose what to do next",
    text: "Clarify the mark, prepare a respectful appeal, ask Mr Whale, or add the pattern to your Study plan. Nothing sends unless you choose to.",
  },
] as const;

/** Authoritative external references — signals topical authority to crawlers */
export const AUTHORITY_REFERENCES = [
  {
    title: "Grade Appeals (UC San Diego Academic Senate)",
    href: "https://senate.ucsd.edu/Operating-Procedures/Senate-Manual/Regulations/502",
    source: "University of California",
    context: "Formal grade appeal procedures at a major research university",
  },
  {
    title: "Revision of Grades and Appeal (University of Ottawa)",
    href: "https://www.uottawa.ca/about-us/leadership-governance/policies-regulations/a-9-revision-grades-appeal",
    source: "uOttawa",
    context: "Written grade review requests with rubric and syllabus evidence",
  },
  {
    title: "Grade Appeal Policy (University of Arizona)",
    href: "https://registrar.arizona.edu/records-enrollment/petitions-appeals/grade-appeal",
    source: "UA Registrar",
    context: "Student-initiated appeals with instructor discussion requirements",
  },
  {
    title: "Rubric (academic assessment)",
    href: "https://en.wikipedia.org/wiki/Rubric_(academic)",
    source: "Wikipedia",
    context: "How rubrics define scoring criteria for assignments",
  },
  {
    title: "Grade point average",
    href: "https://en.wikipedia.org/wiki/Grade_point_average",
    source: "Wikipedia",
    context: "How individual assignment scores compound into semester GPA",
  },
  {
    title: "Canvas LMS (Instructure)",
    href: "https://www.instructure.com/canvas",
    source: "Instructure",
    context: "Learning management system where rubrics and grades are published",
  },
] as const;

export function buildJsonLdGraph() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: OG_IMAGE,
      width: 512,
      height: 512,
    },
    description: SITE_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "regradeteam@gmail.com",
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    sameAs: [SOCIAL.instagram, SOCIAL.x],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG_IMAGE,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='hero-subhead']"],
    },
  };

  const software = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free during private beta. First 100 waitlist members receive Pro free for 1 year.",
      availability: "https://schema.org/PreOrder",
    },
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    author: { "@id": `${SITE_URL}/#organization` },
    featureList: [
      "Review Studio evidence map",
      "Evidence-led appeal drafting",
      "Study checklist from marked exams",
      "Mr Whale academic coach",
      "Consent-first Supervisor access",
    ],
    screenshot: OG_IMAGE,
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${SITE_URL}/#howto`,
    name: "How to understand a marked exam with Regrade",
    description:
      "Upload marked work to read the evidence, prepare a respectful appeal when appropriate, and build a Study plan from past exams.",
    step: HOW_TO_STEPS.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `${SITE_URL}/#how`,
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webPage, software, howTo, faqPage, breadcrumb],
  };
}
