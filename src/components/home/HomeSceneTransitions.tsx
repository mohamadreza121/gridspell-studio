"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const scenePalettes = [
  "radial-gradient(circle at 18% 24%, rgba(124,92,255,.36), transparent 34%), radial-gradient(circle at 82% 76%, rgba(41,214,255,.23), transparent 32%), #080a10",
  "radial-gradient(circle at 82% 18%, rgba(41,214,255,.28), transparent 32%), radial-gradient(circle at 20% 82%, rgba(54,78,180,.25), transparent 36%), #070a10",
  "radial-gradient(circle at 20% 22%, rgba(124,92,255,.31), transparent 34%), radial-gradient(circle at 80% 82%, rgba(105,230,173,.16), transparent 30%), #090a10",
  "radial-gradient(circle at 76% 22%, rgba(82,112,255,.26), transparent 34%), radial-gradient(circle at 18% 76%, rgba(41,214,255,.22), transparent 32%), #070910",
  "radial-gradient(circle at 18% 18%, rgba(41,214,255,.25), transparent 32%), radial-gradient(circle at 82% 80%, rgba(124,92,255,.29), transparent 34%), #080a10",
  "radial-gradient(circle at 78% 20%, rgba(124,92,255,.31), transparent 34%), radial-gradient(circle at 22% 80%, rgba(41,214,255,.21), transparent 32%), #080910",
  "radial-gradient(circle at 18% 22%, rgba(105,230,173,.16), transparent 30%), radial-gradient(circle at 82% 78%, rgba(82,112,255,.29), transparent 35%), #080a0f",
  "radial-gradient(circle at 78% 18%, rgba(41,214,255,.27), transparent 31%), radial-gradient(circle at 20% 82%, rgba(124,92,255,.34), transparent 36%), #080910"
] as const;

type PeelEffect = "peelX" | "peelY";

type SceneTransition = {
  serial: number;
  from: number;
  to: number;
  direction: 1 | -1;
  effect: PeelEffect;
};

