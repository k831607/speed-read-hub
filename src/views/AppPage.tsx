"use client";

import Link from 'next/link';
import { AudioLines, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/Brand';
import { SignOutButton } from '@/components/SignOutButton';
export default function AppPage({ email }: { email: string }) {
  return <div className="min-h-screen"><header className="border-b border-border"><div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8"><Brand /><div className="flex items-center gap-3"><Button asChild variant="ghost"><Link href="/upload"><Upload />Upload / 上傳</Link></Button><SignOutButton /></div></div></header><main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"><p className="mb-4 text-xs font-medium uppercase text-primary">YOUR WORKSPACE</p><h1 className="break-words text-2xl font-semibold sm:text-3xl">Hi {email}</h1><div className="flex min-h-96 flex-col items-center justify-center py-20 text-center"><div className="mb-7 flex size-20 items-center justify-center rounded-lg border border-border bg-card text-primary"><AudioLines className="size-9" /></div><span className="mb-5 inline-flex items-center gap-2 text-xs text-primary"><Sparkles className="size-3.5" />Now live</span><h2 className="text-2xl font-semibold">A new home for your words.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Paste a video link and get a transcript in a few minutes.</p><Button asChild className="mt-7 h-12 px-7"><Link href="/upload">Start a transcription<Upload /></Link></Button></div></main></div>;
}
