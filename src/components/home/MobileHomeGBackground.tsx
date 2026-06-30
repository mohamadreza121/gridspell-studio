"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { useId } from "react";

function MobileGridSpellG({
  id,
  outline = false
}: {
  id: string;
  outline?: boolean;
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
          <stop offset="0%" stopColor="#9D87FF" />
          <stop offset="42%" stopColor="#7C5CFF" />
          <stop offset="75%" stopColor="#67AEFF" />
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
          <feGaussianBlur stdDeviation={outline ? 3 : 7} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.72 0"
            result="softGlow"
          />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={outline ? 0.62 : 1} filter={`url(#${glowId})`}>
        <path
          d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 138}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M580 560 H792"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 138}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function MobileHomeGBackground() {
  const reduceMotion = useReducedMotion();
  const uniqueId = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 30,
    mass: 0.9,
    restDelta: 0.001
  });

  const mainX = useTransform(progress, [0, 0.5, 1], ["0px", "-16px", "8px"]);
  const mainY = useTransform(progress, [0, 0.5, 1], ["0px", "34px", "-12px"]);
  const mainRotate = useTransform(progress, [0, 0.5, 1], [-6, -2, 3]);
  const mainScale = useTransform(progress, [0, 0.5, 1], [1, 1.045, 1.02]);

  const outlineX = useTransform(progress, [0, 0.5, 1], ["8px", "-8px", "12px"]);
  const outlineY = useTransform(progress, [0, 0.5, 1], ["-8px", "22px", "5px"]);
  const outlineRotate = useTransform(progress, [0, 0.5, 1], [4, 1, -3]);
  const gridY = useTransform(progress, [0, 1], ["0px", "-64px"]);
  const glowY = useTransform(progress, [0, 1], ["0px", "42px"]);

  return (
    <>
      <style jsx global>{`
        @media (max-width: 1279px) {
          .home-experience,
          .home-static-layout {
            position: relative;
            z-index: 1;
            isolation: isolate;
            background: transparent !important;
          }

          .home-static-layout > section {
            position: relative;
            z-index: 2;
          }

          .home-static-layout .home-static-scene {
            background:
              radial-gradient(circle at 76% 10%, rgba(124, 92, 255, 0.08), transparent 28rem),
              rgba(7, 8, 12, 0.76) !important;
          }
        }
      `}</style>

      <div
        className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden bg-[#07080c] max-xl:block"
        aria-hidden="true"
      >
        <motion.div
          className="page-grid absolute inset-0 opacity-[0.28]"
          style={reduceMotion ? undefined : { y: gridY }}
        />

        <motion.div
          className="absolute right-[-6vw] top-[2vh] h-[106vw] max-h-[760px] w-[106vw] max-w-[760px] opacity-[0.2] sm:right-[0vw] sm:h-[88vw] sm:w-[88vw] md:right-[6vw] md:h-[76vw] md:w-[76vw]"
          style={
            reduceMotion
              ? { x: "8px", y: "0px", rotate: 3 }
              : {
                  x: outlineX,
                  y: outlineY,
                  rotate: outlineRotate
                }
          }
        >
          <MobileGridSpellG id={`${uniqueId}-outline`} outline />
        </motion.div>

        <motion.div
          className="absolute right-[-8vw] top-[1vh] h-[110vw] max-h-[790px] w-[110vw] max-w-[790px] opacity-[0.43] sm:right-[-1vw] sm:h-[92vw] sm:w-[92vw] md:right-[5vw] md:h-[80vw] md:w-[80vw]"
          style={
            reduceMotion
              ? { x: "0px", y: "0px", rotate: -5, scale: 1 }
              : {
                  x: mainX,
                  y: mainY,
                  rotate: mainRotate,
                  scale: mainScale
                }
          }
        >
          <MobileGridSpellG id={`${uniqueId}-main`} />
        </motion.div>

        <motion.div
          className="absolute right-[-3rem] top-[1rem] h-72 w-72 rounded-full bg-[#7c5cff]/12 blur-[105px] sm:right-[4rem] sm:h-96 sm:w-96"
          style={reduceMotion ? undefined : { y: glowY }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[-4rem] h-56 w-56 rounded-full bg-[#29d6ff]/7 blur-[95px] md:left-[8%] md:h-72 md:w-72"
          style={reduceMotion ? undefined : { y: mainY }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.04),rgba(7,8,12,.38)_35%,rgba(7,8,12,.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,transparent_0,rgba(7,8,12,.08)_34%,rgba(7,8,12,.42)_76%)]" />
      </div>
    </>
  );
}
