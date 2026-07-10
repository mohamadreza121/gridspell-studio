import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  CheckCircle2,
  ChevronRight,
  Cpu,
  HeartPulse,
  Play,
  Radar,
  Rocket,
  Sparkles,
  Zap,
  type LucideIcon
} from "lucide-react";

import { AuraScrollProduct } from "@/components/landing-pages/AuraScrollProduct";
import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("product-3d-launch");

export const metadata: Metadata = createPageMetadata({
  title: "AURA X1 3D Product Launch Demo",
  description:
    "A futuristic 3D product launch landing page demo for a titanium AI smart ring with a scroll-driven product reveal, realistic ring visual, glass navigation, sensor callouts, specs, and preorder CTAs.",
  path: "/demo/product-3d-launch"
});

type StoryPanel = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  points: string[];
};

type SpecRow = {
  label: string;
  value: string;
};

const heroStats = [
  ["6 days", "battery life"],
  ["100m", "water resistant"],
  ["24/7", "signal tracking"]
] as const;

const storyPanels: StoryPanel[] = [
  {
    id: "design",
    eyebrow: "Material story",
    title: "Forged from titanium.",
    copy:
      "This section turns the product into a premium object. Silver surfaces, glass reflections, and technical copy make the ring feel expensive before the visitor reaches the specs.",
    icon: Box,
    points: ["Aerospace-grade titanium", "Brushed aluminum finish", "Graphite inner sensor channel"]
  },
  {
    id: "sensors",
    eyebrow: "Sensor array",
    title: "A quiet lab on your finger.",
    copy:
      "The ring stays in view while the page reveals sensor callouts around the product story: sleep depth, heart rhythm, temperature shifts, recovery, and motion signals.",
    icon: Radar,
    points: ["Heart rhythm", "Temperature trend", "Motion and recovery"]
  },
  {
    id: "motion",
    eyebrow: "Motion story",
    title: "One object, every moment.",
    copy:
      "The same AURA X1 ring stays present while the story changes around it, making the page feel like one cinematic reveal instead of stacked content blocks.",
    icon: Zap,
    points: ["Morning readiness", "Training strain", "Deep-work windows"]
  },
  {
    id: "intelligence",
    eyebrow: "Intelligence layer",
    title: "Signals become decisions.",
    copy:
      "The physical product needs an app story. This part connects the ring to recovery scores, focus windows, sleep depth, and daily recommendations.",
    icon: Cpu,
    points: ["Recovery 92", "Sleep 7h 48m", "Stress trend -18%"]
  }
];

const sensorCallouts = [
  ["Sleep depth", "stage tracking"],
  ["Heart rhythm", "live signal"],
  ["Temperature", "trend shift"],
  ["Recovery", "daily score"]
] as const;

const specRows: SpecRow[] = [
  { label: "Material", value: "Aerospace-grade titanium" },
  { label: "Finish", value: "Brushed silver aluminum look" },
  { label: "Interior", value: "Graphite sensor channel" },
  { label: "Battery", value: "Up to 6 days" },
  { label: "Sensors", value: "Heart, temperature, motion, recovery" },
  { label: "Charging", value: "Magnetic aluminum dock" },
  { label: "Water", value: "100m resistant shell" },
  { label: "Launch", value: "Waitlist, preorder, and product-drop ready" }
];

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "product-3d-launch",
    design: concept?.title ?? "3D Product Launch"
  });

  return `/start-project?${params.toString()}`;
}

