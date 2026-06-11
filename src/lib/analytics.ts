import { REGRADE_CONFIG } from "./site-config";

const VISITOR_KEY = "regrade_vid_v1";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export type VisitorStats = {
  total: number;
  today: number;
  week: number;
  updated_at: string;
};

async function supabaseRpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${REGRADE_CONFIG.supabaseUrl}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: REGRADE_CONFIG.supabaseAnonKey,
      Authorization: `Bearer ${REGRADE_CONFIG.supabaseAnonKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`RPC ${fn} failed`);
  return res.json() as Promise<T>;
}

export async function registerVisitor(): Promise<void> {
  try {
    await supabaseRpc("register_visitor", {
      p_visitor_id: getVisitorId(),
      p_path: window.location.pathname || "/",
    });
  } catch {
    // Silent — visitor tracking must not block the page
  }
}

export async function getVisitorStats(): Promise<VisitorStats | null> {
  try {
    return await supabaseRpc<VisitorStats>("get_visitor_stats", {});
  } catch {
    return null;
  }
}