function closestSceneIndex(elements: HTMLElement[]) {
  const viewportCenter = window.innerHeight / 2;
  const containingIndex = elements.findIndex((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
  });

  if (containingIndex >= 0) return containingIndex;

  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  elements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function animateSceneElements(
  outgoing: HTMLElement,
  incoming: HTMLElement,
  effect: PeelEffect,
  direction: 1 | -1,
  compact: boolean
) {
  if (compact || typeof outgoing.animate !== "function") return;

  const axis = effect === "peelX" ? "X" : "Y";
  const outgoingDistance = direction * -3.2;
  const incomingDistance = direction * 4.2;
  const duration = 880;
  const easing = "cubic-bezier(.22,1,.36,1)";

  outgoing.animate(
    [
      { transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", opacity: 1 },
      {
        transform:
          axis === "X"
            ? `translate3d(${outgoingDistance}vw,0,0) scale(.985)`
            : `translate3d(0,${outgoingDistance}vh,0) scale(.985)`,
        filter: "blur(4px)",
        opacity: 0.62
      },
      { transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", opacity: 1 }
    ],
    { duration, easing, fill: "none" }
  );

  incoming.animate(
    [
      {
        transform:
          axis === "X"
            ? `translate3d(${incomingDistance}vw,0,0) scale(1.018)`
            : `translate3d(0,${incomingDistance}vh,0) scale(1.018)`,
        filter: "blur(5px)",
        opacity: 0.48
      },
      { transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", opacity: 1 }
    ],
    { duration: duration * 0.72, delay: duration * 0.28, easing, fill: "none" }
  );
}

function transitionFrames(effect: PeelEffect, direction: 1 | -1) {
  if (effect === "peelX") {
    return direction > 0
      ? [
          "inset(0 100% 0 0 round 0px)",
          "inset(0 0% 0 0 round 0px)",
          "inset(0 0 0 100% round 0px)"
        ]
      : [
          "inset(0 0 0 100% round 0px)",
          "inset(0 0 0 0% round 0px)",
          "inset(0 100% 0 0 round 0px)"
        ];
  }

  return direction > 0
    ? [
        "inset(100% 0 0 0 round 0px)",
        "inset(0% 0 0 0 round 0px)",
        "inset(0 0 100% 0 round 0px)"
      ]
    : [
        "inset(0 0 100% 0 round 0px)",
        "inset(0 0 0% 0 round 0px)",
        "inset(100% 0 0 0 round 0px)"
      ];
}

export function HomeSceneTransitions() {
  const reduceMotion = useReducedMotion();
  const activeIndexRef = useRef(0);
  const serialRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<SceneTransition | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const updateCompactMode = () => setIsCompact(compactQuery.matches);
    updateCompactMode();
    compactQuery.addEventListener("change", updateCompactMode);
    return () => compactQuery.removeEventListener("change", updateCompactMode);
  }, []);

  useEffect(() => {
    const elements = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length !== scenes.length) return;

    const initialIndex = closestSceneIndex(elements);
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);

    const updateActiveScene = () => {
      frameRef.current = null;
      const nextIndex = closestSceneIndex(elements);
      const previousIndex = activeIndexRef.current;

      if (nextIndex === previousIndex) return;

      const direction: 1 | -1 = nextIndex > previousIndex ? 1 : -1;
      const boundaryIndex = Math.max(nextIndex, previousIndex);
      const effect: PeelEffect = boundaryIndex % 2 === 1 ? "peelX" : "peelY";

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      if (reduceMotion) return;

      serialRef.current += 1;
      const nextTransition: SceneTransition = {
        serial: serialRef.current,
        from: previousIndex,
        to: nextIndex,
        direction,
        effect
      };

      setTransition(nextTransition);
      animateSceneElements(
        elements[previousIndex],
        elements[nextIndex],
        effect,
        direction,
        isCompact
      );

      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = window.setTimeout(
        () => setTransition((current) => (current?.serial === nextTransition.serial ? null : current)),
        isCompact ? 680 : 980
      );
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateActiveScene);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
    };
  }, [isCompact, reduceMotion]);

  const destination = transition ? scenes[transition.to] : scenes[activeIndex];
  const palette = scenePalettes[transition?.to ?? activeIndex] ?? scenePalettes[0];
  const transitionDuration = isCompact ? 0.64 : 0.9;

  return (
    <>
      <AnimatePresence>
        {transition ? (
          <div
            key={transition.serial}
            className="pointer-events-none fixed inset-0 z-[90] overflow-hidden [perspective:1400px]"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,.78)] [transform-style:preserve-3d]"
              style={{
                background: palette,
                transformOrigin:
                  transition.effect === "peelX"
                    ? transition.direction > 0
                      ? "left center"
                      : "right center"
                    : transition.direction > 0
                      ? "center top"
                      : "center bottom"
              }}
              initial={{
                clipPath: transitionFrames(transition.effect, transition.direction)[0]
              }}
              animate={{
                clipPath: transitionFrames(transition.effect, transition.direction),
                rotateY:
                  transition.effect === "peelX"
                    ? [transition.direction * -9, 0, transition.direction * 8]
                    : 0,
                rotateX:
                  transition.effect === "peelY"
                    ? [transition.direction * 8, 0, transition.direction * -8]
                    : 0,
                scale: [1.035, 1, 1.035],
                filter: ["brightness(.82)", "brightness(1)", "brightness(.84)"]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: transitionDuration,
                times: [0, 0.48, 1],
                ease: [0.76, 0, 0.24, 1]
              }}
            >
              <div className="page-grid absolute inset-0 opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.055),transparent_28%,transparent_72%,rgba(41,214,255,.04))]" />

              <motion.div
                className="absolute left-1/2 top-1/2 w-[min(86vw,46rem)] -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: [0, 0, 1, 1, 0], y: [18, 18, 0, 0, -12] }}
                transition={{
                  duration: transitionDuration,
                  times: [0, 0.28, 0.43, 0.68, 1],
                  ease: "easeOut"
                }}
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.34em] text-[#8be9ff] sm:text-xs">
                  Scene {String(transition.to + 1).padStart(2, "0")} · {transition.effect === "peelX" ? "Peel X" : "Peel Y"}
                </p>
                <p className="mt-5 text-balance font-display text-[clamp(2.4rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
                  {destination.label}
                </p>
              </motion.div>
            </motion.div>

            {transition.effect === "peelX" ? (
              <motion.div
                className="absolute bottom-0 top-0 w-px bg-[#8be9ff] shadow-[0_0_28px_8px_rgba(139,233,255,.36)]"
                initial={{ x: transition.direction > 0 ? "-4vw" : "104vw" }}
                animate={{ x: transition.direction > 0 ? "104vw" : "-4vw" }}
                transition={{
                  duration: transitionDuration,
                  ease: [0.76, 0, 0.24, 1]
                }}
              />
            ) : (
              <motion.div
                className="absolute left-0 right-0 h-px bg-[#8be9ff] shadow-[0_0_28px_8px_rgba(139,233,255,.36)]"
                initial={{ y: transition.direction > 0 ? "-4vh" : "104vh" }}
                animate={{ y: transition.direction > 0 ? "104vh" : "-4vh" }}
                transition={{
                  duration: transitionDuration,
                  ease: [0.76, 0, 0.24, 1]
                }}
              />
            )}
          </div>
        ) : null}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/[0.09] bg-[#090b11]/78 px-4 py-2 text-[0.54rem] uppercase tracking-[0.2em] text-white/28 shadow-2xl backdrop-blur-xl lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[#8be9ff]">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/18" />
        <span>{scenes[activeIndex]?.label}</span>
        <span className="ml-2 h-px w-10 overflow-hidden bg-white/10">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
            animate={{ scaleX: (activeIndex + 1) / scenes.length }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </div>
    </>
  );
}
