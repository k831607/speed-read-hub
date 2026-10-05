import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/auth/AuthForm';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/sign-up')({ head: () => pageHead('Sign up — Video Speed Reader', 'Create your Video Speed Reader account with email and password.'), component: () => <AuthForm signup /> });
