"use client";

import {
  ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, CreditCard,
  FolderOpen, LayoutDashboard, LifeBuoy, ListTodo, MessageSquareText,
  ShieldCheck, type LucideIcon
} from "lucide-react";
import { useState } from "react";

import { dashboardTourSteps, type DashboardTourStepId } from "@/config/dashboard-tour";
import { cn } from "@/lib/utils";

type Screen = {
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  items: readonly [string, string, "cyan" | "green" | "amber"][];
};

const screens: Record<DashboardTourStepId, Screen> = {
  overview: { icon: LayoutDashboard, stat: "64%", statLabel: "Project complete", items: [["Design direction", "Current phase · on track", "green"], ["Homepage review", "Next milestone · Jul 08", "cyan"], ["2 client actions", "Nothing overdue", "amber"]] },
  projects: { icon: BriefcaseBusiness, stat: "Aug 23", statLabel: "Target launch", items: [["Northstar website rebuild", "Active · $12,800 investment", "green"], ["Approved deliverables", "Strategy, design, build, launch", "cyan"], ["Project owner", "GridSpell Studio", "amber"]] },
  tasks: { icon: ListTodo, stat: "2", statLabel: "Client actions", items: [["Review homepage direction", "Needs review · due Jul 05", "amber"], ["Confirm booking workflow", "Open · due Jul 09", "cyan"], ["Responsive navigation", "GridSpell · scheduled", "green"]] },
  approvals: { icon: ShieldCheck, stat: "1", statLabel: "Awaiting review", items: [["Homepage direction v3", "Ready for client review", "amber"], ["Service page system", "Approved · Jul 02", "green"], ["Mobile navigation", "Revision history available", "cyan"]] },
  files: { icon: FolderOpen, stat: "24", statLabel: "Project files", items: [["Homepage-direction-v3.pdf", "Design · current version", "cyan"], ["Northstar-brand-assets.zip", "Brand · final", "green"], ["Approved-service-copy.docx", "Content · v2", "amber"]] },
  messages: { icon: MessageSquareText, stat: "3", statLabel: "Unread updates", items: [["Homepage direction is ready", "GridSpell · 18 min ago", "cyan"], ["Booking flow confirmed", "You · yesterday", "green"], ["Mobile review notes", "GridSpell · Monday", "amber"]] },
  billing: { icon: CreditCard, stat: "$6.4k", statLabel: "Paid to date", items: [["Deposit invoice", "Paid · receipt available", "green"], ["Design milestone", "$3,200 · due Jul 12", "amber"], ["Remaining balance", "$6,400", "cyan"]] },
  support: { icon: LifeBuoy, stat: "1", statLabel: "Open request", items: [["Analytics access", "In progress · normal priority", "cyan"], ["Form delivery check", "Resolved · Jul 01", "green"], ["Create a request", "Project, priority, and details", "amber"]] }
};

const navIcons: Record<DashboardTourStepId, LucideIcon> = {
  overview: LayoutDashboard, projects: BriefcaseBusiness, tasks: ListTodo,
  approvals: ShieldCheck, files: FolderOpen, messages: MessageSquareText,
  billing: CreditCard, support: LifeBuoy
};

