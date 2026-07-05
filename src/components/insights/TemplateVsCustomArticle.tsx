"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  LayoutTemplate,
  MousePointer2,
  Puzzle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";

import { Container } from "@/components/ui/Container";

const comparisonPoints = [
  ["Launch speed", "Template", "Faster to publish when the content and structure are simple."],
  ["Upfront cost", "Template", "Usually cheaper at the start, especially for simple online presence needs."],
  ["Brand control", "Custom", "Built around the business, audience, positioning, and visual direction."],
  ["SEO structure", "Custom", "Easier to plan service pages, internal links, metadata, and long-term content depth."],
  ["Integrations", "Custom", "Better when forms, CRM, booking, portals, dashboards, payments, or workflows matter."],
  ["Scalability", "Custom", "Better foundation when the website needs to become a business system."]
] as const;

const templateWins = [
  "You need a fast and affordable way to get online.",
  "The website is temporary or early-stage.",
  "Your service structure is simple.",
  "You are comfortable writing content and maintaining the site yourself.",
  "You do not need custom forms, portals, dashboards, or deep integrations yet."
] as const;

const customWins = [
  "Your business depends on leads, trust, SEO, referrals, or paid ads.",
  "You need separate service pages and stronger conversion flow.",
  "Your current website feels generic, outdated, or hard to grow.",
  "You need booking, CRM, analytics events, payments, dashboards, or portals.",
  "You want the site to feel ownable instead of adapted from a generic layout."
] as const;

const decisionQuestions = [
  ["Is this temporary or long-term?", "Temporary can start with a template. Long-term usually deserves a stronger foundation."],
  ["Do you need leads from the site?", "Then copy, proof, service pages, tracking, and calls to action matter."],
  ["Do you have multiple services?", "A custom structure can help each offer become clearer and easier to find."],
  ["Will you run ads?", "Campaign traffic needs landing pages, message match, fast loading, and conversion tracking."],
  ["Will the site connect to tools?", "Booking, CRM, email, payments, dashboards, and portals often justify custom scope."]
] as const;

const hiddenCostCards: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: MousePointer2,
    title: "Weak conversion",
    text: "A clean template still fails if the offer, proof, calls to action, and contact flow are unclear."
  },
  {
    icon: SearchCheck,
    title: "Shallow SEO",
    text: "A single generic Services page usually cannot explain every offer as well as focused service pages."
  },
  {
    icon: Puzzle,
    title: "Limited fit",
    text: "A template can become awkward when forms, booking, CRM, reviews, or workflows need custom logic."
  },
  {
    icon: ShieldCheck,
    title: "Future rebuild",
    text: "The cheapest first version may need to be rebuilt once the business grows past the original structure."
  }
];

