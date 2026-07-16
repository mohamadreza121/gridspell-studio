import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleDollarSign,
  FilePenLine,
  Gauge,
  LayoutDashboard,
  LayoutTemplate,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles
} from "lucide-react";

import styles from "@/components/pricing/PricingClarityExperience.module.css";
import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { packages, type PricingPackage } from "@/config/packages";

const packageClarity: Record<
  PricingPackage["id"],
  { when: string; avoid: string; range: string }
> = {
  starter: {
    when: "One focused page, campaign, or compact professional presence.",
    avoid: "You need separate service pages, a CMS, booking, CRM, or a larger SEO structure.",
    range: "CAD $950–$1,650"
  },
  launch: {
    when: "A custom 3–5 page website with clear services and a proper inquiry flow.",
    avoid: "You need a blog, many service pages, editable content, or connected workflows.",
    range: "CAD $1,800–$3,000"
  },
  growth: {
    when: "A deeper website with service pages, proof, tracking, and integrations.",
    avoid: "You are building logins, dashboards, multi-role permissions, or custom software.",
    range: "CAD $4,500–$7,500"
  },
  custom: {
    when: "A portal, dashboard, internal tool, automation, database, or full-stack system.",
    avoid: "You only need a public marketing website with a standard inquiry form.",
    range: "CAD $7,500+"
  }
};

const decisionRoute = [
  {
    label: "01",
    title: "Find the closest starting point",
    text: "Choose the package that most closely matches the business problem—not the one with the longest feature list."
  },
  {
    label: "02",
    title: "Define the pressure points",
    text: "Pages, content readiness, integrations, custom logic, and motion determine the real production effort."
  },
  {
    label: "03",
    title: "Receive a practical scope",
    text: "GridSpell reviews the brief and recommends a proposal path, discovery phase, or better-fit alternative."
  }
] as const;

const pricingFactors = [
  ["01", "Page architecture", "One polished landing page is different from a service website with multiple custom layouts and internal linking."],
  ["02", "Content readiness", "Ready copy keeps production tight. Strategy, copywriting, cleanup, and migration can be added when needed."],
  ["03", "Editable content", "CMS collections, blogs, projects, team profiles, and reusable content models add setup and training."],
  ["04", "Connected systems", "Booking, CRM, reviews, analytics events, email workflows, and APIs require implementation and testing."],
  ["05", "Application logic", "Accounts, dashboards, permissions, databases, payments, and portals move the work into software development."],
  ["06", "Motion direction", "Core transitions are included. Cinematic scenes, scroll choreography, and advanced interaction add production time."]
] as const;

const additions = [
  [LayoutTemplate, "Additional page", "From CAD $200", "A strategic page built from the approved visual system."],
  [FilePenLine, "Conversion copywriting", "From CAD $650", "Website copy shaped around clarity, trust, and action."],
  [BadgeCheck, "Google reviews", "From CAD $250", "A branded review section with reliable fallback content."],
  [WandSparkles, "Brand refinement", "From CAD $450", "Focused typography, colour, and digital-brand polish."],
  [Sparkles, "Advanced motion", "From CAD $500", "Cinematic interaction beyond the core transition system."],
  [LayoutDashboard, "CRM or dashboard", "Quoted by scope", "Lead routing, admin views, and operational workflows."]
] as const;

const carePlans = [
  ["Essential", "CAD $99/mo", "Maintenance, backups, uptime checks, and small content changes."],
  ["Growth", "CAD $199/mo", "Priority updates, analytics checks, conversion tracking, and two development hours."],
  ["Custom", "CAD $399+/mo", "Ongoing feature development, integration support, and monthly strategy."]
] as const;

function highRange(startingPrice: number) {
  return startingPrice + Math.max(700, Math.round((startingPrice * 0.15) / 50) * 50);
}

function startProjectHref(item: PricingPackage) {
  const params = new URLSearchParams({
    package: item.id,
    estimateLow: String(item.startingPrice),
    estimateHigh: String(highRange(item.startingPrice)),
    timeline: item.timeline
  });

  return `/start-project?${params.toString()}`;
}

