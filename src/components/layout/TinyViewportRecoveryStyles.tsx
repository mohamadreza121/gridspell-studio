"use client";

export function TinyViewportRecoveryStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 480px) {
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
          opacity: 0.74 !important;
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
        .home-proof-sections,
        .home-proof-sections > section,
        .home-faq-section,
        .small-phone-home-pricing-only,
        .small-phone-home-pricing {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          position: relative !important;
        }

        .home-static-layout .home-static-scene::before,
        .home-static-layout .home-static-scene::after,
        .home-static-layout > section::before,
        .home-static-layout > section::after,
        .home-proof-sections::before,
        .home-proof-sections::after,
        .home-proof-sections > section::before,
        .home-proof-sections > section::after,
        .home-faq-section::before,
        .home-faq-section::after,
        .small-phone-home-pricing::before,
        .small-phone-home-pricing::after {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          opacity: 0 !important;
        }

        .home-experience,
        .home-static-only,
        .home-static-layout,
        .home-proof-sections,
        .home-faq-section {
          z-index: 20 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-static-layout > section,
        .home-proof-sections > section,
        .home-faq-section {
          z-index: 21 !important;
          isolation: isolate;
        }

        .home-static-layout > section > *,
        .home-proof-sections > section > *,
        .home-faq-section > * {
          position: relative !important;
          z-index: 22 !important;
        }

        .home-static-layout > .page-grid,
        .home-proof-sections > .page-grid,
        .home-faq-section > .page-grid {
          opacity: 0.1 !important;
        }

        .insight-article-page,
        .insight-article-page > section,
        .insight-article-page section {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }

        .insight-article-page section::before,
        .insight-article-page section::after,
        .insight-article-page > div:not([aria-hidden="true"])::before,
        .insight-article-page > div:not([aria-hidden="true"])::after {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          opacity: 0 !important;
        }

        .insight-article-page,
        .insight-article-page > section,
        .insight-article-page section,
        .insight-article-page section > * {
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    `}</style>
  );
}
