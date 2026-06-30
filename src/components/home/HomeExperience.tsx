"use client";

import Link from "next/link";
import { useRef, useState, type ComponentType } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Files,
  Gauge,
  Layers3,
  LayoutDashboard,
  MessageSquareText,
  PanelTop,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow
} from "lucide-react";

import { StaticWorkGallery, WorkCarouselScene } from "@/components/home/WorkCarouselScene";
import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { packages, type PricingPackageId } from "@/config/packages";
import { processSteps } from "@/config/process";
import { cn } from "@/lib/utils";

const SCENE_LABELS = [
  "Introduction",
  "Selected work",
  "Capabilities",
  "Process",
  "Client experience",
  "Investment",
  "Why GridSpell",
  "Start a project"
] as const;

const SCENE_COUNT = SCENE_LABELS.length;
const TOTAL_SCROLL_UNITS = 12;

type SceneVariant =
  | "hero"
  | "rise"
  | "slide-left"
  | "slide-right"
  | "perspective"
  | "fan"
  | "zoom";

type TransformState = {
  x: number;
  y: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  blur: number;
};

type ScenePosition = "enter" | "active" | "exit";

type SceneDefinition = {
  label: (typeof SCENE_LABELS)[number];
  anchor: number;
  activeUntil: number;
  input: number[];
  opacity: number[];
  positions: ScenePosition[];
};

type IconComponent = ComponentType<{ className?: string }>;
type CapabilityId = "build" | "rebuild" | "scale";
type PortalMode = "client" | "admin";
type PageScope = "1-5" | "6-10" | "10+";
type ProductType = "website" | "cms" | "portal";

const SCENE_DEFINITIONS: SceneDefinition[] = [
  {
    label: "Introduction",
    anchor: 0,
    activeUntil: 0.075,
    input: [0, 0.03, 0.095],
    opacity: [1, 1, 0],
    positions: ["active", "active", "exit"]
  },
  {
    label: "Selected work",
    anchor: 0.095,
    activeUntil: 0.455,
    input: [0.06, 0.095, 0.425, 0.485],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Capabilities",
    anchor: 0.505,
    activeUntil: 0.575,
    input: [0.465, 0.505, 0.555, 0.605],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Process",
    anchor: 0.625,
    activeUntil: 0.695,
    input: [0.585, 0.625, 0.675, 0.725],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Client experience",
    anchor: 0.745,
    activeUntil: 0.81,
    input: [0.705, 0.745, 0.79, 0.83],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Investment",
    anchor: 0.85,
    activeUntil: 0.9,
    input: [0.81, 0.85, 0.885, 0.925],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Why GridSpell",
    anchor: 0.94,
    activeUntil: 0.97,
    input: [0.91, 0.94, 0.962, 0.985],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Start a project",
    anchor: 0.985,
    activeUntil: 1,
    input: [0.965, 0.985, 1],
    opacity: [0, 1, 1],
    positions: ["enter", "active", "active"]
  }
];

const SCENE_VARIANTS: Record<
  SceneVariant,
  { enter: TransformState; active: TransformState; exit: TransformState }
> = {
  hero: {
    enter: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 0, y: -84, scale: 0.94, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 12 }
  },
  rise: {
    enter: { x: 0, y: 90, scale: 0.965, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 8 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 0, y: -64, scale: 0.975, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 8 }
  },
  "slide-left": {
    enter: { x: 150, y: 20, scale: 0.97, rotateX: 0, rotateY: -4, rotateZ: 0, blur: 9 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: -120, y: -16, scale: 0.97, rotateX: 0, rotateY: 4, rotateZ: 0, blur: 9 }
  },
  "slide-right": {
    enter: { x: -150, y: 20, scale: 0.97, rotateX: 0, rotateY: 4, rotateZ: 0, blur: 9 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 120, y: -16, scale: 0.97, rotateX: 0, rotateY: -4, rotateZ: 0, blur: 9 }
  },
  perspective: {
    enter: { x: 0, y: 120, scale: 0.88, rotateX: 13, rotateY: 0, rotateZ: 0, blur: 10 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 0, y: -90, scale: 0.94, rotateX: -8, rotateY: 0, rotateZ: 0, blur: 10 }
  },
  fan: {
    enter: { x: 0, y: 95, scale: 0.9, rotateX: 0, rotateY: 0, rotateZ: -2.5, blur: 8 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 0, y: -72, scale: 0.95, rotateX: 0, rotateY: 0, rotateZ: 2.5, blur: 9 }
  },
  zoom: {
    enter: { x: 0, y: 42, scale: 0.74, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 14 },
    active: { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 },
    exit: { x: 0, y: -18, scale: 1.04, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 4 }
  }
};

