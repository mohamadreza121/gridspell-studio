"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";

import type { InsightArticle } from "@/config/insights";

type Accent = InsightArticle["accent"];

type VisualProps = {
  primary: string;
  secondary: string;
  spin: MotionValue<number>;
  reverseSpin: MotionValue<number>;
  draw: MotionValue<number>;
};

const accentColours: Record<
  Accent,
  {
    primary: string;
    secondary: string;
  }
> = {
  violet: {
    primary: "#9d87ff",
    secondary: "#7c5cff"
  },
  cyan: {
    primary: "#8be9ff",
    secondary: "#29d6ff"
  },
  blue: {
    primary: "#8abfff",
    secondary: "#4c8dff"
  }
};

function CaseStudyVisual({
  primary,
  secondary,
  spin,
  reverseSpin,
  draw
}: VisualProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="case-study-gradient"
          x1="100"
          y1="60"
          x2="500"
          y2="370"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>

        <filter
          id="case-study-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="11"
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M80 337 C175 283 213 120 340 111 C438 104 475 180 532 92"
        stroke="url(#case-study-gradient)"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="7 12"
        style={{
          pathLength: draw
        }}
      />

      <motion.g
        style={{
          rotate: spin,
          transformOrigin: "300px 220px"
        }}
      >
        <rect
          x="111"
          y="96"
          width="266"
          height="174"
          rx="20"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="2"
          transform="rotate(-11 244 183)"
        />

        <rect
          x="176"
          y="121"
          width="292"
          height="190"
          rx="22"
          fill="rgba(7,8,12,0.88)"
          stroke={secondary}
          strokeOpacity="0.46"
          strokeWidth="2"
          transform="rotate(7 322 216)"
        />

        <rect
          x="138"
          y="147"
          width="318"
          height="205"
          rx="24"
          fill="rgba(10,13,19,0.96)"
          stroke="url(#case-study-gradient)"
          strokeWidth="3"
          filter="url(#case-study-glow)"
        />

        <rect
          x="156"
          y="166"
          width="282"
          height="24"
          rx="12"
          fill="rgba(255,255,255,0.05)"
        />

        <circle
          cx="172"
          cy="178"
          r="4"
          fill={primary}
        />

        <circle
          cx="185"
          cy="178"
          r="4"
          fill="rgba(255,255,255,0.22)"
        />

        <rect
          x="170"
          y="219"
          width="154"
          height="12"
          rx="6"
          fill="rgba(255,255,255,0.2)"
        />

        <rect
          x="170"
          y="246"
          width="215"
          height="8"
          rx="4"
          fill="rgba(255,255,255,0.08)"
        />

        <rect
          x="170"
          y="265"
          width="175"
          height="8"
          rx="4"
          fill="rgba(255,255,255,0.06)"
        />

        <rect
          x="170"
          y="301"
          width="74"
          height="24"
          rx="12"
          fill={secondary}
          fillOpacity="0.65"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: reverseSpin,
          transformOrigin: "300px 220px"
        }}
      >
        <circle
          cx="497"
          cy="129"
          r="9"
          fill={primary}
        />

        <circle
          cx="93"
          cy="291"
          r="7"
          fill={secondary}
        />

        <circle
          cx="493"
          cy="339"
          r="5"
          fill="rgba(255,255,255,0.4)"
        />
      </motion.g>
    </svg>
  );
}

function PortalVisual({
  primary,
  secondary,
  spin,
  reverseSpin,
  draw
}: VisualProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="portal-gradient"
          x1="100"
          y1="70"
          x2="500"
          y2="370"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      <motion.g
        style={{
          rotate: spin,
          transformOrigin: "300px 210px"
        }}
      >
        <ellipse
          cx="300"
          cy="210"
          rx="232"
          ry="118"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeDasharray="7 13"
        />

        <circle
          cx="527"
          cy="192"
          r="11"
          fill={primary}
        />

        <circle
          cx="86"
          cy="248"
          r="8"
          fill={secondary}
        />
      </motion.g>

      <motion.g
        style={{
          rotate: reverseSpin,
          transformOrigin: "300px 210px"
        }}
      >
        <ellipse
          cx="300"
          cy="210"
          rx="128"
          ry="185"
          stroke={secondary}
          strokeOpacity="0.28"
          strokeWidth="2"
        />

        <circle
          cx="300"
          cy="26"
          r="8"
          fill={primary}
        />
      </motion.g>

      {[
        "M300 210 L300 70",
        "M300 210 L477 151",
        "M300 210 L467 304",
        "M300 210 L300 350",
        "M300 210 L124 304",
        "M300 210 L125 145"
      ].map((path) => (
        <motion.path
          key={path}
          d={path}
          stroke="url(#portal-gradient)"
          strokeOpacity="0.34"
          strokeWidth="2"
          strokeDasharray="6 10"
          style={{
            pathLength: draw
          }}
        />
      ))}

      {[
        [248, 49],
        [456, 111],
        [455, 286],
        [248, 330],
        [62, 274],
        [61, 102]
      ].map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width="104"
            height="55"
            rx="16"
            fill="rgba(10,13,19,0.94)"
            stroke={
              index % 2 === 0
                ? primary
                : secondary
            }
            strokeOpacity="0.45"
          />

          <rect
            x={x + 15}
            y={y + 16}
            width="28"
            height="5"
            rx="2.5"
            fill={
              index % 2 === 0
                ? primary
                : secondary
            }
          />

          <rect
            x={x + 15}
            y={y + 32}
            width="61"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />
        </g>
      ))}

      <circle
        cx="300"
        cy="210"
        r="73"
        fill="rgba(7,8,12,0.95)"
        stroke="url(#portal-gradient)"
        strokeWidth="4"
      />

      <circle
        cx="300"
        cy="210"
        r="30"
        fill={secondary}
        fillOpacity="0.52"
      />
    </svg>
  );
}

