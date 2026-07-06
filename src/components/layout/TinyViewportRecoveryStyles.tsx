"use client";

export function TinyViewportRecoveryStyles() {
  return (
    <style>{`
      @media (max-width: 379px) {
        .mobile-marketing-g-background {
          display: none !important;
        }

        #main-content,
        #main-content > *,
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

        #main-content {
          position: relative !important;
          z-index: 1 !important;
          isolation: isolate !important;
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }

        #main-content > *:not(.home-mobile-g-background) {
          position: relative !important;
          z-index: 1 !important;
        }

        main,
        main > section,
        main section,
        .home-experience,
        .home-static-only,
        .home-static-layout,
        .home-static-layout > section,
        .home-static-layout > section > div,
        .home-static-layout .home-static-scene,
        .home-static-layout .home-static-scene > div,
        .home-proof-sections,
        .home-proof-sections > section,
        .home-proof-sections > section > div,
        .home-faq-section,
        .home-faq-section > div,
        .small-phone-home-pricing-only,
        .small-phone-home-pricing {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }

        .home-static-layout .bg-clip-text,
        .home-static-layout .bg-gradient-to-r.bg-clip-text,
        .home-static-layout span.bg-clip-text {
          background-image: linear-gradient(90deg, #a99aff, #7eb3ff, #8be9ff) !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        .home-static-layout .home-hero-mode-card,
        .home-static-layout .glass-panel {
          border-color: rgba(255, 255, 255, 0.12) !important;
        }

        main::before,
        main::after,
        main > section::before,
        main > section::after,
        main section::before,
        main section::after,
        .home-static-layout::before,
        .home-static-layout::after,
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
          content: none !important;
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          opacity: 0 !important;
        }

        main [style],
        .tiny-viewport-content [style] {
          opacity: 1 !important;
          visibility: visible !important;
        }

        main [style*="translate"],
        main [style*="blur"],
        main [style*="opacity: 0"],
        main [style*="opacity:0"],
        .tiny-viewport-content [style*="translate"],
        .tiny-viewport-content [style*="blur"],
        .tiny-viewport-content [style*="opacity: 0"],
        .tiny-viewport-content [style*="opacity:0"] {
          transform: none !important;
          filter: none !important;
        }

        .home-mobile-g-background {
          display: block !important;
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          min-height: 100svh !important;
          z-index: 0 !important;
          opacity: 1 !important;
          visibility: visible !important;
          overflow: hidden !important;
          background: #07080c !important;
          background-color: #07080c !important;
        }

        .home-mobile-g-main {
          opacity: 0.78 !important;
          transform: translateX(4vw) translateY(0.75rem) scale(1.08) !important;
        }

        .home-mobile-g-outline {
          opacity: 0.44 !important;
          transform: translateX(3vw) translateY(0.65rem) scale(1.08) !important;
        }

        .home-experience,
        .home-static-only,
        .home-static-layout,
        .home-proof-sections,
        .home-faq-section,
        .small-phone-home-pricing-only,
        .small-phone-home-pricing {
          position: relative !important;
          z-index: 20 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-static-layout > section,
        .home-proof-sections > section,
        .home-faq-section,
        .small-phone-home-pricing {
          position: relative !important;
          z-index: 21 !important;
          isolation: isolate;
        }

        .home-static-layout > section > *,
        .home-proof-sections > section > *,
        .home-faq-section > *,
        .small-phone-home-pricing > * {
          position: relative !important;
          z-index: 22 !important;
        }

        .home-static-layout .home-hero-mode-host,
        .home-static-layout .home-hero-mode-card {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-static-layout > .page-grid,
        .home-proof-sections > .page-grid,
        .home-faq-section > .page-grid {
          opacity: 0.1 !important;
        }
      }
    `}</style>
  );
}
