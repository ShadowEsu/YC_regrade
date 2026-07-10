import { useEffect, useState } from "react";
import { getLiveVisitorCount } from "../lib/analytics";
import { REGRADE_CONFIG } from "../lib/site-config";

const pollMs = 30_000;

export function useLiveVisitors(): number | null {
  const [liveCount, setLiveCount] = useState<number | null>(null);

  useEffect(() => {
    if (!REGRADE_CONFIG.supabaseUrl || !REGRADE_CONFIG.supabaseAnonKey) return;

    let active = true;

    const refresh = async () => {
      const count = await getLiveVisitorCount();
      if (active) setLiveCount(count);
    };

    refresh();
    const timer = window.setInterval(refresh, pollMs);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return liveCount;
}