function CostVisual({
  primary,
  secondary,
  spin,
  reverseSpin,
  draw
}: VisualProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="cost-gradient"
          x1="120"
          y1="70"
          x2="500"
          y2="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      <motion.g
        style={{
          rotate: spin,
          transformOrigin: "300px 220px"
        }}
      >
        <path
          d="M158 264 L300 188 L443 264 L300 345 Z"
          fill="rgba(124,92,255,0.08)"
          stroke="url(#cost-gradient)"
          strokeWidth="3"
        />

        <path
          d="M158 264 L158 307 L300 389 L300 345 Z"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.12)"
        />

        <path
          d="M443 264 L443 307 L300 389 L300 345 Z"
          fill="rgba(41,214,255,0.04)"
          stroke="rgba(255,255,255,0.12)"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: reverseSpin,
          transformOrigin: "300px 184px"
        }}
      >
        <path
          d="M198 196 L300 141 L402 196 L300 253 Z"
          fill="rgba(255,255,255,0.035)"
          stroke={primary}
          strokeOpacity="0.6"
          strokeWidth="2"
        />

        <path
          d="M198 196 L198 229 L300 287 L300 253 Z"
          fill="rgba(124,92,255,0.08)"
          stroke="rgba(255,255,255,0.12)"
        />

        <path
          d="M402 196 L402 229 L300 287 L300 253 Z"
          fill="rgba(41,214,255,0.06)"
          stroke="rgba(255,255,255,0.12)"
        />
      </motion.g>

      <path
        d="M244 128 L300 98 L356 128 L300 159 Z"
        fill={secondary}
        fillOpacity="0.24"
        stroke={primary}
        strokeOpacity="0.68"
        strokeWidth="2"
      />

      <motion.path
        d="M74 346 C161 300 182 103 300 76 C406 52 455 173 534 112"
        stroke="url(#cost-gradient)"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeDasharray="7 12"
        style={{
          pathLength: draw
        }}
      />

      <circle
        cx="74"
        cy="346"
        r="7"
        fill={secondary}
      />

      <circle
        cx="534"
        cy="112"
        r="9"
        fill={primary}
      />
    </svg>
  );
}

function DarkDesignVisual({
  primary,
  secondary,
  spin,
  reverseSpin,
  draw
}: VisualProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="dark-design-gradient"
          x1="80"
          y1="50"
          x2="520"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>

        <filter
          id="dark-design-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur
            stdDeviation="12"
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        style={{
          rotate: spin,
          transformOrigin: "300px 210px"
        }}
      >
        <circle
          cx="300"
          cy="210"
          r="170"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="8 14"
        />

        <motion.path
          d="M300 40 A170 170 0 0 1 455 140"
          stroke="url(#dark-design-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#dark-design-glow)"
          style={{
            pathLength: draw
          }}
        />
      </motion.g>

      <motion.g
        style={{
          rotate: reverseSpin,
          transformOrigin: "300px 210px"
        }}
      >
        <circle
          cx="300"
          cy="210"
          r="116"
          stroke={secondary}
          strokeOpacity="0.27"
          strokeWidth="2"
        />

        <circle
          cx="300"
          cy="94"
          r="8"
          fill={primary}
        />
      </motion.g>

      <rect
        x="105"
        y="118"
        width="254"
        height="165"
        rx="24"
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
        transform="rotate(-7 232 200)"
      />

      <rect
        x="238"
        y="143"
        width="262"
        height="174"
        rx="26"
        fill="rgba(7,8,12,0.78)"
        stroke="url(#dark-design-gradient)"
        strokeOpacity="0.7"
        strokeWidth="3"
        transform="rotate(8 369 230)"
      />

      <rect
        x="278"
        y="184"
        width="143"
        height="13"
        rx="6.5"
        fill="rgba(255,255,255,0.22)"
      />

      <rect
        x="278"
        y="216"
        width="176"
        height="7"
        rx="3.5"
        fill="rgba(255,255,255,0.08)"
      />

      <rect
        x="278"
        y="237"
        width="132"
        height="7"
        rx="3.5"
        fill="rgba(255,255,255,0.06)"
      />
    </svg>
  );
}

