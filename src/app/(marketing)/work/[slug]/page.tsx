import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { LandingGalleryCaseStudyShowcase } from "@/components/work/LandingGalleryCaseStudyShowcase";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import { SmallPhoneDeviceShowcase } from "@/components/work/SmallPhoneDeviceShowcase";
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

function startProjectHref(project: FeaturedProject) {
  const params = new URLSearchParams({
    package: project.slug === "landing-page-gallery" ? "landing-page" : "custom",
    source: project.slug
  });

  return `/start-project?${params.toString()}`;
}

function CaseStudyLiveButton({ project }: { project: FeaturedProject }) {
  const className =
    "group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_44px_rgba(92,104,255,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_58px_rgba(92,104,255,0.36)]";

  if (project.slug === "landing-page-gallery") {
    return (
      <Link href="/landing-pages" className={className}>
        Open gallery
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    );
  }

  if (!project.liveUrl) return null;

  return (
    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={className}>
      Visit live site
      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
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
