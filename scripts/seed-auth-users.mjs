import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.AUTH_TEST_PASSWORD ?? "GridSpell-Test-2026!";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const users = [
  { email: "owner@gridspell.local", fullName: "GridSpell Owner", staffRole: "owner" },
  { email: "admin@gridspell.local", fullName: "GridSpell Admin", staffRole: "admin" },
  {
    email: "team@gridspell.local",
    fullName: "GridSpell Team Member",
    staffRole: "team_member"
  },
  { email: "client@acme.local", fullName: "Acme Client", clientRole: "client" },
  {
    email: "viewer@acme.local",
    fullName: "Acme Viewer",
    clientRole: "client_viewer"
  },
  { email: "outsider@gridspell.local", fullName: "No Access User" }
];

async function getOrCreateUser({ email, fullName }) {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  });

  if (listError) throw listError;

  const existing = listed.users.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase()
  );

  if (existing) {
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName }
    });
    if (error) throw error;
    return data.user;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  });

  if (error) throw error;
  return data.user;
}

const createdUsers = new Map();

for (const definition of users) {
  const user = await getOrCreateUser(definition);
  createdUsers.set(definition.email, user);

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: definition.fullName,
    onboarding_completed_at: new Date().toISOString()
  });

  if (profileError) throw profileError;

  if (definition.staffRole) {
    const { error: roleError } = await supabase.from("app_user_roles").upsert({
      user_id: user.id,
      role: definition.staffRole
    });

    if (roleError) throw roleError;
  }
}

const { data: organization, error: organizationError } = await supabase
  .from("organizations")
  .upsert(
    {
      name: "Acme Demo Company",
      slug: "acme-demo-company",
      website: "https://example.com"
    },
    { onConflict: "slug" }
  )
  .select("id")
  .single();

if (organizationError) throw organizationError;

for (const [email, role] of [
  ["client@acme.local", "client"],
  ["viewer@acme.local", "client_viewer"]
]) {
  const user = createdUsers.get(email);
  const { error } = await supabase.from("organization_members").upsert({
    organization_id: organization.id,
    user_id: user.id,
    role
  });
  if (error) throw error;
}

const owner = createdUsers.get("owner@gridspell.local");
const { data: project, error: projectError } = await supabase
  .from("projects")
  .upsert(
    {
      organization_id: organization.id,
      name: "Acme Website Rebuild",
      slug: "acme-website-rebuild",
      description: "Local authentication and RLS testing project.",
      status: "active",
      progress: 36,
      created_by: owner.id
    },
    { onConflict: "slug" }
  )
  .select("id")
  .single();

if (projectError) throw projectError;

for (const [email, role] of [
  ["client@acme.local", "client"],
  ["viewer@acme.local", "client_viewer"],
  ["team@gridspell.local", "team_member"]
]) {
  const user = createdUsers.get(email);
  const { error } = await supabase.from("project_members").upsert({
    project_id: project.id,
    user_id: user.id,
    role
  });
  if (error) throw error;
}

console.log("\nLocal GridSpell auth users are ready:\n");
for (const definition of users) {
  console.log(`${definition.email}  |  ${password}`);
}
console.log("\nUse owner@gridspell.local for /admin and client@acme.local for /portal.\n");
