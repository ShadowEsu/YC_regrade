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
  total?: number;
  emailNotified?: boolean;
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
    const existing = JSON.parse(
      localStorage.getItem(WAITLIST_STORAGE_KEY) || "[]"
    ) as WaitlistSignup[];
    const next = existing.filter(
      (s) => s.email.toLowerCase() !== signup.email.toLowerCase()
    );
    next.push(signup);
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(next));
  } catch {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify([signup]));
  }
}

async function notifyOneInbox(
  inbox: string,
  signup: WaitlistSignup
): Promise<boolean> {
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
    {
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
        message: `${signup.name} <${signup.email}> joined the Regrade waitlist from ${signup.source}.`,
        _subject: `New Regrade waitlist signup — ${signup.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: signup.email,
        _url: "https://regradeapp.tech/#waitlist",
      }),
    }
  );

  const data = (await res.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  const ok =
    res.ok &&
    (data?.success === true ||
      data?.success === "true" ||
      String(data?.message || "")
        .toLowerCase()
        .includes("submitted successfully"));

  if (!ok) {
    console.warn("Waitlist email notify failed", inbox, data?.message || res.status);
  }
  return ok;
}

async function notifyByEmail(signup: WaitlistSignup): Promise<boolean> {
  const inboxes = Array.from(
    new Set(
      [
        REGRADE_CONFIG.waitlistEmail,
        ...REGRADE_CONFIG.notifyEmails,
        REGRADE_CONFIG.contactEmail,
      ].filter(Boolean)
    )
  );

  const results = await Promise.all(
    inboxes.map(async (inbox) => {
      try {
        return await notifyOneInbox(inbox, signup);
      } catch (err) {
        console.warn("Waitlist email notify error", inbox, err);
        return false;
      }
    })
  );

  return results.some(Boolean);
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

  try {
    const res = await fetch(
      `${REGRADE_CONFIG.supabaseUrl}/rest/v1/rpc/join_waitlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: REGRADE_CONFIG.supabaseAnonKey,
          Authorization: `Bearer ${REGRADE_CONFIG.supabaseAnonKey}`,
        },
        body: JSON.stringify({
          p_email: trimmedEmail,
          p_source: signup.source,
          p_name: trimmedName,
        }),
      }
    );

    let data = (await res.json().catch(() => null)) as JoinWaitlistResponse | null;

    // Older RPC only accepted email + source — retry without p_name
    if (!res.ok || !data || data.ok === false) {
      const fallback = await fetch(
        `${REGRADE_CONFIG.supabaseUrl}/rest/v1/rpc/join_waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: REGRADE_CONFIG.supabaseAnonKey,
            Authorization: `Bearer ${REGRADE_CONFIG.supabaseAnonKey}`,
          },
          body: JSON.stringify({
            p_email: trimmedEmail,
            p_source: `${signup.source} · ${trimmedName}`,
          }),
        }
      );
      data = (await fallback.json().catch(() => null)) as JoinWaitlistResponse | null;
      if (!fallback.ok || !data || data.ok === false) {
        return {
          ok: false,
          error: data?.error === "invalid_email" ? "invalid_email" : "network",
        };
      }
    }

    const joined = data;
    saveLocalBackup(signup);

    let emailNotified = false;
    if (!joined.duplicate) {
      emailNotified = await notifyByEmail(signup);
    }

    return {
      ok: true,
      duplicate: Boolean(joined.duplicate),
      position: typeof joined.position === "number" ? joined.position : undefined,
      total: typeof joined.total === "number" ? joined.total : undefined,
      emailNotified,
    };
  } catch {
    return { ok: false, error: "network" };
  }
}

export type WaitlistExportEntry = {
  id?: number | string;
  email: string;
  name?: string | null;
  source?: string | null;
  created_at?: string;
};

export async function exportWaitlist(
  secret: string
): Promise<{ ok: boolean; total?: number; entries?: WaitlistExportEntry[]; error?: string }> {
  try {
    const res = await fetch(
      `${REGRADE_CONFIG.supabaseUrl}/rest/v1/rpc/list_waitlist_entries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: REGRADE_CONFIG.supabaseAnonKey,
          Authorization: `Bearer ${REGRADE_CONFIG.supabaseAnonKey}`,
        },
        body: JSON.stringify({ p_secret: secret }),
      }
    );
    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      total?: number;
      entries?: WaitlistExportEntry[];
      error?: string;
    } | null;

    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "export_failed" };
    }
    return {
      ok: true,
      total: data.total,
      entries: data.entries || [],
    };
  } catch {
    return { ok: false, error: "network" };
  }
}
