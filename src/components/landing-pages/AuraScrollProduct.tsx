"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import {
  IntelligenceGlassOptics,
  MaterialGlassOptics,
  MotionGlassOptics,
  SensorGlassOptics
} from "@/components/landing-pages/AuraGlassOptics";
import {
  IntelligenceGlassArtwork,
  MotionStoryGlassArtwork,
  SensorArrayGlassArtwork
} from "@/components/landing-pages/AuraStoryGlassArt";

function MaterialGlassArtwork() {
  return (
    <div className="aura-material-art" aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="material-glass-main" x1="90" y1="55" x2="790" y2="555" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="0.22" stopColor="rgba(210,224,233,0.11)" />
            <stop offset="0.52" stopColor="rgba(255,255,255,0.055)" />
            <stop offset="0.78" stopColor="rgba(103,232,249,0.075)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.13)" />
          </linearGradient>
          <linearGradient id="material-glass-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.84)" />
            <stop offset="0.48" stopColor="rgba(188,210,222,0.24)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.48)" />
          </linearGradient>
          <linearGradient id="material-glass-shard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.30)" />
            <stop offset="0.54" stopColor="rgba(255,255,255,0.055)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.12)" />
          </linearGradient>
          <linearGradient id="material-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.62)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="material-dust" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(226,244,249,0.80)" />
            <stop offset="0.42" stopColor="rgba(148,163,184,0.28)" />
            <stop offset="1" stopColor="rgba(15,23,42,0)" />
          </radialGradient>
          <filter id="material-shadow" x="-30%" y="-35%" width="160%" height="180%">
            <feDropShadow dx="0" dy="32" stdDeviation="28" floodColor="#020617" floodOpacity="0.46" />
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#67e8f9" floodOpacity="0.10" />
          </filter>
          <filter id="material-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <clipPath id="material-main-clip">
            <path d="M112 103 L238 46 L424 62 L548 35 L772 104 L838 224 L814 354 L850 455 L728 566 L539 548 L407 584 L225 542 L91 431 L112 306 L66 210 Z" />
          </clipPath>
        </defs>

        <ellipse className="aura-material-dust-field" cx="456" cy="318" rx="390" ry="264" fill="url(#material-dust)" opacity="0.28" filter="url(#material-soft)" />

        <g className="aura-material-main" filter="url(#material-shadow)">
          <path d="M112 103 L238 46 L424 62 L548 35 L772 104 L838 224 L814 354 L850 455 L728 566 L539 548 L407 584 L225 542 L91 431 L112 306 L66 210 Z" fill="url(#material-glass-main)" stroke="url(#material-glass-edge)" strokeWidth="2.3" />
          <path d="M112 103 L238 46 L294 178 L112 306 L66 210 Z" fill="rgba(255,255,255,0.035)" stroke="rgba(235,248,252,0.24)" strokeWidth="1.4" />
          <path d="M238 46 L424 62 L456 206 L294 178 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(235,248,252,0.22)" strokeWidth="1.4" />
          <path d="M424 62 L548 35 L650 164 L456 206 Z" fill="rgba(103,232,249,0.035)" stroke="rgba(235,248,252,0.20)" strokeWidth="1.4" />
          <path d="M548 35 L772 104 L724 238 L650 164 Z" fill="rgba(255,255,255,0.055)" stroke="rgba(235,248,252,0.20)" strokeWidth="1.4" />
          <path d="M772 104 L838 224 L724 238 Z" fill="rgba(255,255,255,0.09)" stroke="rgba(235,248,252,0.25)" strokeWidth="1.4" />
          <path d="M112 306 L294 178 L350 320 L201 407 L91 431 Z" fill="rgba(103,232,249,0.025)" stroke="rgba(235,248,252,0.18)" strokeWidth="1.4" />
          <path d="M294 178 L456 206 L502 342 L350 320 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(235,248,252,0.19)" strokeWidth="1.4" />
          <path d="M456 206 L650 164 L642 318 L502 342 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(235,248,252,0.17)" strokeWidth="1.4" />
          <path d="M650 164 L724 238 L814 354 L642 318 Z" fill="rgba(103,232,249,0.04)" stroke="rgba(235,248,252,0.19)" strokeWidth="1.4" />
          <path d="M91 431 L201 407 L225 542 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(235,248,252,0.20)" strokeWidth="1.4" />
          <path d="M201 407 L350 320 L407 584 L225 542 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(235,248,252,0.18)" strokeWidth="1.4" />
          <path d="M350 320 L502 342 L539 548 L407 584 Z" fill="rgba(103,232,249,0.03)" stroke="rgba(235,248,252,0.18)" strokeWidth="1.4" />
          <path d="M502 342 L642 318 L728 566 L539 548 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(235,248,252,0.19)" strokeWidth="1.4" />
          <path d="M642 318 L814 354 L850 455 L728 566 Z" fill="rgba(255,255,255,0.055)" stroke="rgba(235,248,252,0.21)" strokeWidth="1.4" />
          <path d="M108 109 L236 52 L418 67" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="3" strokeLinecap="round" />
          <path d="M552 42 L766 109 L832 224" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M96 426 L228 535 L401 577" fill="none" stroke="rgba(103,232,249,0.30)" strokeWidth="2" strokeLinecap="round" />
          <path d="M735 558 L842 452" fill="none" stroke="rgba(255,255,255,0.44)" strokeWidth="2.6" strokeLinecap="round" />
          <g clipPath="url(#material-main-clip)">
            <rect className="aura-material-sheen" x="-330" y="-80" width="180" height="820" fill="url(#material-sheen)" transform="rotate(18 0 0)" opacity="0.42" />
          </g>
        </g>

        <g opacity="0.96">
          <polygon className="aura-material-shard aura-material-shard-1" points="31,128 91,74 129,151 61,194" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.52)" strokeWidth="1.5" />
          <polygon className="aura-material-shard aura-material-shard-2" points="182,9 298,20 253,64" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
          <polygon className="aura-material-shard aura-material-shard-3" points="664,17 748,34 718,90 635,65" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.48)" strokeWidth="1.4" />
          <polygon className="aura-material-shard aura-material-shard-4" points="840,148 892,207 848,268 811,221" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.50)" strokeWidth="1.5" />
          <polygon className="aura-material-shard aura-material-shard-5" points="851,390 895,447 842,492 814,438" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.46)" strokeWidth="1.4" />
          <polygon className="aura-material-shard aura-material-shard-6" points="681,566 774,584 710,618 631,592" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
          <polygon className="aura-material-shard aura-material-shard-7" points="202,561 277,601 184,618 131,582" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.44)" strokeWidth="1.4" />
          <polygon className="aura-material-shard aura-material-shard-8" points="14,388 72,356 90,428 36,470" fill="url(#material-glass-shard)" stroke="rgba(255,255,255,0.48)" strokeWidth="1.5" />
        </g>

        <g className="aura-material-particles" fill="rgba(226,244,249,0.72)">
          <circle cx="91" cy="91" r="2.4" /><circle cx="122" cy="67" r="1.5" /><circle cx="158" cy="111" r="1.2" />
          <circle cx="776" cy="76" r="1.8" /><circle cx="825" cy="119" r="1.3" /><circle cx="864" cy="329" r="1.9" />
          <circle cx="792" cy="545" r="1.4" /><circle cx="112" cy="520" r="1.7" /><circle cx="49" cy="302" r="1.2" />
        </g>
      </svg>
    </div>
  );
}

