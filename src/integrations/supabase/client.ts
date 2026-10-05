import { createClient } from "@/lib/supabase/client";

// Single browser Supabase client for client components.
// Configured via NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
// Import it like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient();
