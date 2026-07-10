import type { ReactNode } from "react";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="demo-page-shell">
      <style>{`
        .demo-page-shell > main > section:first-child {
          padding-top: clamp(7.5rem, 9vw, 9.5rem) !important;
        }

        @media (max-width: 640px) {
          .demo-page-shell > main > section:first-child {
            padding-top: 7rem !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
