import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Zap
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("saas-modern");

export const metadata: Metadata = createPageMetadata({
  title: "FlowPilot AI SaaS Landing Page Demo",
  description:
    "A developer-inspired SaaS landing page demo with terminal navigation, AI dashboard visuals, workflow automation, pricing, integrations, and conversion CTAs.",
  path: "/demo/saas-modern"
});

const proofStats = [
  ["18h", "saved per team weekly"],
  ["1,284", "tasks automated today"],
  ["42%", "faster lead follow-up"]
] as const;

const integrations = ["Slack", "Gmail", "HubSpot", "Stripe", "Notion", "Calendar", "GitHub", "Airtable"] as const;

const featureCards = [
  {
    icon: Bot,
    title: "AI daily brief",
    copy: "Every lead, support issue, task, and team signal summarized into one clean morning command center."
  },
  {
    icon: GitBranch,
    title: "Workflow builder",
    copy: "Create no-code automations for lead routing, follow-ups, CRM updates, approvals, and internal tasks."
  },
  {
    icon: MessageSquare,
    title: "Smart inbox",
    copy: "Group customer messages by urgency, intent, value, and required action before the team opens the thread."
  },
  {
    icon: Database,
    title: "CRM sync",
    copy: "Keep contacts, deal stages, notes, and next steps updated without manually copying information between tools."
  },
  {
    icon: Layers,
    title: "Team dashboard",
    copy: "See what needs attention across sales, support, operations, and leadership from one focused workspace."
  },
  {
    icon: ShieldCheck,
    title: "Human approval queue",
    copy: "Let AI draft actions while the team approves sensitive replies, deal changes, and customer-facing updates."
  }
] as const;

const workflowSteps = [
  ["01", "Capture", "A lead, ticket, order, or internal request enters the workspace."],
  ["02", "Understand", "FlowPilot reads the context, finds intent, and groups related information."],
  ["03", "Automate", "Tasks, CRM updates, replies, and follow-ups are prepared instantly."],
  ["04", "Report", "The team gets a clean summary of what happened and what needs approval."]
] as const;

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    audience: "Solo founders",
    features: ["1 workspace", "AI daily brief", "Basic automations", "Email support"]
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
    features: ["Unlimited workflows", "Team analytics", "Advanced permissions", "Priority support"]
  }
] as const;

const testimonials = [
  ["FlowPilot replaced three weekly update meetings and gave our team one source of truth.", "Maya Chen", "Ops Lead, B2B SaaS"],
  ["Our follow-up speed doubled because every lead arrives already summarized and routed.", "Jordan Park", "Founder, Growth Studio"],
  ["It feels like a command center for the messy parts of running a software business.", "Sam Rivera", "Product Director"]
] as const;

