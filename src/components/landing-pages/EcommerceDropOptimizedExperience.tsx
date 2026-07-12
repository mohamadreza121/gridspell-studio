"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Droplets,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap
} from "lucide-react";

import {
  pulseFlavors,
  type PulseFlavor,
  type PulseFlavorKey
} from "@/components/landing-pages/PulseFlavorData";

const startHref =
  "/start-project?package=landing-page&source=ecommerce-drop&design=Pulse+Drip+Energy+Drink";

type PulseStyle = CSSProperties & {
  "--pulse-primary": string;
  "--pulse-secondary": string;
  "--pulse-accent": string;
  "--pulse-glow": string;
};

const formula = [
  ["180", "MG", "Clean caffeine", "A focused lift built for training, creating, and competing.", Zap],
  ["0", "G", "Zero sugar", "Full flavor and a crisp finish without unnecessary sugar.", ShieldCheck],
  ["5", "KEY", "Electrolytes", "A balanced mineral blend that supports the pace.", Droplets],
  ["B6+B12", "", "Focus support", "B vitamins and L-theanine keep the energy composed.", Sparkles]
] as const;

const reviews = [
  ["It tastes bright, hits fast, and does not leave me feeling wrecked two hours later.", "Jules M.", "Morning training"],
  ["Berry Voltage replaced the second coffee at the studio. The flavor is actually excellent.", "Ari K.", "Creative work"],
  ["Arctic Rush is ridiculously clean. Cold can, long session, zero heavy finish.", "Noah R.", "Late-night gaming"]
] as const;

function BrandMark() {
  return (
    <span className="flex items-center gap-3 text-white">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/25 bg-white/[0.07]">
        <span className="absolute h-8 w-8 rotate-45 border-2 border-[var(--pulse-primary)]" />
        <Zap className="relative z-10 h-4 w-4 fill-[var(--pulse-primary)] text-[var(--pulse-primary)]" />
      </span>
      <span>
        <strong className="block text-lg font-black leading-none tracking-[-0.045em]">PULSE DRIP</strong>
        <small className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.25em] text-white/72">
          Clean energy system
        </small>
      </span>
    </span>
  );
}

