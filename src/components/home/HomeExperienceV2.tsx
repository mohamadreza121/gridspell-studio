"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion
} from "motion/react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  FileCheck2,
  Files,
  Gauge,
  Layers3,
  LayoutDashboard,
  MessageSquareText,
  MousePointer2,
  PanelTop,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode
} from "react";

import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { packages, type PricingPackageId } from "@/config/packages";
import { processSteps } from "@/config/process";
import { services } from "@/config/services";
import { featuredProjects, type FeaturedProject } from "@/config/work";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;
type HeroModeId = "websites" | "portals" | "automation" | "systems";
type CapabilityModeId = "build" | "rebuild" | "scale";
type PortalMode = "client" | "admin";
type PageScope = "1-5" | "6-10" | "10+";
type ProductType = "website" | "cms" | "portal";

const pageSections = [
  ["intro", "Intro"],
  ["work", "Work"],
  ["capabilities", "Capabilities"],
  ["process", "Process"],
  ["portal", "Portal"],
  ["pricing", "Pricing"],
  ["proof", "Proof"],
  ["start", "Start"]
] as const;

const heroModes: readonly {
  id: HeroModeId;
  label: string;
  title: string;
  eyebrow: string;
  detail: string;
  icon: IconComponent;
  windowLabel: string;
}[] = [
  {
    id: "websites",
    label: "Websites",
    title: "A premium first impression built to convert.",
    eyebrow: "Marketing experience",
    detail: "Strategy, responsive design, development, SEO, analytics, and reliable lead capture.",
    icon: PanelTop,
    windowLabel: "Conversion website"
  },
  {
    id: "portals",
    label: "Portals",
    title: "A clear workspace for clients and teams.",
    eyebrow: "Authenticated product",
    detail: "Projects, files, messages, approvals, tasks, billing, and support in one secure interface.",
    icon: LayoutDashboard,
    windowLabel: "Client workspace"
  },
  {
    id: "automation",
    label: "Automation",
    title: "Connected workflows that reduce manual work.",
    eyebrow: "Business integration",
    detail: "Forms, CRM routing, booking, email, payments, notifications, and operational handoffs.",
    icon: Workflow,
    windowLabel: "Workflow engine"
  },
  {
    id: "systems",
    label: "Digital systems",
    title: "Custom software shaped around real operations.",
    eyebrow: "Full-stack system",
    detail: "Purpose-built applications with authentication, permissions, databases, and internal tooling.",
    icon: Blocks,
    windowLabel: "Digital platform"
  }
] as const;

const capabilityModes: readonly {
  id: CapabilityModeId;
  number: string;
  label: string;
  title: string;
  description: string;
  serviceSlugs: readonly string[];
  blueprint: readonly string[];
  result: string;
  icon: IconComponent;
}[] = [
  {
    id: "build",
    number: "01",
    label: "Build",
    title: "Launch a professional website or digital platform.",
    description:
      "Create a strong foundation from the beginning with clear positioning, custom design, reliable development, and a launch plan.",
    serviceSlugs: ["business-websites", "landing-pages", "full-stack-apps"],
    blueprint: [
      "Strategy and sitemap",
      "Custom visual direction",
      "Responsive Next.js build",
      "Analytics and lead capture"
    ],
    result: "A credible, conversion-ready digital presence built for the next stage of the business.",
    icon: Rocket
  },
  {
    id: "rebuild",
    number: "02",
    label: "Rebuild",
    title: "Replace an outdated website with a stronger system.",
    description:
      "Preserve what still works, remove the friction, and rebuild the experience around the quality and direction of the current business.",
    serviceSlugs: ["website-redesign", "business-websites", "care-plans"],
    blueprint: [
      "Current-site audit",
      "Information architecture",
      "Content and redirect plan",
      "Performance-focused rebuild"
    ],
    result: "A modern website that feels aligned with the value, maturity, and ambition of the company.",
    icon: Sparkles
  },
  {
    id: "scale",
    number: "03",
    label: "Scale",
    title: "Add portals, content systems, integrations, and automation.",
    description:
      "Move beyond a brochure website with connected workflows and product-like experiences that support customers and internal teams.",
    serviceSlugs: ["client-portals", "full-stack-apps", "care-plans"],
    blueprint: [
      "Authentication and permissions",
      "CMS or structured data",
      "CRM and workflow integrations",
      "Ongoing product improvements"
    ],
    result: "A connected digital system that handles real work instead of creating more administration.",
    icon: Layers3
  }
] as const;

