"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type OrbitPose = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
};

type OrbConfig = {
  baseAngle: number;
  speed: number;
  direction: 1 | -1;
  radius: number;
  glow: number;
  tone: "cyan" | "ice" | "silver" | "violet";
};

const ORBIT_POSES: Record<string, OrbitPose> = {
  hero: { cx: 310, cy: 314, rx: 112, ry: 67, rotation: -7 },
  design: { cx: 310, cy: 314, rx: 116, ry: 70, rotation: 4 },
  sensors: { cx: 310, cy: 315, rx: 105, ry: 58, rotation: -15 },
  motion: { cx: 310, cy: 315, rx: 118, ry: 66, rotation: 15 },
  intelligence: { cx: 310, cy: 314, rx: 113, ry: 72, rotation: -3 }
};

const ORBS: OrbConfig[] = [
  { baseAngle: -2.35, speed: 0.060, direction: 1, radius: 7.4, glow: 1.15, tone: "cyan" },
  { baseAngle: -0.95, speed: 0.046, direction: -1, radius: 5.4, glow: 0.82, tone: "silver" },
  { baseAngle: 0.38, speed: 0.054, direction: 1, radius: 6.3, glow: 0.96, tone: "ice" },
  { baseAngle: 1.92, speed: 0.040, direction: -1, radius: 4.8, glow: 0.74, tone: "violet" },
  { baseAngle: 2.78, speed: 0.050, direction: 1, radius: 5.8, glow: 0.88, tone: "cyan" }
];

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function mixPose(from: OrbitPose, to: OrbitPose, progress: number): OrbitPose {
  return {
    cx: mix(from.cx, to.cx, progress),
    cy: mix(from.cy, to.cy, progress),
    rx: mix(from.rx, to.rx, progress),
    ry: mix(from.ry, to.ry, progress),
    rotation: mix(from.rotation, to.rotation, progress)
  };
}

function readOrbitPose(): OrbitPose {
  const keys = ["design", "sensors", "motion", "intelligence"] as const;
  const pageY = window.scrollY || window.pageYOffset || 0;
  const cursor = pageY + window.innerHeight * 0.52;
  const anchors = keys
    .map((key) => {
      const element = document.getElementById(key);
      if (!element) return null;
      const bounds = element.getBoundingClientRect();
      return pageY + bounds.top + bounds.height * 0.5;
    })
    .filter((value): value is number => value !== null);

  if (anchors.length !== keys.length || cursor <= anchors[0]) {
    const designStart = anchors[0] ?? window.innerHeight * 1.25;
    return mixPose(ORBIT_POSES.hero, ORBIT_POSES.design, clamp(cursor / Math.max(designStart, 1), 0, 1));
  }

  for (let index = 0; index < anchors.length - 1; index += 1) {
    if (cursor <= anchors[index + 1]) {
      const progress = clamp((cursor - anchors[index]) / Math.max(anchors[index + 1] - anchors[index], 1), 0, 1);
      return mixPose(ORBIT_POSES[keys[index]], ORBIT_POSES[keys[index + 1]], progress);
    }
  }

  return ORBIT_POSES.intelligence;
}

