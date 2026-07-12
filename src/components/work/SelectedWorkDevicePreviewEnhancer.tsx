"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { featuredProjects } from "@/config/work";

type Target = {
  host: HTMLElement;
  slug: string;
  alt: string;
};

function phoneCapturePath(slug: string, variant: "mobile" | "small-phone") {
  return `/images/work/selected-work/${slug}-${variant}-v2.jpg`;
}

function decodedImageSource(image: HTMLImageElement) {
  const source = image.currentSrc || image.src || image.getAttribute("src") || "";

  try {
    return decodeURIComponent(source);
  } catch {
    return source;
  }
}

function MobileProjectPreview({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="selected-work-phone-replacement relative hidden w-full overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-[radial-gradient(circle_at_78%_8%,rgba(41,214,255,.13),transparent_18rem),linear-gradient(145deg,#090b12,#111629)] px-3 py-5 shadow-[0_28px_90px_rgba(0,0,0,.5)]">
      <picture className="block w-full">
        <source
          media="(max-width: 374px)"
          srcSet={phoneCapturePath(slug, "small-phone")}
        />
        <img
          src={phoneCapturePath(slug, "mobile")}
          alt={alt}
          className="mx-auto block aspect-[430/932] w-[88%] max-w-[20rem] rounded-[1.75rem] border-[5px] border-[#11141b] object-cover object-top shadow-[0_28px_80px_rgba(0,0,0,.58)] ring-1 ring-white/[0.14] max-[374px]:aspect-[360/800] max-[374px]:w-[92%]"
          loading="lazy"
        />
      </picture>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]"
      />
    </div>
  );
}

export function SelectedWorkDevicePreviewEnhancer() {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    let frame = 0;
    const observer = new MutationObserver(scan);

    function scan() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next: Target[] = [];

        document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
          if (
            image.closest(
              ".selected-work-phone-replacement, .selected-work-device-set"
            )
          ) {
            return;
          }

          const source = decodedImageSource(image);
          if (!source.includes("/images/work/selected-work/")) return;

          const project = featuredProjects.find((item) => {
            const filename = item.previewImage?.split("/").at(-1);
            return filename ? source.includes(filename) : false;
          });

          if (!project) return;

          const mediaHost = image.parentElement;
          const browserHost = mediaHost?.parentElement;
          if (!mediaHost || !browserHost) return;
          if (browserHost.dataset.selectedWorkPhoneRoot === "true") return;

          browserHost.dataset.selectedWorkPhoneRoot = "true";
          browserHost.classList.add("selected-work-phone-root");

          next.push({
            host: browserHost,
            slug: project.slug,
            alt: project.previewAlt ?? project.title
          });
        });

        if (next.length > 0) {
          setTargets((current) => [...current, ...next]);
        }
      });
    }

    scan();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .selected-work-phone-replacement {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .selected-work-phone-root {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .selected-work-phone-root > :not(.selected-work-phone-replacement) {
            display: none !important;
          }

          .selected-work-phone-root > .selected-work-phone-replacement {
            display: block !important;
          }
        }

        @media (max-width: 374px) {
          .selected-work-phone-replacement {
            padding: 0.7rem !important;
            border-radius: 1.15rem !important;
          }
        }
      `}</style>

      {targets.map((target, index) =>
        createPortal(
          <MobileProjectPreview
            key={`${target.slug}-${index}`}
            slug={target.slug}
            alt={target.alt}
          />,
          target.host
        )
      )}
    </>
  );
}
