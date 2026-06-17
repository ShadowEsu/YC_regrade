export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Does Regrade work outside the US?",
    a: "Yes. Regrade reads your rubric or marking guide directly. It works with US GPA, Australian ATAR and HSC/VCE, UK A-Levels and GCSE mark schemes, IB criterion rubrics, CBSE and ICSE, gaokao-style 100-point marking, and other national scales. It does not convert grades between systems.",
  },
  {
    q: "Is this allowed?",
    a: "Yes. Grade reviews and regrade requests are standard at most schools — universities from UC San Diego to the University of Ottawa publish formal appeal policies. Regrade helps you find points you may deserve, with the rubric-and-evidence documentation those policies require.",
  },
  {
    q: "Is it cheating?",
    a: "No. Regrade never writes or edits assignments. It scans work that is already graded and shows where points may have been missed.",
  },
  {
    q: "Will it email my professor?",
    a: "Never. Regrade does not send anything. You get a summary and optional draft. You edit it and send it yourself if you want to.",
  },
  {
    q: "What does it cost?",
    a: "Free during the private beta. The first 100 waitlist members receive Pro Max free for 1 year at launch.",
  },
  {
    q: "What do I need to use it?",
    a: "Your graded work, the rubric or assignment sheet, and any feedback you received. PDFs, documents, and screenshots all work. No school login required.",
  },
  {
    q: "What happens to my files?",
    a: "They are used to analyze your grade and build your summary, nothing else. You can delete them from your account at any time.",
  },
];