function AuraRingOrbits() {
  const stageRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<Array<SVGGElement | null>>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const product = stage?.closest<HTMLElement>("#aura-scroll-product");
    if (!stage || !product || !window.matchMedia("(min-width: 1024px)").matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let disposed = false;
    let visible = document.visibilityState === "visible";
    let currentPose = readOrbitPose();
    let targetPose = currentPose;

    const updateTarget = () => {
      targetPose = readOrbitPose();
    };

    const render = (timestamp: number) => {
      if (disposed) return;

      if (visible && product.classList.contains("aura-ring-webgl-ready")) {
        currentPose = mixPose(currentPose, targetPose, reducedMotion ? 1 : 0.045);
        const time = reducedMotion ? 0 : timestamp * 0.001;
        const rotation = currentPose.rotation * (Math.PI / 180);
        const cosRotation = Math.cos(rotation);
        const sinRotation = Math.sin(rotation);

        ORBS.forEach((orb, index) => {
          const group = orbRefs.current[index];
          if (!group) return;

          const angle = orb.baseAngle + time * orb.speed * orb.direction;
          const ellipseX = Math.cos(angle) * currentPose.rx;
          const ellipseY = Math.sin(angle) * currentPose.ry;
          const x = currentPose.cx + ellipseX * cosRotation - ellipseY * sinRotation;
          const y = currentPose.cy + ellipseX * sinRotation + ellipseY * cosRotation;
          const depth = (Math.sin(angle) + 1) * 0.5;
          const scale = 0.72 + depth * 0.48;
          const opacity = 0.38 + depth * 0.62;

          group.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)})`);
          group.setAttribute("opacity", opacity.toFixed(3));
        });

        if (!ready) setReady(true);
      }

      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && !reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    document.addEventListener("visibilitychange", handleVisibility);

    updateTarget();
    frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [ready]);

  return (
    <div ref={stageRef} className={`aura-ring-orbits ${ready ? "is-ready" : ""}`} aria-hidden="true">
      <div className="aura-ring-orbit-stage">
        <svg viewBox="0 0 620 620" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="aura-orb-cyan" cx="35%" cy="28%" r="72%">
              <stop offset="0" stopColor="#effeff" />
              <stop offset="0.34" stopColor="#9cf7ff" />
              <stop offset="0.72" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#0891b2" />
            </radialGradient>
            <radialGradient id="aura-orb-ice" cx="34%" cy="26%" r="74%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.42" stopColor="#d7fbff" />
              <stop offset="1" stopColor="#67e8f9" />
            </radialGradient>
            <radialGradient id="aura-orb-silver" cx="34%" cy="25%" r="78%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.38" stopColor="#d6e0e7" />
              <stop offset="0.72" stopColor="#7f8b96" />
              <stop offset="1" stopColor="#25313c" />
            </radialGradient>
            <radialGradient id="aura-orb-violet" cx="34%" cy="25%" r="76%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#ddd6fe" />
              <stop offset="0.72" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#4c1d95" />
            </radialGradient>
            <filter id="aura-orb-glow" x="-280%" y="-280%" width="660%" height="660%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {ORBS.map((orb, index) => (
            <g
              key={`${orb.tone}-${index}`}
              ref={(node) => {
                orbRefs.current[index] = node;
              }}
            >
              <circle
                r={orb.radius * 2.7 * orb.glow}
                fill={orb.tone === "violet" ? "rgba(139,92,246,0.28)" : "rgba(103,232,249,0.32)"}
                filter="url(#aura-orb-glow)"
              />
              <circle r={orb.radius} fill={`url(#aura-orb-${orb.tone})`} stroke="rgba(255,255,255,0.64)" strokeWidth="0.8" />
              <circle cx={-orb.radius * 0.28} cy={-orb.radius * 0.32} r={orb.radius * 0.22} fill="rgba(255,255,255,0.88)" />
            </g>
          ))}
        </svg>
      </div>

      <style>{`
        .aura-ring-orbits {
          position: absolute;
          inset: -8% -16% -6% -16%;
          z-index: 4;
          pointer-events: none;
          opacity: 0;
          transition: opacity 700ms cubic-bezier(.2,.85,.2,1);
          mix-blend-mode: screen;
        }

        .aura-ring-orbits.is-ready {
          opacity: 1;
        }

        .aura-ring-orbit-stage {
          position: absolute;
          inset: 0;
          transform: translateY(7%) scale(0.76);
          transform-origin: 50% 50%;
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .aura-ring-orbits {
            inset: -10% -20% -8% -20%;
          }

          .aura-ring-orbit-stage {
            transform: translateY(8%) scale(0.72);
          }
        }

        @media (max-width: 1023px) {
          .aura-ring-orbits {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aura-ring-orbits {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export function AuraRingOrbitsPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.getElementById("aura-scroll-product"));
  }, []);

  return target ? createPortal(<AuraRingOrbits />, target) : null;
}
