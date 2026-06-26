"use client";

import Link from "next/link";
import {
  useLayoutEffect,
  useRef,
  useState
} from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Check,
  CircleUserRound,
  Code2,
  Layers3,
  Megaphone,
  Network,
  Sparkles,
  type LucideIcon
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type AboutChapter = {
  number: string;
  eyebrow: string;
  title: string;
  introduction: string;
  paragraphs?: string[];
  points?: string[];
  tags?: string[];
  icon: LucideIcon;
  image?: string;
  imagePosition?: string;
  align?: "left" | "right";
};

const chapters: AboutChapter[] = [
  {
    number: "01",
    eyebrow: "About the founder",
    title:
      "Hi, I’m Mohammadreza. GridSpell is the studio I built to make serious businesses look and work the part online.",
    introduction:
      "I’m a Toronto-based web developer with a background in network engineering. I approach websites as complete digital systems: the presentation people see, the technology underneath it, and the path that turns attention into a real business result.",
    paragraphs: [
      "I started GridSpell because many businesses are forced to choose between a website that looks polished and one that is technically reliable. My goal is to bring strategy, design, development, and launch setup together as one connected process.",
      "Clients work directly with me from the first conversation through planning, design, development, testing, launch, and ongoing improvement."
    ],
    tags: [
      "Toronto, Canada",
      "Independent studio",
      "Direct collaboration"
    ],
    icon: CircleUserRound,
    image: "/images/about/mohammadreza.webp",
    imagePosition: "center 28%",
    align: "left"
  },
  {
    number: "02",
    eyebrow: "About GridSpell",
    title: "Grid is the structure. Spell is the experience people remember.",
    introduction:
      "GridSpell is an independent web design and development studio for businesses that need more than a disposable template.",
    paragraphs: [
      "The grid represents hierarchy, usability, consistency, and technical systems that can grow. The spell represents character, movement, atmosphere, and the moment a visitor decides the business feels credible.",
      "Every project connects those two sides. The visual direction supports the offer, the code supports the experience, and the experience supports the business."
    ],
    points: [
      "Business strategy before decoration",
      "Custom design rather than recycled templates",
      "Responsive development for every screen",
      "Clear conversion paths and measurable actions"
    ],
    icon: Sparkles,
    align: "right"
  },
  {
    number: "03",
    eyebrow: "What we build",
    title: "From focused business websites to working digital products.",
    introduction:
      "GridSpell builds digital experiences around what the business actually needs to communicate, automate, sell, or organize.",
    points: [
      "Professional business and service websites",
      "Complete website redesigns and migrations",
      "Campaign and lead-generation landing pages",
      "E-commerce and online product experiences",
      "Booking, quote, intake, and application systems",
      "Client portals and operational dashboards",
      "Membership, account, and authentication systems",
      "Custom full-stack web applications",
      "Internal business tools and workflow systems"
    ],
    tags: [
      "Websites",
      "Landing pages",
      "Dashboards",
      "Applications",
      "E-commerce",
      "Portals"
    ],
    icon: Building2,
    image: "/images/about/building-websites.webp",
    imagePosition: "center",
    align: "left"
  },
  {
    number: "04",
    eyebrow: "Technology",
    title: "Modern tools selected for the project—not for the buzzword.",
    introduction:
      "A simple marketing website and a secure business application should not be built the same way. The technology is selected around performance, maintainability, security, content needs, and future growth.",
    paragraphs: [
      "The foundation usually begins with semantic HTML, responsive CSS, and JavaScript or TypeScript. Interactive projects are commonly developed with React and Next.js, then connected to the services the business actually uses.",
      "Not every project needs a large stack. The goal is to use enough technology to solve the problem well without creating unnecessary complexity."
    ],
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "Git & GitHub",
      "Vercel"
    ],
    icon: Code2,
    align: "right"
  },
  {
    number: "05",
    eyebrow: "Search, advertising, and growth",
    title: "A launch matters when the right people can find the business and take action.",
    introduction:
      "The website can also include the measurement and visibility setup required to support search, advertising, and ongoing improvement.",
    points: [
      "Technical SEO and crawlability improvements",
      "Page titles, descriptions, headings, and content structure",
      "Local SEO and service-area page foundations",
      "Schema markup and structured data",
      "Google Search Console setup",
      "Google Analytics 4 and event measurement",
      "Google Tag Manager configuration",
      "Google Ads account and campaign setup",
      "Lead and purchase conversion tracking",
      "Campaign-specific landing pages",
      "Google Business Profile and review integrations",
      "Core Web Vitals and performance improvements"
    ],
    tags: [
      "SEO",
      "Google Ads",
      "GA4",
      "Tag Manager",
      "Search Console",
      "Conversion tracking"
    ],
    icon: Megaphone,
    image: "/images/about/growth-and-analytics.webp",
    imagePosition: "center",
    align: "left"
  },
  {
    number: "06",
    eyebrow: "Infrastructure and integrations",
    title: "The invisible setup matters as much as the page people see.",
    introduction:
      "A production website often depends on domains, email delivery, databases, permissions, notifications, analytics, and outside platforms working together correctly.",
    points: [
      "Domain registration, DNS, and deployment configuration",
      "Business email and domain authentication",
      "Secure contact, estimate, and project-intake forms",
      "Transactional email and customer confirmations",
      "SMS notifications and appointment reminders",
      "CRM contact and lead integrations",
      "Stripe payments and checkout workflows",
      "Authentication and role-based access",
      "Database design and secure permissions",
      "API and third-party service integrations",
      "WordPress and legacy website migrations",
      "Hosting, monitoring, backups, and maintenance"
    ],
    tags: [
      "Domains & DNS",
      "Email delivery",
      "Databases",
      "Payments",
      "CRM",
      "Automation"
    ],
    icon: Network,
    image: "/images/about/systems-and-infrastructure.webp",
    imagePosition: "center",
    align: "right"
  },
  {
    number: "07",
    eyebrow: "Working with GridSpell",
    title: "One technical partner from the first idea to launch—and after.",
    introduction:
      "GridSpell is intentionally direct. You communicate with the person planning, designing, and developing the work rather than passing decisions through layers of account management.",
    paragraphs: [
      "Projects begin with the business goal, audience, current problems, required functionality, budget, and timeline. From there, the work moves through a clear scope, information architecture, design direction, production development, testing, and launch.",
      "After launch, care plans can cover updates, content changes, performance checks, reporting, technical support, and continued improvements."
    ],
    points: [
      "Clear project scope and responsibilities",
      "Direct and documented communication",
      "Visible milestones and approval points",
      "Responsive testing before launch",
      "Production setup and launch support",
      "Optional ongoing care and growth"
    ],
    tags: [
      "Strategy",
      "Design",
      "Development",
      "Launch",
      "Care"
    ],
    icon: Layers3,
    align: "left"
  }
];

