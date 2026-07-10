import { AuraEngineeringVaultPortal } from "@/components/landing-pages/AuraEngineeringVaultPortal";
import { AuraRing3DPortal } from "@/components/landing-pages/AuraRing3D";
import { AuraRingOrbitsPortal } from "@/components/landing-pages/AuraRingOrbits";
import { AuraSensorLabPortal } from "@/components/landing-pages/AuraSensorLabPortal";
import { AuraShatterNavbarPortal } from "@/components/landing-pages/AuraShatterNavbar";

type OpticsProps = {
  className?: string;
};

function OpticalFrame({
  id,
  path,
  className,
  beam,
  secondaryBeam,
  scratchPath,
  prismColor,
  accentColor,
  noiseSeed
}: {
  id: string;
  path: string;
  className: string;
  beam: string;
  secondaryBeam: string;
  scratchPath: string;
  prismColor: string;
  accentColor: string;
  noiseSeed: number;
}) {
  return (
    <div className={`aura-optics ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <clipPath id={`${id}-optics-clip`}>
            <path d={path} />
          </clipPath>

          <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.42" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="0.52" stopColor="rgba(255,255,255,0.32)" />
            <stop offset="0.62" stopColor={accentColor} />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <linearGradient id={`${id}-spectral`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.35" stopColor="rgba(103,232,249,0.04)" />
            <stop offset="0.5" stopColor={prismColor} />
            <stop offset="0.65" stopColor="rgba(196,181,253,0.05)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <radialGradient id={`${id}-bloom`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(255,255,255,0.46)" />
            <stop offset="0.22" stopColor={accentColor} />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          <pattern id={`${id}-scratches`} width="86" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)">
            <path d="M5 12 H69" stroke="rgba(255,255,255,0.085)" strokeWidth="0.65" />
            <path d="M24 37 H82" stroke="rgba(165,243,252,0.052)" strokeWidth="0.55" />
            <path d="M11 55 H48" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" />
          </pattern>

          <filter id={`${id}-soft-bloom`} x="-35%" y="-45%" width="170%" height="190%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          <filter id={`${id}-refraction`} x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.028" numOctaves="1" seed={noiseSeed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>

        <g className="aura-optics-volume" opacity="0.82">
          <path d={beam} fill={`url(#${id}-beam)`} filter={`url(#${id}-soft-bloom)`} />
          <path d={secondaryBeam} fill={`url(#${id}-spectral)`} filter={`url(#${id}-soft-bloom)`} opacity="0.62" />
        </g>

        <g clipPath={`url(#${id}-optics-clip)`}>
          <path className="aura-optics-refraction" d={path} fill="rgba(255,255,255,0.026)" filter={`url(#${id}-refraction)`} />
          <rect className="aura-optics-scratches" x="20" y="15" width="860" height="590" fill={`url(#${id}-scratches)`} opacity="0.72" />
          <path className="aura-optics-spectral-pass" d={scratchPath} fill="none" stroke={`url(#${id}-spectral)`} strokeWidth="17" strokeLinecap="round" opacity="0.35" />
        </g>

        <path className="aura-optics-edge-bloom" d={path} fill="none" stroke="rgba(224,252,255,0.28)" strokeWidth="5" filter={`url(#${id}-soft-bloom)`} />
        <path className="aura-optics-edge-cyan" d={path} fill="none" stroke="rgba(34,211,238,0.20)" strokeWidth="1.3" transform="translate(1.2 0)" />
        <path className="aura-optics-edge-prism" d={path} fill="none" stroke={prismColor} strokeWidth="1.1" transform="translate(-1.1 0)" />

        <g className="aura-optics-glints">
          <ellipse cx="166" cy="114" rx="58" ry="18" fill={`url(#${id}-bloom)`} opacity="0.34" />
          <ellipse cx="742" cy="486" rx="72" ry="22" fill={`url(#${id}-bloom)`} opacity="0.26" />
          <circle cx="781" cy="128" r="2.2" fill="rgba(255,255,255,0.88)" />
          <circle cx="115" cy="471" r="1.7" fill="rgba(165,243,252,0.78)" />
        </g>
      </svg>
    </div>
  );
}

function AuraRing3DFramingFixes() {
  return (
    <style>{`
      #aura-scroll-product .aura-ring-webgl-layer {
        overflow: visible;
        inset: -8% -16% -6% -16%;
      }

      #aura-scroll-product .aura-ring-webgl-canvas {
        transform: translateY(7%) scale(0.76);
        transform-origin: 50% 50%;
      }

      #aura-scroll-product .aura-ring-webgl-glow {
        inset: 24% 18% 18% 18%;
        opacity: 0.64;
      }

      #aura-scroll-product .aura-ring-webgl-shadow {
        left: 24%;
        right: 24%;
        bottom: 12%;
        height: 7%;
      }

      #aura-scroll-product.aura-ring-webgl-ready .aura-scroll-product-inner {
        display: none !important;
      }

      #aura-scroll-product {
        padding-top: 2rem;
      }

      @media (min-width: 1024px) and (max-width: 1279px) {
        #aura-scroll-product .aura-ring-webgl-layer {
          inset: -10% -20% -8% -20%;
        }

        #aura-scroll-product .aura-ring-webgl-canvas {
          transform: translateY(8%) scale(0.72);
        }
      }
    `}</style>
  );
}

export function MaterialGlassOptics({ className = "" }: OpticsProps) {
  return (
    <>
      <OpticalFrame
        id="material"
        className={`aura-material-optics ${className}`}
        path="M112 103 L238 46 L424 62 L548 35 L772 104 L838 224 L814 354 L850 455 L728 566 L539 548 L407 584 L225 542 L91 431 L112 306 L66 210 Z"
        beam="M-72 401 L236 -38 L427 -38 L92 519 Z"
        secondaryBeam="M492 -55 L856 118 L946 287 L596 121 Z"
        scratchPath="M96 151 C292 111 559 117 824 207"
        prismColor="rgba(196,181,253,0.13)"
        accentColor="rgba(103,232,249,0.16)"
        noiseSeed={11}
      />
      <AuraRing3DPortal />
      <AuraRingOrbitsPortal />
      <AuraShatterNavbarPortal />
      <AuraSensorLabPortal />
      <AuraEngineeringVaultPortal />
      <AuraRing3DFramingFixes />
    </>
  );
}

export function SensorGlassOptics({ className = "" }: OpticsProps) {
  return (
    <OpticalFrame
      id="sensor"
      className={`aura-sensor-optics ${className}`}
      path="M94 105 L209 45 L686 45 L826 132 L854 264 L818 396 L852 476 L731 574 L189 557 L68 448 L91 319 L47 219 Z"
      beam="M555 -64 L918 78 L918 252 L634 141 Z"
      secondaryBeam="M32 492 L329 181 L442 208 L178 548 Z"
      scratchPath="M82 274 C301 221 596 211 833 263"
      prismColor="rgba(56,189,248,0.14)"
      accentColor="rgba(34,211,238,0.19)"
      noiseSeed={17}
    />
  );
}

export function MotionGlassOptics({ className = "" }: OpticsProps) {
  return (
    <OpticalFrame
      id="motion"
      className={`aura-motion-optics ${className}`}
      path="M54 148 L164 62 L746 29 L855 138 L816 245 L878 349 L789 452 L842 516 L673 586 L126 548 L35 432 L97 323 L38 236 Z"
      beam="M-126 460 L247 -74 L442 -74 L37 552 Z"
      secondaryBeam="M321 -55 L943 72 L943 202 L382 96 Z"
      scratchPath="M58 401 C278 338 593 307 851 327"
      prismColor="rgba(125,211,252,0.14)"
      accentColor="rgba(103,232,249,0.16)"
      noiseSeed={23}
    />
  );
}

export function IntelligenceGlassOptics({ className = "" }: OpticsProps) {
  return (
    <OpticalFrame
      id="intelligence"
      className={`aura-intelligence-optics ${className}`}
      path="M118 83 L330 28 L570 40 L793 104 L853 265 L822 457 L683 579 L404 590 L176 548 L61 401 L70 205 Z"
      beam="M105 -72 L430 -72 L673 650 L410 650 Z"
      secondaryBeam="M456 -54 L918 154 L918 322 L536 137 Z"
      scratchPath="M118 451 C314 361 587 313 816 332"
      prismColor="rgba(196,181,253,0.18)"
      accentColor="rgba(165,243,252,0.17)"
      noiseSeed={31}
    />
  );
}
