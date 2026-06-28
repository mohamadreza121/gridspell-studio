"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Filter,
  FolderOpen,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  ListTodo,
  MessageSquareText,
  Paperclip,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRoundCheck,
  UsersRound
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from "motion/react";
import {
  useRef,
  useState,
  type ComponentType,
  type ReactNode
} from "react";

import { Container } from "@/components/ui/Container";
import {
  dashboardTourSteps,
  type DashboardTourStep,
  type DashboardTourStepId
} from "@/config/dashboard-tour";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

const iconMap: Record<DashboardTourStepId, IconComponent> = {
  overview: LayoutDashboard,
  projects: BriefcaseBusiness,
  tasks: ListTodo,
  approvals: ShieldCheck,
  files: FolderOpen,
  messages: MessageSquareText,
  billing: CreditCard,
  support: LifeBuoy
};

const projectTasks = [
  {
    title: "Review homepage design direction",
    owner: "Client",
    priority: "High",
    status: "Needs review",
    due: "Jul 05"
  },
  {
    title: "Prepare service-page content",
    owner: "GridSpell",
    priority: "Normal",
    status: "In progress",
    due: "Jul 08"
  },
  {
    title: "Confirm booking workflow",
    owner: "Client",
    priority: "Normal",
    status: "Open",
    due: "Jul 09"
  },
  {
    title: "Build responsive navigation",
    owner: "GridSpell",
    priority: "Normal",
    status: "Scheduled",
    due: "Jul 12"
  }
];

const files = [
  {
    name: "Homepage-direction-v3.pdf",
    category: "Design",
    version: "v3",
    owner: "GridSpell",
    date: "Jul 02"
  },
  {
    name: "Northstar-brand-assets.zip",
    category: "Brand",
    version: "Final",
    owner: "Alex Rivera",
    date: "Jun 28"
  },
  {
    name: "Approved-service-copy.docx",
    category: "Content",
    version: "v2",
    owner: "Alex Rivera",
    date: "Jun 26"
  },
  {
    name: "Project-scope-and-timeline.pdf",
    category: "Project",
    version: "Signed",
    owner: "GridSpell",
    date: "Jun 10"
  }
];

function StatusBadge({
  children,
  tone = "cyan"
}: {
  children: ReactNode;
  tone?: "cyan" | "green" | "violet" | "amber" | "neutral";
}) {
  const styles = {
    cyan: "border-[#8be9ff]/22 bg-[#8be9ff]/8 text-[#8be9ff]",
    green: "border-[#69e6ad]/22 bg-[#69e6ad]/8 text-[#7aefb9]",
    violet: "border-[#a38bff]/22 bg-[#a38bff]/8 text-[#b7a7ff]",
    amber: "border-[#ffc86a]/22 bg-[#ffc86a]/8 text-[#ffd17f]",
    neutral: "border-white/[0.08] bg-white/[0.03] text-white/40"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.52rem] font-semibold",
        styles[tone]
      )}
    >
      {children}
    </span>
  );
}

function PortalCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/[0.075] bg-[#0d1016]",
        className
      )}
    >
      {children}
    </section>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-[1.45rem] font-semibold tracking-[-0.055em] text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-2xl text-[0.66rem] leading-5 text-white/38">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "cyan"
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconComponent;
  tone?: "cyan" | "green" | "violet" | "amber";
}) {
  const iconStyles = {
    cyan: "border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]",
    green: "border-[#69e6ad]/18 bg-[#69e6ad]/7 text-[#7aefb9]",
    violet: "border-[#a38bff]/18 bg-[#a38bff]/7 text-[#b7a7ff]",
    amber: "border-[#ffc86a]/18 bg-[#ffc86a]/7 text-[#ffd17f]"
  };

  return (
    <PortalCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/24">
            {label}
          </p>
          <p className="mt-2 text-[1.05rem] font-semibold tracking-[-0.045em] text-white/86">
            {value}
          </p>
          <p className="mt-1 text-[0.5rem] text-white/26">{detail}</p>
        </div>
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-lg border",
            iconStyles[tone]
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
    </PortalCard>
  );
}

