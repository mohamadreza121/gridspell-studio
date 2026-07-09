"use client";

import { useEffect, useRef } from "react";

const ROUTE_PATH =
  "M 6 90 C 7 80 12 78 17 75 C 24 71 24 68 31 66 C 39 64 46 61 55 59 C 64 57 70 54 76 50 C 84 44 87 35 88 24 C 88.5 16 88 10 89 6";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function SelectedBuildsRouteEffect() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-proof-sections");
    const selectedSection = document.querySelector<HTMLElement>(
      ".home-proof-selected-section"
    );
    const path = pathRef.current;

    if (!root || !selectedSection || !path) return;

    let frameId = 0;

    const updateRoute = () => {
      frameId = 0;

      const rootRect = root.getBoundingClientRect();
      const selectedRect = selectedSection.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const routeStart = scrollY + selectedRect.top - viewportHeight * 0.26;
      const routeEnd = scrollY + rootRect.bottom - viewportHeight * 0.82;
      const progress = clamp((scrollY - routeStart) / Math.max(1, routeEnd - routeStart));
      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(pathLength * progress);

      root.style.setProperty("--selected-builds-route-progress", progress.toFixed(4));
      root.style.setProperty("--selected-builds-route-dot-x", `${point.x}%`);
      root.style.setProperty("--selected-builds-route-dot-y", `${point.y}%`);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateRoute);
    };

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        root.dataset.selectedBuildsReveal = "true";
        revealObserver.disconnect();
      },
      {
        threshold: 0.42,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    revealObserver.observe(selectedSection);
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      revealObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div className="selected-builds-route-effect" aria-hidden="true">
      <svg
        className="selected-builds-route-effect__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path className="selected-builds-route-effect__ghost" d={ROUTE_PATH} pathLength={1} />
        <path
          ref={pathRef}
          className="selected-builds-route-effect__line"
          d={ROUTE_PATH}
          pathLength={1}
        />
      </svg>
      <span className="selected-builds-route-effect__start" />
      <span className="selected-builds-route-effect__dot" />
      <style jsx global>{`
        .selected-builds-route-effect {
          display: none;
        }

        @media (min-width: 768px) {
          .home-proof-sections {
            --selected-builds-route-progress: 0;
            --selected-builds-route-dot-x: 6%;
            --selected-builds-route-dot-y: 90%;
          }

          .home-proof-sections > section {
            position: relative;
            z-index: 2;
          }

          .home-proof-selected-section > div {
            opacity: 0;
            transform: translate3d(0, 34px, 0);
            transition:
              opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }

          .home-proof-sections[data-selected-builds-reveal="true"]
            .home-proof-selected-section
            > div {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }

          .selected-builds-route-effect {
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 1;
            display: block;
            overflow: hidden;
            opacity: 0.95;
            contain: layout paint style;
          }

          .selected-builds-route-effect__svg {
            position: absolute;
            inset: 1.5% 0 3% 0;
            width: 100%;
            height: 100%;
            overflow: visible;
          }

          .selected-builds-route-effect__ghost,
          .selected-builds-route-effect__line {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            vector-effect: non-scaling-stroke;
          }

          .selected-builds-route-effect__ghost {
            stroke: rgba(255, 43, 118, 0.08);
            stroke-width: 18;
          }

          .selected-builds-route-effect__line {
            stroke: rgba(255, 43, 118, 0.68);
            stroke-width: 14;
            stroke-dasharray: var(--selected-builds-route-progress) 1;
            filter: drop-shadow(0 0 18px rgba(255, 43, 118, 0.22));
          }

          .selected-builds-route-effect__start,
          .selected-builds-route-effect__dot {
            position: absolute;
            display: block;
            border-radius: 999px;
            background: rgba(255, 43, 118, 0.72);
            box-shadow:
              0 0 0 1px rgba(255, 43, 118, 0.22),
              0 0 34px rgba(255, 43, 118, 0.35);
          }

          .selected-builds-route-effect__start {
            left: 5.2%;
            top: 88.5%;
            width: clamp(2.3rem, 5vw, 4.8rem);
            height: clamp(2.3rem, 5vw, 4.8rem);
            opacity: calc(0.22 + (var(--selected-builds-route-progress) * 0.52));
          }

          .selected-builds-route-effect__dot {
            left: var(--selected-builds-route-dot-x);
            top: var(--selected-builds-route-dot-y);
            width: clamp(2rem, 4.2vw, 4.1rem);
            height: clamp(2rem, 4.2vw, 4.1rem);
            opacity: calc(0.35 + (var(--selected-builds-route-progress) * 0.65));
            transform: translate(-50%, -50%);
          }

          .selected-builds-route-effect__dot::after {
            content: "";
            position: absolute;
            left: 48%;
            top: 48%;
            width: 24%;
            height: 24%;
            border-radius: 0.18rem;
            background: rgba(255, 96, 154, 0.82);
            transform: translate(-50%, -50%);
          }
        }

        @media (max-width: 767px) {
          .home-proof-selected-section > div {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-proof-selected-section > div {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .selected-builds-route-effect {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
