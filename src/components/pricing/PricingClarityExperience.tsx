import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FilePenLine,
  Gauge,
  LayoutDashboard,
  LayoutTemplate,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles
} from "lucide-react";

import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { packages, type PricingPackage } from "@/config/packages";

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

const packageClarity: Record<string, { when: string; avoid: string; range: string }> = {
  starter: {
    when: "You need one strong page, a campaign page, or a simple professional presence.",
    avoid: "You need separate service pages, a CMS, booking, CRM, or a larger SEO structure.",
    range: "Common planning range: CAD $950–$1,650"
  },
  launch: {
    when: "You need a custom 3–5 page website with clear services and a proper contact flow.",
    avoid: "You need a blog, many service pages, editable content, or connected workflows.",
    range: "Common planning range: CAD $1,800–$3,000"
  },
  growth: {
    when: "You need a deeper website with service pages, proof, reviews, tracking, and integrations.",
    avoid: "You are building logins, dashboards, multi-role permissions, or custom software.",
    range: "Common planning range: CAD $4,500–$7,500"
  },
  custom: {
    when: "You need a portal, dashboard, internal tool, automation, database, or full-stack system.",
    avoid: "You only need a public marketing website with a standard inquiry form.",
    range: "Common planning range: CAD $7,500+"
  }
};

const claritySteps = [
  {
    title: "Pick the closest package",
    text: "Use the package cards as a starting point, not a final quote.",
    icon: CircleDollarSign
  },
  {
    title: "Check what moves the price",
    text: "Pages, content readiness, integrations, custom logic, and motion change the effort.",
    icon: SearchCheck
  },
  {
    title: "Submit a project brief",
    text: "GridSpell reviews the real scope and replies with the clearest next step.",
    icon: FilePenLine
  }
] as const;

const pricingFactors = [
  ["Page structure", "One polished page costs less than a full service website with multiple custom layouts."],
  ["Content and copy", "Ready content keeps the project tighter. Copywriting, cleanup, and migration can be added."],
  ["Editable content", "CMS, blogs, projects, team pages, and reusable content models add setup and training."],
  ["Integrations", "Booking, CRM, reviews, analytics events, email workflows, and APIs require testing."],
  ["Custom functionality", "Accounts, dashboards, permissions, databases, payments, and portals move the project into software."],
  ["Motion and polish", "Subtle transitions are included. Cinematic scenes and advanced interactions add production time."]
] as const;

const additions = [
  [LayoutTemplate, "Additional page", "From CAD $200", "A new strategic page using the approved design system."],
  [FilePenLine, "Conversion copywriting", "From CAD $650", "Website copy shaped around clarity, trust, and action."],
  [BadgeCheck, "Google reviews integration", "From CAD $250", "A branded review section with reliable fallback content."],
  [WandSparkles, "Brand refinement", "From CAD $450", "Focused polish for typography, colour, and digital usage."],
  [Sparkles, "Advanced motion direction", "From CAD $500", "More cinematic interaction beyond the core transitions."],
  [LayoutDashboard, "CRM or dashboard workflow", "Quoted by scope", "Lead routing, admin views, or operational workflow setup."]
] as const;

const carePlans = [
  {
    name: "Essential Care",
    price: "CAD $99/month",
    text: "Maintenance, backups, uptime checks, and small content changes."
  },
  {
    name: "Growth Care",
    price: "CAD $199/month",
    text: "Priority updates, analytics checks, conversion tracking, and two development hours monthly."
  },
  {
    name: "Custom Care",
    price: "CAD $399+/month",
    text: "Ongoing feature development, integration support, and a monthly strategy conversation."
  }
] as const;

function highRange(startingPrice: number) {
  return startingPrice + Math.max(700, Math.round((startingPrice * 0.15) / 50) * 50);
}

function startProjectHref(item: PricingPackage) {
  const high = highRange(item.startingPrice);
  const params = new URLSearchParams({
    package: item.id,
    estimateLow: String(item.startingPrice),
    estimateHigh: String(high),
    timeline: item.timeline
  });

  return `/start-project?${params.toString()}`;
}

