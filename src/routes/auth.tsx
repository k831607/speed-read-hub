import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/auth/AuthForm';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/auth')({ head: () => pageHead('Sign in — Video Speed Reader', 'Sign in to your Video Speed Reader account.'), component: () => <AuthForm /> });
