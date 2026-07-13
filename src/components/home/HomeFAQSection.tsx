"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Code2,
  LayoutDashboard,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { useState, type ComponentType } from "react";

import { Container } from "@/components/ui/Container";

type IconComponent = ComponentType<{ className?: string }>;

type HomepageFaq = {
  category: string;
  question: string;
  answer: string;
};

const homepageFaqs: readonly HomepageFaq[] = [
  {
    category: "Scope",
    question: "What does GridSpell build?",
    answer:
      "GridSpell builds premium websites, landing pages, service pages, client portals, dashboards, web applications, and connected business systems. A project can begin as a focused marketing website and expand into the software behind the business."
  },
  {
    category: "Investment",
    question: "How much does a project usually cost?",
    answer:
      "Most projects begin within the package ranges shown on the pricing page. The final investment depends on scope, content, timeline, integrations, custom functionality, and the level of support required after launch."
  },
  {
    category: "Timeline",
    question: "How long does a project take?",
    answer:
      "A focused launch website can usually be completed within a few weeks. Larger redesigns, portals, dashboards, and custom systems take longer because strategy, interface states, integrations, testing, and launch planning all need more depth."
  },
  {
    category: "Redesign",
    question: "Can GridSpell rebuild my current website?",
    answer:
      "Yes. Existing websites can be restructured and redesigned with stronger service pages, clearer conversion paths, improved mobile layouts, SEO foundations, redirects, analytics, and a more reliable production setup."
  },
  {
    category: "Systems",
    question: "Do you build portals and dashboards?",
    answer:
      "Yes. GridSpell can create client portals, admin dashboards, lead pipelines, project workspaces, approval flows, file areas, internal tools, and role-based experiences shaped around how the business actually operates."
  },
  {
    category: "Kickoff",
    question: "What do I need before starting?",
    answer:
      "A clear goal, your main services, target customers, rough budget, preferred timeline, current website if one exists, and a few visual references are enough to begin. The discovery process turns that information into a practical build plan."
  },
  {
    category: "Launch",
    question: "Will the website be mobile-friendly and SEO-ready?",
    answer:
      "Yes. Responsive layouts, page structure, metadata, sitemap setup, performance work, accessibility basics, analytics readiness, and launch checks are treated as part of the build rather than optional finishing touches."
  },
  {
    category: "Growth",
    question: "Do you offer support after launch?",
    answer:
      "Yes. Ongoing support can cover fixes, updates, content changes, monitoring, analytics review, new sections, conversion improvements, integrations, and the gradual expansion of the website into a larger digital system."
  }
] as const;

const kickoffSignals: readonly {
  label: string;
  value: string;
  icon: IconComponent;
}[] = [
  {
    label: "Typical start",
    value: "Clear brief + priorities",
    icon: Sparkles
  },
  {
    label: "Build coverage",
    value: "Strategy through launch",
    icon: Code2
  },
  {
    label: "Growth path",
    value: "Website into a system",
    icon: Workflow
  }
] as const;

