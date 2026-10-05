import { createFileRoute } from '@tanstack/react-router';
import { AudioLines, Sparkles } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { SignOutButton } from '@/components/SignOutButton';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/_authenticated/app')({ head: () => pageHead('Your workspace — Video Speed Reader', 'Your private Video Speed Reader workspace.'), component: AppPage });
function AppPage() {
  const { user } = Route.useRouteContext();
  return <div className="min-h-screen"><header className="border-b border-border"><div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8"><Brand /><SignOutButton /></div></header><main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"><p className="mb-4 text-xs font-medium uppercase text-primary">YOUR WORKSPACE</p><h1 className="break-words text-2xl font-semibold sm:text-3xl">Hi {user.email}</h1><div className="flex min-h-96 flex-col items-center justify-center py-20 text-center"><div className="mb-7 flex size-20 items-center justify-center rounded-lg border border-border bg-card text-primary"><AudioLines className="size-9" /></div><span className="mb-5 inline-flex items-center gap-2 text-xs text-primary"><Sparkles className="size-3.5" />Coming soon</span><h2 className="text-2xl font-semibold">A new home for your words.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Your dashboard is coming soon. Upload functionality will be added in the next milestone.</p></div></main></div>;
}
