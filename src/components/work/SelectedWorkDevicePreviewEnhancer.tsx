"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { featuredProjects } from "@/config/work";

type Target = {
  host: HTMLElement;
  slug: string;
  alt: string;
};

type Variant = "tablet" | "mobile" | "small-phone";

function variantPath(slug: string, variant: Variant) {
  return `/images/work/selected-work/${slug}-${variant}.jpg`;
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
            alt=""
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function DeviceSet({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="selected-work-device-set pointer-events-none absolute inset-0 z-20">
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="tablet"
        className="selected-work-device-tablet absolute bottom-[5%] right-[3%] h-[54%] w-[34%] rounded-[1rem]"
      />
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="mobile"
        className="selected-work-device-mobile absolute bottom-[3%] right-[25%] h-[42%] w-[14%] rounded-[0.9rem]"
      />
      <DeviceFrame
        slug={slug}
        alt={alt}
        variant="small-phone"
        className="selected-work-device-small absolute bottom-[2%] right-[17%] h-[35%] w-[10.5%] rounded-[0.75rem]"
      />
      <span className="absolute bottom-[2%] right-[2%] rounded-full border border-white/12 bg-black/58 px-3 py-1.5 text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/52 backdrop-blur-xl">
        Desktop · Tablet · Mobile
      </span>
    </div>
  );
}

function ResponsiveViewportPreview({ slug, alt }: { slug: string; alt: string }) {
  return (
    <picture className="selected-work-viewport-preview pointer-events-none absolute inset-0 z-20">
      <source media="(max-width: 374px)" srcSet={variantPath(slug, "small-phone")} />
      <source media="(max-width: 767px)" srcSet={variantPath(slug, "mobile")} />
      <source media="(max-width: 1023px)" srcSet={variantPath(slug, "tablet")} />
      <img
        src={variantPath(slug, "tablet")}
        alt={`${alt} responsive website screenshot`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    </picture>
  );
}

function ResponsivePreview({ slug, alt }: { slug: string; alt: string }) {
  return (
    <>
      <ResponsiveViewportPreview slug={slug} alt={alt} />
      <DeviceSet slug={slug} alt={alt} />
    </>
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

        document.querySelectorAll<HTMLImageElement>('img[src*="/images/work/selected-work/"]').forEach((image) => {
          if (image.closest(".selected-work-device-set, .selected-work-viewport-preview")) return;

          const src = image.currentSrc || image.src;
          const project = featuredProjects.find((item) =>
            item.previewImage ? src.includes(item.previewImage.split("/").at(-1) ?? "") : false
          );
          if (!project) return;

          const host = image.parentElement;
          if (!host || host.dataset.selectedWorkDeviceHost === "true") return;

          host.dataset.selectedWorkDeviceHost = "true";
          host.classList.add("selected-work-responsive-host");
          next.push({
            host,
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
        .selected-work-responsive-host {
          position: relative !important;
          isolation: isolate;
        }

        .selected-work-responsive-host > img {
          transform-origin: top left;
        }

        .selected-work-viewport-preview {
          display: none;
        }

        @media (max-width: 1023px) {
          .selected-work-responsive-host {
            height: auto !important;
            min-height: 0 !important;
            overflow: hidden !important;
          }

          .selected-work-responsive-host > img:not(.selected-work-viewport-preview img) {
            opacity: 0 !important;
          }

          .selected-work-viewport-preview {
            display: block;
          }

          .selected-work-device-set {
            display: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .selected-work-responsive-host {
            aspect-ratio: 4 / 3 !important;
          }
        }

        @media (min-width: 375px) and (max-width: 767px) {
          .selected-work-responsive-host {
            aspect-ratio: 430 / 932 !important;
            max-height: min(76svh, 760px) !important;
          }
        }

        @media (max-width: 374px) {
          .selected-work-responsive-host {
            aspect-ratio: 360 / 800 !important;
            max-height: min(76svh, 680px) !important;
          }
        }
      `}</style>
      {targets.map((target, index) =>
        createPortal(
          <ResponsivePreview key={`${target.slug}-${index}`} slug={target.slug} alt={target.alt} />,
          target.host
        )
      )}
    </>
  );
}
