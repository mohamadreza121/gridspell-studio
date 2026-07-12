import type { ReactNode } from "react";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <div data-work-route>
      {children}
      <style>{`
        @media (max-width: 767px) {
          [data-work-route] .work-mobile-card {
            content-visibility: auto;
            contain: layout paint style;
            contain-intrinsic-size: auto 980px;
          }

          [data-work-route] .page-grid {
            display: none !important;
          }

          [data-work-route] [class*="backdrop-blur"] {
            -webkit-backdrop-filter: none !important;
            backdrop-filter: none !important;
          }

          [data-work-route] [class*="blur-["] {
            display: none !important;
          }

          [data-work-route] a,
          [data-work-route] button {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
