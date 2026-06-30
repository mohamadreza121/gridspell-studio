import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

function GridSpellMark({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        "group/mark relative block shrink-0",
        compact
          ? "h-10 w-10"
          : "h-11 w-11 sm:h-12 sm:w-12"
      ].join(" ")}
    >
      {/* Ambient glow */}
      <span className="absolute inset-[10%] rounded-full bg-[#7c5cff]/35 blur-xl transition duration-500 group-hover/mark:bg-[#29d6ff]/30" />

      {/* Dark glass tile */}
      <span className="absolute inset-0 overflow-hidden rounded-[27%] border border-white/[0.11] bg-[#0a0c12]/95 shadow-[0_14px_45px_rgba(0,0,0,.34)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_17%,rgba(168,149,255,.18),transparent_42%),radial-gradient(circle_at_82%_84%,rgba(41,214,255,.14),transparent_46%)]" />
      </span>

      {/* SVG geometric G */}
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-[15%] h-[70%] w-[70%] overflow-visible transition-transform duration-500 ease-out group-hover/mark:rotate-[2deg] group-hover/mark:scale-[1.045]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="gridspell-mark-gradient"
            x1="13"
            y1="11"
            x2="53"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A895FF" />
            <stop offset="36%" stopColor="#7C5CFF" />
            <stop offset="70%" stopColor="#4E8EFF" />
            <stop offset="100%" stopColor="#29D6FF" />
          </linearGradient>

          <filter
            id="gridspell-mark-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur
              stdDeviation="2.2"
              result="blur"
            />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 .52 0
              "
              result="softGlow"
            />

            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main rounded geometric G */}
        <path
          d="
            M48 17
            L41 12
            H25
            L12 24
            V40
            L25 52
            H41
            L52 42
            V33
            H34
          "
          stroke="url(#gridspell-mark-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#gridspell-mark-glow)"
        />

        {/* Interior terminal */}
        <path
          d="M52 33 V40"
          stroke="#29D6FF"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Precision seams */}
        <path
          d="M21.5 15.5 L27 21"
          stroke="rgba(255,255,255,.62)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />

        <path
          d="M13 37.5 H21"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />

        <path
          d="M39 47.5 L43.5 52"
          stroke="rgba(255,255,255,.52)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />

        <path
          d="M46.5 33 H52"
          stroke="rgba(255,255,255,.56)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      {/* Glass edge */}
      <span className="absolute inset-[6%] rounded-[23%] border border-white/[0.045]" />
    </span>
  );
}

export function Logo({
  compact = false,
  className = ""
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="GridSpell home"
      className={[
        "group/logo inline-flex items-center gap-3",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[#8be9ff]/70",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-[#07080c]",
        className
      ].join(" ")}
    >
      <GridSpellMark compact={compact} />

      {!compact ? (
        <span className="relative flex items-baseline font-display">
          <span className="text-[1.15rem] font-semibold tracking-[-0.055em] text-white sm:text-[1.3rem]">
            Grid
          </span>

          <span className="bg-gradient-to-r from-[#a895ff] via-[#78a7ff] to-[#8be9ff] bg-clip-text text-[1.15rem] font-semibold tracking-[-0.055em] text-transparent sm:text-[1.3rem]">
            Spell
          </span>

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] transition-all duration-500 group-hover/logo:w-full" />
        </span>
      ) : null}
    </Link>
  );
}

export { GridSpellMark };