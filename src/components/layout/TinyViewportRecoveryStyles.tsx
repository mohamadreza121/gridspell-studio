"use client";

export function TinyViewportRecoveryStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 480px) {
        .mobile-marketing-g-background {
          pointer-events: none;
          display: block;
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #07080c;
        }

        .mobile-marketing-g-grid {
          position: absolute;
          inset: 0;
          opacity: 0.32;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .mobile-marketing-g-mark {
          position: absolute;
          right: -54vw;
          top: 4.5rem;
          width: min(170vw, 720px);
          height: min(170vw, 720px);
          opacity: 0.72;
          filter: drop-shadow(0 0 42px rgba(124, 92, 255, 0.24));
        }

        .mobile-marketing-g-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(78px);
        }

        .mobile-marketing-g-glow-one {
          right: -5rem;
          top: 7rem;
          width: 18rem;
          height: 18rem;
          background: rgba(124, 92, 255, 0.12);
        }

        .mobile-marketing-g-glow-two {
          left: -5rem;
          bottom: 10%;
          width: 14rem;
          height: 14rem;
          background: rgba(41, 214, 255, 0.07);
        }

        #main-content {
          position: relative !important;
          z-index: 1 !important;
          isolation: isolate !important;
          background: transparent !important;
          background-color: transparent !important;
        }

        #main-content > * {
          position: relative !important;
          z-index: 1 !important;
        }

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

        main {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
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

        main > section,
        main section {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
        }

        main > section::before,
        main > section::after,
        main section::before,
        main section::after {
          content: none !important;
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          opacity: 0 !important;
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
          content: none !important;
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

        .home-static-layout .home-hero-mode-host,
        .home-static-layout .home-hero-mode-card {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-static-layout > section:first-of-type > div > div:last-child {
          display: none !important;
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
            rgba(8, 10, 15, 0.68);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
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

      @media (min-width: 481px) {
        .mobile-marketing-g-background {
          display: none;
        }
      }
    `}</style>
  );
}
