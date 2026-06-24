import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

function isoDate(daysFromToday) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  return date.toISOString().slice(0, 10);
}

function isoDateTime(daysFromToday, hours = 12) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  date.setUTCHours(hours, 0, 0, 0);
  return date.toISOString();
}

const { data: usersPage, error: usersError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000
});
if (usersError) throw usersError;

const userByEmail = new Map(
  usersPage.users.map((user) => [user.email?.toLowerCase(), user])
);
const owner = userByEmail.get("owner@gridspell.local");
const team = userByEmail.get("team@gridspell.local");
const client = userByEmail.get("client@acme.local");

if (!owner || !team || !client) {
  throw new Error("Run npm run auth:seed before npm run portal:seed.");
}

const { data: organization, error: organizationError } = await supabase
  .from("organizations")
  .select("id")
  .eq("slug", "acme-demo-company")
  .single();
if (organizationError) throw organizationError;

const { data: project, error: projectError } = await supabase
  .from("projects")
  .update({
    description: "A premium marketing website and client portal for Acme Demo Company.",
    status: "active",
    progress: 46,
    budget: 18500,
    start_date: isoDate(-21),
    target_launch_date: isoDate(42),
    updated_at: new Date().toISOString()
  })
  .eq("slug", "acme-website-rebuild")
  .select("id, organization_id")
  .single();
if (projectError) throw projectError;

const phaseIds = {
  discovery: "61000000-0000-0000-0000-000000000001",
  strategy: "61000000-0000-0000-0000-000000000002",
  design: "61000000-0000-0000-0000-000000000003",
  development: "61000000-0000-0000-0000-000000000004",
  qa: "61000000-0000-0000-0000-000000000005",
  launch: "61000000-0000-0000-0000-000000000006"
};

const { error: phasesError } = await supabase.from("project_phases").upsert([
  {
    id: phaseIds.discovery,
    project_id: project.id,
    name: "Discovery",
    description: "Business goals, audience, content requirements, and success criteria.",
    status: "completed",
    position: 1,
    start_date: isoDate(-21),
    due_date: isoDate(-16)
  },
  {
    id: phaseIds.strategy,
    project_id: project.id,
    name: "Strategy",
    description: "Sitemap, conversion paths, project architecture, and content hierarchy.",
    status: "completed",
    position: 2,
    start_date: isoDate(-15),
    due_date: isoDate(-8)
  },
  {
    id: phaseIds.design,
    project_id: project.id,
    name: "Design",
    description: "Visual direction, responsive page designs, and interaction prototypes.",
    status: "in_progress",
    position: 3,
    start_date: isoDate(-7),
    due_date: isoDate(10)
  },
  {
    id: phaseIds.development,
    project_id: project.id,
    name: "Development",
    description: "Next.js implementation, CMS data, forms, integrations, and portal workflows.",
    status: "not_started",
    position: 4,
    start_date: isoDate(11),
    due_date: isoDate(28)
  },
  {
    id: phaseIds.qa,
    project_id: project.id,
    name: "Quality Assurance",
    description: "Responsive, accessibility, content, performance, and launch testing.",
    status: "not_started",
    position: 5,
    start_date: isoDate(29),
    due_date: isoDate(36)
  },
  {
    id: phaseIds.launch,
    project_id: project.id,
    name: "Launch",
    description: "Production release, monitoring, handoff, and post-launch support.",
    status: "not_started",
    position: 6,
    start_date: isoDate(37),
    due_date: isoDate(42)
  }
]);
if (phasesError) throw phasesError;

const milestoneIds = {
  direction: "62000000-0000-0000-0000-000000000001",
  pages: "62000000-0000-0000-0000-000000000002",
  build: "62000000-0000-0000-0000-000000000003"
};

const { error: milestonesError } = await supabase.from("milestones").upsert([
  {
    id: milestoneIds.direction,
    project_id: project.id,
    phase_id: phaseIds.design,
    title: "Homepage visual direction",
    description: "Approve the primary visual system before internal pages are finalized.",
    status: "in_review",
    due_date: isoDate(3),
    requires_approval: true
  },
  {
    id: milestoneIds.pages,
    project_id: project.id,
    phase_id: phaseIds.design,
    title: "Core page designs",
    description: "Services, work, process, pricing, and contact page design delivery.",
    status: "in_progress",
    due_date: isoDate(10),
    requires_approval: true
  },
  {
    id: milestoneIds.build,
    project_id: project.id,
    phase_id: phaseIds.development,
    title: "Production build",
    description: "Approved designs implemented as a responsive Next.js website.",
    status: "not_started",
    due_date: isoDate(28),
    requires_approval: false
  }
]);
if (milestonesError) throw milestonesError;

const { error: tasksError } = await supabase.from("tasks").upsert([
  {
    id: "63000000-0000-0000-0000-000000000001",
    project_id: project.id,
    milestone_id: milestoneIds.direction,
    title: "Review homepage direction",
    description: "Open the approval card and approve or request changes.",
    status: "in_review",
    due_date: isoDate(3),
    client_visible: true
  },
  {
    id: "63000000-0000-0000-0000-000000000002",
    project_id: project.id,
    milestone_id: milestoneIds.pages,
    title: "Upload final service copy",
    description: "Provide the final service descriptions in the Files section.",
    status: "in_progress",
    due_date: isoDate(6),
    client_visible: true
  },
  {
    id: "63000000-0000-0000-0000-000000000003",
    project_id: project.id,
    milestone_id: milestoneIds.pages,
    title: "Confirm domain access",
    description: "Confirm where the production domain is currently managed.",
    status: "not_started",
    due_date: isoDate(12),
    client_visible: true
  },
  {
    id: "63000000-0000-0000-0000-000000000004",
    project_id: project.id,
    milestone_id: milestoneIds.pages,
    title: "Internal component audit",
    description: "GridSpell internal implementation task.",
    status: "in_progress",
    due_date: isoDate(8),
    client_visible: false
  }
]);
if (tasksError) throw tasksError;

