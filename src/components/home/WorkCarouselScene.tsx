"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform
} from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { featuredProjects, type FeaturedProject } from "@/config/work";

function BrowserPreview({ project }: { project: FeaturedProject }) {
  const hostname = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : `${project.slug}.gridspell.preview`;

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.45rem] border border-white/[0.1] bg-[#080a0f] shadow-[0_35px_110px_rgba(0,0,0,.42)]">
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.08] bg-[#090b10]/95 px-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/13" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/8" />
        </div>
        <div className="mx-auto max-w-[72%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-5 py-1.5 text-[0.58rem] tracking-[0.08em] text-white/32">
          {hostname}
        </div>
      </div>

      <div className="relative h-[calc(100%-2.75rem)] min-h-[316px] overflow-hidden">
        {project.previewImage ? (
          <Image
            src={project.previewImage}
            alt={project.previewAlt ?? `${project.title} homepage preview`}
            fill
            sizes="(min-width: 1440px) 48vw, (min-width: 900px) 54vw, 92vw"
            className="object-cover object-top"
            priority={project.slug === "desa-foam-insulation"}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(41,214,255,.16),transparent_28rem),linear-gradient(145deg,#0b0d13,#11182a)] p-8">
            <div className="h-3 w-24 rounded-full bg-white/14" />
            <div className="mt-12 max-w-[72%] font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-white">
              {project.title}
            </div>
            <div className="mt-8 h-2 w-3/5 rounded-full bg-white/10" />
            <div className="mt-3 h-2 w-2/5 rounded-full bg-white/7" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
              <div className="h-24 rounded-xl border border-white/[0.07] bg-white/[0.035]" />
              <div className="h-24 rounded-xl border border-white/[0.07] bg-white/[0.035]" />
              <div className="h-24 rounded-xl border border-white/[0.07] bg-white/[0.035]" />
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06070a]/28 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function ProjectPanel({
  project,
  index,
  progress
}: {
  project: FeaturedProject;
  index: number;
  progress: MotionValue<number>;
}) {
  const lastIndex = Math.max(1, featuredProjects.length - 1);
  const center = index === 0 ? 0.035 : 0.18 + (index / lastIndex) * 0.62;
  const start = Math.max(0, center - 0.24);
  const end = Math.min(1, center + 0.28);

  const y = useTransform(progress, [start, center, end], [110, 0, -42]);
  const opacity = useTransform(progress, [start, center, end], [0.42, 1, 0.72]);
  const scale = useTransform(progress, [start, center, end], [0.955, 1, 0.985]);
  const rotateZ = useTransform(progress, [start, center, end], [1.1, 0, -0.55]);

  return (
    <section className="work-carousel-panel work-carousel-project-panel">
      <div className="work-carousel-divider" aria-hidden="true" />
      <motion.article
        className="work-carousel-card"
        style={{ y, opacity, scale, rotateZ, transformOrigin: "50% 60%" }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="block h-[min(58dvh,620px)] min-h-[390px]"
          aria-label={`View ${project.title} case study`}
        >
          <BrowserPreview project={project} />
        </Link>

        <div className="mt-5 grid gap-4 border-t border-white/[0.08] pt-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.3em] text-[#8be9ff]/70">
              {String(index + 1).padStart(2, "0")} · {project.category}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,2.15vw,2.8rem)] font-semibold tracking-[-0.05em] text-white">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              {project.result}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 xl:justify-end">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 border-b border-[#8be9ff]/55 pb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8be9ff] transition hover:border-[#8be9ff]"
            >
              Case study <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-white/18 pb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:border-white/55 hover:text-white"
              >
                Live site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
    </section>
  );
}

export function WorkCarouselScene({ progress }: { progress: MotionValue<number> }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!viewport || !strip) return;

    const measure = () => {
      setTravel(Math.max(0, strip.scrollWidth - viewport.clientWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(strip);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(
      featuredProjects.length - 1,
      Math.max(0, Math.round(value * (featuredProjects.length - 1)))
    );
    setActiveProject((current) => (current === next ? current : next));
  });

  const targetX = useTransform(progress, [0, 1], [0, -travel]);
  const x = useSpring(targetX, {
    stiffness: 150,
    damping: 34,
    mass: 0.24,
    restDelta: 0.01
  });

  const titleOpacity = useTransform(progress, [0, 0.14, 0.3], [1, 1, 0.12]);
  const titleX = useTransform(progress, [0, 0.3], [0, -44]);
  const progressScale = useTransform(progress, [0, 1], [0.04, 1]);
  const outroOpacity = useTransform(progress, [0.7, 0.9, 1], [0.15, 0.82, 1]);
  const outroY = useTransform(progress, [0.7, 1], [80, 0]);

  return (
    <div ref={viewportRef} className="work-carousel-viewport h-full w-full overflow-clip">
      <motion.div
        ref={stripRef}
        className="work-carousel-strip flex h-full w-max flex-nowrap"
        style={{ x, willChange: "transform" }}
      >
        <section className="work-carousel-panel work-carousel-intro-panel">
          <motion.div className="max-w-xl" style={{ opacity: titleOpacity, x: titleX }}>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
              Selected work
            </p>
            <h2 className="mt-6 text-balance font-display text-[clamp(3.8rem,5.8vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-white">
              Proof before promises.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/45 sm:text-lg">
              Scroll through real first impressions, then open each case study for the
              thinking, systems, and outcomes behind the work.
            </p>
            <Link
              href="/work"
              className="mt-9 inline-flex items-center gap-3 border-b border-white/24 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/62 transition hover:border-[#8be9ff] hover:text-[#8be9ff]"
            >
              View all projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>

        {featuredProjects.map((project, index) => (
          <ProjectPanel
            key={project.slug}
            project={project}
            index={index}
            progress={progress}
          />
        ))}

        <section className="work-carousel-panel work-carousel-outro-panel">
          <div className="work-carousel-divider" aria-hidden="true" />
          <motion.div
            className="max-w-lg text-center"
            style={{ opacity: outroOpacity, y: outroY }}
          >
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
              More than screenshots
            </p>
            <h3 className="mt-6 font-display text-[clamp(2.6rem,4vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
              Explore the complete project archive.
            </h3>
            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-white/42">
              Every case study connects visual decisions to business goals, technical
              delivery, and the final experience.
            </p>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#8be9ff]/55 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8be9ff] transition hover:border-[#8be9ff]"
            >
              View all work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </motion.div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden w-[min(38vw,620px)] -translate-x-1/2 items-center gap-4 xl:flex">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/30">
          {String(activeProject + 1).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
            style={{ scaleX: progressScale }}
          />
        </div>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/30">
          {String(featuredProjects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function StaticWorkGallery() {
  return (
    <Container className="py-8">
      <div className="max-w-3xl">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
          Selected work
        </p>
        <h2 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
          Proof before promises.
        </h2>
        <p className="mt-6 text-base leading-8 text-white/45">
          See the real first impression, then open the case study for the decisions,
          systems, and outcomes behind it.
        </p>
      </div>

      <div className="mt-12 grid gap-8">
        {featuredProjects.map((project, index) => (
          <article
            key={project.slug}
            className="rounded-[1.7rem] border border-white/[0.09] bg-white/[0.025] p-4 sm:p-6"
          >
            <Link href={`/work/${project.slug}`} className="block min-h-[340px] sm:h-[500px]">
              <BrowserPreview project={project} />
            </Link>
            <div className="mt-6">
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[#8be9ff]/70">
                {String(index + 1).padStart(2, "0")} · {project.category}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/40">{project.result}</p>
              <div className="mt-5 flex flex-wrap gap-5">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
                >
                  Case study <ArrowUpRight className="h-4 w-4" />
                </Link>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/52"
                  >
                    Live site <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