function PackageCard({ item, index }: { item: PricingPackage; index: number }) {
  const clarity = packageClarity[item.id];

  return (
    <article
      className={`${styles.packageCard} ${item.highlighted ? styles.packageFeatured : ""} flex min-h-full flex-col p-6 sm:p-8`}
    >
      <span className={styles.cornerIndex}>{String(index + 1).padStart(2, "0")}</span>

      <div className="relative pr-12">
        <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-[#8be9ff]">
          {item.eyebrow}
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-4xl font-semibold tracking-[-0.065em] text-white sm:text-5xl">
            {item.name}
          </h3>
          {item.highlighted ? (
            <span className="border border-[#8be9ff]/30 bg-[#8be9ff]/8 px-3 py-1.5 text-[0.54rem] font-bold uppercase tracking-[0.18em] text-[#8be9ff]">
              Most selected
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative mt-8 border-y border-white/[0.09] py-6">
        <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/32">
          Planning range
        </p>
        <p className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.07em] text-white">
          {clarity.range}
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-white/42">
          <CalendarDays className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" />
          Typical timeline · {item.timeline}
        </p>
      </div>

      <p className="relative mt-6 text-sm leading-7 text-white/52">{item.summary}</p>

      <div className="relative mt-7 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#8be9ff]">
            Strong fit
          </p>
          <p className="mt-3 text-sm leading-7 text-white/55">{clarity.when}</p>
        </div>
        <div>
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/30">
            Move up when
          </p>
          <p className="mt-3 text-sm leading-7 text-white/38">{clarity.avoid}</p>
        </div>
      </div>

      <ul className="relative mt-7 grid gap-3 border-t border-white/[0.09] pt-6 sm:grid-cols-2">
        {item.features.slice(0, 6).map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-white/52">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={startProjectHref(item)}
        className="relative mt-8 inline-flex min-h-12 items-center justify-between border-t border-[#8be9ff]/35 pt-5 text-sm font-semibold text-white transition-colors hover:text-[#8be9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8be9ff]/80"
      >
        Start with {item.name}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function PricingClarityExperience() {
  return (
    <main className={`${styles.root} overflow-hidden`}>
      <section className="relative min-h-[88svh] border-b border-white/[0.08] pb-20 pt-28 sm:pt-36 lg:flex lg:items-center lg:pb-24 lg:pt-40">
        <div aria-hidden="true" className={`${styles.heroGrid} pointer-events-none absolute inset-0 opacity-65`} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#07080c]" />

        <Container className="relative w-full">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <span className={`${styles.signal} h-px w-16 origin-left bg-gradient-to-r from-[#8e78ff] to-[#8be9ff]`} />
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.36em] text-[#8be9ff]">
                  Investment system · CAD
                </p>
              </div>

              <h1 className={`${styles.heroLine} mt-8 max-w-[11ch] text-balance font-display text-[clamp(4rem,9.3vw,9rem)] font-semibold leading-[0.82] tracking-[-0.09em] text-white`}>
                Price the right build—not a list of features.
              </h1>

              <p className="mt-12 max-w-2xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9">
                Start with a realistic range, understand what changes it, and move into a proposal only after the business goal and technical scope are clear.
              </p>

              <div className="mt-9 grid max-w-2xl grid-cols-2 border border-white/[0.09] sm:grid-cols-3">
                {[
                  ["04", "starting paths"],
                  ["CAD", "transparent ranges"],
                  ["Human", "scope review"]
                ].map(([value, label], index) => (
                  <div key={label} className={`p-4 sm:p-5 ${index < 2 ? "border-r border-white/[0.09]" : "col-span-2 border-t border-white/[0.09] sm:col-span-1 sm:border-t-0"}`}>
                    <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">{value}</p>
                    <p className="mt-1 text-[0.56rem] uppercase tracking-[0.18em] text-white/32">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className={`${styles.routePanel} p-6 sm:p-8`}>
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.09] pb-5">
                <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.26em] text-[#8be9ff]">
                    Scope route
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em] text-white">
                    From range to proposal
                  </h2>
                </div>
                <CircleDollarSign className="h-7 w-7 text-[#8be9ff]" aria-hidden="true" />
              </div>

              <div className={`${styles.routeRail} mt-4`}>
                {decisionRoute.map((step) => (
                  <div key={step.label} className={`${styles.routeStep} grid grid-cols-[3.2rem_1fr] gap-4 border-b border-white/[0.07] py-5 last:border-b-0`}>
                    <span className="pt-0.5 text-[0.58rem] font-bold tracking-[0.2em] text-[#8be9ff]">{step.label}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white/82">{step.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-white/40">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="#packages"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff] transition-colors hover:text-white"
              >
                Compare packages
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section id="packages" className="scroll-mt-24 py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 border-b border-white/[0.09] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#8be9ff]">
                Package matrix
              </p>
              <h2 className="mt-5 max-w-[10ch] font-display text-5xl font-semibold leading-[0.88] tracking-[-0.075em] text-white sm:text-7xl">
                Four clear starting points.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/45 lg:justify-self-end">
              These are planning ranges, not automatic quotes. The selected package, estimate, and timeline are carried into the project brief so no context is lost.
            </p>
          </div>

          <div className={`${styles.packageGrid} mt-12 gap-5`}>
            {packages.map((item, index) => (
              <PackageCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-y border-white/[0.08] bg-[#090b10] py-24 lg:py-32">
        <div aria-hidden="true" className={`${styles.gridBackdrop} pointer-events-none absolute inset-0 opacity-30`} />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#8be9ff]">
                Scope pressure
              </p>
              <h2 className="mt-5 max-w-[11ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-white sm:text-7xl">
                What moves the final number?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/44">
                Price changes when the project gains complexity, production time, or technical risk—not because of hidden package rules.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {pricingFactors.map(([number, title, text]) => (
                <article key={title} className={`${styles.factorCard} min-h-[15rem] p-6`}>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <span className="text-[0.58rem] font-bold tracking-[0.2em] text-[#8be9ff]">{number}</span>
                    <Gauge className="h-4 w-4 text-white/22" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.055em] text-white/88">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/42">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-8 border-b border-white/[0.09] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#8be9ff]">
                Optional modules
              </p>
              <h2 className="mt-5 max-w-[12ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-white sm:text-7xl">
                Add only what earns its place.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/44">
              Each addition is visible before approval, so the final proposal stays readable and tied to actual work.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additions.map(([Icon, title, price, text], index) => (
              <article key={title} className={`${styles.additionCard} p-6`}>
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#8be9ff]" aria-hidden="true" />
                  <span className="text-[0.56rem] tracking-[0.18em] text-white/24">M{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.055em] text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/42">{text}</p>
                <p className="mt-8 border-t border-white/[0.08] pt-4 text-xs font-semibold text-[#8be9ff]">{price}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.08] bg-[#090b10] py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#8be9ff]">
                Payment structure
              </p>
              <h2 className="mt-5 max-w-[11ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-white sm:text-7xl">
                Investment follows progress.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/44">
                Approved projects commonly use three milestones. Payment plans can be arranged when the project and schedule are a strong fit.
              </p>
            </div>

            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["40%", "Project start", "Reserves the production window and begins discovery."],
                  ["30%", "Design approval", "Confirms the direction before full development."],
                  ["30%", "Before launch", "Completes the project before production release."]
                ].map(([amount, title, text], index) => (
                  <article key={title} className={`${styles.milestoneCard} p-5`}>
                    <span className="text-[0.56rem] font-bold tracking-[0.18em] text-white/24">MILESTONE {index + 1}</span>
                    <p className="mt-6 font-display text-5xl font-semibold tracking-[-0.07em] text-[#8be9ff]">{amount}</p>
                    <h3 className="mt-5 text-sm font-semibold text-white/80">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-white/38">{text}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {carePlans.map(([name, price, text]) => (
                  <article key={name} className={`${styles.careCard} p-5`}>
                    <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#8be9ff]">{name} care</p>
                    <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em] text-white">{price}</p>
                    <p className="mt-3 text-xs leading-6 text-white/38">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-24 lg:py-36">
        <div aria-hidden="true" className={`${styles.gridBackdrop} pointer-events-none absolute inset-0 opacity-25`} />
        <Container className="relative">
          <div className={`${styles.finalPanel} p-8 sm:p-12 lg:p-16`}>
            <div className={`${styles.scanLine} absolute inset-x-0 top-0 h-px`} aria-hidden="true" />
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-[#8be9ff]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em]">No automatic commitment</p>
                </div>
                <h2 className="mt-7 max-w-[12ch] font-display text-5xl font-semibold leading-[0.88] tracking-[-0.075em] text-white sm:text-7xl">
                  You do not need the perfect package yet.
                </h2>
              </div>

              <div>
                <p className="text-base leading-8 text-white/46">
                  Share the business goal, current context, budget range, and timeline. GridSpell will recommend the right scope before anything is approved.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ActionLink href="/start-project">
                    Start your project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </ActionLink>
                  <Link
                    href="/contact?intent=discovery-call"
                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/[0.14] px-6 text-sm font-semibold text-white/62 transition hover:border-[#8be9ff]/35 hover:text-white"
                  >
                    Book a discovery call
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="mt-8 grid gap-3 border-t border-white/[0.09] pt-6 text-xs text-white/38 sm:grid-cols-3">
                  <span className="flex items-center gap-2"><SearchCheck className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" /> Human scope review</span>
                  <span className="flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" /> Clear range</span>
                  <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" /> No pressure</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
