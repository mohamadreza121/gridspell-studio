"use client";

import { useEffect, useRef } from "react";

const ROUTE_PATH =
  "M 82 12 C 76 26 68 38 56 47 C 43 57 29 67 17 88";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function SelectedBuildsRouteEffect() {
  const effectRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const effect = effectRef.current;
    const path = pathRef.current;
    const root = document.querySelector<HTMLElement>(".home-proof-sections");
    const selectedSection = document.querySelector<HTMLElement>(
      ".home-proof-selected-section"
    );

    if (!effect || !path || !root || !selectedSection) return;

    let frameId = 0;

    const updateRoute = () => {
      frameId = 0;

      const rootRect = root.getBoundingClientRect();
      const selectedRect = selectedSection.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const routeStart = scrollY + selectedRect.top - viewportHeight * 0.42;
      const routeEnd = scrollY + rootRect.bottom - viewportHeight * 0.74;
      const progress = clamp((scrollY - routeStart) / Math.max(1, routeEnd - routeStart));
      const isActive = selectedRect.top <= viewportHeight * 0.42 && rootRect.bottom >= viewportHeight * 0.26;
      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(pathLength * progress);

      effect.style.setProperty("--selected-builds-orb-progress", progress.toFixed(4));
      effect.style.setProperty("--selected-builds-orb-x", `${point.x}%`);
      effect.style.setProperty("--selected-builds-orb-y", `${point.y}%`);
      effect.dataset.routeActive = String(isActive);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateRoute);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div ref={effectRef} className="selected-builds-route-effect" aria-hidden="true">
      <svg
        className="selected-builds-route-effect__measurement"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={ROUTE_PATH} pathLength={1} />
      </svg>
      <span className="selected-builds-route-effect__orb" />
      <style jsx global>{`
        .selected-builds-route-effect {
          display: none;
        }

        @media (min-width: 768px) {
          .home-proof-sections {
            --selected-builds-orb-progress: 0;
            --selected-builds-orb-x: 82%;
            --selected-builds-orb-y: 12%;
          }

          .home-proof-sections > section {
            position: relative;
            z-index: 2;
          }

          .selected-builds-route-effect {
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 1;
            display: block;
            overflow: hidden;
            opacity: 0;
            transition: opacity 420ms ease;
            contain: layout paint style;
          }

          .selected-builds-route-effect[data-route-active="true"] {
            opacity: 1;
          }

          .selected-builds-route-effect__measurement {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            overflow: visible;
          }

          .selected-builds-route-effect__orb {
            --selected-builds-orb-glow: calc(0.48 + (var(--selected-builds-orb-progress) * 0.52));
            position: absolute;
            left: var(--selected-builds-orb-x);
            top: var(--selected-builds-orb-y);
            display: block;
            width: clamp(3.35rem, 6.4vw, 7.4rem);
            height: clamp(3.35rem, 6.4vw, 7.4rem);
            border-radius: 999px;
            background:
              radial-gradient(circle at 38% 32%, rgba(139, 233, 255, 0.95) 0 9%, rgba(106, 186, 255, 0.8) 23%, rgba(124, 92, 255, 0.68) 48%, rgba(124, 92, 255, 0.16) 72%, transparent 100%);
            box-shadow:
              0 0 calc(24px + (var(--selected-builds-orb-progress) * 26px)) rgba(41, 214, 255, 0.34),
              0 0 calc(58px + (var(--selected-builds-orb-progress) * 48px)) rgba(124, 92, 255, 0.3),
              0 0 calc(100px + (var(--selected-builds-orb-progress) * 74px)) rgba(41, 214, 255, 0.14);
            opacity: calc(0.44 + (var(--selected-builds-orb-progress) * 0.36));
            transform: translate(-50%, -50%) scale(calc(0.86 + (var(--selected-builds-orb-progress) * 0.14)));
            transition:
              left 90ms linear,
              top 90ms linear,
              opacity 240ms ease,
              transform 240ms ease;
            will-change: left, top, opacity, transform;
          }

          .selected-builds-route-effect__orb::before {
            content: "";
            position: absolute;
            inset: 14%;
            border-radius: inherit;
            background: radial-gradient(circle at 36% 28%, rgba(255, 255, 255, 0.76), rgba(139, 233, 255, 0.38) 32%, transparent 68%);
            opacity: calc(0.5 + (var(--selected-builds-orb-progress) * 0.3));
          }

          .selected-builds-route-effect__orb::after {
            content: "";
            position: absolute;
            inset: -34%;
            border-radius: inherit;
            background: radial-gradient(circle, rgba(139, 233, 255, 0.2), rgba(124, 92, 255, 0.14) 42%, transparent 72%);
            opacity: calc(0.18 + (var(--selected-builds-orb-progress) * 0.46));
            transform: scale(calc(0.82 + (var(--selected-builds-orb-progress) * 0.3)));
          }
        }

        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
          .selected-builds-route-effect {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
