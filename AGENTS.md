<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Next.js 16 App Router (since M1). Routes live in app/; their UI lives in src/views and src/components. Tailwind 4 via @tailwindcss/postcss; the theme lives in app/globals.css.
- Backend is the project's own Supabase project. Client components use the single browser client in src/integrations/supabase/client.ts (cookie-based, from src/lib/supabase/client.ts); Server Components and Route Handlers use src/lib/supabase/server.ts. Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, and server-only SUPABASE_SECRET_KEY (never NEXT_PUBLIC_).
- middleware.ts refreshes the Supabase session cookie on every request.
- Public auth pages are /sign-in (legacy /auth redirects there) and /sign-up; protected pages (/app, /upload) check the user on the server and redirect to /sign-in.
- Keep one root auth listener (src/components/AuthProvider.tsx) and expose session state through AuthContext.
- Schema changes go in supabase/migrations/*.sql and are committed to git.
- worker/ is the Python Whisper worker deployed to EC2 (ap-northeast-1) via SSM; Vercel ignores it.
- Keep all visual values in the global semantic theme and use existing UI controls; this preserves consistent theming.
