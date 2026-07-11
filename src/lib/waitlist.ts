import { REGRADE_CONFIG } from "./site-config";

const WAITLIST_STORAGE_KEY = "regrade_waitlist_v1";

export type WaitlistSignup = {
  name: string;
  email: string;
  source: string;
  signedUpAt: string;
};

export type WaitlistResult = {
  ok: boolean;
  error?: string;
  duplicate?: boolean;
  position?: number;
};

type JoinWaitlistResponse = {
  ok?: boolean;
  duplicate?: boolean;
  position?: number;
  total?: number;
  error?: string;
};

function saveLocalBackup(signup: WaitlistSignup) {
  try {
    const existing = JSON.parse(localStorage.getItem(WAITLIST_STORAGE_KEY) || "[]") as WaitlistSignup[];
    const next = existing.filter((s) => s.email.toLowerCase() !== signup.email.toLowerCase());
    next.push(signup);
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(next));
  } catch {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify([signup]));
  }
}

async function notifyByEmail(signup: WaitlistSignup) {
  const notifyEmail = REGRADE_CONFIG.waitlistEmail;
  if (!notifyEmail) return;

  await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: signup.name,
      email: signup.email,
      source: signup.source,
      signedUpAt: signup.signedUpAt,
      message: `${signup.name} joined the Regrade waitlist from ${signup.source}.`,
      _subject: `New Regrade waitlist signup — ${signup.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: signup.email,
    }),
  });
}

export async function joinWaitlist(
  name: string,
  email: string,
  source: string
): Promise<WaitlistResult> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || trimmedName.length < 2) {
    return { ok: false, error: "invalid_name" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
    return { ok: false, error: "invalid_email" };
  }

  const signup: WaitlistSignup = {
    name: trimmedName,
    email: trimmedEmail,
    source: source || "hero",
    signedUpAt: new Date().toISOString(),
  };

  const sourceWithName = `${signup.source} · ${trimmedName}`;

  try {
    const res = await fetch(`${REGRADE_CONFIG.supabaseUrl}/rest/v1/rpc/join_waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: REGRADE_CONFIG.supabaseAnonKey,
        Authorization: `Bearer ${REGRADE_CONFIG.supabaseAnonKey}`,
      },
      body: JSON.stringify({
        p_email: trimmedEmail,
        p_source: sourceWithName,
      }),
    });

    const data = (await res.json().catch(() => null)) as JoinWaitlistResponse | null;

    if (!res.ok || !data || data.ok === false) {
      return { ok: false, error: data?.error === "invalid_email" ? "invalid_email" : "network" };
    }

    saveLocalBackup(signup);

    if (!data.duplicate) {
      void notifyByEmail(signup).catch(() => {
        // Email notify is best effort. Signup already saved in Supabase.
      });
    }

    return {
      ok: true,
      duplicate: Boolean(data.duplicate),
      position: typeof data.position === "number" ? data.position : undefined,
    };
  } catch {
    return { ok: false, error: "network" };
  }
}
