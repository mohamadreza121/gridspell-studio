import type { Metadata } from "next";
import Link from "next/link";
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
    "A futuristic 3D product launch landing page demo for a titanium AI smart ring with cinematic reveal effects, glass navigation, sensor callouts, specs, and preorder CTAs.",
  path: "/demo/product-3d-launch"
});

type Feature = {
  icon: LucideIcon;
  title: string;
  copy: string;
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

const designFeatures: Feature[] = [
  {
    icon: Box,
    title: "Titanium unibody",
    copy: "A brushed silver shell designed to feel weightless, durable, and almost invisible on the hand."
  },
  {
    icon: ShieldCheck,
    title: "Graphite inner core",
    copy: "A dark inner surface hides the sensor array and keeps the product feeling premium from every angle."
  },
  {
    icon: BatteryCharging,
    title: "Magnetic charging dock",
    copy: "A small aluminum dock gives the launch page a second premium accessory to show in future product shots."
  }
];

const sensorCallouts = [
  ["Sleep depth", "stage tracking"],
  ["Heart rhythm", "live signal"],
  ["Temperature", "trend shift"],
  ["Recovery", "daily score"]
] as const;

const intelligenceCards = [
  ["Recovery", "92", "+14% from baseline"],
  ["Focus window", "10:30", "best deep-work block"],
  ["Sleep", "7h 48m", "REM improved"],
  ["Stress trend", "-18%", "evening drop"]
] as const;

const moments = [
  ["Morning", "Wake with a recovery score and a clear readiness signal before opening a screen."],
  ["Training", "Track strain, heart rhythm, and temperature shifts without a bulky watch."],
  ["Deep work", "Find the hours where your body is calm and your focus is highest."],
  ["Sleep", "A quiet ring collects the night without notifications, lights, or friction."]
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
      @keyframes aura-ring-float {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(-7deg); }
        50% { transform: translate3d(0, -18px, 0) rotate(5deg); }
      }

      @keyframes aura-shine {
        0% { transform: translateX(-120%) rotate(16deg); opacity: 0; }
        18% { opacity: 0.75; }
        55% { opacity: 0.25; }
        100% { transform: translateX(160%) rotate(16deg); opacity: 0; }
      }

      @keyframes aura-hero-ring {
        0% { opacity: 0; transform: translateY(34px) scale(0.86) rotate(-12deg); filter: blur(10px); }
        64% { opacity: 1; filter: blur(0); }
        100% { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); }
      }

      @keyframes aura-nav-drop {
        0% { opacity: 0; transform: translateY(-22px) scale(0.98); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes aura-text-up {
        0% { opacity: 0; transform: translateY(26px); filter: blur(8px); }
        100% { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      @keyframes aura-impact {
        0%, 78%, 100% { transform: translate3d(0, 0, 0); }
        82% { transform: translate3d(1px, -1px, 0); }
        86% { transform: translate3d(-2px, 1px, 0); }
        90% { transform: translate3d(1px, 1px, 0); }
        94% { transform: translate3d(0, 0, 0); }
      }

      @keyframes aura-section-in {
        0% { opacity: 0; transform: translateY(46px) scale(0.98); filter: blur(8px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }

      .aura-hero-impact { animation: aura-impact 1.55s cubic-bezier(.2,.85,.2,1) both; }
      .aura-nav-reveal { opacity: 0; animation: aura-nav-drop .72s cubic-bezier(.2,.85,.2,1) 1.05s both; }
      .aura-ring-reveal { opacity: 0; animation: aura-hero-ring 1.08s cubic-bezier(.2,.85,.2,1) .12s both; }
      .aura-text-reveal { opacity: 0; animation: aura-text-up .78s cubic-bezier(.2,.85,.2,1) 1.18s both; }
      .aura-text-reveal-late { opacity: 0; animation: aura-text-up .78s cubic-bezier(.2,.85,.2,1) 1.34s both; }
      .aura-ring-float { animation: aura-ring-float 6.5s ease-in-out infinite; }
      .aura-metal-shine { animation: aura-shine 4.8s ease-in-out infinite; }
      .aura-view { opacity: 1; transform: none; }

      @supports (animation-timeline: view()) {
        .aura-view {
          opacity: 0;
          transform: translateY(46px) scale(0.98);
          animation: aura-section-in linear both;
          animation-timeline: view();
          animation-range: entry 4% cover 34%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .aura-hero-impact,
        .aura-nav-reveal,
        .aura-ring-reveal,
        .aura-text-reveal,
        .aura-text-reveal-late,
        .aura-ring-float,
        .aura-metal-shine,
        .aura-view {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `}</style>
  );
}

function AuraRing({ size = "hero", surface = "dark" }: { size?: "hero" | "large" | "medium" | "small"; surface?: "dark" | "light" }) {
  const sizeClass =
    size === "hero"
      ? "h-[23rem] w-[23rem] sm:h-[34rem] sm:w-[34rem]"
      : size === "large"
        ? "h-[19rem] w-[19rem] sm:h-[28rem] sm:w-[28rem]"
        : size === "medium"
          ? "h-[15rem] w-[15rem] sm:h-[22rem] sm:w-[22rem]"
          : "h-[11rem] w-[11rem] sm:h-[15rem] sm:w-[15rem]";

  const innerColor = surface === "light" ? "bg-[#f6f7f9]" : "bg-[#05070a]";

  return (
    <div className={`relative mx-auto ${sizeClass} [perspective:1200px]`}>
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-cyan-300/[0.20] blur-[70px]" />
      <div aria-hidden="true" className="absolute bottom-[8%] left-1/2 h-[12%] w-[68%] -translate-x-1/2 rounded-[50%] bg-black/[0.34] blur-2xl" />

      <div className="aura-ring-float absolute inset-0">
        <div
          className="absolute inset-[9%] overflow-hidden rounded-full bg-[conic-gradient(from_215deg,#f8fafc,#8f9aa5,#f8fafc,#cbd5df,#ffffff,#77838e,#f8fafc)] shadow-[inset_0_0_45px_rgba(255,255,255,0.62),inset_0_-30px_60px_rgba(15,23,42,0.35),0_42px_120px_rgba(15,23,42,0.42),0_0_110px_rgba(103,232,249,0.24)] transition duration-700 hover:scale-[1.025]"
          style={{ transform: "rotateX(64deg) rotateZ(-18deg)" }}
        >
          <div aria-hidden="true" className="aura-metal-shine absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92),transparent)] blur-sm" />
          <div className={`absolute inset-[20%] rounded-full ${innerColor} shadow-[inset_0_0_40px_rgba(15,23,42,0.72)]`} />
          <div aria-hidden="true" className="absolute left-[44%] top-[5%] h-[18%] w-[10%] rounded-full bg-cyan-200/[0.92] blur-[2px] shadow-[0_0_36px_rgba(103,232,249,0.95)]" />
          <div aria-hidden="true" className="absolute bottom-[19%] right-[23%] h-[10%] w-[24%] rounded-full bg-white/[0.58] blur-[5px]" />
        </div>
      </div>

      <div aria-hidden="true" className="absolute left-[13%] top-[22%] h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_32px_rgba(103,232,249,0.95)]" />
      <div aria-hidden="true" className="absolute right-[18%] bottom-[31%] h-2.5 w-2.5 rounded-full bg-blue-200 shadow-[0_0_28px_rgba(147,197,253,0.95)]" />
    </div>
  );
}

function GlassButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/[0.28] bg-white/[0.62] px-6 text-sm font-black text-[#070a0f] shadow-[0_18px_55px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_75px_rgba(103,232,249,0.22)]"
          : "group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.07] px-6 text-sm font-black text-white/[0.82] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/[0.28] hover:bg-white/[0.12] hover:text-white"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function LaunchNavbar() {
  return (
    <nav className="aura-nav-reveal fixed left-3 right-3 top-24 z-40 mx-auto max-w-6xl rounded-full border border-white/[0.18] bg-[#070a0f]/[0.58] px-3 py-3 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:left-5 sm:right-5 lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <Link href="/landing-pages" className="inline-flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/[0.68] transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Gallery
        </Link>

        <div className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.18em] text-white/[0.48] lg:flex">
          <a href="#design" className="transition hover:text-white">Design</a>
          <a href="#sensors" className="transition hover:text-white">Sensors</a>
          <a href="#motion" className="transition hover:text-white">Motion</a>
          <a href="#specs" className="transition hover:text-white">Specs</a>
        </div>

        <Link href={startHref()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-200/[0.26] bg-cyan-200/[0.10] px-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_34px_rgba(103,232,249,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200/[0.16]">
          Pre-order
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

function SensorCallouts() {
  return (
    <div className="relative mx-auto max-w-5xl py-10">
      <div className="absolute left-1/2 top-1/2 hidden h-px w-[78%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.55),transparent)] lg:block" />
      <div className="absolute left-1/2 top-1/2 hidden h-[72%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(103,232,249,0.42),transparent)] lg:block" />

      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.05fr_1fr]">
        <div className="grid gap-4">
          {sensorCallouts.slice(0, 2).map(([title, copy]) => (
            <div key={title} className="group rounded-[1.5rem] border border-white/[0.10] bg-white/[0.06] p-5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/[0.30] hover:bg-cyan-200/[0.08]">
              <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-white">{title}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/[0.55]">{copy}</p>
            </div>
          ))}
        </div>

        <div className="aura-view rounded-[2.5rem] border border-white/[0.12] bg-white/[0.045] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <AuraRing size="large" />
        </div>

        <div className="grid gap-4">
          {sensorCallouts.slice(2).map(([title, copy]) => (
            <div key={title} className="group rounded-[1.5rem] border border-white/[0.10] bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/[0.30] hover:bg-cyan-200/[0.08]">
              <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-white">{title}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/[0.55]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Product3DLaunchDemoPage() {
  return (
    <main className="overflow-hidden bg-[#05070a] text-white">
      <AuraStyles />
      <LaunchNavbar />

      <section className="aura-hero-impact relative min-h-svh overflow-hidden bg-[#05070a] pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.26),transparent_16rem),radial-gradient(circle_at_50%_46%,rgba(103,232,249,0.20),transparent_28rem),linear-gradient(180deg,#05070a_0%,#0b1017_42%,#e8edf3_43%,#f8fafc_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:70px_70px] opacity-35" />
        <div aria-hidden="true" className="absolute left-1/2 top-[43%] h-px w-[86vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)]" />

        <Container className="relative flex min-h-[calc(100svh-2rem)] flex-col items-center justify-center py-24 text-center">
          <div className="aura-ring-reveal relative z-10">
            <AuraRing size="hero" />
          </div>

          <div className="aura-text-reveal relative z-20 -mt-20 max-w-5xl sm:-mt-28">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-black/[0.28] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AURA X1 titanium AI ring
            </p>
            <h1 className="mt-7 font-display text-[clamp(4.5rem,13vw,13rem)] font-semibold leading-[0.72] tracking-[-0.105em] text-white drop-shadow-[0_28px_80px_rgba(0,0,0,0.48)]">
              Future on your finger.
            </h1>
          </div>

          <div className="aura-text-reveal-late relative z-20 mt-8 max-w-2xl">
            <p className="text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
              A cinematic product launch page for a titanium smart ring that turns sleep, focus, recovery, and daily signals into quiet intelligence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={startHref()}>Start with this design</GlassButton>
              <Link href="#design" className="group inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-slate-950/[0.10] bg-white/[0.54] px-6 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white">
                <Play className="h-4 w-4" />
                Watch reveal
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <div key={label} className="rounded-[1.35rem] border border-slate-950/[0.08] bg-white/[0.62] p-4 text-left shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                  <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-slate-950">{value}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="design" className="relative bg-[#f6f7f9] px-3 py-10 text-[#0b0f14] sm:px-5 sm:py-16">
        <Container>
          <div className="aura-view overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-5 shadow-[0_38px_120px_rgba(15,23,42,0.12)] sm:p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                  <Box className="h-4 w-4 text-cyan-500" />
                  Material story
                </p>
                <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(3.8rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-[#0b0f14]">
                  Forged from titanium.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                  This section turns the product into a premium object. Silver surfaces, glass reflections, and technical copy make the ring feel expensive before the visitor reaches the specs.
                </p>
              </div>

              <div className="relative min-h-[32rem] overflow-hidden rounded-[2.4rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_34%,rgba(103,232,249,0.24),transparent_18rem),linear-gradient(135deg,#f8fafc,#dfe5eb)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div aria-hidden="true" className="absolute inset-x-10 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.24),transparent)]" />
                <div className="relative flex min-h-[28rem] items-center justify-center">
                  <AuraRing size="large" surface="light" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-3">
                  {designFeatures.map(({ icon: Icon, title, copy }) => (
                    <article key={title} className="group rounded-[1.4rem] border border-slate-200 bg-white/[0.72] p-4 shadow-[0_18px_50px_rgba(15,23,42,0.09)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white">
                      <Icon className="h-5 w-5 text-cyan-500" />
                      <p className="mt-3 font-display text-xl font-semibold tracking-[-0.045em] text-slate-950">{title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="sensors" className="relative overflow-hidden bg-[#05070a] px-3 py-24 sm:px-5 sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(103,232,249,0.18),transparent_28rem),radial-gradient(circle_at_18%_80%,rgba(96,165,250,0.12),transparent_24rem)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:58px_58px] opacity-40" />

        <Container className="relative">
          <div className="aura-view mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.18] bg-cyan-200/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
              <Radar className="h-4 w-4" />
              Sensor array
            </p>
            <h2 className="mt-7 font-display text-[clamp(3.8rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-white">
              A quiet lab on your finger.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/[0.50]">
              Callout lines, glowing nodes, and hover panels explain what the object does without turning the page into a boring spec list.
            </p>
          </div>

          <SensorCallouts />
        </Container>
      </section>

      <section className="relative bg-[#eef2f6] px-3 py-10 text-[#0b0f14] sm:px-5 sm:py-16">
        <Container>
          <div className="aura-view overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-[0_38px_120px_rgba(15,23,42,0.12)]">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <div className="border-b border-slate-200 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                  <Cpu className="h-4 w-4 text-cyan-500" />
                  Intelligence layer
                </p>
                <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.085em]">
                  Signals become decisions.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-slate-500">
                  The launch page needs an app story too. This dashboard preview shows the data experience behind the physical product.
                </p>
              </div>

              <div className="bg-[#f8fafc] p-5 sm:p-7">
                <div className="rounded-[2.2rem] border border-slate-200 bg-[#0b0f14] p-4 text-white shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
                  <div className="flex items-center justify-between border-b border-white/[0.08] px-2 pb-4">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    </div>
                    <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-4 py-1 font-mono text-xs text-white/[0.45]">aura.health/live</span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {intelligenceCards.map(([label, value, copy], index) => (
                      <article key={label} className={index === 0 ? "rounded-[1.7rem] border border-cyan-200/[0.20] bg-cyan-200/[0.10] p-5 sm:row-span-2" : "rounded-[1.7rem] border border-white/[0.08] bg-white/[0.05] p-5"}>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-white/[0.36]">{label}</p>
                        <p className={index === 0 ? "mt-5 font-display text-7xl font-semibold leading-none tracking-[-0.08em] text-white" : "mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.07em] text-white"}>{value}</p>
                        <p className="mt-4 text-sm leading-6 text-white/[0.48]">{copy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="motion" className="relative overflow-hidden bg-[#05070a] py-24 sm:py-32">
        <Container>
          <div className="aura-view grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="px-3 sm:px-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/[0.56]">
                <Zap className="h-4 w-4 text-cyan-200" />
                Scroll story
              </p>
              <h2 className="mt-7 max-w-[8ch] font-display text-[clamp(3.6rem,7vw,7.5rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-white">
                Designed for every moment.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/[0.46]">
                The same object keeps returning in new contexts so the page feels like one continuous launch reveal.
              </p>
            </div>

            <div className="relative px-3 sm:px-5">
              <div className="sticky top-36 grid gap-5">
                {moments.map(([title, copy], index) => (
                  <article key={title} className="group grid gap-5 rounded-[2rem] border border-white/[0.10] bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200/[0.26] hover:bg-white/[0.09] lg:grid-cols-[0.45fr_1fr] lg:items-center">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/[0.16] bg-cyan-200/[0.08] font-display text-2xl font-semibold text-cyan-100">0{index + 1}</span>
                      <h3 className="font-display text-4xl font-semibold tracking-[-0.065em] text-white">{title}</h3>
                    </div>
                    <div>
                      <p className="text-sm leading-7 text-white/[0.52]">{copy}</p>
                      <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/[0.08]">
                        <span className="rounded-full bg-[linear-gradient(90deg,#f8fafc,#67e8f9,#60a5fa)] transition-all duration-700 group-hover:w-full" style={{ width: `${42 + index * 15}%` }} />
                      </div>
                    </div>
                  </article>
                ))}
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
                A product page like this needs a premium spec table, not a plain list of features. The dark panel makes the hardware feel precise and expensive.
              </p>
              <div className="mt-10">
                <AuraRing size="small" surface="light" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-950/[0.10] bg-[#090b10] p-5 text-white shadow-[0_35px_110px_rgba(15,23,42,0.24)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-cyan-100/[0.62]">aura_x1.specs</p>
                <span className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/[0.48]">Launch model</span>
              </div>

              <div className="divide-y divide-white/[0.08]">
                {specRows.map((row) => (
                  <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[0.45fr_1fr] sm:items-center">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-white/[0.34]">{row.label}</p>
                    <p className="font-display text-2xl font-semibold tracking-[-0.045em] text-white">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="waitlist" className="relative overflow-hidden bg-[#05070a] px-3 py-24 sm:px-5 sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(103,232,249,0.22),transparent_30rem),linear-gradient(180deg,#05070a,#0b0f14)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)]" />

        <Container className="relative">
          <div className="aura-view mx-auto max-w-5xl rounded-[3rem] border border-white/[0.12] bg-white/[0.06] p-6 text-center shadow-[0_44px_140px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl sm:p-10 lg:p-14">
            <Rocket className="mx-auto h-8 w-8 text-cyan-200" />
            <div className="mt-4">
              <AuraRing size="medium" />
            </div>
            <h2 className="mx-auto mt-2 max-w-3xl font-display text-[clamp(3.4rem,7vw,7.8rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-white">
              The next interface is not a screen.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/[0.50]">
              Use this direction for premium product drops, wearable tech launches, waitlists, preorder campaigns, hardware startups, and cinematic product storytelling.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <GlassButton href={startHref()}>Start with this design</GlassButton>
              <Link href="/landing-pages" className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-6 text-sm font-black text-white/[0.72] transition hover:-translate-y-1 hover:bg-white/[0.10] hover:text-white">
                Back to gallery
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm text-white/[0.46]">
              {["3D object", "Scroll story", "Specs", "Pre-order"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
