# GridSpell Studio

A production-oriented Next.js starter for a premium web design and full-stack development studio.

Included:

- Dark luxury marketing website foundation
- Animated homepage and responsive page templates
- Services, pricing, work, process, about, insights, and inquiry routes
- Supabase SSR authentication foundation
- Invitation-controlled client registration
- Client portal and admin dashboard shells
- Lead API with Zod validation
- Initial PostgreSQL schema, RLS policies, and seed content
- Complete Phase 1 strategy in `docs/phase-1`
- Requested browser, Apple, Android, and manifest icon structure

## Start

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Validate

```powershell
npm run type-check
npm run lint
npm run build
```

## Supabase

Follow `docs/setup/SUPABASE.md`, run the migration in `supabase/migrations`, and then run `supabase/seed.sql`.

## Icon files

```text
src/app/favicon.ico
src/app/icon.png
src/app/apple-icon.png
public/android-chrome-192x192.png
public/android-chrome-512x512.png
public/site.webmanifest
```

The included icons are placeholders. Replace them with your final GridSpell exports without renaming them.

## First document to read

`docs/phase-1/00-PHASE-1-INDEX.md`
