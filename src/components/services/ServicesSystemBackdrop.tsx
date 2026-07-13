export function ServicesSystemBackdrop() {
  return (
    <div aria-hidden="true" className="services-desktop-details__backdrop">
      <div className="page-grid absolute inset-0 opacity-36" />
      <div className="services-desktop-details__aurora" />
      <div className="services-desktop-details__orbit services-desktop-details__orbit--violet" />
      <div className="services-desktop-details__orbit services-desktop-details__orbit--cyan" />

      <svg
        className="services-desktop-details__signal-map"
        viewBox="0 0 1600 3200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="services-signal-gradient"
            x1="160"
            y1="0"
            x2="1440"
            y2="3200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7C5CFF" stopOpacity="0" />
            <stop offset="0.22" stopColor="#7C5CFF" stopOpacity="0.72" />
            <stop offset="0.62" stopColor="#29D6FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="services-node-gradient">
            <stop stopColor="#B8F4FF" />
            <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M-120 280C300 330 320 780 748 820C1170 860 1090 1330 1530 1450C1810 1528 1320 2050 990 2150C570 2275 640 2790 120 3060"
          stroke="url(#services-signal-gradient)"
          strokeWidth="2"
        />
        <path
          d="M1640 650C1280 720 1390 1090 1050 1190C670 1302 850 1660 465 1770C120 1870 290 2340 -100 2460"
          stroke="url(#services-signal-gradient)"
          strokeWidth="1"
          strokeDasharray="10 22"
          opacity="0.64"
        />
        <path
          d="M170 410L520 640L945 570L1280 870L1110 1240L1420 1580L1090 1910L630 1840L390 2220L740 2580L510 2930"
          stroke="url(#services-signal-gradient)"
          strokeWidth="1"
          opacity="0.34"
        />

        {[410, 820, 1190, 1580, 1910, 2220, 2580, 2930].map((y, index) => (
          <g key={y} opacity={index % 2 === 0 ? 0.8 : 0.5}>
            <circle
              cx={index % 2 === 0 ? 520 : 1090}
              cy={y}
              r="18"
              fill="url(#services-node-gradient)"
            />
            <circle
              cx={index % 2 === 0 ? 520 : 1090}
              cy={y}
              r="3"
              fill="#8BE9FF"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
