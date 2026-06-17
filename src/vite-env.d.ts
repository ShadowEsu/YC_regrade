/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  readonly VITE_WAITLIST_EMAIL: string;
  readonly VITE_DEMO_VIDEO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
