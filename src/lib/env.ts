export function isSupabaseConfigured(): boolean {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

  if (!url || !key) return false;

  const urlLooksReal = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)\/?$/i.test(url);
  const keyLooksReal =
    key.startsWith("eyJ") || key.startsWith("sb_publishable_");

  return urlLooksReal && keyLooksReal;
}
