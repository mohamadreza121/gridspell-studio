import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import {
  AdminHeader,
  AdminNotice,
  AdminPanel,
  StatusBadge
} from "@/components/admin/AdminUi";
import { ActionButton, ActionLink } from "@/components/ui/ActionControl";
import {
  createPortalDemoWorkspaceAction,
  updateAdminProfileAction
} from "@/features/admin/settings/actions";
import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function SettingsPage({ searchParams }: Props) {
  const [viewer, query] = await Promise.all([
    requireStaff(["owner", "admin", "team_member"]),
    searchParams
  ]);
  const supabase = await createClient();
  const suffix = viewer.userId.replaceAll("-", "").slice(0, 8).toLowerCase();
  const demoSlug = `client-portal-demo-${suffix}`;
  const { data: demoProject } = await supabase
    .from("projects")
    .select("id, name, slug, status, progress")
    .eq("slug", demoSlug)
    .maybeSingle();

  return (
    <section>
      <AdminHeader
        title="Settings and portal testing."
        text="Manage your staff profile and create a realistic workspace for testing the complete client experience."
        action={
          <Link
            href="/portal"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-5 text-sm text-white/64 transition hover:text-white"
          >
            Open portal <ExternalLink className="h-4 w-4" />
          </Link>
        }
      />
      <AdminNotice error={query.error} message={query.message} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
        <AdminPanel eyebrow="Account" title="Staff profile">
          <form action={updateAdminProfileAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-white/55">
              Display name
              <input
                name="fullName"
                required
                minLength={2}
                maxLength={100}
                defaultValue={viewer.fullName ?? ""}
                className="form-field"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/55">
              Login email
              <input value={viewer.email ?? ""} readOnly className="form-field opacity-55" />
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-white/[.07] bg-black/10 p-4">
              <span className="text-sm text-white/45">Workspace role</span>
              <StatusBadge value={viewer.staffRole ?? "staff"} />
            </div>
            <ActionButton type="submit">Save profile</ActionButton>
          </form>
        </AdminPanel>

        <AdminPanel eyebrow="Portal QA" title="Demo client workspace">
          <p className="mt-5 text-sm leading-7 text-white/42">
            Create a real project with phases, milestones, tasks, an approval, messages,
            billing, and support data. The client portal will load it from Supabase.
          </p>

          {demoProject ? (
            <div className="mt-6 rounded-2xl border border-[#7c5cff]/24 bg-[#7c5cff]/7 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{demoProject.name}</p>
                  <p className="mt-2 text-xs text-white/30">
                    {demoProject.progress}% complete · {demoProject.slug}
                  </p>
                </div>
                <StatusBadge value={demoProject.status} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ActionLink href="/portal">
                  Test client portal <ArrowRight className="h-4 w-4" />
                </ActionLink>
                <Link
                  href={`/admin/projects/${demoProject.slug}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-white/10 px-5 text-sm text-white/52 transition hover:text-white"
                >
                  Open admin project
                </Link>
              </div>
            </div>
          ) : null}

          {viewer.staffRole === "team_member" ? (
            <p className="mt-6 text-sm text-white/36">
              An owner or admin must create the demo workspace.
            </p>
          ) : (
            <form action={createPortalDemoWorkspaceAction} className="mt-6 max-w-md">
              <ActionButton type="submit" className="w-full">
                {demoProject ? "Refresh demo workspace" : "Create demo workspace"}
                <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </form>
          )}

          <div className="mt-8 grid gap-3 border-t border-white/[.08] pt-6 md:grid-cols-3">
            <Link href="/admin/clients" className="rounded-2xl border border-white/[.07] bg-black/10 p-4 text-sm text-white/55 transition hover:text-white">
              Invite a test client
            </Link>
            <Link href="/portal" className="rounded-2xl border border-white/[.07] bg-black/10 p-4 text-sm text-white/55 transition hover:text-white">
              Preview client portal
            </Link>
            <Link href="/admin/projects" className="rounded-2xl border border-white/[.07] bg-black/10 p-4 text-sm text-white/55 transition hover:text-white">
              Manage test project
            </Link>
          </div>
        </AdminPanel>
      </div>
    </section>
  );
}
