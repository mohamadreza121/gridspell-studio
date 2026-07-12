import type { ReactNode } from "react";

export function GalleryTightTopSpacing({ children }: { children: ReactNode }) {
  return (
    <div className="gallery-tight-top">
      {children}
      <style>{`
        .gallery-tight-top > main > section:first-child {
          padding-top: 5rem !important;
        }

        .gallery-tight-top > main > section:first-child > div.mx-auto {
          padding-top: 10px !important;
        }

        @media (min-width: 380px) {
          .gallery-tight-top > main > section:first-child {
            padding-top: 6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
