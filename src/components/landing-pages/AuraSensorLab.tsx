"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, MoonStar, Move3D, Radar, Thermometer } from "lucide-react";

import { Container } from "@/components/ui/Container";

type SensorKey = "heart" | "temperature" | "sleep" | "motion";

type SensorItem = {
  key: SensorKey;
  label: string;
  value: string;
  copy: string;
  detail: string;
  Icon: typeof Activity;
};

const sensors: SensorItem[] = [
  {
    key: "heart",
    label: "Heart rhythm",
    value: "72 BPM",
    copy: "Live optical signal",
    detail: "Dual-channel pulse sensing",
    Icon: Activity
  },
  {
    key: "temperature",
    label: "Temperature",
    value: "+0.18°",
    copy: "Nightly baseline shift",
    detail: "Continuous skin trend",
    Icon: Thermometer
  },
  {
    key: "sleep",
    label: "Sleep depth",
    value: "1h 48m",
    copy: "Deep-stage recovery",
    detail: "Stage-aware sleep model",
    Icon: MoonStar
  },
  {
    key: "motion",
    label: "Motion",
    value: "1,824",
    copy: "Micro-movements tracked",
    detail: "Six-axis movement array",
    Icon: Move3D
  }
];

function RingCutaway({ active }: { active: SensorKey }) {
  return (
    <div className="aura-lab-ring-wrap" aria-hidden="true">
      <div className="aura-lab-ring-aura" />
      <svg className="aura-lab-ring" viewBox="0 0 760 620" role="presentation">
        <defs>
          <linearGradient id="lab-metal" x1="100" y1="70" x2="670" y2="545" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.16" stopColor="#cfd8df" />
            <stop offset="0.34" stopColor="#737f8b" />
            <stop offset="0.52" stopColor="#f8fbfd" />
            <stop offset="0.72" stopColor="#82909c" />
            <stop offset="0.9" stopColor="#dce6eb" />
            <stop offset="1" stopColor="#4d5964" />
          </linearGradient>
          <linearGradient id="lab-inner" x1="180" y1="178" x2="580" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#03070b" />
            <stop offset="0.38" stopColor="#111c26" />
            <stop offset="0.68" stopColor="#020609" />
            <stop offset="1" stopColor="#1a2630" />
          </linearGradient>
          <radialGradient id="lab-sensor" cx="34%" cy="26%" r="76%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.28" stopColor="#bffbff" />
            <stop offset="0.62" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#036c85" />
          </radialGradient>
          <radialGradient id="lab-violet" cx="34%" cy="26%" r="76%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.34" stopColor="#ddd6fe" />
            <stop offset="0.72" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#3b176b" />
          </radialGradient>
          <linearGradient id="lab-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.76)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="lab-ring-shadow" x="-40%" y="-50%" width="180%" height="210%">
            <feDropShadow dx="0" dy="40" stdDeviation="34" floodColor="#000814" floodOpacity="0.72" />
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#22d3ee" floodOpacity="0.12" />
          </filter>
          <filter id="lab-node-glow" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <clipPath id="lab-shell-clip">
            <ellipse cx="380" cy="316" rx="235" ry="132" />
          </clipPath>
        </defs>

        <g className="aura-lab-ring-object" transform="rotate(-10 380 316)" filter="url(#lab-ring-shadow)">
          <ellipse cx="380" cy="335" rx="238" ry="134" fill="none" stroke="#01050a" strokeWidth="104" opacity="0.62" />
          <ellipse cx="380" cy="306" rx="238" ry="137" fill="none" stroke="url(#lab-metal)" strokeWidth="102" />
          <ellipse cx="380" cy="315" rx="167" ry="74" fill="none" stroke="url(#lab-inner)" strokeWidth="38" />
          <ellipse cx="380" cy="317" rx="150" ry="58" fill="none" stroke="rgba(69,92,108,0.72)" strokeWidth="6" />
          <path d="M190 228 C278 158 492 150 580 218" fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="18" strokeLinecap="round" opacity="0.70" />
          <path d="M483 426 C553 406 594 367 618 324" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="15" strokeLinecap="round" opacity="0.68" />

          <g clipPath="url(#lab-shell-clip)">
            <rect className="aura-lab-ring-sheen" x="-120" y="100" width="120" height="470" fill="url(#lab-sheen)" transform="rotate(16 0 0)" opacity="0.55" />
          </g>

          <g className="aura-lab-hardware">
            <circle className={active === "heart" ? "is-active" : ""} cx="272" cy="355" r="12" fill="url(#lab-sensor)" />
            <circle className={active === "temperature" ? "is-active" : ""} cx="326" cy="377" r="9" fill="url(#lab-violet)" />
            <circle className={active === "sleep" ? "is-active" : ""} cx="432" cy="380" r="10" fill="url(#lab-sensor)" />
            <circle className={active === "motion" ? "is-active" : ""} cx="487" cy="354" r="8" fill="#dce8ed" />
          </g>
        </g>

        <g className="aura-lab-node-glows">
          <circle className={active === "heart" ? "is-active" : ""} cx="272" cy="355" r="34" fill="rgba(34,211,238,0.42)" filter="url(#lab-node-glow)" />
          <circle className={active === "temperature" ? "is-active" : ""} cx="326" cy="377" r="30" fill="rgba(139,92,246,0.35)" filter="url(#lab-node-glow)" />
          <circle className={active === "sleep" ? "is-active" : ""} cx="432" cy="380" r="31" fill="rgba(103,232,249,0.38)" filter="url(#lab-node-glow)" />
          <circle className={active === "motion" ? "is-active" : ""} cx="487" cy="354" r="27" fill="rgba(203,213,225,0.30)" filter="url(#lab-node-glow)" />
        </g>

        <g className="aura-lab-measurement-arcs">
          <ellipse cx="380" cy="316" rx="284" ry="173" fill="none" stroke="rgba(103,232,249,0.16)" strokeWidth="1" strokeDasharray="3 12" />
          <ellipse cx="380" cy="316" rx="305" ry="190" fill="none" stroke="rgba(196,181,253,0.10)" strokeWidth="1" strokeDasharray="34 22" />
        </g>
      </svg>

      <div className="aura-lab-scanner" />
      <div className="aura-lab-floor-shadow" />
    </div>
  );
}

