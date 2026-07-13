"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  Droplets,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap,
  type LucideIcon
} from "lucide-react";

import { pulseFlavors, type PulseFlavor, type PulseFlavorKey } from "@/components/landing-pages/PulseFlavorData";

const PulseCan3DRealistic = dynamic(
  () => import("@/components/landing-pages/PulseCan3DRealistic").then((module) => module.PulseCan3DRealistic),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="absolute inset-[15%] rounded-full bg-[var(--pulse-glow)]/20 blur-[72px]" />
  }
);

const startHref =
  "/start-project?package=landing-page&source=ecommerce-drop&design=Pulse+Drip+Energy+Drink";

type PulseStyle = CSSProperties & {
  "--pulse-primary": string;
  "--pulse-secondary": string;
  "--pulse-accent": string;
  "--pulse-glow": string;
};

const formula = [
  {
    value: "180",
    unit: "MG",
    title: "Clean caffeine",
    copy: "A focused lift designed for training, creating, competing, and everything after.",
    Icon: Zap
  },
  {
    value: "0",
    unit: "G",
    title: "Zero sugar",
    copy: "Full flavor and a crisp finish without loading the can with unnecessary sugar.",
    Icon: ShieldCheck
  },
  {
    value: "5",
    unit: "KEY",
    title: "Electrolytes",
    copy: "A balanced mineral blend to support the pace when the day refuses to slow down.",
    Icon: Droplets
  },
  {
    value: "B6+B12",
    unit: "",
    title: "Focus support",
    copy: "B vitamins and L-theanine round out the formula for energy that feels more composed.",
    Icon: Brain
  }
] as const;

const reviews = [
  {
    quote: "It tastes bright, hits fast, and does not leave me feeling wrecked two hours later.",
    name: "Jules M.",
    use: "Morning training"
  },
  {
    quote: "Berry Voltage replaced the second coffee at the studio. The flavor is actually excellent.",
    name: "Ari K.",
    use: "Creative work"
  },
  {
    quote: "Arctic Rush is ridiculously clean. Cold can, long session, zero heavy finish.",
    name: "Noah R.",
    use: "Late-night gaming"
  }
] as const;

