"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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
  ArrowUpRight,
  Check,
  CircleCheck,
  Files,
  Gauge,
  MessageSquareText
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { services } from "@/config/services";
import { processSteps } from "@/config/process";
import { packages } from "@/config/packages";
import { cn } from "@/lib/utils";
import { StaticWorkGallery, WorkCarouselScene } from "@/components/home/WorkCarouselScene";

const SCENE_LABELS = [
  "Introduction",
  "Selected work",
  "Capabilities",
  "Process",
  "Client experience",
  "Investment",
  "Start a project"
] as const;

const SCENE_COUNT = SCENE_LABELS.length;
const TOTAL_SCROLL_UNITS = 11;

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

const SCENE_DEFINITIONS: SceneDefinition[] = [
  {
    label: "Introduction",
    anchor: 0,
    activeUntil: 0.085,
    input: [0, 0.035, 0.105],
    opacity: [1, 1, 0],
    positions: ["active", "active", "exit"]
  },
  {
    label: "Selected work",
    anchor: 0.105,
    activeUntil: 0.515,
    input: [0.07, 0.105, 0.485, 0.53],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Capabilities",
    anchor: 0.54,
    activeUntil: 0.625,
    input: [0.5, 0.54, 0.59, 0.64],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Process",
    anchor: 0.65,
    activeUntil: 0.735,
    input: [0.61, 0.65, 0.7, 0.75],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Client experience",
    anchor: 0.76,
    activeUntil: 0.845,
    input: [0.72, 0.76, 0.81, 0.86],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Investment",
    anchor: 0.87,
    activeUntil: 0.94,
    input: [0.83, 0.87, 0.915, 0.955],
    opacity: [0, 1, 1, 0],
    positions: ["enter", "active", "active", "exit"]
  },
  {
    label: "Start a project",
    anchor: 0.965,
    activeUntil: 1,
    input: [0.925, 0.965, 1],
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
  const filter = useTransform(
    progress,
    timeline.input,
    values.map((value) => `blur(${value.blur}px)`)
  );

  return (
    <motion.section
      className={cn(
        "absolute inset-0 flex items-center overflow-clip",
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
    <svg
      viewBox="0 0 1000 1000"
      className={cn("h-full w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="180" y1="170" x2="835" y2="810" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9D87FF" />
          <stop offset="38%" stopColor="#7C5CFF" />
          <stop offset="72%" stopColor="#67AEFF" />
          <stop offset="100%" stopColor="#29D6FF" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={outline ? 4 : 10} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
            result="softGlow"
          />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={outline ? 0.72 : 1} filter={`url(#${glowId})`}>
        <path
          d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M580 560 H792"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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

      <motion.div
        className="home-shared-g-outline absolute right-[-2vw] top-[-9vh] h-[min(82vw,980px)] w-[min(82vw,980px)]"
        style={{ rotate: outlineRotate, scale: outlineScale, x: outlineX, y: outlineY, opacity: outlineOpacity }}
      >
        <GridSpellG outline />
      </motion.div>

      <motion.div
        className="home-shared-g absolute right-[-7vw] top-[-11vh] h-[min(84vw,1020px)] w-[min(84vw,1020px)]"
        style={{ rotate: mainRotate, scale: mainScale, x: mainX, y: mainY }}
      >
        <GridSpellG />
      </motion.div>

      <motion.div
        className="absolute right-[9%] top-[19%] h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/10 blur-[160px]"
        style={{ x: secondaryX, opacity: secondaryOpacity }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[4%] h-[20rem] w-[20rem] rounded-full bg-[#29d6ff]/8 blur-[130px]"
        style={{ x: outlineX, opacity: secondaryOpacity }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07080c]/70 to-transparent" />
    </div>
  );
}

function SceneHeading({
  eyebrow,
  title,
  text,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance font-display text-[clamp(3.3rem,5.6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.066em] text-white">
        {title}
      </h2>
      <p
        className={cn(
          "mt-6 max-w-3xl text-base leading-8 text-white/46 sm:text-lg",
          align === "center" && "mx-auto"
        )}
      >
        {text}
      </p>
    </div>
  );
}

function HeroScene() {
  return (
    <Container className="flex h-full flex-col justify-center pb-7 pt-5">
      <h1 className="max-w-[11.5ch] text-balance font-display text-[clamp(4.2rem,8.4vw,10rem)] font-semibold leading-[0.78] tracking-[-0.078em] text-white">
        Built on structure.
        <span className="block bg-gradient-to-r from-[#a99aff] via-[#7eb3ff] to-[#8be9ff] bg-clip-text text-transparent">
          Designed to captivate.
        </span>
      </h1>
      <div className="mt-8 grid w-full max-w-[1500px] gap-7 xl:grid-cols-[minmax(0,760px)_auto] xl:items-end">
        <p className="max-w-3xl text-lg leading-8 text-white/48 sm:text-xl sm:leading-9">
          GridSpell creates premium websites, dashboards, and digital systems that
          make ambitious businesses feel established, valuable, and ready to grow.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row xl:justify-end">
          <ActionLink href="/start-project" className="min-h-14 px-7">
            Start a project <ArrowUpRight className="h-4 w-4" />
          </ActionLink>
          <ActionLink href="/work" className="min-h-14 px-7">
            Explore selected work <ArrowUpRight className="h-4 w-4" />
          </ActionLink>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3 pt-8 text-[0.64rem] uppercase tracking-[0.34em] text-white/24">
        <ArrowDown className="h-4 w-4" /> Scroll to change scene
      </div>
    </Container>
  );
}

function ServicesScene() {
  return (
    <Container className="grid h-full items-center gap-10 py-7 xl:grid-cols-[0.72fr_1.28fr]">
      <SceneHeading
        eyebrow="Capabilities"
        title="Design that earns attention. Systems that handle real work."
        text="Visual direction and production engineering in one studio, organized around a clear business outcome."
      />
      <div className="grid border-l border-t border-white/[0.09] md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group min-h-[168px] border-b border-r border-white/[0.09] bg-white/[0.018] p-5 transition-colors hover:bg-white/[0.05] 2xl:min-h-[186px] 2xl:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#8be9ff]">{service.number}</span>
              <ArrowUpRight className="h-4 w-4 text-white/18 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#8be9ff]" />
            </div>
            <h3 className="mt-7 font-display text-xl font-semibold tracking-[-0.045em] text-white 2xl:text-2xl">
              {service.shortTitle}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/38">
              {service.summary}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}

function ProcessScene() {
  return (
    <Container className="grid h-full items-center gap-12 py-7 xl:grid-cols-[0.65fr_1.35fr]">
      <SceneHeading
        eyebrow="The process"
        title="Clarity before complexity."
        text="Every phase has a decision, a deliverable, and a visible path forward."
      />
      <div className="relative grid gap-0 border-t border-white/[0.09]">
        <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-gradient-to-b from-[#8be9ff] via-[#7c5cff] to-transparent" />
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="relative grid gap-3 border-b border-white/[0.08] py-4 pl-14 sm:grid-cols-[0.62fr_1.38fr] sm:items-start"
          >
            <span className="absolute left-0 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#8be9ff]/30 bg-[#0b0d13] font-mono text-[0.65rem] text-[#8be9ff]">
              {step.number}
            </span>
            <h3 className="font-display text-lg font-semibold text-white 2xl:text-xl">
              {step.title}
            </h3>
            <p className="text-sm leading-6 text-white/40">{step.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

const portalFeatures = [
  [Gauge, "Project status", "Current phase, progress, and the next milestone."],
  [CircleCheck, "Approvals", "Clear decisions with feedback attached to the work."],
  [Files, "Files & content", "One secure home for copy, images, and deliverables."],
  [MessageSquareText, "Communication", "Project discussions stay in the right context."]
] as const;

function PortalScene() {
  return (
    <Container className="grid h-full items-center gap-12 py-7 xl:grid-cols-[0.72fr_1.28fr]">
      <SceneHeading
        eyebrow="Client experience"
        title="The project should feel organized before launch day."
        text="Progress, decisions, files, communication, and billing come together in one focused workspace."
      />
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 shadow-[0_45px_130px_rgba(0,0,0,.45)] sm:p-6">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#7c5cff]/18 blur-[90px]" />
        <div className="relative mb-5 flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/7" />
          </div>
          <p className="text-[0.58rem] uppercase tracking-[0.26em] text-white/25">
            GridSpell Client OS
          </p>
        </div>
        <div className="relative grid gap-4 sm:grid-cols-2">
          {portalFeatures.map(([Icon, title, description]) => (
            <div
              key={title}
              className="rounded-[1.35rem] border border-white/[0.08] bg-black/15 p-5 2xl:p-6"
            >
              <Icon className="h-5 w-5 text-[#8be9ff]" />
              <h3 className="mt-6 font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/38">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function PricingScene() {
  return (
    <Container className="flex h-full flex-col justify-center py-7">
      <SceneHeading
        eyebrow="Investment"
        title="A clear starting point. A custom scope."
        text="Final proposals are based on scope, content, integrations, and timeline."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((item) => (
          <article
            key={item.name}
            className={cn(
              "rounded-[1.6rem] border p-5 2xl:p-6",
              item.highlighted
                ? "border-[#7c5cff]/65 bg-[linear-gradient(145deg,rgba(124,92,255,.17),rgba(11,13,19,.94))] shadow-[0_26px_90px_rgba(124,92,255,.15)]"
                : "border-white/[0.09] bg-white/[0.025]"
            )}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/28">{item.name}</p>
            <p className="mt-5 font-display text-xl font-semibold text-white 2xl:text-2xl">
              {item.price}
            </p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-white/40">{item.summary}</p>
            <ul className="mt-5 grid gap-2">
              {item.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex gap-2.5 text-xs leading-5 text-white/52 2xl:text-sm">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Container>
  );
}

function FinalScene() {
  return (
    <Container className="relative flex h-full flex-col items-center justify-center py-8 text-center">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/16 blur-[150px]" />
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
        Your next website
      </p>
      <h2 className="mt-6 max-w-[12ch] text-balance font-display text-[clamp(4rem,7.8vw,9.2rem)] font-semibold leading-[0.84] tracking-[-0.072em] text-white">
        Make the first impression feel expensive.
      </h2>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/44">
        Tell GridSpell what you are building, what is not working, and where the
        business needs to go next.
      </p>
      <ActionLink href="/start-project" className="mt-9 min-h-14 px-8">
        Build your project brief <ArrowUpRight className="h-4 w-4" />
      </ActionLink>
    </Container>
  );
}

function SceneRail({
  active,
  onSelect
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav
      className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      aria-label="Homepage scenes"
    >
      <div className="grid gap-3">
        {SCENE_LABELS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(index)}
            className="group flex items-center justify-end gap-3"
            aria-label={`Go to ${label}`}
            aria-current={active === index ? "step" : undefined}
          >
            <span
              className={cn(
                "text-[0.56rem] uppercase tracking-[0.24em] transition duration-300",
                active === index ? "text-white/62" : "text-white/0 group-hover:text-white/30"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "h-px transition-all duration-300",
                active === index ? "w-9 bg-[#8be9ff]" : "w-3 bg-white/18 group-hover:w-5"
              )}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}

function DesktopPresentation() {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });
  const progress = useSpring(rawProgress, {
    stiffness: 125,
    damping: 32,
    mass: 0.28,
    restDelta: 0.0005
  });
  const workRawProgress = useTransform(rawProgress, [0.105, 0.485], [0, 1], {
    clamp: true
  });
  const workProgress = useSpring(workRawProgress, {
    stiffness: 150,
    damping: 34,
    mass: 0.24,
    restDelta: 0.0005
  });
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
    const ratio = SCENE_DEFINITIONS[index].anchor;

    window.scrollTo({
      top: trackTop + scrollableDistance * ratio,
      behavior: "smooth"
    });
  }

  return (
    <section
      ref={trackRef}
      className="home-presentation-track relative"
      style={{ height: `${TOTAL_SCROLL_UNITS * 100}dvh` }}
    >
      <div className="sticky top-20 h-[calc(100dvh-5rem)] overflow-clip bg-[#07080c]">
        <SharedBackground progress={progress} />
        <SceneRail active={activeScene} onSelect={scrollToScene} />

        <SceneFrame index={0} active={activeScene === 0} progress={progress} variant="hero">
          <HeroScene />
        </SceneFrame>
        <SceneFrame index={1} active={activeScene === 1} progress={progress} variant="rise">
          <WorkCarouselScene progress={workProgress} />
        </SceneFrame>
        <SceneFrame index={2} active={activeScene === 2} progress={progress} variant="slide-left">
          <ServicesScene />
        </SceneFrame>
        <SceneFrame index={3} active={activeScene === 3} progress={progress} variant="slide-right">
          <ProcessScene />
        </SceneFrame>
        <SceneFrame index={4} active={activeScene === 4} progress={progress} variant="perspective">
          <PortalScene />
        </SceneFrame>
        <SceneFrame index={5} active={activeScene === 5} progress={progress} variant="fan">
          <PricingScene />
        </SceneFrame>
        <SceneFrame index={6} active={activeScene === 6} progress={progress} variant="zoom">
          <FinalScene />
        </SceneFrame>
      </div>
    </section>
  );
}

function StaticHomepage() {
  return (
    <div className="home-static-layout relative overflow-hidden bg-[#07080c]">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-40" />
      <section className="relative min-h-[calc(100svh-5rem)] pt-20">
        <HeroScene />
      </section>
      <section className="home-static-scene">
        <StaticWorkGallery />
      </section>
      <section className="home-static-scene">
        <ServicesScene />
      </section>
      <section className="home-static-scene">
        <ProcessScene />
      </section>
      <section className="home-static-scene">
        <PortalScene />
      </section>
      <section className="home-static-scene">
        <PricingScene />
      </section>
      <section className="home-static-scene min-h-[80svh]">
        <FinalScene />
      </section>
    </div>
  );
}

export function HomeExperience() {
  return (
    <div className="home-experience">
      <div className="home-presentation-only">
        <DesktopPresentation />
      </div>
      <div className="home-static-only">
        <StaticHomepage />
      </div>
    </div>
  );
}
