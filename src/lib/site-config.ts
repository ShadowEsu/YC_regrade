export const REGRADE_CONFIG = {
  waitlistEmail: import.meta.env.VITE_WAITLIST_EMAIL ?? "regradeteam@gmail.com",
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_KEY ?? "",
  waitlistDisplayCount: 15,
  waitlistDisplayMax: 100,
  demoVideoUrl: import.meta.env.VITE_DEMO_VIDEO_URL ?? "",
  founderLinkedIn: "",
  founderGitHub: "",
} as const;
