import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Supabase client for the project's own Supabase backend.
// Values are injected at build time by Vite from VITE_* env vars (.env locally,
// project Environment Variables on Vercel). The publishable key (sb_publishable_*)
// is browser-safe and RLS-gated — it replaces the legacy "anon" key.
const SUPABASE_URL = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as
  string | undefined;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY"] : []),
  ];
  throw new Error(`[Supabase] Missing environment variable(s): ${missing.join(", ")}.`);
}

// Created exactly once (module singleton). Import it like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
