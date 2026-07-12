import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Command,
  Database,
  GitBranch,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  type LucideIcon
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("saas-modern");

export const metadata: Metadata = createPageMetadata({
  title: "FlowPilot AI SaaS Landing Page Demo",
  description:
    "A luxury dashboard-inspired SaaS landing page demo with terminal navigation, premium product UI, automation workflows, pricing, integrations, and conversion CTAs.",
  path: "/demo/saas-modern"
});

type Feature = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

type PricingPlan = {
  name: string;
  price: string;
  audience: string;
  features: string[];
  featured: boolean;
};

const metrics = [
  ["18h", "saved weekly"],
  ["1,284", "tasks automated"],
  ["42%", "faster follow-up"]
] as const;

const integrations = ["Slack", "Gmail", "HubSpot", "Stripe", "Notion", "Calendar", "GitHub", "Airtable"] as const;

const productSignals = [
  ["Leads", "+42%"],
  ["Tickets", "-31%"],
  ["Revenue", "+18%"],
  ["Approvals", "7 open"]
] as const;

const features: Feature[] = [
  {
    icon: Bot,
    title: "AI executive brief",
    copy: "Daily summaries for leads, tickets, internal blockers, revenue changes, and customer risk without opening six tools."
  },
  {
    icon: GitBranch,
    title: "Workflow routing",
    copy: "Turn inbound signals into assigned tasks, drafted replies, CRM updates, and team approvals with a clean automation layer."
  },
  {
    icon: Database,
    title: "Source-of-truth sync",
    copy: "Keep contacts, notes, deal stages, support details, and reporting data aligned across the tools your team already uses."
  },
  {
    icon: ShieldCheck,
    title: "Human approval mode",
    copy: "Let AI prepare actions while sensitive customer replies, price changes, and account updates stay under team control."
  }
];

const workflow = [
  ["01", "Capture", "Pull signal from inboxes, forms, CRM, billing, support, and team channels."],
  ["02", "Classify", "Detect intent, urgency, owner, revenue impact, and whether human approval is needed."],
  ["03", "Prepare", "Draft replies, create tasks, update records, and build a clean action queue."],
  ["04", "Ship", "Approve, send, assign, sync, and report from one controlled dashboard."]
] as const;

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    audience: "Solo founders",
    features: ["1 workspace", "AI daily brief", "Basic automations", "Email support"],
    featured: false
  },
  {
    name: "Growth",
    price: "$79",
    audience: "Small teams",
    features: ["5 workspaces", "Workflow builder", "CRM sync", "Approval queue"],
    featured: true
  },
  {
    name: "Scale",
    price: "$149",
    audience: "Operators",
    features: ["Unlimited workflows", "Team analytics", "Advanced permissions", "Priority support"],
    featured: false
  }
];

const testimonials = [
  ["FlowPilot replaced three weekly update meetings and gave our team one source of truth.", "Maya Chen", "Ops Lead, B2B SaaS"],
  ["Our follow-up speed doubled because every lead arrives already summarized and routed.", "Jordan Park", "Founder, Growth Studio"],
  ["It feels like a command center for the messy parts of running a software business.", "Sam Rivera", "Product Director"]
] as const;

const faqs = [
  ["Is this a real SaaS product?", "This is a GridSpell demo concept. The layout can be customized for a real SaaS, AI tool, dashboard, automation product, or startup landing page."],
  ["Can the dashboard use real product screens?", "Yes. For a real client, the product UI can use real screenshots, custom illustrations, or interactive product-tour states."],
  ["Can pricing and trial signup be wired up?", "Yes. The final build can connect to Stripe, auth, waitlists, calendars, onboarding, email automation, analytics, and a database."],
  ["Can this style be made darker or more colorful?", "Yes. This version uses luxury white, gray, black, cyan, and violet. The same structure can shift into a darker dev-tool or brighter startup look." ]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "saas-modern",
    design: concept?.title ?? "SaaS Modern"
  });

  return `/start-project?${params.toString()}`;
}