const capabilityModes: readonly {
  id: CapabilityId;
  label: string;
  title: string;
  text: string;
  result: string;
  steps: readonly string[];
  icon: IconComponent;
}[] = [
  {
    id: "build",
    label: "Build",
    title: "Launch a professional website or digital platform.",
    text: "Create a strong foundation with clear positioning, custom design, reliable development, and a practical launch plan.",
    result: "A credible, conversion-ready digital presence built for the next stage of the business.",
    steps: ["Strategy and sitemap", "Custom visual direction", "Responsive Next.js build", "Analytics and lead capture"],
    icon: Rocket
  },
  {
    id: "rebuild",
    label: "Rebuild",
    title: "Replace an outdated website with a stronger system.",
    text: "Preserve what still works, remove the friction, and rebuild around the quality and direction of the current business.",
    result: "A modern website aligned with the value, maturity, and ambition of the company.",
    steps: ["Current-site audit", "Information architecture", "Content and redirect plan", "Performance-focused rebuild"],
    icon: Sparkles
  },
  {
    id: "scale",
    label: "Scale",
    title: "Add portals, content systems, integrations, and automation.",
    text: "Move beyond a brochure website with connected workflows and product-like experiences for customers and teams.",
    result: "A connected digital system that handles real work instead of creating more administration.",
    steps: ["Authentication and permissions", "CMS or structured data", "Workflow integrations", "Ongoing improvements"],
    icon: Layers3
  }
] as const;

const portalViews = {
  client: {
    eyebrow: "Client workspace",
    title: "Northstar Website Rebuild",
    progress: 64,
    cards: [
      [CheckCircle2, "Approval", "Homepage direction", "Review typography, layout, and motion"],
      [Files, "Files", "12 project assets", "Copy, images, and approved deliverables"],
      [MessageSquareText, "Latest message", "Design review is ready", "GridSpell · 26 minutes ago"],
      [CircleDollarSign, "Open invoice", "CAD $3,125", "Due in 7 days"]
    ]
  },
  admin: {
    eyebrow: "Admin operations",
    title: "GridSpell Studio",
    progress: 78,
    cards: [
      [LayoutDashboard, "Active projects", "4 workspaces", "2 design · 1 build · 1 launch"],
      [Target, "New leads", "3 opportunities", "CAD $21,000 pipeline"],
      [MessageSquareText, "Client messages", "2 need a reply", "Northstar and Pure Timepieces"],
      [CircleDollarSign, "Outstanding", "CAD $8,750", "Across 3 open invoices"]
    ]
  }
} as const;

const proofItems: readonly {
  title: string;
  text: string;
  icon: IconComponent;
}[] = [
  {
    title: "Custom-built",
    text: "No purchased website templates. The structure and visual system are shaped around the business.",
    icon: Sparkles
  },
  {
    title: "Performance-first",
    text: "Responsive, accessible, technically structured, and designed to remain fast as the site grows.",
    icon: Gauge
  },
  {
    title: "Clear delivery",
    text: "Defined phases, visible decisions, tracked approvals, and one place for project communication.",
    icon: CheckCircle2
  },
  {
    title: "Connected systems",
    text: "Forms, analytics, CRM, booking, payments, portals, and automation work together.",
    icon: Workflow
  }
] as const;

function sceneTimeline(index: number) {
  return SCENE_DEFINITIONS[index];
}

