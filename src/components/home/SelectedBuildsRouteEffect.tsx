"use client";

import { useEffect, useRef } from "react";

const ROUTE_PATH =
  "M 84 10 C 82 24 76 34 66 41 C 55 49 43 52 32 60 C 21 68 14 78 10 91";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function SelectedBuildsRouteEffect() {
  const effectRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const effect = effectRef.current;
    const path = pathRef.current;
    const root = document.querySelector<HTMLElement>(".home-proof-route-shell");
    const proofRoot = document.querySelector<HTMLElement>(".home-proof-sections");
    const selectedSection = document.querySelector<HTMLElement>(
      ".home-proof-selected-section"
    );
    const faqSection = document.querySelector<HTMLElement>(".home-faq-section");

    if (!effect || !path || !root || !proofRoot || !selectedSection || !faqSection) return;

    let frameId = 0;

    const updateRoute = () => {
      frameId = 0;

      const shellRect = root.getBoundingClientRect();
      const selectedRect = selectedSection.getBoundingClientRect();
      const faqRect = faqSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const routeStart = window.scrollY + selectedRect.top - viewportHeight * 0.62;
      const routeEnd = window.scrollY + faqRect.bottom - viewportHeight * 0.86;
      const progress = clamp((window.scrollY - routeStart) / Math.max(1, routeEnd - routeStart));
      const isActive = selectedRect.top <= viewportHeight * 0.62 && faqRect.bottom >= viewportHeight * 0.22;
      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(pathLength * progress);

      root.style.setProperty("--selected-builds-route-progress", progress.toFixed(4));
      root.style.setProperty("--selected-builds-route-dot-x", `${point.x}%`);
      root.style.setProperty("--selected-builds-route-dot-y", `${point.y}%`);
      effect.style.setProperty("--selected-builds-route-top", `${-shellRect.top}px`);
      effect.style.setProperty("--selected-builds-route-height", `${viewportHeight}px`);
      effect.dataset.routeActive = String(isActive);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateRoute);
    };

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        proofRoot.dataset.selectedBuildsReveal = "true";
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
          .home-proof-route-shell {
            --selected-builds-route-progress: 0;
            --selected-builds-route-dot-x: 84%;
            --selected-builds-route-dot-y: 10%;
            position: relative;
            z-index: 3;
            isolation: isolate;
            overflow: hidden;
            background: #07080c;
          }

          .home-proof-route-shell .home-proof-sections,
          .home-proof-route-shell .home-faq-section {
            background: transparent !important;
          }

          .home-proof-route-shell .home-proof-sections,
          .home-proof-route-shell .home-faq-section,
          .home-proof-route-shell .home-proof-sections > *,
          .home-proof-route-shell .home-faq-section > * {
            position: relative;
            z-index: 2;
          }

          .home-proof-route-shell .selected-builds-route-effect {
            z-index: 1;
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
            --selected-builds-route-top: 0px;
            --selected-builds-route-height: 100svh;
            pointer-events: none;
            position: absolute;
            left: 0;
            right: 0;
            top: var(--selected-builds-route-top);
            display: block;
            height: var(--selected-builds-route-height);
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
            stroke: rgba(255, 43, 118, 0.1);
            stroke-width: 9;
          }

          .selected-builds-route-effect__line {
            stroke: rgba(255, 43, 118, 0.56);
            stroke-width: 9;
            stroke-dasharray: var(--selected-builds-route-progress) 1;
            filter: drop-shadow(0 0 14px rgba(255, 43, 118, 0.24));
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
          .home-proof-route-shell {
            display: contents !important;
          }
        }

        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
          .home-proof-selected-section > div {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) and (min-width: 768px) {
          .home-proof-route-shell .home-proof-sections,
          .home-proof-route-shell .home-faq-section {
            background: #07080c !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .selected-builds-route-effect {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
