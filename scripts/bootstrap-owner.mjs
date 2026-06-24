import { createClient } from "@supabase/supabase-js";

const email = process.argv[2]?.trim().toLowerCase();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email) {
  throw new Error(
    "Usage: npm run auth:bootstrap-owner -- your-email@example.com"
  );
}

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase URL or secret key in .env.local");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (error) throw error;

const user = data.users.find((candidate) => candidate.email?.toLowerCase() === email);
if (!user) {
  throw new Error(
    `No Supabase Auth user exists for ${email}. Create the user in Authentication > Users first.`
  );
}

const { error: profileError } = await supabase.from("profiles").upsert({
  id: user.id,
  full_name: user.user_metadata?.full_name ?? email.split("@")[0]
});
if (profileError) throw profileError;

const { error: roleError } = await supabase.from("app_user_roles").upsert({
  user_id: user.id,
  role: "owner"
});
if (roleError) throw roleError;

console.log(`${email} is now the GridSpell owner.`);