function PreparationVisual({
  primary,
  secondary,
  spin,
  reverseSpin,
  draw
}: VisualProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="preparation-gradient"
          x1="110"
          y1="60"
          x2="500"
          y2="365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      <motion.g
        style={{
          rotate: spin,
          transformOrigin: "300px 220px"
        }}
      >
        <rect
          x="119"
          y="91"
          width="275"
          height="238"
          rx="25"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          transform="rotate(-8 256 210)"
        />

        <rect
          x="193"
          y="79"
          width="287"
          height="252"
          rx="26"
          fill="rgba(9,12,18,0.96)"
          stroke="url(#preparation-gradient)"
          strokeWidth="3"
          transform="rotate(6 336 205)"
        />
      </motion.g>

      <motion.g
        style={{
          rotate: reverseSpin,
          transformOrigin: "336px 205px"
        }}
      >
        {[137, 187, 237].map((y, index) => (
          <g key={y}>
            <rect
              x="238"
              y={y}
              width="26"
              height="26"
              rx="8"
              fill={
                index < 2
                  ? secondary
                  : "rgba(255,255,255,0.035)"
              }
              fillOpacity={index < 2 ? 0.23 : 1}
              stroke={
                index < 2
                  ? primary
                  : "rgba(255,255,255,0.15)"
              }
              strokeWidth="2"
            />

            {index < 2 ? (
              <path
                d={`M245 ${y + 13} L251 ${y + 19} L260 ${y + 8}`}
                stroke={primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}

            <rect
              x="282"
              y={y + 5}
              width={index === 1 ? 118 : 151}
              height="7"
              rx="3.5"
              fill="rgba(255,255,255,0.15)"
            />

            <rect
              x="282"
              y={y + 18}
              width={index === 2 ? 101 : 132}
              height="5"
              rx="2.5"
              fill="rgba(255,255,255,0.06)"
            />
          </g>
        ))}
      </motion.g>

      <motion.path
        d="M82 335 C157 295 181 82 315 48 C425 20 483 128 535 91"
        stroke="url(#preparation-gradient)"
        strokeOpacity="0.27"
        strokeWidth="2"
        strokeDasharray="7 12"
        style={{
          pathLength: draw
        }}
      />

      <circle
        cx="82"
        cy="335"
        r="7"
        fill={secondary}
      />

      <circle
        cx="535"
        cy="91"
        r="9"
        fill={primary}
      />
    </svg>
  );
}

export function InsightRowVisual({
  article
}: {
  article: InsightArticle;
}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const colours = accentColours[article.accent];

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: [
      "start end",
      "end start"
    ]
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 31,
    mass: 0.3,
    restDelta: 0.0005
  });

  const y = useTransform(
    progress,
    [0, 1],
    [32, -28]
  );

  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [-14, 0, 14]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.9, 1.03, 0.94]
  );

  const opacity = useTransform(
    progress,
    [0, 0.18, 0.82, 1],
    [0.2, 1, 1, 0.28]
  );

  const spin = useTransform(
    progress,
    [0, 1],
    [-12, 18]
  );

  const reverseSpin = useTransform(
    progress,
    [0, 1],
    [16, -18]
  );

  const draw = useTransform(
    progress,
    [0, 0.24, 0.72, 1],
    [0.08, 1, 1, 0.35]
  );

  let visual;

  switch (article.slug) {
    case "why-case-studies-sell-better-than-galleries":
      visual = (
        <CaseStudyVisual
          primary={colours.primary}
          secondary={colours.secondary}
          spin={spin}
          reverseSpin={reverseSpin}
          draw={draw}
        />
      );
      break;

    case "when-your-business-needs-a-client-portal":
      visual = (
        <PortalVisual
          primary={colours.primary}
          secondary={colours.secondary}
          spin={spin}
          reverseSpin={reverseSpin}
          draw={draw}
        />
      );
      break;

    case "what-affects-the-cost-of-a-custom-nextjs-website":
      visual = (
        <CostVisual
          primary={colours.primary}
          secondary={colours.secondary}
          spin={spin}
          reverseSpin={reverseSpin}
          draw={draw}
        />
      );
      break;

    case "how-to-make-a-dark-website-feel-premium":
      visual = (
        <DarkDesignVisual
          primary={colours.primary}
          secondary={colours.secondary}
          spin={spin}
          reverseSpin={reverseSpin}
          draw={draw}
        />
      );
      break;

    default:
      visual = (
        <PreparationVisual
          primary={colours.primary}
          secondary={colours.secondary}
          spin={spin}
          reverseSpin={reverseSpin}
          draw={draw}
        />
      );
  }

  return (
    <div
      ref={visualRef}
      className="relative h-[260px] w-full overflow-hidden sm:h-[300px] lg:h-[330px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full blur-[75px]"
        style={{
          background: `radial-gradient(circle, ${colours.secondary}24, transparent 68%)`
        }}
      />

      <motion.div
        className="relative h-full w-full"
        style={
          reduceMotion
            ? undefined
            : {
                x,
                y,
                scale,
                opacity
              }
        }
      >
        {visual}
      </motion.div>
    </div>
  );
}