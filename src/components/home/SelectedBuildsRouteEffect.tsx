"use client";

import { useEffect, useRef } from "react";

const ROUTE_PATH =
  "M 10 86 C 12 74 18 68 29 64 C 42 60 53 58 63 53 C 74 47 81 41 85 31 C 88 23 88 15 88 8";

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
    const faqSection = document.querySelector<HTMLElement>(".home-faq-section");

    if (!effect || !path || !root || !selectedSection || !faqSection) return;

    let frameId = 0;

    const updateRoute = () => {
      frameId = 0;

      const selectedRect = selectedSection.getBoundingClientRect();
      const faqRect = faqSection.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const routeStart = scrollY + selectedRect.top - viewportHeight * 0.18;
      const routeEnd = scrollY + faqRect.bottom - viewportHeight * 0.9;
      const progress = clamp((scrollY - routeStart) / Math.max(1, routeEnd - routeStart));
      const isActive = scrollY >= routeStart - viewportHeight * 0.2 && scrollY <= routeEnd + viewportHeight * 0.18;
      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(pathLength * progress);

      effect.style.setProperty("--selected-builds-route-progress", progress.toFixed(4));
      effect.style.setProperty("--selected-builds-route-dot-x", `${point.x}%`);
      effect.style.setProperty("--selected-builds-route-dot-y", `${point.y}%`);
      effect.dataset.routeActive = String(isActive);
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
    <div ref={effectRef} className="selected-builds-route-effect" aria-hidden="true">
      <svg
        className="selected-builds-route-effect__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path className="selected-builds-route-effect__track" d={ROUTE_PATH} pathLength={1} />
        <path
          ref={pathRef}
          className="selected-builds-route-effect__line"
          d={ROUTE_PATH}
          pathLength={1}
        />
      </svg>
      <span className="selected-builds-route-effect__dot" />
      <style jsx global>{`
        .selected-builds-route-effect {
          display: none;
        }

        @media (min-width: 768px) {
          .home-proof-sections {
            --selected-builds-route-progress: 0;
            --selected-builds-route-dot-x: 10%;
            --selected-builds-route-dot-y: 86%;
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
            --selected-builds-route-progress: 0;
            --selected-builds-route-dot-x: 10%;
            --selected-builds-route-dot-y: 86%;
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 4;
            display: block;
            overflow: hidden;
            opacity: 0;
            transition: opacity 420ms ease;
            contain: layout paint style;
          }

          .selected-builds-route-effect[data-route-active="true"] {
            opacity: 1;
          }

          .selected-builds-route-effect__svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
          }

          .selected-builds-route-effect__track,
          .selected-builds-route-effect__line {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            vector-effect: non-scaling-stroke;
          }

          .selected-builds-route-effect__track {
            stroke: rgba(255, 43, 118, 0.12);
            stroke-width: 10;
          }

          .selected-builds-route-effect__line {
            stroke: rgba(255, 43, 118, 0.64);
            stroke-width: 10;
            stroke-dasharray: var(--selected-builds-route-progress) 1;
            filter: drop-shadow(0 0 16px rgba(255, 43, 118, 0.28));
          }

          .selected-builds-route-effect__dot {
            position: absolute;
            left: var(--selected-builds-route-dot-x);
            top: var(--selected-builds-route-dot-y);
            display: block;
            width: clamp(1.45rem, 2.9vw, 3.3rem);
            height: clamp(1.45rem, 2.9vw, 3.3rem);
            border-radius: 999px;
            background: radial-gradient(circle at 38% 34%, #ff7aa9 0 18%, #ff2b76 42%, rgba(143, 0, 54, 0.92) 100%);
            box-shadow:
              0 0 0 1px rgba(255, 43, 118, 0.36),
              0 0 24px rgba(255, 43, 118, 0.5),
              0 0 58px rgba(255, 43, 118, 0.28);
            transform: translate(-50%, -50%);
            transition:
              left 80ms linear,
              top 80ms linear;
          }

          .selected-builds-route-effect__dot::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 34%;
            height: 34%;
            border-radius: 999px;
            background: rgba(255, 169, 202, 0.92);
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
