"use client";

import Image from "next/image";

import Link from "next/link";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Filter,
  Monitor,
  Sparkles,
  Wand2
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  landingPageConcepts,
  type LandingPageConcept
} from "@/config/landing-pages";

type GalleryTheme = {
  ink: string;
  paper: string;
  accent: string;
  accent2: string;
  decor:
    | "grid"
    | "orbit"
    | "editorial"
    | "halo"
    | "frame"
    | "bubbles"
    | "slashes"
    | "columns"
    | "petals"
    | "paper"
    | "charge"
    | "signal";
};

type ThemeStyle = CSSProperties & {
  "--card-ink": string;
  "--card-paper": string;
  "--card-accent": string;
  "--card-accent-2": string;
};

const themes: Record<string, GalleryTheme> = {
  "contractor-pro": {
    ink: "#0f172a",
    paper: "#f8fafc",
    accent: "#f97316",
    accent2: "#fbbf24",
    decor: "grid"
  },
  "saas-modern": {
    ink: "#070514",
    paper: "#101027",
    accent: "#8b5cf6",
    accent2: "#22d3ee",
    decor: "orbit"
  },
  "restaurant-local": {
    ink: "#431407",
    paper: "#fff7ed",
    accent: "#b45309",
    accent2: "#efc27d",
    decor: "editorial"
  },
  "product-3d-launch": {
    ink: "#030712",
    paper: "#090d1c",
    accent: "#22d3ee",
    accent2: "#8b5cf6",
    decor: "halo"
  },
  "luxury-real-estate": {
    ink: "#17150f",
    paper: "#eee8dc",
    accent: "#c8a45e",
    accent2: "#f7f1e5",
    decor: "frame"
  },
  "dental-trust": {
    ink: "#15312b",
    paper: "#f5f8f5",
    accent: "#bfe8d1",
    accent2: "#6ea691",
    decor: "bubbles"
  },
  "fitness-coach": {
    ink: "#070909",
    paper: "#101311",
    accent: "#c7ff2f",
    accent2: "#3157ff",
    decor: "slashes"
  },
  "law-firm-classic": {
    ink: "#2a1919",
    paper: "#f4eee4",
    accent: "#7d2634",
    accent2: "#b79658",
    decor: "columns"
  },
  "beauty-booking": {
    ink: "#3d2620",
    paper: "#f7e9df",
    accent: "#c96f54",
    accent2: "#eab8ae",
    decor: "petals"
  },
  "creator-brand": {
    ink: "#2e2419",
    paper: "#eee1c6",
    accent: "#d6a62f",
    accent2: "#7f2636",
    decor: "paper"
  },
  "ecommerce-drop": {
    ink: "#07090b",
    paper: "#111318",
    accent: "#c8ff2f",
    accent2: "#8f2cff",
    decor: "charge"
  },
  "event-launch": {
    ink: "#090717",
    paper: "#161127",
    accent: "#7c3cff",
    accent2: "#dfff34",
    decor: "signal"
  }
};

const categoryOptions = [
  "All",
  ...Array.from(new Set(landingPageConcepts.map((concept) => concept.category)))
];

const styleOptions = ["All", "Classic", "Modern", "3D", "Luxury", "Bold"];

const quizBusinessOptions = [
  { label: "Local service", tokens: ["home", "contractor", "dental", "restaurant", "beauty", "professional"] },
  { label: "Software / app", tokens: ["saas", "software", "ai", "dashboard", "startup"] },
  { label: "Product / ecommerce", tokens: ["product", "ecommerce", "commerce", "launch"] },
  { label: "Personal brand", tokens: ["creator", "personal", "consultant", "coach"] },
  { label: "Event / campaign", tokens: ["event", "workshop", "conference", "registration"] }
] as const;

const quizGoalOptions = [
  { label: "Get leads", tokens: ["estimate", "consultation", "inquiry", "lead"] },
  { label: "Book appointments", tokens: ["booking", "reservations", "appointment", "calls"] },
  { label: "Sell or preorder", tokens: ["sales", "preorders", "waitlist", "product"] },
  { label: "Grow audience", tokens: ["email", "newsletter", "creator"] },
  { label: "Register people", tokens: ["registration", "tickets", "events"] }
] as const;

const quizStyleOptions = [
  { label: "Classic", tokens: ["classic", "trust", "professional"] },
  { label: "Modern", tokens: ["modern", "tech", "editorial"] },
  { label: "Premium", tokens: ["luxury", "premium", "soft"] },
  { label: "Bold", tokens: ["bold", "campaign", "energetic"] },
  { label: "3D / wow", tokens: ["3d", "product", "launch"] }
] as const;

const heroConcepts = ["event-launch", "beauty-booking", "ecommerce-drop"]
  .map((slug) => landingPageConcepts.find((concept) => concept.slug === slug))
  .filter((concept): concept is LandingPageConcept => Boolean(concept));

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });
  return `/start-project?${params.toString()}`;
}