function ProductCan({ flavor, large = false }: { flavor: PulseFlavor; large?: boolean }) {
  return (
    <div
      className={`pulse-product-can relative shrink-0 overflow-hidden rounded-[1.3rem] border border-white/35 shadow-[0_32px_70px_rgba(0,0,0,.32)] ${
        large ? "h-[29rem] w-[11.5rem] sm:h-[34rem] sm:w-[13.5rem]" : "h-[18rem] w-[7.2rem]"
      }`}
      style={{
        background: `linear-gradient(145deg, ${flavor.secondary} 0%, ${flavor.base} 50%, ${flavor.accent} 120%)`,
        color: flavor.ink
      }}
      aria-label={`Pulse Drip ${flavor.name} can`}
    >
      <div className="absolute inset-x-0 top-0 h-5 bg-[linear-gradient(180deg,#f7fafb,#8c969d)]" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-[linear-gradient(180deg,#747d83,#e5e8ea)]" />
      <div className="absolute -right-5 top-0 h-full w-10 rotate-[13deg] bg-white/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <span className={`${large ? "text-[3.3rem]" : "text-[2.05rem]"} font-black leading-[0.74] tracking-[-0.1em]`}>
          PULSE
        </span>
        <span className={`${large ? "text-[3.8rem]" : "text-[2.4rem]"} font-black leading-[0.77] tracking-[-0.1em]`}>
          DRIP
        </span>
        <span className="mt-5 text-[0.52rem] font-black uppercase tracking-[0.18em]">{flavor.name}</span>
      </div>
    </div>
  );
}

export function EcommerceDropOptimizedExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFlavorKey, setActiveFlavorKey] = useState<PulseFlavorKey>("citrus");
  const [packSize, setPackSize] = useState<"4" | "12" | "24">("12");

  const activeFlavor =
    pulseFlavors.find((flavor) => flavor.key === activeFlavorKey) ?? pulseFlavors[0];

  const pageStyle: PulseStyle = {
    "--pulse-primary": activeFlavor.base,
    "--pulse-secondary": activeFlavor.secondary,
    "--pulse-accent": activeFlavor.accent,
    "--pulse-glow": activeFlavor.glow
  };

  return (
    <main style={pageStyle} className="pulse-drop overflow-hidden bg-[#090b0e] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 73% 42%, ${activeFlavor.glow}24 0%, transparent 34%), radial-gradient(circle at 20% 18%, ${activeFlavor.secondary}14 0%, transparent 31%), #090b0e`
          }}
        />
        <div aria-hidden="true" className="pulse-grid absolute inset-0 opacity-20" />

        <header className="relative z-40 mx-auto flex w-full max-w-[1580px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.6rem] font-black uppercase tracking-[0.19em] text-white/72 lg:flex">
            <a href="#flavors">Flavors</a>
            <a href="#formula">Formula</a>
            <a href="#reviews">Reviews</a>
            <a href="#shop">Shop</a>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.07] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {menuOpen ? (
          <nav className="absolute inset-x-4 top-20 z-50 grid gap-5 rounded-[1.5rem] border border-white/15 bg-[#111419] p-7 text-3xl font-black tracking-[-0.05em] sm:inset-x-8 lg:hidden">
            {[["Flavors", "#flavors"], ["Formula", "#formula"], ["Reviews", "#reviews"], ["Build a pack", "#shop"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        ) : null}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1580px] gap-8 px-5 pb-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pb-12">
          <div className="flex flex-col justify-center py-12 lg:py-20">
            <p className="w-fit rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[0.54rem] font-black uppercase tracking-[0.21em] text-white/78">
              New drop · four clean flavors
            </p>
            <p className="mt-9 text-[0.6rem] font-black uppercase tracking-[0.32em] text-[var(--pulse-primary)]">
              PULSE DRIP / {activeFlavor.number}
            </p>
            <h1 className="mt-5 max-w-[8.5ch] text-[clamp(5rem,9vw,10.5rem)] font-black leading-[0.72] tracking-[-0.095em]">
              Fuel the moment.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
              Clean energy, zero sugar, and four bold flavors built for the hours when stopping is not part of the plan.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-6 text-[0.62rem] font-black uppercase tracking-[0.19em] text-[#090b0e]">
                Build a mixed pack <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#flavors" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/25 bg-white/[0.07] px-6 text-[0.62rem] font-black uppercase tracking-[0.19em]">
                Explore the drop <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-2 sm:grid-cols-4">
              {pulseFlavors.map((flavor) => (
                <button
                  key={flavor.key}
                  type="button"
                  onClick={() => setActiveFlavorKey(flavor.key)}
                  className={`flex min-h-[4.25rem] items-center gap-3 rounded-[1rem] border px-3 text-left ${
                    flavor.key === activeFlavorKey ? "border-white/30 bg-white/[0.11]" : "border-white/12 bg-white/[0.035]"
                  }`}
                  aria-pressed={flavor.key === activeFlavorKey}
                >
                  <span className="h-9 w-2 rounded-full" style={{ background: flavor.base }} />
                  <span>
                    <span className="block text-[0.48rem] font-black uppercase tracking-[0.18em] text-white/68">{flavor.number}</span>
                    <span className="mt-1 block text-sm font-black">{flavor.shortName}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative grid min-h-[34rem] place-items-center lg:min-h-0">
            <div className="absolute h-[72%] w-[72%] rounded-full bg-[var(--pulse-glow)] opacity-25 blur-[76px]" />
            <ProductCan flavor={activeFlavor} large />
            <div className="absolute bottom-[6%] flex gap-5 text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/72">
              <span>Zero sugar</span><span>180mg caffeine</span><span className="hidden sm:inline">Five electrolytes</span>
            </div>
          </div>
        </div>
      </section>

      <section id="formula" className="pulse-deferred px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[var(--pulse-primary)]">Built to hit clean</p>
          <h2 className="mt-6 max-w-[9ch] text-[clamp(4rem,7vw,8rem)] font-black leading-[0.76] tracking-[-0.085em]">Energy without the heavy ending.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {formula.map(([value, unit, title, copy, Icon]) => (
              <article key={title} className="rounded-[1.8rem] border border-white/12 bg-white/[0.055] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div><strong className="text-5xl font-black tracking-[-0.08em]">{value}</strong>{unit ? <span className="ml-2 text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/72">{unit}</span> : null}</div>
                  <Icon className="h-5 w-5 text-[var(--pulse-primary)]" />
                </div>
                <h3 className="mt-8 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="flavors" className="pulse-deferred bg-[#eef1f2] px-5 py-24 text-[#0a0c0f] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-8 border-b border-black/20 pb-9 md:flex-row md:items-end md:justify-between">
            <div><p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#454a4e]">The full drop</p><h2 className="mt-5 max-w-[9ch] text-[clamp(4rem,7vw,8rem)] font-black leading-[0.76] tracking-[-0.085em]">Pick your kind of charge.</h2></div>
            <p className="max-w-sm text-sm leading-7 text-black/72">Four distinct flavor systems. Same clean formula. Build a mixed case or lock in your favorite.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {pulseFlavors.map((flavor, index) => (
              <article key={flavor.key} className="relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-black/12 p-6 sm:p-8" style={{ background: `linear-gradient(145deg, ${flavor.secondary}, ${flavor.base} 50%, ${flavor.accent} 125%)`, color: flavor.ink }}>
                <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] opacity-75">Flavor {flavor.number}</p>
                <h3 className="mt-3 max-w-[7ch] text-[clamp(3.4rem,5.4vw,6rem)] font-black leading-[0.76] tracking-[-0.08em]">{flavor.name}</h3>
                <p className="mt-5 max-w-sm text-sm font-semibold leading-7 opacity-80">{flavor.tastingNote}</p>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
                  <ProductCan flavor={flavor} />
                  <div className="text-right"><p className="text-[0.5rem] font-black uppercase tracking-[0.18em] opacity-75">12 pack</p><p className="mt-2 text-3xl font-black">$32</p><button type="button" onClick={() => { setActiveFlavorKey(flavor.key); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-5 inline-flex items-center gap-2 rounded-full border border-current/30 bg-white/25 px-4 py-3 text-[0.52rem] font-black uppercase tracking-[0.16em]">Choose flavor <ChevronRight className="h-4 w-4" /></button></div>
                </div>
                <span className="absolute right-6 top-6 text-sm font-black">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="pulse-deferred bg-[var(--pulse-primary)] px-5 py-24 text-[#090b0e] sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex items-end justify-between gap-8 border-b border-black/20 pb-9"><div><p className="text-[0.56rem] font-black uppercase tracking-[0.24em] opacity-75">Field tested</p><h2 className="mt-5 max-w-[9ch] text-[clamp(4rem,7vw,8rem)] font-black leading-[0.76] tracking-[-0.085em]">Built for people already in motion.</h2></div><span className="hidden items-center gap-2 text-sm font-black md:flex"><Star className="h-4 w-4 fill-current" />4.9 average</span></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map(([quote, name, use], index) => (
              <article key={name} className={`rounded-[1.9rem] border border-black/20 p-7 sm:p-8 ${index === 1 ? "bg-[#090b0e] text-white" : "bg-white/35"}`}>
                <Sparkles className="h-5 w-5" /><p className="mt-9 text-2xl font-black leading-[1.08]">“{quote}”</p><div className={`mt-8 border-t pt-5 ${index === 1 ? "border-white/20" : "border-black/20"}`}><p className="text-[0.52rem] font-black uppercase tracking-[0.18em]">{name}</p><p className={`mt-2 text-xs ${index === 1 ? "text-white/72" : "opacity-80"}`}>{use}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="pulse-deferred px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_.76fr] lg:items-center">
          <div><p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[var(--pulse-primary)]">Build your drop</p><h2 className="mt-7 max-w-[8ch] text-[clamp(4.6rem,8vw,9rem)] font-black leading-[0.72] tracking-[-0.095em]">Pick the flavor. Set the pace.</h2><p className="mt-8 max-w-xl text-base leading-8 text-white/72">Start with {activeFlavor.name}, or build a mixed pack with all four flavors.</p><div className="mt-9 flex flex-wrap gap-3 text-[0.53rem] font-black uppercase tracking-[0.17em] text-white/72">{["Free shipping over $40", "30-day flavor guarantee", "Ships in 1–2 days"].map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-3 py-2"><Check className="h-3.5 w-3.5 text-[var(--pulse-primary)]" />{item}</span>)}</div></div>
          <div className="rounded-[2.2rem] border border-white/15 bg-white/[0.055] p-6 sm:p-8">
            <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/72">Selected flavor</p><h3 className="mt-2 text-3xl font-black">{activeFlavor.name}</h3>
            <p className="mt-7 text-[0.5rem] font-black uppercase tracking-[0.19em] text-white/72">Choose your case</p>
            <div className="mt-4 grid grid-cols-3 gap-3">{(["4", "12", "24"] as const).map((size) => <button key={size} type="button" onClick={() => setPackSize(size)} aria-pressed={packSize === size} className={`rounded-[1rem] border px-3 py-5 ${packSize === size ? "border-[var(--pulse-primary)] bg-[var(--pulse-primary)] text-[#090b0e]" : "border-white/15 bg-white/[0.04]"}`}><strong className="block text-2xl font-black">{size}</strong><span className="mt-1 block text-[0.45rem] font-black uppercase tracking-[0.17em] opacity-75">cans</span></button>)}</div>
            <div className="mt-7 flex items-end justify-between border-y border-white/15 py-6"><div><p className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/72">One-time purchase</p><p className="mt-2 text-sm text-white/72">{packSize === "4" ? "$3.75" : packSize === "12" ? "$2.67" : "$2.42"} per can</p></div><strong className="text-5xl font-black">{packSize === "4" ? "$15" : packSize === "12" ? "$32" : "$58"}</strong></div>
            <button type="button" className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[var(--pulse-primary)] px-6 text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#090b0e]">Add case to cart <ShoppingBag className="h-4 w-4" /></button><p className="mt-4 text-center text-[0.48rem] font-bold uppercase tracking-[0.14em] text-white/68">Demo checkout · no payment collected</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#090b0e] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between"><BrandMark /><div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/72"><Link href={startHref}>Use this design</Link><Link href="/landing-pages">Back to gallery</Link><span>Demo concept · GridSpell Studio</span></div></div>
      </footer>

      <style>{`
        .pulse-grid { background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 54px 54px; mask-image: radial-gradient(circle at 60% 42%, black, transparent 78%); }
        .pulse-product-can { transform: rotate(-2deg); transition: transform 260ms ease; }
        .pulse-product-can:hover { transform: translateY(-6px) rotate(1deg); }
        .pulse-deferred { content-visibility: auto; contain-intrinsic-size: 900px; }
        @media (max-width: 767px) { .pulse-product-can { transition: none; } .pulse-product-can:hover { transform: rotate(-2deg); } }
        @media (prefers-reduced-motion: reduce) { .pulse-product-can { transition: none; } }
      `}</style>
    </main>
  );
}