const proofPrinciples: readonly {
  number: string;
  title: string;
  text: string;
  icon: IconComponent;
  visual: "responsive" | "performance" | "delivery" | "connected";
}[] = [
  {
    number: "01",
    title: "Custom-built",
    text: "No purchased website templates. The structure and visual system are shaped around the business.",
    icon: MousePointer2,
    visual: "responsive"
  },
  {
    number: "02",
    title: "Performance-first",
    text: "Responsive, accessible, technically structured, and designed to remain fast as the site grows.",
    icon: Gauge,
    visual: "performance"
  },
  {
    number: "03",
    title: "Clear delivery",
    text: "Defined phases, visible decisions, tracked approvals, and one place for project communication.",
    icon: FileCheck2,
    visual: "delivery"
  },
  {
    number: "04",
    title: "Connected systems",
    text: "Forms, analytics, CRM, booking, payments, portals, and automation work as one practical system.",
    icon: Workflow,
    visual: "connected"
  }
] as const;

const portalViews = {
  client: {
    eyebrow: "Client workspace",
    title: "Northstar Website Rebuild",
    progress: 64,
    primaryMetric: "Design",
    secondaryMetric: "3 days",
    cards: [
      {
        label: "Approval awaiting review",
        value: "Homepage direction",
        detail: "Review typography, layout, and motion",
        icon: BadgeCheck
      },
      {
        label: "Upcoming task",
        value: "Final service copy",
        detail: "Due Friday · Client visible",
        icon: CheckCircle2
      },
      {
        label: "Latest message",
        value: "Design review is ready",
        detail: "GridSpell · 26 minutes ago",
        icon: MessageSquareText
      },
      {
        label: "Open invoice",
        value: "CAD $3,125",
        detail: "Due in 7 days",
        icon: CircleDollarSign
      }
    ]
  },
  admin: {
    eyebrow: "Admin operations",
    title: "GridSpell Studio",
    progress: 78,
    primaryMetric: "4 active",
    secondaryMetric: "2 approvals",
    cards: [
      {
        label: "Active projects",
        value: "4 client workspaces",
        detail: "2 design · 1 build · 1 launch",
        icon: BriefcaseBusiness
      },
      {
        label: "New leads",
        value: "3 opportunities",
        detail: "CAD $21,000 pipeline",
        icon: Target
      },
      {
        label: "Client messages",
        value: "2 need a reply",
        detail: "Northstar and Pure Timepieces",
        icon: MessageSquareText
      },
      {
        label: "Outstanding",
        value: "CAD $8,750",
        detail: "Across 3 open invoices",
        icon: BarChart3
      }
    ]
  }
} as const;