function SignalGraphic({ sensor }: { sensor: SensorKey }) {
  if (sensor === "heart") {
    return (
      <svg viewBox="0 0 120 28" aria-hidden="true">
        <path d="M0 16 H20 L27 8 L34 22 L43 3 L52 18 H72 L79 12 L86 18 H120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (sensor === "temperature") {
    return (
      <div className="aura-lab-thermal-bar" aria-hidden="true">
        <span />
      </div>
    );
  }

  if (sensor === "sleep") {
    return (
      <div className="aura-lab-sleep-bars" aria-hidden="true">
        {[38, 62, 48, 82, 56, 70, 44, 66].map((height, index) => (
          <span key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="aura-lab-motion-bars" aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

export function AuraSensorLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<SensorKey>("heart");

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
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aura-after-story"
      className={`aura-sensor-lab ${entered ? "is-entered" : ""}`}
    >
      <div className="aura-lab-grid" aria-hidden="true" />
      <div className="aura-lab-ambient aura-lab-ambient-cyan" aria-hidden="true" />
      <div className="aura-lab-ambient aura-lab-ambient-violet" aria-hidden="true" />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="aura-lab-heading">
          <p className="aura-lab-eyebrow">
            <Radar className="h-4 w-4" />
            AURA Sensor Lab
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
            <h2 className="max-w-[8ch] font-display text-[clamp(4.2rem,9vw,9.5rem)] font-medium leading-[0.76] tracking-[-0.095em] text-white">
              A quiet lab on your finger.
            </h2>
            <div className="max-w-xl lg:justify-self-end lg:pb-3">
              <p className="text-base leading-8 text-white/52 sm:text-lg sm:leading-9">
                Four sensing systems work beneath the titanium shell, translating tiny biological and physical changes into useful daily intelligence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[0.66rem] font-black uppercase tracking-[0.22em] text-cyan-100/46">
                <span>Optical array</span><span>•</span><span>Thermal baseline</span><span>•</span><span>Motion engine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="aura-lab-chamber">
          <div className="aura-lab-depth" aria-hidden="true" />
          <div className="aura-lab-glass">
            <div className="aura-lab-reflection" aria-hidden="true" />
            <div className="aura-lab-topline" aria-hidden="true" />
            <div className="aura-lab-status" aria-hidden="true">
              <span className="aura-lab-status-dot" />
              Live signal acquisition
            </div>
            <div className="aura-lab-index" aria-hidden="true">AURA / SENSOR ARRAY / 04</div>

            <div className="aura-lab-stage">
              <RingCutaway active={active} />

              <svg className="aura-lab-connectors" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="lab-line-cyan" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(103,232,249,0.16)" />
                    <stop offset="0.5" stopColor="rgba(224,252,255,0.72)" />
                    <stop offset="1" stopColor="rgba(103,232,249,0.22)" />
                  </linearGradient>
                </defs>
                <path className={active === "heart" ? "is-active" : ""} d="M507 408 C430 405 366 348 270 242 H92" />
                <path className={active === "temperature" ? "is-active" : ""} d="M553 430 C485 505 407 530 284 566 H92" />
                <path className={active === "sleep" ? "is-active" : ""} d="M688 430 C764 500 824 526 914 566 H1108" />
                <path className={active === "motion" ? "is-active" : ""} d="M734 404 C814 385 858 316 928 242 H1108" />
                <g className="aura-lab-connector-pulses">
                  <circle className={active === "heart" ? "is-active" : ""} cx="507" cy="408" r="4" />
                  <circle className={active === "temperature" ? "is-active" : ""} cx="553" cy="430" r="4" />
                  <circle className={active === "sleep" ? "is-active" : ""} cx="688" cy="430" r="4" />
                  <circle className={active === "motion" ? "is-active" : ""} cx="734" cy="404" r="4" />
                </g>
              </svg>

              <div className="aura-lab-cards">
                {sensors.map(({ key, label, value, copy, detail, Icon }, index) => (
                  <button
                    key={key}
                    type="button"
                    className={`aura-lab-card aura-lab-card-${index + 1} ${active === key ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(key)}
                    onFocus={() => setActive(key)}
                    onClick={() => setActive(key)}
                    aria-pressed={active === key}
                  >
                    <div className="aura-lab-card-head">
                      <span className="aura-lab-card-icon"><Icon className="h-4 w-4" /></span>
                      <span className="aura-lab-card-code">0{index + 1}</span>
                    </div>
                    <p className="aura-lab-card-label">{label}</p>
                    <p className="aura-lab-card-value">{value}</p>
                    <p className="aura-lab-card-copy">{copy}</p>
                    <div className="aura-lab-card-signal"><SignalGraphic sensor={key} /></div>
                    <p className="aura-lab-card-detail">{detail}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .aura-sensor-lab {
          position: relative;
          overflow: hidden;
          min-height: 100svh;
          background: #05080d;
          color: white;
          isolation: isolate;
        }
        .aura-sensor-lab::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,#05070a 0%,#071019 46%,#04070b 100%);
          z-index: -4;
        }
        .aura-lab-grid {
          position: absolute;
          inset: 0;
          opacity: .23;
          background-image: linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom,transparent,black 14%,black 86%,transparent);
        }
        .aura-lab-ambient { position:absolute; border-radius:50%; filter:blur(100px); opacity:.26; pointer-events:none; }
        .aura-lab-ambient-cyan { width:42rem; height:30rem; left:-10rem; top:16%; background:rgba(34,211,238,.24); }
        .aura-lab-ambient-violet { width:34rem; height:28rem; right:-8rem; bottom:4%; background:rgba(139,92,246,.18); }
        .aura-lab-heading { opacity:0; transform:translateY(34px); transition:opacity .9s ease,transform .9s cubic-bezier(.2,.85,.2,1); }
        .aura-sensor-lab.is-entered .aura-lab-heading { opacity:1; transform:none; }
        .aura-lab-eyebrow {
          display:inline-flex; align-items:center; gap:.7rem; margin-bottom:2rem; padding:.65rem .9rem;
          border:1px solid rgba(103,232,249,.20); background:rgba(103,232,249,.07); color:rgba(207,250,254,.78);
          font-size:.68rem; font-weight:900; letter-spacing:.24em; text-transform:uppercase;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 18px 50px rgba(0,0,0,.20); backdrop-filter:blur(18px);
          clip-path:polygon(0 12%,7% 0,100% 0,100% 82%,94% 100%,0 100%);
        }
        .aura-lab-chamber { position:relative; margin-top:4rem; opacity:0; transform:translateY(55px) scale(.975); transition:opacity 1s ease .14s,transform 1.15s cubic-bezier(.16,1,.3,1) .14s; perspective:1400px; }
        .aura-sensor-lab.is-entered .aura-lab-chamber { opacity:1; transform:none; }
        .aura-lab-depth {
          position:absolute; inset:18px 22px -20px; background:linear-gradient(180deg,rgba(35,59,70,.34),rgba(1,5,9,.98) 46%);
          clip-path:polygon(0 7%,3% 0,28% 1%,33% 0,74% 1%,79% 0,97% 2%,100% 9%,99% 87%,96% 100%,71% 98%,65% 100%,28% 98%,22% 100%,2% 96%,0 87%);
          box-shadow:0 50px 110px rgba(0,0,0,.56); transform:translateZ(-40px) rotateX(-2deg);
        }
        .aura-lab-glass {
          position:relative; min-height:47rem; overflow:hidden; border:1px solid rgba(214,250,255,.20);
          clip-path:polygon(0 7%,3% 0,28% 1%,33% 0,74% 1%,79% 0,97% 2%,100% 9%,99% 87%,96% 100%,71% 98%,65% 100%,28% 98%,22% 100%,2% 96%,0 87%);
          background:radial-gradient(circle at 50% 40%,rgba(103,232,249,.10),transparent 28rem),linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.022) 34%,rgba(2,7,12,.76) 72%),rgba(5,11,17,.78);
          box-shadow:0 55px 150px rgba(0,0,0,.54),0 0 65px rgba(34,211,238,.05),inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(103,232,249,.12);
          backdrop-filter:blur(28px) saturate(1.2);
        }
        .aura-lab-reflection { position:absolute; inset:-25% auto -25% -20%; width:17%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),rgba(103,232,249,.08),transparent); filter:blur(8px); transform:skewX(-15deg); animation:aura-lab-reflection 8.5s ease-in-out infinite; pointer-events:none; }
        .aura-lab-topline { position:absolute; left:7%; right:7%; top:0; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,.84),rgba(103,232,249,.34),transparent); filter:drop-shadow(0 0 10px rgba(103,232,249,.24)); }
        .aura-lab-status,.aura-lab-index { position:absolute; top:1.35rem; z-index:8; font-size:.62rem; font-weight:900; letter-spacing:.22em; text-transform:uppercase; color:rgba(207,250,254,.46); }
        .aura-lab-status { left:2rem; display:flex; align-items:center; gap:.65rem; }
        .aura-lab-index { right:2rem; }
        .aura-lab-status-dot { width:.45rem; height:.45rem; border-radius:50%; background:#67e8f9; box-shadow:0 0 16px rgba(103,232,249,.88); animation:aura-lab-status-pulse 2.2s ease-in-out infinite; }
        .aura-lab-stage { position:relative; min-height:47rem; }
        .aura-lab-ring-wrap { position:absolute; left:50%; top:50%; width:min(50rem,64%); aspect-ratio:1.15; transform:translate(-50%,-49%); z-index:3; }
        .aura-lab-ring { width:100%; height:100%; overflow:visible; }
        .aura-lab-ring-object { transform-box:fill-box; transform-origin:center; animation:aura-lab-ring-float 8s ease-in-out infinite; }
        .aura-lab-ring-sheen { animation:aura-lab-sheen 7.2s cubic-bezier(.4,0,.2,1) infinite; }
        .aura-lab-ring-aura { position:absolute; inset:19%; border-radius:50%; background:radial-gradient(circle,rgba(103,232,249,.18),rgba(34,211,238,.05) 42%,transparent 72%); filter:blur(26px); animation:aura-lab-aura 5.5s ease-in-out infinite; }
        .aura-lab-floor-shadow { position:absolute; left:19%; right:19%; bottom:12%; height:7%; border-radius:50%; background:rgba(0,0,0,.68); filter:blur(24px); }
        .aura-lab-scanner { position:absolute; left:22%; right:22%; top:22%; height:2px; background:linear-gradient(90deg,transparent,rgba(103,232,249,.84),rgba(255,255,255,.96),rgba(103,232,249,.84),transparent); box-shadow:0 0 22px rgba(103,232,249,.65),0 18px 60px rgba(34,211,238,.16); animation:aura-lab-scan 5.8s ease-in-out infinite; }
        .aura-lab-measurement-arcs { transform-box:fill-box; transform-origin:center; animation:aura-lab-arcs 24s linear infinite; }
        .aura-lab-hardware circle { transition:filter .28s ease,transform .28s ease,opacity .28s ease; transform-box:fill-box; transform-origin:center; opacity:.52; }
        .aura-lab-hardware circle.is-active { opacity:1; transform:scale(1.26); filter:drop-shadow(0 0 14px rgba(103,232,249,.86)); }
        .aura-lab-node-glows circle { opacity:.10; transition:opacity .28s ease,transform .28s ease; transform-box:fill-box; transform-origin:center; }
        .aura-lab-node-glows circle.is-active { opacity:.9; transform:scale(1.18); animation:aura-lab-node-pulse 2.2s ease-in-out infinite; }
        .aura-lab-connectors { position:absolute; inset:0; width:100%; height:100%; z-index:4; pointer-events:none; }
        .aura-lab-connectors path { fill:none; stroke:url(#lab-line-cyan); stroke-width:1.2; vector-effect:non-scaling-stroke; opacity:.19; stroke-dasharray:7 7; transition:opacity .3s ease,stroke-width .3s ease,filter .3s ease; }
        .aura-lab-connectors path.is-active { opacity:.92; stroke-width:1.8; filter:drop-shadow(0 0 7px rgba(103,232,249,.50)); animation:aura-lab-line-flow 1.4s linear infinite; }
        .aura-lab-connector-pulses circle { fill:#e0fbff; opacity:.16; transition:opacity .3s ease,transform .3s ease; transform-box:fill-box; transform-origin:center; }
        .aura-lab-connector-pulses circle.is-active { opacity:1; transform:scale(1.5); filter:drop-shadow(0 0 10px #67e8f9); }
        .aura-lab-cards { position:absolute; inset:0; z-index:6; }
        .aura-lab-card {
          position:absolute; width:17rem; min-height:12.5rem; padding:1.2rem; text-align:left; color:white; cursor:pointer;
          border:1px solid rgba(255,255,255,.11); background:linear-gradient(145deg,rgba(255,255,255,.095),rgba(255,255,255,.028) 48%,rgba(4,10,16,.72));
          box-shadow:0 25px 70px rgba(0,0,0,.30),inset 0 1px 0 rgba(255,255,255,.13); backdrop-filter:blur(22px);
          clip-path:polygon(0 9%,5% 0,100% 0,100% 88%,94% 100%,0 100%);
          transition:transform .32s cubic-bezier(.2,.85,.2,1),border-color .25s ease,background .25s ease,box-shadow .25s ease,opacity .25s ease;
        }
        .aura-lab-card:hover,.aura-lab-card:focus-visible,.aura-lab-card.is-active { transform:translateY(-6px); border-color:rgba(103,232,249,.38); background:linear-gradient(145deg,rgba(165,243,252,.15),rgba(255,255,255,.045) 48%,rgba(4,12,19,.82)); box-shadow:0 32px 90px rgba(0,0,0,.42),0 0 36px rgba(34,211,238,.08),inset 0 1px 0 rgba(255,255,255,.20); outline:none; }
        .aura-lab-card-1 { left:3%; top:13%; }
        .aura-lab-card-2 { left:3%; bottom:10%; }
        .aura-lab-card-3 { right:3%; bottom:10%; }
        .aura-lab-card-4 { right:3%; top:13%; }
        .aura-lab-card-head { display:flex; align-items:center; justify-content:space-between; }
        .aura-lab-card-icon { display:grid; place-items:center; width:2.1rem; height:2.1rem; color:#a5f3fc; border:1px solid rgba(103,232,249,.18); background:rgba(103,232,249,.08); }
        .aura-lab-card-code { font-size:.62rem; font-weight:900; letter-spacing:.2em; color:rgba(207,250,254,.32); }
        .aura-lab-card-label { margin-top:1rem; font-size:.66rem; font-weight:900; letter-spacing:.22em; text-transform:uppercase; color:rgba(207,250,254,.48); }
        .aura-lab-card-value { margin-top:.45rem; font-family:var(--font-display),sans-serif; font-size:2.45rem; font-weight:600; letter-spacing:-.06em; line-height:1; }
        .aura-lab-card-copy { margin-top:.45rem; font-size:.78rem; font-weight:700; color:rgba(255,255,255,.52); }
        .aura-lab-card-signal { height:1.7rem; margin-top:.85rem; color:#67e8f9; opacity:.62; }
        .aura-lab-card-signal svg { width:100%; height:100%; }
        .aura-lab-card-detail { margin-top:.65rem; padding-top:.6rem; border-top:1px solid rgba(255,255,255,.07); font-size:.6rem; font-weight:900; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.28); }
        .aura-lab-thermal-bar { position:relative; height:5px; margin-top:.7rem; background:linear-gradient(90deg,#0ea5e9,#67e8f9,#c4b5fd,#f0abfc); overflow:visible; }
        .aura-lab-thermal-bar span { position:absolute; left:62%; top:50%; width:9px; height:9px; border-radius:50%; background:white; transform:translate(-50%,-50%); box-shadow:0 0 13px rgba(196,181,253,.86); }
        .aura-lab-sleep-bars,.aura-lab-motion-bars { display:flex; align-items:flex-end; gap:5px; height:100%; }
        .aura-lab-sleep-bars span { flex:1; min-width:3px; background:linear-gradient(to top,rgba(34,211,238,.22),#67e8f9); animation:aura-lab-sleep 2.8s ease-in-out infinite alternate; }
        .aura-lab-motion-bars span { width:28%; height:5px; background:linear-gradient(90deg,rgba(103,232,249,.18),#67e8f9); animation:aura-lab-motion 2.1s ease-in-out infinite; }
        .aura-lab-motion-bars span:nth-child(2) { animation-delay:.22s; width:44%; }
        .aura-lab-motion-bars span:nth-child(3) { animation-delay:.44s; width:26%; }
        @keyframes aura-lab-reflection { 0%,16%{opacity:0;transform:translateX(-20%) skewX(-15deg)} 30%{opacity:.72} 58%{opacity:.14} 78%,100%{opacity:0;transform:translateX(860%) skewX(-15deg)} }
        @keyframes aura-lab-status-pulse { 0%,100%{opacity:.45;transform:scale(.82)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes aura-lab-ring-float { 0%,100%{transform:translateY(4px) rotate(-10deg)} 50%{transform:translateY(-8px) rotate(-8.7deg)} }
        @keyframes aura-lab-sheen { 0%,18%{transform:translateX(-120px) rotate(16deg);opacity:0} 36%{opacity:.6} 66%{opacity:.16} 82%,100%{transform:translateX(1000px) rotate(16deg);opacity:0} }
        @keyframes aura-lab-aura { 0%,100%{opacity:.42;transform:scale(.96)} 50%{opacity:.78;transform:scale(1.06)} }
        @keyframes aura-lab-scan { 0%,100%{top:24%;opacity:0} 16%{opacity:.86} 54%{top:72%;opacity:.74} 76%{opacity:.18} }
        @keyframes aura-lab-arcs { to{transform:rotate(360deg)} }
        @keyframes aura-lab-node-pulse { 0%,100%{transform:scale(1.03);opacity:.58} 50%{transform:scale(1.28);opacity:1} }
        @keyframes aura-lab-line-flow { to{stroke-dashoffset:-28} }
        @keyframes aura-lab-sleep { from{opacity:.32;transform:scaleY(.72)} to{opacity:.9;transform:scaleY(1.05)} }
        @keyframes aura-lab-motion { 0%,100%{transform:translateX(0);opacity:.35} 50%{transform:translateX(10px);opacity:1} }
        @media (max-width:1100px) {
          .aura-lab-glass,.aura-lab-stage { min-height:61rem; }
          .aura-lab-ring-wrap { top:38%; width:min(44rem,88%); }
          .aura-lab-connectors { display:none; }
          .aura-lab-cards { position:absolute; left:1rem; right:1rem; bottom:1.5rem; top:auto; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.8rem; }
          .aura-lab-card { position:relative; inset:auto; width:auto; min-height:11.5rem; }
        }
        @media (max-width:680px) {
          .aura-lab-chamber { margin-top:2.5rem; }
          .aura-lab-glass,.aura-lab-stage { min-height:76rem; }
          .aura-lab-status { left:1rem; }
          .aura-lab-index { display:none; }
          .aura-lab-ring-wrap { top:25%; width:112%; }
          .aura-lab-cards { grid-template-columns:1fr; left:.65rem; right:.65rem; bottom:.8rem; }
          .aura-lab-card { min-height:10.5rem; }
          .aura-lab-card-value { font-size:2.1rem; }
        }
        @media (prefers-reduced-motion:reduce) {
          .aura-lab-reflection,.aura-lab-ring-object,.aura-lab-ring-sheen,.aura-lab-ring-aura,.aura-lab-scanner,.aura-lab-measurement-arcs,.aura-lab-status-dot,.aura-lab-node-glows circle.is-active,.aura-lab-connectors path.is-active,.aura-lab-sleep-bars span,.aura-lab-motion-bars span { animation:none !important; }
          .aura-lab-heading,.aura-lab-chamber { transition:none; opacity:1; transform:none; }
        }
      `}</style>
    </section>
  );
}