function PackageCard({ item }: { item: PricingPackage }) {
  const clarity = packageClarity[item.id];
  const high = highRange(item.startingPrice);

  return (
    <article
      className={
        item.highlighted
          ? "relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#8be9ff]/28 bg-[radial-gradient(circle_at_90%_0%,rgba(41,214,255,0.14),transparent_17rem),linear-gradient(145deg,rgba(124,92,255,0.16),rgba(11,13,19,0.96))] p-6 shadow-[0_28px_90px_rgba(55,38,115,0.18)] sm:p-7"
          : "relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-7"
      }
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#7c5cff]/12 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
            {item.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
            {item.name}
          </h2>
        </div>
        {item.highlighted ? (
          <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#8be9ff]">
            Popular
          </span>
        ) : null}
      </div>

      <p className="relative mt-8 font-display text-[clamp(2.1rem,3vw,3rem)] font-semibold leading-none tracking-[-0.065em] text-white">
        {item.price}
      </p>
      <p className="relative mt-2 text-sm font-semibold text-[#8be9ff]">
        {currency.format(item.startingPrice)}–{currency.format(high)} planning range
      </p>
      <p className="relative mt-3 flex items-center gap-2 text-xs text-white/34">
        <CalendarDays className="h-3.5 w-3.5 text-[#8be9ff]" />
        Typical timeline: {item.timeline}
      </p>

      <p className="relative mt-6 text-sm leading-7 text-white/46">{item.summary}</p>

      <div className="relative mt-6 rounded-[1.3rem] border border-[#8be9ff]/14 bg-[#8be9ff]/5 p-4">
        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
          Best for
        </p>
        <p className="mt-3 text-sm leading-7 text-white/52">{item.bestFor}</p>
      </div>

      <ul className="relative mt-6 grid gap-3 border-t border-white/[0.08] pt-6">
        {item.features.slice(0, 5).map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-white/54">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 grid gap-3 border-t border-white/[0.08] pt-6 text-xs leading-6">
        <p className="text-white/48">
          <span className="font-semibold text-white/68">Choose this when:</span> {clarity.when}
        </p>
        <p className="text-white/34">
          <span className="font-semibold text-white/54">Move up when:</span> {clarity.avoid}
        </p>
      </div>

      <Link
        href={startProjectHref(item)}
        className="relative mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/8 px-5 pt-0 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
      >
        Start with {item.name}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function PricingClarityExperience() {
  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07] pb-20 pt-28 sm:pt-36 lg:pb-28 lg:pt-44">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-16 h-[38rem] w-[38rem] rounded-full bg-[#7c5cff]/13 blur-[170px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-[-6rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[160px]" />

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
                Clear scope. Honest pricing.
              </p>
              <h1 className="mt-7 max-w-[12ch] text-balance font-display text-[clamp(4rem,9vw,8.6rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-white">
                Choose a starting point. Build the right website.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
                GridSpell packages are not random price boxes. They explain who each project type is for, what is included, what usually moves the price, and what happens before a proposal is approved.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 text-xs text-white/40">
                {["Starter option available", "Payment plans for approved projects", "Final quote reviewed by a person"].map((label) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#8be9ff]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_90%_0%,rgba(41,214,255,0.12),transparent_18rem),rgba(11,13,19,0.9)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.3)] sm:p-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                Quick recommendation
              </p>
              <div className="mt-6 grid gap-4">
                {claritySteps.map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className="grid grid-cols-[2.8rem_1fr] gap-4 rounded-[1.3rem] border border-white/[0.08] bg-white/[0.025] p-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-[#8be9ff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/24">Step {index + 1}</p>
                      <h2 className="mt-1 text-sm font-semibold text-white/74">{title}</h2>
                      <p className="mt-2 text-xs leading-6 text-white/38">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative py-24 lg:py-32">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              Package clarity
            </p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Four ways to start, with clear fit.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
              Choose the package closest to the business problem. GridSpell confirms the final scope, price, and timeline after reviewing your project brief.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {packages.map((item) => (
              <PackageCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012] py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                Pricing clarity
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                What changes the final number?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/44">
                The proposal is based on effort, complexity, and project risk. These are the common reasons a project moves above the starting package.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {pricingFactors.map(([title, text]) => (
                <article key={title} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
                  <p className="font-display text-2xl font-semibold tracking-[-0.045em] text-white/78">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/42">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              Optional additions
            </p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
              Add only what the project needs.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/44">
              These additions help you understand what can be included without hiding the cost inside vague package language.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additions.map(([Icon, title, price, text]) => (
              <article key={title} className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-[#8be9ff]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.045em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/40">{text}</p>
                <p className="mt-6 text-xs font-semibold text-[#8be9ff]">{price}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012] py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                Payment and support
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                Progress is tied to clear milestones.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/44">
                A common structure is 40% to start, 30% after design approval, and 30% before launch. Payment plans are available for approved projects.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["40%", "Project start", "Reserves the production window and begins discovery."],
                  ["30%", "Design approval", "Confirms the approved direction before full development."],
                  ["30%", "Before launch", "Completes the project before production release."]
                ].map(([amount, title, text]) => (
                  <article key={title} className="rounded-[1.5rem] border border-white/[0.08] bg-[#0b0d13] p-5">
                    <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-[#8be9ff]">{amount}</p>
                    <h3 className="mt-4 text-sm font-semibold text-white/72">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-white/36">{text}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {carePlans.map((plan) => (
                  <article key={plan.name} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/28">{plan.name}</p>
                    <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em] text-white">{plan.price}</p>
                    <p className="mt-3 text-xs leading-6 text-white/38">{plan.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-25" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/11 blur-[180px]" />
        <Container className="relative">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-[#8be9ff]/17 bg-[radial-gradient(circle_at_88%_12%,rgba(41,214,255,0.13),transparent_23rem),linear-gradient(145deg,rgba(124,92,255,0.13),rgba(11,13,19,0.94))] p-8 text-center shadow-[0_32px_110px_rgba(0,0,0,0.3)] sm:p-12 lg:p-16">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#8be9ff]/22 bg-[#8be9ff]/8">
              <Gauge className="h-6 w-6 text-[#8be9ff]" />
            </span>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              A clear next step
            </p>
            <h2 className="mx-auto mt-6 max-w-[17ch] text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
              You do not need to know the perfect package yet.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
              Share what you are building and GridSpell will recommend the right scope, timeline, and investment range before anything is approved.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ActionLink href="/start-project">
                Start your project
                <ArrowUpRight className="h-4 w-4" />
              </ActionLink>
              <Link href="/contact?intent=discovery-call" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/58 transition hover:-translate-y-0.5 hover:border-white/22 hover:text-white">
                Book a discovery call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
              {[
                [SearchCheck, "Scope reviewed by a person"],
                [ShieldCheck, "No automatic commitment"],
                [Clock3, "Clear recommended next step"]
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center justify-center gap-2 text-xs text-white/38">
                  <Icon className="h-4 w-4 text-[#8be9ff]" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