function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center")}>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff] sm:text-xs">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-5 max-w-5xl text-balance font-display text-[clamp(2.9rem,6.5vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-6 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9",
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}

function BrowserChrome({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.11] bg-[#080a0f] shadow-[0_35px_110px_rgba(0,0,0,0.42)]">
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.08] bg-[#0b0d13]/95 px-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/11" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/7" />
        </div>
        <div className="mx-auto max-w-[70%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-1.5 text-[0.55rem] tracking-[0.08em] text-white/30">
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

function HeroVisual({ activeMode }: { activeMode: HeroModeId }) {
  const reduceMotion = useReducedMotion();
  const mode = heroModes.find((item) => item.id === activeMode) ?? heroModes[0];
  const ModeIcon = mode.icon;

  return (
    <div className="relative mx-auto min-h-[29rem] w-full max-w-[44rem] sm:min-h-[34rem] lg:min-h-[42rem]">
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [4, 7, 4], y: [0, -7, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[3%] top-[12%] h-[62%] w-[78%] rounded-[2rem] border border-[#7c5cff]/18 bg-[#7c5cff]/6 shadow-[0_35px_110px_rgba(45,28,97,0.16)]"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [-3, -5, -3], x: [0, 7, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[4%] right-[1%] h-[60%] w-[76%] rounded-[2rem] border border-[#29d6ff]/14 bg-[#29d6ff]/5"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeMode}
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.985 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-[8%] z-10 sm:inset-x-[5%]"
        >
          <BrowserChrome label={mode.windowLabel}>
            <div className="relative min-h-[22rem] overflow-hidden bg-[radial-gradient(circle_at_78%_12%,rgba(41,214,255,.13),transparent_18rem),radial-gradient(circle_at_18%_90%,rgba(124,92,255,.15),transparent_20rem),#090b11] p-5 sm:min-h-[27rem] sm:p-7">
              <div className="absolute inset-0 page-grid opacity-20" aria-hidden="true" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]">
                    <ModeIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.52rem] uppercase tracking-[0.24em] text-[#8be9ff]">
                      {mode.eyebrow}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/72">GridSpell system</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#69e6ad]/18 bg-[#69e6ad]/7 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-[#7aefb9]">
                  Live
                </span>
              </div>

              <div className="relative mt-8 grid gap-4 sm:grid-cols-[1.2fr_.8fr]">
                <div className="rounded-[1.35rem] border border-white/[0.08] bg-black/20 p-5">
                  <p className="text-[0.54rem] uppercase tracking-[0.2em] text-white/25">
                    Current experience
                  </p>
                  <h3 className="mt-4 max-w-[16ch] font-display text-3xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-4xl">
                    {mode.title}
                  </h3>
                  <p className="mt-4 text-xs leading-6 text-white/38 sm:text-sm sm:leading-7">
                    {mode.detail}
                  </p>
                  <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.12 }}
                      className="h-full origin-left rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-4">
                    <p className="text-[0.5rem] uppercase tracking-[0.19em] text-white/24">
                      Delivery status
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                        78%
                      </p>
                      <Activity className="h-5 w-5 text-[#8be9ff]" />
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-4">
                    <p className="text-[0.5rem] uppercase tracking-[0.19em] text-white/24">
                      Connected layers
                    </p>
                    <div className="mt-4 flex gap-2">
                      {[Code2, DatabaseIcon, ShieldCheck].map((Icon, index) => (
                        <span
                          key={index}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-black/15 text-white/40"
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-3">
                {["Strategy", "Interface", "System"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3"
                  >
                    <p className="text-[0.48rem] uppercase tracking-[0.17em] text-white/22">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-[0.68rem] font-medium text-white/54 sm:text-xs">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BrowserChrome>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return <Layers3 className={className} />;
}

function ProjectPreview({ project }: { project: FeaturedProject }) {
  const reduceMotion = useReducedMotion();

  return (
    <BrowserChrome label={project.liveUrl ? new URL(project.liveUrl).hostname : project.slug}>
      <div className="relative aspect-[16/10] min-h-[18rem] overflow-hidden bg-[#05060a] sm:min-h-[25rem] lg:min-h-[34rem]">
        {project.previewVideo && !reduceMotion ? (
          <video
            key={project.previewVideo}
            className="absolute inset-0 h-full w-full object-cover object-top"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.previewImage}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            aria-label={project.previewAlt ?? `${project.title} website preview`}
          >
            <source src={project.previewVideo} type="video/mp4" />
          </video>
        ) : project.previewImage ? (
          <Image
            src={project.previewImage}
            alt={project.previewAlt ?? `${project.title} website preview`}
            fill
            sizes="(min-width: 1280px) 62vw, (min-width: 768px) 80vw, 94vw"
            className="object-cover object-top"
            priority={project.slug === featuredProjects[0]?.slug}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(41,214,255,.16),transparent_24rem),linear-gradient(145deg,#0b0d13,#11182a)] p-8">
            <p className="max-w-[12ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              {project.title}
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.035),transparent_30%,transparent_70%,rgba(41,214,255,.025))]" />
      </div>
    </BrowserChrome>
  );
}

function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = featuredProjects[activeIndex] ?? featuredProjects[0];

  function move(direction: number) {
    setActiveIndex((current) =>
      (current + direction + featuredProjects.length) % featuredProjects.length
    );
  }

  return (
    <section id="work" className="relative scroll-mt-24 border-y border-white/[0.07] bg-white/[0.012] py-24 sm:py-28 lg:py-36">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Proof before promises."
            description="Explore real first impressions, then open each case study for the strategy, systems, and outcomes behind the work."
          />
          <Reveal className="xl:justify-self-end">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 border-b border-white/20 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/52 transition hover:border-[#8be9ff] hover:text-[#8be9ff]"
            >
              Explore all work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 xl:grid-cols-[minmax(0,1.3fr)_minmax(20rem,.7fr)] xl:items-stretch">
          <Reveal>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/work/${project.slug}`} className="block" aria-label={`Open ${project.title} case study`}>
                  <ProjectPreview project={project} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col rounded-[1.8rem] border border-white/[0.09] bg-[#0b0d13]/86 p-6 sm:p-8">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              {String(activeIndex + 1).padStart(2, "0")} · {project.category}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${project.slug}-details`}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mt-6 font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-6 text-sm leading-7 text-white/42 sm:text-base sm:leading-8">
                  {project.description}
                </p>
                <div className="mt-7 rounded-[1.25rem] border border-[#8be9ff]/15 bg-[#8be9ff]/5 p-4">
                  <p className="text-[0.52rem] uppercase tracking-[0.2em] text-[#8be9ff]">
                    Project outcome
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/58">{project.result}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid gap-3">
              {featuredProjects.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition",
                    index === activeIndex
                      ? "border-[#8be9ff]/28 bg-[#8be9ff]/7 text-white"
                      : "border-white/[0.07] bg-white/[0.02] text-white/38 hover:border-white/[0.14] hover:text-white/68"
                  )}
                >
                  <span className="text-xs font-medium">{item.title}</span>
                  <span className="font-mono text-[0.56rem] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous project"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-white/42 transition hover:border-white/20 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next project"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-white/42 transition hover:border-white/20 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8be9ff]"
              >
                Case study <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CapabilitiesSection() {
  const [activeMode, setActiveMode] = useState<CapabilityModeId>("build");
  const reduceMotion = useReducedMotion();
  const mode = capabilityModes.find((item) => item.id === activeMode) ?? capabilityModes[0];
  const ModeIcon = mode.icon;
  const relatedServices = services.filter((service) => mode.serviceSlugs.includes(service.slug));

  return (
    <section id="capabilities" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Start with the outcome."
          description="Choose what needs to change. GridSpell assembles the right strategy, design, technology, and ongoing support around that business goal."
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-[0.68fr_1.32fr] xl:items-stretch">
          <Reveal className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {capabilityModes.map((item) => {
              const Icon = item.icon;
              const selected = item.id === activeMode;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMode(item.id)}
                  className={cn(
                    "group flex min-h-32 items-start gap-4 rounded-[1.45rem] border p-5 text-left transition duration-300",
                    selected
                      ? "border-[#8be9ff]/28 bg-[#8be9ff]/7 shadow-[0_16px_50px_rgba(41,214,255,0.06)]"
                      : "border-white/[0.08] bg-white/[0.022] hover:border-white/[0.16] hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition",
                      selected
                        ? "border-[#8be9ff]/24 bg-[#8be9ff]/9 text-[#8be9ff]"
                        : "border-white/[0.08] bg-white/[0.025] text-white/30"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.52rem] uppercase tracking-[0.2em] text-white/24">
                      {item.number}
                    </p>
                    <p className={cn("mt-2 font-display text-xl font-semibold", selected ? "text-white" : "text-white/54")}>
                      {item.label}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/30">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.08}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={mode.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_88%_10%,rgba(41,214,255,.1),transparent_23rem),linear-gradient(145deg,rgba(124,92,255,.09),rgba(11,13,19,.95))] p-6 sm:p-8 lg:p-10"
              >
                <div className="page-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
                  <div>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#8be9ff]/20 bg-[#8be9ff]/7 text-[#8be9ff]">
                      <ModeIcon className="h-6 w-6" />
                    </span>
                    <p className="mt-8 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
                      {mode.label} with GridSpell
                    </p>
                    <h3 className="mt-5 max-w-[15ch] font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                      {mode.title}
                    </h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/42 sm:text-base sm:leading-8">
                      {mode.description}
                    </p>
                    <p className="mt-7 rounded-[1.25rem] border border-[#69e6ad]/14 bg-[#69e6ad]/5 p-4 text-sm leading-7 text-[#a9efc9]/76">
                      {mode.result}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[1.4rem] border border-white/[0.08] bg-black/15 p-5">
                      <p className="text-[0.54rem] uppercase tracking-[0.2em] text-white/24">
                        Recommended blueprint
                      </p>
                      <ol className="mt-5 grid gap-3">
                        {mode.blueprint.map((step, index) => (
                          <li key={step} className="flex items-center gap-3 text-sm text-white/52">
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/6 font-mono text-[0.55rem] text-[#8be9ff]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {relatedServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.022] p-4 text-sm text-white/48 transition hover:border-[#8be9ff]/22 hover:text-white"
                        >
                          <span>{service.shortTitle}</span>
                          <ArrowUpRight className="h-4 w-4 text-white/20 transition group-hover:text-[#8be9ff]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ProcessDashboard({ activeIndex }: { activeIndex: number }) {
  const step = processSteps[activeIndex] ?? processSteps[0];
  const progress = Math.round(((activeIndex + 1) / processSteps.length) * 100);

  return (
    <BrowserChrome label="portal.gridspell.studio/project/northstar">
      <div className="relative min-h-[31rem] overflow-hidden bg-[#090b11] p-5 sm:p-7">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.52rem] uppercase tracking-[0.22em] text-[#8be9ff]">
              Northstar Website Rebuild
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              {step.title}
            </h3>
          </div>
          <span className="rounded-full border border-[#69e6ad]/18 bg-[#69e6ad]/7 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-[#7aefb9]">
            In progress
          </span>
        </div>

        <div className="relative mt-7 grid gap-4 sm:grid-cols-[1.12fr_.88fr]">
          <div className="rounded-[1.35rem] border border-white/[0.08] bg-black/18 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.52rem] uppercase tracking-[0.19em] text-white/24">
                Project progress
              </p>
              <p className="font-mono text-xs text-[#8be9ff]">{progress}%</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
              />
            </div>
            <p className="mt-6 text-sm leading-7 text-white/44">{step.text}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-4">
              <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/23">Next decision</p>
              <p className="mt-3 text-sm font-medium text-white/68">
                {activeIndex < 2 ? "Confirm project direction" : activeIndex < 4 ? "Review current deliverable" : "Approve launch readiness"}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-4">
              <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/23">Approval status</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#8be9ff]">
                <Clock3 className="h-4 w-4" />
                {activeIndex === 2 ? "Client review open" : "No action required"}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Files", `${activeIndex + 4} available`, Files],
            ["Messages", `${activeIndex + 1} updates`, MessageSquareText],
            ["Tasks", `${Math.max(1, 5 - activeIndex)} remaining`, CheckCircle2]
          ].map(([label, value, Icon]) => {
            const FeatureIcon = Icon as IconComponent;
            return (
              <div key={String(label)} className="rounded-xl border border-white/[0.07] bg-white/[0.022] p-4">
                <FeatureIcon className="h-4 w-4 text-[#8be9ff]" />
                <p className="mt-4 text-[0.5rem] uppercase tracking-[0.18em] text-white/22">{String(label)}</p>
                <p className="mt-2 text-xs font-medium text-white/56">{String(value)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </BrowserChrome>
  );
}

function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % processSteps.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isInView, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative scroll-mt-24 border-y border-white/[0.07] bg-white/[0.012] py-24 sm:py-28 lg:py-36"
    >
      <div className="page-grid pointer-events-none absolute inset-0 opacity-18" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-14 xl:grid-cols-[0.72fr_1.28fr] xl:items-center">
          <div>
            <SectionHeading
              eyebrow="The process"
              title="A clear process. A visible project."
              description="Every phase has a decision, a deliverable, and a visible path forward. The client workspace keeps the full project organized between meetings."
            />
            <Reveal className="mt-9 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {processSteps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition",
                    index === activeIndex
                      ? "border-[#8be9ff]/25 bg-[#8be9ff]/7"
                      : "border-transparent text-white/34 hover:border-white/[0.08] hover:bg-white/[0.025] hover:text-white/62"
                  )}
                >
                  <span className={cn("font-mono text-[0.58rem]", index === activeIndex ? "text-[#8be9ff]" : "text-white/22")}>
                    {step.number}
                  </span>
                  <span className={cn("text-sm font-medium", index === activeIndex ? "text-white" : "")}>{step.title}</span>
                  <span className={cn("ml-auto h-px transition-all", index === activeIndex ? "w-8 bg-[#8be9ff]" : "w-3 bg-white/10")} />
                </button>
              ))}
            </Reveal>
            <Reveal className="mt-8">
              <Link
                href="/process"
                className="inline-flex items-center gap-3 border-b border-[#8be9ff]/45 pb-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#8be9ff] transition hover:border-[#8be9ff]"
              >
                Explore the complete process <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ProcessDashboard activeIndex={activeIndex} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PortalPreview({ mode }: { mode: PortalMode }) {
  const reduceMotion = useReducedMotion();
  const view = portalViews[mode];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrowserChrome label={mode === "client" ? "client.gridspell.studio" : "admin.gridspell.studio"}>
          <div className="relative min-h-[35rem] overflow-hidden bg-[#090b11] p-5 sm:p-7 lg:p-8">
            <div className="page-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />
            <div className="relative flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[0.54rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                  {view.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  {view.title}
                </h3>
              </div>
              <div className="flex gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/35">
                  <SearchCheck className="h-4 w-4" />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/35">
                  <MessageSquareText className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="relative mt-7 grid gap-4 sm:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-[1.35rem] border border-white/[0.08] bg-black/18 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">
                    {mode === "client" ? "Project progress" : "Studio capacity"}
                  </p>
                  <p className="font-mono text-xs text-[#8be9ff]">{view.progress}%</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    animate={{ width: `${view.progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                  />
                </div>
                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/22">
                      {mode === "client" ? "Current phase" : "Projects"}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/64">{view.primaryMetric}</p>
                  </div>
                  <div>
                    <p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/22">
                      {mode === "client" ? "Next milestone" : "Pending"}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/64">{view.secondaryMetric}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-[#7c5cff]/18 bg-[#7c5cff]/7 p-5">
                <p className="text-[0.52rem] uppercase tracking-[0.18em] text-[#b7a7ff]">
                  {mode === "client" ? "Next action" : "Priority"}
                </p>
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                  {mode === "client" ? "Review homepage direction" : "Reply to two client messages"}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#8be9ff]">
                  Open workspace <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <div className="relative mt-4 grid gap-4 sm:grid-cols-2">
              {view.cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="rounded-[1.25rem] border border-white/[0.075] bg-white/[0.022] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.5rem] uppercase tracking-[0.17em] text-white/22">{card.label}</p>
                        <p className="mt-3 text-sm font-medium text-white/66">{card.value}</p>
                        <p className="mt-2 text-xs leading-5 text-white/28">{card.detail}</p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-black/15 text-[#8be9ff]">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BrowserChrome>
      </motion.div>
    </AnimatePresence>
  );
}

function PortalSection() {
  const [mode, setMode] = useState<PortalMode>("client");

  return (
    <section id="portal" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[0.67fr_1.33fr] xl:items-center">
          <div>
            <SectionHeading
              eyebrow="Client experience"
              title="The work stays organized after the meeting ends."
              description="GridSpell projects use a focused workspace for status, tasks, approvals, files, messages, billing, and support. Switch views to see both sides of the system."
            />
            <Reveal className="mt-8 flex w-fit rounded-full border border-white/[0.09] bg-white/[0.025] p-1">
              {(["client", "admin"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={cn(
                    "relative min-h-11 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.16em] transition",
                    mode === item ? "text-white" : "text-white/32 hover:text-white/60"
                  )}
                >
                  {mode === item ? (
                    <motion.span
                      layoutId="portal-home-toggle"
                      className="absolute inset-0 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/8"
                      transition={{ type: "spring", stiffness: 350, damping: 31 }}
                    />
                  ) : null}
                  <span className="relative">{item} view</span>
                </button>
              ))}
            </Reveal>
            <Reveal className="mt-8">
              <Link
                href="/process#client-workspace"
                className="inline-flex items-center gap-3 border-b border-[#8be9ff]/45 pb-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#8be9ff]"
              >
                See how projects are managed <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <PortalPreview mode={mode} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function getPricingRecommendation(pages: PageScope, type: ProductType): PricingPackageId {
  if (pages === "10+" || type === "portal") return "custom";
  if (pages === "6-10" || type === "cms") return "growth";
  return "launch";
}

function PricingSection() {
  const [pages, setPages] = useState<PageScope>("1-5");
  const [type, setType] = useState<ProductType>("website");
  const reduceMotion = useReducedMotion();

  const packageId = getPricingRecommendation(pages, type);
  const selectedPackage = packages.find((item) => item.id === packageId) ?? packages[0];
  const estimate = useMemo(() => {
    let low = selectedPackage.startingPrice;
    if (pages === "6-10" && packageId === "launch") low += 1700;
    if (pages === "10+" && packageId !== "custom") low += 3000;
    if (type === "cms" && packageId === "launch") low += 750;
    if (type === "portal" && packageId !== "custom") low += 4000;
    const high = low + Math.max(1000, Math.round((low * 0.18) / 50) * 50);
    return { low, high };
  }, [packageId, pages, selectedPackage.startingPrice, type]);

  const formatter = useMemo(
    () => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
    []
  );

  const pricingHref = `/pricing?pages=${encodeURIComponent(pages)}&type=${type}&package=${packageId}#estimate-builder`;

  return (
    <section id="pricing" className="relative scroll-mt-24 border-y border-white/[0.07] bg-white/[0.012] py-24 sm:py-28 lg:py-36">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-18" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Investment"
          title="Get a useful starting range."
          description="Answer two quick questions for a recommended starting package, then continue to the complete estimator for a more accurate planning range."
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-[1.05fr_.95fr] xl:items-stretch">
          <Reveal className="rounded-[2rem] border border-white/[0.09] bg-[#0b0d13]/90 p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
                01 · Page scope
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                How many pages do you expect?
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {(["1-5", "6-10", "10+"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPages(option)}
                    className={cn(
                      "min-h-20 rounded-[1.15rem] border px-4 text-sm font-medium transition",
                      pages === option
                        ? "border-[#8be9ff]/35 bg-[#8be9ff]/7 text-white"
                        : "border-white/[0.08] bg-white/[0.022] text-white/38 hover:border-white/[0.16] hover:text-white/65"
                    )}
                  >
                    {option === "1-5" ? "1–5 pages" : option === "6-10" ? "6–10 pages" : "10+ pages"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 border-t border-white/[0.08] pt-8">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
                02 · Project type
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                What needs to be built?
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {([
                  ["website", "Website", PanelTop],
                  ["cms", "Website + CMS", Layers3],
                  ["portal", "Portal / system", LayoutDashboard]
                ] as const).map(([value, label, Icon]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setType(value)}
                    className={cn(
                      "flex min-h-24 flex-col items-start justify-between rounded-[1.15rem] border p-4 text-left transition",
                      type === value
                        ? "border-[#8be9ff]/35 bg-[#8be9ff]/7 text-white"
                        : "border-white/[0.08] bg-white/[0.022] text-white/38 hover:border-white/[0.16] hover:text-white/65"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", type === value ? "text-[#8be9ff]" : "text-white/25")} />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_88%_8%,rgba(41,214,255,.12),transparent_22rem),linear-gradient(145deg,rgba(124,92,255,.13),rgba(11,13,19,.96))] p-6 shadow-[0_24px_90px_rgba(0,0,0,.3)] sm:p-8 lg:p-10">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">
                Recommended starting point
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${packageId}-${pages}-${type}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                >
                  <h3 className="mt-6 font-display text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                    {selectedPackage.name}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white/42">{selectedPackage.summary}</p>

                  <div className="mt-9 border-t border-white/[0.08] pt-8">
                    <p className="text-[0.54rem] uppercase tracking-[0.2em] text-white/24">
                      Estimated investment
                    </p>
                    <p className="mt-4 font-display text-[clamp(2.2rem,5vw,4.6rem)] font-semibold leading-none tracking-[-0.07em] text-white">
                      {formatter.format(estimate.low)}–{formatter.format(estimate.high)}
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-sm text-white/42">
                      <Clock3 className="h-4 w-4 text-[#8be9ff]" />
                      Typical timeline: {selectedPackage.timeline}
                    </div>
                  </div>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {selectedPackage.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-white/46">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <ActionLink href={pricingHref} className="mt-9 w-full sm:w-auto">
                Build a complete estimate <ArrowRight className="h-4 w-4" />
              </ActionLink>
              <p className="mt-4 text-xs leading-6 text-white/25">
                This is a planning range. Final pricing is confirmed after scope review.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PrincipleVisual({ visual }: { visual: (typeof proofPrinciples)[number]["visual"] }) {
  if (visual === "responsive") {
    return (
      <div className="relative h-28 overflow-hidden rounded-xl border border-white/[0.07] bg-black/15 p-3">
        <div className="h-full rounded-lg border border-[#8be9ff]/18 bg-[#8be9ff]/5 p-3">
          <div className="h-2 w-14 rounded-full bg-white/14" />
          <div className="mt-3 h-2 w-3/4 rounded-full bg-white/8" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/5" />
        </div>
        <div className="absolute bottom-2 right-3 h-20 w-12 rounded-lg border border-[#7c5cff]/28 bg-[#10131d] p-2 shadow-xl">
          <div className="h-1.5 w-5 rounded-full bg-white/12" />
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/7" />
        </div>
      </div>
    );
  }

  if (visual === "performance") {
    return (
      <div className="flex h-28 items-center justify-between rounded-xl border border-white/[0.07] bg-black/15 p-4">
        {[98, 100, 96].map((value, index) => (
          <div key={value + index} className="text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-[#69e6ad]/24 bg-[#69e6ad]/6 font-mono text-xs text-[#7aefb9]">
              {value}
            </div>
            <p className="mt-2 text-[0.46rem] uppercase tracking-[0.14em] text-white/22">
              {index === 0 ? "Speed" : index === 1 ? "Access" : "SEO"}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "delivery") {
    return (
      <div className="grid h-28 gap-2 rounded-xl border border-white/[0.07] bg-black/15 p-3">
        {["Discovery complete", "Design in review", "Build scheduled"].map((label, index) => (
          <div key={label} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3">
            <span className={cn("h-2 w-2 rounded-full", index === 0 ? "bg-[#69e6ad]" : index === 1 ? "bg-[#8be9ff]" : "bg-white/15")} />
            <span className="text-[0.62rem] text-white/38">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-28 items-center justify-center rounded-xl border border-white/[0.07] bg-black/15">
      <span className="grid h-12 w-12 place-items-center rounded-xl border border-[#8be9ff]/22 bg-[#8be9ff]/7 text-[#8be9ff]">
        <Workflow className="h-5 w-5" />
      </span>
      {["CRM", "Email", "Booking"].map((label, index) => (
        <span
          key={label}
          className={cn(
            "absolute rounded-full border border-white/[0.08] bg-[#10131b] px-3 py-1.5 text-[0.5rem] uppercase tracking-[0.14em] text-white/32",
            index === 0 && "left-3 top-3",
            index === 1 && "right-3 top-4",
            index === 2 && "bottom-3 left-8"
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow="Why GridSpell"
          title="Distinct design. Practical delivery."
          description="The experience should be memorable, but the system behind it must remain clear, reliable, and useful after launch."
          align="center"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proofPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={index * 0.06}>
                <article className="h-full rounded-[1.7rem] border border-white/[0.085] bg-white/[0.022] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/22 hover:bg-white/[0.04] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#8be9ff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[0.56rem] text-white/20">{principle.number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 min-h-24 text-sm leading-7 text-white/38">{principle.text}</p>
                  <div className="mt-6">
                    <PrincipleVisual visual={principle.visual} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="start" className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.07] py-24 sm:py-28 lg:py-40">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-24" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[74rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/11 blur-[180px]" aria-hidden="true" />
      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.3rem] border border-[#8be9ff]/17 bg-[radial-gradient(circle_at_88%_8%,rgba(41,214,255,.14),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,.13),rgba(11,13,19,.96))] p-7 text-center shadow-[0_35px_120px_rgba(0,0,0,.32)] sm:p-12 lg:p-16">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#8be9ff]/22 bg-[#8be9ff]/8 text-[#8be9ff]">
              <Sparkles className="h-6 w-6" />
            </span>
            <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              Start something memorable
            </p>
            <h2 className="mx-auto mt-6 max-w-[16ch] text-balance font-display text-[clamp(3rem,6.5vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
              Ready to build something worth remembering?
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
              Tell GridSpell what you are building. You will receive a recommended scope,
              timeline, and practical next step.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ActionLink href="/start-project" className="w-full sm:w-auto">
                Start your project <ArrowUpRight className="h-4 w-4" />
              </ActionLink>
              <Link
                href="/pricing"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/58 transition hover:-translate-y-0.5 hover:border-white/22 hover:text-white sm:w-auto"
              >
                Explore pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-2 border-t border-white/[0.08] pt-8 text-xs text-white/28 sm:flex-row sm:gap-5">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#8be9ff]" />
                Available for select projects
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />
              <span>Toronto · Working remotely across Canada</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SceneNavigation() {
  return (
    <nav
      aria-label="Homepage sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-[#090b11]/72 p-2 shadow-2xl backdrop-blur-xl">
        {pageSections.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center justify-end gap-3 rounded-xl px-3 py-2.5 text-right"
          >
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/25 opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:text-[#8be9ff] group-hover:opacity-100">
              {label}
            </span>
            <span className="font-mono text-[0.52rem] text-white/22 transition group-hover:text-[#8be9ff]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-3 bg-white/12 transition-all duration-300 group-hover:w-7 group-hover:bg-[#8be9ff]" />
          </a>
        ))}
      </div>
    </nav>
  );
}

export function HomeExperienceV2() {
  const [heroMode, setHeroMode] = useState<HeroModeId>("websites");
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-x-clip bg-[#07080c]">
      <SceneNavigation />

      <section id="intro" className="relative min-h-svh scroll-mt-24 overflow-hidden border-b border-white/[0.07] pt-28 sm:pt-32 lg:pt-36">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-38" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-12 h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/14 blur-[170px]"
          animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -12, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-12rem] top-[-3rem] h-[38rem] w-[38rem] rounded-full bg-[#29d6ff]/10 blur-[170px]"
          animate={reduceMotion ? undefined : { x: [0, -15, 0], y: [0, 14, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center pb-14">
          <div className="grid gap-12 xl:grid-cols-[1.02fr_.98fr] xl:items-center">
            <div>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff] sm:text-xs"
              >
                Premium websites · portals · digital systems
              </motion.p>
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-[10.6ch] text-balance font-display text-[clamp(4rem,8vw,9.4rem)] font-semibold leading-[0.8] tracking-[-0.082em] text-white"
              >
                Built on structure.
                <span className="block bg-gradient-to-r from-[#a99aff] via-[#7eb3ff] to-[#8be9ff] bg-clip-text text-transparent">
                  Designed to captivate.
                </span>
              </motion.h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.17 }}
                className="mt-8 max-w-2xl text-base leading-8 text-white/46 sm:text-xl sm:leading-9"
              >
                GridSpell creates premium websites, dashboards, and digital systems that
                make ambitious businesses feel established, valuable, and ready to grow.
              </motion.p>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.24 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <ActionLink href="/start-project" className="min-h-14 w-full px-7 sm:w-auto">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </ActionLink>
                <Link
                  href="#work"
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-7 text-sm font-semibold text-white/58 transition hover:-translate-y-0.5 hover:border-white/22 hover:text-white sm:w-auto"
                >
                  Explore the studio <ArrowDown className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.34 }}
                className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              >
                {heroModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setHeroMode(mode.id)}
                    className={cn(
                      "rounded-full border px-4 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] transition sm:text-xs",
                      heroMode === mode.id
                        ? "border-[#8be9ff]/30 bg-[#8be9ff]/8 text-[#8be9ff]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/30 hover:border-white/[0.16] hover:text-white/60"
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroVisual activeMode={heroMode} />
            </motion.div>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-10 text-[0.58rem] uppercase tracking-[0.3em] text-white/22">
            <ArrowDown className="h-4 w-4" />
            Scroll through the complete studio experience
          </div>
        </Container>
      </section>

      <WorkSection />
      <CapabilitiesSection />
      <ProcessSection />
      <PortalSection />
      <PricingSection />
      <ProofSection />
      <FinalCta />
    </main>
  );
}
