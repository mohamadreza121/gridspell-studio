"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity,
  Blocks,
  Code2,
  Layers3,
  LayoutDashboard,
  PanelTop,
  ShieldCheck,
  Workflow
} from "lucide-react";
import { useState, type ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;
type HeroModeId = "websites" | "portals" | "automation" | "systems";

type HeroMode = {
  id: HeroModeId;
  label: string;
  title: string;
  eyebrow: string;
  detail: string;
  icon: IconComponent;
  windowLabel: string;
  status: string;
  progress: number;
};

const heroModes: readonly HeroMode[] = [
  {
    id: "websites",
    label: "Websites",
    title: "A premium first impression built to convert.",
    eyebrow: "Marketing experience",
    detail:
      "Strategy, responsive design, development, SEO, analytics, and reliable lead capture.",
    icon: PanelTop,
    windowLabel: "Conversion website",
    status: "Launch ready",
    progress: 92
  },
  {
    id: "portals",
    label: "Portals",
    title: "A clear workspace for clients and teams.",
    eyebrow: "Authenticated product",
    detail:
      "Projects, files, messages, approvals, tasks, billing, and support in one secure interface.",
    icon: LayoutDashboard,
    windowLabel: "Client workspace",
    status: "Workspace live",
    progress: 78
  },
  {
    id: "automation",
    label: "Automation",
    title: "Connected workflows that reduce manual work.",
    eyebrow: "Business integration",
    detail:
      "Forms, CRM routing, booking, email, payments, notifications, and operational handoffs.",
    icon: Workflow,
    windowLabel: "Workflow engine",
    status: "6 flows active",
    progress: 84
  },
  {
    id: "systems",
    label: "Digital systems",
    title: "Custom software shaped around real operations.",
    eyebrow: "Full-stack system",
    detail:
      "Purpose-built applications with authentication, permissions, databases, and internal tooling.",
    icon: Blocks,
    windowLabel: "Digital platform",
    status: "System online",
    progress: 88
  }
] as const;

function ModeCard({ activeMode }: { activeMode: HeroModeId }) {
  const reduceMotion = useReducedMotion();
  const mode = heroModes.find((item) => item.id === activeMode) ?? heroModes[0];
  const ModeIcon = mode.icon;

  return (
    <div className="home-hero-mode-card overflow-hidden rounded-[1.45rem] border border-white/[0.11] bg-[#080a0f]/94 shadow-[0_30px_90px_rgba(0,0,0,.42)] backdrop-blur-xl">
      <div className="flex h-10 items-center gap-3 border-b border-white/[0.08] bg-[#0b0d13]/95 px-4">
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-white/18" />
          <span className="h-2 w-2 rounded-full bg-white/11" />
          <span className="h-2 w-2 rounded-full bg-white/7" />
        </div>
        <div className="mx-auto max-w-[68%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-1 text-[0.5rem] tracking-[0.08em] text-white/30">
          {mode.windowLabel}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode.id}
          initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[radial-gradient(circle_at_82%_12%,rgba(41,214,255,.12),transparent_15rem),radial-gradient(circle_at_14%_94%,rgba(124,92,255,.15),transparent_17rem),#090b11] p-4 sm:p-5"
        >
          <div className="page-grid pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[#8be9ff]">
                <ModeIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[0.48rem] uppercase tracking-[0.22em] text-[#8be9ff]">
                  {mode.eyebrow}
                </p>
                <p className="mt-1 text-xs font-medium text-white/62">GridSpell system</p>
              </div>
            </div>
            <span className="rounded-full border border-[#69e6ad]/18 bg-[#69e6ad]/7 px-2.5 py-1 text-[0.48rem] font-semibold uppercase tracking-[0.14em] text-[#7aefb9]">
              Live
            </span>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/20 p-4">
              <p className="text-[0.46rem] uppercase tracking-[0.18em] text-white/24">
                Current experience
              </p>
              <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.35rem,2.1vw,2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                {mode.title}
              </h2>
              <p className="mt-3 text-[0.72rem] leading-5 text-white/38 sm:text-xs sm:leading-6">
                {mode.detail}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: mode.progress / 100 }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.025] p-3.5">
                <p className="text-[0.45rem] uppercase tracking-[0.17em] text-white/22">
                  Delivery status
                </p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                      {mode.progress}%
                    </p>
                    <p className="mt-1 text-[0.6rem] text-white/28">{mode.status}</p>
                  </div>
                  <Activity className="h-4.5 w-4.5 text-[#8be9ff]" />
                </div>
              </div>

              <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.025] p-3.5">
                <p className="text-[0.45rem] uppercase tracking-[0.17em] text-white/22">
                  Connected layers
                </p>
                <div className="mt-3 flex gap-2">
                  {[Code2, Layers3, ShieldCheck].map((Icon, index) => (
                    <span
                      key={index}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] bg-black/15 text-white/40"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-3 grid grid-cols-3 gap-2">
            {["Strategy", "Interface", "System"].map((label, index) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-2.5"
              >
                <p className="text-[0.42rem] uppercase tracking-[0.15em] text-white/20">
                  0{index + 1}
                </p>
                <p className="mt-1.5 text-[0.62rem] font-medium text-white/48 sm:text-[0.68rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HomeHeroModeShowcaseClient() {
  const [activeMode, setActiveMode] = useState<HeroModeId>("websites");

  return (
    <>
      <div
        className="home-hero-mode-tabs mt-[31px] grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        style={{ maxWidth: "46rem" }}
        role="group"
        aria-label="Homepage experience demonstrations"
      >
        {heroModes.map((mode) => {
          const active = mode.id === activeMode;

          return (
            <button
              key={mode.id}
              type="button"
              className="home-hero-mode-tab flex min-h-11 min-w-0 w-full items-center justify-center whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-2 text-center text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-white/38 md:px-4 md:text-[0.58rem] md:tracking-[0.12em] lg:text-[0.6rem] lg:tracking-[0.13em]"
              data-hero-mode={mode.id}
              data-active={String(active)}
              aria-label={`Show ${mode.label} demonstration`}
              aria-pressed={active}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      <div className="home-hero-mode-host" data-hero-mode-ready="true">
        <ModeCard activeMode={activeMode} />
      </div>
    </>
  );
}