function screenshotPath(concept: LandingPageConcept) {
  return `/landing-page-screenshots/${concept.slug}.jpg`;
}

function getTheme(concept: LandingPageConcept) {
  return themes[concept.slug] ?? {
    ink: concept.palette[1] ?? "#08090d",
    paper: concept.palette[2] ?? "#111318",
    accent: concept.palette[0] ?? "#8be9ff",
    accent2: concept.palette[1] ?? "#7c5cff",
    decor: "orbit" as const
  };
}

function getRecommendation(business: string, goal: string, style: string) {
  const options = [...quizBusinessOptions, ...quizGoalOptions, ...quizStyleOptions];
  const labels = [business, goal, style];
  const tokens = labels.flatMap((label) => options.find((option) => option.label === label)?.tokens ?? []);

  return landingPageConcepts
    .map((concept) => {
      const searchable = [
        concept.slug,
        concept.title,
        concept.category,
        concept.businessType,
        concept.style,
        concept.styleFamily,
        concept.goal,
        concept.tags.join(" "),
        concept.recommendedFor.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return {
        concept,
        score: tokens.reduce((score, token) => score + (searchable.includes(token.toLowerCase()) ? 1 : 0), 0)
      };
    })
    .sort((a, b) => b.score - a.score)[0]?.concept ?? landingPageConcepts[0];
}

function SplashArt({ theme }: { theme: GalleryTheme }) {
  return (
    <>
      <span
        className="pointer-events-none absolute -left-10 top-16 h-44 w-44 rounded-full opacity-75 blur-[72px]"
        style={{
          background: `radial-gradient(circle, ${theme.accent} 0%, transparent 72%)`
        }}
      />
      <span
        className="pointer-events-none absolute right-[-2.5rem] top-[20%] h-56 w-56 rounded-full opacity-60 blur-[84px]"
        style={{
          background: `radial-gradient(circle, ${theme.accent2} 0%, transparent 74%)`
        }}
      />
      <span
        className="pointer-events-none absolute left-[18%] bottom-[-1.5rem] h-24 w-[46%] opacity-45 blur-[58px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 30%, ${theme.accent2} 70%, transparent 100%)`
        }}
      />
      <span
        className="pointer-events-none absolute right-[12%] bottom-[18%] h-20 w-20 rounded-full opacity-35 blur-[40px]"
        style={{
          background: theme.accent
        }}
      />
    </>
  );
}