const CHAPTER_COUNT = chapters.length;

type ChapterTimeline = {
  input: number[];
  opacity: number[];
  localProgress: number[];
  start: number;
  enterEnd: number;
  scrollStart: number;
  scrollEnd: number;
  exitStart: number;
  end: number;
};

function getChapterTimeline(
  index: number,
  count: number
): ChapterTimeline {
  if (count <= 1) {
    return {
      input: [0, 0.5, 1],
      opacity: [1, 1, 1],
      localProgress: [0.5, 0.5, 0.5],
      start: 0,
      enterEnd: 0.12,
      scrollStart: 0.2,
      scrollEnd: 0.78,
      exitStart: 0.9,
      end: 1
    };
  }

  const segmentSize = 1 / count;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  /*
   * Chapter phases:
   *
   * 0%  – 12%  enter and reveal
   * 20% – 78%  scroll through chapter content
   * 78% – 90%  hold at the bottom
   * 90% – 100% transition out
   */
  const enterEnd = start + segmentSize * 0.12;
  const scrollStart = start + segmentSize * 0.2;
  const scrollEnd = start + segmentSize * 0.78;
  const exitStart = start + segmentSize * 0.9;

  const first = index === 0;
  const last = index === count - 1;

  if (first) {
    return {
      input: [
        start,
        exitStart,
        end
      ],
      opacity: [1, 1, 0],
      localProgress: [0.5, 0.5, 1],
      start,
      enterEnd,
      scrollStart,
      scrollEnd,
      exitStart,
      end
    };
  }

  if (last) {
    return {
      input: [
        start,
        enterEnd,
        end
      ],
      opacity: [0, 1, 1],
      localProgress: [0, 0.5, 0.5],
      start,
      enterEnd,
      scrollStart,
      scrollEnd,
      exitStart,
      end
    };
  }

  return {
    input: [
      start,
      enterEnd,
      exitStart,
      end
    ],
    opacity: [0, 1, 1, 0],
    localProgress: [0, 0.5, 0.5, 1],
    start,
    enterEnd,
    scrollStart,
    scrollEnd,
    exitStart,
    end
  };
}

