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
- Use the generated Cloud browser client and only the default auth user record for v1; no custom schema is needed.
- This is a plain Vite + React SPA (no SSR). Routing is client-side with React Router in src/AppRoutes.tsx; vercel.json rewrites every path to index.html so deep links resolve.
- Keep public auth pages at /auth (alias /sign-in) and /sign-up, and protected pages under the RequireAuth guard (/app).
- Keep one root auth listener and expose session state through AuthContext; this keeps header actions and route invalidation consistent.
- Share authentication forms and brand controls in PascalCase component files; page components live in src/pages.
- Keep all visual values in the global semantic theme and use existing UI controls; this preserves consistent theming.