export function ProcessPhoneMockup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = dashboardTourSteps[activeIndex];
  const screen = screens[step.id];
  const ScreenIcon = screen.icon;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">Interactive portal demo</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em] text-white">Your dashboard, explained on phone.</h2>
          </div>
          <span className="shrink-0 font-mono text-[0.62rem] tracking-[0.16em] text-white/38">{step.number} / 08</span>
        </div>

        <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#8be9ff]/16 bg-[#8be9ff]/[0.055] px-4 py-3">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">Choose a dashboard screen</p>
          <p className="text-[0.58rem] text-white/38">Tap any icon</p>
        </div>

        <div className="grid grid-cols-4 gap-2" role="tablist" aria-label="Portal sections">
          {dashboardTourSteps.map((item, index) => {
            const Icon = navIcons[item.id];
            const active = index === activeIndex;
            return (
              <button key={item.id} type="button" role="tab" aria-selected={active}
                aria-controls="phone-portal-panel" onClick={() => setActiveIndex(index)}
                className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-[0.54rem] font-semibold transition",
                  active ? "border-[#8be9ff]/40 bg-[#8be9ff]/12 !text-[#bff5ff]" : "border-white/[0.08] bg-white/[0.025] !text-white/48")}
              >
                <Icon className="h-4 w-4" />{item.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 rounded-[2.2rem] border border-[#8be9ff]/22 bg-[#080a10] p-2 shadow-[0_32px_90px_rgba(0,0,0,.48)]">
          <div className="absolute -right-2 top-24 z-20 flex items-center">
            <span className="h-px w-5 bg-[#8be9ff]/65" />
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[#8be9ff]/45 bg-[#08151a] text-[0.62rem] font-bold text-[#8be9ff]">{activeIndex + 1}</span>
          </div>
          <div id="phone-portal-panel" role="tabpanel" className="min-h-[35rem] overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,.18),transparent_42%),#090c12] p-5">
            <header className="flex items-start justify-between gap-3 border-b border-white/[0.07] pb-4">
              <div>
                <p className="text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Dashboard preview · phone layout</p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-white">{step.label}</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/8 text-[#8be9ff]"><ScreenIcon className="h-4 w-4" /></span>
            </header>

            <div className="mt-5 rounded-2xl border border-[#8be9ff]/22 bg-white/[0.035] p-5 shadow-[0_0_0_3px_rgba(139,233,255,.035)]">
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/34">{screen.statLabel}</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">{screen.stat}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" /></div>
            </div>

            <div className="mt-4 grid gap-3">
              {screen.items.map(([title, detail, tone]) => (
                <article key={title} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#0d1016] p-4">
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl border",
                    tone === "green" && "border-[#69e6ad]/20 bg-[#69e6ad]/8 text-[#7aefb9]",
                    tone === "amber" && "border-[#ffc86a]/20 bg-[#ffc86a]/8 text-[#ffd17f]",
                    tone === "cyan" && "border-[#8be9ff]/20 bg-[#8be9ff]/8 text-[#8be9ff]")}
                  ><CheckCircle2 className="h-4 w-4" /></span>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-white/82">{title}</p><p className="mt-1 truncate text-[0.68rem] text-white/38">{detail}</p></div>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20" />
                </article>
              ))}
            </div>
          </div>
        </div>

        <div aria-live="polite" className="mt-5 rounded-[1.6rem] border border-[#8be9ff]/18 bg-[linear-gradient(145deg,rgba(124,92,255,.08),rgba(139,233,255,.035))] p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Instruction {activeIndex + 1} of 8</p>
            <span className="rounded-full border border-white/[0.09] px-2.5 py-1 text-[0.52rem] font-semibold text-white/42">{step.label}</span>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/42">{step.eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/52">{step.description}</p>
          <div className="mt-5 border-t border-white/[0.08] pt-4">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/34">What you can do here</p>
            <ol className="mt-3 grid gap-2.5">
              {step.actions.map((action, index) => (
                <li key={action} className="flex gap-3 text-xs leading-5 text-white/58">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/8 font-mono text-[0.48rem] text-[#8be9ff]">{index + 1}</span>
                  {action}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((v) => Math.max(0, v - 1))} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 text-xs font-semibold !text-white/72 disabled:opacity-25"><ArrowLeft className="h-4 w-4" /> Previous</button>
          <span className="h-1.5 w-1.5 rounded-full bg-[#8be9ff]" />
          <button type="button" disabled={activeIndex === dashboardTourSteps.length - 1} onClick={() => setActiveIndex((v) => Math.min(dashboardTourSteps.length - 1, v + 1))} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-xs font-semibold !text-[#061014] disabled:opacity-30">Next <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}
