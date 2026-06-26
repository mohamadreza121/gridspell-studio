"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
  Check,
  Clock3,
  Sparkles
} from "lucide-react";

import { InsightRowVisual } from "@/components/insights/InsightRowVisual";
import { Container } from "@/components/ui/Container";
import {
  insightArticles,
  type InsightArticle
} from "@/config/insights";
import { cn } from "@/lib/utils";

const accentStyles = {
  violet: {
    glow: "bg-[#7c5cff]/14",
    border: "group-hover:border-[#9d87ff]/35",
    text: "text-[#a99aff]"
  },
  cyan: {
    glow: "bg-[#29d6ff]/11",
    border: "group-hover:border-[#8be9ff]/35",
    text: "text-[#8be9ff]"
  },
  blue: {
    glow: "bg-[#67aeff]/12",
    border: "group-hover:border-[#67aeff]/35",
    text: "text-[#8abfff]"
  }
} as const;

function InsightGlyph() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.16),rgba(41,214,255,0.06)_42%,transparent_70%)] blur-3xl" />

      <motion.svg
        viewBox="0 0 600 600"
        className="relative h-full w-full overflow-visible"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.35
        }}
      >
        <defs>
          <linearGradient
            id="insight-glyph-gradient"
            x1="100"
            y1="80"
            x2="520"
            y2="530"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9d87ff" />
            <stop offset="0.5" stopColor="#7c5cff" />
            <stop offset="1" stopColor="#29d6ff" />
          </linearGradient>

          <filter
            id="insight-glyph-glow"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feGaussianBlur
              stdDeviation="12"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx="300"
          cy="300"
          r="220"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="9 15"
          variants={{
            hidden: {
              pathLength: 0,
              rotate: -50,
              opacity: 0
            },
            visible: {
              pathLength: 1,
              rotate: 35,
              opacity: 1
            }
          }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            transformOrigin: "300px 300px"
          }}
        />

        <motion.path
          d="M300 82 A218 218 0 0 1 504 224"
          stroke="url(#insight-glyph-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#insight-glyph-glow)"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0
            },
            visible: {
              pathLength: 1,
              opacity: 1
            }
          }}
          transition={{
            duration: 1.05,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        <motion.path
          d="M179 203 L300 132 L430 208 L430 363 L300 443 L169 359 Z"
          fill="rgba(124,92,255,0.055)"
          stroke="url(#insight-glyph-gradient)"
          strokeWidth="3"
          variants={{
            hidden: {
              scale: 0.7,
              rotate: -15,
              opacity: 0
            },
            visible: {
              scale: 1,
              rotate: 0,
              opacity: 1
            }
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            transformOrigin: "300px 290px"
          }}
        />

        <motion.path
          d="M179 203 L300 290 L430 208 M300 290 L300 443 M300 290 L169 359"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          variants={{
            hidden: {
              pathLength: 0,
              opacity: 0
            },
            visible: {
              pathLength: 1,
              opacity: 1
            }
          }}
          transition={{
            duration: 0.9,
            delay: 0.5
          }}
        />

        <motion.circle
          cx="300"
          cy="290"
          r="38"
          fill="rgba(41,214,255,0.08)"
          stroke="#8be9ff"
          strokeWidth="4"
          filter="url(#insight-glyph-glow)"
          variants={{
            hidden: {
              scale: 0.35,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1
            }
          }}
          transition={{
            duration: 0.7,
            delay: 0.65
          }}
          style={{
            transformOrigin: "300px 290px"
          }}
        />

        {[
          [108, 280],
          [472, 335],
          [378, 502],
          [211, 482]
        ].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={index % 2 === 0 ? 7 : 5}
            fill={index % 2 === 0 ? "#7c5cff" : "#8be9ff"}
            variants={{
              hidden: {
                scale: 0,
                opacity: 0
              },
              visible: {
                scale: 1,
                opacity: 0.85
              }
            }}
            transition={{
              delay: 0.75 + index * 0.08,
              duration: 0.45
            }}
            style={{
              transformOrigin: `${cx}px ${cy}px`
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function FeaturedArticle({
  article
}: {
  article: InsightArticle;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 70,
              scale: 0.975
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: 0.16
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.1] bg-[#0a0c12]/88 shadow-[0_35px_120px_rgba(0,0,0,0.34)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/14 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-[25%] h-[30rem] w-[30rem] rounded-full bg-[#29d6ff]/8 blur-[130px]"
      />

      <div className="relative grid min-h-[620px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex items-center border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
          <InsightGlyph />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/[0.06] px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
              Featured insight
            </span>

            <span className="inline-flex items-center gap-2 text-xs text-white/30">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readingTime}
            </span>
          </div>

          <p className="mt-8 text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#a99aff]">
            {article.category}
          </p>

          <h2 className="mt-5 max-w-[13ch] text-balance font-display text-[clamp(3rem,5.2vw,6.4rem)] font-semibold leading-[0.85] tracking-[-0.074em] text-white">
            {article.title}
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/47 sm:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-8 border-l border-[#8be9ff]/30 pl-5">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-white/26">
              Key takeaway
            </p>

            <p className="mt-3 max-w-xl font-display text-xl font-semibold leading-snug tracking-[-0.035em] text-white/78">
              {article.takeaway}
            </p>
          </div>

          <Link
            href={`/insights/${article.slug}`}
            className="group mt-9 inline-flex min-h-13 w-fit items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition duration-300 hover:-translate-y-0.5"
          >
            Read the full guide

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ArticleRow({
  article,
  index
}: {
  article: InsightArticle;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const accent = accentStyles[article.accent];

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 75
            }
      }
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.13
      }}
      transition={{
        duration: 0.75,
        delay: Math.min(index * 0.035, 0.14),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        "group relative overflow-hidden border-t border-white/[0.085]",
        accent.border
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-[8%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-0 blur-[110px] transition-opacity duration-700 group-hover:opacity-100",
          accent.glow
        )}
      />

      <Link
        href={`/insights/${article.slug}`}
        className="relative grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)_3rem] lg:items-stretch lg:gap-12 lg:py-16"
      >
        {/* Animated editorial visual */}
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.075] bg-white/[0.018] p-5 sm:p-6">
          <div className="relative z-10 flex items-start justify-between gap-5">
            <div>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/24">
                {String(index + 2).padStart(2, "0")}
              </span>

              <p
                className={cn(
                  "mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.28em]",
                  accent.text
                )}
              >
                {article.category}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 text-xs text-white/28">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readingTime}
            </span>
          </div>

          <InsightRowVisual article={article} />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-white/[0.11] to-transparent"
          />
        </div>

        {/* Article content */}
        <div className="flex flex-col justify-center py-2">
          <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.6rem,4.15vw,5rem)] font-semibold leading-[0.9] tracking-[-0.063em] text-white transition-transform duration-500 group-hover:translate-x-2">
            {article.title}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/43">
            {article.excerpt}
          </p>

          <div className="mt-7 flex gap-3">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/25 bg-[#8be9ff]/[0.06]">
              <Check className="h-3 w-3 text-[#8be9ff]" />
            </span>

            <p className="max-w-2xl text-sm leading-7 text-white/54">
              {article.takeaway}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-end">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] text-white/28 transition duration-500 group-hover:rotate-45 group-hover:border-[#8be9ff]/35 group-hover:bg-[#8be9ff]/[0.06] group-hover:text-[#8be9ff]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function InsightsExperience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const featuredArticle =
    insightArticles.find((article) => article.featured) ??
    insightArticles[0];

  const remainingArticles = insightArticles.filter(
    (article) => article.slug !== featuredArticle.slug
  );

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: [
      "start start",
      "end end"
    ]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 34,
    mass: 0.28,
    restDelta: 0.0005
  });

  const backgroundY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "-9%"]
  );

  return (
    <div
      ref={pageRef}
      className="relative overflow-hidden bg-[#07080c]"
    >
      <motion.div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-35"
        style={{
          y: reduceMotion ? 0 : backgroundY
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[4%] h-[44rem] w-[44rem] rounded-full bg-[#7c5cff]/8 blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-14rem] top-[30%] h-[42rem] w-[42rem] rounded-full bg-[#29d6ff]/6 blur-[170px]"
      />

      <motion.div
        aria-hidden="true"
        className="fixed bottom-0 left-0 top-0 z-40 hidden w-px origin-top bg-gradient-to-b from-[#7c5cff] via-[#8be9ff] to-[#29d6ff] xl:block"
        style={{
          scaleY: smoothProgress
        }}
      />

      <main className="relative">
        <section className="min-h-svh pt-28">
          <Container className="flex min-h-[calc(100svh-7rem)] flex-col justify-center py-16">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
                GridSpell Insights
              </p>
            </motion.div>

            <motion.h1
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 55,
                      filter: "blur(10px)"
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mt-9 max-w-[12ch] text-balance font-display text-[clamp(4.4rem,9vw,10.5rem)] font-semibold leading-[0.78] tracking-[-0.082em] text-white"
            >
              Practical thinking for better digital decisions.
            </motion.h1>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                delay: 0.24
              }}
              className="mt-10 grid max-w-6xl gap-8 border-t border-white/[0.08] pt-8 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div className="flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.25em] text-white/25">
                <ArrowDown className="h-4 w-4" />
                Scroll to explore
              </div>

              <p className="max-w-3xl text-lg leading-9 text-white/46">
                Clear guides on website strategy, design, development, business
                systems, project planning, search visibility, and digital
                ownership—written for business owners making real decisions.
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="pb-24 sm:pb-32">
          <Container>
            <FeaturedArticle article={featuredArticle} />

            <div className="mt-24 sm:mt-32">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.5
                }}
                transition={{
                  duration: 0.7
                }}
                className="mb-8 flex items-end justify-between gap-8"
              >
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">
                    The field notes
                  </p>

                  <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,5vw,6rem)] font-semibold leading-[0.88] tracking-[-0.067em] text-white">
                    Useful before the project begins.
                  </h2>
                </div>

                <Sparkles className="hidden h-8 w-8 text-white/16 sm:block" />
              </motion.div>

              <div>
                {remainingArticles.map((article, index) => (
                  <ArticleRow
                    key={article.slug}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <motion.section
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 60,
                      scale: 0.98
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{
                once: true,
                amount: 0.35
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative mt-24 overflow-hidden rounded-[2.2rem] border border-white/[0.09] bg-white/[0.025] p-8 sm:mt-32 sm:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#7c5cff]/14 blur-[100px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <BookOpenText className="h-6 w-6 text-[#8be9ff]" />

                  <h2 className="mt-7 max-w-[13ch] font-display text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
                    Need an answer specific to your business?
                  </h2>
                </div>

                <div>
                  <p className="max-w-xl text-base leading-8 text-white/44">
                    Bring the website, workflow, campaign, or technical problem.
                    GridSpell can help define the right scope before unnecessary
                    tools or features are added.
                  </p>

                  <Link
                    href="/start-project"
                    className="group mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition duration-300 hover:-translate-y-0.5"
                  >
                    Discuss your project

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.section>
          </Container>
        </section>
      </main>
    </div>
  );
}