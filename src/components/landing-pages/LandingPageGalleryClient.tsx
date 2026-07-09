"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Filter,
  Monitor,
  Smartphone,
  Sparkles,
  Wand2
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  landingPageConcepts,
  type LandingPageConcept
} from "@/config/landing-pages";

const featuredSlugs = [
  "contractor-pro",
  "saas-modern",
  "restaurant-local",
  "product-3d-launch"
];

const galleryStats = [
  ["12", "concept directions"],
  ["4", "live demo pages"],
  ["5", "style families"],
  ["1", "project-ready brief path"]
] as const;

const categoryOptions = [
  "All",
  ...Array.from(new Set(landingPageConcepts.map((concept) => concept.category)))
];

const styleOptions = ["All", "Classic", "Modern", "3D", "Luxury", "Bold"];

const goalOptions = [
  "All",
  ...Array.from(new Set(landingPageConcepts.map((concept) => concept.goal)))
];

const quizBusinessOptions = [
  { label: "Local service", tokens: ["home", "contractor", "dental", "clinic", "restaurant", "beauty", "professional"] },
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

type PreviewMode = "desktop" | "mobile";

type QuizOption = {
  label: string;
  tokens: readonly string[];
};

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });

  return `/start-project?${params.toString()}`;
}

function getTokens(options: readonly QuizOption[], label: string) {
  return options.find((option) => option.label === label)?.tokens ?? [];
}

