import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Workflow
} from "lucide-react";

import { ExperienceSelectionSummary } from "@/components/forms/ExperienceSelectionSummary";
import { PricingSelectionSummary } from "@/components/forms/PricingSelectionSummary";
import { ProjectBriefForm } from "@/components/forms/ProjectBriefForm";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./StartProjectExperience.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Web Design Project",
  description:
    "Submit a structured project brief for a website, redesign, landing page, client portal, dashboard, or full-stack application with GridSpell Studio.",
  path: "/start-project"
});

const heroSignals = [
  {
    value: "4 min",
    label: "Useful brief",
    note: "Focused questions, not an endless questionnaire"
  },
  {
    value: "Context",
    label: "Stays attached",
    note: "Package, estimate, and creative direction carry through"
  },
  {
    value: "Human",
    label: "Scope review",
    note: "A practical recommendation before anything is approved"
  }
] as const;

const nextSteps = [
  {
    icon: SearchCheck,
    title: "Scope and fit review",
    text: "GridSpell checks the business goal, package, budget range, timeline, and required services."
  },
  {
    icon: WandSparkles,
    title: "Practical recommendation",
    text: "You receive a useful next step: proposal path, paid discovery, or a better-fit alternative."
  },
  {
    icon: ArrowRight,
    title: "Proposal or project plan",
    text: "Qualified projects move into a focused scope, timeline, payment structure, and launch plan."
  }
] as const;

const strongBriefSignals = [
  "A clear business goal or problem to solve",
  "The current website or brand context",
  "A realistic budget range and timeline",
  "The services, integrations, and support you may need"
] as const;