function AbstractSystem({
  progress
}: {
  progress: MotionValue<number>;
}) {
  const rotateOuter = useTransform(
    progress,
    [0, 1],
    [-30, 240]
  );

  const rotateInner = useTransform(
    progress,
    [0, 1],
    [120, -210]
  );

  const x = useTransform(
    progress,
    [0, 1],
    ["6%", "-8%"]
  );

  const y = useTransform(
    progress,
    [0, 0.5, 1],
    ["-5%", "4%", "-2%"]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.88, 1.05, 0.94]
  );

  return (
    <motion.svg
      viewBox="0 0 900 900"
      className="absolute -right-[16rem] top-1/2 h-[min(90vw,1050px)] w-[min(90vw,1050px)] -translate-y-1/2 opacity-50"
      fill="none"
      aria-hidden="true"
      style={{
        x,
        y,
        scale
      }}
    >
      <defs>
        <linearGradient
          id="about-system-gradient"
          x1="140"
          y1="120"
          x2="760"
          y2="790"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <filter
          id="about-system-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur
            stdDeviation="15"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        style={{
          rotate: rotateOuter,
          transformOrigin: "450px 450px"
        }}
      >
        <circle
          cx="450"
          cy="450"
          r="350"
          stroke="rgba(255,255,255,0.075)"
          strokeWidth="2"
          strokeDasharray="8 16"
        />

        <path
          d="M450 100 A350 350 0 0 1 755 278"
          stroke="url(#about-system-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <circle
          cx="450"
          cy="100"
          r="9"
          fill="#8be9ff"
          filter="url(#about-system-glow)"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: rotateInner,
          transformOrigin: "450px 450px"
        }}
      >
        <ellipse
          cx="450"
          cy="450"
          rx="220"
          ry="320"
          stroke="rgba(139,233,255,0.12)"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="130"
          r="8"
          fill="#7c5cff"
        />
      </motion.g>

      <path
        d="M260 325 L450 212 L650 335 L650 565 L450 688 L250 560 Z"
        fill="rgba(124,92,255,0.035)"
        stroke="url(#about-system-gradient)"
        strokeOpacity="0.32"
        strokeWidth="3"
      />

      <path
        d="M260 325 L450 450 L650 335 M450 450 L450 688 M450 450 L250 560"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
      />

      <circle
        cx="450"
        cy="450"
        r="48"
        fill="rgba(41,214,255,0.08)"
        stroke="#8be9ff"
        strokeOpacity="0.58"
        strokeWidth="4"
        filter="url(#about-system-glow)"
      />
    </motion.svg>
  );
}

