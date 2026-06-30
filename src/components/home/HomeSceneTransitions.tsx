"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const scenes = [
  { id: "intro", label: "Introduction" },
  { id: "work", label: "Selected work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "process", label: "Process" },
  { id: "portal", label: "Client experience" },
  { id: "pricing", label: "Investment" },
  { id: "proof", label: "Why GridSpell" },
  { id: "start", label: "Start a project" }
] as const;

type PeelEffect = "peelX" | "peelY";
type PeelDirection = "forward" | "reverse";

type ViewTransitionLike = {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>
  ) => ViewTransitionLike;
};

const DESKTOP_TRANSITION_MS = 1650;
const WHEEL_THRESHOLD = 72;
const EDGE_TOLERANCE = 12;
const SETTLE_DELAY_MS = 820;

function getSceneElements() {
  return scenes
    .map((scene) => document.getElementById(scene.id))
    .filter((element): element is HTMLElement => Boolean(element));
}

function sceneIndexAtTop(elements: HTMLElement[]) {
  const probe = window.scrollY + 24;
  let index = 0;

  elements.forEach((element, candidateIndex) => {
    if (element.offsetTop <= probe) index = candidateIndex;
  });

  return index;
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 18;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

function isSceneBoundary(
  element: HTMLElement,
  direction: 1 | -1
) {
  const rect = element.getBoundingClientRect();

  if (direction > 0) {
    return rect.bottom <= window.innerHeight + EDGE_TOLERANCE;
  }

  return rect.top >= -EDGE_TOLERANCE;
}

function nextAnimationFrame() {
  return new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
}

async function settleNewScene() {
  await nextAnimationFrame();
  await nextAnimationFrame();
  await new Promise<void>((resolve) => window.setTimeout(resolve, 90));
}

async function runFallbackPeel(options: {
  targetTop: number;
  effect: PeelEffect;
  direction: PeelDirection;
}) {
  const { targetTop, effect, direction } = options;
  const overlay = document.createElement("div");
  const edge = document.createElement("div");
  const forward = direction === "forward";
  const isX = effect === "peelX";

  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:9998",
    "pointer-events:none",
    "overflow:hidden",
    "background:radial-gradient(circle at 78% 18%,rgba(41,214,255,.2),transparent 32%),radial-gradient(circle at 20% 82%,rgba(124,92,255,.3),transparent 36%),#080a10",
    "box-shadow:0 0 140px rgba(0,0,0,.82)",
    "transform-style:preserve-3d",
    "backface-visibility:hidden"
  ].join(";");

  edge.style.cssText = [
    "position:absolute",
    isX ? "top:0;bottom:0;width:1px" : "left:0;right:0;height:1px",
    "background:#8be9ff",
    "box-shadow:0 0 34px 10px rgba(139,233,255,.36)"
  ].join(";");

  overlay.appendChild(edge);
  document.body.appendChild(overlay);

  const clipFrames = isX
    ? forward
      ? ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"]
      : ["inset(0 0 0 100%)", "inset(0 0 0 0)", "inset(0 100% 0 0)"]
    : forward
      ? ["inset(100% 0 0 0)", "inset(0 0 0 0)", "inset(0 0 100% 0)"]
      : ["inset(0 0 100% 0)", "inset(0 0 0 0)", "inset(100% 0 0 0)"];

  const overlayAnimation = overlay.animate(
    [
      {
        clipPath: clipFrames[0],
        transform: isX
          ? `perspective(1400px) rotateY(${forward ? -8 : 8}deg) scale(1.03)`
          : `perspective(1400px) rotateX(${forward ? 8 : -8}deg) scale(1.03)`,
        filter: "brightness(.78)"
      },
      {
        clipPath: clipFrames[1],
        transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)",
        filter: "brightness(1)"
      },
      {
        clipPath: clipFrames[2],
        transform: isX
          ? `perspective(1400px) rotateY(${forward ? 8 : -8}deg) scale(1.03)`
          : `perspective(1400px) rotateX(${forward ? -8 : 8}deg) scale(1.03)`,
        filter: "brightness(.82)"
      }
    ],
    {
      duration: DESKTOP_TRANSITION_MS,
      easing: "cubic-bezier(.76,0,.24,1)",
      fill: "forwards"
    }
  );

  edge.animate(
    isX
      ? [
          { transform: `translateX(${forward ? "-4vw" : "104vw"})` },
          { transform: `translateX(${forward ? "104vw" : "-4vw"})` }
        ]
      : [
          { transform: `translateY(${forward ? "-4vh" : "104vh"})` },
          { transform: `translateY(${forward ? "104vh" : "-4vh"})` }
        ],
    {
      duration: DESKTOP_TRANSITION_MS,
      easing: "cubic-bezier(.76,0,.24,1)",
      fill: "forwards"
    }
  );

  window.setTimeout(() => {
    window.scrollTo({ top: targetTop, behavior: "instant" });
  }, Math.round(DESKTOP_TRANSITION_MS * 0.47));

  await overlayAnimation.finished.catch(() => undefined);
  overlay.remove();
}

