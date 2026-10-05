import { redirect } from "next/navigation";

// Legacy alias from M0 — the canonical sign-in route is /sign-in.
export default function Page() {
  redirect("/sign-in");
}