function Screenshot({ concept, className = "" }: { concept: LandingPageConcept; className?: string }) {
  const [failed, setFailed] = useState(false);
  const theme = getTheme(concept);

  if (failed) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden ${className}`}
        style={{ background: `linear-gradient(145deg, ${theme.paper}, ${theme.ink})` }}
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl" style={{ background: theme.accent }} />
        <div className="absolute -bottom-14 -left-10 h-48 w-48 rounded-full blur-3xl" style={{ background: theme.accent2 }} />
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div>
            <p className="text-[0.55rem] font-black uppercase tracking-[0.28em] text-white/52">Live preview</p>
            <p className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.06em] text-white">{concept.title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image width={1600} height={1000} sizes="100vw" unoptimized
      src={screenshotPath(concept)}
      alt={`${concept.title} landing page screenshot`}
      className={`h-full w-full object-cover object-top ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function GalleryCard({ concept, index }: { concept: LandingPageConcept; index: number }) {
  const theme = getTheme(concept);
  const style: ThemeStyle = {
    "--card-ink": theme.ink,
    "--card-paper": theme.paper,
    "--card-accent": theme.accent,
    "--card-accent-2": theme.accent2
  };

  return (
    <article
      style={style}
      className="group relative isolate flex h-full flex-col py-6 sm:py-8"
    >
      <SplashArt theme={theme} />

      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0d0f15]/94 shadow-[0_40px_120px_rgba(0,0,0,.38)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-1.5 group-hover:border-white/18">
        <Link
          href={concept.demoHref ?? startDesignHref(concept)}
          className="relative block overflow-hidden border-b border-white/8 bg-black"
        >
          <div className="aspect-[1.78] overflow-hidden bg-[#05070b] sm:aspect-[1.9]">
            <Screenshot
              concept={concept}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/16 bg-black/46 px-3 py-2 text-[0.52rem] font-black uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--card-accent)] shadow-[0_0_14px_var(--card-accent)]" />
            Live demo
          </div>
          <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-black/50 text-white backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
            <ExternalLink className="h-4 w-4" />
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-7 sm:p-8 lg:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.58rem] tracking-[0.22em] text-[var(--card-accent)]">{String(index + 1).padStart(2, "0")}</p>
            <p className="text-right text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/32">{concept.category}</p>
          </div>

          <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(2.8rem,4vw,4.8rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
            {concept.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/47">{concept.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {concept.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.64rem] font-semibold text-white/56">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
            <Link
              href={concept.demoHref ?? startDesignHref(concept)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--card-accent)] px-5 text-sm font-black text-[var(--card-ink)] transition hover:brightness-110"
            >
              Explore demo <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href={startDesignHref(concept)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/13 bg-white/[0.04] px-5 text-sm font-semibold text-white/72 transition hover:border-white/24 hover:bg-white/[0.08] hover:text-white"
            >
              Use this direction <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-[#8be9ff]/42 bg-[#8be9ff] px-4 py-2.5 text-xs font-black text-[#071014]"
          : "rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-semibold text-white/48 transition hover:border-white/22 hover:bg-white/[0.07] hover:text-white"
      }
    >
      {label}
    </button>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly { label: string }[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-white/34">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-13 rounded-2xl border border-white/10 bg-[#11141b] px-4 text-sm font-semibold text-white outline-none transition focus:border-[#8be9ff]/50"
      >
        {options.map((option) => (
          <option key={option.label} value={option.label}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function HeroStack() {
  return (
    <div className="relative min-h-[34rem] sm:min-h-[40rem]">
      <div className="absolute inset-[12%_8%] rounded-full bg-[#7657ff]/20 blur-[90px]" />
      {heroConcepts.map((concept, index) => {
        const positions = [
          "left-[1%] top-[18%] w-[72%] -rotate-[7deg]",
          "right-[1%] top-[3%] w-[72%] rotate-[6deg]",
          "left-[14%] bottom-[1%] w-[76%] rotate-[1deg]"
        ];
        const theme = getTheme(concept);
        return (
          <Link
            key={concept.slug}
            href={concept.demoHref ?? startDesignHref(concept)}
            className={`group absolute overflow-hidden rounded-[1.65rem] border border-white/14 bg-[#0c0e14] p-2 shadow-[0_35px_100px_rgba(0,0,0,.48)] transition duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.03] ${positions[index]}`}
          >
            <div className="relative aspect-[1.5] overflow-hidden rounded-[1.2rem]">
              <Screenshot concept={concept} className="transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-2xl font-semibold tracking-[-0.05em] text-white">{concept.title}</span>
              <span className="absolute right-4 top-4 h-3 w-3 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 20px ${theme.accent}` }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function LandingPageGalleryExperience() {
  const [category, setCategory] = useState("All");
  const [styleFamily, setStyleFamily] = useState("All");
  const [quizBusiness, setQuizBusiness] = useState("Local service");
  const [quizGoal, setQuizGoal] = useState("Get leads");
  const [quizStyle, setQuizStyle] = useState("Modern");

  const filteredConcepts = useMemo(
    () => landingPageConcepts.filter((concept) =>
      (category === "All" || concept.category === category) &&
      (styleFamily === "All" || concept.styleFamily === styleFamily)
    ),
    [category, styleFamily]
  );

  const recommendation = useMemo(
    () => getRecommendation(quizBusiness, quizGoal, quizStyle),
    [quizBusiness, quizGoal, quizStyle]
  );

  const recommendationTheme = getTheme(recommendation);
  const recommendationStyle: ThemeStyle = {
    "--card-ink": recommendationTheme.ink,
    "--card-paper": recommendationTheme.paper,
    "--card-accent": recommendationTheme.accent,
    "--card-accent-2": recommendationTheme.accent2
  };

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/7 pt-28 sm:pt-32">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-40" />
        <div aria-hidden="true" className="absolute -right-48 top-0 h-[46rem] w-[46rem] rounded-full bg-[#7257ff]/18 blur-[155px]" />
        <div aria-hidden="true" className="absolute -left-36 bottom-0 h-[38rem] w-[38rem] rounded-full bg-[#38dfff]/10 blur-[150px]" />

        <Container className="relative grid min-h-[calc(100svh-7rem)] gap-14 py-16 xl:grid-cols-[0.92fr_1.08fr] xl:items-center xl:py-20">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">
              <Sparkles className="h-4 w-4" /> GridSpell landing systems
            </p>
            <h1 className="mt-7 max-w-[10ch] text-balance font-display text-[clamp(4.3rem,9vw,9.2rem)] font-semibold leading-[0.76] tracking-[-0.085em]">
              One gallery. Twelve different worlds.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/48 sm:text-xl sm:leading-9">
              Real launch-ready concepts, each with its own visual language, business strategy, color system, and live page experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#gallery" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1">
                Explore all 12 <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="#finder" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/24 bg-[#8be9ff]/9 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/48 hover:bg-[#8be9ff]/14 hover:text-white">
                Find my direction <Wand2 className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/9 pt-6">
              {[["12", "live demos"], ["12", "visual systems"], ["1", "clear starting point"]].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</p>
                  <p className="mt-1 text-xs text-white/34 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroStack />
        </Container>

        <div className="relative flex h-3 w-full">
          {landingPageConcepts.map((concept) => (
            <span key={concept.slug} className="h-full flex-1" style={{ background: getTheme(concept).accent }} />
          ))}
        </div>
      </section>

      <section id="gallery" className="relative border-b border-white/7 py-24 sm:py-32">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#7657ff]/7 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-8 xl:grid-cols-[0.74fr_1.26fr] xl:items-end">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">The live collection</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.5rem,7vw,7.6rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                Choose by feeling, then inspect the details.
              </h2>
            </div>
            <div className="xl:pb-2">
              <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
                Every card uses a fresh capture from its real demo page. The color and artwork around the frame spill outward from the concept itself, so the gallery feels like twelve brands—not twelve copies.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-white/42">
                <Monitor className="h-4 w-4 text-[#8be9ff]" /> Desktop hero captures · live pages open in one click
              </div>
            </div>
          </div>

          <div className="sticky top-20 z-30 mt-12 rounded-[1.6rem] border border-white/10 bg-[#0b0d12]/88 p-4 shadow-[0_22px_70px_rgba(0,0,0,.28)] backdrop-blur-2xl sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="mr-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/42">
                <Filter className="h-4 w-4 text-[#8be9ff]" /> Filter
              </span>
              {styleOptions.map((option) => (
                <FilterButton key={option} label={option} active={styleFamily === option} onClick={() => setStyleFamily(option)} />
              ))}
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoryOptions.map((option) => (
                <FilterButton key={option} label={option} active={category === option} onClick={() => setCategory(option)} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-white/38">Showing {filteredConcepts.length} of {landingPageConcepts.length} live concepts.</p>
            {(category !== "All" || styleFamily !== "All") ? (
              <button type="button" onClick={() => { setCategory("All"); setStyleFamily("All"); }} className="text-sm font-semibold text-[#8be9ff] transition hover:text-white">Reset filters</button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-y-12">
            {filteredConcepts.map((concept) => (
              <div key={concept.slug} className="mx-auto w-full max-w-[1180px]">
                <GalleryCard concept={concept} index={landingPageConcepts.indexOf(concept)} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="finder" className="relative py-24 sm:py-32">
        <div aria-hidden="true" className="absolute -right-48 top-10 h-[38rem] w-[38rem] rounded-full bg-[#38dfff]/8 blur-[150px]" />
        <Container className="relative">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0e14] shadow-[0_40px_130px_rgba(0,0,0,.4)]">
            <div className="grid xl:grid-cols-[0.86fr_1.14fr]">
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="inline-flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#8be9ff]"><Wand2 className="h-4 w-4" /> Direction finder</p>
                <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.4rem,6vw,6.7rem)] font-semibold leading-[0.8] tracking-[-0.078em]">Not sure which world is yours?</h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/45">Choose what you do, what the page needs to accomplish, and how it should feel. The gallery will surface a practical starting point.</p>

                <div className="mt-9 grid gap-5 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                  <SelectField label="Business" value={quizBusiness} options={quizBusinessOptions} onChange={setQuizBusiness} />
                  <SelectField label="Primary goal" value={quizGoal} options={quizGoalOptions} onChange={setQuizGoal} />
                  <SelectField label="Visual feel" value={quizStyle} options={quizStyleOptions} onChange={setQuizStyle} />
                </div>
              </div>

              <div style={recommendationStyle} className="relative isolate min-h-[38rem] overflow-hidden border-t border-white/8 p-6 sm:p-8 xl:border-l xl:border-t-0">
                <SplashArt theme={recommendationTheme} />
                <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/74 shadow-2xl backdrop-blur-xl">
                  <div className="aspect-[1.56] overflow-hidden border-b border-white/10">
                    <Screenshot concept={recommendation} className="transition duration-700 hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-[var(--card-accent)]">Recommended starting point</p>
                    <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.84] tracking-[-0.07em]">{recommendation.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-white/48">{recommendation.description}</p>
                    <div className="mt-6 grid gap-2">
                      {recommendation.recommendedFor.map((item) => (
                        <p key={item} className="flex items-center gap-2 text-sm text-white/56"><CheckCircle2 className="h-4 w-4 text-[var(--card-accent)]" /> {item}</p>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                      <Link href={recommendation.demoHref ?? startDesignHref(recommendation)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--card-accent)] px-5 text-sm font-black text-[var(--card-ink)]">Open demo <ExternalLink className="h-4 w-4" /></Link>
                      <Link href={startDesignHref(recommendation)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 px-5 text-sm font-semibold text-white/72 transition hover:bg-white/8 hover:text-white">Start here <ArrowUpRight className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
