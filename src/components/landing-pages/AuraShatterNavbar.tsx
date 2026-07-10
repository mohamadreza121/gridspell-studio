"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";

type NavStage = "compact" | "expanded" | "shattered";

const startHref =
  "/start-project?package=landing-page&source=product-3d-launch&design=3D+Product+Launch";

function ShatterLines() {
  return (
    <svg
      className="aura-premium-nav-cracks"
      viewBox="0 0 1200 96"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="aura-premium-nav-crack-group">
        <path d="M188 0 L222 29 L204 53 L247 96" />
        <path d="M222 29 L271 18 L305 0" />
        <path d="M222 29 L281 51 L327 43" />
        <path d="M222 29 L176 57 L141 96" />
        <path d="M924 0 L901 23 L919 48 L876 96" />
        <path d="M901 23 L850 13 L818 0" />
        <path d="M919 48 L976 57 L1024 96" />
        <path d="M901 23 L952 17 L990 0" />
        <path d="M570 0 L583 24 L565 46 L592 68 L582 96" />
        <path d="M583 24 L625 12 L656 0" />
        <path d="M565 46 L526 62 L498 96" />
      </g>
      <g className="aura-premium-nav-crack-hotspots">
        <circle cx="222" cy="29" r="2.8" />
        <circle cx="901" cy="23" r="2.8" />
        <circle cx="583" cy="24" r="2.2" />
      </g>
    </svg>
  );
}

