"use client";

export function TinyViewportRecoveryStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 379px) {
        main,
        main section,
        main article,
        .tiny-viewport-content,
        .tiny-viewport-content main,
        .tiny-viewport-content section,
        .tiny-viewport-content article,
        .tiny-viewport-content div {
          visibility: visible !important;
        }

        main [style*="opacity: 0"],
        main [style*="opacity:0"],
        .tiny-viewport-content [style*="opacity: 0"],
        .tiny-viewport-content [style*="opacity:0"] {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          visibility: visible !important;
        }

        main [style*="translate"],
        main [style*="blur"],
        .tiny-viewport-content [style*="translate"],
        .tiny-viewport-content [style*="blur"] {
          transform: none !important;
          filter: none !important;
        }

        .home-mobile-g-background {
          display: block !important;
          opacity: 1 !important;
          z-index: 0 !important;
        }

        .home-mobile-g-main {
          opacity: 0.72 !important;
          transform: translateX(4vw) translateY(0.75rem) scale(1.08) !important;
        }

        .home-mobile-g-outline {
          opacity: 0.42 !important;
          transform: translateX(3vw) translateY(0.65rem) scale(1.08) !important;
        }

        .home-experience,
        .home-static-only,
        .home-static-layout,
        .home-static-layout > section,
        .home-static-layout .home-static-scene,
        .home-experience + div,
        .home-experience + div > section,
        .home-faq-section,
        .small-phone-home-pricing-only,
        .small-phone-home-pricing {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }

        .home-static-layout .home-static-scene::before,
        .home-static-layout > section:first-of-type::before,
        .home-experience + div::before,
        .home-experience + div > section::before,
        .home-faq-section::before,
        .small-phone-home-pricing::before {
          background: transparent !important;
          background-image: none !important;
          opacity: 0 !important;
        }

        .home-experience + div > [aria-hidden="true"],
        .home-faq-section > .page-grid,
        .home-static-layout > .page-grid {
          opacity: 0.12 !important;
        }

        .home-experience,
        .home-static-only,
        .home-static-layout,
        .home-experience + div,
        .home-faq-section {
          position: relative !important;
          z-index: 20 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    `}</style>
  );
}
