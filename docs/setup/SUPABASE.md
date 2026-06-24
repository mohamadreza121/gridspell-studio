# Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add the Project URL, publishable key, and secret key.
4. Run `supabase/migrations/202606230001_initial_platform.sql` in SQL Editor.
5. Run `supabase/seed.sql`.
6. Keep public signups disabled and add local/production callback URLs.
7. Create your user, then make it owner:

```sql
update public.profiles set role='owner'
where id=(select id from auth.users where email='YOUR_EMAIL');
```

Never expose `SUPABASE_SECRET_KEY` in a browser variable. The lead form uses a server route. Protected client records use RLS.

The migration creates a private `project-files` bucket. Add Storage object policies after finalizing the folder convention, for example `organization-id/project-id/...`.

Generate database types after the schema stabilizes:

```powershell
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```