function BriefSystemVisual() {
  return (
    <div aria-hidden="true" className={`${styles.console} mx-auto w-full max-w-[720px]`}>
      <div className="relative flex h-12 items-center justify-between border-b border-white/[0.08] px-4 sm:h-14 sm:px-5">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/11" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/7" />
        </div>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.16em] text-white/32">
          Project intake system
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.46rem] uppercase tracking-[0.14em] text-[#74efb6]">
          <span className={`${styles.signalDot} h-2 w-2 rounded-full bg-[#74efb6]`} />
          Ready
        </span>
      </div>

      <div className="relative grid gap-px bg-white/[0.07] sm:grid-cols-[1.15fr_.85fr]">
        <div className="relative overflow-hidden bg-[#0a0d14] p-5 sm:p-7 lg:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7c5cff]/14 blur-[85px]" />
          <p className="relative font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#8be9ff]">
            Build signal
          </p>
          <h2 className="relative mt-5 max-w-[8ch] font-display text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-white">
            Goal into scope.
          </h2>
          <p className="relative mt-5 max-w-md text-sm leading-7 text-white/42 sm:text-base sm:leading-8">
            The brief turns a rough idea into the information needed to recommend the right build path.
          </p>

          <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Goal", "Scope", "System", "Launch"].map((label, index) => (
              <div
                key={label}
                className={`${styles.metricCard} rounded-[1.1rem] border border-white/[0.08] bg-white/[0.025] p-3.5`}
              >
                <span className="font-mono text-[0.44rem] tracking-[0.15em] text-white/22">
                  0{index + 1}
                </span>
                <p className="mt-3 text-[0.62rem] font-semibold text-white/58">{label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-8">
            <div className="flex items-center justify-between text-[0.5rem] uppercase tracking-[0.15em] text-white/28">
              <span>Decision clarity</span>
              <span>Structured</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-[#7c5cff] via-[#7388ff] to-[#29d6ff]" />
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/[0.07] sm:grid-rows-[.82fr_1.18fr]">
          <div className="bg-[#10141c] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.48rem] font-black uppercase tracking-[0.17em] text-white/28">
                  Intake state
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                  Ready to map
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 text-[#8be9ff]">
                <Workflow className="h-4.5 w-4.5" />
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              {["Business context", "Investment range", "Required systems"].map((label) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/15 px-3 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#74efb6]" />
                  <span className="text-[0.6rem] font-semibold text-white/48">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#0d1118] p-5 sm:p-6">
            <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full border border-[#8be9ff]/10 shadow-[0_0_0_2rem_rgba(41,214,255,.018),0_0_0_4rem_rgba(124,92,255,.016)]" />
            <div className="relative flex items-center justify-between">
              <p className="text-[0.48rem] font-black uppercase tracking-[0.17em] text-white/28">
                First response
              </p>
              <MessageSquareText className="h-4 w-4 text-[#8be9ff]" />
            </div>
            <p className="relative mt-6 max-w-[13ch] font-display text-3xl font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              Specific, not generic.
            </p>
            <p className="relative mt-4 text-xs leading-6 text-white/38">
              Your package, budget, timeline, and goals stay connected to the inquiry.
            </p>
            <div className={`${styles.flowLine} relative mt-7 h-px bg-[linear-gradient(90deg,transparent,#7c5cff,#29d6ff,transparent)]`} />
            <div className="relative mt-5 flex items-center justify-between text-[0.5rem] uppercase tracking-[0.15em] text-white/28">
              <span>Review path</span>
              <span className="text-[#8be9ff]">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.consoleScan} />
    </div>
  );
}

function ProjectRoutePanel() {
  return (
    <div id="project-route" className={`${styles.routePanel} p-5 sm:p-6 lg:p-7`}>
      <div className="relative z-10 flex items-start justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#8be9ff]">
            Your project route
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.055em] text-white">
            What happens after submit.
          </h2>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#74efb6]/16 bg-[#74efb6]/7 px-3 py-1.5 text-[0.48rem] font-black uppercase tracking-[0.14em] text-[#74efb6]">
          <span className={`${styles.signalDot} h-1.5 w-1.5 rounded-full bg-[#74efb6]`} />
          Clear path
        </span>
      </div>

      <div className="relative z-10 mt-6 grid gap-3">
        <div className={styles.routeRail} />
        {nextSteps.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className={`${styles.routeStep} relative grid grid-cols-[2.55rem_1fr] gap-4 rounded-[1.25rem] border border-white/[0.075] bg-black/15 p-4`}
          >
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/16 bg-[#0d1219] text-[#8be9ff]">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-[0.44rem] uppercase tracking-[0.16em] text-white/22">
                Step 0{index + 1}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-white/72">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-white/36">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-6 rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-4.5 w-4.5 text-[#8be9ff]" />
          <p className="text-[0.56rem] font-black uppercase tracking-[0.17em] text-white/38">
            A strong inquiry includes
          </p>
        </div>
        <ul className="mt-4 grid gap-3">
          {strongBriefSignals.map((item) => (
            <li key={item} className="flex gap-3 text-xs leading-6 text-white/42">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8be9ff]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
        <div className={`${styles.outcomeCard} rounded-[1.15rem] border border-white/[0.075] bg-black/15 p-4`}>
          <CircleDollarSign className="h-4 w-4 text-[#8be9ff]" />
          <p className="mt-3 text-[0.48rem] uppercase tracking-[0.15em] text-white/24">Pricing</p>
          <p className="mt-2 text-xs font-semibold leading-5 text-white/56">Payment plans for approved projects</p>
        </div>
        <div className={`${styles.outcomeCard} rounded-[1.15rem] border border-white/[0.075] bg-black/15 p-4`}>
          <Gauge className="h-4 w-4 text-[#8be9ff]" />
          <p className="mt-3 text-[0.48rem] uppercase tracking-[0.15em] text-white/24">Reply quality</p>
          <p className="mt-2 text-xs font-semibold leading-5 text-white/56">Specific context, not an automatic quote</p>
        </div>
      </div>
    </div>
  );
}

export default function StartProjectPage() {
  return (
    <main className={`${styles.root} overflow-hidden text-white`}>
      <section className={`${styles.hero} pt-24 sm:pt-28`}>
        <div className={styles.heroImageStage}>
          <Image
            src="/images/work/selected-work/gridspell-studio-v4.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 64vw, 100vw"
            quality={58}
            loading="eager"
            fetchPriority="high"
            className={styles.heroImage}
          />
        </div>
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-30" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-56 top-24 h-[36rem] w-[36rem] rounded-full bg-[#7c5cff]/12 blur-[150px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-52 top-16 h-[38rem] w-[38rem] rounded-full bg-[#29d6ff]/9 blur-[160px]" />

        <Container className="relative grid min-h-[calc(min(920px,100svh)-6rem)] min-w-0 gap-14 py-12 sm:py-16 xl:grid-cols-[.86fr_1.14fr] xl:items-center xl:gap-16 xl:py-20">
          <div className={`${styles.heroCopy} min-w-0`}>
            <p className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">
              <Sparkles className="h-4 w-4" /> Start a project
            </p>
            <h1 className="mt-7 max-w-[10ch] text-balance font-display text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-white">
              Turn the idea into a clear build plan.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              Share the business goal, package, budget range, timeline, and systems involved. GridSpell uses the brief to recommend a practical next step before anything is approved.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#project-brief"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_16px_48px_rgba(92,104,255,.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(92,104,255,.38)]"
              >
                Build the brief <ArrowDown className="h-4 w-4" />
              </Link>
              <Link
                href="#project-route"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/66 transition hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.07] hover:text-white"
              >
                See the review path <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
              {heroSignals.map((signal) => (
                <div key={signal.label} className="min-w-0">
                  <p className="truncate font-display text-[clamp(1.35rem,3vw,2.25rem)] font-semibold tracking-[-0.055em] text-[#8be9ff]">
                    {signal.value}
                  </p>
                  <p className="mt-1 text-[0.5rem] font-black uppercase tracking-[0.13em] text-white/32 sm:text-[0.56rem]">
                    {signal.label}
                  </p>
                  <p className="mt-2 hidden max-w-[13rem] text-xs leading-5 text-white/28 sm:block">
                    {signal.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.heroVisual} min-w-0`}>
            <BriefSystemVisual />
          </div>
        </Container>
      </section>

      <section id="project-brief" className={`${styles.briefSection} relative py-20 sm:py-28`}>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[75%] -translate-x-1/2 rounded-full bg-[#7c5cff]/6 blur-[140px]" />
        <Container className="relative">
          <div className="grid gap-8 border-b border-white/[0.08] pb-10 xl:grid-cols-[.8fr_1.2fr] xl:items-end">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.32em] text-[#8be9ff]">
                Structured intake
              </p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.2rem,6.8vw,7rem)] font-semibold leading-[0.8] tracking-[-0.08em] text-white">
                A form designed around decisions.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9 xl:justify-self-end">
              The questions are grouped by contact, scope, services, and business context. Existing pricing or Experience Lab selections stay attached automatically.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start xl:gap-10">
            <aside className="lg:sticky lg:top-24">
              <ProjectRoutePanel />
            </aside>

            <div className="min-w-0">
              <div className={`${styles.selectionShelf} grid gap-5`}>
                <PricingSelectionSummary />
                <ExperienceSelectionSummary />
              </div>
              <div className={`${styles.formShell} mt-5`}>
                <ProjectBriefForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
