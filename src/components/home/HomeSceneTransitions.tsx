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
type Direction = 1 | -1;

const TRANSITION_MS = 1900;
const COOLDOWN_MS = 720;
const WHEEL_THRESHOLD = 78;

function getSceneElements() {
  return scenes
    .map((scene) => document.getElementById(scene.id))
    .filter((element): element is HTMLElement => Boolean(element));
}

function sceneIndexAtViewport(elements: HTMLElement[]) {
  const probe = window.scrollY + Math.min(window.innerHeight * 0.28, 220);
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

function canMoveToNextScene(
  element: HTMLElement,
  direction: Direction,
  delta: number
) {
  const rect = element.getBoundingClientRect();
  const allowance = Math.min(180, Math.max(22, Math.abs(delta) + 18));

  if (direction > 0) {
    return rect.bottom - window.innerHeight <= allowance;
  }

  return -rect.top <= allowance;
}

function removeDuplicateIds(root: HTMLElement) {
  root.removeAttribute("id");
  root.querySelectorAll<HTMLElement>("[id]").forEach((element) => {
    element.removeAttribute("id");
  });
}

function createSceneLayer(
  source: HTMLElement,
  viewportOffset: number,
  zIndex: number
) {
  const layer = document.createElement("div");
  const clone = source.cloneNode(true) as HTMLElement;

  removeDuplicateIds(clone);

  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = [
    "position:fixed",
    "inset:0",
    `z-index:${zIndex}`,
    "overflow:hidden",
    "pointer-events:none",
    "background:#07080c",
    "contain:strict",
    "backface-visibility:hidden",
    "transform-style:preserve-3d"
  ].join(";");

  clone.style.position = "absolute";
  clone.style.left = "0";
  clone.style.top = `${viewportOffset}px`;
  clone.style.width = "100%";
  clone.style.margin = "0";
  clone.style.transform = "translateZ(0)";

  clone.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
    video.muted = true;
    video.removeAttribute("autoplay");
  });

  layer.appendChild(clone);
  document.body.appendChild(layer);
  return layer;
}

function createPeelEdge(effect: PeelEffect, direction: Direction) {
  const edge = document.createElement("div");
  const isX = effect === "peelX";

  edge.setAttribute("aria-hidden", "true");
  edge.style.cssText = [
    "position:fixed",
    "z-index:10002",
    "pointer-events:none",
    isX ? "top:0;bottom:0;width:2px" : "left:0;right:0;height:2px",
    "background:#8be9ff",
    "box-shadow:0 0 18px 5px rgba(139,233,255,.54),0 0 70px 24px rgba(41,214,255,.18)"
  ].join(";");

  document.body.appendChild(edge);

  const frames = isX
    ? direction > 0
      ? [{ transform: "translateX(-5vw)" }, { transform: "translateX(105vw)" }]
      : [{ transform: "translateX(105vw)" }, { transform: "translateX(-5vw)" }]
    : direction > 0
      ? [{ transform: "translateY(-5vh)" }, { transform: "translateY(105vh)" }]
      : [{ transform: "translateY(105vh)" }, { transform: "translateY(-5vh)" }];

  const animation = edge.animate(frames, {
    duration: TRANSITION_MS,
    easing: "cubic-bezier(.74,0,.24,1)",
    fill: "forwards"
  });

  return { edge, animation };
}

function createTransitionLabel(
  effect: PeelEffect,
  fromLabel: string,
  toLabel: string
) {
  const label = document.createElement("div");
  label.setAttribute("aria-hidden", "true");
  label.style.cssText = [
    "position:fixed",
    "right:2rem",
    "bottom:2rem",
    "z-index:10003",
    "pointer-events:none",
    "display:flex",
    "align-items:center",
    "gap:.7rem",
    "border:1px solid rgba(139,233,255,.18)",
    "border-radius:999px",
    "background:rgba(7,8,12,.82)",
    "padding:.72rem 1rem",
    "box-shadow:0 18px 60px rgba(0,0,0,.34)",
    "backdrop-filter:blur(18px)",
    "font:600 .64rem/1 ui-monospace,SFMono-Regular,Menlo,monospace",
    "letter-spacing:.18em",
    "text-transform:uppercase",
    "color:rgba(255,255,255,.46)"
  ].join(";");

  label.innerHTML = `<span style="color:#8be9ff">${effect === "peelX" ? "Peel X" : "Peel Y"}</span><span style="width:1.5rem;height:1px;background:rgba(255,255,255,.16)"></span><span>${fromLabel} → ${toLabel}</span>`;
  document.body.appendChild(label);

  const animation = label.animate(
    [
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-8px)" }
    ],
    {
      duration: TRANSITION_MS,
      times: [0, 0.16, 0.72, 1],
      easing: "ease-out",
      fill: "forwards"
    }
  );

  return { label, animation };
}

