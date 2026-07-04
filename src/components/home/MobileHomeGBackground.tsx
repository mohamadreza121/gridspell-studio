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
          x="-18%"
          y="-18%"
          width="136%"
          height="136%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation={outline ? 2 : 3.5} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
            result="softGlow"
          />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={outline ? 0.5 : 1} filter={`url(#${glowId})`}>
        <path
          d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 124}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M580 560 H792"
          stroke={`url(#${gradientId})`}
          strokeWidth={outline ? 48 : 124}
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
          .home-mobile-g-background {
            z-index: 0 !important;
          }

          .home-experience,
          .home-static-only,
          .home-static-layout,
          .home-proof-sections,
          .home-experience + div {
            position: relative !important;
            z-index: 20 !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .home-static-layout,
          .home-static-layout > section,
          .home-static-layout .home-static-scene,
          .home-proof-sections,
          .home-experience + div {
            background: transparent !important;
          }

          .home-static-layout {
            isolation: isolate;
          }

          .home-static-layout > section,
          .home-experience + div {
            position: relative !important;
            z-index: 21;
            isolation: isolate;
            overflow: hidden;
          }

          .home-static-layout > section > *,
          .home-proof-sections > *,
          .home-experience + div > * {
            position: relative;
            z-index: 22;
          }

          .home-static-layout .home-static-scene::before,
          .home-proof-sections::before,
          .home-experience + div::before {
            content: "";
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 0;
            background:
              radial-gradient(circle at 78% 18%, rgba(7, 8, 12, 0.18), transparent 22rem),
              linear-gradient(
                180deg,
                rgba(7, 8, 12, 0.1),
                rgba(7, 8, 12, 0.22) 42%,
                rgba(7, 8, 12, 0.34)
              );
          }

          .home-static-layout > section::after,
          .home-experience + div::after {
            content: "G";
            pointer-events: none;
            position: absolute;
            z-index: 1;
            right: -34vw;
            top: 2.5rem;
            width: 130vw;
            max-width: 42rem;
            font-family: var(--font-display), Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: min(130vw, 42rem);
            font-weight: 800;
            line-height: 0.78;
            letter-spacing: -0.14em;
            color: transparent;
            -webkit-text-stroke: 0.06em rgba(139, 233, 255, 0.14);
            background: linear-gradient(145deg, rgba(124, 92, 255, 0.58), rgba(41, 214, 255, 0.42));
            -webkit-background-clip: text;
            background-clip: text;
            opacity: 0.42;
            filter: blur(0.2px) drop-shadow(0 0 44px rgba(124, 92, 255, 0.18));
            transform: rotate(-3deg);
          }

          .home-static-layout > section:first-of-type::before {
            content: "";
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 0;
            background:
              linear-gradient(
                180deg,
                rgba(7, 8, 12, 0.02),
                rgba(7, 8, 12, 0.14) 54%,
                rgba(7, 8, 12, 0.32)
              );
          }
        }

        @media (max-width: 379px) {
          .home-mobile-g-main {
            opacity: 0.62 !important;
            transform: translateX(7vw) translateY(1rem) scale(1.06);
          }

          .home-mobile-g-outline {
            opacity: 0.34 !important;
            transform: translateX(6vw) translateY(1rem) scale(1.06);
          }

          .home-static-layout > section::after,
          .home-experience + div::after {
            right: -39vw;
            top: 4.4rem;
            width: 150vw;
            font-size: min(150vw, 38rem);
            opacity: 0.38;
          }

          .home-static-layout > section:first-of-type > div {
            min-height: auto !important;
            justify-content: flex-start !important;
            padding-top: 7.25rem !important;
            padding-bottom: 3.5rem !important;
          }

          .home-static-layout .home-static-scene::before,
          .home-proof-sections::before,
          .home-experience + div::before {
            background:
              radial-gradient(circle at 82% 14%, rgba(7, 8, 12, 0.16), transparent 18rem),
              linear-gradient(
                180deg,
                rgba(7, 8, 12, 0.06),
                rgba(7, 8, 12, 0.2) 42%,
                rgba(7, 8, 12, 0.32)
              );
          }
        }
      `}</style>

      <div
        className="home-mobile-g-background pointer-events-none fixed inset-0 z-0 hidden overflow-hidden bg-[#07080c] max-xl:block"
        aria-hidden="true"
      >
        <div className="page-grid absolute inset-0 opacity-[0.34]" />

        <div className="home-mobile-g-outline absolute right-[-42vw] top-[5.35rem] h-[158vw] max-h-[650px] w-[158vw] max-w-[650px] opacity-[0.46] min-[380px]:right-[-26vw] min-[380px]:top-[4rem] min-[380px]:h-[126vw] min-[380px]:w-[126vw] sm:right-[-13vw] sm:top-[2.75rem] sm:h-[94vw] sm:w-[94vw] sm:opacity-[0.28] md:right-[2vw] md:h-[74vw] md:w-[74vw]">
          <MobileGridSpellG id={`${uniqueId}-outline`} outline />
        </div>

        <div className="home-mobile-g-main absolute right-[-47vw] top-[4.95rem] h-[164vw] max-h-[680px] w-[164vw] max-w-[680px] opacity-[0.72] min-[380px]:right-[-31vw] min-[380px]:top-[3.65rem] min-[380px]:h-[132vw] min-[380px]:w-[132vw] sm:right-[-17vw] sm:top-[2.35rem] sm:h-[98vw] sm:w-[98vw] sm:opacity-[0.46] md:right-[-1vw] md:h-[78vw] md:w-[78vw]">
          <MobileGridSpellG id={`${uniqueId}-main`} />
        </div>

        <div className="absolute right-[-5rem] top-[7rem] h-72 w-72 rounded-full bg-[#7c5cff]/12 blur-[76px] sm:right-[3rem] sm:top-[5rem] sm:h-96 sm:w-96" />
        <div className="absolute bottom-[10%] left-[-5rem] h-56 w-56 rounded-full bg-[#29d6ff]/7 blur-[72px] md:left-[8%] md:h-72 md:w-72" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.01),rgba(7,8,12,.08)_38%,rgba(7,8,12,.26)_100%)]" />
      </div>
    </>
  );
}