const faqs = [
  ["Are template websites bad for SEO?", "No. Templates can rank when the content, structure, technical setup, internal links, and user experience are strong. The problem is that many template sites launch with shallow pages and generic copy."],
  ["Is a custom website always better?", "No. Custom is only better when the business has a reason for custom structure, design, functionality, or long-term growth. A simple early-stage business may not need it yet."],
  ["Can I start with a template and move to custom later?", "Yes. Many businesses start with a template, validate the offer, collect proof, then rebuild custom once the website needs to support real marketing and operations."],
  ["What is the simplest rule?", "Choose a template when the website needs to exist. Choose custom when the website needs to perform."]
] as const;

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 34,
              filter: "blur(10px)"
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      }}
      viewport={{
        once: true,
        amount: 0.22
      }}
      transition={{
        duration: 0.82,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DecisionObject() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 32,
    mass: 0.28
  });

  const y = useTransform(smoothProgress, [0, 1], [0, 230]);
  const x = useTransform(smoothProgress, [0, 1], [0, -45]);
  const rotate = useTransform(smoothProgress, [0, 1], [-8, 12]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1.06, 0.98]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        y: reduceMotion ? 0 : y
      }}
    >
      <div className="absolute inset-0 bg-[#07080c]" />
      <div className="page-grid absolute inset-0 opacity-30" />
      <div className="absolute left-[-18rem] top-[22%] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/7 blur-[150px]" />
      <div className="absolute right-[-16rem] top-[8rem] h-[38rem] w-[38rem] rounded-full bg-[#7c5cff]/10 blur-[160px]" />

      <motion.div
        className="absolute right-[-9rem] top-[7rem] h-[45rem] w-[45rem] max-w-none max-lg:right-[-17rem] max-lg:top-[9rem] max-lg:h-[38rem] max-lg:w-[38rem] max-md:right-[-20rem] max-md:h-[34rem] max-md:w-[34rem] max-sm:right-[-17rem] max-sm:top-[8rem] max-sm:h-[29rem] max-sm:w-[29rem]"
        style={{
          x: reduceMotion ? 0 : x,
          rotate: reduceMotion ? 0 : rotate,
          scale: reduceMotion ? 1 : scale
        }}
      >
        <div className="absolute inset-0 rounded-[4rem] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] shadow-[0_0_150px_rgba(124,92,255,0.16)] backdrop-blur-[2px]" />
        <div className="absolute inset-8 rounded-[3rem] border border-[#8be9ff]/12" />
        <div className="absolute left-1/2 top-10 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#8be9ff]/22 to-transparent" />

        <div className="absolute left-12 top-16 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
          Template
        </div>
        <div className="absolute right-12 top-16 rounded-full border border-[#a99aff]/20 bg-[#7c5cff]/10 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#a99aff]">
          Custom
        </div>

        <div className="absolute left-12 top-36 grid w-[38%] gap-4">
          <div className="h-24 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025]" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-[1.1rem] border border-white/[0.08] bg-white/[0.02]" />
            <div className="h-24 rounded-[1.1rem] border border-white/[0.08] bg-white/[0.02]" />
          </div>
          <div className="h-20 rounded-[1.2rem] border border-[#8be9ff]/16 bg-[#8be9ff]/[0.035]" />
        </div>

        <div className="absolute right-12 top-36 h-[22rem] w-[38%]">
          <div className="absolute left-[12%] top-[4%] h-24 w-24 rounded-[1.4rem] border border-[#a99aff]/25 bg-[#7c5cff]/[0.07] shadow-[0_0_55px_rgba(124,92,255,0.16)]" />
          <div className="absolute right-[4%] top-[30%] h-20 w-20 rounded-full border border-[#8be9ff]/24 bg-[#8be9ff]/[0.06]" />
          <div className="absolute left-[26%] bottom-[10%] h-28 w-28 rounded-[2rem] border border-white/[0.1] bg-white/[0.025]" />
          <div className="absolute left-[34%] top-[30%] h-px w-[36%] rotate-[28deg] bg-[#8be9ff]/18" />
          <div className="absolute right-[27%] top-[49%] h-px w-[40%] -rotate-[38deg] bg-[#a99aff]/18" />
          <span className="absolute left-[19%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#a99aff] shadow-[0_0_20px_rgba(169,154,255,0.9)]" />
          <span className="absolute right-[20%] top-[43%] h-2.5 w-2.5 rounded-full bg-[#8be9ff] shadow-[0_0_20px_rgba(139,233,255,0.9)]" />
          <span className="absolute left-[45%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-white/75 shadow-[0_0_20px_rgba(255,255,255,0.45)]" />
        </div>

        <div className="absolute bottom-14 left-14 right-14 flex items-center gap-4 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/34">
          <span>Fast start</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#8be9ff]/35 via-white/[0.08] to-[#7c5cff]/35" />
          <span>Ownable system</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WarpDivider({ solid = false }: { solid?: boolean }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.2
  });

  const y = useTransform(smoothProgress, [0, 1], [22, -22]);
  const skewY = useTransform(smoothProgress, [0, 1], [-7, 7]);
  const rotate = useTransform(smoothProgress, [0, 1], [-1.8, 1.8]);
  const lineY = useTransform(smoothProgress, [0, 1], [14, -14]);

  return (
    <div className="pointer-events-none relative z-10 -my-10 h-32 overflow-hidden">
      <motion.div
        className={
          solid
            ? "absolute -left-14 -right-14 top-1/2 h-28 origin-center bg-[#0b0d13]/96 shadow-[0_-35px_95px_rgba(124,92,255,0.08),0_35px_95px_rgba(41,214,255,0.06)]"
            : "absolute -left-14 -right-14 top-1/2 h-28 origin-center border-y border-white/[0.055] bg-[#07080c]/22 shadow-[0_-28px_85px_rgba(41,214,255,0.055),0_28px_85px_rgba(124,92,255,0.055)] backdrop-blur-[1px]"
        }
        style={{
          y: reduceMotion ? 0 : y,
          skewY: reduceMotion ? 0 : skewY,
          rotate: reduceMotion ? 0 : rotate
        }}
      />

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 opacity-80"
        style={{
          y: reduceMotion ? 0 : lineY
        }}
      >
        <path
          d="M0 64 C220 12 360 108 560 60 C760 12 880 94 1080 54 C1250 20 1340 42 1440 18"
          fill="none"
          stroke="rgba(139,233,255,0.22)"
          strokeWidth="1"
        />
        <path
          d="M0 78 C230 30 390 118 590 72 C760 34 925 100 1110 70 C1270 44 1355 58 1440 36"
          fill="none"
          stroke="rgba(124,92,255,0.18)"
          strokeWidth="1"
        />
      </motion.svg>

      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/28 to-transparent" />
    </div>
  );
}

function CutCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-white/[0.08] bg-white/[0.026] p-6 ${className}`}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))"
      }}
    >
      {children}
    </div>
  );
}

export function TemplateVsCustomArticle() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] text-white">
      <DecisionObject />

      <section className="relative z-10 min-h-svh bg-transparent pb-20 pt-32 sm:pt-40">
        <Container className="flex min-h-[calc(100svh-8rem)] flex-col justify-center">
          <Reveal>
            <Link href="/insights" className="inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff] transition hover:text-white">
              GridSpell Insights
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <Reveal>
              <h1 className="max-w-[11ch] text-balance font-display text-[clamp(4.1rem,10vw,10.8rem)] font-semibold leading-[0.76] tracking-[-0.09em]">
                Template website vs custom website.
              </h1>
            </Reveal>

            <Reveal delay={0.12} className="max-w-2xl lg:pb-5">
              <p className="text-lg leading-9 text-white/54 sm:text-xl sm:leading-10">
                A clear guide for business owners choosing between a fast template setup and a custom website built for branding, SEO, leads, integrations, and long-term growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/38">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2.5 backdrop-blur-md">
                  <Clock3 className="h-3.5 w-3.5 text-[#8be9ff]" />
                  10 min read
                </span>
                <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2.5 text-[#8be9ff]">
                  Buyer decision guide
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <WarpDivider solid />

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">The simple answer</p>
                <h2 className="mt-6 max-w-[12ch] text-balance font-display text-[clamp(3.3rem,7vw,7.4rem)] font-semibold leading-[0.82] tracking-[-0.078em]">
                  Choose by outcome, not only by price.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-7 text-lg leading-9 text-white/52">
              <Reveal>
                <p>
                  A template website is usually faster and cheaper to launch. A custom website is usually more flexible, more strategic, and better suited for businesses that need stronger branding, clearer service pages, custom functionality, integrations, or long-term growth.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Neither option is automatically right or wrong. A brand-new business that only needs a simple online presence may not need a fully custom build yet. A service business that depends on leads, trust, SEO, paid ads, booking, reviews, or internal workflows may outgrow a basic template quickly.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="border-l border-[#8be9ff]/35 bg-[#8be9ff]/[0.035] p-6 sm:p-8">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">Rule of thumb</p>
                  <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                    Choose a template when the website needs to exist. Choose custom when the website needs to perform.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <WarpDivider />

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">The control split</p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              The real difference is not just design. It is control.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <CutCard className="min-h-[28rem]">
                <LayoutTemplate className="h-7 w-7 text-[#8be9ff]" />
                <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">Template website</p>
                <h3 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
                  A starting system you adapt.
                </h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/46">
                  The layout already exists. You change text, images, colors, logo, pages, and settings. This can be smart when the website is simple and speed matters more than unique structure.
                </p>
              </CutCard>
            </Reveal>

            <Reveal delay={0.08}>
              <CutCard className="min-h-[28rem] border-[#8be9ff]/16 bg-[#8be9ff]/[0.035]">
                <Code2 className="h-7 w-7 text-[#a99aff]" />
                <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#a99aff]">Custom website</p>
                <h3 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
                  A business system you shape.
                </h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/50">
                  The structure is planned around the business, audience, offer, content, technical requirements, and growth goals. The website is not forced into a generic pattern.
                </p>
              </CutCard>
            </Reveal>
          </div>
        </Container>
      </section>

      <WarpDivider solid />

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">Comparison</p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              Six places where the choice changes the project.
            </h2>
          </Reveal>

          <div className="mt-16 grid overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            {comparisonPoints.map(([label, winner, note], index) => (
              <Reveal key={label}>
                <div className="grid gap-5 border-b border-white/[0.08] p-6 last:border-b-0 sm:grid-cols-[0.35fr_0.2fr_0.45fr] sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">{label}</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">
                      {winner}
                    </span>
                  </div>
                  <p className="text-base leading-8 text-white/48">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WarpDivider />

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">Hidden cost</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.074em]">
                  Cheap can become expensive when the site cannot carry the goal.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {hiddenCostCards.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <CutCard className="min-h-64">
                    <Icon className="h-6 w-6 text-[#8be9ff]" />
                    <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/46">{text}</p>
                  </CutCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <WarpDivider solid />

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">When template wins</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.074em]">
                  Fast, simple, affordable, and good enough.
                </h2>
                <ul className="mt-10 grid gap-4">
                  {templateWins.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-8 text-white/50">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-[#8be9ff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-l border-[#7c5cff]/24 pl-8">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#a99aff]">When custom wins</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.074em]">
                  Strategic, ownable, scalable, and built to perform.
                </h2>
                <ul className="mt-10 grid gap-4">
                  {customWins.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-8 text-white/54">
                      <Zap className="mt-1 h-5 w-5 shrink-0 text-[#a99aff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <WarpDivider />

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">Decision path</p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              Ask these questions before choosing the build type.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4">
            {decisionQuestions.map(([question, answer], index) => (
              <Reveal key={question} delay={index * 0.04}>
                <div className="grid gap-6 border-t border-white/[0.09] py-7 sm:grid-cols-[0.18fr_0.36fr_0.46fr] sm:items-start">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-0.055em]">{question}</h3>
                  <p className="text-base leading-8 text-white/48">{answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WarpDivider solid />

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">FAQ</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3.1rem,6vw,6.8rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
                  The final checks before you pick a direction.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-3">
              {faqs.map(([question, answer], index) => (
                <Reveal key={question} delay={index * 0.04}>
                  <details className="group border border-white/[0.08] bg-white/[0.025] p-5 open:border-[#8be9ff]/22 open:bg-[#8be9ff]/[0.045] sm:p-6" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-2xl font-semibold leading-tight tracking-[-0.045em] sm:text-3xl">{question}</span>
                      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/40 transition group-open:rotate-45 group-open:text-[#8be9ff]">+</span>
                    </summary>
                    <p className="mt-5 text-sm leading-7 text-white/48 sm:text-base sm:leading-8">{answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <WarpDivider />

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden border border-[#8be9ff]/18 bg-[linear-gradient(145deg,rgba(124,92,255,0.13),rgba(41,214,255,0.04))] p-8 text-center backdrop-blur-md sm:p-12 lg:p-16" style={{ clipPath: "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 3rem 100%, 0 calc(100% - 3rem))" }}>
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8be9ff]/60 to-transparent" />
              <Sparkles className="mx-auto h-7 w-7 text-[#8be9ff]" />
              <p className="mt-7 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Apply this to your project</p>
              <h2 className="mx-auto mt-6 max-w-[15ch] text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
                Pick the right starting point before you build.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
                Send GridSpell your goals, current website, timeline, and budget. We will recommend whether template-style setup, custom website, portal, or phased build makes the most sense.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/start-project" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/insights/professional-website-cost-canada" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/62 transition hover:-translate-y-0.5 hover:text-white">
                  Read the cost guide
                  <Workflow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
