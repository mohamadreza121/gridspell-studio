"use client";

import { useEffect, useRef } from "react";

const ROUTE_POINTS = [
  { x: 82, y: 12 },
  { x: 76, y: 26 },
  { x: 68, y: 38 },
  { x: 56, y: 47 },
  { x: 43, y: 57 },
  { x: 29, y: 67 },
  { x: 17, y: 88 }
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function getRoutePoint(progress: number) {
  const maxIndex = ROUTE_POINTS.length - 1;
  const scaled = clamp(progress) * maxIndex;
  const index = Math.min(maxIndex - 1, Math.floor(scaled));
  const localProgress = scaled - index;
  const current = ROUTE_POINTS[index];
  const next = ROUTE_POINTS[index + 1];

  return {
    x: current.x + (next.x - current.x) * localProgress,
    y: current.y + (next.y - current.y) * localProgress
  };
}

export function SelectedBuildsOrbRuntime() {
  const effectRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const effect = effectRef.current;
    const orb = orbRef.current;
    const root = document.querySelector<HTMLElement>(".home-proof-sections");
    const selectedSection = document.querySelector<HTMLElement>(
      ".home-proof-selected-section"
    );

    if (!effect || !orb || !root || !selectedSection) return;

    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    let frameId = 0;

    const updateRoute = () => {
      frameId = 0;

      if (!mediaQuery.matches) {
        effect.dataset.routeActive = "false";
        return;
      }

      const rootRect = root.getBoundingClientRect();
      const selectedRect = selectedSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const routeStart = window.scrollY + selectedRect.top - viewportHeight * 0.42;
      const routeEnd = window.scrollY + rootRect.bottom - viewportHeight * 0.74;
      const progress = clamp(
        (window.scrollY - routeStart) / Math.max(1, routeEnd - routeStart)
      );
      const isActive =
        selectedRect.top <= viewportHeight * 0.42 &&
        rootRect.bottom >= viewportHeight * 0.26;
      const point = getRoutePoint(progress);
      const x = (point.x / 100) * rootRect.width;
      const y = (point.y / 100) * rootRect.height;
      const opacity = 0.42 + progress * 0.34;
      const scale = 0.86 + progress * 0.14;

      orb.style.opacity = opacity.toFixed(3);
      orb.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)})`;
      effect.dataset.routeActive = String(isActive);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateRoute);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mediaQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mediaQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <div ref={effectRef} className="selected-builds-route-effect" aria-hidden="true">
      <span ref={orbRef} className="selected-builds-route-effect__orb" />
      <style jsx global>{`
        .selected-builds-route-effect {
          display: none;
        }

        @media (min-width: 1280px) {
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

          .selected-builds-route-effect__orb {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: clamp(3.25rem, 5.8vw, 6.9rem);
            height: clamp(3.25rem, 5.8vw, 6.9rem);
            border-radius: 999px;
            background:
              radial-gradient(circle at 38% 32%, rgba(139, 233, 255, 0.95) 0 9%, rgba(106, 186, 255, 0.8) 23%, rgba(124, 92, 255, 0.68) 48%, rgba(124, 92, 255, 0.16) 72%, transparent 100%);
            box-shadow:
              0 0 34px rgba(41, 214, 255, 0.34),
              0 0 82px rgba(124, 92, 255, 0.31),
              0 0 132px rgba(41, 214, 255, 0.15);
            opacity: 0.42;
            transform: translate3d(-120px, -120px, 0) scale(0.86);
            transition: opacity 220ms ease;
            will-change: transform, opacity;
          }

          .selected-builds-route-effect__orb::before {
            content: "";
            position: absolute;
            inset: 14%;
            border-radius: inherit;
            background: radial-gradient(circle at 36% 28%, rgba(255, 255, 255, 0.76), rgba(139, 233, 255, 0.38) 32%, transparent 68%);
            opacity: 0.72;
          }

          .selected-builds-route-effect__orb::after {
            content: "";
            position: absolute;
            inset: -30%;
            border-radius: inherit;
            background: radial-gradient(circle, rgba(139, 233, 255, 0.2), rgba(124, 92, 255, 0.14) 42%, transparent 72%);
            opacity: 0.5;
          }
        }

        @media (max-width: 1279px), (prefers-reduced-motion: reduce) {
          .selected-builds-route-effect {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
