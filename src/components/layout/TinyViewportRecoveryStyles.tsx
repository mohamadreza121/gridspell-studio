"use client";

export function TinyViewportRecoveryStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 480px) {
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

        #main-content > * {
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
          inset: 0 !important;
          z-index: 0 !important;
          opacity: 1 !important;
          overflow: hidden !important;
          background: #07080c !important;
          background-color: #07080c !important;
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

        .home-static-layout .glass-panel,
        .home-static-layout .home-hero-mode-card,
        .home-static-layout .home-hero-mode-card > div,
        .home-static-layout [class*="bg-[#07080c]"],
        .home-static-layout [class*="bg-[#080a0f]"],
        .home-static-layout [class*="bg-[#090b11]"],
        .home-static-layout [class*="bg-[#0a0c12]"] {
          background-color: rgba(8, 10, 15, 0.42) !important;
          background-image: none !important;
        }

        .home-static-layout .home-hero-mode-host,
        .home-static-layout .home-hero-mode-card {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-static-layout > section:first-of-type > div::after {
          content: "Websites\\A A premium first impression built to convert.\\A Strategy · Interface · System";
          white-space: pre-line;
          display: block;
          position: relative;
          z-index: 26;
          margin-top: 1.35rem;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 1.15rem;
          padding: 1rem;
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.78rem;
          line-height: 1.55;
          letter-spacing: 0.01em;
          background:
            radial-gradient(circle at 82% 12%, rgba(41, 214, 255, 0.12), transparent 12rem),
            radial-gradient(circle at 14% 94%, rgba(124, 92, 255, 0.15), transparent 14rem),
            rgba(8, 10, 15, 0.52) !important;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(14px);
        }

        .home-static-layout > section:first-of-type > div:has(.home-hero-mode-host:not(:empty))::after {
          content: none !important;
          display: none !important;
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
