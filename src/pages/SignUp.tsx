import { AuthForm } from "@/components/auth/AuthForm";
import { usePageHead } from "@/lib/page-head";

export default function SignUp() {
  usePageHead(
    "Sign up — Video Speed Reader",
    "Create your Video Speed Reader account with email and password.",
  );
  return <AuthForm signup />;
}
