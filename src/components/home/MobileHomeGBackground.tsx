"use client";

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
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation={outline ? 2 : 4}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
            result="softGlow"
          />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={outline ? 0.52 : 1} filter={`url(#${glowId})`}>
        <path
          d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 128}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M580 560 H792"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 128}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function MobileHomeGBackground() {
  const uniqueId = useId().replace(/:/g, "");

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
              linear-gradient(
                180deg,
                rgba(7, 8, 12, 0.5),
                rgba(7, 8, 12, 0.68)
              ) !important;
          }
        }
      `}</style>

      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-0 hidden h-screen overflow-hidden bg-[#07080c] max-xl:block"
        aria-hidden="true"
      >
        <div className="page-grid absolute inset-0 opacity-[0.25]" />

        <div className="absolute right-[-34vw] top-[7.5rem] h-[145vw] max-h-[620px] w-[145vw] max-w-[620px] opacity-[0.24] min-[380px]:right-[-25vw] min-[380px]:top-[5rem] min-[380px]:h-[125vw] min-[380px]:w-[125vw] sm:right-[-12vw] sm:top-[3rem] sm:h-[92vw] sm:w-[92vw] sm:opacity-[0.2] md:right-[2vw] md:h-[74vw] md:w-[74vw]">
          <MobileGridSpellG
            id={`${uniqueId}-outline`}
            outline
          />
        </div>

        <div className="absolute right-[-38vw] top-[7rem] h-[150vw] max-h-[650px] w-[150vw] max-w-[650px] opacity-[0.42] min-[380px]:right-[-29vw] min-[380px]:top-[4.5rem] min-[380px]:h-[130vw] min-[380px]:w-[130vw] sm:right-[-16vw] sm:top-[2.5rem] sm:h-[96vw] sm:w-[96vw] sm:opacity-[0.36] md:right-[-1vw] md:h-[78vw] md:w-[78vw]">
          <MobileGridSpellG id={`${uniqueId}-main`} />
        </div>

        <div className="absolute right-[-5rem] top-[8rem] h-72 w-72 rounded-full bg-[#7c5cff]/12 blur-[90px] sm:right-[3rem] sm:top-[5rem] sm:h-96 sm:w-96" />

        <div className="absolute bottom-[10%] left-[-5rem] h-56 w-56 rounded-full bg-[#29d6ff]/7 blur-[80px] md:left-[8%] md:h-72 md:w-72" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.08),rgba(7,8,12,.32)_42%,rgba(7,8,12,.72)_100%)]" />
      </div>
    </>
  );
}