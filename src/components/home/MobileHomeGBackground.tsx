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
            display: block !important;
            z-index: 0 !important;
          }

          .home-experience,
          .home-static-only,
          .home-static-layout,
          .home-static-layout > section,
          .home-static-layout .home-static-scene,
          .home-proof-sections,
          .home-proof-sections > section,
          .home-faq-section,
          .small-phone-home-pricing-only,
          .small-phone-home-pricing {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
          }

          .home-experience,
          .home-static-only,
          .home-static-layout,
          .home-proof-sections,
          .home-faq-section,
          .small-phone-home-pricing-only,
          .small-phone-home-pricing {
            position: relative !important;
            z-index: 20 !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .home-static-layout > section,
          .home-proof-sections > section,
          .home-faq-section,
          .small-phone-home-pricing {
            position: relative !important;
            z-index: 21;
            isolation: isolate;
          }

          .home-static-layout > section > *,
          .home-proof-sections > section > *,
          .home-faq-section > *,
          .small-phone-home-pricing > * {
            position: relative;
            z-index: 22;
          }

          .home-static-layout > .page-grid,
          .home-proof-sections > .page-grid,
          .home-faq-section > .page-grid {
            opacity: 0.14 !important;
          }

          .home-static-layout .home-static-scene::before,
          .home-static-layout .home-static-scene::after,
          .home-static-layout > section::before,
          .home-static-layout > section::after,
          .home-proof-sections::before,
          .home-proof-sections::after,
          .home-proof-sections > section::before,
          .home-proof-sections > section::after,
          .home-faq-section::before,
          .home-faq-section::after,
          .small-phone-home-pricing::before,
          .small-phone-home-pricing::after {
            content: none !important;
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            opacity: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .home-mobile-g-main {
            opacity: 0.74 !important;
            transform: translateX(4vw) translateY(0.75rem) scale(1.08) !important;
          }

          .home-mobile-g-outline {
            opacity: 0.42 !important;
            transform: translateX(3vw) translateY(0.65rem) scale(1.08) !important;
          }

          .home-presentation-only {
            display: none !important;
          }

          .home-static-only {
            display: block !important;
          }

          .home-experience,
          .home-static-only,
          .home-static-layout,
          .home-static-layout > section,
          .home-static-layout > section > div,
          .home-static-layout .home-static-scene,
          .home-static-layout .home-static-scene > div,
          .home-proof-sections,
          .home-proof-sections > section,
          .home-proof-sections > section > div,
          .home-faq-section,
          .home-faq-section > div,
          .small-phone-home-pricing-only,
          .small-phone-home-pricing {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            filter: none !important;
          }

          .home-static-layout {
            display: block !important;
            position: relative !important;
            z-index: 20 !important;
            padding-top: 0 !important;
          }

          .home-static-layout > section:first-of-type {
            display: block !important;
            min-height: auto !important;
          }

          .home-static-layout > section:first-of-type > div {
            display: flex !important;
            min-height: auto !important;
            justify-content: flex-start !important;
            padding-top: 6.35rem !important;
            padding-bottom: 3.25rem !important;
          }

          .home-static-layout .home-hero-mode-host {
            display: block !important;
            position: relative !important;
            z-index: 30 !important;
            width: 100% !important;
            max-width: none !important;
            margin-top: 1.2rem !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .home-static-layout .home-hero-mode-card {
            display: block !important;
            border-radius: 1.15rem !important;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34) !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .home-static-layout .home-hero-mode-card > div:last-child {
            padding: 0.85rem !important;
          }

          .home-static-layout .home-hero-mode-card .page-grid {
            opacity: 0.14 !important;
          }

          .home-static-layout .home-hero-mode-tabs {
            margin-top: 2rem !important;
          }

          .home-static-layout .home-static-scene {
            padding-block: 3.5rem !important;
          }

          .home-static-layout .home-static-scene::before,
          .home-static-layout .home-static-scene::after,
          .home-static-layout > section::before,
          .home-static-layout > section::after,
          .home-proof-sections::before,
          .home-proof-sections::after,
          .home-proof-sections > section::before,
          .home-proof-sections > section::after,
          .home-faq-section::before,
          .home-faq-section::after,
          .small-phone-home-pricing::before,
          .small-phone-home-pricing::after {
            content: none !important;
            background: transparent !important;
            background-image: none !important;
            opacity: 0 !important;
          }

          .small-phone-home-pricing {
            border-top-color: rgba(255, 255, 255, 0.055) !important;
          }
        }

        @media (max-width: 379px) {
          .home-mobile-g-background {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            z-index: 0 !important;
            opacity: 1 !important;
            background: #07080c !important;
            background-color: #07080c !important;
          }

          .home-mobile-g-main {
            opacity: 0.82 !important;
            transform: translateX(4vw) translateY(0.75rem) scale(1.1) !important;
          }

          .home-mobile-g-outline {
            opacity: 0.48 !important;
            transform: translateX(3vw) translateY(0.65rem) scale(1.1) !important;
          }

          .home-experience,
          .home-static-only,
          .home-static-layout,
          .home-static-layout > section,
          .home-static-layout > section > div,
          .home-static-layout .home-static-scene,
          .home-static-layout .home-static-scene > div,
          .home-proof-sections,
          .home-proof-sections > section,
          .home-proof-sections > section > div,
          .home-faq-section,
          .home-faq-section > div,
          .small-phone-home-pricing-only,
          .small-phone-home-pricing {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
          }

          .home-static-layout div[class*="bg-"],
          .home-static-layout section[class*="bg-"],
          .home-static-layout article[class*="bg-"],
          .home-static-layout aside[class*="bg-"],
          .home-static-layout figure[class*="bg-"],
          .home-static-layout details[class*="bg-"],
          .home-static-layout button[class*="bg-"],
          .home-static-layout a[class*="bg-"],
          .home-static-layout .glass-panel,
          .home-static-layout .home-hero-mode-card,
          .home-static-layout .home-hero-mode-card > div,
          .home-static-layout .home-hero-mode-card > div > div,
          .home-static-layout .home-hero-mode-card article,
          .home-static-layout .home-hero-mode-card button,
          .home-static-layout .home-hero-mode-card a {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          .home-static-layout span[class*="bg-"]:not(.bg-clip-text),
          .home-static-layout .home-hero-mode-card span[class*="bg-"]:not(.bg-clip-text) {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          .home-static-layout .bg-clip-text,
          .home-static-layout .bg-gradient-to-r.bg-clip-text,
          .home-static-layout span.bg-clip-text {
            background-image: linear-gradient(90deg, #a99aff, #7eb3ff, #8be9ff) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            color: transparent !important;
            -webkit-text-fill-color: transparent !important;
          }

          .home-static-layout .home-hero-mode-card {
            border-color: rgba(255, 255, 255, 0.13) !important;
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