function TerminalNavbar() {
  return (
    <nav className="relative z-10 rounded-[1.5rem] border border-black/10 bg-[#07080d] p-2 font-mono text-xs shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
      <div className="flex flex-col gap-3 rounded-[1.05rem] border border-white/10 bg-white/[0.055] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-white/50">
          <Link href="/landing-pages" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-white/45 transition hover:text-cyan-200">
            <ArrowLeft className="h-3.5 w-3.5" />
            cd ../gallery
          </Link>
          <span className="hidden text-white/20 sm:inline">/</span>
          <span className="inline-flex items-center gap-2 text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.9)]" />
            flowpilot.ai
          </span>
          <span className="text-white/22">/</span>
          <a href="#product" className="transition hover:text-white">product</a>
          <span className="text-white/22">/</span>
          <a href="#workflow" className="transition hover:text-white">workflow</a>
          <span className="text-white/22">/</span>
          <a href="#pricing" className="transition hover:text-white">pricing</a>
          <span className="text-white/22">/</span>
          <a href="#start" className="transition hover:text-white">start</a>
          <span className="ml-1 h-4 w-2 animate-pulse rounded-sm bg-cyan-200/70" />
        </div>

        <Link
          href={startHref()}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 text-xs font-black text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/15"
        >
          ./start-free
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </nav>
  );
}

function MiniBrowserDots() {
  return (
    <div className="flex gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#67e8f9]" />
    </div>
  );
}

