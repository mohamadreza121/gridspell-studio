type GlassArtProps = {
  className?: string;
};

export function SensorArrayGlassArtwork({ className = "" }: GlassArtProps) {
  return (
    <div className={`aura-story-art aura-sensor-art ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="sensor-panel" x1="70" y1="60" x2="830" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(248,254,255,0.22)" />
            <stop offset="0.34" stopColor="rgba(151,236,249,0.075)" />
            <stop offset="0.68" stopColor="rgba(255,255,255,0.045)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.13)" />
          </linearGradient>
          <linearGradient id="sensor-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.86)" />
            <stop offset="0.46" stopColor="rgba(186,230,239,0.25)" />
            <stop offset="1" stopColor="rgba(34,211,238,0.62)" />
          </linearGradient>
          <linearGradient id="sensor-strip" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="0.5" stopColor="rgba(103,232,249,0.065)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.035)" />
          </linearGradient>
          <linearGradient id="sensor-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.5" stopColor="rgba(224,252,255,0.62)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="sensor-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(103,232,249,0.28)" />
            <stop offset="0.48" stopColor="rgba(56,189,248,0.08)" />
            <stop offset="1" stopColor="rgba(2,6,23,0)" />
          </radialGradient>
          <filter id="sensor-shadow" x="-30%" y="-40%" width="160%" height="190%">
            <feDropShadow dx="0" dy="30" stdDeviation="28" floodColor="#020617" floodOpacity="0.48" />
            <feDropShadow dx="0" dy="0" stdDeviation="11" floodColor="#22d3ee" floodOpacity="0.14" />
          </filter>
          <filter id="sensor-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <clipPath id="sensor-clip">
            <path d="M94 105 L209 45 L686 45 L826 132 L854 264 L818 396 L852 476 L731 574 L189 557 L68 448 L91 319 L47 219 Z" />
          </clipPath>
        </defs>

        <ellipse className="aura-sensor-aura" cx="480" cy="300" rx="390" ry="240" fill="url(#sensor-aura)" filter="url(#sensor-soft)" />

        <g className="aura-sensor-main" filter="url(#sensor-shadow)">
          <path d="M94 105 L209 45 L686 45 L826 132 L854 264 L818 396 L852 476 L731 574 L189 557 L68 448 L91 319 L47 219 Z" fill="url(#sensor-panel)" stroke="url(#sensor-edge)" strokeWidth="2.2" />

          <path d="M91 126 L686 88 L735 137 L121 184 Z" fill="url(#sensor-strip)" stroke="rgba(224,252,255,0.28)" strokeWidth="1.35" />
          <path d="M74 222 L808 166 L828 235 L88 294 Z" fill="rgba(103,232,249,0.035)" stroke="rgba(224,252,255,0.22)" strokeWidth="1.35" />
          <path d="M91 319 L820 264 L809 340 L83 397 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(224,252,255,0.19)" strokeWidth="1.35" />
          <path d="M76 439 L799 382 L829 448 L116 507 Z" fill="rgba(103,232,249,0.025)" stroke="rgba(224,252,255,0.20)" strokeWidth="1.35" />

          <path d="M209 45 L248 174 L208 282 L252 384 L189 557" fill="none" stroke="rgba(224,252,255,0.22)" strokeWidth="1.35" />
          <path d="M431 45 L449 154 L407 272 L452 366 L418 565" fill="none" stroke="rgba(224,252,255,0.18)" strokeWidth="1.25" />
          <path d="M686 45 L659 142 L712 248 L662 359 L731 574" fill="none" stroke="rgba(103,232,249,0.26)" strokeWidth="1.45" />

          <g className="aura-sensor-pulses">
            <circle cx="735" cy="137" r="7" fill="rgba(224,252,255,0.92)" />
            <circle cx="735" cy="137" r="18" fill="none" stroke="rgba(103,232,249,0.40)" strokeWidth="2" />
            <circle cx="449" cy="154" r="5" fill="rgba(165,243,252,0.88)" />
            <circle cx="248" cy="174" r="4" fill="rgba(224,252,255,0.82)" />
          </g>

          <g clipPath="url(#sensor-clip)">
            <rect className="aura-sensor-sheen" x="-360" y="-100" width="150" height="860" fill="url(#sensor-sheen)" transform="rotate(12 0 0)" opacity="0.46" />
          </g>
        </g>

        <g className="aura-sensor-fragments">
          <polygon className="aura-sensor-fragment aura-sensor-fragment-1" points="37,114 98,63 128,126 61,176" fill="url(#sensor-strip)" stroke="rgba(224,252,255,0.52)" strokeWidth="1.4" />
          <polygon className="aura-sensor-fragment aura-sensor-fragment-2" points="257,8 421,14 374,51 226,39" fill="url(#sensor-strip)" stroke="rgba(224,252,255,0.42)" strokeWidth="1.3" />
          <polygon className="aura-sensor-fragment aura-sensor-fragment-3" points="730,18 827,65 783,112 704,62" fill="url(#sensor-strip)" stroke="rgba(103,232,249,0.54)" strokeWidth="1.4" />
          <polygon className="aura-sensor-fragment aura-sensor-fragment-4" points="839,330 897,355 860,427 816,391" fill="url(#sensor-strip)" stroke="rgba(224,252,255,0.44)" strokeWidth="1.4" />
          <polygon className="aura-sensor-fragment aura-sensor-fragment-5" points="609,573 793,594 737,620 571,604" fill="url(#sensor-strip)" stroke="rgba(103,232,249,0.40)" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

export function MotionStoryGlassArtwork({ className = "" }: GlassArtProps) {
  return (
    <div className={`aura-story-art aura-motion-art ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="motion-panel" x1="80" y1="90" x2="820" y2="535" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="0.4" stopColor="rgba(148,163,184,0.065)" />
            <stop offset="0.72" stopColor="rgba(103,232,249,0.055)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.11)" />
          </linearGradient>
          <linearGradient id="motion-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.78)" />
            <stop offset="0.55" stopColor="rgba(203,213,225,0.22)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.44)" />
          </linearGradient>
          <linearGradient id="motion-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="0.48" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="1" stopColor="rgba(103,232,249,0.04)" />
          </linearGradient>
          <linearGradient id="motion-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="motion-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(125,211,252,0.18)" />
            <stop offset="0.52" stopColor="rgba(103,232,249,0.05)" />
            <stop offset="1" stopColor="rgba(2,6,23,0)" />
          </radialGradient>
          <filter id="motion-shadow" x="-35%" y="-45%" width="180%" height="200%">
            <feDropShadow dx="0" dy="36" stdDeviation="30" floodColor="#020617" floodOpacity="0.50" />
            <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#67e8f9" floodOpacity="0.09" />
          </filter>
          <filter id="motion-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15" /></filter>
          <clipPath id="motion-clip"><path d="M54 148 L164 62 L746 29 L855 138 L816 245 L878 349 L789 452 L842 516 L673 586 L126 548 L35 432 L97 323 L38 236 Z" /></clipPath>
        </defs>

        <ellipse className="aura-motion-aura" cx="460" cy="310" rx="400" ry="250" fill="url(#motion-aura)" filter="url(#motion-soft)" />

        <g className="aura-motion-main" filter="url(#motion-shadow)">
          <path d="M54 148 L164 62 L746 29 L855 138 L816 245 L878 349 L789 452 L842 516 L673 586 L126 548 L35 432 L97 323 L38 236 Z" fill="url(#motion-panel)" stroke="url(#motion-edge)" strokeWidth="2.25" />

          <path d="M72 154 L744 89 L805 142 L106 219 Z" fill="url(#motion-band)" stroke="rgba(238,252,255,0.24)" strokeWidth="1.35" />
          <path d="M92 245 L817 176 L789 257 L76 333 Z" fill="rgba(255,255,255,0.035)" stroke="rgba(238,252,255,0.20)" strokeWidth="1.3" />
          <path d="M97 323 L829 250 L861 332 L68 419 Z" fill="rgba(103,232,249,0.03)" stroke="rgba(238,252,255,0.18)" strokeWidth="1.3" />
          <path d="M52 437 L790 361 L758 447 L117 523 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(238,252,255,0.19)" strokeWidth="1.3" />

          <path d="M164 62 L106 219 L179 300 L117 523" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.25" />
          <path d="M409 48 L367 191 L445 274 L390 496 L414 570" fill="none" stroke="rgba(255,255,255,0.17)" strokeWidth="1.2" />
          <path d="M746 29 L704 121 L769 209 L711 391 L789 452" fill="none" stroke="rgba(103,232,249,0.22)" strokeWidth="1.35" />

          <g clipPath="url(#motion-clip)">
            <rect className="aura-motion-sheen" x="-390" y="-180" width="210" height="990" fill="url(#motion-sheen)" transform="rotate(9 0 0)" opacity="0.42" />
          </g>
        </g>

        <g className="aura-motion-trails" fill="none" strokeLinecap="round">
          <path d="M42 103 L284 78" stroke="rgba(224,252,255,0.34)" strokeWidth="2" />
          <path d="M14 190 L236 166" stroke="rgba(103,232,249,0.22)" strokeWidth="1.5" />
          <path d="M675 574 L882 552" stroke="rgba(224,252,255,0.26)" strokeWidth="1.7" />
        </g>

        <g className="aura-motion-fragments">
          <polygon className="aura-motion-fragment aura-motion-fragment-1" points="11,91 98,49 126,102 35,138" fill="url(#motion-band)" stroke="rgba(255,255,255,0.48)" strokeWidth="1.4" />
          <polygon className="aura-motion-fragment aura-motion-fragment-2" points="246,4 446,0 381,39 218,45" fill="url(#motion-band)" stroke="rgba(255,255,255,0.42)" strokeWidth="1.3" />
          <polygon className="aura-motion-fragment aura-motion-fragment-3" points="768,2 886,54 833,101 725,46" fill="url(#motion-band)" stroke="rgba(103,232,249,0.46)" strokeWidth="1.4" />
          <polygon className="aura-motion-fragment aura-motion-fragment-4" points="833,261 900,286 862,371 811,338" fill="url(#motion-band)" stroke="rgba(255,255,255,0.46)" strokeWidth="1.4" />
          <polygon className="aura-motion-fragment aura-motion-fragment-5" points="696,576 890,591 822,620 651,609" fill="url(#motion-band)" stroke="rgba(103,232,249,0.38)" strokeWidth="1.3" />
          <polygon className="aura-motion-fragment aura-motion-fragment-6" points="19,482 116,447 145,535 47,574" fill="url(#motion-band)" stroke="rgba(255,255,255,0.40)" strokeWidth="1.35" />
        </g>
      </svg>
    </div>
  );
}

export function IntelligenceGlassArtwork({ className = "" }: GlassArtProps) {
  return (
    <div className={`aura-story-art aura-intelligence-art ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="intelligence-main" x1="84" y1="58" x2="820" y2="564" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="0.28" stopColor="rgba(226,232,240,0.08)" />
            <stop offset="0.56" stopColor="rgba(103,232,249,0.05)" />
            <stop offset="0.82" stopColor="rgba(196,181,253,0.055)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.14)" />
          </linearGradient>
          <linearGradient id="intelligence-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.90)" />
            <stop offset="0.45" stopColor="rgba(203,213,225,0.25)" />
            <stop offset="0.75" stopColor="rgba(165,243,252,0.38)" />
            <stop offset="1" stopColor="rgba(196,181,253,0.42)" />
          </linearGradient>
          <linearGradient id="intelligence-facet-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(255,255,255,0.18)" /><stop offset="1" stopColor="rgba(103,232,249,0.025)" /></linearGradient>
          <linearGradient id="intelligence-facet-b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(196,181,253,0.11)" /><stop offset="1" stopColor="rgba(255,255,255,0.025)" /></linearGradient>
          <linearGradient id="intelligence-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="rgba(255,255,255,0)" /><stop offset="0.5" stopColor="rgba(255,255,255,0.68)" /><stop offset="1" stopColor="rgba(255,255,255,0)" /></linearGradient>
          <radialGradient id="intelligence-core" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="rgba(224,252,255,0.48)" /><stop offset="0.22" stopColor="rgba(103,232,249,0.18)" /><stop offset="0.58" stopColor="rgba(196,181,253,0.06)" /><stop offset="1" stopColor="rgba(2,6,23,0)" /></radialGradient>
          <filter id="intelligence-shadow" x="-35%" y="-45%" width="180%" height="200%"><feDropShadow dx="0" dy="34" stdDeviation="30" floodColor="#020617" floodOpacity="0.48" /><feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#a5f3fc" floodOpacity="0.12" /></filter>
          <filter id="intelligence-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16" /></filter>
          <clipPath id="intelligence-clip"><path d="M118 83 L330 28 L570 40 L793 104 L853 265 L822 457 L683 579 L404 590 L176 548 L61 401 L70 205 Z" /></clipPath>
        </defs>

        <ellipse className="aura-intelligence-core" cx="490" cy="320" rx="360" ry="250" fill="url(#intelligence-core)" filter="url(#intelligence-soft)" />

        <g className="aura-intelligence-main" filter="url(#intelligence-shadow)">
          <path d="M118 83 L330 28 L570 40 L793 104 L853 265 L822 457 L683 579 L404 590 L176 548 L61 401 L70 205 Z" fill="url(#intelligence-main)" stroke="url(#intelligence-edge)" strokeWidth="2.35" />

          <polygon points="118,83 330,28 394,177 214,238 70,205" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.24)" strokeWidth="1.35" />
          <polygon points="330,28 570,40 604,191 394,177" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.22)" strokeWidth="1.35" />
          <polygon points="570,40 793,104 720,246 604,191" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.22)" strokeWidth="1.35" />
          <polygon points="793,104 853,265 720,246" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.28)" strokeWidth="1.35" />

          <polygon points="70,205 214,238 248,393 61,401" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.18)" strokeWidth="1.3" />
          <polygon points="214,238 394,177 459,319 248,393" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.20)" strokeWidth="1.3" />
          <polygon points="394,177 604,191 662,348 459,319" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.18)" strokeWidth="1.3" />
          <polygon points="604,191 720,246 822,457 662,348" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.20)" strokeWidth="1.3" />

          <polygon points="61,401 248,393 404,590 176,548" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.20)" strokeWidth="1.3" />
          <polygon points="248,393 459,319 512,493 404,590" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.18)" strokeWidth="1.3" />
          <polygon points="459,319 662,348 683,579 512,493" fill="url(#intelligence-facet-a)" stroke="rgba(239,248,255,0.20)" strokeWidth="1.3" />
          <polygon points="662,348 822,457 683,579" fill="url(#intelligence-facet-b)" stroke="rgba(239,248,255,0.22)" strokeWidth="1.3" />

          <path d="M124 89 L329 35 L566 47" fill="none" stroke="rgba(255,255,255,0.74)" strokeWidth="3" strokeLinecap="round" />
          <path d="M796 111 L846 267 L818 448" fill="none" stroke="rgba(165,243,252,0.44)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M179 540 L402 582 L678 571" fill="none" stroke="rgba(196,181,253,0.30)" strokeWidth="2.1" strokeLinecap="round" />

          <g clipPath="url(#intelligence-clip)"><rect className="aura-intelligence-sheen" x="-340" y="-120" width="180" height="900" fill="url(#intelligence-sheen)" transform="rotate(16 0 0)" opacity="0.46" /></g>
        </g>

        <g className="aura-intelligence-orbit" fill="none" stroke="rgba(165,243,252,0.25)">
          <ellipse cx="490" cy="320" rx="270" ry="155" strokeWidth="1.1" strokeDasharray="7 13" />
          <ellipse cx="490" cy="320" rx="190" ry="104" strokeWidth="0.9" strokeDasharray="4 10" />
        </g>

        <g className="aura-intelligence-fragments">
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-1" points="41,115 111,62 142,119 75,169" fill="url(#intelligence-facet-a)" stroke="rgba(255,255,255,0.54)" strokeWidth="1.45" />
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-2" points="233,3 375,9 327,42 207,35" fill="url(#intelligence-facet-b)" stroke="rgba(255,255,255,0.44)" strokeWidth="1.3" />
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-3" points="690,13 819,54 773,106 656,64" fill="url(#intelligence-facet-a)" stroke="rgba(165,243,252,0.46)" strokeWidth="1.35" />
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-4" points="835,330 900,370 858,438 811,391" fill="url(#intelligence-facet-b)" stroke="rgba(255,255,255,0.48)" strokeWidth="1.4" />
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-5" points="617,578 777,595 716,620 576,607" fill="url(#intelligence-facet-a)" stroke="rgba(196,181,253,0.42)" strokeWidth="1.35" />
          <polygon className="aura-intelligence-fragment aura-intelligence-fragment-6" points="24,428 95,398 126,472 49,510" fill="url(#intelligence-facet-b)" stroke="rgba(255,255,255,0.44)" strokeWidth="1.35" />
        </g>
      </svg>
    </div>
  );
}
