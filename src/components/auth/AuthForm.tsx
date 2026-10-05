import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brand } from '@/components/Brand';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth-context';
export function AuthForm({ signup = false }: { signup?: boolean }) {
  const { user } = useAuth(); const navigate = useNavigate();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); const [busy, setBusy] = useState(false);
  const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  useEffect(() => { if (user) navigate('/app', { replace: true }); }, [user, navigate]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const result = signup
        ? await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (result.error) { setError(result.error.message); return; }
      if (!result.data.session) { setNotice('Check your email to confirm your account before signing in.'); return; }
      const verified = await supabase.auth.getUser();
      if (verified.error || !verified.data.user) { setError('Please sign in again to continue.'); return; }
      navigate('/app', { replace: true });
    } catch { setError('Unable to connect. Please try again.'); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen"><header className="mx-auto max-w-6xl px-5 py-6 sm:px-8"><Brand /></header><main className="mx-auto flex max-w-6xl justify-center px-5 py-16 sm:py-24"><div className="auth-panel w-full max-w-md rounded-lg border border-border bg-card p-7 sm:p-10"><span className="mb-7 flex size-11 items-center justify-center rounded-lg bg-accent text-primary"><LockKeyhole className="size-5" /></span><p className="mb-2 text-xs font-medium uppercase text-primary">VIDEO SPEED READER</p><h1 className="text-3xl font-semibold">{signup ? 'Create your account' : 'Welcome back'}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">{signup ? '讓你的影片，成為更多可能。' : '登入，讓每一段內容更有價值。'}</p><form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label><Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-12 bg-background" disabled={busy} /></div><div><label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label><div className="relative"><Input id="password" type={showPassword ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 6 characters' : 'Enter your password'} minLength={6} value={password} onChange={e => setPassword(e.target.value)} required className="h-12 bg-background pr-12" disabled={busy} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-10 w-10 text-muted-foreground" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>{error && <p role="alert" className="text-sm leading-6 text-destructive">{error}</p>}{notice && <p role="status" className="text-sm leading-6 text-primary">{notice}</p>}<Button type="submit" disabled={busy} className="h-12 w-full">{busy ? <Loader2 className="animate-spin" /> : null}{signup ? 'Create account / 註冊' : 'Sign in / 登入'}{!busy && <ArrowRight />}</Button></form><p className="mt-7 text-center text-sm text-muted-foreground">{signup ? 'Already have an account?' : 'New to Video Speed Reader?'}{' '}<Link to={signup ? '/auth' : '/sign-up'} className="font-medium text-primary hover:underline">{signup ? 'Sign in' : 'Sign up'}</Link></p><div className="mt-8 border-t border-border pt-6 text-center"><Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Back to home</Link></div></div></main></div>;
}
