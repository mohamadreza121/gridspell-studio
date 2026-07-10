"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  BatteryCharging,
  Layers,
  Ruler,
  ShieldCheck,
  Waves,
  type LucideIcon
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type SystemKey = "material" | "signals" | "power" | "protection";

type EngineeringSystem = {
  key: SystemKey;
  code: string;
  label: string;
  value: string;
  metric: string;
  description: string;
  items: string[];
  Icon: LucideIcon;
};

const systems: EngineeringSystem[] = [
  {
    key: "material",
    code: "MAT / 01",
    label: "Material system",
    value: "Ti",
    metric: "Aerospace titanium",
    description: "A brushed titanium shell protects a recessed graphite sensor channel without adding visual weight.",
    items: ["Titanium outer shell", "Brushed silver finish", "Graphite inner channel"],
    Icon: Layers
  },
  {
    key: "signals",
    code: "SIG / 02",
    label: "Signal architecture",
    value: "05",
    metric: "Sensor nodes",
    description: "Optical, thermal, and motion hardware work together as one continuous sensing array.",
    items: ["Heart rhythm", "Temperature trend", "Motion and recovery"],
    Icon: Activity
  },
  {
    key: "power",
    code: "PWR / 03",
    label: "Power system",
    value: "6D",
    metric: "Nominal battery",
    description: "Low-power signal processing and magnetic charging keep the hardware active for nearly a full week.",
    items: ["Up to six days", "Magnetic aluminum dock", "Low-power processing"],
    Icon: BatteryCharging
  },
  {
    key: "protection",
    code: "PRT / 04",
    label: "Protection",
    value: "100M",
    metric: "Water resistance",
    description: "A sealed sensor chamber and rigid titanium construction are engineered for continuous daily wear.",
    items: ["10 ATM resistance", "Sealed sensor chamber", "Daily-wear construction"],
    Icon: ShieldCheck
  }
];

function MeasurementOverlay({ active }: { active: SystemKey }) {
  return (
    <div className={`aura-vault-measurements aura-vault-measurements-${active}`} aria-hidden="true">
      <svg viewBox="0 0 760 640" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vault-measure-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(103,232,249,0)" />
            <stop offset="0.5" stopColor="rgba(224,252,255,0.72)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.12)" />
          </linearGradient>
          <radialGradient id="vault-pressure" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(103,232,249,0.02)" />
            <stop offset="0.72" stopColor="rgba(103,232,249,0.08)" />
            <stop offset="1" stopColor="rgba(224,252,255,0.28)" />
          </radialGradient>
        </defs>

        <g className="aura-vault-dimension-lines">
          <path d="M150 142 H610" />
          <path d="M150 132 V153 M610 132 V153" />
          <path d="M118 188 V484" />
          <path d="M108 188 H129 M108 484 H129" />
          <path d="M210 536 H550" />
          <path d="M210 526 V547 M550 526 V547" />
        </g>

        <g className="aura-vault-material-overlay">
          <ellipse cx="380" cy="327" rx="232" ry="141" />
          <ellipse cx="380" cy="327" rx="178" ry="91" />
          <path d="M559 231 C636 197 670 165 706 112" />
          <path d="M202 411 C137 447 93 482 60 535" />
        </g>

        <g className="aura-vault-signal-overlay">
          {[224, 302, 380, 458, 536].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy={390 + Math.sin(index * 1.2) * 18} r="5" />
              <circle cx={x} cy={390 + Math.sin(index * 1.2) * 18} r="20" className="aura-vault-signal-bloom" />
            </g>
          ))}
          <path d="M224 390 C260 345 289 338 302 405 C322 503 354 237 380 390 C403 520 427 302 458 407 C481 482 511 360 536 380" />
        </g>

        <g className="aura-vault-power-overlay">
          <path d="M172 425 A242 242 0 0 1 590 202" />
          <path d="M190 448 A266 266 0 0 1 617 190" className="aura-vault-power-track" />
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = (-142 + index * 31) * (Math.PI / 180);
            const x = 380 + Math.cos(angle) * 252;
            const y = 332 + Math.sin(angle) * 202;
            return <circle key={index} cx={x} cy={y} r="5" />;
          })}
        </g>

        <g className="aura-vault-protection-overlay">
          <ellipse cx="380" cy="327" rx="274" ry="178" fill="url(#vault-pressure)" />
          <ellipse cx="380" cy="327" rx="236" ry="148" />
          <ellipse cx="380" cy="327" rx="198" ry="116" />
          <path d="M90 327 H670" />
        </g>
      </svg>

      <div className="aura-vault-label aura-vault-label-top">WIDTH / 21.4 MM</div>
      <div className="aura-vault-label aura-vault-label-left">PROFILE / 7.8 MM</div>
      <div className="aura-vault-label aura-vault-label-bottom">INNER ARRAY / 05</div>
      <div className="aura-vault-metric">
        <span>{active === "material" ? "Ti-6Al-4V" : active === "signals" ? "05 NODE" : active === "power" ? "6 DAY" : "10 ATM"}</span>
        <small>{active === "material" ? "shell alloy" : active === "signals" ? "signal array" : active === "power" ? "nominal" : "pressure"}</small>
      </div>
    </div>
  );
}

