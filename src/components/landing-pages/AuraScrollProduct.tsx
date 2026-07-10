"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

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

const shardFactors = [
  [-0.45, -0.50, -2, 2], [-0.30, -0.70, 1, -2], [0.35, -0.60, -1, 2.5], [0.62, -0.18, 2, -2],
  [0.58, 0.45, -2, 2], [0.28, 0.68, 1, 2], [-0.28, 0.65, -1, -2], [-0.62, 0.28, 2, 2]
] as const;

export function AuraScrollProduct({ children }: { children: ReactNode }) {
  const [materialTarget, setMaterialTarget] = useState<Element | null>(null);

  useEffect(() => {
    const page = document.getElementById("aura-page");
    const product = document.getElementById("aura-scroll-product");
    const story = document.getElementById("aura-story");
    const afterStory = document.getElementById("aura-after-story");
    const materialHost = document.querySelector<HTMLElement>("#design > div");

    if (materialHost) setMaterialTarget(materialHost);
    if (!page || !product || !story || !afterStory) return;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
    let ticking = false;

    const setShardVars = (nx: number, ny: number, progress: number) => {
      if (!materialHost) return;
      shardFactors.forEach(([fx, fy, baseRotation, scrollRotation], index) => {
        const shard = index + 1;
        materialHost.style.setProperty(`--material-s${shard}-x`, `${(nx * 10 * fx).toFixed(2)}px`);
        materialHost.style.setProperty(`--material-s${shard}-y`, `${(ny * 8 * fy).toFixed(2)}px`);
        materialHost.style.setProperty(`--material-s${shard}-r`, `${(baseRotation + progress * scrollRotation).toFixed(2)}deg`);
      });
    };

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
        left = leftTarget; top = topTarget; scale = scaleTarget;
      }

      page.style.setProperty("--aura-left", `${left.toFixed(2)}vw`);
      page.style.setProperty("--aura-top", `${top.toFixed(2)}vh`);
      page.style.setProperty("--aura-scale", scale.toFixed(3));
      page.style.setProperty("--aura-opacity", opacity.toFixed(3));

      if (materialHost) {
        const rect = materialHost.getBoundingClientRect();
        const progress = clamp((vh - rect.top) / Math.max(vh + rect.height, 1), 0, 1);
        materialHost.style.setProperty("--material-main-x", `${((progress - 0.5) * 5).toFixed(2)}px`);
        materialHost.style.setProperty("--material-main-y", `${((progress - 0.5) * -8).toFixed(2)}px`);
        setShardVars(0, 0, progress);
      }

      if (y >= fadeEnd || opacity <= 0.02) product.classList.add("is-hidden");
      else product.classList.remove("is-hidden");
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!materialHost || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = materialHost.getBoundingClientRect();
      const nx = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1) - 0.5;
      const ny = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1) - 0.5;
      materialHost.style.setProperty("--material-rx", `${(-ny * 4.2).toFixed(2)}deg`);
      materialHost.style.setProperty("--material-ry", `${(nx * 5.4).toFixed(2)}deg`);
      materialHost.style.setProperty("--material-px", `${(nx * 10).toFixed(2)}px`);
      materialHost.style.setProperty("--material-py", `${(ny * 8).toFixed(2)}px`);
      setShardVars(nx, ny, 0.5);
    };

    const resetPointer = () => {
      if (!materialHost) return;
      materialHost.style.setProperty("--material-rx", "0deg");
      materialHost.style.setProperty("--material-ry", "0deg");
      materialHost.style.setProperty("--material-px", "0px");
      materialHost.style.setProperty("--material-py", "0px");
      setShardVars(0, 0, 0.5);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    materialHost?.addEventListener("pointermove", handlePointerMove);
    materialHost?.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      materialHost?.removeEventListener("pointermove", handlePointerMove);
      materialHost?.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <>
      <style>{`
        #design > div {
          --material-rx: 0deg; --material-ry: 0deg; --material-px: 0px; --material-py: 0px;
          --material-main-x: 0px; --material-main-y: 0px;
          isolation: isolate; perspective: 1200px;
        }
        #design .aura-shatter-dust, #design .aura-crack-overlay, #design .aura-glass-chip { display: none !important; }
        #design .aura-shatter-panel, #design .aura-shatter-panel-a {
          overflow: visible !important; clip-path: none !important; border: 0 !important; background: transparent !important;
          box-shadow: none !important; backdrop-filter: none !important;
        }
        #design .aura-shatter-panel::before, #design .aura-shatter-panel::after { display: none !important; }
        #design .aura-shatter-panel > *:not(.aura-material-art) { position: relative; z-index: 4; }

        @keyframes material-art-enter {
          0% { opacity: 0; transform: translate3d(0,42px,0) scale(.94) rotateX(5deg); filter: blur(9px) drop-shadow(0 12px 30px rgba(0,0,0,.18)); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1) rotateX(0); filter: blur(0) drop-shadow(0 34px 72px rgba(0,0,0,.30)); }
        }
        @keyframes material-sheen-pass {
          0%,18% { transform: translateX(-240px) rotate(18deg); opacity: 0; }
          34% { opacity: .46; } 58% { opacity: .18; }
          76%,100% { transform: translateX(1260px) rotate(18deg); opacity: 0; }
        }
        @keyframes material-dust-drift {
          0%,100% { transform: translate3d(-4px,3px,0) scale(.99); opacity: .24; }
          50% { transform: translate3d(7px,-8px,0) scale(1.035); opacity: .35; }
        }
        @keyframes material-particle-drift {
          0%,100% { transform: translate3d(0,0,0); opacity: .58; }
          50% { transform: translate3d(5px,-7px,0); opacity: .9; }
        }

        .aura-material-art {
          position: absolute; inset: -16% -19% -18% -17%; z-index: 0; pointer-events: none;
          transform-style: preserve-3d;
          transform: translate3d(var(--material-px),var(--material-py),0) rotateX(var(--material-rx)) rotateY(var(--material-ry));
          transition: transform 180ms cubic-bezier(.2,.8,.2,1);
          animation: material-art-enter 1.05s cubic-bezier(.2,.85,.2,1) both;
          filter: drop-shadow(0 34px 72px rgba(0,0,0,.30));
        }
        .aura-material-main { transform-box: fill-box; transform-origin: center; transform: translate3d(var(--material-main-x),var(--material-main-y),0); transition: transform 220ms ease-out; }
        .aura-material-dust-field { transform-box: fill-box; transform-origin: center; animation: material-dust-drift 7.6s ease-in-out infinite; }
        .aura-material-particles { animation: material-particle-drift 5.8s ease-in-out infinite; }
        .aura-material-sheen { transform-box: fill-box; transform-origin: center; animation: material-sheen-pass 6.8s cubic-bezier(.4,0,.2,1) 1.1s infinite; }
        .aura-material-shard { transform-box: fill-box; transform-origin: center; transition: transform 220ms ease-out; }
        .aura-material-shard-1 { transform: translate3d(var(--material-s1-x,0px),var(--material-s1-y,0px),0) rotate(var(--material-s1-r,-1deg)); }
        .aura-material-shard-2 { transform: translate3d(var(--material-s2-x,0px),var(--material-s2-y,0px),0) rotate(var(--material-s2-r,0deg)); }
        .aura-material-shard-3 { transform: translate3d(var(--material-s3-x,0px),var(--material-s3-y,0px),0) rotate(var(--material-s3-r,0deg)); }
        .aura-material-shard-4 { transform: translate3d(var(--material-s4-x,0px),var(--material-s4-y,0px),0) rotate(var(--material-s4-r,1deg)); }
        .aura-material-shard-5 { transform: translate3d(var(--material-s5-x,0px),var(--material-s5-y,0px),0) rotate(var(--material-s5-r,-1deg)); }
        .aura-material-shard-6 { transform: translate3d(var(--material-s6-x,0px),var(--material-s6-y,0px),0) rotate(var(--material-s6-r,1deg)); }
        .aura-material-shard-7 { transform: translate3d(var(--material-s7-x,0px),var(--material-s7-y,0px),0) rotate(var(--material-s7-r,-1deg)); }
        .aura-material-shard-8 { transform: translate3d(var(--material-s8-x,0px),var(--material-s8-y,0px),0) rotate(var(--material-s8-r,1deg)); }

        @media (max-width:1023px) { .aura-material-art { inset: -8% -6% -10%; opacity:.92; transform:none; } }
        @media (prefers-reduced-motion:reduce) {
          .aura-material-art,.aura-material-dust-field,.aura-material-particles,.aura-material-sheen { animation:none !important; transform:none !important; }
          .aura-material-shard { transform:none !important; }
        }
      `}</style>

      <div id="aura-scroll-product" className="aura-scroll-product"><div className="aura-scroll-product-inner">{children}</div></div>
      {materialTarget ? createPortal(<MaterialGlassArtwork />, materialTarget) : null}
    </>
  );
}
