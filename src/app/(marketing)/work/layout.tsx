import type { ReactNode } from "react";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <div data-work-route>
      {children}
      <style>{`
        @media (max-width: 767px) {
          [data-work-route],
          [data-work-route] main,
          [data-work-route] article,
          [data-work-route] picture,
          [data-work-route] img {
            max-width: 100%;
          }

          [data-work-route] {
            overflow-x: clip;
          }

          [data-work-route] .work-mobile-card {
            width: 100%;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
            content-visibility: auto;
            contain: paint style;
            contain-intrinsic-size: auto 980px;
          }

          [data-work-route] .native-selected-work-preview {
            width: 100%;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
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
