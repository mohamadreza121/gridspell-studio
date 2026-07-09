import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { landingPageConcepts, type LandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Landing Page Gallery",
  description:
    "Browse GridSpell landing page concepts for home services, SaaS, restaurants, product launches, professional services, and more.",
  path: "/landing-pages"
});

const featuredSlugs = [
  "contractor-pro",
  "saas-modern",
  "restaurant-local",
  "product-3d-launch"
];

const galleryStats = [
  ["12", "concept directions"],
  ["4", "live demo pages"],
  ["3", "style families"],
  ["1", "project-ready brief path"]
] as const;

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });

  return `/start-project?${params.toString()}`;
}

function ConceptPreview({ concept }: { concept: LandingPageConcept }) {
  const [primary, secondary, surface] = concept.palette;

  return (
    <div className="relative aspect-[1.22] overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#05060a] p-4">
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
            {concept.style}
          </span>
        </div>

        <div>
          <div className="mb-5 grid grid-cols-[1fr_0.62fr] gap-3">
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

          <div className="grid grid-cols-3 gap-2">
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

function ConceptCard({ concept, index }: { concept: LandingPageConcept; index: number }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.8rem] border border-white/[0.09] bg-white/[0.025] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/24 hover:bg-white/[0.045]">
      <ConceptPreview concept={concept} />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] tracking-[0.2em] text-[#8be9ff]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/38">
            {concept.category}
          </p>
        </div>

        <h2 className="mt-5 font-display text-3xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-4xl">
          {concept.title}
        </h2>

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
            Best for
          </p>
          <p className="text-sm leading-7 text-white/46">{concept.businessType}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {concept.demoHref ? (
            <Link
              href={concept.demoHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-4 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
            >
              View demo
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

export default function LandingPagesPage() {
  const featuredConcepts = landingPageConcepts.filter((concept) =>
    featuredSlugs.includes(concept.slug)
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
                  href="#gallery"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
                >
                  Browse concepts
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/start-project?package=landing-page&source=landing-page-gallery"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
                >
                  Start a landing page
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.1] bg-white/[0.03] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredConcepts.map((concept) => (
                  <div key={concept.slug} className="rounded-[1.35rem] border border-white/[0.08] bg-[#05070b] p-3">
                    <ConceptPreview concept={concept} />
                    <p className="mt-3 font-display text-xl font-semibold tracking-[-0.045em] text-white">
                      {concept.title}
                    </p>
                    <p className="mt-1 text-xs text-white/38">{concept.goal}</p>
                  </div>
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
              Phase 1 keeps this gallery fast and static: lightweight preview cards, no iframe embeds, and 3D only inside the dedicated demo page. Later we can add filtering, screenshots, analytics, and dashboard management.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {landingPageConcepts.map((concept, index) => (
              <ConceptCard key={concept.slug} concept={concept} index={index} />
            ))}
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
