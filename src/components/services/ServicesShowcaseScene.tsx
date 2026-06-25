"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight
} from "lucide-react";

import { ServiceVisual } from "@/components/services/ServiceVisuals";
import { Container } from "@/components/ui/Container";
import {
  services,
  type Service
} from "@/config/services";
import { cn } from "@/lib/utils";

const SERVICE_COUNT = services.length;

type SceneTimeline = {
  input: number[];
  opacity: number[];
  localProgress: number[];
};

function getSceneTimeline(
  index: number,
  count: number
): SceneTimeline {
  if (count <= 1) {
    return {
      input: [0, 0.5, 1],
      opacity: [1, 1, 1],
      localProgress: [0, 0.5, 1]
    };
  }

  const lastIndex = count - 1;
  const step = 1 / lastIndex;
  const anchor = index * step;

  /*
   * Each service changes around the midpoint between its anchor
   * and the next service's anchor.
   *
   * The transition occupies only about 22% of one service step,
   * leaving a long interval where the current scene is fully visible.
   */
  const transitionHalf = step * 0.11;

  if (index === 0) {
    const rightBoundary = step / 2;

    return {
      input: [
        0,
        rightBoundary - transitionHalf,
        rightBoundary + transitionHalf
      ],
      opacity: [1, 1, 0],
      localProgress: [0.5, 0.5, 1]
    };
  }

  if (index === lastIndex) {
    const leftBoundary = anchor - step / 2;

    return {
      input: [
        leftBoundary - transitionHalf,
        leftBoundary + transitionHalf,
        1
      ],
      opacity: [0, 1, 1],
      localProgress: [0, 0.5, 0.5]
    };
  }

  const leftBoundary = anchor - step / 2;
  const rightBoundary = anchor + step / 2;

  return {
    input: [
      leftBoundary - transitionHalf,
      leftBoundary + transitionHalf,
      rightBoundary - transitionHalf,
      rightBoundary + transitionHalf
    ],
    opacity: [0, 1, 1, 0],
    localProgress: [0, 0.5, 0.5, 1]
  };
}