function HeroDashboard() {
  return (
    <div id="product" className="relative">
      <div aria-hidden="true" className="absolute -left-16 top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-[90px]" />
      <div aria-hidden="true" className="absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-violet-400/20 blur-[100px]" />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-white p-3 shadow-[0_38px_120px_rgba(15,23,42,0.20)]">
        <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-[#f7f8fb]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
            <MiniBrowserDots />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 font-mono text-xs text-slate-500">
              app.flowpilot.ai/command
            </span>
          </div>

          <div className="grid min-h-[34rem] lg:grid-cols-[4.7rem_1fr]">
            <aside className="hidden border-r border-slate-200 bg-[#090b10] p-3 lg:block">
              <div className="grid gap-3">
                {[Command, Bot, GitBranch, Database, ShieldCheck].map((Icon, index) => (
                  <span key={index} className={index === 0 ? "grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#090b10]" : "grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/45"}>
                    <Icon className="h-5 w-5" />
                  </span>
                ))}
              </div>
            </aside>

            <div className="p-4 sm:p-5">
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <section className="overflow-hidden rounded-[1.7rem] bg-[#090b10] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70">ai.brief()</p>
                      <h3 className="mt-5 max-w-[9ch] font-display text-5xl font-semibold leading-[0.82] tracking-[-0.07em]">
                        12 signals. 4 actions.
                      </h3>
                    </div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                      <Bot className="h-6 w-6" />
                    </span>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {[
                      ["Lead", "High-value inbound demo request", "route to sales"],
                      ["Risk", "Renewal account has 2 unresolved tickets", "escalate"],
                      ["Support", "8 similar tickets can be drafted", "prepare replies"]
                    ].map(([label, title, status]) => (
                      <div key={title} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center">
                        <span className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-200/50">{label}</span>
                        <span className="text-sm font-semibold text-white/78">{title}</span>
                        <span className="w-fit rounded-full bg-cyan-200/10 px-3 py-1 text-xs font-bold text-cyan-100">{status}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid gap-4">
                  <div className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">team.pulse</p>
                        <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.07em] text-slate-950">96%</p>
                      </div>
                      <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-lime-700">live</span>
                    </div>
                    <div className="mt-5 flex h-28 items-end gap-2">
                      {[42, 64, 48, 78, 56, 88, 72, 95, 82, 98].map((height, index) => (
                        <span
                          key={`${height}-${index}`}
                          className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#111827,#94a3b8)]"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {productSignals.map(([label, value]) => (
                      <div key={label} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.055)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                        <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
                <section className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.055)]">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">agent.status</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["Sales agent", "active"],
                      ["Support agent", "review"],
                      ["Ops agent", "active"]
                    ].map(([agent, status]) => (
                      <div key={agent} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-sm font-semibold text-slate-700">{agent}</span>
                        <span className={status === "review" ? "rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700" : "rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-700"}>
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.055)]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">workflow.queue</p>
                    <span className="text-xs font-bold text-slate-400">24 running</span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {["Qualify new trial", "Draft renewal email", "Update CRM notes"].map((item, index) => (
                      <div key={item} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                        <span className="h-2 w-20 rounded-full bg-slate-200">
                          <span className="block h-2 rounded-full bg-slate-950" style={{ width: `${[82, 54, 68][index]}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-4 top-24 hidden rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 shadow-[0_20px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl lg:block">
        CRM synced
      </div>
      <div className="absolute -right-4 bottom-28 hidden rounded-2xl border border-black/10 bg-[#090b10] px-4 py-3 text-sm font-bold text-cyan-100 shadow-[0_20px_70px_rgba(15,23,42,0.20)] lg:block">
        Follow-up sent
      </div>
    </div>
  );
}

function FeatureSystem() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.28em] text-slate-500">features.map()</p>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,6vw,6.7rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-slate-950">
              Product story, inside the UI.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            Instead of stacking generic cards, the page feels like a premium product operating system: panels, command surfaces, workflow rails, and real dashboard logic.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#090b10] p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.22)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/60">command.surface</p>
                <h3 className="mt-3 font-display text-4xl font-semibold tracking-[-0.065em]">AI operations layer</h3>
              </div>
              <Sparkles className="h-7 w-7 text-cyan-200" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, copy }, index) => (
                <article key={title} className={index === 0 ? "rounded-[1.45rem] border border-cyan-200/18 bg-cyan-200/[0.08] p-5 sm:col-span-2" : "rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-5"}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-white/24">0{index + 1}</span>
                  </div>
                  <h4 className="mt-5 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/46">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">integrations.dock</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {integrations.map((item) => (
                  <span key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">deployment.status</p>
              <div className="mt-6 grid gap-3">
                {["Auth connected", "Billing ready", "Analytics synced"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                    <CheckCircle2 className="h-4 w-4 text-slate-950" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="relative overflow-hidden border-y border-slate-200 bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_24rem),radial-gradient(circle_at_82%_70%,rgba(139,92,246,0.12),transparent_26rem)]" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs font-black uppercase tracking-[0.28em] text-slate-500">workflow.run()</p>
          <h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6.8rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-slate-950">
            From messy signal to clean action.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            The workflow becomes the design. Visitors can understand the product without reading a wall of copy.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[#f7f8fb] p-4 shadow-[0_30px_100px_rgba(15,23,42,0.09)]">
          <div className="grid gap-4 lg:grid-cols-4">
            {workflow.map(([number, title, copy], index) => (
              <article key={title} className={index === 2 ? "relative rounded-[1.6rem] bg-[#090b10] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]" : "relative rounded-[1.6rem] border border-slate-200 bg-white p-6"}>
                <div className="flex items-center justify-between gap-4">
                  <span className={index === 2 ? "font-mono text-sm font-black text-cyan-200" : "font-mono text-sm font-black text-slate-400"}>{number}</span>
                  {index < workflow.length - 1 ? <ChevronRight className={index === 2 ? "h-4 w-4 text-white/28" : "h-4 w-4 text-slate-300"} /> : null}
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h3>
                <p className={index === 2 ? "mt-4 text-sm leading-7 text-white/48" : "mt-4 text-sm leading-7 text-slate-500"}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.28em] text-slate-500">pricing.json</p>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,6vw,6.5rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-slate-950">
              SaaS pricing without the cheap template look.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            Pricing is presented as a premium command panel, with the middle plan highlighted like a product decision instead of a basic card grid.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2.2rem] bg-[#090b10] p-4 shadow-[0_34px_110px_rgba(15,23,42,0.22)]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 pb-4 pt-2 sm:px-5">
            <div className="flex items-center gap-3">
              <MiniBrowserDots />
              <span className="font-mono text-xs text-white/34">plans.configure()</span>
            </div>
            <span className="hidden rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-1 font-mono text-xs text-cyan-100 sm:inline-flex">billing-ready</span>
          </div>

          <div className="grid gap-4 p-3 sm:p-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className={plan.featured ? "relative rounded-[1.7rem] border border-cyan-200/24 bg-white p-6 text-slate-950 shadow-[0_26px_90px_rgba(34,211,238,0.16)]" : "rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6 text-white"}>
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#090b10] px-3 py-1 text-xs font-black text-cyan-100">
                    Most popular
                  </span>
                ) : null}
                <p className="font-display text-3xl font-semibold tracking-[-0.055em]">{plan.name}</p>
                <p className={plan.featured ? "mt-2 text-sm text-slate-500" : "mt-2 text-sm text-white/38"}>{plan.audience}</p>
                <p className="mt-7 font-display text-6xl font-semibold tracking-[-0.075em]">
                  {plan.price}<span className={plan.featured ? "text-lg text-slate-400" : "text-lg text-white/30"}>/mo</span>
                </p>
                <ul className="mt-8 grid gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={plan.featured ? "flex gap-3 text-sm leading-7 text-slate-600" : "flex gap-3 text-sm leading-7 text-white/52"}>
                      <CheckCircle2 className={plan.featured ? "mt-1 h-4 w-4 shrink-0 text-slate-950" : "mt-1 h-4 w-4 shrink-0 text-cyan-200"} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={startHref()} className={plan.featured ? "mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#090b10] px-5 text-sm font-black text-white transition hover:-translate-y-0.5" : "mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-5 text-sm font-black text-white/72 transition hover:bg-white/[0.1] hover:text-white"}>
                  Start free
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofAndFaq() {
  return (
    <section className="border-y border-slate-200 bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.28em] text-slate-500">customers.log</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.065em] text-slate-950 sm:text-6xl">
              Proof for founders and technical buyers.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map(([quote, name, role]) => (
              <article key={name} className="rounded-[1.6rem] border border-slate-200 bg-[#f7f8fb] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)]">
                <div className="flex gap-1 text-slate-950">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">“{quote}”</p>
                <p className="mt-5 font-semibold text-slate-950">{name}</p>
                <p className="mt-1 text-xs text-slate-400">{role}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="rounded-[1.6rem] border border-slate-200 bg-[#f7f8fb] p-6">
              <p className="font-display text-2xl font-semibold tracking-[-0.045em] text-slate-950">{question}</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">{answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function SaasModernDemoPage() {
  return (
    <main className="overflow-hidden bg-[#f2f3f0] text-slate-950">
      <section className="relative min-h-svh overflow-hidden border-b border-black/10 pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(34,211,238,0.18),transparent_28rem),radial-gradient(circle_at_16%_64%,rgba(139,92,246,0.12),transparent_30rem),linear-gradient(135deg,#f7f7f3,#e9ebe7_55%,#ffffff)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.42] bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div aria-hidden="true" className="absolute left-1/2 top-32 h-px w-[82vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.26),transparent)]" />

        <Container className="relative">
          <TerminalNavbar />

          <div className="grid min-h-[calc(100svh-8rem)] items-center gap-14 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] text-slate-500 shadow-[0_14px_50px_rgba(15,23,42,0.07)] backdrop-blur">
                <Terminal className="h-4 w-4 text-slate-950" />
                npm create flowpilot
              </p>

              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,9.3rem)] font-semibold leading-[0.76] tracking-[-0.09em] text-slate-950">
                The SaaS site as a dashboard.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                FlowPilot AI is a luxury dashboard-style landing page for SaaS, AI tools, and B2B products that need to feel serious, polished, and conversion-ready.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#090b10] px-6 text-sm font-black text-white shadow-[0_18px_70px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#workflow" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 text-sm font-black text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950">
                  <Play className="h-4 w-4" />
                  Watch workflow
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {metrics.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur">
                    <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-slate-950">{value}</p>
                    <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <HeroDashboard />
          </div>
        </Container>
      </section>

      <FeatureSystem />
      <WorkflowSection />
      <PricingSection />
      <ProofAndFaq />

      <section id="start" className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_28rem)]" />
        <Container className="relative">
          <div className="overflow-hidden rounded-[2.2rem] bg-[#090b10] p-8 text-white shadow-[0_34px_120px_rgba(15,23,42,0.24)] sm:p-12">
            <div className="grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.28em] text-cyan-200/70">deploy.ready</p>
                <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,6vw,6.8rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
                  Build a SaaS page that feels expensive.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
                  Use this demo as the starting point for an AI product, dashboard app, automation platform, CRM tool, or B2B SaaS launch.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#090b10] transition hover:-translate-y-0.5">
                    Start with this design
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/landing-pages" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-black text-white/70 transition hover:bg-white/[0.1] hover:text-white">
                    Back to gallery
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <footer className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Product", "Dashboard", "Automations", "Integrations"],
                ["Use cases", "Sales", "Support", "Operations"],
                ["Company", "About", "Customers", "Contact"],
                ["System", "Online", "24 workflows", "99.9% sync"]
              ].map(([title, ...items]) => (
                <div key={title}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">{title}</p>
                  <div className="mt-4 grid gap-2">
                    {items.map((item) => (
                      <span key={item} className="text-sm font-semibold text-white/55">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </footer>
          </div>
        </Container>
      </section>
    </main>
  );
}
