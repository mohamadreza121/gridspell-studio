export function HomeHeroRevealSmoother() {
  return (
    <style>{`
      .home-hero-mode-host {
        opacity: 1;
        transform: none;
        transition: none !important;
        will-change: auto;
      }

      .home-hero-mode-host[data-hero-mode-ready="true"] {
        opacity: 1;
        transform: none;
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
    `}</style>
  );
}
