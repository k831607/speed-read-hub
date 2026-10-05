import type { Metadata } from "next";
import SignIn from "@/views/SignIn";

export const metadata: Metadata = {
  title: "Sign in — Video Speed Reader",
  description: "Sign in to your Video Speed Reader account.",
};

export default function Page() {
  return <SignIn />;
}