function AuraStyles() {
  return (
    <style>{`
      #aura-page {
        --aura-left: 50vw;
        --aura-top: 45vh;
        --aura-scale: 1;
        --aura-opacity: 1;
      }

      @keyframes aura-hero-impact {
        0%, 74%, 100% { transform: translate3d(0, 0, 0); }
        79% { transform: translate3d(1px, -1px, 0); }
        84% { transform: translate3d(-2px, 1px, 0); }
        89% { transform: translate3d(1px, 1px, 0); }
        94% { transform: translate3d(0, 0, 0); }
      }

      @keyframes aura-ring-intro {
        0% { opacity: 0; transform: scale(0.78); filter: blur(14px); }
        68% { opacity: 1; filter: blur(0); }
        100% { opacity: 1; transform: scale(1); filter: blur(0); }
      }

      @keyframes aura-nav-drop {
        0% { opacity: 0; transform: translateY(-24px) scale(0.98); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes aura-text-rise {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes aura-metal-float {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
        50% { transform: translate3d(0, -16px, 0) rotate(2deg); }
      }

      @keyframes aura-shine-pass {
        0% { opacity: 0; transform: translateX(-160%) rotate(12deg); }
        18% { opacity: 0.78; }
        56% { opacity: 0.26; }
        100% { opacity: 0; transform: translateX(160%) rotate(12deg); }
      }

      @keyframes aura-section-in {
        0% { opacity: 0; transform: translateY(36px) scale(0.99); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .aura-impact { animation: aura-hero-impact 1.65s cubic-bezier(.2,.85,.2,1) both; }
      .aura-nav { opacity: 0; animation: aura-nav-drop .72s cubic-bezier(.2,.85,.2,1) 1.08s both; }
      .aura-rise { opacity: 0; animation: aura-text-rise .78s cubic-bezier(.2,.85,.2,1) 1.08s both; }
      .aura-rise-late { opacity: 0; animation: aura-text-rise .78s cubic-bezier(.2,.85,.2,1) 1.25s both; }
      .aura-float { animation: aura-metal-float 6.8s ease-in-out infinite; }
      .aura-shine { animation: aura-shine-pass 4.6s ease-in-out infinite; }

      .aura-scroll-product {
        position: fixed;
        left: var(--aura-left);
        top: var(--aura-top);
        z-index: 16;
        width: min(41rem, 74vw);
        height: min(41rem, 74vw);
        opacity: var(--aura-opacity);
        pointer-events: none;
        transform: translate(-50%, -50%) scale(var(--aura-scale));
        transform-origin: center;
        will-change: left, top, transform, opacity;
      }

      .aura-scroll-product.is-hidden { display: none; }

      .aura-scroll-product-inner {
        height: 100%;
        width: 100%;
        animation: aura-ring-intro 1.05s cubic-bezier(.2,.85,.2,1) .12s both;
      }

      .aura-view,
      .aura-story-card {
        opacity: 1;
        transform: none;
      }

      .aura-shard-dust {
        background:
          radial-gradient(circle at 12% 24%, rgba(255,255,255,0.28) 0 1.5px, transparent 2px),
          radial-gradient(circle at 78% 18%, rgba(103,232,249,0.26) 0 1.4px, transparent 2px),
          radial-gradient(circle at 66% 74%, rgba(255,255,255,0.18) 0 1.2px, transparent 1.8px),
          radial-gradient(circle at 30% 86%, rgba(148,163,184,0.24) 0 1.5px, transparent 2px),
          radial-gradient(circle at 50% 45%, rgba(103,232,249,0.18), transparent 46%),
          linear-gradient(135deg, rgba(255,255,255,0.13), rgba(148,163,184,0.06) 48%, rgba(255,255,255,0.04));
        opacity: 0.9;
      }

      .aura-shard-panel {
        position: relative;
        overflow: hidden;
        clip-path: polygon(0 9%, 10% 0, 71% 0, 100% 19%, 95% 100%, 18% 100%, 0 84%);
        border: 1px solid rgba(255,255,255,0.16);
        background:
          linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.055) 42%, rgba(255,255,255,0.02) 100%),
          radial-gradient(circle at 74% 18%, rgba(103,232,249,0.13), transparent 28%);
        box-shadow:
          0 34px 120px rgba(0,0,0,0.38),
          inset 0 1px 0 rgba(255,255,255,0.18),
          inset 0 -1px 0 rgba(255,255,255,0.06);
        backdrop-filter: blur(28px);
      }

      .aura-shard-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(112deg, rgba(255,255,255,0.22), transparent 18%),
          linear-gradient(289deg, rgba(103,232,249,0.14), transparent 36%),
          linear-gradient(36deg, transparent 47%, rgba(255,255,255,0.12) 48%, transparent 50%);
        pointer-events: none;
      }

      .aura-shard-panel::after {
        content: "";
        position: absolute;
        inset: 1px;
        clip-path: polygon(0 9%, 10% 0, 71% 0, 100% 19%, 95% 100%, 18% 100%, 0 84%);
        border: 1px solid rgba(255,255,255,0.06);
        pointer-events: none;
      }

      .aura-shard-panel-alt {
        clip-path: polygon(0 0, 86% 0, 100% 17%, 100% 78%, 88% 100%, 8% 94%, 0 64%);
      }

      .aura-shard-panel-alt::after {
        clip-path: polygon(0 0, 86% 0, 100% 17%, 100% 78%, 88% 100%, 8% 94%, 0 64%);
      }

      .aura-shard-mini {
        position: relative;
        overflow: hidden;
        clip-path: polygon(0 16%, 16% 0, 84% 0, 100% 22%, 90% 100%, 10% 100%, 0 72%);
        border: 1px solid rgba(255,255,255,0.12);
        background:
          linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.02)),
          radial-gradient(circle at 80% 18%, rgba(103,232,249,0.14), transparent 26%);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.14),
          0 18px 52px rgba(0,0,0,0.24);
        backdrop-filter: blur(18px);
        transition: transform .35s ease, border-color .35s ease, background .35s ease, box-shadow .35s ease;
      }

      .aura-shard-mini:hover {
        transform: translateY(-7px) rotate(-1deg);
        border-color: rgba(103,232,249,0.34);
        background:
          linear-gradient(135deg, rgba(103,232,249,0.13), rgba(255,255,255,0.07) 46%, rgba(255,255,255,0.03)),
          radial-gradient(circle at 80% 18%, rgba(103,232,249,0.22), transparent 30%);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.18),
          0 24px 70px rgba(103,232,249,0.10),
          0 20px 55px rgba(0,0,0,0.25);
      }

      .aura-shard-fragment {
        position: absolute;
        border: 1px solid rgba(255,255,255,0.16);
        background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.035));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 18px 42px rgba(0,0,0,0.22);
        backdrop-filter: blur(18px);
      }

      @supports (animation-timeline: view()) {
        .aura-view,
        .aura-story-card {
          opacity: 0;
          transform: translateY(36px) scale(0.99);
          animation: aura-section-in linear both;
          animation-timeline: view();
          animation-range: entry 8% cover 28%;
        }
      }

      @media (max-width: 1023px) {
        .aura-scroll-product {
          position: absolute;
          left: 50%;
          top: 42rem;
          width: min(34rem, 92vw);
          height: min(34rem, 92vw);
          transform: translate(-50%, -50%) scale(0.92);
        }

        .aura-shard-panel,
        .aura-shard-panel-alt,
        .aura-shard-panel::after,
        .aura-shard-panel-alt::after,
        .aura-shard-mini {
          clip-path: polygon(0 0, 100% 0, 100% 94%, 92% 100%, 0 100%);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .aura-impact,
        .aura-nav,
        .aura-rise,
        .aura-rise-late,
        .aura-float,
        .aura-shine,
        .aura-view,
        .aura-story-card,
        .aura-scroll-product-inner {
          animation: none !important;
          opacity: 1 !important;
          filter: none !important;
        }
      }
    `}</style>
  );
}

