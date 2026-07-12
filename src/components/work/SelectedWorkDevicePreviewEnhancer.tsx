"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { featuredProjects } from "@/config/work";

type Target = {
  host: HTMLElement;
  mediaHost: HTMLElement;
  slug: string;
  alt: string;
};

type Variant = "tablet" | "mobile" | "small-phone";

function variantPath(slug: string, variant: Variant) {
  const suffix = variant === "tablet" ? "tablet" : `${variant}-v2`;
  return `/images/work/selected-work/${slug}-${suffix}.jpg`;
}

function DeviceFrame({
  slug,
  alt,
  variant,
  className
}: {
  slug: string;
  alt: string;
  variant: Variant;
  className: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      <div className="h-full w-full overflow-hidden rounded-[inherit] border border-white/14 bg-[#05060a] p-[3px] shadow-[0_22px_60px_rgba(0,0,0,.55)] backdrop-blur-xl">
        <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#05060a]">
          <img
            src={variantPath(slug, variant)}
            alt={`${alt} ${variant.replace("-", " ")} screenshot`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function DesktopDeviceSet({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="selected-work-device-set pointer-events-none absolute inset-0 z-20">
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="tablet"
        className="absolute bottom-[5%] right-[3%] h-[54%] w-[34%] rounded-[1rem]"
      />
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="mobile"
        className="absolute bottom-[3%] right-[25%] h-[42%] w-[14%] rounded-[0.9rem]"
      />
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="small-phone"
        className="absolute bottom-[2%] right-[17%] h-[35%] w-[10.5%] rounded-[0.75rem]"
      />
      <span className="absolute bottom-[2%] right-[2%] rounded-full border border-white/12 bg-black/58 px-3 py-1.5 text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/52 backdrop-blur-xl">
        Desktop · Tablet · Mobile
      </span>
    </div>
  );
}

function ResponsiveReplacement({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="selected-work-mobile-replacement relative z-30 hidden w-full overflow-hidden rounded-[1.45rem] border border-white/[0.12] bg-[radial-gradient(circle_at_75%_10%,rgba(41,214,255,.12),transparent_18rem),linear-gradient(145deg,#090b12,#111629)] p-4 shadow-[0_28px_90px_rgba(0,0,0,.5)] sm:p-6">
      <picture className="block w-full">
        <source media="(min-width: 768px)" srcSet={variantPath(slug, "tablet")} />
        <source media="(max-width: 374px)" srcSet={variantPath(slug, "small-phone")} />
        <img
          src={variantPath(slug, "mobile")}
          alt={alt}
          className="mx-auto block aspect-[430/932] w-[78%] max-w-[20rem] rounded-[1.85rem] border-[5px] border-[#11141b] object-cover object-top shadow-[0_28px_80px_rgba(0,0,0,.58)] ring-1 ring-white/[0.14] min-[768px]:aspect-[4/3] min-[768px]:w-full min-[768px]:max-w-none min-[768px]:rounded-[1.3rem] min-[768px]:border-[6px]"
          loading="lazy"
        />
      </picture>
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

        document
          .querySelectorAll<HTMLImageElement>('img[src*="/images/work/selected-work/"]')
          .forEach((image) => {
            const src = image.currentSrc || image.src;
            const project = featuredProjects.find((item) => {
              const filename = item.previewImage?.split("/").at(-1);
              return filename ? src.includes(filename) : false;
            });

            if (!project) return;

            const mediaHost = image.parentElement;
            const browserHost = mediaHost?.parentElement;
            if (!mediaHost || !browserHost) return;
            if (browserHost.dataset.selectedWorkResponsiveRoot === "true") return;

            browserHost.dataset.selectedWorkResponsiveRoot = "true";
            browserHost.classList.add("selected-work-browser-root");
            mediaHost.classList.add("selected-work-desktop-media-host");

            next.push({
              host: browserHost,
              mediaHost,
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
        .selected-work-desktop-media-host {
          position: relative !important;
          isolation: isolate;
        }

        @media (min-width: 1024px) {
          .selected-work-mobile-replacement {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .selected-work-browser-root {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .selected-work-browser-root > :not(.selected-work-mobile-replacement) {
            display: none !important;
          }

          .selected-work-browser-root > .selected-work-mobile-replacement {
            display: block !important;
          }

          .selected-work-device-set {
            display: none !important;
          }
        }

        @media (max-width: 479px) {
          .selected-work-mobile-replacement {
            padding: 0.85rem !important;
            border-radius: 1.25rem !important;
          }

          .selected-work-mobile-replacement img {
            width: 82% !important;
            max-width: 18.5rem !important;
          }
        }
      `}</style>

      {targets.map((target, index) => (
        <span key={`${target.slug}-${index}`}>
          {createPortal(
            <DesktopDeviceSet slug={target.slug} alt={target.alt} />,
            target.mediaHost
          )}
          {createPortal(
            <ResponsiveReplacement slug={target.slug} alt={target.alt} />,
            target.host
          )}
        </span>
      ))}
    </>
  );
}