async function runPeel(options: {
  outgoing: HTMLElement;
  incoming: HTMLElement;
  targetTop: number;
  effect: PeelEffect;
  direction: Direction;
  fromLabel: string;
  toLabel: string;
}) {
  const {
    outgoing,
    incoming,
    targetTop,
    effect,
    direction,
    fromLabel,
    toLabel
  } = options;

  const outgoingRect = outgoing.getBoundingClientRect();
  const incomingLayer = createSceneLayer(incoming, 0, 9998);
  const outgoingLayer = createSceneLayer(outgoing, outgoingRect.top, 9999);
  const { edge, animation: edgeAnimation } = createPeelEdge(effect, direction);
  const { label, animation: labelAnimation } = createTransitionLabel(
    effect,
    fromLabel,
    toLabel
  );

  const isX = effect === "peelX";
  const forward = direction > 0;

  incomingLayer.style.transformOrigin = "center center";
  outgoingLayer.style.transformOrigin = isX
    ? forward
      ? "right center"
      : "left center"
    : forward
      ? "center bottom"
      : "center top";

  const incomingAnimation = incomingLayer.animate(
    [
      {
        transform: "perspective(1600px) translateZ(-90px) scale(1.055)",
        filter: "brightness(.46) saturate(.72) blur(9px)"
      },
      {
        transform: "perspective(1600px) translateZ(-35px) scale(1.025)",
        filter: "brightness(.66) saturate(.84) blur(4px)"
      },
      {
        transform: "perspective(1600px) translateZ(0) scale(1)",
        filter: "brightness(1) saturate(1) blur(0)"
      }
    ],
    {
      duration: TRANSITION_MS,
      times: [0, 0.52, 1],
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "forwards"
    }
  );

  const outgoingFrames: Keyframe[] = isX
    ? forward
      ? [
          {
            clipPath: "inset(0 0 0 0)",
            transform: "perspective(1600px) rotateY(0deg) translateX(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            clipPath: "inset(0 0 0 40%)",
            transform: "perspective(1600px) rotateY(5deg) translateX(1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            clipPath: "inset(0 0 0 100%)",
            transform: "perspective(1600px) rotateY(14deg) translateX(7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ]
      : [
          {
            clipPath: "inset(0 0 0 0)",
            transform: "perspective(1600px) rotateY(0deg) translateX(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            clipPath: "inset(0 40% 0 0)",
            transform: "perspective(1600px) rotateY(-5deg) translateX(-1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            clipPath: "inset(0 100% 0 0)",
            transform: "perspective(1600px) rotateY(-14deg) translateX(-7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ]
    : forward
      ? [
          {
            clipPath: "inset(0 0 0 0)",
            transform: "perspective(1600px) rotateX(0deg) translateY(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            clipPath: "inset(40% 0 0 0)",
            transform: "perspective(1600px) rotateX(-4deg) translateY(1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            clipPath: "inset(100% 0 0 0)",
            transform: "perspective(1600px) rotateX(-12deg) translateY(7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ]
      : [
          {
            clipPath: "inset(0 0 0 0)",
            transform: "perspective(1600px) rotateX(0deg) translateY(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            clipPath: "inset(0 0 40% 0)",
            transform: "perspective(1600px) rotateX(4deg) translateY(-1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            clipPath: "inset(0 0 100% 0)",
            transform: "perspective(1600px) rotateX(12deg) translateY(-7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ];

  const outgoingAnimation = outgoingLayer.animate(outgoingFrames, {
    duration: TRANSITION_MS,
    times: [0, 0.52, 1],
    easing: "cubic-bezier(.74,0,.24,1)",
    fill: "forwards"
  });

  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  const scrollTimer = window.setTimeout(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, targetTop);
  }, Math.round(TRANSITION_MS * 0.42));

  const safetyTimer = new Promise<void>((resolve) => {
    window.setTimeout(resolve, TRANSITION_MS + 450);
  });

  try {
    await Promise.race([
      Promise.allSettled([
        outgoingAnimation.finished,
        incomingAnimation.finished,
        edgeAnimation.finished,
        labelAnimation.finished
      ]).then(() => undefined),
      safetyTimer
    ]);
  } finally {
    window.clearTimeout(scrollTimer);
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, targetTop);
    window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
    outgoingLayer.remove();
    incomingLayer.remove();
    edge.remove();
    label.remove();
  }
}

export function HomeSceneTransitions() {
  const reduceMotion = useReducedMotion();
  const activeIndexRef = useRef(0);
  const transitionLockRef = useRef(false);
  const wheelAmountRef = useRef(0);
  const wheelDirectionRef = useRef<Direction>(1);
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

    const syncActiveScene = () => {
      if (transitionLockRef.current) return;
      const nextIndex = sceneIndexAtViewport(elements);
      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const initialIndex = sceneIndexAtViewport(elements);
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);

    window.addEventListener("scroll", syncActiveScene, { passive: true });
    return () => window.removeEventListener("scroll", syncActiveScene);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const elements = getSceneElements();
    if (elements.length !== scenes.length) return;

    const resetWheel = () => {
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
      if (fromIndex === targetIndex) return;

      const direction: Direction = targetIndex > fromIndex ? 1 : -1;
      const boundaryIndex = Math.max(fromIndex, targetIndex);
      const effect: PeelEffect = boundaryIndex % 2 === 1 ? "peelX" : "peelY";

      transitionLockRef.current = true;
      resetWheel();

      try {
        await runPeel({
          outgoing: elements[fromIndex],
          incoming: elements[targetIndex],
          targetTop: elements[targetIndex].offsetTop,
          effect,
          direction,
          fromLabel: scenes[fromIndex].label,
          toLabel: scenes[targetIndex].label
        });

        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
      } catch (error) {
        console.error("Homepage peel transition failed:", error);
        window.scrollTo(0, elements[targetIndex].offsetTop);
        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
      } finally {
        transitionLockRef.current = false;
        cooldownUntilRef.current = performance.now() + COOLDOWN_MS;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      if (transitionLockRef.current) {
        event.preventDefault();
        return;
      }

      if (performance.now() < cooldownUntilRef.current) {
        event.preventDefault();
        return;
      }

      const delta = normalizeWheelDelta(event);
      if (!delta) return;

      const direction: Direction = delta > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const currentScene = elements[currentIndex];
      const targetIndex = currentIndex + direction;

      if (!currentScene || targetIndex < 0 || targetIndex >= elements.length) {
        resetWheel();
        return;
      }

      if (!canMoveToNextScene(currentScene, direction, delta)) {
        resetWheel();
        return;
      }

      event.preventDefault();

      if (wheelDirectionRef.current !== direction) {
        wheelAmountRef.current = 0;
        wheelDirectionRef.current = direction;
      }

      wheelAmountRef.current += Math.abs(delta);
      if (wheelResetRef.current !== null) window.clearTimeout(wheelResetRef.current);
      wheelResetRef.current = window.setTimeout(resetWheel, 240);

      if (wheelAmountRef.current >= WHEEL_THRESHOLD) {
        void beginTransition(targetIndex);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (transitionLockRef.current) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key)) {
          event.preventDefault();
        }
        return;
      }

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

      const direction: Direction = down ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const currentScene = elements[currentIndex];
      const targetIndex = currentIndex + direction;

      if (
        !currentScene ||
        targetIndex < 0 ||
        targetIndex >= elements.length ||
        !canMoveToNextScene(currentScene, direction, window.innerHeight * 0.5)
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
      resetWheel();
      transitionLockRef.current = false;
    };
  }, [enabled]);

  return (
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
  );
}
