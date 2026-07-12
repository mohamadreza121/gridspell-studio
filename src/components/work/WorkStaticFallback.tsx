import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

import { ExperienceLab } from "@/components/work/experience-lab/ExperienceLab";
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
  return `/images/work/selected-work/${project.slug}-${variant}.jpg`;
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
    <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.11] bg-[radial-gradient(circle_at_70%_18%,rgba(41,214,255,.12),transparent_24rem),linear-gradient(145deg,#0b0d13,#11182a)] px-4 py-7 sm:px-6 sm:py-8 md:px-8">
      <div aria-hidden="true" className="absolute -left-16 bottom-[-5rem] h-56 w-56 rounded-full bg-[#7657ff]/24 blur-[70px]" />
      <div aria-hidden="true" className="absolute -right-16 top-[-4rem] h-52 w-52 rounded-full bg-[#29d6ff]/14 blur-[76px]" />

      <picture className="relative z-10 block">
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
          fetchPriority={priority ? "high" : "auto"}
          className="mx-auto block aspect-[360/800] w-[72%] max-w-[19rem] rounded-[1.9rem] border-[5px] border-[#11141b] object-cover object-top shadow-[0_32px_90px_rgba(0,0,0,.58)] ring-1 ring-white/[0.14] min-[375px]:aspect-[430/932] md:aspect-[4/3] md:w-full md:max-w-none md:rounded-[1.45rem] md:border-[6px]"
        />
      </picture>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]" />
    </div>
  );
}

export function WorkStaticFallback() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-35"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
            Selected work
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            Designed with a reason.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Each case study explains the business problem, what GridSpell built,
            the system behind the interface, and the result the website is meant to support.
          </p>
        </div>
      </Container>

      <ExperienceLab />

      <Container className="relative">
        <div className="mt-16 grid gap-16">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="border-t border-white/[0.08] pt-8"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block"
              >
                <ResponsiveProjectPreview project={project} priority={index === 0} />
              </Link>

              <div className="mt-7">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                  {String(index + 1).padStart(2, "0")} · {project.category}
                </p>

                <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
                  {project.title}
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/44">
                  {project.description}
                </p>

                {project.proof ? (
                  <div className="mt-7 grid gap-4 lg:grid-cols-3">
                    {([
                      ["Problem", project.proof.problem],
                      ["Built", project.proof.built],
                      ["Result", project.proof.result]
                    ] as const).map(([label, text]) => (
                      <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/25">{label}</p>
                        <p className="mt-3 text-sm leading-7 text-white/43">{text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {project.proof ? (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.proof.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-7 text-white/52">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
                  >
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={startProjectHref(project)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/56"
                  >
                    Start similar project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/50"
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
