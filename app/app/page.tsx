import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AppPage from "@/views/AppPage";

export const metadata: Metadata = {
  title: "Your workspace — Video Speed Reader",
  description: "Your private Video Speed Reader workspace.",
};

// Auth-gated on the server: no session cookie → back to /sign-in.
export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");
  return <AppPage email={user.email ?? ""} />;
}