function getQuizRecommendation(
  business: string,
  goal: string,
  style: string
): LandingPageConcept {
  const tokens = [
    ...getTokens(quizBusinessOptions, business),
    ...getTokens(quizGoalOptions, goal),
    ...getTokens(quizStyleOptions, style)
  ].map((token) => token.toLowerCase());

  const scored = landingPageConcepts.map((concept) => {
    const haystack = [
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

    const score = tokens.reduce((total, token) => {
      return total + (haystack.includes(token) ? 1 : 0);
    }, 0);

    return { concept, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0]?.concept ?? landingPageConcepts[0];
}

function ConceptPreview({
  concept,
  mode
}: {
  concept: LandingPageConcept;
  mode: PreviewMode;
}) {
  const [primary, secondary, surface] = concept.palette;
  const isMobile = mode === "mobile";

  return (
    <div
      className={
        isMobile
          ? "relative mx-auto aspect-[0.52] w-[62%] min-w-[11rem] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#05060a] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          : "relative aspect-[1.22] overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#05060a] p-4"
      }
    >
      <div
        aria-hidden="true"
        className="absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl"
        style={{ backgroundColor: primary }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full opacity-70 blur-3xl"
        style={{ backgroundColor: secondary }}
      />

      <div className="relative flex h-full flex-col justify-between rounded-[1rem] border border-white/[0.08] bg-black/26 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-white/38">
            {mode}
          </span>
        </div>

        <div>
          <div className={isMobile ? "mb-4 grid gap-3" : "mb-5 grid grid-cols-[1fr_0.62fr] gap-3"}>
            <div>
              <span className="block h-3 w-20 rounded-full" style={{ backgroundColor: primary }} />
              <span className="mt-3 block h-8 w-full rounded-xl bg-white/16" />
              <span className="mt-2 block h-8 w-4/5 rounded-xl bg-white/10" />
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3">
              <span className="block h-12 rounded-xl" style={{ backgroundColor: surface }} />
              <span className="mt-3 block h-2 rounded-full bg-white/18" />
              <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          </div>

          <div className={isMobile ? "grid gap-2" : "grid grid-cols-3 gap-2"}>
            {concept.palette.map((color) => (
              <span
                key={color}
                className="h-14 rounded-2xl border border-white/[0.08]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-[#8be9ff]/30 bg-[#8be9ff]/12 px-4 py-2 text-xs font-semibold text-[#8be9ff]"
          : "rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-semibold text-white/48 transition hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
      }
    >
      {label}
    </button>
  );
}

function ConceptCard({
  concept,
  index,
  previewMode
}: {
  concept: LandingPageConcept;
  index: number;
  previewMode: PreviewMode;
}) {
  return (
    <article className="group flex h-full flex-col rounded-[1.8rem] border border-white/[0.09] bg-white/[0.025] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/24 hover:bg-white/[0.045]">
      <ConceptPreview concept={concept} mode={previewMode} />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] tracking-[0.2em] text-[#8be9ff]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="rounded-full border border-[#8be9ff]/16 bg-[#8be9ff]/8 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">
            {concept.priceLabel}
          </p>
        </div>

        <h2 className="mt-5 font-display text-3xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-4xl">
          {concept.title}
        </h2>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
          {concept.category} · {concept.style}
        </p>

        <p className="mt-4 text-sm leading-7 text-white/45">
          {concept.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {concept.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[0.68rem] text-white/52">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-2 border-t border-white/[0.08] pt-5">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/26">
            Recommended for
          </p>
          <div className="grid gap-2">
            {concept.recommendedFor.map((item) => (
              <p key={item} className="flex gap-2 text-sm leading-6 text-white/48">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {concept.demoHref ? (
            <Link
              href={concept.demoHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/10 px-4 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/40 hover:bg-[#8be9ff]/15 hover:text-white"
            >
              Open live demo
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}

          <Link
            href={startDesignHref(concept)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-4 text-sm font-semibold text-white/66 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            Start with this design
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function QuizSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: readonly QuizOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/28">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-2xl border border-white/[0.1] bg-white/[0.045] px-4 text-sm font-semibold text-white outline-none transition focus:border-[#8be9ff]/45"
      >
        {options.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function LandingPageGalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedGoal, setSelectedGoal] = useState("All");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [quizBusiness, setQuizBusiness] = useState("Local service");
  const [quizGoal, setQuizGoal] = useState("Get leads");
  const [quizStyle, setQuizStyle] = useState("Classic");

  const featuredConcepts = landingPageConcepts.filter((concept) =>
    featuredSlugs.includes(concept.slug)
  );

  const filteredConcepts = useMemo(() => {
    return landingPageConcepts.filter((concept) => {
      const categoryMatch = selectedCategory === "All" || concept.category === selectedCategory;
      const styleMatch = selectedStyle === "All" || concept.styleFamily === selectedStyle;
      const goalMatch = selectedGoal === "All" || concept.goal === selectedGoal;

      return categoryMatch && styleMatch && goalMatch;
    });
  }, [selectedCategory, selectedStyle, selectedGoal]);

  const quizRecommendation = useMemo(
    () => getQuizRecommendation(quizBusiness, quizGoal, quizStyle),
    [quizBusiness, quizGoal, quizStyle]
  );

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/[0.06] pt-28 sm:pt-32">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-45" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-52 top-8 h-[44rem] w-[44rem] rounded-full bg-[#7c5cff]/16 blur-[160px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[150px]" />

        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center py-16 sm:py-20">
          <div className="grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                <Sparkles className="h-4 w-4" />
                Landing page gallery
              </p>

              <h1 className="mt-7 max-w-[11ch] text-balance font-display text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                Pick a style before we build.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/48 sm:text-xl sm:leading-9">
                A showroom of landing page directions for clients who need examples, ideas, and a faster way to choose the right visual direction for their business.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#live-demos"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
                >
                  Open live demos
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="#gallery"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
                >
                  Browse all concepts
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.1] bg-white/[0.03] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredConcepts.map((concept) => (
                  <Link
                    key={concept.slug}
                    href={concept.demoHref ?? startDesignHref(concept)}
                    className="group rounded-[1.35rem] border border-white/[0.08] bg-[#05070b] p-3 transition hover:border-[#8be9ff]/25 hover:bg-white/[0.045]"
                  >
                    <ConceptPreview concept={concept} mode="desktop" />
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold tracking-[-0.045em] text-white">
                          {concept.title}
                        </p>
                        <p className="mt-1 text-xs text-white/38">{concept.goal}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#8be9ff] opacity-70 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-4">
            {galleryStats.map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-4xl font-semibold tracking-[-0.06em] text-white">{value}</p>
                <p className="mt-1 text-sm text-white/38">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="live-demos" className="relative border-b border-white/[0.06] py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                Live demos
              </p>
              <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(2.8rem,5vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                Open the actual pages.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
              These four buttons are direct routes to the live demo concepts, so clients do not have to hunt for them inside the cards.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredConcepts.map((concept) => (
              <Link
                key={concept.slug}
                href={concept.demoHref ?? startDesignHref(concept)}
                className="group rounded-[1.55rem] border border-white/[0.09] bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-[#8be9ff]/24 hover:bg-white/[0.055]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">
                    Live demo
                  </span>
                  <ExternalLink className="h-4 w-4 text-white/34 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8be9ff]" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[0.92] tracking-[-0.055em]">
                  {concept.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/44">{concept.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="relative border-b border-white/[0.06] py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-end">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                Browse by idea
              </p>
              <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,6vw,6.6rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
                12 ways to launch.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
              Filter by category, style, or business goal. Toggle previews between desktop and mobile so prospects can understand how each concept could feel across screens.
            </p>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/[0.09] bg-white/[0.025] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-[#8be9ff]" />
                <p className="text-sm font-semibold text-white/62">Filters</p>
              </div>

              <div className="flex rounded-full border border-white/[0.09] bg-white/[0.025] p-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={
                    previewMode === "desktop"
                      ? "inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-[#07080c]"
                      : "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white/48"
                  }
                >
                  <Monitor className="h-4 w-4" />
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={
                    previewMode === "mobile"
                      ? "inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-[#07080c]"
                      : "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white/48"
                  }
                >
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </button>
              </div>
            </div>

            <div className="grid gap-5 pt-5">
              <div>
                <p className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/24">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((option) => (
                    <FilterButton key={option} label={option} active={selectedCategory === option} onClick={() => setSelectedCategory(option)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/24">Style</p>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((option) => (
                    <FilterButton key={option} label={option} active={selectedStyle === option} onClick={() => setSelectedStyle(option)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/24">Goal</p>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((option) => (
                    <FilterButton key={option} label={option} active={selectedGoal === option} onClick={() => setSelectedGoal(option)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-white/42">
              Showing {filteredConcepts.length} of {landingPageConcepts.length} concepts.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedStyle("All");
                setSelectedGoal("All");
              }}
              className="text-sm font-semibold text-[#8be9ff] transition hover:text-white"
            >
              Reset filters
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredConcepts.map((concept, index) => (
              <ConceptCard key={concept.slug} concept={concept} index={index} previewMode={previewMode} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/[0.06] py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-12 h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px]" />
        <Container className="relative grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              <Wand2 className="h-4 w-4" />
              Style quiz
            </p>
            <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Not sure where to start?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/45">
              Pick a business type, goal, and design vibe. The gallery recommends a starting concept that can be customized for the client.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
            <div className="grid gap-5 md:grid-cols-3">
              <QuizSelect label="Business" value={quizBusiness} options={quizBusinessOptions} onChange={setQuizBusiness} />
              <QuizSelect label="Goal" value={quizGoal} options={quizGoalOptions} onChange={setQuizGoal} />
              <QuizSelect label="Vibe" value={quizStyle} options={quizStyleOptions} onChange={setQuizStyle} />
            </div>

            <div className="mt-7 grid gap-6 rounded-[1.65rem] border border-[#8be9ff]/16 bg-[#8be9ff]/6 p-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <ConceptPreview concept={quizRecommendation} mode="desktop" />
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Recommended starting point</p>
                <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] text-white">
                  {quizRecommendation.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/48">{quizRecommendation.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {quizRecommendation.recommendedFor.map((item) => (
                    <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1.5 text-[0.68rem] text-white/55">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {quizRecommendation.demoHref ? (
                    <Link href={quizRecommendation.demoHref} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/10 px-4 text-sm font-semibold text-[#8be9ff] transition hover:text-white">
                      Open demo
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                  <Link href={startDesignHref(quizRecommendation)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white px-4 text-sm font-semibold text-[#07080c] transition hover:-translate-y-0.5">
                    Start with this design
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/10 blur-[160px]" />
        <Container className="relative grid gap-10 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              How clients use this
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
              Choose the direction. I customize the build.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Pick a business type or style that feels close.",
              "Use the demo as the starting point, not a copied template.",
              "Send the project brief with the selected design already attached."
            ].map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-5">
                <CheckCircle2 className="h-5 w-5 text-[#8be9ff]" />
                <p className="mt-4 text-sm leading-7 text-white/48">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
