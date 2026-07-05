"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FilePenLine,
  Gauge,
  LayoutDashboard,
  LayoutTemplate,
  SearchCheck,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "motion/react";

import { Container } from "@/components/ui/Container";

const costBands = [
  ["DIY builder", "$200–$1,500/yr", "Cheap platform fee, but strategy, copy, SEO, layout, and testing stay on the owner."],
  ["Template setup", "$750–$2,500", "Useful for a simple presence when the business does not need custom structure."],
  ["Professional site", "$1,800–$5,000", "Best starting range for a polished small business website with trust and lead flow."],
  ["Custom service site", "$4,500–$10,000", "Separate service pages, stronger copy, conversion strategy, SEO structure, and integrations."],
  ["Portal or web app", "$7,500–$30,000+", "Software scope: logins, dashboards, data, permissions, workflows, and connected systems."]
] as const;

const routes = [
  ["01", "DIY builders", "Lowest cost", "Good for temporary or very basic sites. Not the same as a planned lead-generation website."],
  ["02", "Freelancer setup", "Budget middle", "Can work for simple brochure sites, but check what is included before comparing quotes."],
  ["03", "Professional website", "Business-ready", "A stronger fit when trust, mobile quality, service clarity, contact flow, and SEO basics matter."],
  ["04", "Custom system", "Growth asset", "Needed when the website becomes a portal, dashboard, ecommerce system, or operational workflow."]
] as const;

const scopeDrivers = [
  [LayoutTemplate, "Page structure", "A one-page presence costs less than a service website with multiple strategic pages."],
  [FilePenLine, "Copywriting", "Clear messaging is usually the difference between a pretty page and a page that sells."],
  [SearchCheck, "SEO foundation", "Headings, metadata, internal links, URLs, sitemap, and service pages shape search readiness."],
  [LayoutDashboard, "Integrations", "Booking, CRM, reviews, analytics events, payments, dashboards, and APIs need setup and testing."],
  [ShieldCheck, "Launch quality", "Redirects, forms, mobile checks, speed, accessibility basics, and ownership all affect the real cost."]
] as const;

const budgetGuides = [
  ["Under $1,000", "Use a DIY builder or a very simple setup if the goal is only to get online."],
  ["$1,800–$3,000", "Plan for a focused launch website or a clean 3–5 page business presence."],
  ["$4,500–$7,500", "Budget for stronger service pages, copy, proof, tracking, and conversion structure."],
  ["$7,500+", "Expect custom systems, portals, ecommerce, dashboards, integrations, or deeper strategic work."]
] as const;

const faqs = [
  ["How much does a basic website cost in Canada?", "A basic DIY website can cost a few hundred dollars per year in platform fees. A professionally built starter website usually begins closer to $1,800–$3,000."],
  ["Is Wix or Squarespace bad for business?", "No. They can be useful for a simple temporary presence. They become limiting when the business needs custom service structure, better trust, tracking, SEO, or integrations."],
  ["What should most small businesses budget?", "Most small businesses should plan around $1,800–$5,000 for a professional site, or $4,500+ when the website needs stronger service pages and conversion strategy."],
  ["What costs extra after launch?", "Common extras include hosting, domain renewal, care plans, new pages, SEO campaigns, ad tracking, integrations, ecommerce apps, and ongoing improvements."]
] as const;

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
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

function PricingCompass() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.08, 0.98]);

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
      <motion.div
        className="absolute right-[-18rem] top-[9rem] h-[44rem] w-[44rem] rounded-full border border-[#8be9ff]/13 bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,255,0.16),rgba(41,214,255,0.07)_42%,transparent_70%)] shadow-[0_0_130px_rgba(124,92,255,0.18)] max-md:right-[-25rem] max-md:top-[7rem]"
        style={{
          rotate: reduceMotion ? 0 : rotate,
          scale: reduceMotion ? 1 : scale
        }}
      >
        <div className="absolute inset-[13%] rounded-full border border-white/[0.08]" />
        <div className="absolute inset-[28%] rounded-full border border-[#8be9ff]/16" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#8be9ff]/28 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#7c5cff]/30 to-transparent" />
        <span className="absolute left-[19%] top-[22%] rounded-full border border-white/[0.08] bg-[#07080c]/70 px-4 py-2 text-xs font-semibold text-white/48 backdrop-blur-md">DIY</span>
        <span className="absolute right-[13%] top-[35%] rounded-full border border-[#8be9ff]/18 bg-[#07080c]/70 px-4 py-2 text-xs font-semibold text-[#8be9ff] backdrop-blur-md">PRO</span>
        <span className="absolute bottom-[17%] left-[30%] rounded-full border border-[#7c5cff]/20 bg-[#07080c]/70 px-4 py-2 text-xs font-semibold text-[#a99aff] backdrop-blur-md">CUSTOM</span>
      </motion.div>
      <div className="absolute bottom-[-16rem] left-[-16rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px]" />
    </motion.div>
  );
}

