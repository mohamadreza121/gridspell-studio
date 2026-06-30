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

function getScenes() {
  return scenes
    .map((scene) => document.getElementById(scene.id))
    .filter((element): element is HTMLElement => Boolean(element));
}

function activeSceneIndex(elements: HTMLElement[]) {
  const probe = window.scrollY + Math.min(window.innerHeight * 0.28, 220);
  let index = 0;

  elements.forEach((element, candidate) => {
    if (element.offsetTop <= probe) index = candidate;
  });

  return index;
}

function normalizeWheel(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 18;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

function isAtSceneEdge(
  element: HTMLElement,
  direction: Direction,
  delta: number
) {
  const rect = element.getBoundingClientRect();
  const allowance = Math.min(180, Math.max(24, Math.abs(delta) + 18));

  return direction > 0
    ? rect.bottom - window.innerHeight <= allowance
    : -rect.top <= allowance;
}

function stripIds(root: HTMLElement) {
  root.removeAttribute("id");
  root.querySelectorAll<HTMLElement>("[id]").forEach((element) => {
    element.removeAttribute("id");
  });
}

function createSceneLayer(
  source: HTMLElement,
  viewportTop: number,
  zIndex: number
) {
  const layer = document.createElement("div");
  const clone = source.cloneNode(true) as HTMLElement;

  stripIds(clone);

  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    zIndex: String(zIndex),
    overflow: "hidden",
    pointerEvents: "none",
    background: "#07080c",
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d"
  });

  Object.assign(clone.style, {
    position: "absolute",
    left: "0",
    top: `${viewportTop}px`,
    width: "100%",
    margin: "0",
    transform: "translateZ(0)"
  });

  clone.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
    video.muted = true;
    video.removeAttribute("autoplay");
  });

  layer.setAttribute("aria-hidden", "true");
  layer.appendChild(clone);
  document.body.appendChild(layer);

  return layer;
}

function createEffectLabel(
  effect: PeelEffect,
  fromLabel: string,
  toLabel: string
) {
  const label = document.createElement("div");
  const effectName = effect === "peelX" ? "Peel X" : "Peel Y";

  Object.assign(label.style, {
    position: "fixed",
    right: "2rem",
    bottom: "2rem",
    zIndex: "10003",
    display: "flex",
    alignItems: "center",
    gap: ".7rem",
    padding: ".72rem 1rem",
    border: "1px solid rgba(139,233,255,.18)",
    borderRadius: "999px",
    background: "rgba(7,8,12,.84)",
    boxShadow: "0 18px 60px rgba(0,0,0,.34)",
    backdropFilter: "blur(18px)",
    color: "rgba(255,255,255,.46)",
    font: "600 .64rem/1 ui-monospace,SFMono-Regular,Menlo,monospace",
    letterSpacing: ".18em",
    textTransform: "uppercase",
    pointerEvents: "none"
  });

  const effectText = document.createElement("span");
  effectText.textContent = effectName;
  effectText.style.color = "#8be9ff";

  const divider = document.createElement("span");
  Object.assign(divider.style, {
    display: "block",
    width: "1.5rem",
    height: "1px",
    background: "rgba(255,255,255,.16)"
  });

  const routeText = document.createElement("span");
  routeText.textContent = `${fromLabel} → ${toLabel}`;

  label.append(effectText, divider, routeText);
  label.setAttribute("aria-hidden", "true");
  document.body.appendChild(label);

  const animation = label.animate(
    [
      { offset: 0, opacity: 0, transform: "translateY(10px)" },
      { offset: 0.15, opacity: 1, transform: "translateY(0)" },
      { offset: 0.75, opacity: 1, transform: "translateY(0)" },
      { offset: 1, opacity: 0, transform: "translateY(-8px)" }
    ],
    {
      duration: TRANSITION_MS,
      easing: "ease-out",
      fill: "forwards"
    }
  );

  return { element: label, animation };
}

function createPeelEdge(effect: PeelEffect, direction: Direction) {
  const edge = document.createElement("div");
  const isX = effect === "peelX";

  Object.assign(edge.style, {
    position: "fixed",
    zIndex: "10002",
    pointerEvents: "none",
    background: "#8be9ff",
    boxShadow:
      "0 0 18px 5px rgba(139,233,255,.54), 0 0 70px 24px rgba(41,214,255,.18)"
  });

  if (isX) {
    Object.assign(edge.style, { top: "0", bottom: "0", width: "2px" });
  } else {
    Object.assign(edge.style, { left: "0", right: "0", height: "2px" });
  }

  edge.setAttribute("aria-hidden", "true");
  document.body.appendChild(edge);

  const frames: Keyframe[] = isX
    ? direction > 0
      ? [
          { transform: "translateX(-5vw)" },
          { transform: "translateX(105vw)" }
        ]
      : [
          { transform: "translateX(105vw)" },
          { transform: "translateX(-5vw)" }
        ]
    : direction > 0
      ? [
          { transform: "translateY(-5vh)" },
          { transform: "translateY(105vh)" }
        ]
      : [
          { transform: "translateY(105vh)" },
          { transform: "translateY(-5vh)" }
        ];

  const animation = edge.animate(frames, {
    duration: TRANSITION_MS,
    easing: "cubic-bezier(.74,0,.24,1)",
    fill: "forwards"
  });

  return { element: edge, animation };
}

