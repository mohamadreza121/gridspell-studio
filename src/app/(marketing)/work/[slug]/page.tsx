import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Monitor, Smartphone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import { SmallPhoneDeviceShowcase } from "@/components/work/SmallPhoneDeviceShowcase";
import { landingPageConcepts, type LandingPageConcept } from "@/config/landing-pages";
import { featuredProjects, type FeaturedProject } from "@/config/work";
import { workCaseStudies, type WorkCaseStudy } from "@/config/work-case-studies";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const gridspellCaseStudy: WorkCaseStudy = {
  slug: "gridspell-studio",
  client: "GridSpell Studio",
  category: "Studio website · Business system",
  headline: "A studio website that proves the offer by using the system itself.",
  summary:
    "GridSpell Studio was built as a working proof point: a premium website, pricing flow, project intake form, admin lead dashboard, and client portal foundation in one brand system.",
  overview:
    "The site needed to sell custom web design clearly while also showing the practical systems GridSpell can build behind a business website.",
  liveUrl: "https://gridspellstudio.com/",
  devices: []
};

const caseStudyProof: Record<string, {
  challenge: string;
  built: string;
  outcome: string;
  highlights: readonly string[];
}> = {
  "desa-foam-insulation": {
    challenge:
      "The business needed a modern service website that explained its work clearly, looked trustworthy on mobile, and guided visitors toward estimate requests.",
    built:
      "GridSpell built a responsive Next.js website with clearer service structure, project visuals, SEO foundations, and a stronger inquiry path.",
    outcome:
      "The final experience presents DESA as a more professional contractor and makes the path from service research to action easier to follow.",
    highlights: [
      "Service page architecture",
      "Mobile-first service browsing",
      "Project visuals and trust messaging",
      "SEO-ready page structure"
    ]
  },
  "gridspell-studio": {
    challenge:
      "The studio needed more than a portfolio. It needed to explain the offer, show pricing, collect better project briefs, and support client operations.",
    built:
      "GridSpell built its own Next.js marketing site with package-aware pricing, project intake, email notifications, admin lead management, client portal structure, SEO foundations, and small-phone fallbacks.",
    outcome:
      "The finished system demonstrates the full offer: strategy, design, development, lead capture, dashboards, and launch foundations.",
    highlights: [
      "Package-aware project brief",
      "Admin lead dashboard",
      "Client portal foundation",
      "Responsive small-phone support"
    ]
  },
  "landing-page-gallery": {
    challenge:
      "GridSpell needed a way to sell landing pages with visual proof, not only descriptions, so clients could choose a direction faster.",
    built:
      "A showroom-style gallery with 12 concepts, four live demo routes, filterable categories, pricing labels, recommended-for sections, preview toggles, and a style quiz.",
    outcome:
      "The work page now leads prospects into a real gallery experience, helping them compare landing page directions before starting a project.",
    highlights: [
      "12 concept cards",
      "4 live demo routes",
      "Interactive filtering and preview toggle",
      "Style quiz and design-specific CTAs"
    ]
  },
  "network-engineering-portfolio": {
    challenge:
      "The portfolio needed to communicate practical technical ability without relying on a plain resume layout.",
    built:
      "GridSpell structured the experience around technical credibility, project organization, service positioning, and a more memorable visual direction.",
    outcome:
      "The result is a portfolio that feels more polished, easier to scan, and more credible for technical opportunities.",
    highlights: [
      "Technical project storytelling",
      "Interactive presentation",
      "Clear service structure",
      "Responsive layouts"
    ]
  }
};

function getCaseStudy(slug: string) {
  return workCaseStudies.find((item) => item.slug === slug) ??
    (slug === "gridspell-studio" ? gridspellCaseStudy : null);
}

function startDesignHref(concept: LandingPageConcept) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });

  return `/start-project?${params.toString()}`;
}

function startProjectHref(project: FeaturedProject) {
  const params = new URLSearchParams({
    package: project.slug === "landing-page-gallery" ? "landing-page" : "custom",
    source: project.slug
  });

  return `/start-project?${params.toString()}`;
}

