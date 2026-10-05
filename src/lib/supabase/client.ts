import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/integrations/supabase/types";

// Browser-side Supabase client. Stores the session in cookies (not localStorage)
// so server components, route handlers and middleware can read it too.
// The publishable key (sb_publishable_*) is browser-safe and RLS-gated.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