function ServiceChapter({
  service,
  index,
  count,
  progress,
  active
}: {
  service: Service;
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const timeline = getSceneTimeline(index, count);
  const { input } = timeline;

  const first = index === 0;
  const last = index === count - 1;

  const localProgress = useTransform(
    progress,
    input,
    timeline.localProgress,
    {
      clamp: true
    }
  );

  const visualOpacity = useTransform(
    progress,
    input,
    timeline.opacity
  );

  const visualX = useTransform(
    progress,
    input,
    first
      ? [0, 0, -90]
      : last
        ? [90, 0, 0]
        : [90, 0, 0, -90]
  );

  const visualY = useTransform(
    progress,
    input,
    first
      ? [0, 0, -22]
      : last
        ? [22, 0, 0]
        : [22, 0, 0, -22]
  );

  const visualScale = useTransform(
    progress,
    input,
    first
      ? [1, 1, 0.94]
      : last
        ? [0.94, 1, 1]
        : [0.94, 1, 1, 0.94]
  );

  const visualRotate = useTransform(
    progress,
    input,
    first
      ? [0, 0, 2]
      : last
        ? [-2, 0, 0]
        : [-2, 0, 0, 2]
  );

  const textOpacity = useTransform(
    progress,
    input,
    timeline.opacity
  );

  const textX = useTransform(
    progress,
    input,
    first
      ? [0, 0, -70]
      : last
        ? [115, 0, 0]
        : [115, 0, 0, -70]
  );

  const textY = useTransform(
    progress,
    input,
    first
      ? [0, 0, -16]
      : last
        ? [20, 0, 0]
        : [20, 0, 0, -16]
  );

  /*
   * Keep blur restrained. Large blur values remain visible for too
   * long when using smooth spring scrolling.
   */
  const textFilter = useTransform(
    progress,
    input,
    first
      ? [
          "blur(0px)",
          "blur(0px)",
          "blur(5px)"
        ]
      : last
        ? [
            "blur(5px)",
            "blur(0px)",
            "blur(0px)"
          ]
        : [
            "blur(5px)",
            "blur(0px)",
            "blur(0px)",
            "blur(5px)"
          ]
  );

  return (
    <section
      className={cn(
        "absolute inset-0 grid min-h-0 items-center gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:gap-12 2xl:gap-16",
        active
          ? "pointer-events-auto"
          : "pointer-events-none"
      )}
      aria-hidden={!active}
      inert={!active}
    >
      {/* Large background number */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[3%] top-1/2 -translate-y-1/2 font-display text-[clamp(11rem,22vw,27rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.016]"
        style={{
          opacity: textOpacity
        }}
      >
        {service.number}
      </motion.div>

      {/* Animated service object */}
      <motion.div
        className="relative min-h-0 [transform-style:preserve-3d]"
        style={{
          opacity: visualOpacity,
          x: visualX,
          y: visualY,
          scale: visualScale,
          rotateZ: visualRotate,
          transformPerspective: 1800,
          transformOrigin: "50% 50%"
        }}
      >
        <ServiceVisual
          index={index}
          progress={localProgress}
          active={active}
        />
      </motion.div>

      {/* Service content */}
      <motion.div
        className="relative z-10 max-w-2xl"
        style={{
          opacity: textOpacity,
          x: textX,
          y: textY,
          filter: textFilter
        }}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
            {service.number}
          </span>

          <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
            {service.shortTitle}
          </span>
        </div>

        <h2 className="mt-6 text-balance font-display text-[clamp(3rem,4.65vw,5.9rem)] font-semibold leading-[0.85] tracking-[-0.073em] text-white">
          {service.title}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-8 text-white/46 sm:text-lg">
          {service.summary}
        </p>

        <div className="mt-6 border-l border-[#8be9ff]/30 pl-5">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-white/26">
            Ideal for
          </p>

          <p className="mt-2 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
            {service.idealFor}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {service.deliverables.slice(0, 3).map((deliverable) => (
            <span
              key={deliverable}
              className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.58rem] uppercase tracking-[0.17em] text-white/42"
            >
              {deliverable}
            </span>
          ))}
        </div>

        <Link
          href={`/services/${service.slug}`}
          className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white px-6 text-sm font-semibold text-[#08090d] transition duration-300 hover:-translate-y-0.5"
        >
          Explore this service

          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </section>
  );
}

function DesktopServicesShowcase() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: [
      "start start",
      "end end"
    ]
  });

  const progress = useSpring(rawProgress, {
    stiffness: 165,
    damping: 44,
    mass: 0.24,
    restDelta: 0.0005
  });

  const progressScale = useTransform(
    progress,
    [0, 1],
    [0.02, 1]
  );

  const backgroundX = useTransform(
    progress,
    [0, 1],
    ["8%", "-10%"]
  );

  const backgroundRotate = useTransform(
    progress,
    [0, 1],
    [-4, 5]
  );

  useMotionValueEvent(rawProgress, "change", (value) => {
    const next = Math.min(
      SERVICE_COUNT - 1,
      Math.max(
        0,
        Math.round(value * (SERVICE_COUNT - 1))
      )
    );

    setActiveService((current) =>
      current === next
        ? current
        : next
    );
  });

  function scrollToService(index: number) {
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
      SERVICE_COUNT <= 1
        ? 0
        : index / (SERVICE_COUNT - 1);

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
        height: `${SERVICE_COUNT * 165 + 40}dvh`
      }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#07080c]">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 opacity-42"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_42%,rgba(124,92,255,0.13),transparent_37rem),radial-gradient(circle_at_82%_62%,rgba(41,214,255,0.075),transparent_31rem)]"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-1/2 whitespace-nowrap font-display text-[clamp(10rem,22vw,29rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.012]"
          style={{
            x: backgroundX,
            y: "-50%",
            rotate: backgroundRotate
          }}
        >
          SYSTEMS
        </motion.div>

        <Container className="relative flex h-full flex-col pb-6 pt-24">
          <div className="flex min-h-10 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
                Services · Systems in motion
              </p>
            </div>

            <p className="hidden text-[0.58rem] uppercase tracking-[0.25em] text-white/24 2xl:block">
              Scroll to transform the system
            </p>
          </div>

          <div className="relative min-h-0 flex-1">
            {services.map((service, index) => (
              <ServiceChapter
                key={service.slug}
                service={service}
                index={index}
                count={SERVICE_COUNT}
                progress={progress}
                active={activeService === index}
              />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[0.58rem] tracking-[0.2em] text-white/28">
              {String(activeService + 1).padStart(2, "0")}
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
              {String(SERVICE_COUNT).padStart(2, "0")}
            </span>

            <div className="ml-3 flex gap-2">
              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => scrollToService(index)}
                  aria-label={`Show ${service.title}`}
                  aria-current={
                    activeService === index
                      ? "step"
                      : undefined
                  }
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeService === index
                      ? "w-8 bg-[#8be9ff]"
                      : "w-2 bg-white/18 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-5 left-5 hidden items-center gap-3 text-[0.56rem] uppercase tracking-[0.25em] text-white/22 2xl:flex">
          <ArrowDown className="h-3.5 w-3.5" />
          Scroll
        </div>
      </div>
    </section>
  );
}

function StaticServicesList() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-34"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
            Services
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            A complete digital partner.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Strategy, interface design, production development, secure data,
            and ongoing improvement—organized around the business result.
          </p>
        </div>

        <div className="mt-16 grid gap-16">
          {services.map((service) => (
            <article
              key={service.slug}
              className="border-t border-white/[0.08] pt-9"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                {service.number} · {service.shortTitle}
              </p>

              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl">
                {service.title}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/44">
                {service.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {service.deliverables.slice(0, 3).map((deliverable) => (
                  <span
                    key={deliverable}
                    className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-white/42"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
              >
                Explore service
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}

export function ServicesShowcaseScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticServicesList />;
  }

  return (
    <>
      <div className="hidden xl:block">
        <DesktopServicesShowcase />
      </div>

      <div className="xl:hidden">
        <StaticServicesList />
      </div>
    </>
  );
}