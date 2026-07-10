type WindowRegradeConfig = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  waitlistEmail?: string;
};

declare global {
  interface Window {
    REGRADE_CONFIG?: WindowRegradeConfig;
  }
}

function readWindowConfig(): WindowRegradeConfig {
  if (typeof window === "undefined") return {};
  return window.REGRADE_CONFIG ?? {};
}

const windowConfig = readWindowConfig();

const defaultSupabaseUrl = "https://lshqzxgzehgmzgeilvmy.supabase.co";
const defaultSupabaseKey = "sb_publishable_B6sDgM-4xMY2tub3oX7VHA_bHOLntBJ";

export const REGRADE_CONFIG = {
  waitlistEmail:
    import.meta.env.VITE_WAITLIST_EMAIL ??
    windowConfig.waitlistEmail ??
    "regradeteam@gmail.com",
  supabaseUrl:
    import.meta.env.VITE_SUPABASE_URL ||
    windowConfig.supabaseUrl ||
    defaultSupabaseUrl,
  supabaseAnonKey:
    import.meta.env.VITE_SUPABASE_KEY ||
    windowConfig.supabaseAnonKey ||
    defaultSupabaseKey,
  waitlistDisplayCount: 15,
  waitlistDisplayMax: 100,
  demoVideoUrl: import.meta.env.VITE_DEMO_VIDEO_URL ?? "",
  calendlyUrl: "https://calendly.com/prestonjaysusanto/regrade-interview-rounds",
  founderLinkedIn: "",
  founderGitHub: "",
} as const;
