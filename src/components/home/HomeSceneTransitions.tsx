"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { useEffect, useId } from "react";

function GridSpellG({
  outline = false,
  id
}: {
  outline?: boolean;
  id: string;
}) {
  const gradientId = `${id}-gradient`;
  const glowId = `${id}-glow`;

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="180"
          y1="170"
          x2="835"
          y2="810"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A895FF" />
          <stop offset="38%" stopColor="#7C5CFF" />
          <stop offset="72%" stopColor="#67AEFF" />
          <stop offset="100%" stopColor="#29D6FF" />
        </linearGradient>
        <filter
          id={glowId}
          x="-24%"
          y="-24%"
          width="148%"
          height="148%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation={outline ? 4 : 10} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.82 0"
            result="softGlow"
          />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={outline ? 0.64 : 1} filter={`url(#${glowId})`}>
        <path
          d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 54 : 148}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M580 560 H792"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 54 : 148}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function HomeParallaxBackground() {
  const reduceMotion = useReducedMotion();
  const svgId = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 24,
    mass: 0.72,
    restDelta: 0.001
  });

  const stops = [0, 0.13, 0.27, 0.41, 0.55, 0.69, 0.84, 1];
  const mainX = useTransform(progress, stops, ["9vw", "2vw", "-6vw", "3vw", "-9vw", "1vw", "-5vw", "5vw"]);
  const mainY = useTransform(progress, stops, ["-10vh", "-1vh", "8vh", "-3vh", "12vh", "2vh", "16vh", "7vh"]);
  const mainRotate = useTransform(progress, stops, [-10, -5, 2, -3, 6, -2, 8, 12]);
  const mainScale = useTransform(progress, stops, [1.05, 1.1, 0.98, 1.04, 0.94, 1.08, 0.99, 1.12]);
  const mainOpacity = useTransform(progress, [0, 0.2, 0.42, 0.64, 0.82, 1], [0.62, 0.5, 0.58, 0.46, 0.53, 0.61]);

  const outlineX = useTransform(progress, [0, 0.18, 0.36, 0.54, 0.72, 1], ["-2vw", "-8vw", "2vw", "-5vw", "4vw", "-7vw"]);
  const outlineY = useTransform(progress, [0, 0.18, 0.36, 0.54, 0.72, 1], ["-5vh", "5vh", "-2vh", "10vh", "1vh", "13vh"]);
  const outlineRotate = useTransform(progress, [0, 0.22, 0.46, 0.7, 1], [8, 2, -5, 4, -10]);
  const outlineScale = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [1.08, 0.98, 1.12, 1.01, 1.09]);
  const outlineOpacity = useTransform(progress, [0, 0.24, 0.48, 0.72, 1], [0.22, 0.34, 0.2, 0.31, 0.24]);

  const echoX = useTransform(progress, [0, 1], ["-22vw", "18vw"]);
  const echoY = useTransform(progress, [0, 0.5, 1], ["18vh", "-4vh", "12vh"]);
  const echoRotate = useTransform(progress, [0, 1], [-18, 14]);
  const echoOpacity = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0.06, 0.14, 0.08, 0.15, 0.07]);
  const gridY = useTransform(progress, [0, 1], ["0px", "-180px"]);
  const glowX = useTransform(progress, [0, 0.5, 1], ["18vw", "-8vw", "12vw"]);
  const glowY = useTransform(progress, [0, 0.5, 1], ["-8vh", "18vh", "4vh"]);

  useEffect(() => {
    const main = document.querySelector("main");
    main?.classList.add("home-parallax-content");
    return () => main?.classList.remove("home-parallax-content");
  }, []);

  return (
    <>
      <style jsx global>{`
        .home-parallax-content {
          position: relative;
          z-index: 1;
          isolation: isolate;
          background: transparent !important;
        }
        .home-parallax-content > section {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07080c]"
        aria-hidden="true"
      >
        <motion.div
          className="page-grid absolute inset-0 opacity-35"
          style={reduceMotion ? undefined : { y: gridY }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.14),rgba(7,8,12,.62)_46%,rgba(7,8,12,.25))]" />

        <motion.div
          className="absolute right-[-22vw] top-[-20vh] h-[min(102vw,1280px)] w-[min(102vw,1280px)] sm:right-[-15vw] lg:right-[-10vw]"
          style={
            reduceMotion
              ? { x: "-3vw", y: "1vh", rotate: 5, scale: 1.06, opacity: 0.23 }
              : { x: outlineX, y: outlineY, rotate: outlineRotate, scale: outlineScale, opacity: outlineOpacity }
          }
        >
          <GridSpellG outline id={`${svgId}-outline`} />
        </motion.div>

        <motion.div
          className="absolute right-[-25vw] top-[-22vh] h-[min(106vw,1320px)] w-[min(106vw,1320px)] sm:right-[-17vw] lg:right-[-12vw]"
          style={
            reduceMotion
              ? { x: "4vw", y: "-3vh", rotate: -6, scale: 1.04, opacity: 0.52 }
              : { x: mainX, y: mainY, rotate: mainRotate, scale: mainScale, opacity: mainOpacity }
          }
        >
          <GridSpellG id={`${svgId}-main`} />
        </motion.div>

        <motion.div
          className="absolute left-[-32vw] top-[30vh] h-[min(72vw,860px)] w-[min(72vw,860px)]"
          style={
            reduceMotion
              ? { opacity: 0.08, x: "-12vw", y: "8vh", rotate: -12 }
              : { opacity: echoOpacity, x: echoX, y: echoY, rotate: echoRotate }
          }
        >
          <GridSpellG outline id={`${svgId}-echo`} />
        </motion.div>

        <motion.div
          className="absolute right-[8%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/11 blur-[165px]"
          style={reduceMotion ? { opacity: 0.5 } : { x: glowX, y: glowY }}
        />
        <motion.div
          className="absolute bottom-[8%] left-[7%] h-[26rem] w-[26rem] rounded-full bg-[#29d6ff]/8 blur-[150px]"
          style={reduceMotion ? { opacity: 0.42 } : { x: outlineX, y: mainY, opacity: outlineOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(7,8,12,.44)_100%)]" />
      </div>
    </>
  );
}
