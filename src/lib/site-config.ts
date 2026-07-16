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
  waitlistDisplayCount: 50,
  waitlistDisplayMax: 100,
  webAppUrl: "https://app.regradeapp.tech",
  demoVideoUrl: import.meta.env.VITE_DEMO_VIDEO_URL ?? "",
  calendlyUrl: "https://calendly.com/prestonjaysusanto/regrade-interview-rounds",
  founderLinkedIn: "https://www.linkedin.com/in/preston-jay-susanto",
  contactEmail: "preston@regrade.org",
  appVersion: "1.0.0",
  downloadMacArm64:
    "https://github.com/ShadowEsu/Regrade_True/releases/download/v1.0.0/Regrade-1.0.0-arm64.dmg",
  downloadMacIntel:
    "https://github.com/ShadowEsu/Regrade_True/releases/download/v1.0.0/Regrade-1.0.0-x64.dmg",
  downloadWindows:
    "https://github.com/ShadowEsu/Regrade_True/releases/download/v1.0.0/Regrade-Setup-1.0.0.exe",
  releaseNotesUrl: "https://github.com/ShadowEsu/Regrade_True/releases/tag/v1.0.0",
  founderGitHub: "",
} as const;
