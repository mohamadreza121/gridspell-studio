import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleDollarSign,
  FolderKanban,
  Inbox,
  MessageSquareText,
  Settings2,
  UsersRound
} from "lucide-react";

import {
  AdminHeader,
  AdminPanel,
  EmptyState,
  MetricCard,
  StatusBadge,
  formatDate,
  formatMoney
} from "@/components/admin/AdminUi";
import { ActionLink } from "@/components/ui/ActionControl";
import { getAdminDashboard } from "@/features/admin/data";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboard();

  return (
    <section>
      <AdminHeader
        eyebrow="Operations"
        title="Studio dashboard."
        text="See the sales pipeline, active delivery work, outstanding revenue, and the latest client activity from one operational view."
        action={
          <ActionLink href="/admin/projects">
            Open projects <ArrowRight className="h-4 w-4" />
          </ActionLink>
        }
      />

      <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Pipeline"
          value={formatMoney(data.metrics.pipelineValue)}
          detail="Qualified opportunities not yet closed"
        />
        <MetricCard
          label="New leads"
          value={String(data.metrics.newLeads)}
          detail="Unreviewed project inquiries"
        />
        <MetricCard
          label="Active projects"
          value={String(data.metrics.activeProjects)}
          detail="Planning, active, or in review"
        />
        <MetricCard
          label="Open proposals"
          value={String(data.metrics.proposalsOpen)}
          detail="Draft or sent proposals"
        />
        <MetricCard
          label="Outstanding"
          value={formatMoney(data.metrics.outstanding)}
          detail="Unpaid invoice balance"
        />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.15fr_.85fr]">
        <AdminPanel eyebrow="Delivery" title="Active projects">
          <div className="mt-6 grid gap-3">
            {data.projects.length ? (
              data.projects.map((project) => {
                const organization = Array.isArray(project.organizations)
                  ? project.organizations[0]
                  : project.organizations;

                return (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.slug}`}
                    className="rounded-2xl border border-white/[.07] bg-black/10 p-4 transition hover:border-[#7c5cff]/35 hover:bg-white/[.035]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{project.name}</p>
                        <p className="mt-1 text-sm text-white/34">
                          {organization?.name ?? "No organization"} · Updated {formatDate(project.updated_at)}
                        </p>
                      </div>
                      <StatusBadge value={project.status} />
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-white/28">
                      {project.progress}% complete · {formatMoney(project.budget)}
                    </p>
                  </Link>
                );
              })
            ) : (
              <EmptyState>No projects have been created yet.</EmptyState>
            )}
          </div>
          <Link
            href="/admin/projects"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8be9ff] transition hover:text-white"
          >
            Manage all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </AdminPanel>

        <AdminPanel eyebrow="Sales" title="Recent leads">
          <div className="mt-6 grid gap-3">
            {data.leads.length ? (
              data.leads.slice(0, 6).map((lead) => (
                <Link
                  key={lead.id}
                  href="/admin/leads"
                  className="flex items-start justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4 transition hover:border-white/[.15]"
                >
                  <div>
                    <p className="text-sm font-medium text-white/72">{lead.name}</p>
                    <p className="mt-1 text-xs text-white/30">
                      {lead.company || "Independent client"} · {formatDate(lead.created_at)}
                    </p>
                  </div>
                  <StatusBadge value={lead.status} />
                </Link>
              ))
            ) : (
              <EmptyState>No leads have arrived yet.</EmptyState>
            )}
          </div>
          <Link
            href="/admin/leads"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8be9ff] transition hover:text-white"
          >
            Open lead pipeline <ArrowRight className="h-4 w-4" />
          </Link>
        </AdminPanel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <AdminPanel eyebrow="Quick actions" title="Operate the workspace">
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                label: "Client invitations",
                detail: "Create organizations and invite client accounts.",
                href: "/admin/clients",
                icon: UsersRound
              },
              {
                label: "Project delivery",
                detail: "Manage phases, tasks, approvals, and files.",
                href: "/admin/projects",
                icon: FolderKanban
              },
              {
                label: "Communications",
                detail: "Reply to project messages and support requests.",
                href: "/admin/communications",
                icon: MessageSquareText
              },
              {
                label: "Portal testing",
                detail: "Create demo data and preview the client experience.",
                href: "/admin/settings",
                icon: Settings2
              }
            ].map(({ label, detail, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-white/[.07] bg-black/10 p-5 transition hover:-translate-y-0.5 hover:border-[#8be9ff]/25 hover:bg-white/[.035]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-5 text-sm font-medium text-white/70">{label}</p>
                <p className="mt-2 text-xs leading-6 text-white/30">{detail}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#8be9ff]" />
              </Link>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel eyebrow="Activity" title="Latest workspace changes">
          <div className="mt-6 grid gap-3">
            {data.activities.length ? (
              data.activities.slice(0, 8).map((activity) => {
                const actor = Array.isArray(activity.profiles)
                  ? activity.profiles[0]
                  : activity.profiles;
                const project = Array.isArray(activity.projects)
                  ? activity.projects[0]
                  : activity.projects;
                const organization = Array.isArray(activity.organizations)
                  ? activity.organizations[0]
                  : activity.organizations;

                return (
                  <div
                    key={activity.id}
                    className="grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
                      <BriefcaseBusiness className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm text-white/58">
                        {activity.action.replaceAll("_", " ")}
                      </p>
                      <p className="mt-1 text-xs text-white/25">
                        {actor?.full_name || "System"}
                        {project?.name ? ` · ${project.name}` : ""}
                        {!project?.name && organization?.name ? ` · ${organization.name}` : ""}
                        {` · ${formatDate(activity.created_at)}`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState>No activity has been recorded yet.</EmptyState>
            )}
          </div>
        </AdminPanel>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/invoices" className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:border-white/[.16]">
          <CircleDollarSign className="h-5 w-5 text-[#8be9ff]" />
          <p className="mt-4 text-sm font-medium text-white/68">Invoices and payments</p>
        </Link>
        <Link href="/admin/proposals" className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:border-white/[.16]">
          <BriefcaseBusiness className="h-5 w-5 text-[#8be9ff]" />
          <p className="mt-4 text-sm font-medium text-white/68">Proposals and scope</p>
        </Link>
        <Link href="/portal" className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:border-white/[.16]">
          <Inbox className="h-5 w-5 text-[#8be9ff]" />
          <p className="mt-4 text-sm font-medium text-white/68">Preview the client portal</p>
        </Link>
      </div>
    </section>
  );
}
