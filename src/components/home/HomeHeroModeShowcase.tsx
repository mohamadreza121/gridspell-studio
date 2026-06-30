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
import {
  useEffect,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

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

const labels = heroModes.map((mode) => mode.label);

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
              <h3 className="mt-3 max-w-[18ch] font-display text-[clamp(1.35rem,2.1vw,2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                {mode.title}
              </h3>
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

export function HomeHeroModeShowcase() {
  const [activeMode, setActiveMode] = useState<HeroModeId>("websites");
  const [hosts, setHosts] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const root = document.querySelector(".home-experience");
    if (!root) return;

    const matchingSpans = Array.from(root.querySelectorAll<HTMLSpanElement>("span")).filter(
      (span) => labels.includes((span.textContent ?? "").trim())
    );

    const candidateParents = Array.from(
      new Set(
        matchingSpans
          .map((span) => span.parentElement)
          .filter((element): element is HTMLElement => Boolean(element))
      )
    );

    const tabGroups = candidateParents.filter((parent) => {
      const childLabels = Array.from(parent.children).map((child) =>
        (child.textContent ?? "").trim()
      );
      return labels.every((label) => childLabels.includes(label));
    });

    const createdHosts: HTMLElement[] = [];
    const cleanups: Array<() => void> = [];

    tabGroups.forEach((group, groupIndex) => {
      group.classList.add("home-hero-mode-tabs");

      Array.from(group.children).forEach((child) => {
        if (!(child instanceof HTMLSpanElement)) return;
        const label = (child.textContent ?? "").trim();
        const mode = heroModes.find((item) => item.label === label);
        if (!mode) return;

        const activate = () => setActiveMode(mode.id);
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          activate();
        };

        child.classList.add("home-hero-mode-tab");
        child.dataset.heroMode = mode.id;
        child.setAttribute("role", "button");
        child.setAttribute("tabindex", "0");
        child.setAttribute("aria-label", `Show ${mode.label} demonstration`);
        child.addEventListener("click", activate);
        child.addEventListener("keydown", handleKeyDown);

        cleanups.push(() => {
          child.removeEventListener("click", activate);
          child.removeEventListener("keydown", handleKeyDown);
          child.classList.remove("home-hero-mode-tab");
          delete child.dataset.heroMode;
          delete child.dataset.active;
          child.removeAttribute("role");
          child.removeAttribute("tabindex");
          child.removeAttribute("aria-label");
          child.removeAttribute("aria-pressed");
        });
      });

      const host = document.createElement("div");
      host.className = "home-hero-mode-host";
      host.dataset.heroModeHost = String(groupIndex);
      group.insertAdjacentElement("afterend", host);
      createdHosts.push(host);

      cleanups.push(() => {
        group.classList.remove("home-hero-mode-tabs");
        host.remove();
      });
    });

    setHosts(createdHosts);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      setHosts([]);
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".home-hero-mode-tab").forEach((tab) => {
      const active = tab.dataset.heroMode === activeMode;
      tab.dataset.active = String(active);
      tab.setAttribute("aria-pressed", String(active));
    });
  }, [activeMode, hosts]);

  return (
    <>
      <style jsx global>{`
        .home-hero-mode-tabs {
          position: relative;
          z-index: 20;
        }

        .home-hero-mode-tab {
          cursor: pointer;
          user-select: none;
          outline: none;
          transition:
            border-color 180ms ease,
            background-color 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .home-hero-mode-tab:hover,
        .home-hero-mode-tab:focus-visible {
          border-color: rgba(139, 233, 255, 0.3) !important;
          background: rgba(139, 233, 255, 0.07) !important;
          color: rgba(255, 255, 255, 0.82) !important;
          transform: translateY(-1px);
        }

        .home-hero-mode-tab[data-active="true"] {
          border-color: rgba(139, 233, 255, 0.42) !important;
          background: linear-gradient(
            135deg,
            rgba(124, 92, 255, 0.15),
            rgba(41, 214, 255, 0.1)
          ) !important;
          color: #ffffff !important;
          box-shadow:
            0 0 0 1px rgba(139, 233, 255, 0.05),
            0 10px 28px rgba(41, 214, 255, 0.08);
        }

        .home-hero-mode-host {
          position: relative;
          z-index: 20;
          margin-top: 1rem;
          width: 100%;
          max-width: 46rem;
        }

        @media (min-width: 1280px) {
          .home-presentation-only .home-hero-mode-host {
            position: absolute;
            right: clamp(1.75rem, 4.2vw, 5.25rem);
            bottom: clamp(4.5rem, 7.5vh, 6.5rem);
            width: min(34vw, 31rem);
            max-width: none;
            margin-top: 0;
          }

          .home-presentation-only .home-hero-mode-tabs {
            max-width: 34rem;
          }
        }

        @media (min-width: 1280px) and (max-height: 800px) {
          .home-presentation-only .home-hero-mode-host {
            right: 2rem;
            bottom: 3.8rem;
            width: min(31vw, 28rem);
          }

          .home-presentation-only .home-hero-mode-card > div:last-child {
            padding: 0.85rem;
          }
        }

        @media (max-width: 1279px) {
          .home-hero-mode-host {
            margin-top: 1.1rem;
          }
        }
      `}</style>

      {hosts.map((host, index) =>
        createPortal(
          <ModeCard activeMode={activeMode} />,
          host,
          `home-hero-mode-${index}`
        )
      )}
    </>
  );
}