export function HomeSceneTransitions() {
  const reduceMotion = useReducedMotion();
  const activeIndexRef = useRef(0);
  const transitionLockRef = useRef(false);
  const wheelAmountRef = useRef(0);
  const wheelDirectionRef = useRef<1 | -1>(1);
  const wheelResetRef = useRef<number | null>(null);
  const cooldownUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );

    const updateEnabled = () => {
      setEnabled(desktopQuery.matches && !reduceMotion);
    };

    updateEnabled();
    desktopQuery.addEventListener("change", updateEnabled);

    return () => desktopQuery.removeEventListener("change", updateEnabled);
  }, [reduceMotion]);

  useEffect(() => {
    const elements = getSceneElements();
    if (elements.length !== scenes.length) return;

    elements.forEach((element, index) => {
      element.classList.add("home-cinematic-scene");
      element.dataset.homeScene = String(index + 1).padStart(2, "0");
    });

    const initialIndex = sceneIndexAtTop(elements);
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);

    const syncActiveScene = () => {
      if (transitionLockRef.current) return;
      const nextIndex = sceneIndexAtTop(elements);
      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    window.addEventListener("scroll", syncActiveScene, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncActiveScene);
      elements.forEach((element) => {
        element.classList.remove("home-cinematic-scene");
        delete element.dataset.homeScene;
      });
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const elements = getSceneElements();
    if (elements.length !== scenes.length) return;

    const html = document.documentElement;
    const transitionDocument = document as ViewTransitionDocument;

    const resetWheelAmount = () => {
      wheelAmountRef.current = 0;
      if (wheelResetRef.current !== null) {
        window.clearTimeout(wheelResetRef.current);
        wheelResetRef.current = null;
      }
    };

    const beginTransition = async (targetIndex: number) => {
      if (
        transitionLockRef.current ||
        targetIndex < 0 ||
        targetIndex >= elements.length
      ) {
        return;
      }

      const fromIndex = activeIndexRef.current;
      if (targetIndex === fromIndex) return;

      const direction: 1 | -1 = targetIndex > fromIndex ? 1 : -1;
      const peelDirection: PeelDirection = direction > 0 ? "forward" : "reverse";
      const boundaryIndex = Math.max(fromIndex, targetIndex);
      const effect: PeelEffect = boundaryIndex % 2 === 1 ? "peelX" : "peelY";
      const targetTop = elements[targetIndex].offsetTop;
      const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);

      transitionLockRef.current = true;
      resetWheelAmount();
      html.dataset.homePeel = `${effect}-${peelDirection}`;
      html.style.setProperty("--home-scrollbar-compensation", `${scrollbarWidth}px`);
      html.classList.add("home-scene-transitioning");

      const updateScene = async () => {
        window.scrollTo({ top: targetTop, behavior: "instant" });
        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
        await settleNewScene();
      };

      try {
        if (transitionDocument.startViewTransition) {
          const viewTransition = transitionDocument.startViewTransition(updateScene);
          await viewTransition.finished;
        } else {
          await runFallbackPeel({
            targetTop,
            effect,
            direction: peelDirection
          });
          activeIndexRef.current = targetIndex;
          setActiveIndex(targetIndex);
        }
      } finally {
        window.scrollTo({ top: elements[targetIndex].offsetTop, behavior: "instant" });
        delete html.dataset.homePeel;
        html.classList.remove("home-scene-transitioning");
        html.style.removeProperty("--home-scrollbar-compensation");
        transitionLockRef.current = false;
        cooldownUntilRef.current = performance.now() + SETTLE_DELAY_MS;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const delta = normalizeWheelDelta(event);
      if (delta === 0) return;

      if (transitionLockRef.current) {
        event.preventDefault();
        return;
      }

      if (performance.now() < cooldownUntilRef.current) {
        event.preventDefault();
        return;
      }

      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const currentScene = elements[currentIndex];
      const targetIndex = currentIndex + direction;

      if (!currentScene || targetIndex < 0 || targetIndex >= elements.length) {
        resetWheelAmount();
        return;
      }

      if (!isSceneBoundary(currentScene, direction)) {
        resetWheelAmount();
        return;
      }

      event.preventDefault();

      if (wheelDirectionRef.current !== direction) {
        wheelAmountRef.current = 0;
        wheelDirectionRef.current = direction;
      }

      wheelAmountRef.current += Math.abs(delta);

      if (wheelResetRef.current !== null) window.clearTimeout(wheelResetRef.current);
      wheelResetRef.current = window.setTimeout(resetWheelAmount, 220);

      if (wheelAmountRef.current < WHEEL_THRESHOLD) return;
      void beginTransition(targetIndex);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, button, [contenteditable='true'], [role='dialog']"
        )
      ) {
        return;
      }

      const down =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey);
      const up =
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey);

      if (!down && !up) return;

      const direction: 1 | -1 = down ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const currentScene = elements[currentIndex];
      const targetIndex = currentIndex + direction;

      if (
        !currentScene ||
        targetIndex < 0 ||
        targetIndex >= elements.length ||
        !isSceneBoundary(currentScene, direction)
      ) {
        return;
      }

      event.preventDefault();
      void beginTransition(targetIndex);
    };

    const handleSceneLink = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      const targetIndex = scenes.findIndex((scene) => scene.id === id);
      if (targetIndex < 0 || targetIndex === activeIndexRef.current) return;

      event.preventDefault();
      void beginTransition(targetIndex);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleSceneLink);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleSceneLink);
      resetWheelAmount();
      delete html.dataset.homePeel;
      html.classList.remove("home-scene-transitioning");
      html.style.removeProperty("--home-scrollbar-compensation");
    };
  }, [enabled]);

  return (
    <>
      <style jsx global>{`
        .home-cinematic-scene {
          position: relative;
          min-height: 100svh;
          scroll-margin-top: 0;
          view-transition-name: none;
        }

        html.home-scene-transitioning {
          scroll-behavior: auto !important;
          overscroll-behavior: none;
        }

        html.home-scene-transitioning body {
          overflow: hidden !important;
          padding-right: var(--home-scrollbar-compensation, 0px);
        }

        ::view-transition-group(root) {
          animation-duration: ${DESKTOP_TRANSITION_MS}ms;
          animation-timing-function: cubic-bezier(.76, 0, .24, 1);
        }

        ::view-transition-image-pair(root) {
          isolation: isolate;
          perspective: 1600px;
          background: #07080c;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          width: 100%;
          height: 100%;
          mix-blend-mode: normal;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        ::view-transition-new(root) {
          z-index: 1;
          animation: gridspell-scene-arrive ${DESKTOP_TRANSITION_MS}ms cubic-bezier(.22, 1, .36, 1) both;
        }

        ::view-transition-old(root) {
          z-index: 2;
          filter: drop-shadow(0 0 34px rgba(139, 233, 255, .24));
        }

        html[data-home-peel="peelX-forward"]::view-transition-old(root) {
          transform-origin: left center;
          animation: gridspell-peel-x-forward ${DESKTOP_TRANSITION_MS}ms cubic-bezier(.76, 0, .24, 1) both;
        }

        html[data-home-peel="peelX-reverse"]::view-transition-old(root) {
          transform-origin: right center;
          animation: gridspell-peel-x-reverse ${DESKTOP_TRANSITION_MS}ms cubic-bezier(.76, 0, .24, 1) both;
        }

        html[data-home-peel="peelY-forward"]::view-transition-old(root) {
          transform-origin: center top;
          animation: gridspell-peel-y-forward ${DESKTOP_TRANSITION_MS}ms cubic-bezier(.76, 0, .24, 1) both;
        }

        html[data-home-peel="peelY-reverse"]::view-transition-old(root) {
          transform-origin: center bottom;
          animation: gridspell-peel-y-reverse ${DESKTOP_TRANSITION_MS}ms cubic-bezier(.76, 0, .24, 1) both;
        }

        @keyframes gridspell-scene-arrive {
          0% {
            transform: scale(1.045) translateZ(-55px);
            filter: brightness(.52) saturate(.72) blur(7px);
          }
          30% {
            filter: brightness(.62) saturate(.8) blur(4px);
          }
          100% {
            transform: scale(1) translateZ(0);
            filter: brightness(1) saturate(1) blur(0);
          }
        }

        @keyframes gridspell-peel-x-forward {
          0%, 13% {
            clip-path: inset(0 0 0 0);
            transform: perspective(1600px) rotateY(0deg) translateX(0) scale(1);
            filter: brightness(1);
          }
          55% {
            filter: brightness(.9);
          }
          100% {
            clip-path: inset(0 100% 0 0);
            transform: perspective(1600px) rotateY(-12deg) translateX(-5%) scale(.985);
            filter: brightness(.7);
          }
        }

        @keyframes gridspell-peel-x-reverse {
          0%, 13% {
            clip-path: inset(0 0 0 0);
            transform: perspective(1600px) rotateY(0deg) translateX(0) scale(1);
            filter: brightness(1);
          }
          55% {
            filter: brightness(.9);
          }
          100% {
            clip-path: inset(0 0 0 100%);
            transform: perspective(1600px) rotateY(12deg) translateX(5%) scale(.985);
            filter: brightness(.7);
          }
        }

        @keyframes gridspell-peel-y-forward {
          0%, 13% {
            clip-path: inset(0 0 0 0);
            transform: perspective(1600px) rotateX(0deg) translateY(0) scale(1);
            filter: brightness(1);
          }
          55% {
            filter: brightness(.9);
          }
          100% {
            clip-path: inset(0 0 100% 0);
            transform: perspective(1600px) rotateX(11deg) translateY(-5%) scale(.985);
            filter: brightness(.7);
          }
        }

        @keyframes gridspell-peel-y-reverse {
          0%, 13% {
            clip-path: inset(0 0 0 0);
            transform: perspective(1600px) rotateX(0deg) translateY(0) scale(1);
            filter: brightness(1);
          }
          55% {
            filter: brightness(.9);
          }
          100% {
            clip-path: inset(100% 0 0 0);
            transform: perspective(1600px) rotateX(-11deg) translateY(5%) scale(.985);
            filter: brightness(.7);
          }
        }

        @media (max-width: 1023px), (hover: none), (pointer: coarse) {
          .home-cinematic-scene {
            min-height: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          ::view-transition-group(root),
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: 1ms !important;
          }
        }
      `}</style>

      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/[0.09] bg-[#090b11]/82 px-4 py-2 text-[0.54rem] uppercase tracking-[0.2em] text-white/28 shadow-2xl backdrop-blur-xl lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[#8be9ff]">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/18" />
        <span>{scenes[activeIndex]?.label}</span>
        <span className="ml-2 h-px w-12 overflow-hidden bg-white/10">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
            animate={{ scaleX: (activeIndex + 1) / scenes.length }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </div>
    </>
  );
}
