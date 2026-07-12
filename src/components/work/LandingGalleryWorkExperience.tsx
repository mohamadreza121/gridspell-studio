import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Filter,
  Layers3,
  Monitor,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { landingPageConcepts, type LandingPageConcept } from "@/config/landing-pages";

type ConceptTheme = {
  ink: string;
  paper: string;
  accent: string;
  accent2: string;
};

type ThemeStyle = CSSProperties & {
  "--work-ink": string;
  "--work-paper": string;
  "--work-accent": string;
  "--work-accent-2": string;
};

const themes: Record<string, ConceptTheme> = {
  "contractor-pro": { ink: "#0f172a", paper: "#f8fafc", accent: "#f97316", accent2: "#fbbf24" },
  "saas-modern": { ink: "#070514", paper: "#101027", accent: "#8b5cf6", accent2: "#22d3ee" },
  "restaurant-local": { ink: "#431407", paper: "#fff7ed", accent: "#b45309", accent2: "#efc27d" },
  "product-3d-launch": { ink: "#030712", paper: "#090d1c", accent: "#22d3ee", accent2: "#8b5cf6" },
  "luxury-real-estate": { ink: "#17150f", paper: "#eee8dc", accent: "#c8a45e", accent2: "#f7f1e5" },
  "dental-trust": { ink: "#15312b", paper: "#f5f8f5", accent: "#bfe8d1", accent2: "#6ea691" },
  "fitness-coach": { ink: "#070909", paper: "#101311", accent: "#c7ff2f", accent2: "#3157ff" },
  "law-firm-classic": { ink: "#2a1919", paper: "#f4eee4", accent: "#7d2634", accent2: "#b79658" },
  "beauty-booking": { ink: "#3d2620", paper: "#f7e9df", accent: "#c96f54", accent2: "#eab8ae" },
  "creator-brand": { ink: "#2e2419", paper: "#eee1c6", accent: "#d6a62f", accent2: "#7f2636" },
  "ecommerce-drop": { ink: "#07090b", paper: "#111318", accent: "#c8ff2f", accent2: "#8f2cff" },
  "event-launch": { ink: "#090717", paper: "#161127", accent: "#7c3cff", accent2: "#dfff34" }
};

const featuredSlugs = [
  "event-launch",
  "beauty-booking",
  "ecommerce-drop",
  "creator-brand",
  "law-firm-classic",
  "dental-trust"
] as const;

const featuredConcepts = featuredSlugs
  .map((slug) => landingPageConcepts.find((concept) => concept.slug === slug))
  .filter((concept): concept is LandingPageConcept => Boolean(concept));

const processSteps = [
  {
    number: "01",
    title: "Show the range",
    copy: "Twelve distinct visual systems prove that the studio can adapt to the business instead of forcing every client into one house style.",
    Icon: Palette
  },
  {
    number: "02",
    title: "Make comparison easy",
    copy: "Real screenshots, business categories, live demos, and consistent project actions let prospects compare direction without guessing.",
    Icon: Layers3
  },
  {
    number: "03",
    title: "Turn taste into action",
    copy: "Filters and the direction finder move visitors from inspiration to a practical starting point and a project-ready brief.",
    Icon: MousePointerClick
  }
] as const;

function themeFor(concept: LandingPageConcept): ConceptTheme {
  return themes[concept.slug] ?? {
    ink: concept.palette[1] ?? "#07080c",
    paper: concept.palette[2] ?? "#111318",
    accent: concept.palette[0] ?? "#8be9ff",
    accent2: concept.palette[1] ?? "#7c5cff"
  };
}

function screenshotPath(concept: LandingPageConcept) {
  return `/landing-page-screenshots/${concept.slug}.jpg`;
}

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });

  return `/start-project?${params.toString()}`;
}

