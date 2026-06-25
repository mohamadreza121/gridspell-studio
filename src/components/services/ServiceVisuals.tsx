"use client";

import {
  motion,
  type MotionValue,
  useTransform
} from "motion/react";

type ServiceVisualProps = {
  index: number;
  progress: MotionValue<number>;
  active: boolean;
};

type VisualProps = {
  progress: MotionValue<number>;
  active: boolean;
};

/* -------------------------------------------------------------------------- */
/* 01 — ASTEROID BUILD                                                        */
/* -------------------------------------------------------------------------- */

function AsteroidVisual({ progress }: VisualProps) {
  const x = useTransform(progress, [0, 0.5, 1], [220, 0, -250]);
  const y = useTransform(progress, [0, 0.5, 1], [-65, 0, 55]);
  const rotate = useTransform(progress, [0, 0.5, 1], [-32, 5, 52]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.7, 1.03, 0.82]);

  const trailLength = useTransform(
    progress,
    [0, 0.45, 1],
    [0.1, 1, 0.22]
  );

  const trailOpacity = useTransform(
    progress,
    [0, 0.5, 1],
    [0.15, 0.75, 0.08]
  );

  const fragmentX = useTransform(
    progress,
    [0, 0.5, 1],
    [80, 0, -120]
  );

  const fragmentRotate = useTransform(
    progress,
    [0, 1],
    [-50, 110]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="asteroid-fill"
          x1="170"
          y1="170"
          x2="650"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.46" stopColor="#715cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <radialGradient
          id="asteroid-surface"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(350 300) rotate(52) scale(420)"
        >
          <stop stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="0.42" stopColor="#7c5cff" stopOpacity="0.11" />
          <stop offset="1" stopColor="#05070b" stopOpacity="0.88" />
        </radialGradient>

        <filter
          id="asteroid-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M720 214 C615 246 582 307 503 326 C407 349 322 312 210 349 C137 374 90 438 29 498"
        stroke="url(#asteroid-fill)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="10 18"
        style={{
          pathLength: trailLength,
          opacity: trailOpacity
        }}
      />

      <motion.path
        d="M749 266 C650 283 602 348 521 368 C419 392 337 362 245 399 C165 432 120 492 58 552"
        stroke="#29d6ff"
        strokeOpacity="0.23"
        strokeWidth="1.5"
        style={{
          pathLength: trailLength,
          opacity: trailOpacity
        }}
      />

      <motion.g
        style={{
          x,
          y,
          rotate,
          scale,
          transformOrigin: "400px 400px"
        }}
      >
        <path
          d="M181 287 L254 175 L397 135 L542 183 L654 301 L630 457 L538 611 L372 664 L218 595 L131 456 Z"
          fill="url(#asteroid-surface)"
          stroke="url(#asteroid-fill)"
          strokeWidth="8"
          strokeLinejoin="round"
          filter="url(#asteroid-glow)"
        />

        <path
          d="M181 287 L322 328 L397 135 M322 328 L542 183 M322 328 L372 664 M322 328 L131 456 M542 183 L544 357 L654 301 M544 357 L630 457 M544 357 L538 611 M544 357 L372 664 M181 287 L131 456 M218 595 L372 664"
          stroke="rgba(255,255,255,0.19)"
          strokeWidth="2"
        />

        <path
          d="M236 236 L322 328 L270 425 L154 407"
          fill="rgba(124,92,255,0.12)"
          stroke="rgba(169,154,255,0.23)"
          strokeWidth="2"
        />

        <path
          d="M322 328 L500 274 L544 357 L418 466 L270 425 Z"
          fill="rgba(41,214,255,0.07)"
          stroke="rgba(139,233,255,0.16)"
          strokeWidth="2"
        />

        <circle cx="394" cy="227" r="8" fill="#8be9ff" />
        <circle cx="394" cy="227" r="22" stroke="#8be9ff" strokeOpacity="0.22" />
      </motion.g>

      <motion.g
        style={{
          x: fragmentX,
          rotate: fragmentRotate,
          transformOrigin: "620px 210px"
        }}
      >
        <path
          d="M632 156 L683 180 L663 234 L607 218 Z"
          fill="#151927"
          stroke="#8be9ff"
          strokeOpacity="0.45"
          strokeWidth="3"
        />

        <path
          d="M697 302 L732 321 L711 360 L670 338 Z"
          fill="#111522"
          stroke="#7c5cff"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        <circle cx="658" cy="92" r="11" fill="#7c5cff" fillOpacity="0.8" />
        <circle cx="739" cy="423" r="7" fill="#29d6ff" fillOpacity="0.7" />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 — RECONSTRUCTION ENGINE                                                 */
/* -------------------------------------------------------------------------- */

type AssemblyPanelProps = {
  progress: MotionValue<number>;
  x: number;
  y: number;
  width: number;
  height: number;
  fromX: number;
  fromY: number;
  fromRotate: number;
  exitX: number;
  exitY: number;
  accent?: boolean;
};

function AssemblyPanel({
  progress,
  x,
  y,
  width,
  height,
  fromX,
  fromY,
  fromRotate,
  exitX,
  exitY,
  accent = false
}: AssemblyPanelProps) {
  const translateX = useTransform(
    progress,
    [0, 0.5, 1],
    [fromX, 0, exitX]
  );

  const translateY = useTransform(
    progress,
    [0, 0.5, 1],
    [fromY, 0, exitY]
  );

  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    [fromRotate, 0, -fromRotate * 0.25]
  );

  const opacity = useTransform(
    progress,
    [0, 0.25, 0.5, 1],
    [0.16, 0.55, 1, 0.65]
  );

  return (
    <motion.g
      style={{
        x: translateX,
        y: translateY,
        rotate,
        opacity,
        transformOrigin: `${x + width / 2}px ${y + height / 2}px`
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="18"
        fill={accent ? "rgba(124,92,255,0.16)" : "rgba(255,255,255,0.035)"}
        stroke={accent ? "#8be9ff" : "rgba(255,255,255,0.18)"}
        strokeOpacity={accent ? 0.75 : 1}
        strokeWidth="2"
      />

      <rect
        x={x + 18}
        y={y + 18}
        width={width * 0.34}
        height="7"
        rx="3.5"
        fill={accent ? "#8be9ff" : "rgba(255,255,255,0.22)"}
      />

      <rect
        x={x + 18}
        y={y + 39}
        width={width * 0.58}
        height="5"
        rx="2.5"
        fill="rgba(255,255,255,0.1)"
      />

      <rect
        x={x + 18}
        y={y + 55}
        width={width * 0.42}
        height="5"
        rx="2.5"
        fill="rgba(255,255,255,0.07)"
      />
    </motion.g>
  );
}

function ReconstructionVisual({ progress }: VisualProps) {
  const scanY = useTransform(progress, [0, 1], [-140, 780]);

  const frameScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.9, 1, 1.04]
  );

  const frameRotate = useTransform(
    progress,
    [0, 0.5, 1],
    [-5, 0, 3]
  );

  const frameOpacity = useTransform(
    progress,
    [0, 0.28, 0.5, 1],
    [0.2, 0.55, 1, 0.62]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="reconstruction-gradient"
          x1="150"
          y1="160"
          x2="660"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <filter
          id="reconstruction-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <motion.rect
        x="142"
        y="132"
        width="516"
        height="536"
        rx="42"
        fill="rgba(5,7,11,0.34)"
        stroke="url(#reconstruction-gradient)"
        strokeOpacity="0.22"
        strokeWidth="2"
        style={{
          scale: frameScale,
          rotate: frameRotate,
          opacity: frameOpacity,
          transformOrigin: "400px 400px"
        }}
      />

      <AssemblyPanel
        progress={progress}
        x={190}
        y={190}
        width={185}
        height={135}
        fromX={-170}
        fromY={-90}
        fromRotate={-16}
        exitX={-45}
        exitY={-25}
        accent
      />

      <AssemblyPanel
        progress={progress}
        x={395}
        y={190}
        width={215}
        height={135}
        fromX={180}
        fromY={-105}
        fromRotate={19}
        exitX={52}
        exitY={-20}
      />

      <AssemblyPanel
        progress={progress}
        x={190}
        y={345}
        width={270}
        height={125}
        fromX={-210}
        fromY={45}
        fromRotate={12}
        exitX={-60}
        exitY={18}
      />

      <AssemblyPanel
        progress={progress}
        x={480}
        y={345}
        width={130}
        height={125}
        fromX={190}
        fromY={50}
        fromRotate={-22}
        exitX={45}
        exitY={18}
        accent
      />

      <AssemblyPanel
        progress={progress}
        x={190}
        y={490}
        width={420}
        height={120}
        fromX={30}
        fromY={205}
        fromRotate={7}
        exitX={0}
        exitY={55}
      />

      <motion.g
        style={{
          y: scanY
        }}
      >
        <rect
          x="135"
          y="0"
          width="530"
          height="3"
          rx="1.5"
          fill="url(#reconstruction-gradient)"
        />

        <rect
          x="160"
          y="-20"
          width="480"
          height="42"
          fill="url(#reconstruction-gradient)"
          opacity="0.07"
          filter="url(#reconstruction-glow)"
        />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 — CONVERSION TARGET                                                     */
/* -------------------------------------------------------------------------- */

type ConvergingParticleProps = {
  progress: MotionValue<number>;
  fromX: number;
  fromY: number;
  exitX: number;
  exitY: number;
  radius: number;
};

function ConvergingParticle({
  progress,
  fromX,
  fromY,
  exitX,
  exitY,
  radius
}: ConvergingParticleProps) {
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [fromX, 0, exitX]
  );

  const y = useTransform(
    progress,
    [0, 0.5, 1],
    [fromY, 0, exitY]
  );

  const opacity = useTransform(
    progress,
    [0, 0.3, 0.5, 1],
    [0.12, 0.72, 1, 0.25]
  );

  return (
    <motion.circle
      cx="400"
      cy="400"
      r={radius}
      fill="#8be9ff"
      style={{
        x,
        y,
        opacity
      }}
    />
  );
}

function ConversionTargetVisual({
  progress,
  active
}: VisualProps) {
  const outerRotate = useTransform(
    progress,
    [0, 1],
    [-80, 210]
  );

  const middleRotate = useTransform(
    progress,
    [0, 1],
    [120, -190]
  );

  const innerRotate = useTransform(
    progress,
    [0, 1],
    [-35, 155]
  );

  const pulseScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.66, 1.14, 0.84]
  );

  const pulseOpacity = useTransform(
    progress,
    [0, 0.5, 1],
    [0.18, 0.9, 0.24]
  );

  const lineLength = useTransform(
    progress,
    [0, 0.5, 1],
    [0.1, 1, 0.45]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="target-gradient"
          x1="160"
          y1="150"
          x2="650"
          y2="660"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.55" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <filter
          id="target-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        style={{
          rotate: outerRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="290"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="10 18"
        />

        <path
          d="M400 110 A290 290 0 0 1 670 295"
          stroke="url(#target-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <circle cx="400" cy="110" r="9" fill="#8be9ff" />
      </motion.g>

      <motion.g
        style={{
          rotate: middleRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="220"
          stroke="rgba(139,233,255,0.19)"
          strokeWidth="2"
          strokeDasharray="4 13"
        />

        <path
          d="M248 242 A220 220 0 0 1 555 236"
          stroke="#7c5cff"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: innerRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="148"
          stroke="url(#target-gradient)"
          strokeOpacity="0.58"
          strokeWidth="4"
        />

        <circle
          cx="400"
          cy="252"
          r="7"
          fill="#7c5cff"
        />
      </motion.g>

      {[
        "M90 175 L400 400",
        "M710 165 L400 400",
        "M745 480 L400 400",
        "M615 710 L400 400",
        "M165 680 L400 400",
        "M60 430 L400 400"
      ].map((path) => (
        <motion.path
          key={path}
          d={path}
          stroke="rgba(139,233,255,0.2)"
          strokeWidth="2"
          strokeDasharray="7 12"
          style={{
            pathLength: lineLength
          }}
        />
      ))}

      <ConvergingParticle
        progress={progress}
        fromX={-300}
        fromY={-210}
        exitX={-120}
        exitY={-70}
        radius={9}
      />

      <ConvergingParticle
        progress={progress}
        fromX={300}
        fromY={-220}
        exitX={120}
        exitY={-80}
        radius={7}
      />

      <ConvergingParticle
        progress={progress}
        fromX={340}
        fromY={80}
        exitX={140}
        exitY={30}
        radius={8}
      />

      <ConvergingParticle
        progress={progress}
        fromX={210}
        fromY={300}
        exitX={90}
        exitY={120}
        radius={6}
      />

      <ConvergingParticle
        progress={progress}
        fromX={-240}
        fromY={280}
        exitX={-90}
        exitY={115}
        radius={8}
      />

      <ConvergingParticle
        progress={progress}
        fromX={-330}
        fromY={35}
        exitX={-135}
        exitY={25}
        radius={6}
      />

      <motion.g
        style={{
          scale: pulseScale,
          opacity: pulseOpacity,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="62"
          fill="rgba(124,92,255,0.13)"
          stroke="url(#target-gradient)"
          strokeWidth="4"
          filter="url(#target-glow)"
        />

        <circle
          cx="400"
          cy="400"
          r="18"
          fill="#8be9ff"
        />
      </motion.g>

      <motion.circle
        cx="400"
        cy="400"
        r="100"
        stroke="#8be9ff"
        strokeOpacity="0.22"
        animate={
          active
            ? {
                scale: [0.75, 1.35],
                opacity: [0.65, 0]
              }
            : {
                scale: 0.75,
                opacity: 0
              }
        }
        transition={{
          duration: 1.8,
          repeat: active ? Infinity : 0,
          ease: "easeOut"
        }}
        style={{
          transformOrigin: "400px 400px"
        }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 — ORBITAL COMMAND SYSTEM                                                */
/* -------------------------------------------------------------------------- */

function OrbitalSystemVisual({
  progress,
  active
}: VisualProps) {
  const outerRotate = useTransform(
    progress,
    [0, 1],
    [-90, 230]
  );

  const innerRotate = useTransform(
    progress,
    [0, 1],
    [120, -200]
  );

  const moduleRotate = useTransform(
    progress,
    [0, 1],
    [-20, 40]
  );

  const coreScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.74, 1.08, 0.9]
  );

  const networkLength = useTransform(
    progress,
    [0, 0.5, 1],
    [0.06, 1, 0.5]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="orbit-gradient"
          x1="160"
          y1="120"
          x2="660"
          y2="690"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.48" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <filter
          id="orbit-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[
        "M400 400 L400 142",
        "M400 400 L650 266",
        "M400 400 L652 536",
        "M400 400 L400 655",
        "M400 400 L148 532",
        "M400 400 L152 260"
      ].map((path) => (
        <motion.path
          key={path}
          d={path}
          stroke="rgba(139,233,255,0.17)"
          strokeWidth="2"
          strokeDasharray="6 10"
          style={{
            pathLength: networkLength
          }}
        />
      ))}

      <motion.g
        style={{
          rotate: outerRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <ellipse
          cx="400"
          cy="400"
          rx="306"
          ry="190"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />

        <circle
          cx="696"
          cy="356"
          r="12"
          fill="#29d6ff"
          filter="url(#orbit-glow)"
        />

        <circle
          cx="115"
          cy="450"
          r="8"
          fill="#7c5cff"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: innerRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <ellipse
          cx="400"
          cy="400"
          rx="205"
          ry="310"
          stroke="rgba(124,92,255,0.24)"
          strokeWidth="2"
          strokeDasharray="8 15"
        />

        <circle
          cx="400"
          cy="90"
          r="10"
          fill="#8be9ff"
          filter="url(#orbit-glow)"
        />

        <circle
          cx="400"
          cy="710"
          r="7"
          fill="#7c5cff"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: moduleRotate,
          transformOrigin: "400px 400px"
        }}
      >
        {[
          [326, 102, 148, 76, "Projects"],
          [585, 220, 142, 76, "Approvals"],
          [590, 506, 142, 76, "Reporting"],
          [326, 620, 148, 76, "Billing"],
          [73, 503, 142, 76, "Files"],
          [73, 217, 142, 76, "Messages"]
        ].map(([x, y, width, height, label]) => (
          <g key={String(label)}>
            <rect
              x={Number(x)}
              y={Number(y)}
              width={Number(width)}
              height={Number(height)}
              rx="20"
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="2"
            />

            <rect
              x={Number(x) + 18}
              y={Number(y) + 19}
              width="38"
              height="6"
              rx="3"
              fill="#8be9ff"
              fillOpacity="0.75"
            />

            <text
              x={Number(x) + 18}
              y={Number(y) + 50}
              fill="rgba(255,255,255,0.52)"
              fontSize="14"
              fontFamily="Inter, sans-serif"
            >
              {String(label)}
            </text>
          </g>
        ))}
      </motion.g>

      <motion.g
        style={{
          scale: coreScale,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="120"
          fill="rgba(7,8,12,0.92)"
          stroke="url(#orbit-gradient)"
          strokeWidth="7"
          filter="url(#orbit-glow)"
        />

        <circle
          cx="400"
          cy="400"
          r="86"
          stroke="rgba(139,233,255,0.22)"
          strokeWidth="2"
          strokeDasharray="5 11"
        />

        <circle
          cx="400"
          cy="400"
          r="35"
          fill="url(#orbit-gradient)"
        />

        <motion.circle
          cx="400"
          cy="400"
          r="58"
          stroke="#8be9ff"
          strokeOpacity="0.3"
          animate={
            active
              ? {
                  scale: [0.8, 1.3],
                  opacity: [0.7, 0]
                }
              : {
                  scale: 0.8,
                  opacity: 0
                }
          }
          transition={{
            duration: 2.2,
            repeat: active ? Infinity : 0,
            ease: "easeOut"
          }}
          style={{
            transformOrigin: "400px 400px"
          }}
        />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 05 — LIVING MACHINE                                                        */
/* -------------------------------------------------------------------------- */

type MachineModuleProps = {
  progress: MotionValue<number>;
  x: number;
  y: number;
  width: number;
  height: number;
  fromX: number;
  fromY: number;
  fromRotate: number;
  accent?: "violet" | "cyan";
};

function MachineModule({
  progress,
  x,
  y,
  width,
  height,
  fromX,
  fromY,
  fromRotate,
  accent
}: MachineModuleProps) {
  const translateX = useTransform(
    progress,
    [0, 0.5, 1],
    [fromX, 0, fromX * -0.16]
  );

  const translateY = useTransform(
    progress,
    [0, 0.5, 1],
    [fromY, 0, fromY * -0.12]
  );

  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    [fromRotate, 0, -fromRotate * 0.2]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.66, 1, 0.92]
  );

  const fill =
    accent === "violet"
      ? "rgba(124,92,255,0.16)"
      : accent === "cyan"
        ? "rgba(41,214,255,0.12)"
        : "rgba(255,255,255,0.035)";

  const stroke =
    accent === "violet"
      ? "#9d87ff"
      : accent === "cyan"
        ? "#8be9ff"
        : "rgba(255,255,255,0.18)";

  return (
    <motion.g
      style={{
        x: translateX,
        y: translateY,
        rotate,
        scale,
        transformOrigin: `${x + width / 2}px ${y + height / 2}px`
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="22"
        fill={fill}
        stroke={stroke}
        strokeOpacity={accent ? 0.72 : 1}
        strokeWidth="2"
      />

      <path
        d={`M${x + 18} ${y + 24} H${x + width - 18}`}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
      />

      <circle
        cx={x + 24}
        cy={y + 24}
        r="5"
        fill={accent === "cyan" ? "#8be9ff" : "#7c5cff"}
      />

      <rect
        x={x + 20}
        y={y + 47}
        width={width * 0.5}
        height="7"
        rx="3.5"
        fill="rgba(255,255,255,0.17)"
      />

      <rect
        x={x + 20}
        y={y + 68}
        width={width * 0.7}
        height="5"
        rx="2.5"
        fill="rgba(255,255,255,0.08)"
      />
    </motion.g>
  );
}

function LivingMachineVisual({ progress }: VisualProps) {
  const connectionLength = useTransform(
    progress,
    [0, 0.5, 1],
    [0.04, 1, 0.68]
  );

  const machineRotate = useTransform(
    progress,
    [0, 0.5, 1],
    [-8, 0, 5]
  );

  const machineScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.82, 1.04, 0.94]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="machine-gradient"
          x1="165"
          y1="130"
          x2="665"
          y2="690"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.52" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <filter
          id="machine-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        style={{
          rotate: machineRotate,
          scale: machineScale,
          transformOrigin: "400px 400px"
        }}
      >
        {[
          "M235 270 L382 208",
          "M382 208 L552 268",
          "M235 270 L235 465",
          "M552 268 L552 465",
          "M235 465 L392 576",
          "M552 465 L392 576",
          "M392 330 L392 576",
          "M235 365 L392 330",
          "M552 365 L392 330"
        ].map((path) => (
          <motion.path
            key={path}
            d={path}
            stroke="url(#machine-gradient)"
            strokeOpacity="0.42"
            strokeWidth="3"
            strokeDasharray="8 12"
            style={{
              pathLength: connectionLength
            }}
          />
        ))}

        <MachineModule
          progress={progress}
          x={132}
          y={205}
          width={205}
          height={135}
          fromX={-230}
          fromY={-120}
          fromRotate={-18}
          accent="violet"
        />

        <MachineModule
          progress={progress}
          x={463}
          y={205}
          width={205}
          height={135}
          fromX={230}
          fromY={-130}
          fromRotate={19}
          accent="cyan"
        />

        <MachineModule
          progress={progress}
          x={132}
          y={385}
          width={205}
          height={135}
          fromX={-245}
          fromY={80}
          fromRotate={15}
        />

        <MachineModule
          progress={progress}
          x={463}
          y={385}
          width={205}
          height={135}
          fromX={250}
          fromY={90}
          fromRotate={-16}
        />

        <MachineModule
          progress={progress}
          x={292}
          y={545}
          width={216}
          height={126}
          fromX={0}
          fromY={230}
          fromRotate={7}
          accent="violet"
        />

        <motion.g
          style={{
            scale: useTransform(
              progress,
              [0, 0.5, 1],
              [0.42, 1.08, 0.92]
            ),
            transformOrigin: "392px 330px"
          }}
        >
          <circle
            cx="392"
            cy="330"
            r="91"
            fill="rgba(7,8,12,0.94)"
            stroke="url(#machine-gradient)"
            strokeWidth="6"
            filter="url(#machine-glow)"
          />

          <path
            d="M356 332 L382 358 L430 301"
            stroke="#8be9ff"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 06 — PROTECTIVE ORBIT                                                      */
/* -------------------------------------------------------------------------- */

function ProtectiveOrbitVisual({
  progress,
  active
}: VisualProps) {
  const shieldScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.44, 1.06, 1]
  );

  const shieldOpacity = useTransform(
    progress,
    [0, 0.38, 0.5, 1],
    [0.05, 0.55, 1, 1]
  );

  const outerRotate = useTransform(
    progress,
    [0, 1],
    [-110, 220]
  );

  const middleRotate = useTransform(
    progress,
    [0, 1],
    [95, -205]
  );

  const scannerRotate = useTransform(
    progress,
    [0, 1],
    [-60, 300]
  );

  const coreScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.72, 1.08, 1]
  );

  return (
    <svg
      viewBox="0 0 800 800"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="shield-gradient"
          x1="160"
          y1="120"
          x2="650"
          y2="680"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9d87ff" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#29d6ff" />
        </linearGradient>

        <radialGradient
          id="shield-fill"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(335 305) rotate(54) scale(430)"
        >
          <stop stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="0.52" stopColor="#7c5cff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#29d6ff" stopOpacity="0.025" />
        </radialGradient>

        <filter
          id="shield-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        style={{
          rotate: outerRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <ellipse
          cx="400"
          cy="400"
          rx="318"
          ry="188"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="2"
          strokeDasharray="8 14"
        />

        <g transform="translate(700 352)">
          <rect
            x="-36"
            y="-25"
            width="72"
            height="50"
            rx="14"
            fill="#0c1018"
            stroke="#8be9ff"
            strokeOpacity="0.62"
            strokeWidth="2"
          />

          <circle cx="0" cy="0" r="7" fill="#8be9ff" />
        </g>

        <g transform="translate(115 463)">
          <rect
            x="-31"
            y="-23"
            width="62"
            height="46"
            rx="13"
            fill="#0c1018"
            stroke="#7c5cff"
            strokeOpacity="0.64"
            strokeWidth="2"
          />

          <circle cx="0" cy="0" r="6" fill="#7c5cff" />
        </g>
      </motion.g>

      <motion.g
        style={{
          rotate: middleRotate,
          transformOrigin: "400px 400px"
        }}
      >
        <ellipse
          cx="400"
          cy="400"
          rx="208"
          ry="306"
          stroke="rgba(139,233,255,0.18)"
          strokeWidth="2"
        />

        <circle
          cx="400"
          cy="95"
          r="11"
          fill="#8be9ff"
          filter="url(#shield-glow)"
        />

        <circle
          cx="400"
          cy="705"
          r="8"
          fill="#7c5cff"
        />
      </motion.g>

      <motion.g
        style={{
          scale: shieldScale,
          opacity: shieldOpacity,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="232"
          fill="url(#shield-fill)"
          stroke="url(#shield-gradient)"
          strokeWidth="5"
          strokeOpacity="0.62"
        />

        <circle
          cx="400"
          cy="400"
          r="201"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeDasharray="5 11"
        />

        <motion.g
          style={{
            rotate: scannerRotate,
            transformOrigin: "400px 400px"
          }}
        >
          <path
            d="M400 168 A232 232 0 0 1 616 316"
            stroke="#8be9ff"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#shield-glow)"
          />

          <circle
            cx="400"
            cy="168"
            r="9"
            fill="#8be9ff"
          />
        </motion.g>
      </motion.g>

      <motion.g
        style={{
          scale: coreScale,
          transformOrigin: "400px 400px"
        }}
      >
        <circle
          cx="400"
          cy="400"
          r="125"
          fill="rgba(7,8,12,0.96)"
          stroke="url(#shield-gradient)"
          strokeWidth="7"
          filter="url(#shield-glow)"
        />

        <circle
          cx="400"
          cy="400"
          r="84"
          stroke="rgba(139,233,255,0.22)"
          strokeWidth="2"
          strokeDasharray="6 11"
        />

        <path
          d="M400 338 L455 361 V410 C455 454 429 481 400 495 C371 481 345 454 345 410 V361 Z"
          fill="rgba(124,92,255,0.17)"
          stroke="#8be9ff"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        <path
          d="M376 409 L393 426 L428 389"
          stroke="#8be9ff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <motion.circle
          cx="400"
          cy="400"
          r="155"
          stroke="#8be9ff"
          strokeOpacity="0.28"
          animate={
            active
              ? {
                  scale: [0.72, 1.38],
                  opacity: [0.66, 0]
                }
              : {
                  scale: 0.72,
                  opacity: 0
                }
          }
          transition={{
            duration: 2.3,
            repeat: active ? Infinity : 0,
            ease: "easeOut"
          }}
          style={{
            transformOrigin: "400px 400px"
          }}
        />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* VISUAL ROUTER                                                              */
/* -------------------------------------------------------------------------- */

export function ServiceVisual({
  index,
  progress,
  active
}: ServiceVisualProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[650px] 2xl:max-w-[700px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.14),rgba(41,214,255,0.055)_42%,transparent_72%)] blur-3xl"
      />

      <div className="relative h-full w-full">
        {index === 0 ? (
          <AsteroidVisual progress={progress} active={active} />
        ) : null}

        {index === 1 ? (
          <ReconstructionVisual progress={progress} active={active} />
        ) : null}

        {index === 2 ? (
          <ConversionTargetVisual progress={progress} active={active} />
        ) : null}

        {index === 3 ? (
          <OrbitalSystemVisual progress={progress} active={active} />
        ) : null}

        {index === 4 ? (
          <LivingMachineVisual progress={progress} active={active} />
        ) : null}

        {index === 5 ? (
          <ProtectiveOrbitVisual progress={progress} active={active} />
        ) : null}
      </div>
    </div>
  );
}