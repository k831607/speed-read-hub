import { AuthForm } from "@/components/auth/AuthForm";
import { usePageHead } from "@/lib/page-head";

export default function SignIn() {
  usePageHead("Sign in — Video Speed Reader", "Sign in to your Video Speed Reader account.");
  return <AuthForm />;
}