const { error: approvalsError } = await supabase.from("approvals").upsert([
  {
    id: "64000000-0000-0000-0000-000000000001",
    project_id: project.id,
    milestone_id: milestoneIds.direction,
    title: "Homepage visual direction",
    description: "Review the selected typography, gradient system, motion direction, and hero composition.",
    status: "in_review",
    requested_by: owner.id,
    created_at: isoDateTime(-1, 15)
  },
  {
    id: "64000000-0000-0000-0000-000000000002",
    project_id: project.id,
    milestone_id: milestoneIds.direction,
    title: "Sitemap and content hierarchy",
    description: "The approved sitemap is recorded here for project history.",
    status: "approved",
    requested_by: owner.id,
    decided_by: client.id,
    decision_note: "Approved. Proceed with the proposed page structure.",
    decided_at: isoDateTime(-8, 18),
    created_at: isoDateTime(-10, 14)
  }
]);
if (approvalsError) throw approvalsError;

const { error: messagesError } = await supabase.from("messages").upsert([
  {
    id: "65000000-0000-0000-0000-000000000001",
    project_id: project.id,
    sender_id: owner.id,
    body: "Welcome to the Acme project workspace. We will keep approvals, files, and project questions connected here.",
    created_at: isoDateTime(-5, 14)
  },
  {
    id: "65000000-0000-0000-0000-000000000002",
    project_id: project.id,
    sender_id: client.id,
    body: "Thanks. The new visual direction is looking strong. I will upload the remaining service copy this week.",
    created_at: isoDateTime(-3, 17)
  },
  {
    id: "65000000-0000-0000-0000-000000000003",
    project_id: project.id,
    sender_id: team.id,
    body: "The homepage approval is ready. Please review it in the Projects section when you have a moment.",
    created_at: isoDateTime(-1, 16)
  }
]);
if (messagesError) throw messagesError;

const invoiceId = "66000000-0000-0000-0000-000000000001";
const { error: invoiceError } = await supabase.from("invoices").upsert({
  id: invoiceId,
  organization_id: organization.id,
  project_id: project.id,
  invoice_number: "GS-2026-001",
  status: "open",
  amount_due: 9250,
  amount_paid: 4625,
  currency: "CAD",
  issued_at: isoDateTime(-14, 12),
  due_at: isoDateTime(7, 12),
  created_at: isoDateTime(-14, 12)
});
if (invoiceError) throw invoiceError;

const { error: paymentError } = await supabase.from("payments").upsert({
  id: "67000000-0000-0000-0000-000000000001",
  invoice_id: invoiceId,
  project_id: project.id,
  amount: 4625,
  currency: "CAD",
  provider: "manual",
  provider_payment_id: "demo-payment-001",
  status: "paid",
  paid_at: isoDateTime(-13, 15),
  created_at: isoDateTime(-13, 15)
});
if (paymentError) throw paymentError;

const storagePath = `${project.id}/gridspell-project-guide.txt`;
const fileBody = Buffer.from(
  "GridSpell project workspace\n\nUse this portal for project files, messages, approvals, billing, and support.\n",
  "utf8"
);
const { error: storageError } = await supabase.storage.from("project-files").upload(
  storagePath,
  fileBody,
  { contentType: "text/plain", upsert: true }
);
if (storageError) throw storageError;

const { error: fileError } = await supabase.from("files").upsert({
  id: "68000000-0000-0000-0000-000000000001",
  organization_id: organization.id,
  project_id: project.id,
  uploaded_by: owner.id,
  bucket: "project-files",
  storage_path: storagePath,
  file_name: "GridSpell Project Guide.txt",
  mime_type: "text/plain",
  size_bytes: fileBody.byteLength,
  folder: "Shared",
  client_visible: true,
  created_at: isoDateTime(-5, 14)
});
if (fileError) throw fileError;

const { error: supportError } = await supabase.from("support_tickets").upsert({
  id: "69000000-0000-0000-0000-000000000001",
  organization_id: organization.id,
  project_id: project.id,
  created_by: client.id,
  subject: "Confirm production domain handoff",
  body: "Can you confirm what access GridSpell will need before connecting the production domain?",
  priority: "normal",
  status: "in_progress",
  assigned_to: team.id,
  created_at: isoDateTime(-2, 15),
  updated_at: isoDateTime(-1, 11)
});
if (supportError) throw supportError;

const { error: notificationError } = await supabase.from("notifications").upsert({
  id: "6a000000-0000-0000-0000-000000000001",
  user_id: client.id,
  title: "Homepage approval ready",
  body: "The homepage visual direction is waiting for your review.",
  href: `/portal/projects/acme-website-rebuild`,
  created_at: isoDateTime(-1, 16)
});
if (notificationError) throw notificationError;

console.log("\nPortal demo data is ready.\n");
console.log("Login: client@acme.local");
console.log("Password: GridSpell-Test-2026!");
console.log("Portal: http://localhost:3000/portal\n");
