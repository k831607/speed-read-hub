"use client";

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/Brand';
import { SignOutButton } from '@/components/SignOutButton';
import { useAuth } from '@/lib/auth-context';
export function SiteHeader() {
  const { user, loading } = useAuth();
  return <header className="site-header"><div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8"><Brand /><div className="flex shrink-0 items-center gap-3">{user ? <><Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/app">Open app <ArrowUpRight /></Link></Button><SignOutButton /></> : <Button asChild variant="outline" className="h-10" disabled={loading}><Link href="/auth">Sign in / 登入 <ArrowUpRight /></Link></Button>}</div></div></header>;
}
