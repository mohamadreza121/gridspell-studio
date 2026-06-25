"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  featuredProjects,
  type FeaturedProject
} from "@/config/work";
import { cn } from "@/lib/utils";

type RollProject = FeaturedProject & {
  previewVideo?: string;
};

const projects = featuredProjects as RollProject[];

function ProjectMedia({
  project,
  active
}: {
  project: RollProject;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const inView = useInView(mediaRef, {
    amount: 0.25
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (active && inView) {
      void video.play().catch(() => {
        // Muted autoplay can still be delayed briefly by the browser.
      });
    } else {
      video.pause();
    }
  }, [active, inView]);

  return (
    <div
      ref={mediaRef}
      className="relative h-full w-full overflow-hidden bg-[#05060a]"
    >
      {project.previewVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-top"
          muted
          loop
          playsInline
          preload={active ? "auto" : "metadata"}
          poster={project.previewImage}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          aria-label={
            project.previewAlt ??
            `${project.title} website preview`
          }
        >
          <source
            src={project.previewVideo}
            type="video/mp4"
          />
        </video>
      ) : project.previewImage ? (
        <Image
          src={project.previewImage}
          alt={
            project.previewAlt ??
            `${project.title} website preview`
          }
          fill
          sizes="(min-width: 1400px) 50vw, 60vw"
          className="object-cover object-top"
          priority={project.slug === "desa-foam-insulation"}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(41,214,255,0.15),transparent_28rem),linear-gradient(145deg,#0b0d13,#11182a)]">
          <div className="absolute left-[8%] top-[12%] h-3 w-28 rounded-full bg-white/12" />

          <p className="absolute left-[8%] top-[30%] max-w-[70%] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white">
            {project.title}
          </p>

          <div className="absolute bottom-[10%] left-[8%] right-[8%] grid grid-cols-3 gap-3">
            <span className="h-24 rounded-xl border border-white/[0.08] bg-white/[0.035]" />
            <span className="h-24 rounded-xl border border-white/[0.08] bg-white/[0.035]" />
            <span className="h-24 rounded-xl border border-white/[0.08] bg-white/[0.035]" />
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.055),transparent_24%,transparent_72%,rgba(41,214,255,0.025))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/20 to-transparent"
      />
    </div>
  );
}

