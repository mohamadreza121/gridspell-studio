import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { featuredProjects, type FeaturedProject } from "@/config/work";

function startProjectHref(project: FeaturedProject) {
  const packageId =
    project.slug === "gridspell-studio"
      ? "custom"
      : project.slug === "network-engineering-portfolio"
        ? "launch"
        : "growth";
  const params = new URLSearchParams({ package: packageId, source: project.slug });

  return `/start-project?${params.toString()}`;
}

function screenshotPath(
  project: FeaturedProject,
  variant: "tablet" | "mobile" | "small-phone"
) {
  const suffix = variant === "tablet" ? "tablet" : `${variant}-v2`;
  return `/images/work/selected-work/${project.slug}-${suffix}.jpg`;
}

function ResponsiveProjectPreview({
  project,
  priority
}: {
  project: FeaturedProject;
  priority: boolean;
}) {
  const alt = project.previewAlt ?? `${project.title} website preview`;

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-[1.45rem] border border-white/[0.11] bg-[linear-gradient(145deg,#0b0d13,#11182a)] px-3 py-6 min-[390px]:px-4 sm:rounded-[1.7rem] sm:px-6 sm:py-8 md:px-8">
      <picture className="relative z-10 block w-full max-w-full overflow-hidden">
        <source
          media="(min-width: 768px)"
          srcSet={screenshotPath(project, "tablet")}
        />
        <source
          media="(max-width: 374px)"
          srcSet={screenshotPath(project, "small-phone")}
        />
        <img
          src={screenshotPath(project, "mobile")}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          className="mx-auto block aspect-[360/800] w-[56%] max-w-[14.5rem] rounded-[1.55rem] border-[4px] border-[#11141b] object-cover object-top shadow-[0_18px_42px_rgba(0,0,0,.42)] ring-1 ring-white/[0.14] min-[375px]:aspect-[430/932] min-[390px]:w-[58%] sm:w-[52%] sm:max-w-[16rem] md:aspect-[4/3] md:w-full md:max-w-none md:rounded-[1.45rem] md:border-[6px]"
        />
      </picture>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]" />
    </div>
  );
}

export function WorkStaticFallback() {
  return (
    <main className="relative w-full max-w-full overflow-x-clip bg-[#07080c] pb-24 pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 hidden opacity-35 sm:block"
      />

      <Container className="relative max-w-full overflow-hidden">
        <div className="max-w-4xl">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff] sm:text-[0.64rem] sm:tracking-[0.38em]">
            Selected work
          </p>

          <h1 className="mt-6 max-w-[8.5ch] text-balance font-display text-[clamp(3.35rem,14vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.072em] text-white sm:mt-7 sm:max-w-none sm:leading-[0.82] sm:tracking-[-0.075em]">
            Designed with a reason.
          </h1>

          <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/45 sm:mt-7 sm:text-lg sm:leading-8">
            Each case study explains the business problem, what GridSpell built,
            the system behind the interface, and the result the website is meant to support.
          </p>
        </div>
      </Container>

      <Container className="relative max-w-full overflow-hidden">
        <div className="mt-12 grid gap-14 sm:mt-16 sm:gap-16">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="work-mobile-card min-w-0 max-w-full overflow-hidden border-t border-white/[0.08] pt-7 sm:pt-8"
            >
              <Link
                href={`/work/${project.slug}`}
                prefetch={false}
                className="group block w-full max-w-full touch-manipulation active:opacity-80"
                aria-label={`Open ${project.title} case study`}
              >
                <ResponsiveProjectPreview project={project} priority={index === 0} />
              </Link>

              <div className="mt-6 min-w-0 max-w-full sm:mt-7">
                <p className="font-mono text-[0.58rem] tracking-[0.18em] text-[#8be9ff] sm:text-[0.62rem] sm:tracking-[0.2em]">
                  {String(index + 1).padStart(2, "0")} · {project.category}
                </p>

                <h2 className="mt-4 max-w-full break-words font-display text-[clamp(2.4rem,10vw,3.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                  {project.title}
                </h2>

                <p className="mt-4 max-w-2xl text-[0.96rem] leading-7 text-white/44 sm:mt-5 sm:text-base sm:leading-8">
                  {project.description}
                </p>

                {project.proof ? (
                  <div className="mt-6 grid min-w-0 gap-3 sm:mt-7 sm:gap-4 lg:grid-cols-3">
                    {([
                      ["Problem", project.proof.problem],
                      ["Built", project.proof.built],
                      ["Result", project.proof.result]
                    ] as const).map(([label, text]) => (
                      <div key={label} className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/25">{label}</p>
                        <p className="mt-3 break-words text-sm leading-7 text-white/43">{text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {project.proof ? (
                  <ul className="mt-5 grid min-w-0 gap-3 sm:mt-6 sm:grid-cols-2">
                    {project.proof.features.map((feature) => (
                      <li key={feature} className="flex min-w-0 gap-3 text-sm leading-7 text-white/52">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                        <span className="min-w-0 break-words">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 flex max-w-full flex-wrap gap-x-4 gap-y-3 sm:mt-7">
                  <Link
                    href={`/work/${project.slug}`}
                    prefetch={false}
                    className="inline-flex touch-manipulation items-center gap-2 text-sm font-semibold text-[#8be9ff] active:opacity-70"
                  >
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={startProjectHref(project)}
                    prefetch={false}
                    className="inline-flex touch-manipulation items-center gap-2 text-sm font-semibold text-white/56 active:opacity-70"
                  >
                    Start similar project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex touch-manipulation items-center gap-2 text-sm font-semibold text-white/50 active:opacity-70"
                    >
                      Live website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
