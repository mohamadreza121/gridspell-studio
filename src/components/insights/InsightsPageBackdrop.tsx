export function InsightsPageBackdrop() {
  return (
    <div aria-hidden="true" className="insights-page-backdrop">
      <div className="insights-page-backdrop__columns" />
      <div className="insights-page-backdrop__aurora" />
      <div className="insights-page-backdrop__lens insights-page-backdrop__lens--violet" />
      <div className="insights-page-backdrop__lens insights-page-backdrop__lens--cyan" />

      <svg
        className="insights-page-backdrop__map"
        viewBox="0 0 1600 4200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="insights-route" x1="90" y1="0" x2="1510" y2="4200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C5CFF" stopOpacity="0" />
            <stop offset="0.16" stopColor="#9D87FF" stopOpacity="0.66" />
            <stop offset="0.52" stopColor="#67AEFF" stopOpacity="0.42" />
            <stop offset="0.82" stopColor="#29D6FF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="insights-map-node">
            <stop stopColor="#D8F9FF" />
            <stop offset="0.18" stopColor="#8BE9FF" stopOpacity="0.9" />
            <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M-150 410C260 230 430 660 770 790C1120 925 1060 1270 1450 1390C1770 1490 1360 2010 1010 2140C560 2300 720 2750 280 2980C-70 3160 120 3710 500 4140"
          stroke="url(#insights-route)"
          strokeWidth="2"
        />
        <path
          d="M1690 180C1280 420 1390 850 1030 980C650 1110 770 1590 390 1750C70 1880 270 2300 -120 2480"
          stroke="url(#insights-route)"
          strokeWidth="1"
          strokeDasharray="8 24"
          opacity="0.7"
        />
        <path
          d="M180 620L490 470L820 720L1170 610L1380 980L1120 1320L1430 1650L1090 2070L660 1930L370 2380L710 2780L460 3300L840 3740"
          stroke="url(#insights-route)"
          strokeWidth="1"
          opacity="0.28"
        />

        {[470, 720, 980, 1320, 1650, 2070, 2380, 2780, 3300, 3740].map((y, index) => {
          const cx = index % 3 === 0 ? 490 : index % 3 === 1 ? 1120 : 710;

          return (
            <g key={y} opacity={index % 2 === 0 ? 0.72 : 0.46}>
              <circle cx={cx} cy={y} r="22" fill="url(#insights-map-node)" />
              <circle cx={cx} cy={y} r="3" fill="#B8F4FF" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