function ColorSplash({ theme }: { theme: ConceptTheme }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-[16%] h-52 w-52 rounded-full opacity-70 blur-[82px]"
        style={{ background: `radial-gradient(circle, ${theme.accent} 0%, transparent 72%)` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[8%] h-64 w-64 rounded-full opacity-55 blur-[96px]"
        style={{ background: `radial-gradient(circle, ${theme.accent2} 0%, transparent 74%)` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-[20%] h-20 w-[55%] opacity-35 blur-[54px]"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent2}, transparent)` }}
      />
    </>
  );
}

function HeroScreenshotStack() {
  const concepts = ["event-launch", "beauty-booking", "ecommerce-drop"]
    .map((slug) => landingPageConcepts.find((concept) => concept.slug === slug))
    .filter((concept): concept is LandingPageConcept => Boolean(concept));

  const positions = [
    "left-0 top-[18%] w-[72%] -rotate-[6deg]",
    "right-0 top-0 w-[72%] rotate-[5deg]",
    "left-[14%] bottom-0 w-[76%] rotate-[1deg]"
  ];

  return (
    <div className="relative min-h-[34rem] sm:min-h-[42rem]">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[#7657ff]/20 blur-[105px]" />
      {concepts.map((concept, index) => {
        const theme = themeFor(concept);
        return (
          <Link
            key={concept.slug}
            href={concept.demoHref ?? "/landing-pages"}
            className={`group absolute overflow-hidden rounded-[1.8rem] border border-white/14 bg-[#0b0d12] p-2 shadow-[0_38px_110px_rgba(0,0,0,.52)] transition duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.025] ${positions[index]}`}
          >
            <div className="relative aspect-[1.6] overflow-hidden rounded-[1.3rem]">
              <Image width={1600} height={1000} sizes="100vw" unoptimized
                src={screenshotPath(concept)}
                alt={`${concept.title} landing page screenshot`}
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/82 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-xl font-semibold tracking-[-0.045em] text-white sm:text-2xl">
                {concept.title}
              </span>
              <span
                className="absolute right-4 top-4 h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]"
                style={{ color: theme.accent, background: theme.accent }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ShowcaseRow({ concept, index }: { concept: LandingPageConcept; index: number }) {
  const theme = themeFor(concept);
  const style: ThemeStyle = {
    "--work-ink": theme.ink,
    "--work-paper": theme.paper,
    "--work-accent": theme.accent,
    "--work-accent-2": theme.accent2
  };

  return (
    <article style={style} className="group relative isolate py-8 sm:py-12">
      <ColorSplash theme={theme} />
      <div className="relative z-10 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0c0e14]/94 shadow-[0_44px_130px_rgba(0,0,0,.42)] backdrop-blur-xl">
        <Link href={concept.demoHref ?? "/landing-pages"} className="relative block overflow-hidden border-b border-white/9 bg-black">
          <div className="aspect-[1.72] overflow-hidden sm:aspect-[1.88]">
            <Image width={1600} height={1000} sizes="100vw" unoptimized
              src={screenshotPath(concept)}
              alt={`${concept.title} landing page screenshot`}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.018]"
              loading="lazy"
            />
          </div>
          <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-black/48 px-4 py-2 text-[0.54rem] font-black uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--work-accent)] shadow-[0_0_14px_var(--work-accent)]" />
            Live concept
          </span>
          <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/16 bg-black/52 text-white backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
            <ExternalLink className="h-4 w-4" />
          </span>
        </Link>

        <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:p-11">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] tracking-[0.22em] text-[var(--work-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.54rem] font-bold uppercase tracking-[0.18em] text-white/34">
                {concept.category}
              </span>
            </div>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,5vw,5.8rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
              {concept.title}
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">{concept.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {concept.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.66rem] font-semibold text-white/56">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={concept.demoHref ?? "/landing-pages"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--work-accent)] px-5 text-sm font-black text-[var(--work-ink)] transition hover:brightness-110"
              >
                Open live demo <ExternalLink className="h-4 w-4" />
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
      </div>
    </article>
  );
}

export function LandingGalleryWorkExperience() {
  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/7 pt-28 sm:pt-32">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-42" />
        <div aria-hidden="true" className="absolute -right-48 top-0 h-[46rem] w-[46rem] rounded-full bg-[#7257ff]/18 blur-[160px]" />
        <div aria-hidden="true" className="absolute -left-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-[#38dfff]/10 blur-[150px]" />

        <Container className="relative py-16 sm:py-20">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/38 transition hover:text-[#8be9ff]">
            <ArrowLeft className="h-4 w-4" /> Selected work
          </Link>

          <div className="mt-12 grid min-h-[calc(100svh-13rem)] gap-14 xl:grid-cols-[0.88fr_1.12fr] xl:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">
                <Sparkles className="h-4 w-4" /> Portfolio case study
              </p>
              <h1 className="mt-7 max-w-[10ch] text-balance font-display text-[clamp(4.2rem,8.5vw,9rem)] font-semibold leading-[0.76] tracking-[-0.085em]">
                A gallery that sells the design before the sales call.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/48 sm:text-xl sm:leading-9">
                GridSpell needed a way to show range, speed up visual decisions, and turn inspiration into a qualified landing-page brief. The result is a live showroom of twelve distinct digital worlds.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/landing-pages" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1">
                  Open the live gallery <ExternalLink className="h-4 w-4" />
                </Link>
                <Link href="/start-project?package=landing-page&source=landing-page-gallery" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/24 bg-[#8be9ff]/9 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/48 hover:bg-[#8be9ff]/14 hover:text-white">
                  Start a landing page <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/9 pt-6">
                {[["12", "live demos"], ["12", "visual systems"], ["1", "decision path"]].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</p>
                    <p className="mt-1 text-xs text-white/34 sm:text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <HeroScreenshotStack />
          </div>
        </Container>

        <div className="relative flex h-3 w-full">
          {landingPageConcepts.map((concept) => (
            <span key={concept.slug} className="h-full flex-1" style={{ background: themeFor(concept).accent }} />
          ))}
        </div>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#8be9ff]">The brief</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.3rem,6vw,6.8rem)] font-semibold leading-[0.8] tracking-[-0.078em]">
                Make visual choice feel simple.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                ["Problem", "Prospects could understand the service, but they still needed proof of range and a faster way to explain what kind of page they wanted."],
                ["System", "A searchable showroom combines real screenshots, live demos, business categories, style families, and a direction finder in one experience."],
                ["Outcome", "The gallery turns an abstract design conversation into a concrete decision, giving every inquiry a stronger visual starting point."]
              ].map(([label, copy], index) => (
                <article key={label} className="grid gap-5 rounded-[1.8rem] border border-white/9 bg-white/[0.028] p-6 sm:grid-cols-[4rem_1fr] sm:p-8">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">{label}</h3>
                    <p className="mt-4 text-base leading-8 text-white/46">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-32">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#7657ff]/7 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-end">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#8be9ff]">The range is the proof</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                Six examples. Six completely different signals.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
              These representative concepts show how the same conversion discipline can support very different businesses, audiences, and visual expectations.
            </p>
          </div>

          <div className="mt-8 grid gap-y-2">
            {featuredConcepts.map((concept, index) => (
              <ShowcaseRow key={concept.slug} concept={concept} index={index} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/landing-pages#gallery" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/14 bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1">
              Explore all twelve concepts <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#8be9ff]">The decision system</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.3rem,6vw,6.7rem)] font-semibold leading-[0.8] tracking-[-0.078em]">
                Built to move people forward.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
              The project is more than a visual archive. Every layer helps a prospect narrow the field, inspect the real work, and arrive at a stronger brief.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {processSteps.map(({ number, title, copy, Icon }) => (
              <article key={number} className="relative overflow-hidden rounded-[2rem] border border-white/9 bg-white/[0.03] p-7 sm:p-8">
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#7657ff]/12 blur-3xl" />
                <div className="relative flex items-center justify-between gap-5">
                  <span className="font-mono text-[0.6rem] tracking-[0.22em] text-[#8be9ff]">{number}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#8be9ff]">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="relative mt-10 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-white/45">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [Filter, "Filter by business and style"],
              [Monitor, "Inspect real production demos"],
              [Wand2, "Get a practical recommendation"]
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof Filter;
              return (
                <div key={label as string} className="flex items-center gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.025] p-5">
                  <FeatureIcon className="h-5 w-5 text-[#8be9ff]" />
                  <p className="text-sm font-semibold text-white/62">{label as string}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-[#7657ff]/12 blur-[150px]" />
        <div aria-hidden="true" className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#38dfff]/10 blur-[145px]" />
        <Container className="relative">
          <div className="overflow-hidden rounded-[2.7rem] border border-white/11 bg-[#0c0e14]/92 p-7 shadow-[0_46px_150px_rgba(0,0,0,.42)] backdrop-blur-xl sm:p-10 lg:p-14">
            <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              <div>
                <p className="text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#8be9ff]">From inspiration to brief</p>
                <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.8rem,7vw,7.8rem)] font-semibold leading-[0.78] tracking-[-0.082em]">
                  See the direction. Then make it yours.
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-white/46 sm:text-lg">
                  The gallery gives every landing-page project a better first conversation: visual references, business goals, and a clear route into planning and production.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/landing-pages" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1">
                    Browse the gallery <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link href="/start-project?package=landing-page&source=landing-page-gallery" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/25 bg-[#8be9ff]/9 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/45 hover:bg-[#8be9ff]/14 hover:text-white">
                    Start a project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-3 border-t border-white/9 pt-7 sm:grid-cols-3">
              {["Real screenshots", "Live demo routes", "Project-ready conversion path"].map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-white/52">
                  <CheckCircle2 className="h-4 w-4 text-[#8be9ff]" /> {item}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