function ChapterBackground({
  chapter,
  index,
  progress
}: {
  chapter: AboutChapter;
  index: number;
  progress: MotionValue<number>;
}) {
  const timeline = getChapterTimeline(
    index,
    CHAPTER_COUNT
  );

  const opacity = useTransform(
    progress,
    timeline.input,
    timeline.opacity
  );

  const first = index === 0;
  const last = index === CHAPTER_COUNT - 1;

  const scale = useTransform(
    progress,
    timeline.input,
    first
      ? [1, 1, 1.06]
      : last
        ? [1.06, 1, 1]
        : [1.06, 1, 1, 1.06]
  );

  const x = useTransform(
    progress,
    timeline.input,
    first
      ? ["0%", "0%", "-3%"]
      : last
        ? ["3%", "0%", "0%"]
        : ["3%", "0%", "0%", "-3%"]
  );

  if (!chapter.image) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        scale,
        x
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-[0.2] saturate-[0.65]"
        style={{
          backgroundImage: `url("${chapter.image}")`,
          backgroundPosition:
            chapter.imagePosition ?? "center"
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#07080c_2%,rgba(7,8,12,0.84)_35%,rgba(7,8,12,0.44)_68%,#07080c_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07080c_0%,transparent_22%,transparent_72%,#07080c_100%)]" />

      <div className="absolute inset-0 bg-[#7c5cff]/[0.025] mix-blend-color" />
    </motion.div>
  );
}

function AboutChapterScene({
  chapter,
  index,
  progress,
  active
}: {
  chapter: AboutChapter;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const timeline = getChapterTimeline(
    index,
    CHAPTER_COUNT
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflowDistance, setOverflowDistance] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content) {
      return;
    }

    const measure = () => {
      const nextDistance = Math.max(
        0,
        content.scrollHeight - viewport.clientHeight
      );

      setOverflowDistance(nextDistance);
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(viewport);
    observer.observe(content);

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const first = index === 0;
  const last = index === CHAPTER_COUNT - 1;
  const reverse = chapter.align === "right";

  const localProgress = useTransform(
    progress,
    timeline.input,
    timeline.localProgress,
    {
      clamp: true
    }
  );

  const opacity = useTransform(
    progress,
    timeline.input,
    timeline.opacity
  );

  const x = useTransform(
    progress,
    timeline.input,
    first
      ? [0, 0, -85]
      : last
        ? [100, 0, 0]
        : [100, 0, 0, -85]
  );

  const y = useTransform(
    progress,
    timeline.input,
    first
      ? [0, 0, -18]
      : last
        ? [22, 0, 0]
        : [22, 0, 0, -18]
  );

  const filter = useTransform(
    progress,
    timeline.input,
    first
      ? [
          "blur(0px)",
          "blur(0px)",
          "blur(6px)"
        ]
      : last
        ? [
            "blur(6px)",
            "blur(0px)",
            "blur(0px)"
          ]
        : [
            "blur(6px)",
            "blur(0px)",
            "blur(0px)",
            "blur(6px)"
          ]
  );

  const labelOpacity = useTransform(
    localProgress,
    [0, 0.08, 0.18],
    [0, 0, 1]
  );

  const labelY = useTransform(
    localProgress,
    [0, 0.18],
    [18, 0]
  );

  const titleOpacity = useTransform(
    localProgress,
    [0, 0.14, 0.3],
    [0, 0, 1]
  );

  const titleY = useTransform(
    localProgress,
    [0, 0.3],
    [34, 0]
  );

  const bodyOpacity = useTransform(
    localProgress,
    [0, 0.24, 0.4],
    [0, 0, 1]
  );

  const bodyY = useTransform(
    localProgress,
    [0, 0.4],
    [32, 0]
  );

  const detailsOpacity = useTransform(
    localProgress,
    [0, 0.34, 0.49],
    [0, 0, 1]
  );

  const detailsY = useTransform(
    localProgress,
    [0, 0.49],
    [30, 0]
  );

  const contentY = useTransform(
    progress,
    [
      timeline.scrollStart,
      timeline.scrollEnd
    ],
    [
      0,
      -overflowDistance
    ],
    {
      clamp: true
    }
  );

  const compactTitle = chapter.title.length > 70;
  const Icon = chapter.icon;

  return (
    <section
      className={cn(
        "absolute inset-0",
        active
          ? "pointer-events-auto"
          : "pointer-events-none"
      )}
      aria-hidden={!active}
      inert={!active}
    >
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 font-display text-[clamp(13rem,27vw,35rem)] font-semibold leading-none tracking-[-0.11em] text-white/[0.014]",
          reverse
            ? "right-[2%]"
            : "left-[2%]"
        )}
        style={{
          opacity
        }}
      >
        {chapter.number}
      </motion.div>

      <Container className="relative h-full pb-20 pt-28">
        <div
          ref={viewportRef}
          className="h-full min-h-0 overflow-hidden"
        >
          <motion.div
            className="min-h-full w-full"
            style={{
              opacity,
              x,
              y,
              filter
            }}
          >
            <motion.div
              ref={contentRef}
              className="flex min-h-full w-full items-center py-6"
              style={{
                y: contentY
              }}
            >
              <div
                className={cn(
                  "grid w-full items-center gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-16",
                  reverse && "xl:grid-cols-[0.92fr_1.08fr]"
                )}
              >
                <div
                  className={cn(
                    reverse && "xl:order-2"
                  )}
                >
                  <motion.div
                    className="flex items-center gap-4"
                    style={{
                      opacity: labelOpacity,
                      y: labelY
                    }}
                  >
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                      {chapter.number}
                    </span>

                    <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

                    <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                      {chapter.eyebrow}
                    </span>
                  </motion.div>

                  <motion.h2
                    className={cn(
                      "text-balance font-display font-semibold tracking-[-0.074em] text-white",
                      compactTitle
                        ? "mt-6 max-w-[15ch] text-[clamp(2.8rem,4.35vw,5.5rem)] leading-[0.87]"
                        : "mt-6 max-w-[13ch] text-[clamp(3.2rem,4.9vw,6.3rem)] leading-[0.84]"
                    )}
                    style={{
                      opacity: titleOpacity,
                      y: titleY
                    }}
                  >
                    {chapter.title}
                  </motion.h2>

                  <motion.p
                    className="mt-6 max-w-3xl text-base leading-8 text-white/54 sm:text-lg"
                    style={{
                      opacity: bodyOpacity,
                      y: bodyY
                    }}
                  >
                    {chapter.introduction}
                  </motion.p>

                  {chapter.paragraphs ? (
                    <motion.div
                      className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-white/40 sm:text-base sm:leading-8"
                      style={{
                        opacity: bodyOpacity,
                        y: bodyY
                      }}
                    >
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    </motion.div>
                  ) : null}
                </div>

                <motion.aside
                  className={cn(
                    "relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0a0d13]/72 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8",
                    reverse && "xl:order-1"
                  )}
                  style={{
                    opacity: detailsOpacity,
                    y: detailsY
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#7c5cff]/12 blur-3xl"
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.035]">
                        <Icon className="h-5 w-5 text-[#8be9ff]" />
                      </span>

                      <span className="font-mono text-[0.58rem] tracking-[0.22em] text-white/22">
                        GRID/SPELL
                      </span>
                    </div>

                    {chapter.points ? (
                      <ul className="mt-6 grid gap-3">
                        {chapter.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-6 text-white/55"
                          >
                            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/25 bg-[#8be9ff]/[0.06]">
                              <Check className="h-3 w-3 text-[#8be9ff]" />
                            </span>

                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-7">
                        <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-white">
                          Built personally. Delivered professionally.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-white/40">
                          Direct communication, accountable technical decisions,
                          and a clear path from the initial problem to the final
                          production website.
                        </p>
                      </div>
                    )}

                    {chapter.tags ? (
                      <div className="mt-7 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                        {chapter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-[0.56rem] uppercase tracking-[0.17em] text-white/42"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {index === CHAPTER_COUNT - 1 ? (
                      <div className="mt-7 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
                        <Link
                          href="/start-project"
                          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-6 text-sm font-semibold text-[#08090d] transition duration-300 hover:-translate-y-0.5"
                        >
                          Start a project

                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>

                        <a
                          href="mailto:hello@gridspellstudio.com"
                          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.11] bg-white/[0.03] px-6 text-sm font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                        >
                          Email the studio
                        </a>
                      </div>
                    ) : null}
                  </div>
                </motion.aside>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {overflowDistance > 8 && active ? (
          <div className="pointer-events-none absolute bottom-20 right-0 flex items-center gap-2 text-[0.54rem] uppercase tracking-[0.22em] text-white/24">
            Continue scrolling
            <ArrowDown className="h-3.5 w-3.5" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function DesktopAboutExperience() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: [
      "start start",
      "end end"
    ]
  });

  const progress = useSpring(rawProgress, {
    stiffness: 160,
    damping: 42,
    mass: 0.25,
    restDelta: 0.0005
  });

  const progressScale = useTransform(
    progress,
    [0, 1],
    [0.02, 1]
  );

  useMotionValueEvent(rawProgress, "change", (value) => {
    const next =
      value >= 1
        ? CHAPTER_COUNT - 1
        : Math.min(
            CHAPTER_COUNT - 1,
            Math.max(
              0,
              Math.floor(value * CHAPTER_COUNT)
            )
          );

    setActiveChapter((current) =>
      current === next
        ? current
        : next
    );
  });

  function scrollToChapter(index: number) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const trackTop =
      window.scrollY +
      track.getBoundingClientRect().top;

    const scrollableDistance = Math.max(
      0,
      track.offsetHeight - window.innerHeight
    );

    const ratio =
      CHAPTER_COUNT <= 1
        ? 0
        : Math.min(
            0.999,
            (index + 0.16) / CHAPTER_COUNT
          );

    window.scrollTo({
      top: trackTop + scrollableDistance * ratio,
      behavior: "smooth"
    });
  }

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{
        height: `${CHAPTER_COUNT * 200 + 40}dvh`
      }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#07080c]">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 opacity-40"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_38%,rgba(124,92,255,0.13),transparent_34rem),radial-gradient(circle_at_82%_58%,rgba(41,214,255,0.075),transparent_31rem)]"
        />

        {chapters.map((chapter, index) => (
          <ChapterBackground
            key={chapter.number}
            chapter={chapter}
            index={index}
            progress={progress}
          />
        ))}

        <AbstractSystem progress={progress} />

        {chapters.map((chapter, index) => (
          <AboutChapterScene
            key={chapter.number}
            chapter={chapter}
            index={index}
            progress={progress}
            active={activeChapter === index}
          />
        ))}

        <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
          <Container className="flex h-24 items-end justify-between pb-2">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#8be9ff]">
                About GridSpell · Toronto
              </p>
            </div>

            <p className="hidden text-[0.56rem] uppercase tracking-[0.23em] text-white/22 2xl:block">
              Scroll through the studio
            </p>
          </Container>
        </div>

        <div className="absolute bottom-7 left-0 right-0 z-30">
          <Container className="flex items-center gap-5">
            <span className="font-mono text-[0.58rem] tracking-[0.2em] text-white/28">
              {String(activeChapter + 1).padStart(2, "0")}
            </span>

            <div className="h-px flex-1 overflow-hidden bg-white/[0.09]">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                style={{
                  scaleX: progressScale
                }}
              />
            </div>

            <span className="font-mono text-[0.58rem] tracking-[0.2em] text-white/28">
              {String(CHAPTER_COUNT).padStart(2, "0")}
            </span>

            <div className="ml-3 flex gap-2">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.number}
                  type="button"
                  onClick={() => scrollToChapter(index)}
                  aria-label={`Show ${chapter.eyebrow}`}
                  aria-current={
                    activeChapter === index
                      ? "step"
                      : undefined
                  }
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeChapter === index
                      ? "w-8 bg-[#8be9ff]"
                      : "w-2 bg-white/18 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </Container>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-5 hidden items-center gap-3 text-[0.55rem] uppercase tracking-[0.24em] text-white/22 2xl:flex">
          <ArrowDown className="h-3.5 w-3.5" />
          Scroll
        </div>
      </div>
    </section>
  );
}

function StaticAboutExperience() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-32"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
            About GridSpell
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            Structure, craft, and a little magic.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg">
            An independent Toronto web design and development studio founded by
            Mohammadreza Heidarpoor.
          </p>
        </div>

        <div className="mt-20 grid gap-20">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;

            return (
              <article
                key={chapter.number}
                className="relative border-t border-white/[0.08] pt-9"
              >
                {chapter.image ? (
                  <div
                    className="absolute inset-x-0 top-9 -z-10 h-80 bg-cover bg-center opacity-[0.11]"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, transparent, #07080c), url("${chapter.image}")`,
                      backgroundPosition:
                        chapter.imagePosition ?? "center"
                    }}
                  />
                ) : null}

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                    {chapter.number}
                  </span>

                  <span className="h-px w-10 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                    {chapter.eyebrow}
                  </span>
                </div>

                <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h2 className="max-w-[16ch] font-display text-4xl font-semibold leading-[0.92] tracking-[-0.058em] text-white sm:text-6xl">
                      {chapter.title}
                    </h2>

                    <p className="mt-6 text-base leading-8 text-white/52">
                      {chapter.introduction}
                    </p>

                    {chapter.paragraphs ? (
                      <div className="mt-5 space-y-4 text-sm leading-7 text-white/40 sm:text-base sm:leading-8">
                        {chapter.paragraphs.map((paragraph) => (
                          <p key={paragraph}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[1.7rem] border border-white/[0.09] bg-white/[0.025] p-6">
                    <Icon className="h-5 w-5 text-[#8be9ff]" />

                    {chapter.points ? (
                      <ul className="mt-6 grid gap-3">
                        {chapter.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-6 text-white/52"
                          >
                            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {chapter.tags ? (
                      <div className="mt-7 flex flex-wrap gap-2">
                        {chapter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.09] px-3.5 py-2 text-[0.56rem] uppercase tracking-[0.16em] text-white/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 flex flex-wrap gap-3 border-t border-white/[0.08] pt-10">
          <Link
            href="/start-project"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <a
            href="mailto:hello@gridspellstudio.com"
            className="inline-flex min-h-12 items-center rounded-full border border-white/[0.11] bg-white/[0.03] px-6 text-sm font-semibold text-white/60"
          >
            Email the studio
          </a>
        </div>
      </Container>
    </main>
  );
}

export function AboutExperience() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticAboutExperience />;
  }

  return (
    <>
      <div className="hidden xl:block">
        <DesktopAboutExperience />
      </div>

      <div className="xl:hidden">
        <StaticAboutExperience />
      </div>
    </>
  );
}