function outgoingFrames(
  effect: PeelEffect,
  direction: Direction
): Keyframe[] {
  const forward = direction > 0;

  if (effect === "peelX") {
    return forward
      ? [
          {
            offset: 0,
            clipPath: "inset(0 0 0 0)",
            transform:
              "perspective(1600px) rotateY(0deg) translateX(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            offset: 0.52,
            clipPath: "inset(0 0 0 40%)",
            transform:
              "perspective(1600px) rotateY(5deg) translateX(1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            offset: 1,
            clipPath: "inset(0 0 0 100%)",
            transform:
              "perspective(1600px) rotateY(14deg) translateX(7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ]
      : [
          {
            offset: 0,
            clipPath: "inset(0 0 0 0)",
            transform:
              "perspective(1600px) rotateY(0deg) translateX(0) scale(1)",
            filter: "brightness(1)"
          },
          {
            offset: 0.52,
            clipPath: "inset(0 40% 0 0)",
            transform:
              "perspective(1600px) rotateY(-5deg) translateX(-1%) scale(.995)",
            filter: "brightness(.9)"
          },
          {
            offset: 1,
            clipPath: "inset(0 100% 0 0)",
            transform:
              "perspective(1600px) rotateY(-14deg) translateX(-7%) scale(.98)",
            filter: "brightness(.62)"
          }
        ];
  }

  return forward
    ? [
        {
          offset: 0,
          clipPath: "inset(0 0 0 0)",
          transform:
            "perspective(1600px) rotateX(0deg) translateY(0) scale(1)",
          filter: "brightness(1)"
        },
        {
          offset: 0.52,
          clipPath: "inset(40% 0 0 0)",
          transform:
            "perspective(1600px) rotateX(-4deg) translateY(1%) scale(.995)",
          filter: "brightness(.9)"
        },
        {
          offset: 1,
          clipPath: "inset(100% 0 0 0)",
          transform:
            "perspective(1600px) rotateX(-12deg) translateY(7%) scale(.98)",
          filter: "brightness(.62)"
        }
      ]
    : [
        {
          offset: 0,
          clipPath: "inset(0 0 0 0)",
          transform:
            "perspective(1600px) rotateX(0deg) translateY(0) scale(1)",
          filter: "brightness(1)"
        },
        {
          offset: 0.52,
          clipPath: "inset(0 0 40% 0)",
          transform:
            "perspective(1600px) rotateX(4deg) translateY(-1%) scale(.995)",
          filter: "brightness(.9)"
        },
        {
          offset: 1,
          clipPath: "inset(0 0 100% 0)",
          transform:
            "perspective(1600px) rotateX(12deg) translateY(-7%) scale(.98)",
          filter: "brightness(.62)"
        }
      ];
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

  const outgoingLayer = createSceneLayer(
    outgoing,
    outgoing.getBoundingClientRect().top,
    9999
  );
  const incomingLayer = createSceneLayer(incoming, 0, 9998);
  const edge = createPeelEdge(effect, direction);
  const label = createEffectLabel(effect, fromLabel, toLabel);
  const isX = effect === "peelX";
  const forward = direction > 0;

  outgoingLayer.style.transformOrigin = isX
    ? forward
      ? "right center"
      : "left center"
    : forward
      ? "center bottom"
      : "center top";

  incomingLayer.style.transformOrigin = "center center";

  const incomingAnimation = incomingLayer.animate(
    [
      {
        offset: 0,
        transform: "perspective(1600px) translateZ(-90px) scale(1.055)",
        filter: "brightness(.46) saturate(.72) blur(9px)"
      },
      {
        offset: 0.48,
        transform: "perspective(1600px) translateZ(-35px) scale(1.025)",
        filter: "brightness(.66) saturate(.84) blur(4px)"
      },
      {
        offset: 1,
        transform: "perspective(1600px) translateZ(0) scale(1)",
        filter: "brightness(1) saturate(1) blur(0)"
      }
    ],
    {
      duration: TRANSITION_MS,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "forwards"
    }
  );

  const outgoingAnimation = outgoingLayer.animate(
    outgoingFrames(effect, direction),
    {
      duration: TRANSITION_MS,
      easing: "cubic-bezier(.74,0,.24,1)",
      fill: "forwards"
    }
  );

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
        edge.animation.finished,
        label.animation.finished
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
    edge.element.remove();
    label.element.remove();
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
    const elements = getScenes();
    if (elements.length !== scenes.length) return;

    const syncActiveScene = () => {
      if (transitionLockRef.current) return;
      const nextIndex = activeSceneIndex(elements);
      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const initialIndex = activeSceneIndex(elements);
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);

    window.addEventListener("scroll", syncActiveScene, { passive: true });
    return () => window.removeEventListener("scroll", syncActiveScene);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const elements = getScenes();
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
      const boundary = Math.max(fromIndex, targetIndex);
      const effect: PeelEffect = boundary % 2 === 1 ? "peelX" : "peelY";

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

      const delta = normalizeWheel(event);
      if (!delta) return;

      const direction: Direction = delta > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const currentScene = elements[currentIndex];
      const targetIndex = currentIndex + direction;

      if (!currentScene || targetIndex < 0 || targetIndex >= elements.length) {
        resetWheel();
        return;
      }

      if (!isAtSceneEdge(currentScene, direction, delta)) {
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
        !isAtSceneEdge(currentScene, direction, window.innerHeight * 0.5)
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
