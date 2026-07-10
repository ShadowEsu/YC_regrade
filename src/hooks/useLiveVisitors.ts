import { useEffect, useState } from "react";
import { getVisitorStats } from "../lib/analytics";
import { REGRADE_CONFIG } from "../lib/site-config";

const pollMs = 60_000;

export function useLiveVisitors(): number | null {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    if (!REGRADE_CONFIG.supabaseUrl || !REGRADE_CONFIG.supabaseAnonKey) return;

    let active = true;

    const refresh = async () => {
      const stats = await getVisitorStats();
      if (active) setVisitorCount(stats?.total ?? null);
    };

    refresh();
    const timer = window.setInterval(refresh, pollMs);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return visitorCount;
}