function CaseStudyLiveButton({ project }: { project: FeaturedProject }) {
  if (!project.liveUrl) return null;

  const className =
    "group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_44px_rgba(92,104,255,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_58px_rgba(92,104,255,0.36)]";

  if (project.liveUrl.startsWith("/")) {
    return (
      <Link href={project.liveUrl} className={className}>
        Open gallery
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={className}>
      Visit live site
      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
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

function LandingGalleryCaseStudyShowcase() {
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
            {[
              [Monitor, "Desktop previews", "Cards show the wider layout direction before opening a demo."],
              [Smartphone, "Mobile toggle", "The full gallery includes a mobile/desktop preview switch."],
              [CheckCircle2, "Style quiz", "The full page recommends a starting concept from business type, goal, and vibe."]
            ].map(([Icon, title, copy]) => (
              <div key={title as string} className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-5">
                <Icon className="h-5 w-5 text-[#8be9ff]" />
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em]">{title as string}</p>
                <p className="mt-3 text-sm leading-7 text-white/45">{copy as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) return {};

  return createPageMetadata({
    title: `${project.title} Website Case Study`,
    description: project.description,
    path: `/work/${project.slug}`,
    image: `/work/${project.slug}/opengraph-image`,
    imageAlt: `${project.title} website case study by GridSpell Studio`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const project = featuredProjects.find((item) => item.slug === slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  const proof = caseStudyProof[project.slug];
  const hasDeviceShowcase = caseStudy.devices.length > 0;
  const isLandingGallery = project.slug === "landing-page-gallery";

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      {/* Case study introduction */}
      <section className="relative min-h-svh overflow-hidden border-b border-white/[0.06] pt-28 sm:pt-32">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 opacity-45"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 top-16 h-[44rem] w-[44rem] rounded-full bg-[#7c5cff]/14 blur-[160px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[#29d6ff]/8 blur-[150px]"
        />

        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center py-16 sm:py-20">
          <Link
            href="/work"
            className="mb-14 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/38 transition hover:text-[#8be9ff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Selected work
          </Link>

          <div className="grid gap-12 xl:grid-cols-[1.35fr_0.65fr] xl:items-end">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                {project.category}
              </p>

              <h1 className="mt-7 max-w-[12ch] text-balance font-display text-[clamp(3.8rem,7.5vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.078em]">
                {project.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/50 sm:text-xl sm:leading-9">
                {caseStudy.headline}
              </p>
            </div>

            <div className="xl:pb-2">
              <p className="text-base leading-8 text-white/42">
                {caseStudy.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <CaseStudyLiveButton project={project} />

                {isLandingGallery ? (
                  <Link
                    href="#landing-page-live-demos"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-6 text-sm font-semibold text-[#8be9ff] transition duration-300 hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
                  >
                    See demo buttons
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}

                <Link
                  href={startProjectHref(project)}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-white/[0.08] pt-7 sm:grid-cols-3">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Project
              </p>
              <p className="mt-2 text-sm text-white/65">
                {project.title}
              </p>
            </div>

            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Focus
              </p>
              <p className="mt-2 text-sm text-white/65">
                {isLandingGallery ? "Landing page showroom" : "Responsive digital experience"}
              </p>
            </div>

            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Outcome
              </p>
              <p className="mt-2 text-sm text-white/65">
                {project.result}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {isLandingGallery ? <LandingGalleryCaseStudyShowcase /> : null}

      {proof ? (
        <section className="relative border-b border-white/[0.06] py-24 sm:py-32">
          <Container className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">
                Business proof
              </p>
              <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                What was solved and built.
              </h2>
            </div>

            <div className="grid gap-5">
              {([
                ["Problem", proof.challenge],
                ["Built", proof.built],
                ["Result", proof.outcome]
              ] as const).map(([label, text]) => (
                <article key={label} className="rounded-[1.65rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">{label}</p>
                  <p className="mt-4 text-base leading-8 text-white/46">{text}</p>
                </article>
              ))}

              <div className="rounded-[1.65rem] border border-[#8be9ff]/16 bg-[#8be9ff]/6 p-5 sm:p-6">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Key features</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {proof.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-white/54">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Laptop, tablet and phone showcases */}
      {hasDeviceShowcase ? (
        <>
          <div className="small-phone-case-study-only">
            <SmallPhoneDeviceShowcase devices={caseStudy.devices} />
          </div>
          <div className="case-study-device-showcase">
            <DeviceShowcase devices={caseStudy.devices} />
          </div>
        </>
      ) : null}

      {/* Closing summary */}
      <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/10 blur-[160px]"
        />

        <Container className="relative grid gap-12 xl:grid-cols-[0.75fr_1.25fr] xl:gap-20">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">
              Project outcome
            </p>

            <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              {isLandingGallery ? "A showroom clients can choose from." : "One identity across every screen."}
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-9 text-white/48">
              {caseStudy.summary}
            </p>

            <div className="mt-10 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/28">
                Final result
              </p>

              <p className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                {project.result}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <CaseStudyLiveButton project={project} />

              <Link
                href="/work"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
              >
                View more work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
