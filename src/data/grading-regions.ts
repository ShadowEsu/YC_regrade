export type GradingRegion = {
  code: string;
  flag: string;
  region: string;
  systems: string[];
  description: string;
};

export const gradingRegions: GradingRegion[] = [
  {
    code: "US",
    flag: "🇺🇸",
    region: "United States",
    systems: ["4.0 GPA", "Weighted GPA", "AP (1–5)", "Letter grades"],
    description:
      "Regrade checks rubric rows against your submission, whether the final mark is a percentage or letter grade.",
  },
  {
    code: "AU",
    flag: "🇦🇺",
    region: "Australia",
    systems: ["ATAR", "HSC", "VCE", "WACE"],
    description:
      "ATAR ranks on 0–99.95. State systems use criterion-based marking Regrade can scan.",
  },
  {
    code: "UK",
    flag: "🇬🇧",
    region: "United Kingdom",
    systems: ["GCSE (9–1)", "A-Levels", "Degree classes"],
    description:
      "Works from the mark scheme or feedback sheet, not the final band alone.",
  },
  {
    code: "CN",
    flag: "🇨🇳",
    region: "China",
    systems: ["100-point scale", "Gaokao", "Zhongkao"],
    description:
      "Structured scoring guides per question. Regrade reads criteria and your marked paper.",
  },
  {
    code: "IN",
    flag: "🇮🇳",
    region: "India",
    systems: ["CBSE", "ICSE", "Percentage", "10-point CGPA"],
    description:
      "Maps deductions to the published marking scheme, out of 100 or on a GPA scale.",
  },
  {
    code: "ID",
    flag: "🇮🇩",
    region: "Indonesia",
    systems: ["Rapor", "0–100 scale", "Kurikulum Merdeka"],
    description:
      "Numeric rapor scores against learning objectives on returned work.",
  },
  {
    code: "JP",
    flag: "🇯🇵",
    region: "Japan",
    systems: ["100-point scale", "5-level ratings", "University GPA"],
    description:
      "Focuses on per-question breakdown and rubric, not the conversion formula.",
  },
  {
    code: "KR",
    flag: "🇰🇷",
    region: "South Korea",
    systems: ["9-grade curve", "CSAT (Suneung)", "University GPA"],
    description:
      "Checks whether each rubric criterion was applied consistently.",
  },
  {
    code: "SG",
    flag: "🇸🇬",
    region: "Singapore",
    systems: ["O-Levels", "A-Levels", "Poly GPA", "CAP"],
    description:
      "Reads criterion-level feedback from graded scripts and rubrics.",
  },
  {
    code: "IB",
    flag: "🌐",
    region: "International Baccalaureate",
    systems: ["Diploma (45 pts)", "HL / SL", "Criterion rubrics"],
    description:
      "Built for IB criterion-referenced marking and level descriptors.",
  },
  {
    code: "CA",
    flag: "🇨🇦",
    region: "Canada",
    systems: ["Provincial %", "4.0 GPA", "Ontario OSSD"],
    description:
      "Works from the rubric or marking guide on your returned assignment.",
  },
  {
    code: "LATAM",
    flag: "🌎",
    region: "Latin America",
    systems: ["0–10 scale", "0–100 scale", "Letter grades"],
    description:
      "Reads the rubric your instructor attached, no assumed national formula.",
  },
  {
    code: "AF",
    flag: "🌍",
    region: "Africa",
    systems: ["WAEC / WASSCE", "South African NSC", "Percentage"],
    description:
      "Scans published marking schemes and your marked responses.",
  },
  {
    code: "EU",
    flag: "🇪🇺",
    region: "Europe",
    systems: ["ECTS credits", "National scales", "Bologna Process"],
    description:
      "Reads your course rubric in whatever scale your school uses.",
  },
  {
    code: "SEA",
    flag: "🌏",
    region: "Southeast & South Asia",
    systems: ["SPM", "STPM", "Percentage", "GPA"],
    description:
      "Adapts to the marking guide your teacher provides.",
  },
  {
    code: "ANY",
    flag: "📄",
    region: "Your grading system",
    systems: ["Marking guides", "Rubrics", "Feedback sheets"],
    description:
      "Upload a rubric, checklist, or annotated feedback. No school login needed.",
  },
];

export function filterGradingRegions(query: string): GradingRegion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return gradingRegions.filter((r) => {
    const haystack = [r.region, r.code, ...r.systems, r.description].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
