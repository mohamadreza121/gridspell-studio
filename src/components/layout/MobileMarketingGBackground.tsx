"use client";

import { useId } from "react";

export function MobileMarketingGBackground() {
  const uniqueId = useId().replace(/:/g, "");
  const gradientId = `${uniqueId}-mobile-marketing-g-gradient`;
  const glowId = `${uniqueId}-mobile-marketing-g-glow`;

  return (
    <div className="mobile-marketing-g-background" aria-hidden="true">
      <div className="mobile-marketing-g-grid" />
      <svg
        viewBox="0 0 1000 1000"
        className="mobile-marketing-g-mark"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="180" y1="170" x2="835" y2="810" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9D87FF" />
            <stop offset="42%" stopColor="#7C5CFF" />
            <stop offset="75%" stopColor="#67AEFF" />
            <stop offset="100%" stopColor="#29D6FF" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="7" result="blur" />
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
        <g opacity="0.95" filter={`url(#${glowId})`}>
          <path
            d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
            stroke={`url(#${gradientId})`}
            strokeWidth="124"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M580 560 H792"
            stroke={`url(#${gradientId})`}
            strokeWidth="124"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <div className="mobile-marketing-g-glow mobile-marketing-g-glow-one" />
      <div className="mobile-marketing-g-glow mobile-marketing-g-glow-two" />
    </div>
  );
}
