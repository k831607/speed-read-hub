import type { Metadata } from "next";
import SignUp from "@/views/SignUp";

export const metadata: Metadata = {
  title: "Sign up — Video Speed Reader",
  description: "Create your Video Speed Reader account with email and password.",
};

export default function Page() {
  return <SignUp />;
}