function BrowserProjectCard({
  project,
  index,
  count,
  progress,
  active
}: {
  project: RollProject;
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const center = count <= 1 ? 0.5 : index / (count - 1);
  const input = [
    center - 0.34,
    center,
    center + 0.34
  ];

  const opacity = useTransform(
    progress,
    input,
    [0, 1, 0]
  );

  const y = useTransform(
    progress,
    input,
    [420, 0, -420]
  );

  const z = useTransform(
    progress,
    input,
    [-420, 0, -420]
  );

  const scale = useTransform(
    progress,
    input,
    [0.66, 1, 0.66]
  );

  const rotateX = useTransform(
    progress,
    input,
    [68, 0, -68]
  );

  const rotateY = useTransform(
    progress,
    input,
    [-9, 0, 9]
  );

  const rotateZ = useTransform(
    progress,
    input,
    [-5, 0, 5]
  );

  const filter = useTransform(
    progress,
    input,
    [
      "blur(12px)",
      "blur(0px)",
      "blur(12px)"
    ]
  );

  const zIndex = useTransform(
    progress,
    input,
    [1, 30, 1]
  );

  const hostname = project.liveUrl
    ? project.liveUrl
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "")
    : `${project.slug}.gridspell.preview`;

  return (
    <motion.article
      className={cn(
        "absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]",
        active
          ? "pointer-events-auto"
          : "pointer-events-none"
      )}
      style={{
        opacity,
        y,
        z,
        scale,
        rotateX,
        rotateY,
        rotateZ,
        filter,
        zIndex,
        transformPerspective: 1800,
        transformOrigin: "50% 50%"
      }}
      aria-hidden={!active}
      inert={!active}
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="group relative block w-full max-w-[820px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] bottom-[-6%] h-[16%] rounded-[50%] bg-black/75 blur-3xl"
        />

        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.14] bg-[#05070b] p-[7px] shadow-[0_55px_160px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-500 group-hover:border-[#8be9ff]/30">
          <div className="overflow-hidden rounded-[1.4rem] border border-black bg-black">
            <div className="flex h-12 items-center gap-3 border-b border-white/[0.08] bg-[#090b10]/96 px-4">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.07]" />
              </div>

              <div className="mx-auto max-w-[67%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-6 py-1.5 text-[0.56rem] tracking-[0.09em] text-white/32">
                {hostname}
              </div>

              <ArrowUpRight className="h-3.5 w-3.5 text-white/22 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8be9ff]" />
            </div>

            <div className="aspect-video">
              <ProjectMedia
                project={project}
                active={active}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ProjectCopy({
  project,
  index,
  count,
  progress,
  active
}: {
  project: RollProject;
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const center = count <= 1 ? 0.5 : index / (count - 1);
  const input = [
    center - 0.31,
    center,
    center + 0.31
  ];

  const opacity = useTransform(
    progress,
    input,
    [0, 1, 0]
  );

  const x = useTransform(
    progress,
    input,
    [150, 0, -90]
  );

  const y = useTransform(
    progress,
    input,
    [35, 0, -24]
  );

  const filter = useTransform(
    progress,
    input,
    [
      "blur(12px)",
      "blur(0px)",
      "blur(9px)"
    ]
  );

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex flex-col justify-center",
        active
          ? "pointer-events-auto"
          : "pointer-events-none"
      )}
      style={{
        opacity,
        x,
        y,
        filter
      }}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
          {project.category}
        </span>
      </div>

      <h2 className="mt-7 text-balance font-display text-[clamp(3.7rem,5.7vw,7.4rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
        {project.title}
      </h2>

      <p className="mt-7 max-w-xl text-base leading-8 text-white/46 sm:text-lg">
        {project.description}
      </p>

      <div className="mt-8 border-l border-[#8be9ff]/30 pl-5">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/26">
          Project outcome
        </p>

        <p className="mt-3 max-w-lg font-display text-xl font-semibold leading-snug tracking-[-0.035em] text-white/78">
          {project.result}
        </p>
      </div>

      <div className="mt-9 flex flex-wrap gap-4">
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white px-6 text-sm font-semibold text-[#08090d] transition duration-300 hover:-translate-y-0.5"
        >
          View case study

          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/62 transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            Live website

            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

function DesktopRollScene() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: [
      "start start",
      "end end"
    ]
  });

  const progress = useSpring(rawProgress, {
    stiffness: 105,
    damping: 30,
    mass: 0.32,
    restDelta: 0.0005
  });

  useMotionValueEvent(rawProgress, "change", (value) => {
    const nextIndex = Math.min(
      projects.length - 1,
      Math.max(
        0,
        Math.round(value * (projects.length - 1))
      )
    );

    setActiveProject((current) =>
      current === nextIndex
        ? current
        : nextIndex
    );
  });

  const orbitRotate = useTransform(
    progress,
    [0, 1],
    [-18, 198]
  );

  const orbitScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.95, 1.05, 0.95]
  );

  const backgroundX = useTransform(
    progress,
    [0, 1],
    ["8%", "-8%"]
  );

  const progressScale = useTransform(
    progress,
    [0, 1],
    [0.02, 1]
  );

  function scrollToProject(index: number) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const trackTop =
      window.scrollY +
      track.getBoundingClientRect().top;

    const scrollableDistance = Math.max(
      0,
      track.offsetHeight - window.innerHeight
    );

    const ratio =
      projects.length <= 1
        ? 0
        : index / (projects.length - 1);

    window.scrollTo({
      top: trackTop + scrollableDistance * ratio,
      behavior: "smooth"
    });
  }

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{
        height: `${projects.length * 120 + 40}dvh`
      }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#07080c]">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 opacity-42"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_46%,rgba(124,92,255,0.12),transparent_35rem),radial-gradient(circle_at_80%_58%,rgba(41,214,255,0.07),transparent_30rem)]"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-1/2 whitespace-nowrap font-display text-[clamp(12rem,25vw,32rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.018]"
          style={{
            x: backgroundX,
            y: "-50%"
          }}
        >
          WORK
        </motion.div>

        <Container className="relative h-full pb-12 pt-28">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
                  Selected work
                </p>
              </div>

              <p className="hidden text-[0.58rem] uppercase tracking-[0.25em] text-white/24 xl:block">
                Scroll to rotate through projects
              </p>
            </div>

            <div className="grid min-h-0 flex-1 items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] xl:gap-20">
              {/* 3D project roll */}
              <div className="relative h-[min(64dvh,700px)] [perspective:1800px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[118%]"
                  style={{
                    transform:
                      "translate(-50%, -50%) rotateX(68deg)"
                  }}
                >
                  <motion.div
                    className="relative h-full w-full rounded-[50%] border border-white/[0.075]"
                    style={{
                      rotate: orbitRotate,
                      scale: orbitScale
                    }}
                  >
                    <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#8be9ff] shadow-[0_0_24px_rgba(139,233,255,0.8)]" />

                    <span className="absolute bottom-[-4px] left-[18%] h-2 w-2 rounded-full bg-[#7c5cff] shadow-[0_0_20px_rgba(124,92,255,0.7)]" />

                    <span className="absolute right-[12%] top-[26%] h-1.5 w-1.5 rounded-full bg-white/45" />
                  </motion.div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[92%] rounded-[50%] border border-white/[0.035]"
                  style={{
                    transform:
                      "translate(-50%, -50%) rotateX(68deg)"
                  }}
                />

                {projects.map((project, index) => (
                  <BrowserProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    count={projects.length}
                    progress={progress}
                    active={activeProject === index}
                  />
                ))}
              </div>

              {/* Synchronized project copy */}
              <div className="relative h-[min(60dvh,650px)]">
                {projects.map((project, index) => (
                  <ProjectCopy
                    key={project.slug}
                    project={project}
                    index={index}
                    count={projects.length}
                    progress={progress}
                    active={activeProject === index}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-mono text-[0.58rem] tracking-[0.2em] text-white/28">
                {String(activeProject + 1).padStart(2, "0")}
              </span>

              <div className="h-px flex-1 overflow-hidden bg-white/[0.09]">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                  style={{
                    scaleX: progressScale
                  }}
                />
              </div>

              <span className="font-mono text-[0.58rem] tracking-[0.2em] text-white/28">
                {String(projects.length).padStart(2, "0")}
              </span>

              <div className="ml-3 flex gap-2">
                {projects.map((project, index) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => scrollToProject(index)}
                    aria-label={`Show ${project.title}`}
                    aria-current={
                      activeProject === index
                        ? "step"
                        : undefined
                    }
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeProject === index
                        ? "w-8 bg-[#8be9ff]"
                        : "w-2 bg-white/18 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function StaticWorkList() {
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
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="border-t border-white/[0.08] pt-8"
            >
              <Link
                href={`/work/${project.slug}`}
                className="block overflow-hidden rounded-[1.6rem] border border-white/[0.1] bg-[#080a0f]"
              >
                <div className="aspect-video">
                  <ProjectMedia
                    project={project}
                    active
                  />
                </div>
              </Link>

              <div className="mt-7">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {project.category}
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

export function WorkRollScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticWorkList />;
  }

  return (
    <>
      <div className="hidden lg:block">
        <DesktopRollScene />
      </div>

      <div className="lg:hidden">
        <StaticWorkList />
      </div>

      <div className="pointer-events-none fixed bottom-5 left-5 z-20 hidden items-center gap-3 text-[0.56rem] uppercase tracking-[0.25em] text-white/22 lg:flex">
        <ArrowDown className="h-3.5 w-3.5" />
        Scroll
      </div>
    </>
  );
}