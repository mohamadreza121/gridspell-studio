# GridSpell Phase 4 — Supabase Auth and Database

This phase adds:

- Supabase SSR browser and server clients
- Next.js 16 `src/proxy.ts` token refresh
- email/password login
- password reset
- invitation-only client onboarding
- automatic profile creation
- staff roles: `owner`, `admin`, `team_member`
- client organization roles: `client`, `client_viewer`
- organization and project membership checks
- Row Level Security policies
- local test users
- pgTAP RLS tests

## 1. Prerequisites

Install and start Docker Desktop before starting the local Supabase stack.

From the project root:

```powershell
npm install
npx supabase start
```

The first start downloads the local Supabase containers. Keep the output: it contains the local API URL, anon key, service-role key, Studio URL, and Mailpit URL.

## 2. Create `.env.local`

Copy the template:

```powershell
Copy-Item .env.example .env.local
```

Run:

```powershell
npx supabase status
```

For local development, fill `.env.local` like this using the exact values printed by `supabase status`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local anon key>
SUPABASE_SERVICE_ROLE_KEY=<local service role key>
AUTH_TEST_PASSWORD=GridSpell-Test-2026!
```

The local CLI normally prints legacy anon/service-role keys. The app supports those locally and the newer publishable/secret keys on hosted Supabase.

Never expose `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` with a `NEXT_PUBLIC_` prefix.

## 3. Apply migrations

```powershell
npm run supabase:reset
```

This rebuilds the local database from:

- `supabase/migrations/202606230001_initial_platform.sql`
- `supabase/migrations/202606240001_auth_membership_rls.sql`
- `supabase/seed.sql`

## 4. Create local test users

```powershell
npm run auth:seed
```

Default local credentials:

| User | Purpose |
|---|---|
| `owner@gridspell.local` | Owner access to `/admin` |
| `admin@gridspell.local` | Admin access to `/admin` |
| `team@gridspell.local` | Team-member read access to `/admin` |
| `client@acme.local` | Client access to `/portal` |
| `viewer@acme.local` | Client-viewer access to `/portal` |
| `outsider@gridspell.local` | Authenticated user with no workspace access |

The default password is the value in `AUTH_TEST_PASSWORD`.

## 5. Run database/RLS tests

```powershell
npm run supabase:test
```

The pgTAP suite tests:

- RLS enabled on protected tables
- owner/admin/team/client/viewer/outsider behavior
- profile isolation
- staff-role visibility
- organization isolation
- project isolation
- private task visibility
- invitation visibility and acceptance
- message insert restrictions
- notification isolation
- public/draft content visibility
- private Storage policy installation

## 6. Run the website

```powershell
npm run dev
```

Test these routes:

- `http://localhost:3000/login`
- `http://localhost:3000/forgot-password`
- `http://localhost:3000/admin`
- `http://localhost:3000/admin/clients`
- `http://localhost:3000/portal`

## 7. Test password reset locally

1. Open `/forgot-password`.
2. Submit one of the seeded emails.
3. Run `npx supabase status` and open the printed Mailpit URL.
4. Open the reset message.
5. Follow the link to `/auth/callback?next=/update-password`.
6. Set a new password.

## 8. Test invitation onboarding locally

The real invitation email flow is tested from `/admin/clients`:

1. Sign in as `owner@gridspell.local`.
2. Open `/admin/clients`.
3. Enter a new client email, name, organization, and role.
4. Open the local Mailpit URL printed by `supabase status`.
5. Open the invitation email and click the link.
6. Complete `/accept-invite`.
7. Confirm the account lands in `/portal`.

Public signup is intentionally disabled. `/sign-up` only explains the invitation process.

## 9. Create the hosted Supabase project

1. Create a Supabase project.
2. Save the database password securely.
3. In **Authentication → URL Configuration**:
   - Site URL: your production Vercel URL
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://YOUR-DOMAIN/auth/callback`
4. In **Authentication → Providers → Email**:
   - keep email/password enabled
   - disable public email signups
5. In **Project Connect** or **Settings → API Keys**, copy:
   - Project URL
   - Publishable key
   - Secret key
6. Put them in local `.env.local` and Vercel Environment Variables.

Hosted environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

## 10. Push migrations to hosted Supabase

```powershell
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Do not run `db pull` first on a brand-new empty project. The migration files in this repository are the source of truth.

## 11. Create the first hosted owner

1. In Supabase Dashboard, open **Authentication → Users**.
2. Create your own email/password user and mark the email confirmed.
3. Add the hosted Supabase keys to `.env.local`.
4. Run:

```powershell
npm run auth:bootstrap-owner -- your-email@example.com
```

You can now sign in at `/login` and access `/admin`.

## 12. Generate database TypeScript types

After migrations are applied locally:

```powershell
npm run supabase:types
```

This writes `src/types/database.generated.ts`.

## Security rules

- Public signup stays disabled.
- Secret/service-role keys are server-only.
- Staff authorization is stored in `app_user_roles`, not editable profile metadata.
- Client access comes from `organization_members` and `project_members`.
- All exposed application tables use RLS.
- Admin invitation writes use a server-only Supabase admin client.
- Invite and password links return through the PKCE callback route.
