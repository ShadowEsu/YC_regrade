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
    source,
    signedUpAt: new Date().toISOString(),
  };

  const subject = `Regrade waitlist — ${trimmedName} (${trimmedEmail})`;

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(REGRADE_CONFIG.waitlistEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          source,
          _subject: subject,
          _template: "table",
          _captcha: "false",
        }),
      }
    );

    const data = (await res.json().catch(() => null)) as { success?: string } | null;

    if (!res.ok) {
      return { ok: false, error: "network" };
    }

    if (data?.success === "false") {
      return { ok: false, error: "network" };
    }

    saveLocalBackup(signup);
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}