function AuraRing({ id, className = "", glow = "dark" }: { id: string; className?: string; glow?: "dark" | "light" }) {
  const glowClass = glow === "light" ? "bg-cyan-300/20" : "bg-cyan-300/25";

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`absolute inset-[8%] rounded-full ${glowClass} blur-[85px]`} />
      <div aria-hidden="true" className="absolute bottom-[9%] left-1/2 h-[9%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-2xl" />

      <div className="aura-float relative h-full w-full">
        <svg viewBox="0 0 620 620" role="img" aria-label="AURA X1 titanium smart ring" className="h-full w-full overflow-visible drop-shadow-[0_46px_95px_rgba(15,23,42,0.35)]">
          <defs>
            <linearGradient id={`metal-${id}`} x1="80" y1="140" x2="540" y2="440" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.14" stopColor="#a7b2bd" />
              <stop offset="0.28" stopColor="#f8fafc" />
              <stop offset="0.43" stopColor="#7f8b96" />
              <stop offset="0.58" stopColor="#ffffff" />
              <stop offset="0.73" stopColor="#c7d0da" />
              <stop offset="0.88" stopColor="#6f7b86" />
              <stop offset="1" stopColor="#f8fafc" />
            </linearGradient>
            <linearGradient id={`inner-${id}`} x1="120" y1="220" x2="520" y2="395" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#020407" />
              <stop offset="0.48" stopColor="#111827" />
              <stop offset="1" stopColor="#030712" />
            </linearGradient>
            <radialGradient id={`cyan-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#e0fbff" />
              <stop offset="0.55" stopColor="#67e8f9" />
              <stop offset="1" stopColor="#0891b2" />
            </radialGradient>
            <filter id={`shadow-${id}`} x="-40%" y="-60%" width="180%" height="220%">
              <feDropShadow dx="0" dy="26" stdDeviation="28" floodColor="#020617" floodOpacity="0.38" />
              <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#67e8f9" floodOpacity="0.18" />
            </filter>
            <filter id={`soft-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          <g transform="translate(310 310) rotate(-11)">
            <ellipse cx="0" cy="28" rx="214" ry="102" fill="none" stroke="#111827" strokeWidth="88" opacity="0.25" />
            <ellipse cx="0" cy="6" rx="214" ry="106" fill="none" stroke={`url(#metal-${id})`} strokeWidth="92" strokeLinecap="round" filter={`url(#shadow-${id})`} />
            <ellipse cx="0" cy="13" rx="155" ry="55" fill="none" stroke={`url(#inner-${id})`} strokeWidth="31" opacity="0.96" />
            <path d="M -160 -56 C -76 -111 72 -112 164 -58" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="23" strokeLinecap="round" filter={`url(#soft-${id})`} opacity="0.84" />
            <path d="M 54 75 C 101 61 143 39 171 11" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="20" strokeLinecap="round" filter={`url(#soft-${id})`} opacity="0.76" />
            <ellipse cx="-66" cy="-83" rx="37" ry="12" fill={`url(#cyan-${id})`} filter={`url(#soft-${id})`} opacity="0.95" />
            <circle cx="-22" cy="-80" r="7" fill="#e0fbff" opacity="0.92" />
          </g>
        </svg>

        <div aria-hidden="true" className="aura-shine pointer-events-none absolute left-[14%] top-[20%] h-[44%] w-[18%] rounded-full bg-white/65 blur-xl" />
      </div>
    </div>
  );
}

function GlassButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/40 bg-white/70 px-6 text-sm font-black text-[#070a0f] shadow-[0_20px_55px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_80px_rgba(103,232,249,0.26)]"
          : "group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/20 bg-white/[0.10] px-6 text-sm font-black text-white/[0.80] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.15] hover:text-white"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function LaunchNavbar() {
  return (
    <nav className="aura-nav fixed left-3 right-3 top-24 z-40 mx-auto max-w-6xl rounded-full border border-white/[0.18] bg-[#070a0f]/70 px-3 py-3 shadow-[0_22px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl sm:left-5 sm:right-5 lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <Link href="/landing-pages" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Gallery
        </Link>

        <div className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.18em] text-white/50 lg:flex">
          <a href="#design" className="transition hover:text-white">Design</a>
          <a href="#sensors" className="transition hover:text-white">Sensors</a>
          <a href="#motion" className="transition hover:text-white">Motion</a>
          <a href="#specs" className="transition hover:text-white">Specs</a>
        </div>

        <Link href={startHref()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_34px_rgba(103,232,249,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200/[0.15]">
          Pre-order
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

function FloatingShardFragments({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const fragments =
    variant === "b"
      ? [
          "-left-8 top-7 h-14 w-24 rotate-[18deg] [clip-path:polygon(0_0,100%_18%,72%_100%,10%_82%)]",
          "right-4 -top-9 h-20 w-12 rotate-[-24deg] [clip-path:polygon(28%_0,100%_26%,72%_100%,0_64%)]",
          "-right-10 bottom-12 h-16 w-28 rotate-[10deg] [clip-path:polygon(0_28%,88%_0,100%_72%,22%_100%)]"
        ]
      : variant === "c"
        ? [
            "left-5 -top-10 h-12 w-28 rotate-[-8deg] [clip-path:polygon(0_0,86%_0,100%_64%,12%_100%)]",
            "-right-7 top-24 h-24 w-14 rotate-[18deg] [clip-path:polygon(24%_0,100%_10%,84%_100%,0_74%)]",
            "-left-10 bottom-8 h-16 w-20 rotate-[-22deg] [clip-path:polygon(0_18%,72%_0,100%_100%,16%_74%)]"
          ]
        : [
            "-left-9 top-12 h-16 w-24 rotate-[-18deg] [clip-path:polygon(0_0,82%_12%,100%_100%,12%_74%)]",
            "right-10 -top-8 h-14 w-28 rotate-[12deg] [clip-path:polygon(8%_0,100%_18%,76%_100%,0_66%)]",
            "-right-8 bottom-10 h-20 w-16 rotate-[26deg] [clip-path:polygon(20%_0,100%_22%,74%_100%,0_80%)]"
          ];

  return (
    <>
      {fragments.map((fragment) => (
        <span key={fragment} aria-hidden="true" className={`aura-shard-fragment hidden lg:block ${fragment}`} />
      ))}
    </>
  );
}

function StoryPanelCard({ panel }: { panel: StoryPanel }) {
  const Icon = panel.icon;
  const useShardStyle = panel.id === "design" || panel.id === "sensors" || panel.id === "motion";
  const variant = panel.id === "sensors" ? "b" : panel.id === "motion" ? "c" : "a";
  const panelShape = variant === "b" ? "aura-shard-panel aura-shard-panel-alt" : "aura-shard-panel";

  return (
    <article id={panel.id} className="aura-story-card flex min-h-[88svh] items-center py-16 lg:pl-[44%]">
      {useShardStyle ? (
        <div className="relative w-full lg:max-w-2xl">
          <div aria-hidden="true" className="aura-shard-dust absolute -inset-12 rounded-[3rem] blur-2xl" />
          <FloatingShardFragments variant={variant} />

          <div className={`${panelShape} p-6 sm:p-8 lg:p-9`}>
            <div className="relative grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="space-y-5 lg:pt-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.20] bg-cyan-200/[0.10] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                  <Icon className="h-4 w-4" />
                  {panel.eyebrow}
                </p>

                <div className="h-px w-full bg-[linear-gradient(90deg,rgba(103,232,249,0.45),transparent)]" />

                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/34">
                  AURA / shard panel
                </p>
              </div>

              <div>
                <h2 className="font-display text-[clamp(3.6rem,7vw,7.5rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-white drop-shadow-[0_28px_70px_rgba(0,0,0,0.42)]">
                  {panel.title}
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-white/58">
                  {panel.copy}
                </p>
              </div>
            </div>

            <div className="relative mt-9 grid gap-3 sm:grid-cols-3">
              {panel.points.map((point, index) => (
                <div
                  key={point}
                  className={index === 1 ? "aura-shard-mini p-4 sm:translate-y-5" : "aura-shard-mini p-4"}
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/66">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-[2.25rem] border border-white/12 bg-white/[0.08] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-8 lg:max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.18] bg-cyan-200/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
            <Icon className="h-4 w-4" />
            {panel.eyebrow}
          </p>
          <h2 className="mt-7 font-display text-[clamp(3.6rem,7vw,7.5rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-white">
            {panel.title}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
            {panel.copy}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {panel.points.map((point) => (
              <div key={point} className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 transition hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-cyan-200/[0.08]">
                <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 text-sm font-semibold leading-6 text-white/60">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function SensorOrbit() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sensorCallouts.map(([title, copy]) => (
        <div key={title} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
          <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-white">{title}</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/55">{copy}</p>
        </div>
      ))}
    </div>
  );
}

export default function Product3DLaunchDemoPage() {
  return (
    <main id="aura-page" className="overflow-hidden bg-[#05070a] text-white">
      <AuraStyles />
      <LaunchNavbar />

      <AuraScrollProduct>
        <AuraRing id="scroll" className="h-full w-full" />
      </AuraScrollProduct>

      <section id="aura-hero" className="aura-impact relative min-h-svh overflow-hidden bg-[#05070a] pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(103,232,249,0.26),transparent_24rem),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.16),transparent_34rem),linear-gradient(180deg,#05070a_0%,#0b1017_58%,#e8edf3_58.4%,#f8fafc_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-35" />
        <div aria-hidden="true" className="absolute left-1/2 top-[58.4%] h-px w-[90vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.88),transparent)] shadow-[0_0_32px_rgba(255,255,255,0.38)]" />

        <Container className="relative flex min-h-[calc(100svh-2rem)] flex-col items-center justify-center py-24 text-center">
          <h1
            className="aura-rise pointer-events-none absolute left-1/2 top-[48%] z-[12] w-[108vw] -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(5rem,13.5vw,14rem)] font-semibold leading-[0.72] tracking-[-0.11em] text-white/90"
            style={{ textShadow: "0 34px 95px rgba(0,0,0,0.72), 0 0 42px rgba(103,232,249,0.18)" }}
          >
            Future on your finger.
          </h1>

          <div className="h-[25rem] w-[25rem] sm:h-[36rem] sm:w-[36rem] lg:h-[41rem] lg:w-[41rem]" aria-hidden="true" />

          <div className="aura-rise-late relative z-20 -mt-20 max-w-2xl sm:-mt-28">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AURA X1 titanium AI ring
            </p>
            <p className="mt-7 text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
              A cinematic product launch page for a titanium smart ring that turns sleep, focus, recovery, and daily signals into quiet intelligence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={startHref()}>Start with this design</GlassButton>
              <Link href="#design" className="group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-slate-950/10 bg-white/55 px-6 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white">
                <Play className="h-4 w-4" />
                Watch reveal
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <div key={label} className="rounded-[1.35rem] border border-slate-950/[0.08] bg-white/65 p-4 text-left shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                  <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-slate-950">{value}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="aura-story" className="relative min-h-[430svh] overflow-clip bg-[#05070a] px-3 py-12 sm:px-5">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_26%_22%,rgba(103,232,249,0.16),transparent_28rem),radial-gradient(circle_at_76%_58%,rgba(148,163,184,0.12),transparent_34rem),linear-gradient(180deg,#05070a,#0b1017_52%,#05070a)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-32" />

        <Container className="relative z-20">
          {storyPanels.map((panel) => (
            <StoryPanelCard key={panel.id} panel={panel} />
          ))}
        </Container>
      </section>

      <section id="aura-after-story" className="relative bg-[#f5f7fa] px-3 py-12 text-[#0b0f14] sm:px-5 sm:py-20">
        <Container>
          <div className="aura-view overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-5 shadow-[0_38px_120px_rgba(15,23,42,0.12)] sm:p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                  <Radar className="h-4 w-4 text-cyan-500" />
                  Sensor callouts
                </p>
                <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-[#0b0f14]">
                  The product explains itself.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-slate-500">
                  Use callouts to show what the object does while preserving a premium product-launch feel.
                </p>
              </div>

              <div className="rounded-[2.4rem] border border-slate-200 bg-[#0b0f14] p-5 shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
                <SensorOrbit />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="specs" className="relative bg-[#f5f7fa] px-3 py-12 text-[#0b0f14] sm:px-5 sm:py-20">
        <Container>
          <div className="aura-view grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-[0_30px_100px_rgba(15,23,42,0.10)] sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                <HeartPulse className="h-4 w-4 text-cyan-500" />
                Technical sheet
              </p>
              <h2 className="mt-7 max-w-[8ch] font-display text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.78] tracking-[-0.085em]">
                Luxury specs, launch-ready.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-500">
                A product page like this needs a premium spec table, not a plain list of features.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#0b0f14] p-3 text-white shadow-[0_30px_100px_rgba(15,23,42,0.20)]">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
                {specRows.map((row) => (
                  <div key={row.label} className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[0.42fr_1fr]">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/45">{row.label}</p>
                    <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="waitlist" className="relative overflow-hidden bg-[#05070a] px-3 py-24 sm:px-5 sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(103,232,249,0.22),transparent_30rem),linear-gradient(180deg,#05070a,#0b1017)]" />
        <Container className="relative">
          <div className="aura-view rounded-[3rem] border border-white/[0.12] bg-white/[0.06] p-8 text-center shadow-[0_38px_130px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-12">
            <Rocket className="mx-auto h-8 w-8 text-cyan-200" />
            <h2 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(3.8rem,8vw,8.5rem)] font-semibold leading-[0.76] tracking-[-0.095em] text-white">
              The next interface is not a screen.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/52">
              Use this direction for premium product drops, wearable tech, hardware launches, waitlists, and cinematic preorder pages.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={startHref()}>Reserve AURA X1</GlassButton>
              <GlassButton href="/landing-pages" variant="secondary">Back to gallery</GlassButton>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
