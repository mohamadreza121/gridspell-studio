import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink, Monitor, Smartphone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { landingPageConcepts, type LandingPageConcept } from "@/config/landing-pages";

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });

  return `/start-project?${params.toString()}`;
}

function LandingPreviewFrame({ concept }: { concept: LandingPageConcept }) {
  const primary = concept.palette[0] ?? "#7c5cff";
  const secondary = concept.palette[1] ?? "#29d6ff";
  const surface = concept.palette[2] ?? "#07080c";

  return (
    <div className="relative aspect-[1.42] overflow-hidden rounded-[1.45rem] border border-white/[0.08] bg-[#05060a] p-4">
      <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: primary }} />
      <div aria-hidden="true" className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full opacity-70 blur-3xl" style={{ backgroundColor: secondary }} />
      <div className="relative flex h-full flex-col justify-between rounded-[1.1rem] border border-white/[0.08] bg-black/30 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/24" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-white/40">
            {concept.styleFamily}
          </span>
        </div>
        <div>
          <span className="block h-3 w-20 rounded-full" style={{ backgroundColor: primary }} />
          <span className="mt-3 block h-8 w-full rounded-xl bg-white/16" />
          <span className="mt-2 block h-8 w-4/5 rounded-xl bg-white/10" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[primary, secondary, surface].map((color) => (
              <span key={color} className="h-16 rounded-2xl border border-white/[0.08]" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const showcaseFeatures = [
  {
    icon: Monitor,
    title: "Desktop previews",
    copy: "Cards show the wider layout direction before opening a demo."
  },
  {
    icon: Smartphone,
    title: "Mobile toggle",
    copy: "The full gallery includes a mobile/desktop preview switch."
  },
  {
    icon: CheckCircle2,
    title: "Style quiz",
    copy: "The full page recommends a starting concept from business type, goal, and vibe."
  }
] as const;

export function LandingGalleryCaseStudyShowcase() {
  const liveDemos = landingPageConcepts.filter((concept) => concept.demoHref).slice(0, 4);
  const conceptCards = landingPageConcepts.slice(0, 6);

  return (
    <section id="landing-page-live-demos" className="relative border-b border-white/[0.06] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-14rem] top-20 h-[40rem] w-[40rem] rounded-full bg-[#29d6ff]/8 blur-[160px]" />
      <Container className="relative">
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
              Landing page previews
            </p>
            <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,6vw,6.6rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              The demos are part of the work.
            </h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-white/46 sm:text-lg">
              This case study now shows the actual showroom: direct demo buttons, visual concept cards, and a path into the full gallery with filters, mobile previews, pricing labels, and the style quiz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/landing-pages" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.14] bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5">
                Open full gallery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/landing-pages#gallery" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:text-white">
                Browse concept cards
                <Monitor className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {liveDemos.map((concept) => (
            <Link key={concept.slug} href={concept.demoHref ?? "/landing-pages"} className="group rounded-[1.55rem] border border-white/[0.09] bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-[#8be9ff]/24 hover:bg-white/[0.055]">
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

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {conceptCards.map((concept) => (
            <article key={concept.slug} className="rounded-[1.8rem] border border-white/[0.09] bg-white/[0.025] p-3">
              <LandingPreviewFrame concept={concept} />
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#8be9ff]/16 bg-[#8be9ff]/8 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">
                    {concept.priceLabel}
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/38">
                    {concept.goal}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[0.94] tracking-[-0.055em]">
                  {concept.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/45">{concept.description}</p>
                <div className="mt-5 grid gap-2 border-t border-white/[0.08] pt-5">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/26">
                    Recommended for
                  </p>
                  {concept.recommendedFor.slice(0, 2).map((item) => (
                    <p key={item} className="flex gap-2 text-sm leading-6 text-white/48">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {concept.demoHref ? (
                    <Link href={concept.demoHref} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-4 text-sm font-semibold text-[#8be9ff] transition hover:text-white">
                      Demo
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                  <Link href={startDesignHref(concept)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-4 text-sm font-semibold text-white/64 transition hover:bg-white/[0.07] hover:text-white">
                    Start
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            {showcaseFeatures.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-5">
                <Icon className="h-5 w-5 text-[#8be9ff]" />
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em]">{title}</p>
                <p className="mt-3 text-sm leading-7 text-white/45">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