function AuraShatterNavbar() {
  const [stage, setStage] = useState<NavStage>("compact");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setStage("shattered");
      return;
    }

    const expandTimer = window.setTimeout(() => setStage("expanded"), 430);
    const shatterTimer = window.setTimeout(() => setStage("shattered"), 1220);

    return () => {
      window.clearTimeout(expandTimer);
      window.clearTimeout(shatterTimer);
    };
  }, []);

  return (
    <>
      <nav
        className={`aura-premium-nav aura-premium-nav-${stage}`}
        aria-label="AURA product navigation"
      >
        <div className="aura-premium-nav-shadow" aria-hidden="true" />
        <div className="aura-premium-nav-depth" aria-hidden="true" />

        <div className="aura-premium-nav-glass">
          <div className="aura-premium-nav-reflection" aria-hidden="true" />
          <div className="aura-premium-nav-impact" aria-hidden="true" />
          <ShatterLines />

          <div className="aura-premium-nav-content">
            <Link href="/landing-pages" className="aura-premium-nav-action aura-premium-nav-gallery">
              <ArrowLeft className="h-4 w-4" />
              <span>Gallery</span>
            </Link>

            <div className="aura-premium-nav-center">
              <div className="aura-premium-nav-seed" aria-hidden={stage !== "compact"}>
                <Sparkles className="h-4 w-4" />
                <span>AURA X1</span>
              </div>

              <div className="aura-premium-nav-links">
                <a href="#design">Design</a>
                <a href="#sensors">Sensors</a>
                <a href="#motion">Motion</a>
                <a href="#specs">Specs</a>
              </div>
            </div>

            <Link href={startHref} className="aura-premium-nav-action aura-premium-nav-preorder">
              <span>Pre-order</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <span className="aura-premium-nav-shard aura-premium-nav-shard-1" aria-hidden="true" />
        <span className="aura-premium-nav-shard aura-premium-nav-shard-2" aria-hidden="true" />
        <span className="aura-premium-nav-shard aura-premium-nav-shard-3" aria-hidden="true" />
        <span className="aura-premium-nav-shard aura-premium-nav-shard-4" aria-hidden="true" />
      </nav>

      <style>{`
        #aura-page > .aura-nav { display: none !important; }

        @keyframes aura-premium-nav-arrive {
          0% { opacity: 0; transform: translate3d(-50%, -28px, 0) scale(.84); filter: blur(12px); }
          100% { opacity: 1; transform: translate3d(-50%, 0, 0) scale(1); filter: blur(0); }
        }

        @keyframes aura-premium-nav-impact-shake {
          0%, 100% { transform: translate3d(-50%, 0, 0) rotate(0deg); }
          18% { transform: translate3d(calc(-50% + 2px), -1px, 0) rotate(.12deg); }
          34% { transform: translate3d(calc(-50% - 4px), 2px, 0) rotate(-.22deg); }
          49% { transform: translate3d(calc(-50% + 3px), 1px, 0) rotate(.18deg); }
          64% { transform: translate3d(calc(-50% - 2px), -1px, 0) rotate(-.10deg); }
          82% { transform: translate3d(calc(-50% + 1px), 0, 0) rotate(.05deg); }
        }

        @keyframes aura-premium-nav-impact-flash {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.18); }
          24% { opacity: .96; transform: translate(-50%, -50%) scale(.72); }
          52% { opacity: .34; transform: translate(-50%, -50%) scale(1.35); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.1); }
        }

        @keyframes aura-premium-nav-reflection-pass {
          0%, 16% { opacity: 0; transform: translateX(-160%) skewX(-17deg); }
          31% { opacity: .72; }
          58% { opacity: .18; }
          78%, 100% { opacity: 0; transform: translateX(260%) skewX(-17deg); }
        }

        @keyframes aura-premium-nav-shard-1 {
          from { opacity: 0; transform: translate3d(20px, 12px, 0) rotate(2deg) scale(.5); }
          to { opacity: .9; transform: translate3d(-17px, -13px, 0) rotate(-17deg) scale(1); }
        }
        @keyframes aura-premium-nav-shard-2 {
          from { opacity: 0; transform: translate3d(-18px, 10px, 0) rotate(-2deg) scale(.5); }
          to { opacity: .82; transform: translate3d(16px, -10px, 0) rotate(14deg) scale(1); }
        }
        @keyframes aura-premium-nav-shard-3 {
          from { opacity: 0; transform: translate3d(14px, -8px, 0) rotate(0deg) scale(.5); }
          to { opacity: .76; transform: translate3d(-11px, 15px, 0) rotate(12deg) scale(1); }
        }
        @keyframes aura-premium-nav-shard-4 {
          from { opacity: 0; transform: translate3d(-14px, -8px, 0) rotate(0deg) scale(.5); }
          to { opacity: .72; transform: translate3d(13px, 14px, 0) rotate(-12deg) scale(1); }
        }

        .aura-premium-nav {
          --nav-width: 11.5rem;
          --nav-height: 3.55rem;
          --nav-clip: polygon(0 0,100% 0,100% 100%,0 100%);
          position: fixed;
          left: 50%;
          top: clamp(5.6rem, 9vh, 7rem);
          z-index: 80;
          width: var(--nav-width);
          height: var(--nav-height);
          transform: translateX(-50%);
          perspective: 1200px;
          pointer-events: none;
          animation: aura-premium-nav-arrive .62s cubic-bezier(.2,.85,.2,1) .08s both;
          transition: width .72s cubic-bezier(.16,1,.3,1), height .62s cubic-bezier(.16,1,.3,1);
          will-change: width, height, transform;
        }

        .aura-premium-nav-expanded,
        .aura-premium-nav-shattered {
          --nav-width: min(72rem, calc(100vw - 2.25rem));
          --nav-height: 5.15rem;
          pointer-events: auto;
        }

        .aura-premium-nav-shattered {
          --nav-height: 5.45rem;
          --nav-clip: polygon(0 15%,3.2% 0,24% 3%,31% 0,55% 1%,62% 0,83% 4%,96% 0,100% 22%,98.2% 61%,100% 82%,96.5% 100%,72% 96%,65% 100%,36% 97%,27% 100%,4% 95%,0 74%,1.7% 42%);
          animation: aura-premium-nav-impact-shake .44s cubic-bezier(.2,.85,.2,1) both;
        }

        .aura-premium-nav-shadow {
          position: absolute;
          left: 5%;
          right: 5%;
          bottom: -1.45rem;
          height: 2.35rem;
          border-radius: 50%;
          background: rgba(0,0,0,.58);
          filter: blur(24px);
          opacity: .72;
          transform: translateZ(-24px) scaleX(.92);
          transition: opacity .5s ease, left .7s ease, right .7s ease;
        }

        .aura-premium-nav-depth {
          position: absolute;
          inset: 7px 5px -9px;
          clip-path: var(--nav-clip);
          background:
            linear-gradient(180deg, rgba(196,239,247,.16), rgba(8,15,22,.92) 42%, rgba(2,6,12,.98)),
            rgba(7,12,18,.96);
          border: 1px solid rgba(166,235,246,.14);
          box-shadow: 0 28px 70px rgba(0,0,0,.42), 0 9px 24px rgba(0,0,0,.48);
          transform: translateZ(-18px) rotateX(-4deg);
          transition: clip-path .36s ease, inset .62s cubic-bezier(.16,1,.3,1);
        }

        .aura-premium-nav-glass {
          position: absolute;
          inset: 0;
          overflow: hidden;
          clip-path: var(--nav-clip);
          border: 1px solid rgba(220,251,255,.24);
          border-radius: 13px;
          background:
            radial-gradient(circle at 19% 0%, rgba(255,255,255,.18), transparent 30%),
            radial-gradient(circle at 82% 100%, rgba(34,211,238,.13), transparent 34%),
            linear-gradient(112deg, rgba(255,255,255,.12), rgba(255,255,255,.035) 38%, rgba(4,10,16,.78) 68%, rgba(255,255,255,.075)),
            rgba(5,10,16,.72);
          box-shadow:
            0 32px 100px rgba(0,0,0,.46),
            0 12px 34px rgba(0,0,0,.34),
            inset 0 1px 0 rgba(255,255,255,.30),
            inset 0 -2px 0 rgba(124,225,240,.10),
            inset 14px 0 34px rgba(255,255,255,.025);
          backdrop-filter: blur(30px) saturate(1.28);
          -webkit-backdrop-filter: blur(30px) saturate(1.28);
          transform-style: preserve-3d;
          transition: clip-path .36s ease, border-radius .38s ease, box-shadow .6s ease;
        }

        .aura-premium-nav-shattered .aura-premium-nav-glass {
          border-radius: 0;
          border-color: rgba(220,251,255,.31);
          box-shadow:
            0 38px 130px rgba(0,0,0,.52),
            0 12px 36px rgba(0,0,0,.40),
            0 0 42px rgba(103,232,249,.09),
            inset 0 1px 0 rgba(255,255,255,.34),
            inset 0 -2px 0 rgba(103,232,249,.14);
        }

        .aura-premium-nav-glass::before,
        .aura-premium-nav-glass::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .aura-premium-nav-glass::before {
          inset: 1px;
          clip-path: var(--nav-clip);
          border: 1px solid rgba(255,255,255,.07);
        }

        .aura-premium-nav-glass::after {
          left: 7%;
          right: 7%;
          top: 0;
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.78),rgba(103,232,249,.36),transparent);
          filter: drop-shadow(0 0 8px rgba(165,243,252,.28));
        }

        .aura-premium-nav-reflection {
          position: absolute;
          top: -45%;
          bottom: -45%;
          left: -16%;
          width: 14%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.34),rgba(165,243,252,.16),transparent);
          filter: blur(7px);
          opacity: 0;
          pointer-events: none;
        }

        .aura-premium-nav-expanded .aura-premium-nav-reflection,
        .aura-premium-nav-shattered .aura-premium-nav-reflection {
          animation: aura-premium-nav-reflection-pass 4.8s cubic-bezier(.4,0,.2,1) 1.6s infinite;
        }

        .aura-premium-nav-impact {
          position: absolute;
          left: 50%;
          top: 16%;
          width: 4.4rem;
          height: 4.4rem;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(255,255,255,.94) 0 3%,rgba(165,243,252,.56) 8%,rgba(34,211,238,.16) 28%,transparent 70%);
          filter: blur(.2px) drop-shadow(0 0 18px rgba(103,232,249,.52));
          opacity: 0;
          pointer-events: none;
        }

        .aura-premium-nav-shattered .aura-premium-nav-impact {
          animation: aura-premium-nav-impact-flash .64s cubic-bezier(.2,.85,.2,1) both;
        }

        .aura-premium-nav-content {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 100%;
          padding: .72rem .9rem;
          gap: 1rem;
        }

        .aura-premium-nav-action,
        .aura-premium-nav-links {
          opacity: 0;
          transform: translateY(8px) scale(.96);
          transition: opacity .34s ease .24s, transform .48s cubic-bezier(.2,.85,.2,1) .2s;
        }

        .aura-premium-nav-expanded .aura-premium-nav-action,
        .aura-premium-nav-expanded .aura-premium-nav-links,
        .aura-premium-nav-shattered .aura-premium-nav-action,
        .aura-premium-nav-shattered .aura-premium-nav-links {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .aura-premium-nav-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3.55rem;
          width: fit-content;
          gap: .7rem;
          padding: 0 1.15rem;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px;
          background: linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.035));
          color: rgba(237,250,252,.72);
          font-size: .7rem;
          font-weight: 900;
          letter-spacing: .19em;
          text-transform: uppercase;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.13), 0 12px 24px rgba(0,0,0,.18);
          transition: opacity .34s ease .24s, transform .48s cubic-bezier(.2,.85,.2,1) .2s, background .2s ease, border-color .2s ease, color .2s ease;
        }

        .aura-premium-nav-action:hover {
          color: white;
          border-color: rgba(165,243,252,.28);
          background: linear-gradient(180deg,rgba(165,243,252,.13),rgba(255,255,255,.05));
          transform: translateY(-2px) !important;
        }

        .aura-premium-nav-gallery { justify-self: start; }
        .aura-premium-nav-preorder {
          justify-self: end;
          border-color: rgba(103,232,249,.26);
          color: rgb(207,250,254);
          background: linear-gradient(180deg,rgba(34,211,238,.13),rgba(8,47,73,.12));
          box-shadow: inset 0 1px 0 rgba(224,252,255,.18), 0 0 28px rgba(34,211,238,.08);
        }

        .aura-premium-nav-center {
          position: relative;
          display: grid;
          place-items: center;
          min-width: 21rem;
        }

        .aura-premium-nav-seed {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          color: rgb(207,250,254);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(103,232,249,.34);
          transition: opacity .24s ease, transform .32s ease;
        }

        .aura-premium-nav-expanded .aura-premium-nav-seed,
        .aura-premium-nav-shattered .aura-premium-nav-seed {
          opacity: 0;
          transform: scale(.82);
        }

        .aura-premium-nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1.4rem,3vw,2.8rem);
        }

        .aura-premium-nav-links a {
          position: relative;
          color: rgba(226,232,240,.53);
          font-size: .71rem;
          font-weight: 900;
          letter-spacing: .20em;
          text-transform: uppercase;
          transition: color .2s ease, text-shadow .2s ease;
        }

        .aura-premium-nav-links a::after {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: -.65rem;
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(103,232,249,.72),transparent);
          transform: scaleX(0);
          transition: transform .25s ease;
        }

        .aura-premium-nav-links a:hover {
          color: white;
          text-shadow: 0 0 18px rgba(103,232,249,.32);
        }
        .aura-premium-nav-links a:hover::after { transform: scaleX(1); }

        .aura-premium-nav-cracks {
          position: absolute;
          inset: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          transition: opacity .14s ease;
        }

        .aura-premium-nav-shattered .aura-premium-nav-cracks { opacity: .62; }
        .aura-premium-nav-crack-group path {
          fill: none;
          stroke: rgba(224,252,255,.54);
          stroke-width: .78;
          vector-effect: non-scaling-stroke;
          filter: drop-shadow(0 0 5px rgba(103,232,249,.22));
        }
        .aura-premium-nav-crack-hotspots circle {
          fill: rgba(255,255,255,.90);
          filter: drop-shadow(0 0 8px rgba(103,232,249,.68));
        }

        .aura-premium-nav-shard {
          position: absolute;
          z-index: -1;
          opacity: 0;
          border: 1px solid rgba(224,252,255,.36);
          background: linear-gradient(135deg,rgba(255,255,255,.19),rgba(103,232,249,.055),rgba(4,10,16,.60));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 15px 28px rgba(0,0,0,.34);
          backdrop-filter: blur(18px);
          pointer-events: none;
        }

        .aura-premium-nav-shard-1 { left: 2.7%; top: -8px; width: 3.8rem; height: 1.65rem; clip-path: polygon(0 14%,82% 0,100% 68%,18% 100%); }
        .aura-premium-nav-shard-2 { right: 2.8%; top: -6px; width: 3.3rem; height: 1.5rem; clip-path: polygon(12% 0,100% 18%,78% 100%,0 72%); }
        .aura-premium-nav-shard-3 { left: 22%; bottom: -7px; width: 2.8rem; height: 1.45rem; clip-path: polygon(0 28%,78% 0,100% 82%,18% 100%); }
        .aura-premium-nav-shard-4 { right: 25%; bottom: -8px; width: 3rem; height: 1.5rem; clip-path: polygon(18% 0,100% 30%,72% 100%,0 68%); }

        .aura-premium-nav-shattered .aura-premium-nav-shard-1 { animation: aura-premium-nav-shard-1 .48s cubic-bezier(.2,.85,.2,1) both; }
        .aura-premium-nav-shattered .aura-premium-nav-shard-2 { animation: aura-premium-nav-shard-2 .48s cubic-bezier(.2,.85,.2,1) .03s both; }
        .aura-premium-nav-shattered .aura-premium-nav-shard-3 { animation: aura-premium-nav-shard-3 .5s cubic-bezier(.2,.85,.2,1) .05s both; }
        .aura-premium-nav-shattered .aura-premium-nav-shard-4 { animation: aura-premium-nav-shard-4 .5s cubic-bezier(.2,.85,.2,1) .02s both; }

        @media (max-width: 767px) {
          .aura-premium-nav { top: 5.25rem; }
          .aura-premium-nav-expanded,
          .aura-premium-nav-shattered {
            --nav-width: calc(100vw - 1rem);
            --nav-height: 4.45rem;
          }
          .aura-premium-nav-content { grid-template-columns: 1fr auto 1fr; padding: .48rem .52rem; gap: .35rem; }
          .aura-premium-nav-center { min-width: 0; }
          .aura-premium-nav-links { display: none; }
          .aura-premium-nav-action { min-height: 3.15rem; padding: 0 .78rem; font-size: .61rem; letter-spacing: .13em; }
          .aura-premium-nav-gallery span { display: none; }
          .aura-premium-nav-seed { position: relative; opacity: 1 !important; transform: none !important; font-size: .62rem; white-space: nowrap; }
          .aura-premium-nav-cracks { opacity: .40; }
          .aura-premium-nav-shard { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .aura-premium-nav,
          .aura-premium-nav-reflection,
          .aura-premium-nav-impact,
          .aura-premium-nav-shard { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}

export function AuraShatterNavbarPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.body);
  }, []);

  return target ? createPortal(<AuraShatterNavbar />, target) : null;
}
