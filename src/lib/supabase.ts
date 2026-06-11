const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://lshqzxgzehgmzgeilvmy.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_KEY ?? "sb_publishable_B6sDgM-4xMY2tub3oX7VHA_bHOLntBJ";

export async function supabaseRpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`RPC ${fn} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export { SUPABASE_URL, SUPABASE_KEY };