type ArtKey = "material" | "sensor" | "motion" | "intelligence";
type ArtTargets = Record<ArtKey, Element | null>;
type MotionFactor = readonly [number, number, number, number];

const artConfigs: Record<ArtKey, { selector: string; factors: readonly MotionFactor[] }> = {
  material: {
    selector: "#design > div",
    factors: [[-0.45, -0.50, -2, 2], [-0.30, -0.70, 1, -2], [0.35, -0.60, -1, 2.5], [0.62, -0.18, 2, -2], [0.58, 0.45, -2, 2], [0.28, 0.68, 1, 2], [-0.28, 0.65, -1, -2], [-0.62, 0.28, 2, 2]]
  },
  sensor: {
    selector: "#sensors > div",
    factors: [[-0.42, -0.42, -1, 1], [-0.18, -0.64, 0, -1], [0.42, -0.50, 1, 1.5], [0.58, 0.22, -1, 1], [0.20, 0.62, 0, -1]]
  },
  motion: {
    selector: "#motion > div",
    factors: [[-0.66, -0.24, -3, 4], [-0.30, -0.62, -1, 3], [0.48, -0.55, 2, 4], [0.70, 0.05, -2, 5], [0.52, 0.58, 1, 4], [-0.56, 0.46, -2, 3]]
  },
  intelligence: {
    selector: "#intelligence > div",
    factors: [[-0.42, -0.45, -1, 1.5], [-0.22, -0.62, 1, -1], [0.40, -0.54, -1, 1.5], [0.58, 0.10, 1, -1.5], [0.30, 0.62, -1, 1], [-0.55, 0.34, 1, -1]]
  }
};