const faqs = [
  ["Is this a real SaaS product?", "This is a demo concept for GridSpell. The layout can be customized for a real SaaS, AI tool, dashboard, or startup landing page."],
  ["Can this connect to a real app?", "Yes. The final build can connect to auth, billing, databases, CRM tools, analytics, onboarding, and product dashboards."],
  ["Can the dashboard visuals be real screenshots?", "Yes. For a real client, the mockups can use real product screenshots, custom UI illustrations, or interactive product previews."],
  ["Can pricing, trials, and waitlists be wired up?", "Yes. The CTA flow can connect to Stripe, forms, calendars, waitlists, email automation, or a custom dashboard."]
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
    <nav className="rounded-[1.4rem] border border-cyan-300/15 bg-[#020617]/78 p-2 font-mono text-xs shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 rounded-[1rem] border border-white/[0.06] bg-white/[0.035] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-white/52">
          <Link href="/landing-pages" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-white/45 transition hover:text-cyan-200">
            <ArrowLeft className="h-3.5 w-3.5" />
            cd ../gallery
          </Link>
          <span className="hidden text-white/18 sm:inline">/</span>
          <span className="inline-flex items-center gap-2 text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_24px_rgba(34,211,238,0.8)]" />
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

function DashboardMockup() {
  return (
    <div id="product" className="relative">
      <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-cyan-300/10 blur-[120px]" />
      <div className="relative rounded-[2rem] border border-white/[0.12] bg-white/[0.045] p-3 shadow-[0_35px_140px_rgba(0,0,0,0.5)] backdrop-blur">
        <div className="overflow-hidden rounded-[1.55rem] border border-white/[0.1] bg-[#030712]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/70" />
            </div>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.045] px-4 py-1 font-mono text-xs text-white/45">
              app.flowpilot.ai/ops
            </span>
          </div>

          <div className="grid gap-4 p-5">
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.45rem] border border-cyan-300/16 bg-cyan-300/[0.055] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/68">ai.brief()</p>
                    <p className="mt-4 font-display text-4xl font-semibold leading-[0.88] tracking-[-0.06em]">
                      12 requests grouped into 4 actions.
                    </p>
                  </div>
                  <Bot className="h-8 w-8 text-cyan-200" />
                </div>
                <div className="mt-6 grid gap-3">
                  {["3 leads need follow-up", "1 renewal risk detected", "8 support tickets can be auto-drafted"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                      <span className="text-sm text-white/62">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  ["Automation queue", "24 running"],
                  ["CRM sync", "98% clean"],
                  ["Approval inbox", "7 drafts"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.04] p-4">
                    <p className="text-xs text-white/35">{label}</p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="font-mono text-xs text-white/35">agent.status</p>
                <div className="mt-4 grid gap-3">
                  {["Sales agent", "Support agent", "Ops agent"].map((agent, index) => (
                    <div key={agent} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
                      <span className="text-sm text-white/62">{agent}</span>
                      <span className={index === 1 ? "text-xs font-bold text-violet-200" : "text-xs font-bold text-cyan-200"}>
                        {index === 1 ? "review" : "active"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-xs text-white/35">team.pulse</p>
                  <span className="rounded-full bg-lime-300/10 px-3 py-1 text-xs font-bold text-lime-200">live</span>
                </div>
                <div className="mt-5 flex h-32 items-end gap-2">
                  {[42, 58, 45, 68, 72, 54, 86, 91, 76, 96].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#22d3ee,#8b5cf6)] opacity-90"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-3 top-16 hidden rounded-2xl border border-violet-300/18 bg-violet-300/10 px-4 py-3 text-sm font-semibold text-violet-100 backdrop-blur lg:block">
        CRM updated
      </div>
      <div className="absolute -right-2 bottom-24 hidden rounded-2xl border border-cyan-300/18 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 backdrop-blur lg:block">
        Follow-up sent
      </div>
    </div>
  );
}

export default function SaasModernDemoPage() {
  return (
    <main className="overflow-hidden bg-[#020617] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/[0.06] pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_45%_-12%,rgba(139,92,246,0.36),transparent_34rem),radial-gradient(circle_at_85%_42%,rgba(34,211,238,0.16),transparent_30rem),linear-gradient(135deg,#020617,#050816_52%,#020617)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/4 h-px w-[80vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.6),transparent)]" />

        <Container className="relative">
          <TerminalNavbar />

          <div className="grid min-h-[calc(100svh-8rem)] items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                <Terminal className="h-4 w-4" />
                npm create flowpilot
              </p>

              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,9.1rem)] font-semibold leading-[0.76] tracking-[-0.085em]">
                Your AI command center for busy teams.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52 sm:text-xl sm:leading-9">
                FlowPilot AI turns scattered messages, leads, tasks, and app data into one developer-clean workspace with summaries, automations, approvals, and team visibility.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#22d3ee)] px-6 text-sm font-black text-white shadow-[0_18px_70px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#workflow" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-black text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  <Play className="h-4 w-4" />
                  Watch workflow
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {proofStats.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur">
                    <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-white">{value}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/42">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <DashboardMockup />
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.06] bg-[#030712] py-8">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/32">
              integrations.sync()
            </p>
            <div className="flex flex-wrap gap-2">
              {integrations.map((item) => (
                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/52">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="features" className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">features.map()</p>
              <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
                Built like a product, not a pitch deck.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/46 sm:text-lg">
              The page uses a SaaS-style bento grid to explain product value quickly: what the AI does, how the workflow runs, where data goes, and why teams can trust it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} className={index === 0 ? "rounded-[1.8rem] border border-cyan-300/16 bg-cyan-300/[0.055] p-6 md:col-span-2 xl:col-span-1 xl:row-span-2" : "rounded-[1.8rem] border border-white/[0.09] bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.05]"}>
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.045] text-cyan-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-white/24">0{index + 1}</span>
                </div>
                <h3 className="mt-7 font-display text-3xl font-semibold leading-none tracking-[-0.055em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/45">{copy}</p>
                {index === 0 ? (
                  <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/20 p-4 font-mono text-xs leading-6 text-cyan-100/70">
                    <p>&gt; summarize.workspace()</p>
                    <p className="text-white/35">// 4 priorities detected</p>
                    <p className="text-white/35">// 7 follow-ups drafted</p>
                    <p className="text-white/35">// 1 renewal risk escalated</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="workflow" className="border-y border-white/[0.06] bg-[#030712] py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-violet-200">workflow.run()</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-6xl">
                From messy signal to clean action.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/46">
                A good SaaS page should show the product logic. This section makes the automation flow easy to understand before a visitor ever clicks pricing.
              </p>
            </div>

            <div className="relative grid gap-4">
              <div aria-hidden="true" className="absolute left-7 top-8 hidden h-[calc(100%-4rem)] w-px bg-[linear-gradient(180deg,#22d3ee,#8b5cf6,transparent)] sm:block" />
              {workflowSteps.map(([number, title, copy]) => (
                <article key={title} className="relative grid gap-4 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-5 sm:grid-cols-[3.5rem_1fr]">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/16 bg-cyan-300/10 font-mono text-sm font-black text-cyan-200">
                    {number}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/45">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-5 sm:p-7">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">product.tour</p>
                <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">
                  A dashboard section that feels alive.
                </h2>
                <p className="mt-6 text-base leading-8 text-white/46">
                  For a real SaaS client, this area can become screenshots, interactive tabs, a product video, or a guided feature tour.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Dashboard", "Automations", "Inbox", "Reports"].map((tab, index) => (
                  <div key={tab} className="rounded-[1.35rem] border border-white/[0.08] bg-[#020617] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-display text-2xl font-semibold tracking-[-0.05em]">{tab}</p>
                      <Cpu className={index % 2 === 0 ? "h-5 w-5 text-cyan-200" : "h-5 w-5 text-violet-200"} />
                    </div>
                    <div className="mt-5 grid gap-2">
                      {[72, 48, 88].map((width) => (
                        <span key={width} className="h-2 rounded-full bg-white/10" style={{ width: `${width}%` }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="pricing" className="border-y border-white/[0.06] bg-[#030712] py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">pricing.json</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-6xl">
              Pricing cards built for SaaS conversion.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/46">
              This section shows the classic SaaS buying path: simple tiers, highlighted middle plan, and clear value per audience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className={plan.featured ? "relative rounded-[1.8rem] border border-cyan-300/25 bg-cyan-300/[0.07] p-6 shadow-[0_30px_110px_rgba(34,211,238,0.12)]" : "rounded-[1.8rem] border border-white/[0.09] bg-white/[0.03] p-6"}>
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-[#020617]">
                    Most popular
                  </span>
                ) : null}
                <p className="font-display text-3xl font-semibold tracking-[-0.055em]">{plan.name}</p>
                <p className="mt-2 text-sm text-white/42">{plan.audience}</p>
                <p className="mt-7 font-display text-6xl font-semibold tracking-[-0.075em]">
                  {plan.price}<span className="text-lg text-white/35">/mo</span>
                </p>
                <ul className="mt-8 grid gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-7 text-white/55">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={startHref()} className={plan.featured ? "mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#020617] transition hover:-translate-y-0.5" : "mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 text-sm font-black text-white/70 transition hover:bg-white/[0.08] hover:text-white"}>
                  Start free
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-violet-200">customers.log</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">
                Proof for technical buyers and founders.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map(([quote, name, role]) => (
                <article key={name} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-5">
                  <div className="flex gap-1 text-cyan-200">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/55">“{quote}”</p>
                  <p className="mt-5 font-semibold text-white">{name}</p>
                  <p className="mt-1 text-xs text-white/35">{role}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.06] bg-[#030712] py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">faq.md</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">
              Questions a SaaS visitor might ask.
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-5">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.045em]">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/45">{answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="start" className="relative py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[140px]" />
        <Container className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-8 text-center sm:p-12">
            <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#020617] px-4 py-3 font-mono text-xs text-cyan-100/70">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              deploy --template flowpilot-ai
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-5xl font-semibold leading-[0.86] tracking-[-0.07em] sm:text-7xl">
              Build your AI command center landing page.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/48">
              Use this demo as a starting point for AI tools, SaaS products, dashboards, developer tools, automation platforms, or B2B startup launches.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#020617] transition hover:-translate-y-0.5">
                Start with this design
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/landing-pages" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-black text-white/72 transition hover:bg-white/[0.07] hover:text-white">
                Back to gallery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <footer className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="font-mono text-sm font-bold text-cyan-200">flowpilot.ai</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/38">
                A developer-inspired SaaS landing page demo for GridSpell clients who need a modern product launch, dashboard page, or AI platform website.
              </p>
            </div>
            <div className="grid gap-3 rounded-[1.35rem] border border-white/[0.08] bg-white/[0.035] p-4 font-mono text-xs text-white/42 sm:grid-cols-3">
              <p>status: online</p>
              <p>agents: 24</p>
              <p>latency: 42ms</p>
            </div>
          </footer>
        </Container>
      </section>
    </main>
  );
}
