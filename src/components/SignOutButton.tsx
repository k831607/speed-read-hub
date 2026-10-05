import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export function SignOutButton() {
  const navigate = useNavigate(); const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function signOut() {
    setBusy(true); setError('');
    await queryClient.cancelQueries(); queryClient.clear();
    const result = await supabase.auth.signOut();
    if (result.error) { setError('Could not sign out. Please try again.'); setBusy(false); return; }
    await navigate({ to: '/auth', replace: true });
  }
  return <div className="text-right"><Button variant="outline" className="h-10" onClick={signOut} disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <LogOut />}<span>Sign Out</span></Button>{error && <p role="alert" className="mt-2 max-w-48 text-xs text-destructive">{error}</p>}</div>;
}