function setArtFragmentVars(host: HTMLElement, key: ArtKey, nx: number, ny: number, progress: number) {
  artConfigs[key].factors.forEach(([fx, fy, baseRotation, scrollRotation], index) => {
    const fragment = index + 1;
    const distance = key === "motion" ? 18 : key === "sensor" ? 7 : key === "intelligence" ? 9 : 10;
    host.style.setProperty(`--${key}-f${fragment}-x`, `${(nx * distance * fx).toFixed(2)}px`);
    host.style.setProperty(`--${key}-f${fragment}-y`, `${(ny * distance * fy).toFixed(2)}px`);
    host.style.setProperty(`--${key}-f${fragment}-r`, `${(baseRotation + progress * scrollRotation).toFixed(2)}deg`);
  });
}

export function AuraScrollProduct({ children }: { children: ReactNode }) {
  const [targets, setTargets] = useState<ArtTargets>({ material: null, sensor: null, motion: null, intelligence: null });

  useEffect(() => {
    const page = document.getElementById("aura-page");
    const product = document.getElementById("aura-scroll-product");
    const story = document.getElementById("aura-story");
    const afterStory = document.getElementById("aura-after-story");
    const hosts = Object.fromEntries(
      Object.entries(artConfigs).map(([key, config]) => [key, document.querySelector<HTMLElement>(config.selector)])
    ) as Record<ArtKey, HTMLElement | null>;

    window.requestAnimationFrame(() => setTargets(hosts));
    if (!page || !product || !story || !afterStory) return;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 1;
      const width = window.innerWidth || 1440;
      const afterStoryTop = y + afterStory.getBoundingClientRect().top;
      const heroProgress = clamp(y / (vh * 1.05), 0, 1);
      const leftTarget = width >= 1280 ? 27 : width >= 1024 ? 31 : 50;
      const topTarget = width >= 1024 ? 52 : 42;
      const scaleTarget = width >= 1280 ? 0.58 : width >= 1024 ? 0.66 : 0.92;

      let left = mix(50, leftTarget, heroProgress);
      let top = mix(45, topTarget, heroProgress);
      let scale = mix(1, scaleTarget, heroProgress);
      let opacity = 1;
      const fadeStart = afterStoryTop - vh * 1.25;
      const fadeEnd = afterStoryTop - vh * 0.82;

      if (y > fadeStart) {
        opacity = clamp(1 - (y - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0, 1);
        left = leftTarget;
        top = topTarget;
        scale = scaleTarget;
      }

      page.style.setProperty("--aura-left", `${left.toFixed(2)}vw`);
      page.style.setProperty("--aura-top", `${top.toFixed(2)}vh`);
      page.style.setProperty("--aura-scale", scale.toFixed(3));
      page.style.setProperty("--aura-opacity", opacity.toFixed(3));

      (Object.keys(hosts) as ArtKey[]).forEach((key) => {
        const host = hosts[key];
        if (!host) return;
        const rect = host.getBoundingClientRect();
        const progress = clamp((vh - rect.top) / Math.max(vh + rect.height, 1), 0, 1);
        const mainX = key === "motion" ? (progress - 0.5) * 13 : (progress - 0.5) * 5;
        const mainY = key === "sensor" ? (progress - 0.5) * -5 : (progress - 0.5) * -8;
        host.style.setProperty(`--${key}-main-x`, `${mainX.toFixed(2)}px`);
        host.style.setProperty(`--${key}-main-y`, `${mainY.toFixed(2)}px`);
        host.style.setProperty(`--${key}-optic-y`, `${((progress - 0.5) * -12).toFixed(2)}px`);
        host.style.setProperty(`--${key}-optic-opacity`, `${(0.58 + Math.sin(progress * Math.PI) * 0.34).toFixed(3)}`);
        setArtFragmentVars(host, key, 0, 0, progress);
      });

      if (y >= fadeEnd || opacity <= 0.02) product.classList.add("is-hidden");
      else product.classList.remove("is-hidden");
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const pointerCleanups = (Object.keys(hosts) as ArtKey[]).map((key) => {
      const host = hosts[key];
      if (!host) return () => undefined;

      const handlePointerMove = (event: PointerEvent) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = host.getBoundingClientRect();
        const nx = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1) - 0.5;
        const ny = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1) - 0.5;
        const tilt = key === "motion" ? 6.4 : key === "intelligence" ? 4.2 : 5.2;
        host.style.setProperty(`--${key}-rx`, `${(-ny * tilt).toFixed(2)}deg`);
        host.style.setProperty(`--${key}-ry`, `${(nx * tilt).toFixed(2)}deg`);
        host.style.setProperty(`--${key}-px`, `${(nx * (key === "motion" ? 14 : 10)).toFixed(2)}px`);
        host.style.setProperty(`--${key}-py`, `${(ny * 8).toFixed(2)}px`);
        host.style.setProperty(`--${key}-optic-x`, `${(nx * 12).toFixed(2)}px`);
        host.style.setProperty(`--${key}-optic-r`, `${(nx * 1.8).toFixed(2)}deg`);
        setArtFragmentVars(host, key, nx, ny, 0.5);
      };

      const resetPointer = () => {
        host.style.setProperty(`--${key}-rx`, "0deg");
        host.style.setProperty(`--${key}-ry`, "0deg");
        host.style.setProperty(`--${key}-px`, "0px");
        host.style.setProperty(`--${key}-py`, "0px");
        host.style.setProperty(`--${key}-optic-x`, "0px");
        host.style.setProperty(`--${key}-optic-r`, "0deg");
        setArtFragmentVars(host, key, 0, 0, 0.5);
      };

      host.addEventListener("pointermove", handlePointerMove);
      host.addEventListener("pointerleave", resetPointer);
      return () => {
        host.removeEventListener("pointermove", handlePointerMove);
        host.removeEventListener("pointerleave", resetPointer);
      };
    });

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      pointerCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <style>{`
        #design > div, #sensors > div, #motion > div, #intelligence > div {
          isolation: isolate;
          perspective: 1200px;
          contain: layout style;
        }

        #design .aura-shatter-dust, #design .aura-crack-overlay, #design .aura-glass-chip,
        #sensors .aura-shatter-dust, #sensors .aura-crack-overlay, #sensors .aura-glass-chip,
        #motion .aura-shatter-dust, #motion .aura-crack-overlay, #motion .aura-glass-chip,
        #intelligence .aura-shatter-dust, #intelligence .aura-crack-overlay, #intelligence .aura-glass-chip { display: none !important; }

        #design .aura-shatter-panel, #sensors .aura-shatter-panel,
        #motion .aura-shatter-panel, #intelligence .aura-shatter-panel {
          overflow: visible !important;
          clip-path: none !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        #design .aura-shatter-panel::before, #design .aura-shatter-panel::after,
        #sensors .aura-shatter-panel::before, #sensors .aura-shatter-panel::after,
        #motion .aura-shatter-panel::before, #motion .aura-shatter-panel::after,
        #intelligence .aura-shatter-panel::before, #intelligence .aura-shatter-panel::after { display: none !important; }

        @keyframes aura-art-enter {
          0% { opacity: 0; transform: translate3d(0,42px,0) scale(.94) rotateX(5deg); filter: blur(9px) drop-shadow(0 12px 30px rgba(0,0,0,.18)); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1) rotateX(0); filter: blur(0) drop-shadow(0 34px 72px rgba(0,0,0,.30)); }
        }
        @keyframes material-sheen-pass { 0%,18% { transform: translateX(-240px) rotate(18deg); opacity: 0; } 34% { opacity: .46; } 58% { opacity: .18; } 76%,100% { transform: translateX(1260px) rotate(18deg); opacity: 0; } }
        @keyframes material-dust-drift { 0%,100% { transform: translate3d(-4px,3px,0) scale(.99); opacity: .24; } 50% { transform: translate3d(7px,-8px,0) scale(1.035); opacity: .35; } }
        @keyframes material-particle-drift { 0%,100% { transform: translate3d(0,0,0); opacity: .58; } 50% { transform: translate3d(5px,-7px,0); opacity: .9; } }
        @keyframes sensor-sheen-pass { 0%,25% { transform: translateX(-260px) rotate(12deg); opacity: 0; } 40% { opacity: .52; } 62% { opacity: .14; } 82%,100% { transform: translateX(1280px) rotate(12deg); opacity: 0; } }
        @keyframes sensor-pulse { 0%,100% { opacity: .45; transform: scale(.92); } 50% { opacity: 1; transform: scale(1.08); } }
        @keyframes sensor-aura-breathe { 0%,100% { opacity: .42; transform: scale(.98); } 50% { opacity: .72; transform: scale(1.035); } }
        @keyframes motion-sheen-pass { 0%,12% { transform: translateX(-330px) rotate(9deg); opacity: 0; } 30% { opacity: .42; } 52% { opacity: .12; } 68%,100% { transform: translateX(1340px) rotate(9deg); opacity: 0; } }
        @keyframes motion-trail-flow { 0%,100% { transform: translateX(-16px); opacity: .28; } 50% { transform: translateX(22px); opacity: .72; } }
        @keyframes motion-aura-drift { 0%,100% { transform: translate3d(-10px,5px,0) scale(.98); } 50% { transform: translate3d(14px,-8px,0) scale(1.05); } }
        @keyframes intelligence-sheen-pass { 0%,24% { transform: translateX(-250px) rotate(16deg); opacity: 0; } 42% { opacity: .50; } 64% { opacity: .16; } 84%,100% { transform: translateX(1290px) rotate(16deg); opacity: 0; } }
        @keyframes intelligence-orbit { to { transform: rotate(360deg); } }
        @keyframes intelligence-core-pulse { 0%,100% { opacity: .50; transform: scale(.98); } 50% { opacity: .82; transform: scale(1.04); } }

        @keyframes optics-volume-drift {
          0%,100% { transform: translate3d(-10px,8px,0) scale(.98); opacity: .48; }
          50% { transform: translate3d(14px,-11px,0) scale(1.045); opacity: .88; }
        }
        @keyframes optics-scratch-shimmer {
          0%,100% { opacity: .16; transform: translateX(-3px); }
          50% { opacity: .48; transform: translateX(5px); }
        }
        @keyframes optics-spectral-run {
          0% { stroke-dashoffset: 470; opacity: 0; }
          18% { opacity: .22; }
          52% { opacity: .48; }
          82%,100% { stroke-dashoffset: -390; opacity: 0; }
        }
        @keyframes optics-edge-breathe {
          0%,100% { opacity: .22; }
          50% { opacity: .55; }
        }
        @keyframes optics-glint-drift {
          0%,100% { transform: translate3d(-4px,3px,0); opacity: .32; }
          50% { transform: translate3d(7px,-6px,0); opacity: .72; }
        }

        .aura-material-art, .aura-story-art, .aura-optics {
          position: absolute;
          inset: -16% -19% -18% -17%;
          pointer-events: none;
          transform-style: preserve-3d;
          transition: transform 180ms cubic-bezier(.2,.8,.2,1), opacity 240ms ease;
          will-change: transform, opacity;
        }

        .aura-material-art, .aura-story-art {
          z-index: 0;
          animation: aura-art-enter 1.05s cubic-bezier(.2,.85,.2,1) both;
          filter: drop-shadow(0 34px 72px rgba(0,0,0,.30));
        }

        .aura-optics {
          z-index: 1;
          opacity: var(--material-optic-opacity, .72);
          mix-blend-mode: screen;
          filter: saturate(1.08);
        }

        .aura-material-art { transform: translate3d(var(--material-px,0px),var(--material-py,0px),0) rotateX(var(--material-rx,0deg)) rotateY(var(--material-ry,0deg)); }
        .aura-sensor-art { transform: translate3d(var(--sensor-px,0px),var(--sensor-py,0px),0) rotateX(var(--sensor-rx,0deg)) rotateY(var(--sensor-ry,0deg)); }
        .aura-motion-art { transform: translate3d(var(--motion-px,0px),var(--motion-py,0px),0) rotateX(var(--motion-rx,0deg)) rotateY(var(--motion-ry,0deg)); }
        .aura-intelligence-art { transform: translate3d(var(--intelligence-px,0px),var(--intelligence-py,0px),0) rotateX(var(--intelligence-rx,0deg)) rotateY(var(--intelligence-ry,0deg)); }

        .aura-material-optics { opacity: var(--material-optic-opacity,.72); transform: translate3d(var(--material-optic-x,0px),var(--material-optic-y,0px),12px) rotate(var(--material-optic-r,0deg)); }
        .aura-sensor-optics { opacity: var(--sensor-optic-opacity,.72); transform: translate3d(var(--sensor-optic-x,0px),var(--sensor-optic-y,0px),12px) rotate(var(--sensor-optic-r,0deg)); }
        .aura-motion-optics { opacity: var(--motion-optic-opacity,.78); transform: translate3d(var(--motion-optic-x,0px),var(--motion-optic-y,0px),16px) rotate(var(--motion-optic-r,0deg)); }
        .aura-intelligence-optics { opacity: var(--intelligence-optic-opacity,.76); transform: translate3d(var(--intelligence-optic-x,0px),var(--intelligence-optic-y,0px),14px) rotate(var(--intelligence-optic-r,0deg)); }

        .aura-optics-volume { transform-box: fill-box; transform-origin: center; animation: optics-volume-drift 9.6s ease-in-out infinite; }
        .aura-motion-optics .aura-optics-volume { animation-duration: 6.4s; }
        .aura-intelligence-optics .aura-optics-volume { animation-duration: 12.5s; }
        .aura-optics-scratches { transform-box: fill-box; transform-origin: center; animation: optics-scratch-shimmer 8.8s ease-in-out infinite; }
        .aura-optics-spectral-pass { stroke-dasharray: 180 290; animation: optics-spectral-run 7.8s cubic-bezier(.4,0,.2,1) infinite; }
        .aura-motion-optics .aura-optics-spectral-pass { animation-duration: 5.9s; }
        .aura-intelligence-optics .aura-optics-spectral-pass { animation-duration: 10.8s; }
        .aura-optics-edge-bloom { animation: optics-edge-breathe 6.6s ease-in-out infinite; }
        .aura-optics-glints { transform-box: fill-box; transform-origin: center; animation: optics-glint-drift 5.7s ease-in-out infinite; }
        .aura-optics-refraction { opacity: .52; }
        .aura-optics-edge-cyan, .aura-optics-edge-prism { opacity: .68; }

        .aura-material-main, .aura-sensor-main, .aura-motion-main, .aura-intelligence-main { transform-box: fill-box; transform-origin: center; transition: transform 220ms ease-out; }
        .aura-material-main { transform: translate3d(var(--material-main-x,0px),var(--material-main-y,0px),0); }
        .aura-sensor-main { transform: translate3d(var(--sensor-main-x,0px),var(--sensor-main-y,0px),0); }
        .aura-motion-main { transform: translate3d(var(--motion-main-x,0px),var(--motion-main-y,0px),0); }
        .aura-intelligence-main { transform: translate3d(var(--intelligence-main-x,0px),var(--intelligence-main-y,0px),0); }

        .aura-material-dust-field { transform-box: fill-box; transform-origin: center; animation: material-dust-drift 7.6s ease-in-out infinite; }
        .aura-material-particles { animation: material-particle-drift 5.8s ease-in-out infinite; }
        .aura-material-sheen { transform-box: fill-box; transform-origin: center; animation: material-sheen-pass 6.8s cubic-bezier(.4,0,.2,1) 1.1s infinite; }
        .aura-sensor-aura { transform-box: fill-box; transform-origin: center; animation: sensor-aura-breathe 5.8s ease-in-out infinite; }
        .aura-sensor-pulses { transform-box: fill-box; transform-origin: center; animation: sensor-pulse 2.8s ease-in-out infinite; }
        .aura-sensor-sheen { transform-box: fill-box; transform-origin: center; animation: sensor-sheen-pass 7.4s cubic-bezier(.4,0,.2,1) 1.4s infinite; }
        .aura-motion-aura { transform-box: fill-box; transform-origin: center; animation: motion-aura-drift 6.2s ease-in-out infinite; }
        .aura-motion-trails { animation: motion-trail-flow 3.8s ease-in-out infinite; }
        .aura-motion-sheen { transform-box: fill-box; transform-origin: center; animation: motion-sheen-pass 5.9s cubic-bezier(.3,0,.2,1) .8s infinite; }
        .aura-intelligence-core { transform-box: fill-box; transform-origin: center; animation: intelligence-core-pulse 5.4s ease-in-out infinite; }
        .aura-intelligence-orbit { transform-box: fill-box; transform-origin: center; animation: intelligence-orbit 36s linear infinite; }
        .aura-intelligence-sheen { transform-box: fill-box; transform-origin: center; animation: intelligence-sheen-pass 7.8s cubic-bezier(.4,0,.2,1) 1.8s infinite; }

        .aura-material-shard, .aura-sensor-fragment, .aura-motion-fragment, .aura-intelligence-fragment { transform-box: fill-box; transform-origin: center; transition: transform 220ms ease-out; }
        ${Array.from({ length: 8 }, (_, index) => `.aura-material-shard-${index + 1}{transform:translate3d(var(--material-f${index + 1}-x,0px),var(--material-f${index + 1}-y,0px),0) rotate(var(--material-f${index + 1}-r,0deg));}`).join("")}
        ${Array.from({ length: 5 }, (_, index) => `.aura-sensor-fragment-${index + 1}{transform:translate3d(var(--sensor-f${index + 1}-x,0px),var(--sensor-f${index + 1}-y,0px),0) rotate(var(--sensor-f${index + 1}-r,0deg));}`).join("")}
        ${Array.from({ length: 6 }, (_, index) => `.aura-motion-fragment-${index + 1}{transform:translate3d(var(--motion-f${index + 1}-x,0px),var(--motion-f${index + 1}-y,0px),0) rotate(var(--motion-f${index + 1}-r,0deg));}`).join("")}
        ${Array.from({ length: 6 }, (_, index) => `.aura-intelligence-fragment-${index + 1}{transform:translate3d(var(--intelligence-f${index + 1}-x,0px),var(--intelligence-f${index + 1}-y,0px),0) rotate(var(--intelligence-f${index + 1}-r,0deg));}`).join("")}

        @media (max-width:1023px) {
          .aura-material-art, .aura-story-art, .aura-optics { inset: -8% -6% -10%; transform:none !important; }
          .aura-material-art, .aura-story-art { opacity:.92; }
          .aura-optics { opacity:.42 !important; mix-blend-mode:normal; filter:none; }
          .aura-optics-refraction, .aura-optics-scratches, .aura-optics-edge-prism { display:none; }
          .aura-optics-volume { opacity:.54; }
        }

        @media (max-width:639px) {
          .aura-optics { opacity:.30 !important; }
          .aura-optics-edge-bloom { opacity:.18; }
          .aura-optics-glints { display:none; }
        }

        @media (prefers-reduced-motion:reduce) {
          .aura-material-art, .aura-story-art, .aura-optics,
          .aura-material-dust-field, .aura-material-particles, .aura-material-sheen,
          .aura-sensor-aura, .aura-sensor-pulses, .aura-sensor-sheen,
          .aura-motion-aura, .aura-motion-trails, .aura-motion-sheen,
          .aura-intelligence-core, .aura-intelligence-orbit, .aura-intelligence-sheen,
          .aura-optics-volume, .aura-optics-scratches, .aura-optics-spectral-pass,
          .aura-optics-edge-bloom, .aura-optics-glints {
            animation:none !important;
            transform:none !important;
          }
          .aura-material-shard, .aura-sensor-fragment, .aura-motion-fragment, .aura-intelligence-fragment { transform:none !important; }
        }
      `}</style>

      <div id="aura-scroll-product" className="aura-scroll-product">
        <div className="aura-scroll-product-inner">{children}</div>
      </div>

      {targets.material ? createPortal(<><MaterialGlassArtwork /><MaterialGlassOptics /></>, targets.material) : null}
      {targets.sensor ? createPortal(<><SensorArrayGlassArtwork /><SensorGlassOptics /></>, targets.sensor) : null}
      {targets.motion ? createPortal(<><MotionStoryGlassArtwork /><MotionGlassOptics /></>, targets.motion) : null}
      {targets.intelligence ? createPortal(<><IntelligenceGlassArtwork /><IntelligenceGlassOptics /></>, targets.intelligence) : null}
    </>
  );
}
