import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BatteryCharging,
  Box,
  CheckCircle2,
  ChevronRight,
  Cpu,
  HeartPulse,
  Play,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("product-3d-launch");

export const metadata: Metadata = createPageMetadata({
  title: "AURA X1 3D Product Launch Demo",
  description:
    "A futuristic 3D product launch landing page demo for a titanium AI smart ring with a scroll-driven reveal, realistic ring visual, glass navigation, sensor callouts, specs, and preorder CTAs.",
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
      "The scroll structure keeps bringing the same product back into view so the launch page feels like one cinematic reveal instead of stacked sections.",
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
      @keyframes aura-hero-impact {
        0%, 74%, 100% { transform: translate3d(0, 0, 0); }
        79% { transform: translate3d(1px, -1px, 0); }
        84% { transform: translate3d(-2px, 1px, 0); }
        89% { transform: translate3d(1px, 1px, 0); }
        94% { transform: translate3d(0, 0, 0); }
      }

      @keyframes aura-hero-ring {
        0% { opacity: 0; transform: translateY(44px) scale(0.82) rotate(-10deg); filter: blur(14px); }
        70% { opacity: 1; filter: blur(0); }
        100% { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); }
      }

      @keyframes aura-nav-drop {
        0% { opacity: 0; transform: translateY(-24px) scale(0.98); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes aura-text-rise {
        0% { opacity: 0; transform: translateY(30px); filter: blur(10px); }
        100% { opacity: 1; transform: translateY(0); filter: blur(0); }
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
        0% { opacity: 0; transform: translateY(58px) scale(0.98); filter: blur(10px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }

      @keyframes aura-product-travel {
        0% { opacity: 0; transform: translate3d(40vw, -50%, 0) scale(1.18); filter: blur(6px); }
        15% { opacity: 1; filter: blur(0); }
        100% { opacity: 1; transform: translate3d(0, -50%, 0) scale(0.78); filter: blur(0); }
      }

      .aura-impact { animation: aura-hero-impact 1.65s cubic-bezier(.2,.85,.2,1) both; }
      .aura-hero-product { opacity: 0; animation: aura-hero-ring 1.12s cubic-bezier(.2,.85,.2,1) .12s both; }
      .aura-nav { opacity: 0; animation: aura-nav-drop .72s cubic-bezier(.2,.85,.2,1) 1.08s both; }
      .aura-rise { opacity: 0; animation: aura-text-rise .78s cubic-bezier(.2,.85,.2,1) 1.08s both; }
      .aura-rise-late { opacity: 0; animation: aura-text-rise .78s cubic-bezier(.2,.85,.2,1) 1.25s both; }
      .aura-float { animation: aura-metal-float 6.8s ease-in-out infinite; }
      .aura-shine { animation: aura-shine-pass 4.6s ease-in-out infinite; }
      .aura-view { opacity: 1; transform: none; }

      @supports (animation-timeline: view()) {
        .aura-view {
          opacity: 0;
          transform: translateY(58px) scale(0.98);
          animation: aura-section-in linear both;
          animation-timeline: view();
          animation-range: entry 8% cover 32%;
        }

        .aura-journey-product {
          animation: aura-product-travel linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 24%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .aura-impact,
        .aura-hero-product,
        .aura-nav,
        .aura-rise,
        .aura-rise-late,
        .aura-float,
        .aura-shine,
        .aura-view,
        .aura-journey-product {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
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
          : "group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-black text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 hover:text-white"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function LaunchNavbar() {
  return (
    <nav className="aura-nav fixed left-3 right-3 top-24 z-40 mx-auto max-w-6xl rounded-full border border-white/18 bg-[#070a0f]/70 px-3 py-3 shadow-[0_22px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl sm:left-5 sm:right-5 lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <Link href="/landing-pages" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/68 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Gallery
        </Link>

        <div className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.18em] text-white/48 lg:flex">
          <a href="#design" className="transition hover:text-white">Design</a>
          <a href="#sensors" className="transition hover:text-white">Sensors</a>
          <a href="#motion" className="transition hover:text-white">Motion</a>
          <a href="#specs" className="transition hover:text-white">Specs</a>
        </div>

        <Link href={startHref()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_34px_rgba(103,232,249,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200/15">
          Pre-order
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

function StoryPanelCard({ panel }: { panel: StoryPanel }) {
  const Icon = panel.icon;

  return (
    <article id={panel.id} className="aura-view flex min-h-[88svh] items-center py-16 lg:pl-[44%]">
      <div className="w-full rounded-[2.25rem] border border-white/12 bg-white/8 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-8 lg:max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/18 bg-cyan-200/8 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
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
            <div key={point} className="rounded-[1.25rem] border border-white/10 bg-white/7 p-4 transition hover:-translate-y-1 hover:border-cyan-200/26 hover:bg-cyan-200/8">
              <CheckCircle2 className="h-5 w-5 text-cyan-200" />
              <p className="mt-3 text-sm font-semibold leading-6 text-white/62">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function SensorOrbit() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sensorCallouts.map(([title, copy]) => (
        <div key={title} className="group rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-cyan-200/8">
          <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-white">{title}</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/55">{copy}</p>
        </div>
      ))}
    </div>
  );
}

export default function Product3DLaunchDemoPage() {
  return (
    <main className="overflow-hidden bg-[#05070a] text-white">
      <AuraStyles />
      <LaunchNavbar />

      <section className="aura-impact relative min-h-svh overflow-hidden bg-[#05070a] pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(103,232,249,0.26),transparent_24rem),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.16),transparent_34rem),linear-gradient(180deg,#05070a_0%,#0b1017_58%,#e8edf3_58.4%,#f8fafc_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-35" />
        <div aria-hidden="true" className="absolute left-1/2 top-[58.4%] h-px w-[90vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.88),transparent)] shadow-[0_0_32px_rgba(255,255,255,0.38)]" />

        <Container className="relative flex min-h-[calc(100svh-2rem)] flex-col items-center justify-center py-24 text-center">
          <h1 className="aura-rise pointer-events-none absolute left-1/2 top-[51%] z-0 w-[105vw] -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(4.8rem,14vw,14.5rem)] font-semibold leading-[0.72] tracking-[-0.11em] text-white/92 drop-shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
            Future on your finger.
          </h1>

          <div className="aura-hero-product relative z-10 mt-8 h-[25rem] w-[25rem] sm:h-[36rem] sm:w-[36rem] lg:h-[41rem] lg:w-[41rem]">
            <AuraRing id="hero" className="h-full w-full" />
          </div>

          <div className="aura-rise-late relative z-20 -mt-20 max-w-2xl sm:-mt-28">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
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
                <div key={label} className="rounded-[1.35rem] border border-slate-950/8 bg-white/65 p-4 text-left shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                  <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-slate-950">{value}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative min-h-[430svh] overflow-clip bg-[#05070a] px-3 py-12 sm:px-5">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_26%_22%,rgba(103,232,249,0.16),transparent_28rem),radial-gradient(circle_at_76%_58%,rgba(148,163,184,0.12),transparent_34rem),linear-gradient(180deg,#05070a,#0b1017_52%,#05070a)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-32" />

        <div
          className="aura-journey-product pointer-events-none sticky top-[50%] z-10 hidden h-[34rem] w-[34rem] -translate-y-1/2 lg:block"
          style={{ left: "max(1.25rem, calc((100vw - 76rem) / 2))" }}
        >
          <AuraRing id="journey" className="h-full w-full" />
        </div>

        <Container className="relative z-20 -mt-[34rem] lg:-mt-[34rem]">
          {storyPanels.map((panel) => (
            <StoryPanelCard key={panel.id} panel={panel} />
          ))}
        </Container>
      </section>

      <section className="relative bg-[#f5f7fa] px-3 py-12 text-[#0b0f14] sm:px-5 sm:py-20">
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
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                  After the scroll move, the page switches into a polished feature reveal with callouts, technical language, and a second product moment.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="rounded-[2.4rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_34%,rgba(103,232,249,0.24),transparent_18rem),linear-gradient(135deg,#f8fafc,#dfe5eb)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <AuraRing id="sensor" className="h-[22rem] w-full" glow="light" />
                </div>
                <SensorOrbit />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="specs" className="relative bg-[#05070a] px-3 py-20 text-white sm:px-5 sm:py-28">
        <Container>
          <div className="aura-view grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/7 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/16 bg-cyan-200/8 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                <HeartPulse className="h-4 w-4" />
                Technical sheet
              </p>
              <h2 className="mt-7 max-w-[8ch] font-display text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.78] tracking-[-0.085em]">
                Luxury specs, launch-ready.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/48">
                A product page like this needs a premium spec table, not a plain list of features. The dark panel makes the hardware feel precise and expensive.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              {specRows.map((row) => (
                <div key={row.label} className="grid gap-2 border-b border-white/10 px-6 py-5 last:border-b-0 sm:grid-cols-[0.36fr_1fr] sm:items-center">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/36">{row.label}</p>
                  <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="waitlist" className="relative overflow-hidden bg-[#f8fafc] px-3 py-20 text-[#0b0f14] sm:px-5 sm:py-28">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-[150px]" />
        <Container>
          <div className="aura-view relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 text-center shadow-[0_38px_120px_rgba(15,23,42,0.12)] sm:p-12">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.18),transparent_24rem)]" />
            <div className="relative">
              <Rocket className="mx-auto h-9 w-9 text-cyan-500" />
              <h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.09em]">
                The next interface is not a screen.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500">
                Use this direction for product drops, wearable tech, premium hardware launches, waitlists, and cinematic product storytelling.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href={startHref()} className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-[#0b0f14] px-6 text-sm font-black text-white shadow-[0_20px_65px_rgba(15,23,42,0.22)] transition hover:-translate-y-1">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/landing-pages" className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 transition hover:-translate-y-1">
                  Back to gallery
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                {["Hero reveal", "Scroll object", "Specs", "Preorder"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