function PortalSidebar({
  activeId,
  compact
}: {
  activeId: DashboardTourStepId;
  compact: boolean;
}) {
  return (
    <aside className="flex min-h-0 flex-col border-r border-white/[0.07] bg-[#0a0d13] p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#7c5cff]/45 bg-gradient-to-br from-[#22184e] to-[#0c2730] text-sm font-bold text-white">
          G
        </span>
        {!compact ? (
          <span className="text-sm font-semibold tracking-[-0.03em] text-white/88">
            GridSpell
          </span>
        ) : null}
      </div>

      <p className="mt-8 text-[0.48rem] font-semibold uppercase tracking-[0.34em] text-white/20">
        {compact ? "Portal" : "Client portal"}
      </p>

      <nav className="mt-4 grid gap-1.5">
        {dashboardTourSteps.map((step) => {
          const Icon = iconMap[step.id];
          const active = step.id === activeId;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.6rem] font-semibold transition",
                active
                  ? "bg-[#8be9ff]/8 text-[#8be9ff]"
                  : "text-white/32"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {!compact ? <span>{step.label}</span> : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/[0.07] pt-4">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#7c5cff]/45 bg-[#7c5cff]/15 text-[0.52rem] font-semibold text-white">
              AR
            </span>
            {!compact ? (
              <div className="min-w-0">
                <p className="truncate text-[0.58rem] font-semibold text-white/68">
                  Alex Rivera
                </p>
                <p className="truncate text-[0.46rem] text-white/24">
                  Northstar Co.
                </p>
              </div>
            ) : null}
          </div>
        </div>
        {!compact ? (
          <p className="mt-3 text-[0.48rem] font-semibold text-[#8be9ff]">
            Return to website
          </p>
        ) : null}
      </div>
    </aside>
  );
}

function OverviewPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Overview"
        title="Northstar website rebuild"
        description="A live summary of progress, decisions, and the next milestone."
        action={<StatusBadge tone="green">On track</StatusBadge>}
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard
          label="Project progress"
          value="64%"
          detail="Design phase"
          icon={LayoutDashboard}
        />
        <StatCard
          label="Next milestone"
          value="Design review"
          detail="Due Jul 08"
          icon={CalendarDays}
          tone="violet"
        />
        <StatCard
          label="Your actions"
          value="2 open"
          detail="Nothing overdue"
          icon={UserRoundCheck}
          tone="amber"
        />
        <StatCard
          label="Target launch"
          value="Aug 23"
          detail="8 weeks total"
          icon={CheckCircle2}
          tone="green"
        />
      </div>

      <div className="grid grid-cols-[1.35fr_0.65fr] gap-4">
        <PortalCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
                Delivery timeline
              </p>
              <p className="mt-1 text-[0.72rem] font-semibold text-white/72">
                Discovery through launch
              </p>
            </div>
            <StatusBadge>Current: Design</StatusBadge>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {[
              ["Discovery", "Complete"],
              ["Strategy", "Complete"],
              ["Design", "Current"],
              ["Development", "Next"],
              ["Launch", "Planned"]
            ].map(([label, status], index) => (
              <div key={label} className="relative text-center">
                <span
                  className={cn(
                    "relative z-10 mx-auto grid h-7 w-7 place-items-center rounded-full border text-[0.48rem]",
                    status === "Complete"
                      ? "border-[#69e6ad]/30 bg-[#69e6ad]/10 text-[#7aefb9]"
                      : status === "Current"
                        ? "border-[#8be9ff]/38 bg-[#8be9ff]/10 text-[#8be9ff]"
                        : "border-white/[0.09] bg-[#090c12] text-white/22"
                  )}
                >
                  {status === "Complete" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < 4 ? (
                  <span className="absolute left-[62%] top-3.5 h-px w-[78%] bg-white/[0.08]" />
                ) : null}
                <p className="mt-2 text-[0.48rem] text-white/38">{label}</p>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
              Latest update
            </p>
            <span className="text-[0.46rem] text-white/20">2h ago</span>
          </div>
          <div className="mt-4 flex gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8be9ff]/10 text-[0.48rem] font-bold text-[#8be9ff]">
              GS
            </span>
            <div>
              <p className="text-[0.58rem] font-semibold text-white/68">
                Homepage direction is ready
              </p>
              <p className="mt-2 text-[0.5rem] leading-4 text-white/30">
                Version 3 includes the revised service hierarchy and mobile navigation.
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-[0.48rem] font-semibold text-[#8be9ff]">
                Open update <ChevronRight className="h-3 w-3" />
              </p>
            </div>
          </div>
        </PortalCard>
      </div>

      <div className="grid grid-cols-[1fr_0.8fr] gap-4">
        <PortalCard className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
              Client actions
            </p>
            <span className="text-[0.46rem] text-white/22">2 remaining</span>
          </div>
          <div className="mt-3 grid gap-2">
            {projectTasks.slice(0, 3).map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-[#090c12] px-3 py-2.5"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/12 text-white/20">
                  <Circle className="h-2.5 w-2.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.54rem] font-semibold text-white/62">
                    {task.title}
                  </p>
                  <p className="mt-0.5 text-[0.44rem] text-white/22">
                    {task.owner} · {task.status}
                  </p>
                </div>
                <span className="text-[0.44rem] text-white/24">{task.due}</span>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
            Project contacts
          </p>
          <div className="mt-4 grid gap-3">
            {[
              ["Mohammadreza H.", "Project lead", "MH"],
              ["Alex Rivera", "Client contact", "AR"],
              ["Jordan Lee", "Design review", "JL"]
            ].map(([name, role, initials]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] bg-white/[0.035] text-[0.48rem] font-semibold text-white/56">
                  {initials}
                </span>
                <div>
                  <p className="text-[0.54rem] font-semibold text-white/62">{name}</p>
                  <p className="mt-0.5 text-[0.44rem] text-white/22">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </PortalCard>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Projects"
        title="Northstar website rebuild"
        description="Approved scope, delivery dates, team ownership, and project history."
        action={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-[0.55rem] font-semibold !text-[#071014]"
          >
            Open project <ArrowRight className="h-3 w-3" />
          </button>
        }
      />

      <PortalCard className="overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.8fr]">
          <div className="border-r border-white/[0.07] p-5">
            <div className="flex items-center justify-between">
              <StatusBadge tone="green">Active project</StatusBadge>
              <span className="text-[0.48rem] text-white/22">Project GS-2026-014</span>
            </div>
            <h4 className="mt-5 font-display text-[1.3rem] font-semibold tracking-[-0.05em] text-white">
              Strategy, design, development, and launch for a premium service website.
            </h4>
            <p className="mt-3 text-[0.58rem] leading-5 text-white/34">
              The engagement includes content architecture, responsive UX, custom frontend development, lead capture, analytics, technical SEO, and launch support.
            </p>

            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                ["Start date", "Jun 10"],
                ["Target launch", "Aug 23"],
                ["Current phase", "Design"],
                ["Investment", "$8,500 CAD"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-[#090c12] p-3">
                  <p className="text-[0.44rem] uppercase tracking-[0.15em] text-white/20">{label}</p>
                  <p className="mt-2 text-[0.56rem] font-semibold text-white/64">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
              Project ownership
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Project lead", "Mohammadreza H.", "Planning and delivery"],
                ["Client contact", "Alex Rivera", "Feedback and approvals"],
                ["Organization", "Northstar Co.", "Primary client account"]
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-[#090c12] p-3">
                  <p className="text-[0.43rem] uppercase tracking-[0.15em] text-white/20">{label}</p>
                  <p className="mt-2 text-[0.56rem] font-semibold text-white/64">{value}</p>
                  <p className="mt-1 text-[0.45rem] text-white/22">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PortalCard>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
        <PortalCard className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
              Included deliverables
            </p>
            <span className="text-[0.46rem] text-white/22">4 workstreams</span>
          </div>
          <div className="mt-4 grid gap-2">
            {[
              ["Strategy and sitemap", "Complete", "Approved Jun 18"],
              ["Design system and key pages", "In review", "Version 3 ready"],
              ["Responsive development", "Scheduled", "Starts Jul 10"],
              ["Launch and handoff", "Planned", "Target Aug 23"]
            ].map(([title, status, detail], index) => (
              <div key={title} className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-[#090c12] px-3 py-3">
                <span className={cn("grid h-7 w-7 place-items-center rounded-full border text-[0.48rem]", index === 0 ? "border-[#69e6ad]/28 bg-[#69e6ad]/9 text-[#7aefb9]" : index === 1 ? "border-[#8be9ff]/28 bg-[#8be9ff]/9 text-[#8be9ff]" : "border-white/[0.08] text-white/24")}>{index === 0 ? <Check className="h-3 w-3" /> : index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.56rem] font-semibold text-white/64">{title}</p>
                  <p className="mt-1 text-[0.44rem] text-white/22">{detail}</p>
                </div>
                <StatusBadge tone={status === "Complete" ? "green" : status === "In review" ? "cyan" : "neutral"}>{status}</StatusBadge>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
            Project progress
          </p>
          <div className="mt-5 flex items-end justify-between">
            <p className="text-[2.2rem] font-semibold tracking-[-0.07em] text-white">64%</p>
            <StatusBadge tone="green">On schedule</StatusBadge>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.055]">
            <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-[#090c12] p-3">
              <p className="text-[0.44rem] uppercase tracking-[0.15em] text-white/20">Completed</p>
              <p className="mt-2 text-[0.64rem] font-semibold text-white/64">16 tasks</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#090c12] p-3">
              <p className="text-[0.44rem] uppercase tracking-[0.15em] text-white/20">Remaining</p>
              <p className="mt-2 text-[0.64rem] font-semibold text-white/64">9 tasks</p>
            </div>
          </div>
        </PortalCard>
      </div>
    </div>
  );
}

function TasksPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Tasks"
        title="Project tasks"
        description="Every action has a clear owner, status, priority, and deadline."
        action={
          <div className="flex gap-2">
            <button type="button" className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 text-[0.54rem] font-semibold text-white/44">
              <Filter className="h-3 w-3" /> Filter
            </button>
            <button type="button" className="inline-flex min-h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-[0.54rem] font-semibold !text-[#071014]">
              View my tasks
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total tasks" value="25" detail="Across this project" icon={ListTodo} />
        <StatCard label="Completed" value="16" detail="64% complete" icon={CheckCircle2} tone="green" />
        <StatCard label="Client actions" value="2" detail="Both due this week" icon={UserRoundCheck} tone="amber" />
        <StatCard label="Overdue" value="0" detail="Project remains on track" icon={Clock3} tone="violet" />
      </div>

      <PortalCard className="overflow-hidden">
        <div className="grid grid-cols-[1.55fr_0.55fr_0.55fr_0.65fr_0.45fr] border-b border-white/[0.07] bg-white/[0.018] px-4 py-3 text-[0.44rem] font-semibold uppercase tracking-[0.15em] text-white/22">
          <span>Task</span>
          <span>Owner</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Due</span>
        </div>
        {projectTasks.map((task, index) => (
          <div
            key={task.title}
            className={cn(
              "grid grid-cols-[1.55fr_0.55fr_0.55fr_0.65fr_0.45fr] items-center px-4 py-3.5",
              index < projectTasks.length - 1 && "border-b border-white/[0.055]"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/[0.09] text-white/20">
                <Circle className="h-2.5 w-2.5" />
              </span>
              <div>
                <p className="text-[0.56rem] font-semibold text-white/64">{task.title}</p>
                <p className="mt-1 text-[0.43rem] text-white/20">Northstar website rebuild</p>
              </div>
            </div>
            <span className="text-[0.5rem] text-white/38">{task.owner}</span>
            <span className="text-[0.5rem] text-white/38">{task.priority}</span>
            <StatusBadge tone={task.status === "Needs review" ? "amber" : task.status === "In progress" ? "cyan" : "neutral"}>{task.status}</StatusBadge>
            <span className="text-[0.5rem] text-white/32">{task.due}</span>
          </div>
        ))}
      </PortalCard>

      <div className="grid grid-cols-2 gap-4">
        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">What GridSpell is handling</p>
          <div className="mt-4 grid gap-2">
            {["Prepare service-page content", "Build responsive navigation", "Configure analytics events"].map((task) => (
              <div key={task} className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-[#090c12] px-3 py-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#8be9ff]/8 text-[#8be9ff]">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-[0.53rem] font-semibold text-white/52">{task}</span>
              </div>
            ))}
          </div>
        </PortalCard>

        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">What needs the client</p>
          <div className="mt-4 grid gap-2">
            {["Review homepage design direction", "Confirm booking workflow"].map((task) => (
              <div key={task} className="flex items-center gap-3 rounded-xl border border-[#ffc86a]/12 bg-[#ffc86a]/[0.025] px-3 py-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffc86a]/8 text-[#ffd17f]">
                  <UserRoundCheck className="h-3 w-3" />
                </span>
                <span className="text-[0.53rem] font-semibold text-white/56">{task}</span>
              </div>
            ))}
          </div>
        </PortalCard>
      </div>
    </div>
  );
}

function ApprovalsPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Approvals"
        title="Review and approve deliverables"
        description="Every revision, comment, and final decision remains attached to the submitted work."
        action={<StatusBadge tone="amber">1 awaiting review</StatusBadge>}
      />

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
        <PortalCard className="overflow-hidden">
          <div className="aspect-[1.85] border-b border-white/[0.07] bg-[radial-gradient(circle_at_72%_24%,rgba(41,214,255,0.15),transparent_28%),linear-gradient(145deg,#181e2b,#080a0f)] p-6">
            <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <span className="h-2 w-20 rounded-full bg-white/12" />
                <div className="flex gap-2">
                  <span className="h-2 w-10 rounded-full bg-white/[0.07]" />
                  <span className="h-2 w-10 rounded-full bg-white/[0.07]" />
                  <span className="h-2 w-10 rounded-full bg-white/[0.07]" />
                </div>
              </div>
              <div>
                <span className="block h-2 w-24 rounded-full bg-[#8be9ff]/32" />
                <span className="mt-4 block h-7 w-[62%] rounded-lg bg-white/12" />
                <span className="mt-3 block h-2 w-[48%] rounded-full bg-white/[0.07]" />
                <span className="mt-2 block h-2 w-[38%] rounded-full bg-white/[0.05]" />
              </div>
              <div className="flex gap-3">
                <span className="h-8 w-24 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                <span className="h-8 w-24 rounded-full border border-white/[0.09]" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge tone="violet">Homepage</StatusBadge>
                  <span className="text-[0.46rem] text-white/22">Version 3</span>
                </div>
                <h4 className="mt-3 text-[0.78rem] font-semibold text-white/72">Homepage design direction</h4>
                <p className="mt-2 text-[0.5rem] leading-4 text-white/28">Updated service hierarchy, mobile navigation, and primary conversion path.</p>
              </div>
              <div className="text-right">
                <p className="text-[0.44rem] uppercase tracking-[0.15em] text-white/20">Review by</p>
                <p className="mt-2 text-[0.58rem] font-semibold text-white/62">Jul 05</p>
              </div>
            </div>
          </div>
        </PortalCard>

        <div className="grid gap-4">
          <PortalCard className="p-4">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Decision controls</p>
            <div className="mt-4 grid gap-2">
              <button type="button" className="min-h-10 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-[0.55rem] font-semibold text-white/46">Open design preview</button>
              <button type="button" className="min-h-10 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-[0.55rem] font-semibold text-white/46">Request specific changes</button>
              <button type="button" className="min-h-10 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-[0.55rem] font-semibold !text-[#071014]">Approve version 3</button>
            </div>
            <p className="mt-4 text-[0.46rem] leading-4 text-white/22">Approving records the reviewer, timestamp, and approved version.</p>
          </PortalCard>

          <PortalCard className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Review activity</p>
              <span className="text-[0.46rem] text-white/22">4 comments</span>
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ["Alex Rivera", "Can the booking button remain visible on mobile?", "38m"],
                ["GridSpell", "Yes. Version 3 now uses a compact sticky action.", "22m"],
                ["Jordan Lee", "Service order and headline are approved.", "10m"]
              ].map(([name, message, time]) => (
                <div key={`${name}-${time}`} className="flex gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[0.42rem] font-semibold text-white/48">{name.split(" ").map((word) => word[0]).join("")}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[0.5rem] font-semibold text-white/58">{name}</p>
                      <span className="text-[0.4rem] text-white/18">{time}</span>
                    </div>
                    <p className="mt-1 text-[0.46rem] leading-4 text-white/28">{message}</p>
                  </div>
                </div>
              ))}
            </div>
          </PortalCard>
        </div>
      </div>

      <PortalCard className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Approval history</p>
          <span className="text-[0.46rem] text-white/22">2 completed decisions</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            ["Sitemap and page structure", "Approved Jun 18", "Alex Rivera"],
            ["Visual direction and moodboard", "Approved Jun 24", "Alex Rivera"]
          ].map(([title, date, reviewer]) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-[#090c12] px-3 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-[#69e6ad]/24 bg-[#69e6ad]/8 text-[#7aefb9]"><Check className="h-3 w-3" /></span>
              <div>
                <p className="text-[0.54rem] font-semibold text-white/60">{title}</p>
                <p className="mt-1 text-[0.43rem] text-white/22">{date} · {reviewer}</p>
              </div>
            </div>
          ))}
        </div>
      </PortalCard>
    </div>
  );
}

function FilesPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Files"
        title="Project file library"
        description="Current versions, ownership, categories, and upload history in one protected location."
        action={
          <button type="button" className="inline-flex min-h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-[0.55rem] font-semibold !text-[#071014]">
            <Upload className="h-3 w-3" /> Upload files
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-3">
        {[
          ["Brand assets", "12 files", FolderOpen, "cyan"],
          ["Content", "8 files", FileText, "violet"],
          ["Design", "6 files", Sparkles, "green"],
          ["Project records", "4 files", ReceiptText, "amber"]
        ].map(([label, count, Icon, tone]) => {
          const FolderIcon = Icon as IconComponent;
          return (
            <PortalCard key={String(label)} className="p-4">
              <div className="flex items-start justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#8be9ff]/16 bg-[#8be9ff]/6 text-[#8be9ff]"><FolderIcon className="h-4 w-4" /></span>
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
              </div>
              <p className="mt-4 text-[0.58rem] font-semibold text-white/64">{String(label)}</p>
              <p className="mt-1 text-[0.44rem] text-white/22">{String(count)}</p>
            </PortalCard>
          );
        })}
      </div>

      <PortalCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
          <div>
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Recent files</p>
            <p className="mt-1 text-[0.48rem] text-white/22">Most recently updated project assets</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[0.48rem] text-white/30"><Search className="h-3 w-3" /> Search</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[0.48rem] text-white/30"><Filter className="h-3 w-3" /> Category</span>
          </div>
        </div>
        <div className="grid grid-cols-[1.45fr_0.55fr_0.4fr_0.65fr_0.45fr_0.3fr] border-b border-white/[0.055] bg-white/[0.012] px-4 py-2.5 text-[0.42rem] font-semibold uppercase tracking-[0.14em] text-white/18">
          <span>File</span><span>Category</span><span>Version</span><span>Uploaded by</span><span>Date</span><span />
        </div>
        {files.map((file, index) => (
          <div key={file.name} className={cn("grid grid-cols-[1.45fr_0.55fr_0.4fr_0.65fr_0.45fr_0.3fr] items-center px-4 py-3", index < files.length - 1 && "border-b border-white/[0.05]")}> 
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-[#8be9ff]"><FileText className="h-3.5 w-3.5" /></span>
              <span className="truncate text-[0.53rem] font-semibold text-white/58">{file.name}</span>
            </div>
            <span className="text-[0.48rem] text-white/30">{file.category}</span>
            <span className="text-[0.48rem] text-white/30">{file.version}</span>
            <span className="text-[0.48rem] text-white/30">{file.owner}</span>
            <span className="text-[0.48rem] text-white/30">{file.date}</span>
            <Download className="h-3.5 w-3.5 text-white/24" />
          </div>
        ))}
      </PortalCard>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">File rules</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["Version history", "Previous versions remain available"],
              ["Access control", "Only project members can open files"],
              ["Project context", "Every asset stays attached to its project"]
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl border border-white/[0.055] bg-[#090c12] p-3">
                <p className="text-[0.53rem] font-semibold text-white/56">{title}</p>
                <p className="mt-2 text-[0.44rem] leading-4 text-white/22">{detail}</p>
              </div>
            ))}
          </div>
        </PortalCard>
        <PortalCard className="flex items-center gap-4 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]"><Upload className="h-4 w-4" /></span>
          <div>
            <p className="text-[0.56rem] font-semibold text-white/62">Need to send content?</p>
            <p className="mt-1 text-[0.44rem] leading-4 text-white/24">Upload it directly to the correct project folder.</p>
          </div>
        </PortalCard>
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Messages"
        title="Project conversations"
        description="Updates, decisions, meeting notes, and attachments remain connected to the project."
        action={<StatusBadge>1 unread update</StatusBadge>}
      />

      <PortalCard className="overflow-hidden">
        <div className="grid min-h-[440px] grid-cols-[0.36fr_0.64fr]">
          <div className="border-r border-white/[0.07] p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#090c12] px-3 py-2.5 text-[0.48rem] text-white/24">
              <Search className="h-3 w-3" /> Search conversations
            </div>
            <div className="mt-3 grid gap-2">
              {[
                ["Homepage review", "GridSpell", "The revised direction is ready.", "2h", true],
                ["Booking workflow", "Alex Rivera", "Confirmed: consultation form first.", "1d", false],
                ["Kickoff notes", "GridSpell", "Summary and next actions from kickoff.", "Jun 10", false]
              ].map(([subject, sender, preview, time, active]) => (
                <div key={String(subject)} className={cn("rounded-xl border p-3", active ? "border-[#8be9ff]/22 bg-[#8be9ff]/6" : "border-white/[0.055] bg-[#090c12]")}> 
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[0.54rem] font-semibold text-white/62">{String(subject)}</p>
                    <span className="text-[0.4rem] text-white/18">{String(time)}</span>
                  </div>
                  <p className="mt-1 text-[0.44rem] text-white/24">{String(sender)}</p>
                  <p className="mt-2 truncate text-[0.44rem] text-white/22">{String(preview)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div>
                <p className="text-[0.58rem] font-semibold text-white/66">Homepage review</p>
                <p className="mt-1 text-[0.44rem] text-white/22">Northstar website rebuild · 3 participants</p>
              </div>
              <div className="flex -space-x-2">
                {["GS", "AR", "JL"].map((initials) => (
                  <span key={initials} className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#0d1016] bg-[#171b24] text-[0.4rem] font-semibold text-white/44">{initials}</span>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4 p-4">
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8be9ff]/10 text-[0.44rem] font-bold text-[#8be9ff]">GS</span>
                <div className="max-w-[78%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-[#090c12] p-3">
                  <div className="flex items-center gap-2"><p className="text-[0.5rem] font-semibold text-white/60">GridSpell</p><span className="text-[0.39rem] text-white/18">2:14 PM</span></div>
                  <p className="mt-2 text-[0.47rem] leading-4 text-white/32">Homepage version 3 is ready. We revised the service hierarchy, added the sticky mobile action, and simplified the opening message.</p>
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                    <Paperclip className="h-3 w-3 text-[#8be9ff]" />
                    <span className="text-[0.44rem] font-semibold text-white/42">Homepage-direction-v3.pdf</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <div className="max-w-[72%] rounded-2xl rounded-tr-sm border border-[#7c5cff]/16 bg-[#7c5cff]/7 p-3">
                  <div className="flex items-center justify-end gap-2"><span className="text-[0.39rem] text-white/18">2:31 PM</span><p className="text-[0.5rem] font-semibold text-white/60">Alex Rivera</p></div>
                  <p className="mt-2 text-[0.47rem] leading-4 text-white/34">The service order looks right. Can the booking button stay visible while someone scrolls on mobile?</p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#7c5cff]/14 text-[0.44rem] font-bold text-[#b7a7ff]">AR</span>
              </div>

              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8be9ff]/10 text-[0.44rem] font-bold text-[#8be9ff]">GS</span>
                <div className="max-w-[78%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-[#090c12] p-3">
                  <p className="text-[0.47rem] leading-4 text-white/32">Yes. The mobile prototype now uses a compact sticky action bar. It is included in the version awaiting approval.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] p-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#090c12] px-3 py-3">
                <Paperclip className="h-3.5 w-3.5 text-white/24" />
                <span className="flex-1 text-[0.48rem] text-white/22">Write a message…</span>
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] text-[#071014]"><Send className="h-3 w-3" /></span>
              </div>
            </div>
          </div>
        </div>
      </PortalCard>
    </div>
  );
}

function BillingPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Billing"
        title="Project billing"
        description="Contract value, invoices, payments, due dates, and downloadable records. All amounts shown in CAD."
        action={<StatusBadge tone="green">Account current</StatusBadge>}
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Project value" value="$8,500" detail="Approved engagement" icon={CircleDollarSign} />
        <StatCard label="Paid" value="$4,250" detail="50% received" icon={CheckCircle2} tone="green" />
        <StatCard label="Remaining" value="$4,250" detail="Two scheduled payments" icon={CreditCard} tone="violet" />
        <StatCard label="Next payment" value="$2,125" detail="Due Jul 15" icon={CalendarDays} tone="amber" />
      </div>

      <div className="grid grid-cols-[1.25fr_0.75fr] gap-4">
        <PortalCard className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
            <div>
              <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Invoices</p>
              <p className="mt-1 text-[0.46rem] text-white/22">Payment history and upcoming schedule</p>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[0.48rem] font-semibold text-white/36"><Download className="h-3 w-3" /> Statement</button>
          </div>
          <div className="grid grid-cols-[0.7fr_1.1fr_0.55fr_0.55fr_0.55fr_0.3fr] border-b border-white/[0.055] bg-white/[0.012] px-4 py-2.5 text-[0.42rem] font-semibold uppercase tracking-[0.14em] text-white/18">
            <span>Invoice</span><span>Description</span><span>Amount</span><span>Due</span><span>Status</span><span />
          </div>
          {[
            ["INV-1042", "Project deposit", "$4,250", "Jun 10", "Paid"],
            ["INV-1088", "Design approval milestone", "$2,125", "Jul 15", "Scheduled"],
            ["INV-1126", "Pre-launch milestone", "$2,125", "Aug 16", "Upcoming"]
          ].map(([number, description, amount, due, status], index) => (
            <div key={number} className={cn("grid grid-cols-[0.7fr_1.1fr_0.55fr_0.55fr_0.55fr_0.3fr] items-center px-4 py-3.5", index < 2 && "border-b border-white/[0.05]")}> 
              <span className="text-[0.5rem] font-semibold text-white/52">{number}</span>
              <span className="text-[0.5rem] text-white/34">{description}</span>
              <span className="text-[0.5rem] font-semibold text-white/56">{amount}</span>
              <span className="text-[0.5rem] text-white/30">{due}</span>
              <StatusBadge tone={status === "Paid" ? "green" : status === "Scheduled" ? "amber" : "neutral"}>{status}</StatusBadge>
              <Download className="h-3.5 w-3.5 text-white/22" />
            </div>
          ))}
        </PortalCard>

        <PortalCard className="p-4">
          <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Payment plan</p>
          <div className="mt-5 flex items-end justify-between">
            <p className="text-[2rem] font-semibold tracking-[-0.07em] text-white">50%</p>
            <p className="text-[0.48rem] text-white/24">$4,250 of $8,500</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.055]">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
          </div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border border-[#ffc86a]/14 bg-[#ffc86a]/[0.025] p-3">
              <p className="text-[0.44rem] uppercase tracking-[0.15em] text-[#ffd17f]">Next scheduled invoice</p>
              <p className="mt-2 text-[0.66rem] font-semibold text-white/64">$2,125 · Jul 15</p>
              <p className="mt-1 text-[0.45rem] text-white/22">Triggered after design approval</p>
            </div>
            <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-[0.54rem] font-semibold !text-[#071014]">Open secure payment <ExternalLink className="h-3 w-3" /></button>
          </div>
        </PortalCard>
      </div>

      <PortalCard className="flex items-center justify-between gap-6 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]"><ReceiptText className="h-4 w-4" /></span>
          <div>
            <p className="text-[0.56rem] font-semibold text-white/62">Billing records remain available after launch</p>
            <p className="mt-1 text-[0.44rem] text-white/22">Download invoices, receipts, and the final account statement whenever needed.</p>
          </div>
        </div>
        <StatusBadge tone="green">No overdue balance</StatusBadge>
      </PortalCard>
    </div>
  );
}

function SupportPage() {
  return (
    <div className="grid gap-4">
      <PageHeading
        eyebrow="Support"
        title="Create a tracked support request"
        description="Project questions, access issues, content updates, and urgent production concerns receive a visible status and response history."
        action={<StatusBadge>Typical response: 1 business day</StatusBadge>}
      />

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <PortalCard className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]"><Headphones className="h-4 w-4" /></span>
            <div>
              <p className="text-[0.7rem] font-semibold text-white/68">New support request</p>
              <p className="mt-1 text-[0.46rem] text-white/22">GridSpell sees this inside the protected operations workspace.</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="grid gap-2">
              <span className="text-[0.5rem] font-semibold text-white/38">Related project</span>
              <span className="flex min-h-10 items-center justify-between rounded-xl border border-white/[0.08] bg-[#090c12] px-3 text-[0.52rem] text-white/48">Northstar website rebuild <ChevronRight className="h-3 w-3 rotate-90" /></span>
            </label>
            <label className="grid gap-2">
              <span className="text-[0.5rem] font-semibold text-white/38">Priority</span>
              <span className="flex min-h-10 items-center justify-between rounded-xl border border-white/[0.08] bg-[#090c12] px-3 text-[0.52rem] text-white/48">Normal <ChevronRight className="h-3 w-3 rotate-90" /></span>
            </label>
          </div>

          <label className="mt-4 grid gap-2">
            <span className="text-[0.5rem] font-semibold text-white/38">Subject</span>
            <span className="flex min-h-10 items-center rounded-xl border border-white/[0.08] bg-[#090c12] px-3 text-[0.5rem] text-white/20">What do you need help with?</span>
          </label>

          <label className="mt-4 grid gap-2">
            <span className="text-[0.5rem] font-semibold text-white/38">Details</span>
            <span className="min-h-24 rounded-xl border border-white/[0.08] bg-[#090c12] px-3 py-3 text-[0.5rem] leading-4 text-white/20">Include the page, expected result, urgency, and any screenshots or links that help explain the request.</span>
          </label>

          <div className="mt-4 flex items-center justify-between">
            <button type="button" className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 text-[0.5rem] font-semibold text-white/34"><Paperclip className="h-3 w-3" /> Add attachment</button>
            <button type="button" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-5 text-[0.54rem] font-semibold !text-[#071014]">Create request <ArrowRight className="h-3 w-3" /></button>
          </div>
        </PortalCard>

        <div className="grid gap-4">
          <PortalCard className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Request status</p>
              <span className="text-[0.46rem] text-white/22">3 recent</span>
            </div>
            <div className="mt-4 grid gap-2">
              {[
                ["Update contact phone number", "Resolved", "Jun 27"],
                ["Add new team member access", "In progress", "Jun 30"],
                ["Question about homepage review", "Open", "Jul 02"]
              ].map(([subject, status, date]) => (
                <div key={subject} className="rounded-xl border border-white/[0.055] bg-[#090c12] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.52rem] font-semibold leading-4 text-white/56">{subject}</p>
                    <StatusBadge tone={status === "Resolved" ? "green" : status === "In progress" ? "cyan" : "amber"}>{status}</StatusBadge>
                  </div>
                  <p className="mt-2 text-[0.43rem] text-white/20">Submitted {date}</p>
                </div>
              ))}
            </div>
          </PortalCard>

          <PortalCard className="p-4">
            <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Priority guidance</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Normal", "General questions and planned content updates"],
                ["High", "Time-sensitive issue affecting project work"],
                ["Urgent", "Production outage or critical access problem"]
              ].map(([priority, detail], index) => (
                <div key={priority} className="flex gap-3">
                  <span className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full", index === 0 ? "bg-[#8be9ff]" : index === 1 ? "bg-[#ffc86a]" : "bg-[#ff6b84]")} />
                  <div>
                    <p className="text-[0.52rem] font-semibold text-white/56">{priority}</p>
                    <p className="mt-1 text-[0.44rem] leading-4 text-white/22">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </PortalCard>
        </div>
      </div>
    </div>
  );
}

function PortalPage({ activeId }: { activeId: DashboardTourStepId }) {
  const pages: Record<DashboardTourStepId, ReactNode> = {
    overview: <OverviewPage />,
    projects: <ProjectsPage />,
    tasks: <TasksPage />,
    approvals: <ApprovalsPage />,
    files: <FilesPage />,
    messages: <MessagesPage />,
    billing: <BillingPage />,
    support: <SupportPage />
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeId}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="h-full overflow-hidden p-5"
      >
        {pages[activeId]}
      </motion.div>
    </AnimatePresence>
  );
}

function PortalShell({
  activeId,
  compact = false
}: {
  activeId: DashboardTourStepId;
  compact?: boolean;
}) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[56px_1fr] bg-[#07090e] text-white">
      <header className="flex items-center justify-between border-b border-white/[0.07] bg-[#080a0f] px-5">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[-0.03em] text-white/84">Client Portal</p>
          <p className="mt-0.5 text-[0.46rem] text-white/24">Northstar Co. · Demo workspace</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[0.46rem] text-white/24 sm:inline-flex"><Search className="h-3 w-3" /> Search portal</span>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-white/30"><Bell className="h-3.5 w-3.5" /></span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#29d6ff] text-[0.48rem] font-semibold text-white">AR</span>
        </div>
      </header>

      <div className={cn("grid min-h-0", compact ? "grid-cols-[16%_84%]" : "grid-cols-[20%_80%]")}> 
        <PortalSidebar activeId={activeId} compact={compact} />
        <main className="min-h-0 overflow-hidden bg-[#07090e]">
          <PortalPage activeId={activeId} />
        </main>
      </div>
    </div>
  );
}

function MonitorFrame({
  activeStep,
  compact = false
}: {
  activeStep: DashboardTourStep;
  compact?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[1040px]">
      <div className="relative rounded-[1.4rem] border border-white/[0.16] bg-gradient-to-b from-[#242832] to-[#0b0d12] p-2 shadow-[0_55px_150px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.13)] sm:rounded-[2rem] sm:p-3">
        <div className="overflow-hidden rounded-[1rem] border border-black bg-black sm:rounded-[1.45rem]">
          <div className="flex h-9 items-center justify-between border-b border-white/[0.07] bg-[#090b10] px-3 sm:h-11 sm:px-4">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
              <span className="h-2 w-2 rounded-full bg-white/[0.07]" />
            </div>
            <div className="rounded-full border border-white/[0.07] bg-white/[0.03] px-5 py-1 text-[0.46rem] tracking-[0.1em] text-white/28">portal.gridspellstudio.com</div>
            <LayoutDashboard className="h-3.5 w-3.5 text-white/20" />
          </div>
          <div className={cn("relative bg-[#07090e]", compact ? "h-[540px]" : "aspect-[16/10]")}> 
            <PortalShell activeId={activeStep.id} compact={compact} />
          </div>
        </div>
      </div>

      {!compact ? (
        <div aria-hidden="true" className="mx-auto hidden sm:block">
          <div className="mx-auto h-14 w-24 bg-gradient-to-b from-[#242832] to-[#0b0d12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
          <div className="mx-auto h-3 w-56 rounded-[50%] border border-white/[0.1] bg-[#171a21] shadow-[0_18px_45px_rgba(0,0,0,0.5)]" />
        </div>
      ) : null}
    </div>
  );
}

function TourCopy({ step }: { step: DashboardTourStep }) {
  const Icon = iconMap[step.id];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/22 bg-[#8be9ff]/7 text-[#8be9ff]"><Icon className="h-5 w-5" /></span>
          <div>
            <p className="font-mono text-[0.58rem] tracking-[0.22em] text-white/24">{step.number} / 08</p>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">{step.eyebrow}</p>
          </div>
        </div>

        <h3 className="mt-7 text-balance font-display text-[clamp(2.8rem,4.6vw,5.2rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">{step.title}</h3>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/46">{step.description}</p>

        <div className="mt-7 border-l border-[#8be9ff]/30 pl-5">
          <p className="text-[0.57rem] font-semibold uppercase tracking-[0.24em] text-white/25">Why it matters</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/64">{step.benefit}</p>
        </div>

        <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-white/24">What the client can do</p>
          <div className="mt-3 grid gap-2.5">
            {step.actions.map((action) => (
              <div key={action} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/7 text-[#8be9ff]"><Check className="h-2.5 w-2.5" /></span>
                <p className="text-xs leading-5 text-white/46">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function DesktopDashboardTour() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(
      dashboardTourSteps.length - 1,
      Math.max(0, Math.round(value * (dashboardTourSteps.length - 1)))
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeStep = dashboardTourSteps[activeIndex];

  function scrollToStep(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const top = window.scrollY + track.getBoundingClientRect().top;
    const distance = Math.max(0, track.offsetHeight - window.innerHeight);
    const ratio = index / (dashboardTourSteps.length - 1);
    window.scrollTo({ top: top + distance * ratio, behavior: "smooth" });
  }

  return (
    <section
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `${dashboardTourSteps.length * 92 + 80}vh` }}
    >
      <div className="sticky top-0 h-dvh bg-[#07080c]">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
        <div aria-hidden="true" className="pointer-events-none absolute left-[18%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/8 blur-[150px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[38%] h-[28rem] w-[28rem] rounded-full bg-[#29d6ff]/6 blur-[140px]" />

        <Container className="relative h-full py-16">
          <div className="grid h-full grid-cols-[1.52fr_0.48fr] items-center gap-10 xl:gap-16">
            <div className="min-w-0">
              <MonitorFrame activeStep={activeStep} />
            </div>

            <div className="flex h-full min-h-0 flex-col justify-center">
              <TourCopy step={activeStep} />
              <div className="mt-8 grid grid-cols-4 gap-2">
                {dashboardTourSteps.map((step, index) => {
                  const StepIcon = iconMap[step.id];
                  const active = activeIndex === index;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => scrollToStep(index)}
                      aria-label={`Show ${step.label}`}
                      aria-current={active ? "step" : undefined}
                      className={cn(
                        "flex min-h-10 items-center justify-center gap-2 rounded-xl border px-2 text-[0.5rem] font-semibold transition",
                        active
                          ? "border-[#8be9ff]/30 bg-[#8be9ff]/8 text-white"
                          : "border-white/[0.07] bg-white/[0.02] text-white/26 hover:text-white/54"
                      )}
                    >
                      <StepIcon className="h-3 w-3" />
                      {step.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 text-[0.56rem] uppercase tracking-[0.24em] text-white/22">
            <ArrowDown className="h-3.5 w-3.5" /> Scroll through the full client portal
          </div>
        </Container>
      </div>
    </section>
  );
}

function MobileDashboardTour({
  allScreens = false
}: {
  allScreens?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = dashboardTourSteps[activeIndex];

  return (
    <section className={cn("py-14", !allScreens && "lg:hidden")}>
      <Container>
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max gap-2">
            {dashboardTourSteps.map((step, index) => {
              const Icon = iconMap[step.id];
              const active = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition",
                    active
                      ? "border-[#8be9ff]/35 bg-[#8be9ff]/8 text-white"
                      : "border-white/[0.08] bg-white/[0.025] text-white/38"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto pb-2">
          <div className="min-w-[900px]">
            <MonitorFrame activeStep={activeStep} compact />
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
          <TourCopy step={activeStep} />
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-6">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
              disabled={activeIndex === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-xs font-semibold text-white/46 transition enabled:hover:border-white/18 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </button>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/24">{String(activeIndex + 1).padStart(2, "0")} / 08</span>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.min(dashboardTourSteps.length - 1, current + 1))}
              disabled={activeIndex === dashboardTourSteps.length - 1}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-xs font-semibold !text-[#071014] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ClientDashboardTour() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="client-workspace" className="relative overflow-x-clip bg-[#07080c] pt-24 lg:pt-32">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[76rem] -translate-x-1/2 rounded-full bg-[#7c5cff]/9 blur-[180px]" />

      <Container className="relative">
        <div className="grid gap-10 border-b border-white/[0.08] pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/22 bg-[#8be9ff]/7"><LayoutDashboard className="h-5 w-5 text-[#8be9ff]" /></span>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">Client portal walkthrough</p>
            </div>
            <h2 className="mt-8 text-balance font-display text-[clamp(4rem,9vw,8.4rem)] font-semibold leading-[0.8] tracking-[-0.085em] text-white">The real client workspace.</h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
              This is a populated example of the same portal structure clients use: projects, tasks, approvals, files, messages, billing, and tracked support.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Real project information", BriefcaseBusiness],
                ["Real client actions", UserRoundCheck],
                ["Real operational records", ReceiptText]
              ].map(([label, Icon]) => {
                const FeatureIcon = Icon as IconComponent;
                return (
                  <div key={String(label)} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                    <FeatureIcon className="h-4 w-4 shrink-0 text-[#8be9ff]" />
                    <span className="text-xs font-semibold text-white/42">{String(label)}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-6 text-white/26">The project name and figures are example data used to demonstrate the completed workspace. Client data remains private.</p>
          </div>
        </div>
      </Container>

      {reduceMotion ? <MobileDashboardTour allScreens /> : <><DesktopDashboardTour /><MobileDashboardTour /></>}

      <Container className="relative pb-24 pt-14 lg:pb-32 lg:pt-20">
        <div className="overflow-hidden rounded-[2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_85%_15%,rgba(41,214,255,0.1),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,0.11),rgba(255,255,255,0.02))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">Designed to be understood from day one</p>
              <h3 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">The portal gives clients the information needed to make decisions—not decorative dashboard noise.</h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/44 sm:text-base">Every section has a defined purpose, a real workflow, and a visible record of what happened.</p>
            </div>
            <a href="#process-steps" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-semibold !text-[#071014] shadow-[0_14px_40px_rgba(41,214,255,0.16)] transition hover:-translate-y-0.5 hover:brightness-110">See the full process <ChevronRight className="h-4 w-4" /></a>
          </div>
        </div>
      </Container>
    </section>
  );
}