function getActiveScene(progress: number) {
  const index = SCENE_DEFINITIONS.findIndex((scene) => progress <= scene.activeUntil);
  return index === -1 ? SCENE_COUNT - 1 : index;
}

function SceneFrame({
  index,
  active,
  progress,
  variant,
  children,
  className
}: {
  index: number;
  active: boolean;
  progress: MotionValue<number>;
  variant: SceneVariant;
  children: React.ReactNode;
  className?: string;
}) {
  const timeline = sceneTimeline(index);
  const states = SCENE_VARIANTS[variant];
  const values = timeline.positions.map((position) => states[position]);

  const opacity = useTransform(progress, timeline.input, timeline.opacity);
  const x = useTransform(progress, timeline.input, values.map((value) => value.x));
  const y = useTransform(progress, timeline.input, values.map((value) => value.y));
  const scale = useTransform(progress, timeline.input, values.map((value) => value.scale));
  const rotateX = useTransform(progress, timeline.input, values.map((value) => value.rotateX));
  const rotateY = useTransform(progress, timeline.input, values.map((value) => value.rotateY));
  const rotateZ = useTransform(progress, timeline.input, values.map((value) => value.rotateZ));
  const filter = useTransform(progress, timeline.input, values.map((value) => `blur(${value.blur}px)`));

  return (
    <motion.section
      className={cn(
        "absolute inset-0 flex items-center overflow-clip pt-24",
        active ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      style={{
        opacity,
        x,
        y,
        scale,
        rotateX,
        rotateY,
        rotateZ,
        filter,
        transformPerspective: 1600,
        transformOrigin: "50% 50%",
        willChange: "opacity, transform, filter"
      }}
      aria-hidden={!active}
      inert={!active}
    >
      {children}
    </motion.section>
  );
}

function GridSpellG({ outline = false, className }: { outline?: boolean; className?: string }) {
  const gradientId = outline ? "gridspell-g-gradient-outline" : "gridspell-g-gradient-main";
  const glowId = outline ? "gridspell-g-glow-outline" : "gridspell-g-glow-main";
  const strokeWidth = outline ? 56 : 150;

  return (
    <svg viewBox="0 0 1000 1000" className={cn("h-full w-full", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="180" y1="170" x2="835" y2="810" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9D87FF" />
          <stop offset="38%" stopColor="#7C5CFF" />
          <stop offset="72%" stopColor="#67AEFF" />
          <stop offset="100%" stopColor="#29D6FF" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={outline ? 4 : 10} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g opacity={outline ? 0.72 : 1} filter={`url(#${glowId})`}>
        <path d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M580 560 H792" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function SharedBackground({ progress }: { progress: MotionValue<number> }) {
  const mainRotate = useTransform(progress, [0, 0.45, 1], [-9, 4, 12]);
  const mainScale = useTransform(progress, [0, 0.35, 0.7, 1], [1, 1.06, 0.96, 1.11]);
  const mainX = useTransform(progress, [0, 0.45, 1], ["0%", "-4%", "4%"]);
  const mainY = useTransform(progress, [0, 0.5, 1], ["0%", "5%", "-2%"]);
  const outlineRotate = useTransform(progress, [0, 0.5, 1], [8, -4, -12]);
  const outlineScale = useTransform(progress, [0, 0.4, 1], [1.03, 1.08, 1.01]);
  const outlineX = useTransform(progress, [0, 0.5, 1], ["6%", "-2%", "-8%"]);
  const outlineY = useTransform(progress, [0, 0.5, 1], ["-2%", "2%", "-5%"]);
  const secondaryX = useTransform(progress, [0, 1], ["18%", "-16%"]);
  const secondaryOpacity = useTransform(progress, [0, 0.45, 1], [0.25, 0.55, 0.3]);
  const outlineOpacity = useTransform(progress, [0, 0.35, 0.7, 1], [0.26, 0.52, 0.42, 0.28]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="page-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(124,92,255,0.17),transparent_35rem),radial-gradient(circle_at_84%_78%,rgba(41,214,255,0.07),transparent_30rem)]" />
      <motion.div className="home-shared-g-outline absolute right-[-2vw] top-[-9vh] h-[min(82vw,980px)] w-[min(82vw,980px)]" style={{ rotate: outlineRotate, scale: outlineScale, x: outlineX, y: outlineY, opacity: outlineOpacity }}>
        <GridSpellG outline />
      </motion.div>
      <motion.div className="home-shared-g absolute right-[-7vw] top-[-11vh] h-[min(84vw,1020px)] w-[min(84vw,1020px)]" style={{ rotate: mainRotate, scale: mainScale, x: mainX, y: mainY }}>
        <GridSpellG />
      </motion.div>
      <motion.div className="absolute right-[9%] top-[19%] h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/10 blur-[160px]" style={{ x: secondaryX, opacity: secondaryOpacity }} />
      <motion.div className="absolute bottom-[8%] right-[4%] h-[20rem] w-[20rem] rounded-full bg-[#29d6ff]/8 blur-[130px]" style={{ x: outlineX, opacity: secondaryOpacity }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07080c]/70 to-transparent" />
    </div>
  );
}

function SceneHeading({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: string; text: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">{eyebrow}</p>
      <h2 className="mt-5 text-balance font-display text-[clamp(3.1rem,5.4vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.066em] text-white">{title}</h2>
      <p className={cn("mt-6 max-w-3xl text-base leading-8 text-white/46 sm:text-lg", align === "center" && "mx-auto")}>{text}</p>
    </div>
  );
}

function HeroScene({ staticMode = false }: { staticMode?: boolean }) {
  return (
    <Container className={cn("flex flex-col justify-center pb-8 pt-24 sm:pt-28", staticMode ? "min-h-svh" : "h-full")}>
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">Premium websites · portals · digital systems</p>
      <h1 className="mt-6 max-w-[11.5ch] text-balance font-display text-[clamp(3.35rem,8.4vw,10rem)] font-semibold leading-[0.78] tracking-[-0.078em] text-white">
        Built on structure.
        <span className="block bg-gradient-to-r from-[#a99aff] via-[#7eb3ff] to-[#8be9ff] bg-clip-text text-transparent">Designed to captivate.</span>
      </h1>
      <div className="mt-8 grid w-full max-w-[1500px] gap-7 xl:grid-cols-[minmax(0,760px)_auto] xl:items-end">
        <p className="max-w-3xl text-lg leading-8 text-white/48 sm:text-xl sm:leading-9">GridSpell creates premium websites, client portals, dashboards, and connected digital systems that make ambitious businesses feel established, valuable, and ready to grow.</p>
        <div className="flex flex-col gap-3 sm:flex-row xl:justify-end">
          <ActionLink href="/start-project" className="min-h-14 px-7">Start a project <ArrowUpRight className="h-4 w-4" /></ActionLink>
          <ActionLink href="/work" className="min-h-14 border-white/[0.12] bg-none bg-white/[0.035] px-7 shadow-none hover:bg-white/[0.07]">Explore selected work <ArrowUpRight className="h-4 w-4" /></ActionLink>
        </div>
      </div>
      <div className="mt-9 flex flex-wrap gap-2">
        {["Websites", "Portals", "Automation", "Digital systems"].map((item) => (
          <span key={item} className="rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/38">{item}</span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 pt-8 text-[0.64rem] uppercase tracking-[0.34em] text-white/24"><ArrowDown className="h-4 w-4" />Scroll to change scene</div>
    </Container>
  );
}

function CapabilitiesScene() {
  const [selected, setSelected] = useState<CapabilityId>("build");
  const mode = capabilityModes.find((item) => item.id === selected) ?? capabilityModes[0];
  const ModeIcon = mode.icon;

  return (
    <Container className="grid h-full items-center gap-10 py-7 xl:grid-cols-[0.68fr_1.32fr]">
      <div>
        <SceneHeading eyebrow="Capabilities" title="Start with the outcome." text="Choose what needs to change. GridSpell assembles the right strategy, design, technology, and support around that goal." />
        <div className="mt-8 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
          {capabilityModes.map((item, index) => {
            const Icon = item.icon;
            const active = item.id === selected;
            return (
              <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={cn("flex items-center gap-4 rounded-2xl border p-4 text-left transition", active ? "border-[#8be9ff]/28 bg-[#8be9ff]/7" : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]")}>
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl border", active ? "border-[#8be9ff]/24 bg-[#8be9ff]/8 text-[#8be9ff]" : "border-white/[0.08] text-white/28")}><Icon className="h-4 w-4" /></span>
                <div><p className="font-mono text-[0.54rem] text-white/22">0{index + 1}</p><p className={cn("mt-1 text-sm font-medium", active ? "text-white" : "text-white/42")}>{item.label}</p></div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 2xl:p-10">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="grid h-13 w-13 place-items-center rounded-2xl border border-[#8be9ff]/20 bg-[#8be9ff]/7 text-[#8be9ff]"><ModeIcon className="h-5 w-5" /></span>
            <p className="mt-7 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">{mode.label} with GridSpell</p>
            <h3 className="mt-4 max-w-[14ch] font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white 2xl:text-5xl">{mode.title}</h3>
            <p className="mt-5 text-sm leading-7 text-white/42 2xl:text-base">{mode.text}</p>
            <p className="mt-6 rounded-xl border border-[#69e6ad]/14 bg-[#69e6ad]/5 p-4 text-sm leading-7 text-[#a9efc9]/72">{mode.result}</p>
          </div>
          <div className="rounded-[1.35rem] border border-white/[0.08] bg-black/15 p-5">
            <p className="text-[0.54rem] uppercase tracking-[0.2em] text-white/24">Recommended blueprint</p>
            <ol className="mt-5 grid gap-3">
              {mode.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3 text-sm text-white/52"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/6 font-mono text-[0.55rem] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
            <Link href="/services" className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8be9ff]">Explore services <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProcessScene() {
  return (
    <Container className="grid h-full items-center gap-10 py-7 xl:grid-cols-[0.64fr_1.36fr]">
      <div>
        <SceneHeading eyebrow="The process" title="A clear process. A visible project." text="Every phase has a decision, a deliverable, and a visible path forward. The client workspace keeps the project organized between meetings." />
        <Link href="/process" className="mt-8 inline-flex items-center gap-3 border-b border-[#8be9ff]/40 pb-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#8be9ff]">Explore the complete process <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6 2xl:p-8">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div><p className="text-[0.54rem] uppercase tracking-[0.22em] text-[#8be9ff]">Northstar Website Rebuild</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white">Project delivery</h3></div>
          <span className="rounded-full border border-[#69e6ad]/18 bg-[#69e6ad]/7 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-[#7aefb9]">In progress</span>
        </div>
        <div className="relative mt-5 grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <div className="rounded-[1.25rem] border border-white/[0.08] bg-black/15 p-5">
            <div className="flex items-center justify-between"><p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">Project progress</p><p className="font-mono text-xs text-[#8be9ff]">64%</p></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" /></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div><p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/22">Current phase</p><p className="mt-2 text-sm font-medium text-white/64">Interface design</p></div>
              <div><p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/22">Next decision</p><p className="mt-2 text-sm font-medium text-white/64">Approve homepage direction</p></div>
            </div>
          </div>
          <div className="grid gap-2">
            {processSteps.map((step, index) => (
              <div key={step.number} className={cn("grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-xl border px-3 py-3", index === 2 ? "border-[#8be9ff]/24 bg-[#8be9ff]/6" : "border-white/[0.07] bg-white/[0.02]")}>
                <span className={cn("grid h-8 w-8 place-items-center rounded-full border font-mono text-[0.55rem]", index < 2 ? "border-[#69e6ad]/22 bg-[#69e6ad]/6 text-[#7aefb9]" : index === 2 ? "border-[#8be9ff]/25 text-[#8be9ff]" : "border-white/[0.08] text-white/24")}>{index < 2 ? <Check className="h-3.5 w-3.5" /> : step.number}</span>
                <div><p className="text-sm font-medium text-white/64">{step.title}</p><p className="mt-1 line-clamp-1 text-xs text-white/26">{step.text}</p></div>
                <span className="text-[0.5rem] uppercase tracking-[0.14em] text-white/20">{index < 2 ? "Done" : index === 2 ? "Current" : "Next"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function PortalScene() {
  const [mode, setMode] = useState<PortalMode>("client");
  const view = portalViews[mode];

  return (
    <Container className="grid h-full items-center gap-10 py-7 xl:grid-cols-[0.67fr_1.33fr]">
      <div>
        <SceneHeading eyebrow="Client experience" title="The work stays organized after the meeting ends." text="Status, tasks, approvals, files, messages, billing, and support live in one focused workspace." />
        <div className="mt-8 flex w-fit rounded-full border border-white/[0.09] bg-white/[0.025] p-1">
          {(["client", "admin"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setMode(item)} className={cn("rounded-full px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition", mode === item ? "border border-[#8be9ff]/20 bg-[#8be9ff]/8 text-white" : "text-white/30 hover:text-white/60")}>{item} view</button>
          ))}
        </div>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6 2xl:p-8">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div><p className="text-[0.54rem] uppercase tracking-[0.22em] text-[#8be9ff]">{view.eyebrow}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white">{view.title}</h3></div>
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#8be9ff]">{mode === "client" ? <PanelTop className="h-5 w-5" /> : <LayoutDashboard className="h-5 w-5" />}</span>
        </div>
        <div className="relative mt-5 grid gap-4 sm:grid-cols-[1.12fr_.88fr]">
          <div className="rounded-[1.25rem] border border-white/[0.08] bg-black/15 p-5"><div className="flex items-center justify-between"><p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/24">{mode === "client" ? "Project progress" : "Studio capacity"}</p><p className="font-mono text-xs text-[#8be9ff]">{view.progress}%</p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" style={{ width: `${view.progress}%` }} /></div><p className="mt-6 text-sm font-medium text-white/62">{mode === "client" ? "Current phase: Interface design" : "4 active projects · 2 approvals pending"}</p></div>
          <div className="rounded-[1.25rem] border border-[#7c5cff]/18 bg-[#7c5cff]/7 p-5"><p className="text-[0.52rem] uppercase tracking-[0.18em] text-[#b7a7ff]">{mode === "client" ? "Next action" : "Priority"}</p><p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">{mode === "client" ? "Review homepage direction" : "Reply to two client messages"}</p></div>
        </div>
        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          {view.cards.map(([Icon, label, value, detail]) => (
            <div key={label} className="rounded-[1.15rem] border border-white/[0.075] bg-white/[0.022] p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-[0.5rem] uppercase tracking-[0.17em] text-white/22">{label}</p><p className="mt-3 text-sm font-medium text-white/66">{value}</p><p className="mt-2 text-xs leading-5 text-white/28">{detail}</p></div><Icon className="h-4 w-4 shrink-0 text-[#8be9ff]" /></div></div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function recommendation(pages: PageScope, type: ProductType): PricingPackageId {
  if (pages === "10+" || type === "portal") return "custom";
  if (pages === "6-10" || type === "cms") return "growth";
  return "launch";
}

function PricingScene() {
  const [pages, setPages] = useState<PageScope>("1-5");
  const [type, setType] = useState<ProductType>("website");
  const packageId = recommendation(pages, type);
  const selectedPackage = packages.find((item) => item.id === packageId) ?? packages[0];
  const high = selectedPackage.startingPrice + Math.max(1000, Math.round((selectedPackage.startingPrice * 0.18) / 50) * 50);
  const money = (value: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);

  return (
    <Container className="grid h-full items-center gap-10 py-7 xl:grid-cols-[0.68fr_1.32fr]">
      <div>
        <SceneHeading eyebrow="Investment" title="Get a useful starting range." text="Answer two quick questions for a recommended starting package, then continue to the complete estimator." />
        <Link href={`/pricing?pages=${encodeURIComponent(pages)}&type=${type}&package=${packageId}#estimate-builder`} className="mt-8 inline-flex items-center gap-3 border-b border-[#8be9ff]/40 pb-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#8be9ff]">Build a complete estimate <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.03fr_.97fr]">
        <div className="glass-panel rounded-[1.8rem] p-5 sm:p-6">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">01 · Page scope</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {(["1-5", "6-10", "10+"] as const).map((option) => (
              <button key={option} type="button" onClick={() => setPages(option)} className={cn("min-h-14 rounded-xl border px-3 text-xs font-medium transition", pages === option ? "border-[#8be9ff]/30 bg-[#8be9ff]/7 text-white" : "border-white/[0.08] bg-white/[0.02] text-white/34")}>{option === "1-5" ? "1–5" : option === "6-10" ? "6–10" : "10+"}</button>
            ))}
          </div>
          <p className="mt-7 text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">02 · Project type</p>
          <div className="mt-4 grid gap-2">
            {([["website", "Website", PanelTop], ["cms", "Website + CMS", Layers3], ["portal", "Portal / system", LayoutDashboard]] as const).map(([value, label, Icon]) => (
              <button key={value} type="button" onClick={() => setType(value)} className={cn("flex min-h-14 items-center gap-3 rounded-xl border px-4 text-left text-sm transition", type === value ? "border-[#8be9ff]/30 bg-[#8be9ff]/7 text-white" : "border-white/[0.08] bg-white/[0.02] text-white/34")}><Icon className="h-4 w-4 text-[#8be9ff]" />{label}</button>
            ))}
          </div>
        </div>
        <div className="rounded-[1.8rem] border border-[#8be9ff]/18 bg-[linear-gradient(145deg,rgba(124,92,255,.14),rgba(11,13,19,.95))] p-5 sm:p-6">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">Recommended starting point</p>
          <h3 className="mt-5 font-display text-5xl font-semibold tracking-[-0.07em] text-white">{selectedPackage.name}</h3>
          <p className="mt-4 text-sm leading-7 text-white/40">{selectedPackage.summary}</p>
          <div className="mt-6 border-t border-white/[0.08] pt-6"><p className="text-[0.5rem] uppercase tracking-[0.18em] text-white/24">Estimated investment</p><p className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-white 2xl:text-4xl">{money(selectedPackage.startingPrice)}–{money(high)}</p><p className="mt-4 flex items-center gap-2 text-sm text-white/40"><Clock3 className="h-4 w-4 text-[#8be9ff]" />{selectedPackage.timeline}</p></div>
          <ul className="mt-6 grid gap-2">{selectedPackage.features.slice(0, 3).map((feature) => <li key={feature} className="flex gap-2.5 text-xs leading-5 text-white/48"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" />{feature}</li>)}</ul>
        </div>
      </div>
    </Container>
  );
}

function ProofScene() {
  return (
    <Container className="flex h-full flex-col justify-center py-7">
      <SceneHeading eyebrow="Why GridSpell" title="Distinct design. Practical delivery." text="The experience should be memorable, but the system behind it must remain clear, reliable, and useful after launch." align="center" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {proofItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-[1.6rem] border border-white/[0.085] bg-white/[0.025] p-5 2xl:p-6"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#8be9ff]"><Icon className="h-5 w-5" /></span><span className="font-mono text-[0.56rem] text-white/20">0{index + 1}</span></div><h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.045em] text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/38">{item.text}</p></article>
          );
        })}
      </div>
    </Container>
  );
}

function FinalScene() {
  return (
    <Container className="relative flex h-full flex-col items-center justify-center py-8 text-center">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/16 blur-[150px]" />
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">Start something memorable</p>
      <h2 className="mt-6 max-w-[13ch] text-balance font-display text-[clamp(3.8rem,7.4vw,8.8rem)] font-semibold leading-[0.84] tracking-[-0.072em] text-white">Ready to build something worth remembering?</h2>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/44">Tell GridSpell what you are building. You will receive a recommended scope, timeline, and practical next step.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ActionLink href="/start-project" className="min-h-14 px-8">Start your project <ArrowUpRight className="h-4 w-4" /></ActionLink><Link href="/pricing" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-7 text-sm font-semibold text-white/58 transition hover:text-white">Explore pricing <ArrowRight className="h-4 w-4" /></Link></div>
    </Container>
  );
}

function SceneRail({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <nav className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block" aria-label="Homepage scenes">
      <div className="grid gap-3">
        {SCENE_LABELS.map((label, index) => (
          <button key={label} type="button" onClick={() => onSelect(index)} className="group flex items-center justify-end gap-3" aria-label={`Go to ${label}`} aria-current={active === index ? "step" : undefined}>
            <span className={cn("text-[0.56rem] uppercase tracking-[0.24em] transition duration-300", active === index ? "text-white/62" : "text-white/0 group-hover:text-white/30")}>{label}</span>
            <span className={cn("h-px transition-all duration-300", active === index ? "w-9 bg-[#8be9ff]" : "w-3 bg-white/18 group-hover:w-5")} />
          </button>
        ))}
      </div>
    </nav>
  );
}

function DesktopPresentation() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(rawProgress, { stiffness: 125, damping: 32, mass: 0.28, restDelta: 0.0005 });
  const workRawProgress = useTransform(rawProgress, [0.095, 0.425], [0, 1], { clamp: true });
  const workProgress = useSpring(workRawProgress, { stiffness: 150, damping: 34, mass: 0.24, restDelta: 0.0005 });
  const [activeScene, setActiveScene] = useState(0);

  useMotionValueEvent(rawProgress, "change", (value) => {
    const next = getActiveScene(value);
    setActiveScene((current) => (current === next ? current : next));
  });

  function scrollToScene(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(0, track.offsetHeight - window.innerHeight);
    window.scrollTo({ top: trackTop + scrollableDistance * SCENE_DEFINITIONS[index].anchor, behavior: "smooth" });
  }

  return (
    <section ref={trackRef} className="home-presentation-track relative" style={{ height: `${TOTAL_SCROLL_UNITS * 100}dvh` }}>
      <div className="sticky top-0 h-dvh overflow-clip bg-[#07080c]">
        <SharedBackground progress={progress} />
        <SceneRail active={activeScene} onSelect={scrollToScene} />
        <SceneFrame index={0} active={activeScene === 0} progress={progress} variant="hero"><HeroScene /></SceneFrame>
        <SceneFrame index={1} active={activeScene === 1} progress={progress} variant="rise"><WorkCarouselScene progress={workProgress} /></SceneFrame>
        <SceneFrame index={2} active={activeScene === 2} progress={progress} variant="slide-left"><CapabilitiesScene /></SceneFrame>
        <SceneFrame index={3} active={activeScene === 3} progress={progress} variant="slide-right"><ProcessScene /></SceneFrame>
        <SceneFrame index={4} active={activeScene === 4} progress={progress} variant="perspective"><PortalScene /></SceneFrame>
        <SceneFrame index={5} active={activeScene === 5} progress={progress} variant="fan"><PricingScene /></SceneFrame>
        <SceneFrame index={6} active={activeScene === 6} progress={progress} variant="slide-left"><ProofScene /></SceneFrame>
        <SceneFrame index={7} active={activeScene === 7} progress={progress} variant="zoom"><FinalScene /></SceneFrame>
      </div>
    </section>
  );
}

function StaticHomepage() {
  return (
    <div className="home-static-layout relative overflow-hidden bg-[#07080c]">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-40" />
      <section className="relative"><HeroScene staticMode /></section>
      <section className="home-static-scene"><StaticWorkGallery /></section>
      <section className="home-static-scene"><CapabilitiesScene /></section>
      <section className="home-static-scene"><ProcessScene /></section>
      <section className="home-static-scene"><PortalScene /></section>
      <section className="home-static-scene"><PricingScene /></section>
      <section className="home-static-scene"><ProofScene /></section>
      <section className="home-static-scene min-h-[80svh]"><FinalScene /></section>
    </div>
  );
}

export function HomeExperience() {
  return (
    <div className="home-experience">
      <div className="home-presentation-only"><DesktopPresentation /></div>
      <div className="home-static-only"><StaticHomepage /></div>
    </div>
  );
}