export function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="home-faq-section home-story-section relative z-[3] isolate overflow-hidden border-t border-white/[0.06] bg-[#07080c] py-20 text-white max-xl:bg-transparent sm:py-24 lg:py-28"
      style={{ contentVisibility: "visible", containIntrinsicSize: "auto" }}
    >
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-16rem] top-24 h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[#29d6ff]/8 blur-[150px]"
      />

      <Container className="relative">
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-14">
          <div className="xl:sticky xl:top-24">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
              FAQ
            </p>
            <h2 className="mt-6 max-w-[10.5ch] text-balance font-display text-[clamp(3.2rem,6.2vw,6.5rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Questions before we build.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/48 sm:text-lg">
              Clear answers about scope, pricing, timelines, redesigns, systems,
              launch quality, and what happens after the website goes live.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)),rgba(8,10,15,0.78)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
                <div>
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#8be9ff]">
                    Before kickoff
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/66">
                    What the process is built around
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-[#69e6ad]/16 bg-[#69e6ad]/7 px-3 py-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[#7aefb9]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7aefb9] shadow-[0_0_14px_rgba(122,239,185,0.75)]" />
                  Ready
                </span>
              </div>

              <div className="divide-y divide-white/[0.065]">
                {kickoffSignals.map((signal, index) => {
                  const Icon = signal.icon;

                  return (
                    <div
                      key={signal.label}
                      className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.025]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#8be9ff]/14 bg-[#8be9ff]/[0.055] text-[#8be9ff] transition group-hover:border-[#8be9ff]/28 group-hover:bg-[#8be9ff]/10">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.5rem] uppercase tracking-[0.17em] text-white/30">
                          {signal.label}
                        </p>
                        <p className="mt-1 truncate text-sm font-medium text-white/68">
                          {signal.value}
                        </p>
                      </div>
                      <span className="font-mono text-[0.5rem] text-white/18">
                        0{index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              href="/start-project"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/8 px-5 text-sm font-semibold text-[#8be9ff] transition hover:-translate-y-0.5 hover:border-[#8be9ff]/38 hover:bg-[#8be9ff]/13 hover:text-white"
            >
              Ask about your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="relative mt-8 hidden min-h-[17rem] overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-[radial-gradient(circle_at_75%_20%,rgba(124,92,255,0.22),transparent_12rem),radial-gradient(circle_at_18%_88%,rgba(41,214,255,0.13),transparent_14rem),rgba(8,10,15,0.82)] xl:block">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(139,233,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,233,255,0.08)_1px,transparent_1px)] [background-size:2.4rem_2.4rem]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-44 w-44 rounded-full border border-[#8be9ff]/12 shadow-[0_0_80px_rgba(41,214,255,0.08)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 h-24 w-24 rounded-full border border-[#7c5cff]/24"
              />

              <div className="relative flex min-h-[17rem] flex-col justify-between p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.48rem] uppercase tracking-[0.2em] text-[#8be9ff]">
                      Build route
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/68">
                      One connected delivery path
                    </p>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 font-mono text-[0.46rem] uppercase tracking-[0.15em] text-white/32">
                    GS / 04
                  </span>
                </div>

                <div className="relative my-7 grid grid-cols-4 gap-2">
                  <div
                    aria-hidden="true"
                    className="absolute left-[10%] right-[10%] top-5 h-px bg-gradient-to-r from-[#7c5cff]/60 via-[#8be9ff]/60 to-[#29d6ff]/60"
                  />
                  {["Brief", "Design", "Build", "Launch"].map((step, index) => (
                    <div key={step} className="relative text-center">
                      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-[#8be9ff]/18 bg-[#0b0e15] font-mono text-[0.5rem] text-[#8be9ff] shadow-[0_0_28px_rgba(41,214,255,0.08)]">
                        0{index + 1}
                      </span>
                      <p className="mt-3 text-[0.52rem] font-semibold uppercase tracking-[0.13em] text-white/45">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                  <p className="max-w-[24rem] text-xs leading-5 text-white/36">
                    Strategy, interface, development, and launch stay connected instead
                    of becoming separate handoffs.
                  </p>
                  <span className="flex shrink-0 items-center gap-2 text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-[#7aefb9]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7aefb9]" />
                    Structured
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_88%_0%,rgba(124,92,255,0.14),transparent_22rem),radial-gradient(circle_at_0%_100%,rgba(41,214,255,0.08),transparent_24rem),rgba(9,11,17,0.88)] shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-white/[0.08] bg-white/[0.018] px-5 sm:px-6">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-white/18" />
                <span className="h-2 w-2 rounded-full bg-[#7c5cff]/55" />
                <span className="h-2 w-2 rounded-full bg-[#8be9ff]/48" />
              </div>
              <span className="rounded-full border border-white/[0.07] bg-black/15 px-4 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.16em] text-white/35">
                Project clarity
              </span>
              <span className="justify-self-end font-mono text-[0.48rem] uppercase tracking-[0.15em] text-[#8be9ff]/70">
                08 answers
              </span>
            </div>

            <div className="grid gap-5 border-b border-white/[0.075] px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6 sm:py-6">
              <div>
                <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
                  Common project questions
                </p>
                <h3 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-4xl">
                  Everything important, before the first build sprint.
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/38">
                <Clock3 className="h-4 w-4 text-[#8be9ff]" />
                <span>About 2 minutes to read</span>
              </div>
            </div>

            <div className="grid items-start gap-3 p-4 sm:p-5 lg:grid-cols-2">
              {homepageFaqs.map((item, index) => {
                const isOpen = openIndex === index;
                const answerId = `homepage-faq-answer-${index}`;

                return (
                  <article
                    key={item.question}
                    data-open={String(isOpen)}
                    className="overflow-hidden rounded-[1.3rem] border border-white/[0.075] bg-white/[0.018] transition-colors data-[open=true]:border-[#8be9ff]/18 data-[open=true]:bg-[linear-gradient(135deg,rgba(124,92,255,0.075),rgba(41,214,255,0.035),rgba(255,255,255,0.018))]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-4 py-4 text-left sm:px-5 sm:py-5"
                    >
                      <span className="pt-1 font-mono text-[0.5rem] tracking-[0.16em] text-[#8be9ff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[0.44rem] font-semibold uppercase tracking-[0.16em] text-white/30 transition group-hover:border-white/[0.12] group-hover:text-white/45">
                          {item.category}
                        </span>
                        <span className="mt-2.5 block font-display text-lg font-semibold leading-tight tracking-[-0.035em] text-white/82 transition group-hover:text-white sm:text-xl">
                          {item.question}
                        </span>
                      </span>

                      <span className="relative mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/48 transition group-hover:border-[#8be9ff]/24 group-hover:text-[#8be9ff]">
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={answerId}
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.18, ease: "easeOut" }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 pl-[3.25rem] sm:px-5 sm:pb-5 sm:pl-[3.8rem]">
                            <p className="text-sm leading-7 text-white/50">
                              {item.answer}
                            </p>
                            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#69e6ad]/14 bg-[#69e6ad]/6 px-3 py-1.5 text-[0.46rem] font-semibold uppercase tracking-[0.13em] text-[#7aefb9]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Clear before kickoff
                            </span>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-5 border-t border-white/[0.075] bg-black/15 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 text-[#8be9ff]">
                  <LayoutDashboard className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/72">
                    Your project does not need to fit a template.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/34">
                    The brief is shaped around the actual business and the system it needs.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.17em] text-white/36">
                <ShieldCheck className="h-4 w-4 text-[#8be9ff]" />
                Scope-first planning
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
