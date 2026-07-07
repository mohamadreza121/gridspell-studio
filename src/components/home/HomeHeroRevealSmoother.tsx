export function HomeHeroRevealSmoother() {
  return (
    <style>{`
      .home-hero-mode-host {
        opacity: 0;
        transform: translate3d(0, 46px, 0) scale(0.962);
        transition:
          opacity 1320ms cubic-bezier(0.16, 1, 0.3, 1) 180ms,
          transform 1320ms cubic-bezier(0.16, 1, 0.3, 1) 180ms !important;
        will-change: opacity, transform;
      }

      .home-hero-mode-host[data-hero-mode-ready="true"] {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }

      .home-hero-mode-card {
        transform-origin: 50% 58%;
      }

      @media (min-width: 1280px) {
        .home-presentation-track > .sticky > section {
          filter: none !important;
          will-change: opacity, transform !important;
        }
      }

      @media (max-width: 480px) {
        .home-static-layout .home-hero-mode-host {
          transform: none !important;
          transition: none !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .home-hero-mode-host {
          opacity: 1;
          transform: none;
          transition: none !important;
          will-change: auto;
        }
      }
    `}</style>
  );
}
