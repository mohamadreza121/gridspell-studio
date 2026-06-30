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
    stiffness: 46,
    damping: 28,
    mass: 0.85,
    restDelta: 0.001
  });

  const mainX = useTransform(progress, [0, 0.5, 1], ["0px", "-12px", "6px"]);
  const mainY = useTransform(progress, [0, 0.5, 1], ["0px", "28px", "-10px"]);
  const mainRotate = useTransform(progress, [0, 0.5, 1], [-6, -2, 3]);
  const mainScale = useTransform(progress, [0, 0.5, 1], [1, 1.035, 1.015]);

  const outlineX = useTransform(progress, [0, 0.5, 1], ["7px", "-5px", "10px"]);
  const outlineY = useTransform(progress, [0, 0.5, 1], ["-6px", "18px", "4px"]);
  const outlineRotate = useTransform(progress, [0, 0.5, 1], [4, 1, -3]);
  const gridY = useTransform(progress, [0, 1], ["0px", "-52px"]);
  const glowY = useTransform(progress, [0, 1], ["0px", "36px"]);

  return (
    <>
      <style jsx global>{`
        @media (max-width: 767px) {
          .home-static-layout {
            position: relative;
            z-index: 1;
            isolation: isolate;
            background: transparent !important;
          }

          .home-static-layout > section {
            position: relative;
            z-index: 1;
          }
        }
      `}</style>

      <div
        className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden bg-[#07080c] max-md:block"
        aria-hidden="true"
      >
        <motion.div
          className="page-grid absolute inset-0 opacity-[0.24]"
          style={reduceMotion ? undefined : { y: gridY }}
        />

        <motion.div
          className="absolute right-[-22vw] top-[8vh] h-[78vw] max-h-[340px] w-[78vw] max-w-[340px] opacity-[0.16]"
          style={
            reduceMotion
              ? { x: "6px", y: "0px", rotate: 3 }
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
          className="absolute right-[-24vw] top-[7vh] h-[80vw] max-h-[350px] w-[80vw] max-w-[350px] opacity-[0.34]"
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
          className="absolute right-[-5rem] top-[3rem] h-60 w-60 rounded-full bg-[#7c5cff]/10 blur-[95px]"
          style={reduceMotion ? undefined : { y: glowY }}
        />
        <motion.div
          className="absolute bottom-[12%] left-[-5rem] h-48 w-48 rounded-full bg-[#29d6ff]/6 blur-[90px]"
          style={reduceMotion ? undefined : { y: mainY }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.12),rgba(7,8,12,.58)_32%,rgba(7,8,12,.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,transparent_0,rgba(7,8,12,.16)_34%,rgba(7,8,12,.5)_72%)]" />
      </div>
    </>
  );
}