function ActionLink({
  href,
  children,
  inverted = false
}: {
  href: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[3.35rem] items-center justify-center gap-3 rounded-full border px-6 text-[0.62rem] font-black uppercase tracking-[0.19em] transition duration-300 ${
        inverted
          ? "border-white/24 bg-white text-[#090b0e] hover:border-[var(--pulse-primary)] hover:bg-[var(--pulse-primary)]"
          : "border-white/20 bg-white/[0.06] text-white backdrop-blur-xl hover:border-[var(--pulse-primary)] hover:bg-[var(--pulse-primary)] hover:text-[#090b0e]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function BrandMark() {
  return (
    <span className="flex items-center gap-3 text-white">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/18 bg-white/[0.06]">
        <span className="absolute h-8 w-8 rotate-45 border-2 border-[var(--pulse-primary)] transition-colors duration-700" />
        <Zap className="relative z-10 h-4 w-4 fill-[var(--pulse-primary)] text-[var(--pulse-primary)] transition-colors duration-700" />
      </span>
      <span>
        <strong className="block text-lg font-black leading-none tracking-[-0.045em]">PULSE DRIP</strong>
        <small className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.25em] text-white/42">Clean energy system</small>
      </span>
    </span>
  );
}

function MiniCan({ flavor }: { flavor: PulseFlavor }) {
  return (
    <div
      className="relative h-[18rem] w-[7.3rem] shrink-0 overflow-hidden rounded-[1.15rem] border border-white/32 shadow-[0_28px_70px_rgba(0,0,0,.26)] transition duration-500 group-hover:-translate-y-3 group-hover:rotate-[-3deg]"
      style={{
        background: `linear-gradient(145deg, ${flavor.secondary} 0%, ${flavor.base} 48%, ${flavor.accent} 100%)`
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-0 h-4 bg-[linear-gradient(180deg,#eef2f4,#8d969d)]" />
      <div className="absolute inset-x-0 bottom-0 h-3 bg-[linear-gradient(180deg,#7f888e,#d9dde0)]" />
      <div className="absolute -right-4 top-0 h-full w-8 rotate-[14deg] bg-white/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center" style={{ color: flavor.ink }}>
        <span className="text-[2.1rem] font-black leading-[0.75] tracking-[-0.1em]">PULSE</span>
        <span className="text-[2.45rem] font-black leading-[0.78] tracking-[-0.1em]">DRIP</span>
        <span className="mt-4 text-[0.48rem] font-black uppercase tracking-[0.17em]">{flavor.name}</span>
      </div>
    </div>
  );
}

function MetricCard({
  value,
  unit,
  title,
  copy,
  Icon
}: {
  value: string;
  unit: string;
  title: string;
  copy: string;
  Icon: LucideIcon;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[var(--pulse-primary)]/45 hover:bg-white/[0.075] sm:p-7">
      <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[var(--pulse-primary)]/10 blur-2xl transition duration-700 group-hover:bg-[var(--pulse-primary)]/20" />
      <div className="relative flex items-start justify-between gap-5">
        <div>
          <strong className="text-[clamp(3.2rem,5vw,5.4rem)] font-black leading-none tracking-[-0.08em]">
            {value}
          </strong>
          {unit ? <span className="ml-2 text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/40">{unit}</span> : null}
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-[var(--pulse-primary)] transition-colors duration-700">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <h3 className="relative mt-8 text-xl font-black tracking-[-0.035em]">{title}</h3>
      <p className="relative mt-3 text-sm leading-7 text-white/48">{copy}</p>
    </article>
  );
}

export function EcommerceDropExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFlavorKey, setActiveFlavorKey] = useState<PulseFlavorKey>("citrus");
  const [packSize, setPackSize] = useState<"4" | "12" | "24">("12");

  const activeFlavor = pulseFlavors.find((flavor) => flavor.key === activeFlavorKey) ?? pulseFlavors[0];
  const pageStyle: PulseStyle = {
    "--pulse-primary": activeFlavor.base,
    "--pulse-secondary": activeFlavor.secondary,
    "--pulse-accent": activeFlavor.accent,
    "--pulse-glow": activeFlavor.glow
  };

  return (
    <main style={pageStyle} className="overflow-hidden bg-[#090b0e] text-white transition-colors duration-700">
      <section className="relative min-h-svh overflow-hidden border-b border-white/8">
        <div
          aria-hidden="true"
          className="absolute inset-0 transition duration-700"
          style={{
            background: `radial-gradient(circle at 73% 42%, ${activeFlavor.glow}25 0%, transparent 34%), radial-gradient(circle at 20% 18%, ${activeFlavor.secondary}15 0%, transparent 31%), #090b0e`
          }}
        />
        <div aria-hidden="true" className="pulse-grid absolute inset-0 opacity-25" />
        <div aria-hidden="true" className="absolute -left-24 top-[24%] h-72 w-72 rounded-full border-[56px] border-white/[0.025]" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border-[86px] border-[var(--pulse-primary)]/[0.05] transition-colors duration-700" />

        <header className="relative z-40 mx-auto flex w-full max-w-[1580px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.6rem] font-black uppercase tracking-[0.19em] text-white/46 lg:flex">
            <a className="transition hover:text-[var(--pulse-primary)]" href="#flavors">Flavors</a>
            <a className="transition hover:text-[var(--pulse-primary)]" href="#formula">Formula</a>
            <a className="transition hover:text-[var(--pulse-primary)]" href="#reviews">Reviews</a>
            <a className="transition hover:text-[var(--pulse-primary)]" href="#shop">Shop</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#shop"
              className="hidden min-h-11 items-center gap-3 rounded-full border border-white/14 bg-white/[0.05] px-5 text-[0.58rem] font-black uppercase tracking-[0.18em] backdrop-blur-xl transition hover:border-[var(--pulse-primary)] hover:text-[var(--pulse-primary)] sm:inline-flex"
            >
              <ShoppingBag className="h-4 w-4" />
              Build a pack
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/[0.05] backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 rounded-[1.6rem] border border-white/12 bg-[#111419]/96 p-7 shadow-[0_34px_100px_rgba(0,0,0,.44)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 text-3xl font-black tracking-[-0.05em]">
              <a href="#flavors" onClick={() => setMenuOpen(false)}>Flavors</a>
              <a href="#formula" onClick={() => setMenuOpen(false)}>Formula</a>
              <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a className="text-[var(--pulse-primary)]" href="#shop" onClick={() => setMenuOpen(false)}>Build a pack</a>
            </nav>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1580px] gap-4 px-5 pb-6 sm:px-8 sm:pb-9 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pb-12">
          <div className="flex flex-col justify-center py-14 lg:py-20">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-[0.54rem] font-black uppercase tracking-[0.21em] text-white/62 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--pulse-primary)] shadow-[0_0_0_5px_color-mix(in_srgb,var(--pulse-primary)_18%,transparent)]" />
              New drop · four clean flavors
            </div>

            <p className="mt-9 text-[0.6rem] font-black uppercase tracking-[0.32em] text-[var(--pulse-primary)] transition-colors duration-700">
              PULSE DRIP / {activeFlavor.number}
            </p>
            <h1 className="mt-5 max-w-[8.5ch] text-[clamp(5rem,9vw,10.5rem)] font-black leading-[0.72] tracking-[-0.095em]">
              Fuel the moment.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/54 sm:text-lg sm:leading-9">
              Clean energy, zero sugar, and four bold flavors built for the hours when stopping is not part of the plan.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="#shop" inverted>Build a mixed pack</ActionLink>
              <ActionLink href="#flavors">Explore the drop</ActionLink>
            </div>

            <div className="mt-12 border-t border-white/12 pt-6">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/34">Now pouring</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] sm:text-4xl">{activeFlavor.name}</h2>
                  <p className="mt-2 text-sm text-white/44">{activeFlavor.tastingNote}</p>
                </div>
                <p className="hidden text-right text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/30 sm:block">
                  12 fl oz<br />355 ml
                </p>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-4">
                {pulseFlavors.map((flavor) => {
                  const active = flavor.key === activeFlavorKey;
                  return (
                    <button
                      key={flavor.key}
                      type="button"
                      onClick={() => setActiveFlavorKey(flavor.key)}
                      className={`group flex min-h-[4.4rem] items-center gap-3 rounded-[1.15rem] border px-3 text-left transition duration-300 ${
                        active
                          ? "border-white/24 bg-white/[0.10]"
                          : "border-white/8 bg-white/[0.025] hover:border-white/18 hover:bg-white/[0.06]"
                      }`}
                      aria-pressed={active}
                    >
                      <span
                        className="h-9 w-2 rounded-full shadow-[0_0_24px_currentColor]"
                        style={{ background: flavor.base, color: flavor.glow }}
                      />
                      <span>
                        <span className="block text-[0.46rem] font-black uppercase tracking-[0.18em] text-white/34">{flavor.number}</span>
                        <span className="mt-1 block text-sm font-black">{flavor.shortName}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative min-h-[68svh] lg:min-h-0">
            <div className="absolute inset-[4%] rounded-[2.6rem] border border-white/8 bg-white/[0.025] backdrop-blur-sm" />
            <div className="absolute left-[7%] top-[9%] rounded-full border border-white/12 bg-black/20 px-4 py-2 text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/42 backdrop-blur-xl">
              Interactive product model
            </div>
            <PulseCan3DRealistic flavor={activeFlavor} className="absolute inset-0" />
            <div className="absolute bottom-[8%] left-[7%] grid gap-2 text-[0.48rem] font-black uppercase tracking-[0.18em] text-white/32 sm:grid-cols-3 sm:gap-5">
              <span>Zero sugar</span>
              <span>180mg caffeine</span>
              <span>Five electrolytes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[var(--pulse-primary)] text-[#090b0e] transition-colors duration-700">
        <div className="mx-auto grid max-w-[1580px] gap-0 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            ["180mg", "Clean caffeine"],
            ["0g", "Sugar"],
            ["15", "Calories"],
            ["4", "Bold flavors"]
          ].map(([value, label], index) => (
            <div key={label} className={`flex items-center gap-4 py-5 sm:px-5 ${index > 0 ? "border-t border-black/14 sm:border-l sm:border-t-0" : ""}`}>
              <strong className="text-3xl font-black tracking-[-0.06em]">{value}</strong>
              <span className="text-[0.52rem] font-black uppercase tracking-[0.16em] opacity-60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="absolute left-[14%] top-[12%] h-72 w-72 rounded-full bg-[var(--pulse-primary)]/8 blur-[90px]" />
        <div className="relative mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[var(--pulse-primary)]">Built to hit clean</p>
              <h2 className="mt-6 max-w-[8ch] text-[clamp(4rem,7vw,8rem)] font-black leading-[0.75] tracking-[-0.085em]">
                Energy without the heavy ending.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/48 lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              PULSE DRIP is built around a fast, useful lift and a crisp finish—so the can feels as good at the end of the session as it did at the start.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {formula.map((item) => <MetricCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>

      <section id="flavors" className="relative overflow-hidden bg-[#eef1f2] px-5 py-24 text-[#0a0c0f] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-8 border-b border-black/14 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#4c5155]">The full drop</p>
              <h2 className="mt-5 max-w-[9ch] text-[clamp(4.2rem,7vw,8rem)] font-black leading-[0.75] tracking-[-0.085em]">
                Pick your kind of charge.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/52">
              Four distinct flavor systems. Same clean formula. Build a mixed case or lock into the one that keeps calling.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {pulseFlavors.map((flavor, index) => (
              <article
                key={flavor.key}
                className="group relative min-h-[34rem] overflow-hidden rounded-[2.25rem] border border-black/10 p-6 shadow-[0_28px_80px_rgba(10,12,15,.10)] sm:p-8"
                style={{
                  background: `linear-gradient(145deg, ${flavor.secondary} 0%, ${flavor.base} 48%, ${flavor.accent} 125%)`,
                  color: flavor.ink
                }}
              >
                <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[54px] border-white/15" />
                <div aria-hidden="true" className="absolute bottom-[18%] left-[8%] h-24 w-24 rounded-full border-[18px] border-white/14" />
                <div aria-hidden="true" className="pulse-droplet absolute right-[15%] top-[18%] h-9 w-6 rotate-[18deg] rounded-[60%_40%_68%_32%] bg-white/36 blur-[1px]" />

                <div className="relative flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] opacity-56">Flavor {flavor.number}</p>
                    <h3 className="mt-3 max-w-[7ch] text-[clamp(3.5rem,5.4vw,6rem)] font-black leading-[0.76] tracking-[-0.08em]">
                      {flavor.name}
                    </h3>
                    <p className="mt-5 max-w-sm text-sm font-semibold leading-7 opacity-64">{flavor.tastingNote}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-current/20 bg-white/12 text-sm font-black">
                    0{index + 1}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5 sm:bottom-8 sm:left-8 sm:right-8">
                  <MiniCan flavor={flavor} />
                  <div className="pb-2 text-right">
                    <p className="text-[0.48rem] font-black uppercase tracking-[0.18em] opacity-52">12 pack</p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.055em]">$32</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFlavorKey(flavor.key);
                        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-current/25 bg-white/20 px-4 py-3 text-[0.52rem] font-black uppercase tracking-[0.16em] backdrop-blur-xl transition hover:bg-white/40"
                    >
                      Choose flavor <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formula" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="absolute inset-0 pulse-grid opacity-16" />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative min-h-[42rem] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035]">
            <div
              className="absolute inset-[8%] rounded-full blur-[68px]"
              style={{ background: `radial-gradient(circle, ${activeFlavor.glow}45 0%, transparent 68%)` }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative grid h-[27rem] w-[27rem] max-w-[78vw] place-items-center rounded-full border border-white/10">
                <div className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-white/12 pulse-spin" />
                <div className="absolute h-[58%] w-[58%] rounded-full border border-white/10" />
                <div className="relative text-center">
                  <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-[var(--pulse-primary)]">Pulse formula</p>
                  <strong className="mt-3 block text-[6.4rem] font-black leading-none tracking-[-0.1em] sm:text-[8rem]">04</strong>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-white/42">core systems</p>
                </div>
                {formula.map((item, index) => {
                  const positions = ["left-[2%] top-[18%]", "right-[2%] top-[18%]", "bottom-[8%] left-[7%]", "bottom-[8%] right-[7%]"];
                  return (
                    <span key={item.title} className={`absolute ${positions[index]} rounded-full border border-white/12 bg-[#101318]/80 px-3 py-2 text-[0.48rem] font-black uppercase tracking-[0.16em] text-white/56 backdrop-blur-xl`}>
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[var(--pulse-primary)]">The clean energy system</p>
            <h2 className="mt-6 max-w-[9ch] text-[clamp(4.2rem,7vw,8rem)] font-black leading-[0.75] tracking-[-0.085em]">
              Engineered for the hours that matter.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9">
              A compact formula built around useful energy, clear flavor, and enough support to keep the next move feeling deliberate.
            </p>

            <div className="mt-10 border-t border-white/12">
              {[
                ["01", "Fast lift", "Caffeine gets the energy moving without making the can taste medicinal."],
                ["02", "Composed focus", "L-theanine helps smooth the edge when the schedule gets loud."],
                ["03", "Mineral support", "Electrolytes keep the formula useful beyond the first cold sip."],
                ["04", "Clean finish", "Zero sugar and a restrained sweetness profile keep every flavor crisp."]
              ].map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-white/12 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="text-[0.5rem] font-black tracking-[0.18em] text-[var(--pulse-primary)]">{number}</span>
                  <div>
                    <h3 className="text-xl font-black tracking-[-0.035em]">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/42">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[var(--pulse-primary)] px-5 py-24 text-[#090b0e] transition-colors duration-700 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-8 border-b border-black/18 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] opacity-58">Field tested</p>
              <h2 className="mt-5 max-w-[9ch] text-[clamp(4.1rem,7vw,8rem)] font-black leading-[0.75] tracking-[-0.085em]">
                Built for people already in motion.
              </h2>
            </div>
            <div className="flex items-center gap-3 md:pb-3">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] opacity-58">4.9 average</span>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <article key={review.name} className={`rounded-[1.9rem] border border-black/16 p-7 sm:p-8 ${index === 1 ? "bg-[#090b0e] text-white md:-translate-y-7" : "bg-white/24"}`}>
                <Sparkles className={`h-5 w-5 ${index === 1 ? "text-[var(--pulse-primary)]" : ""}`} />
                <p className="mt-9 text-2xl font-black leading-[1.08] tracking-[-0.045em]">“{review.quote}”</p>
                <div className={`mt-8 border-t pt-5 ${index === 1 ? "border-white/14" : "border-black/14"}`}>
                  <p className="text-[0.52rem] font-black uppercase tracking-[0.18em]">{review.name}</p>
                  <p className={`mt-2 text-xs ${index === 1 ? "text-white/42" : "opacity-55"}`}>{review.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div
          aria-hidden="true"
          className="absolute -bottom-52 -right-40 h-[42rem] w-[42rem] rounded-full border-[110px] opacity-10 transition-colors duration-700"
          style={{ borderColor: activeFlavor.base }}
        />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_0.76fr] lg:items-center">
          <div>
            <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[var(--pulse-primary)]">Build your drop</p>
            <h2 className="mt-7 max-w-[8ch] text-[clamp(4.8rem,8vw,9.5rem)] font-black leading-[0.72] tracking-[-0.095em]">
              Pick the flavor. Set the pace.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              Start with {activeFlavor.name}, or build a mixed pack with all four. Every case ships cold-ready and backed by a 30-day flavor guarantee.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-[0.53rem] font-black uppercase tracking-[0.17em] text-white/44">
              {["Free shipping over $40", "30-day flavor guarantee", "Ships in 1–2 days"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-[var(--pulse-primary)]" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_34px_110px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-8">
            <div className="flex items-start justify-between gap-5 border-b border-white/12 pb-6">
              <div>
                <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/34">Selected flavor</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.055em]">{activeFlavor.name}</h3>
              </div>
              <span className="h-12 w-3 rounded-full" style={{ background: activeFlavor.base, boxShadow: `0 0 28px ${activeFlavor.glow}` }} />
            </div>

            <div className="mt-7">
              <p className="text-[0.5rem] font-black uppercase tracking-[0.19em] text-white/34">Choose your case</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {(["4", "12", "24"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPackSize(size)}
                    className={`rounded-[1.15rem] border px-3 py-5 text-center transition ${
                      packSize === size
                        ? "border-[var(--pulse-primary)] bg-[var(--pulse-primary)] text-[#090b0e]"
                        : "border-white/10 bg-white/[0.035] hover:border-white/24"
                    }`}
                    aria-pressed={packSize === size}
                  >
                    <strong className="block text-2xl font-black tracking-[-0.05em]">{size}</strong>
                    <span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.17em] opacity-52">cans</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between border-y border-white/12 py-6">
              <div>
                <p className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/34">One-time purchase</p>
                <p className="mt-2 text-sm text-white/46">{packSize === "4" ? "$3.75" : packSize === "12" ? "$2.67" : "$2.42"} per can</p>
              </div>
              <strong className="text-5xl font-black tracking-[-0.07em]">
                {packSize === "4" ? "$15" : packSize === "12" ? "$32" : "$58"}
              </strong>
            </div>

            <button type="button" className="mt-7 flex min-h-[3.5rem] w-full items-center justify-center gap-3 rounded-full bg-[var(--pulse-primary)] px-6 text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#090b0e] transition hover:scale-[1.015]">
              Add case to cart <ShoppingBag className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-[0.48rem] font-bold uppercase tracking-[0.14em] text-white/28">Demo checkout · no payment collected</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pulse-primary)] px-5 py-20 text-[#090b0e] transition-colors duration-700 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.54rem] font-black uppercase tracking-[0.22em] opacity-58">Single-product ecommerce direction</p>
            <h2 className="mt-5 max-w-[9ch] text-[clamp(4rem,7vw,8rem)] font-black leading-[0.74] tracking-[-0.09em]">
              Make the product impossible to ignore.
            </h2>
          </div>
          <Link
            href={startHref}
            className="group inline-flex min-h-[3.5rem] shrink-0 items-center justify-center gap-3 rounded-full bg-[#090b0e] px-7 text-[0.62rem] font-black uppercase tracking-[0.19em] text-white transition hover:-translate-y-1 lg:mb-2"
          >
            Use this design <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#090b0e] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
          <BrandMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/34">
            <Link className="hover:text-[var(--pulse-primary)]" href={startHref}>Use this design</Link>
            <Link className="hover:text-[var(--pulse-primary)]" href="/landing-pages">Back to gallery</Link>
            <span>Demo concept · GridSpell Studio</span>
          </div>
        </div>
      </footer>

      <style>{`
        .pulse-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: radial-gradient(circle at 60% 42%, black, transparent 78%);
        }

        @keyframes pulse-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-droplet {
          0%, 100% { transform: translateY(0) rotate(18deg); }
          50% { transform: translateY(-13px) rotate(24deg); }
        }

        .pulse-spin { animation: pulse-spin 22s linear infinite; }
        .pulse-droplet { animation: pulse-droplet 5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .pulse-spin,
          .pulse-droplet { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