export function AuraEngineeringVault() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<SystemKey>("material");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`aura-engineering-vault ${entered ? "is-entered" : ""}`}
      data-active-system={active}
    >
      <div className="aura-vault-grid" aria-hidden="true" />
      <div className="aura-vault-glow aura-vault-glow-cyan" aria-hidden="true" />
      <div className="aura-vault-glow aura-vault-glow-violet" aria-hidden="true" />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="aura-vault-heading">
          <p className="aura-vault-eyebrow">
            <Ruler className="h-4 w-4" />
            AURA engineering / X1
          </p>

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <h2 className="max-w-[8ch] font-display text-[clamp(4.2rem,9vw,9.5rem)] font-medium leading-[0.76] tracking-[-0.095em] text-white">
              Every layer has a purpose.
            </h2>

            <div className="max-w-xl lg:justify-self-end lg:pb-3">
              <p className="text-base leading-8 text-white/52 sm:text-lg sm:leading-9">
                Explore the material, signal, power, and protection systems behind the same AURA X1 ring used throughout the product story.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[0.66rem] font-black uppercase tracking-[0.22em] text-cyan-100/42">
                <span>Precision shell</span><span>•</span><span>Layered sensing</span><span>•</span><span>Sealed hardware</span>
              </div>
            </div>
          </div>
        </div>

        <div className="aura-vault-chamber">
          <div className="aura-vault-depth" aria-hidden="true" />
          <div className="aura-vault-glass">
            <div className="aura-vault-reflection" aria-hidden="true" />
            <div className="aura-vault-topline" aria-hidden="true" />
            <div className="aura-vault-status" aria-hidden="true">
              <span className="aura-vault-status-dot" />
              Engineering view active
            </div>
            <div className="aura-vault-index" aria-hidden="true">AURA / SYSTEM ARCHITECTURE / 04</div>

            <div className="aura-vault-layout">
              <div className="aura-vault-stage">
                <div className="aura-vault-ring-target" aria-hidden="true" />
                <MeasurementOverlay active={active} />
                <div className="aura-vault-floor" aria-hidden="true" />
              </div>

              <div className="aura-vault-console">
                {systems.map(({ key, code, label, value, metric, description, items, Icon }, index) => (
                  <button
                    key={key}
                    type="button"
                    className={`aura-vault-system ${active === key ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(key)}
                    onFocus={() => setActive(key)}
                    onClick={() => setActive(key)}
                    aria-pressed={active === key}
                  >
                    <div className="aura-vault-system-index">0{index + 1}</div>
                    <div className="aura-vault-system-content">
                      <div className="aura-vault-system-head">
                        <span className="aura-vault-system-icon"><Icon className="h-4 w-4" /></span>
                        <span className="aura-vault-system-code">{code}</span>
                      </div>
                      <p className="aura-vault-system-label">{label}</p>
                      <div className="aura-vault-system-value-row">
                        <strong>{value}</strong>
                        <span>{metric}</span>
                      </div>
                      <p className="aura-vault-system-description">{description}</p>
                      <div className="aura-vault-system-items">
                        {items.map((item) => <span key={item}>{item}</span>)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .aura-engineering-vault { position:relative; overflow:hidden; min-height:100svh; background:#03060a; color:white; isolation:isolate; }
        .aura-engineering-vault::before { content:""; position:absolute; inset:0; z-index:-4; background:linear-gradient(180deg,#05080d 0%,#071019 44%,#03060a 100%); }
        .aura-vault-grid { position:absolute; inset:0; opacity:.22; background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px); background-size:58px 58px; mask-image:linear-gradient(to bottom,transparent,black 12%,black 88%,transparent); }
        .aura-vault-glow { position:absolute; border-radius:50%; filter:blur(110px); pointer-events:none; }
        .aura-vault-glow-cyan { left:-12rem; top:24%; width:42rem; height:30rem; background:rgba(34,211,238,.18); }
        .aura-vault-glow-violet { right:-10rem; bottom:2%; width:36rem; height:28rem; background:rgba(139,92,246,.14); }
        .aura-vault-heading { opacity:0; transform:translateY(34px); transition:opacity .9s ease,transform .9s cubic-bezier(.2,.85,.2,1); }
        .aura-engineering-vault.is-entered .aura-vault-heading { opacity:1; transform:none; }
        .aura-vault-eyebrow { display:inline-flex; align-items:center; gap:.7rem; margin-bottom:2rem; padding:.65rem .9rem; border:1px solid rgba(103,232,249,.20); background:rgba(103,232,249,.07); color:rgba(207,250,254,.78); font-size:.68rem; font-weight:900; letter-spacing:.24em; text-transform:uppercase; box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 18px 50px rgba(0,0,0,.20); backdrop-filter:blur(18px); clip-path:polygon(0 12%,7% 0,100% 0,100% 82%,94% 100%,0 100%); }
        .aura-vault-chamber { position:relative; margin-top:4rem; opacity:0; transform:translateY(55px) scale(.975); transition:opacity 1s ease .14s,transform 1.15s cubic-bezier(.16,1,.3,1) .14s; perspective:1500px; }
        .aura-engineering-vault.is-entered .aura-vault-chamber { opacity:1; transform:none; }
        .aura-vault-depth { position:absolute; inset:18px 22px -22px; clip-path:polygon(0 7%,3% 0,28% 1%,33% 0,74% 1%,79% 0,97% 2%,100% 9%,99% 87%,96% 100%,71% 98%,65% 100%,28% 98%,22% 100%,2% 96%,0 87%); background:linear-gradient(180deg,rgba(35,59,70,.32),rgba(1,5,9,.98) 48%); box-shadow:0 54px 120px rgba(0,0,0,.58); transform:translateZ(-42px) rotateX(-2deg); }
        .aura-vault-glass { position:relative; overflow:hidden; min-height:49rem; border:1px solid rgba(214,250,255,.20); clip-path:polygon(0 7%,3% 0,28% 1%,33% 0,74% 1%,79% 0,97% 2%,100% 9%,99% 87%,96% 100%,71% 98%,65% 100%,28% 98%,22% 100%,2% 96%,0 87%); background:radial-gradient(circle at 38% 42%,rgba(103,232,249,.10),transparent 27rem),linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.022) 34%,rgba(2,7,12,.78) 72%),rgba(5,11,17,.82); box-shadow:0 55px 150px rgba(0,0,0,.56),0 0 65px rgba(34,211,238,.05),inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(103,232,249,.12); backdrop-filter:blur(28px) saturate(1.2); }
        .aura-vault-reflection { position:absolute; inset:-25% auto -25% -20%; width:16%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),rgba(103,232,249,.08),transparent); filter:blur(8px); transform:skewX(-15deg); animation:aura-vault-reflection 9s ease-in-out infinite; pointer-events:none; }
        .aura-vault-topline { position:absolute; left:7%; right:7%; top:0; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,.84),rgba(103,232,249,.34),transparent); filter:drop-shadow(0 0 10px rgba(103,232,249,.24)); }
        .aura-vault-status,.aura-vault-index { position:absolute; top:1.35rem; z-index:10; font-size:.62rem; font-weight:900; letter-spacing:.22em; text-transform:uppercase; color:rgba(207,250,254,.46); }
        .aura-vault-status { left:2rem; display:flex; align-items:center; gap:.65rem; }
        .aura-vault-index { right:2rem; }
        .aura-vault-status-dot { width:.45rem; height:.45rem; border-radius:50%; background:#67e8f9; box-shadow:0 0 16px rgba(103,232,249,.88); animation:aura-vault-status-pulse 2.2s ease-in-out infinite; }
        .aura-vault-layout { display:grid; min-height:49rem; grid-template-columns:minmax(0,1.12fr) minmax(23rem,.88fr); }
        .aura-vault-stage { position:relative; min-height:49rem; border-right:1px solid rgba(255,255,255,.07); overflow:hidden; }
        .aura-vault-ring-target { position:absolute; inset:10% 3% 8%; }
        .aura-vault-floor { position:absolute; left:18%; right:18%; bottom:11%; height:7%; border-radius:50%; background:rgba(0,0,0,.68); filter:blur(26px); }
        .aura-vault-measurements { position:absolute; inset:3.5rem 1rem 1.5rem; z-index:5; pointer-events:none; color:#a5f3fc; }
        .aura-vault-measurements svg { width:100%; height:100%; overflow:visible; }
        .aura-vault-dimension-lines path { fill:none; stroke:url(#vault-measure-line); stroke-width:1; vector-effect:non-scaling-stroke; opacity:.28; stroke-dasharray:4 7; }
        .aura-vault-material-overlay,.aura-vault-signal-overlay,.aura-vault-power-overlay,.aura-vault-protection-overlay { opacity:0; transition:opacity .35s ease; }
        .aura-vault-material-overlay ellipse,.aura-vault-material-overlay path,.aura-vault-signal-overlay path,.aura-vault-power-overlay path,.aura-vault-protection-overlay ellipse,.aura-vault-protection-overlay path { fill:none; stroke:rgba(103,232,249,.46); stroke-width:1.25; vector-effect:non-scaling-stroke; filter:drop-shadow(0 0 6px rgba(103,232,249,.20)); }
        .aura-vault-material-overlay ellipse:first-child { stroke-dasharray:20 9; }
        .aura-vault-signal-overlay circle { fill:#e0fbff; filter:drop-shadow(0 0 9px rgba(103,232,249,.72)); }
        .aura-vault-signal-overlay .aura-vault-signal-bloom { fill:rgba(103,232,249,.18); }
        .aura-vault-signal-overlay path { stroke-dasharray:7 6; animation:aura-vault-line-flow 1.5s linear infinite; }
        .aura-vault-power-overlay path:first-child { stroke-width:4; stroke-linecap:round; stroke-dasharray:42 14; animation:aura-vault-power-flow 4.2s linear infinite; }
        .aura-vault-power-overlay .aura-vault-power-track { opacity:.25; stroke-dasharray:2 10; }
        .aura-vault-power-overlay circle { fill:#e0fbff; filter:drop-shadow(0 0 8px rgba(103,232,249,.74)); }
        .aura-vault-protection-overlay ellipse { animation:aura-vault-pressure 3.2s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
        .aura-vault-protection-overlay ellipse:nth-child(2) { animation-delay:.45s; }
        .aura-vault-protection-overlay ellipse:nth-child(3) { animation-delay:.9s; }
        .aura-vault-measurements-material .aura-vault-material-overlay,.aura-vault-measurements-signals .aura-vault-signal-overlay,.aura-vault-measurements-power .aura-vault-power-overlay,.aura-vault-measurements-protection .aura-vault-protection-overlay { opacity:1; }
        .aura-vault-label { position:absolute; font-size:.58rem; font-weight:900; letter-spacing:.18em; text-transform:uppercase; color:rgba(207,250,254,.38); }
        .aura-vault-label-top { left:50%; top:8%; transform:translateX(-50%); }
        .aura-vault-label-left { left:2%; top:50%; transform:rotate(-90deg) translateX(-50%); transform-origin:left top; }
        .aura-vault-label-bottom { left:50%; bottom:4%; transform:translateX(-50%); }
        .aura-vault-metric { position:absolute; right:5%; top:12%; text-align:right; }
        .aura-vault-metric span { display:block; font-family:var(--font-display),sans-serif; font-size:clamp(2.2rem,4vw,4.2rem); font-weight:600; letter-spacing:-.07em; line-height:.9; color:white; text-shadow:0 14px 36px rgba(0,0,0,.46),0 0 24px rgba(103,232,249,.15); }
        .aura-vault-metric small { display:block; margin-top:.65rem; font-size:.58rem; font-weight:900; letter-spacing:.20em; text-transform:uppercase; color:rgba(207,250,254,.38); }
        .aura-vault-console { position:relative; z-index:6; display:grid; align-content:stretch; padding:3.8rem 1.1rem 1.1rem; gap:.7rem; }
        .aura-vault-system { position:relative; display:grid; grid-template-columns:3.15rem 1fr; width:100%; min-height:9.2rem; overflow:hidden; text-align:left; color:white; border:1px solid rgba(255,255,255,.08); background:linear-gradient(145deg,rgba(255,255,255,.068),rgba(255,255,255,.022) 48%,rgba(4,10,16,.66)); box-shadow:inset 0 1px 0 rgba(255,255,255,.08); clip-path:polygon(0 8%,4% 0,100% 0,100% 88%,96% 100%,0 100%); transition:transform .3s cubic-bezier(.2,.85,.2,1),border-color .25s ease,background .25s ease,box-shadow .25s ease; cursor:pointer; }
        .aura-vault-system:hover,.aura-vault-system:focus-visible,.aura-vault-system.is-active { transform:translateX(-7px); border-color:rgba(103,232,249,.34); background:linear-gradient(145deg,rgba(165,243,252,.13),rgba(255,255,255,.035) 48%,rgba(4,12,19,.80)); box-shadow:0 24px 62px rgba(0,0,0,.28),0 0 34px rgba(34,211,238,.06),inset 0 1px 0 rgba(255,255,255,.16); outline:none; }
        .aura-vault-system-index { display:grid; place-items:center; border-right:1px solid rgba(255,255,255,.07); color:rgba(207,250,254,.28); font-size:.62rem; font-weight:900; letter-spacing:.16em; }
        .aura-vault-system.is-active .aura-vault-system-index { color:#a5f3fc; background:rgba(103,232,249,.06); }
        .aura-vault-system-content { padding:1rem 1.1rem 1rem 1rem; }
        .aura-vault-system-head { display:flex; align-items:center; justify-content:space-between; }
        .aura-vault-system-icon { display:grid; place-items:center; width:2rem; height:2rem; color:#a5f3fc; border:1px solid rgba(103,232,249,.16); background:rgba(103,232,249,.06); }
        .aura-vault-system-code { font-size:.56rem; font-weight:900; letter-spacing:.19em; color:rgba(207,250,254,.28); }
        .aura-vault-system-label { margin-top:.8rem; font-size:.63rem; font-weight:900; letter-spacing:.22em; text-transform:uppercase; color:rgba(207,250,254,.46); }
        .aura-vault-system-value-row { display:flex; align-items:baseline; gap:.8rem; margin-top:.35rem; }
        .aura-vault-system-value-row strong { font-family:var(--font-display),sans-serif; font-size:2.15rem; font-weight:600; letter-spacing:-.06em; line-height:1; }
        .aura-vault-system-value-row span { font-size:.68rem; font-weight:800; color:rgba(255,255,255,.44); }
        .aura-vault-system-description { max-height:0; overflow:hidden; opacity:0; margin-top:0; font-size:.74rem; line-height:1.45rem; color:rgba(255,255,255,.48); transition:max-height .35s ease,opacity .25s ease,margin .25s ease; }
        .aura-vault-system.is-active .aura-vault-system-description { max-height:5rem; opacity:1; margin-top:.65rem; }
        .aura-vault-system-items { display:flex; flex-wrap:wrap; gap:.4rem; max-height:0; overflow:hidden; opacity:0; transition:max-height .35s ease,opacity .25s ease,margin .25s ease; }
        .aura-vault-system.is-active .aura-vault-system-items { max-height:4rem; opacity:1; margin-top:.7rem; }
        .aura-vault-system-items span { padding:.34rem .48rem; border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.025); font-size:.52rem; font-weight:900; letter-spacing:.10em; text-transform:uppercase; color:rgba(255,255,255,.34); }
        @keyframes aura-vault-reflection { 0%,16%{opacity:0;transform:translateX(-20%) skewX(-15deg)} 30%{opacity:.7} 58%{opacity:.14} 78%,100%{opacity:0;transform:translateX(920%) skewX(-15deg)} }
        @keyframes aura-vault-status-pulse { 0%,100%{opacity:.45;transform:scale(.82)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes aura-vault-line-flow { to{stroke-dashoffset:-26} }
        @keyframes aura-vault-power-flow { to{stroke-dashoffset:-112} }
        @keyframes aura-vault-pressure { 0%,100%{opacity:.16;transform:scale(.96)} 50%{opacity:.72;transform:scale(1.04)} }
        @media (max-width:1100px) {
          .aura-vault-glass,.aura-vault-layout { min-height:74rem; }
          .aura-vault-layout { grid-template-columns:1fr; }
          .aura-vault-stage { min-height:38rem; border-right:0; border-bottom:1px solid rgba(255,255,255,.07); }
          .aura-vault-ring-target { inset:4% 2%; }
          .aura-vault-console { grid-template-columns:repeat(2,minmax(0,1fr)); padding:1rem; }
          .aura-vault-system { min-height:12rem; }
        }
        @media (max-width:680px) {
          .aura-vault-chamber { margin-top:2.5rem; }
          .aura-vault-glass,.aura-vault-layout { min-height:91rem; }
          .aura-vault-status { left:1rem; }
          .aura-vault-index { display:none; }
          .aura-vault-stage { min-height:31rem; }
          .aura-vault-console { grid-template-columns:1fr; padding:.7rem; }
          .aura-vault-system { min-height:10.5rem; }
          .aura-vault-system:hover,.aura-vault-system:focus-visible,.aura-vault-system.is-active { transform:translateY(-4px); }
          .aura-vault-measurements { inset:2.6rem .25rem .8rem; }
          .aura-vault-label-left { display:none; }
          .aura-vault-metric { top:15%; right:4%; }
        }
        @media (prefers-reduced-motion:reduce) {
          .aura-vault-reflection,.aura-vault-status-dot,.aura-vault-signal-overlay path,.aura-vault-power-overlay path:first-child,.aura-vault-protection-overlay ellipse { animation:none !important; }
          .aura-vault-heading,.aura-vault-chamber { transition:none; opacity:1; transform:none; }
        }
      `}</style>
    </section>
  );
}