function PriceRuler() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
      <div className="absolute inset-x-7 top-1/2 h-px bg-gradient-to-r from-[#7c5cff]/20 via-[#8be9ff]/45 to-white/10 max-md:hidden" />
      <div className="grid gap-4 md:grid-cols-5">
        {costBands.map(([label, price, note], index) => (
          <div key={label} className="relative rounded-[1.35rem] border border-white/[0.07] bg-[#07080c]/55 p-5 backdrop-blur-md md:min-h-64">
            <span className="font-mono text-[0.62rem] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em] text-white">{label}</h3>
            <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.055em] text-[#8be9ff]">{price}</p>
            <p className="mt-5 text-sm leading-7 text-white/44">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebsiteCostCanadaArticle() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] text-white">
      <PricingCompass />

      <section className="relative z-10 min-h-svh bg-transparent pb-20 pt-32 sm:pt-40">
        <Container className="flex min-h-[calc(100svh-8rem)] flex-col justify-center">
          <Reveal>
            <Link href="/insights" className="inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff] transition hover:text-white">
              GridSpell Insights
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <Reveal>
              <h1 className="max-w-[11ch] text-balance font-display text-[clamp(4.1rem,10vw,11rem)] font-semibold leading-[0.76] tracking-[-0.09em]">
                How much does a professional website cost in Canada?
              </h1>
            </Reveal>

            <Reveal delay={0.12} className="max-w-2xl lg:pb-5">
              <p className="text-lg leading-9 text-white/54 sm:text-xl sm:leading-10">
                A practical 2026 pricing guide for business owners comparing DIY builders, freelancers, professional websites, custom service sites, ecommerce, and portals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/38">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2.5 backdrop-blur-md"><Clock3 className="h-3.5 w-3.5 text-[#8be9ff]" /> 10 min read</span>
                <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2.5 text-[#8be9ff]">2026 Canada pricing</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <PriceRuler />
          </Reveal>
        </Container>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/92 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">The honest answer</p>
                <h2 className="mt-6 max-w-[12ch] text-balance font-display text-[clamp(3.3rem,7vw,7.4rem)] font-semibold leading-[0.82] tracking-[-0.078em]">
                  The platform fee is not the real comparison.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-7 text-lg leading-9 text-white/52">
              <Reveal>
                <p>
                  A professional website in Canada usually costs $1,800–$5,000 for a focused small business site, $4,500–$10,000 for a stronger custom service website, and $7,500–$30,000+ for ecommerce, portals, dashboards, or full-stack systems.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  DIY builders are not the enemy. They are useful when a business needs a simple temporary presence and can handle the strategy, copy, layout, SEO structure, tracking, and maintenance internally. The difference is that a professional build is planned around trust, service clarity, conversion, and growth.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="rounded-[2rem] border border-[#8be9ff]/16 bg-[#8be9ff]/[0.045] p-6 sm:p-8">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">Positioning</p>
                  <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                    Cheap gets you online. Professional makes the website part of the business.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">The buying paths</p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              Four different routes. Four different outcomes.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-4">
            {routes.map(([number, title, label, text], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="group relative min-h-80 overflow-hidden border-t border-white/[0.1] py-7 lg:border-l lg:border-t-0 lg:px-7">
                  <span className="font-mono text-[0.62rem] text-[#8be9ff]">{number}</span>
                  <p className="mt-10 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/28">{label}</p>
                  <h3 className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.06em] text-white">{title}</h3>
                  <p className="mt-6 text-sm leading-7 text-white/48">{text}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#7c5cff] to-[#8be9ff] transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">What moves the quote</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.074em]">
                  The page count matters. The responsibility matters more.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {scopeDrivers.map(([Icon, title, text], index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.025] p-6">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7c5cff]/10 blur-[60px]" />
                    <Icon className="relative h-6 w-6 text-[#8be9ff]" />
                    <h3 className="relative mt-8 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h3>
                    <p className="relative mt-4 text-sm leading-7 text-white/46">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">Budgeting advice</p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              Budget based on what the website needs to accomplish.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-0 overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#07080c]/45 backdrop-blur-md">
            {budgetGuides.map(([range, text], index) => (
              <Reveal key={range}>
                <div className="grid gap-5 border-b border-white/[0.08] p-6 last:border-b-0 sm:grid-cols-[0.34fr_0.66fr] sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/7 font-mono text-[0.62rem] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">{range}</h3>
                  </div>
                  <p className="text-base leading-8 text-white/48">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0b0d13]/94 py-24 backdrop-blur-xl sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">FAQ</p>
                <h2 className="mt-6 text-balance font-display text-[clamp(3.1rem,6vw,6.8rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
                  The questions buyers ask before they spend.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-3">
              {faqs.map(([question, answer], index) => (
                <Reveal key={question} delay={index * 0.04}>
                  <details className="group rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5 open:border-[#8be9ff]/22 open:bg-[#8be9ff]/[0.045] sm:p-6" open={index === 0}>
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

      <section className="relative z-10 bg-transparent py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.6rem] border border-[#8be9ff]/18 bg-[linear-gradient(145deg,rgba(124,92,255,0.13),rgba(41,214,255,0.04))] p-8 text-center backdrop-blur-md sm:p-12 lg:p-16">
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8be9ff]/60 to-transparent" />
              <Sparkles className="mx-auto h-7 w-7 text-[#8be9ff]" />
              <p className="mt-7 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Apply this to your project</p>
              <h2 className="mx-auto mt-6 max-w-[15ch] text-balance font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
                Get the right scope before you spend.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
                Send GridSpell the business goal, current website, timeline, and rough budget. We will recommend the right starting point before anything is approved.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/start-project" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/62 transition hover:-translate-y-0.5 hover:text-white">
                  View pricing
                  <Gauge className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
