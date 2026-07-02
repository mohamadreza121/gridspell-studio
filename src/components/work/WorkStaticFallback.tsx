import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { featuredProjects } from "@/config/work";

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
            Each case study explains the business problem, the strategic choices,
            the digital system, and the outcome.
          </p>
        </div>

        <div className="mt-16 grid gap-16">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="border-t border-white/[0.08] pt-8"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block overflow-hidden rounded-[1.6rem] border border-white/[0.1] bg-[#080a0f]"
              >
                <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(41,214,255,.16),transparent_28rem),linear-gradient(145deg,#0b0d13,#11182a)]">
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={project.previewAlt ?? `${project.title} website preview`}
                      fill
                      sizes="(min-width: 1024px) 70vw, 92vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-8 text-center">
                      <p className="max-w-[14ch] font-display text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>
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

                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
                  >
                    View case study
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
