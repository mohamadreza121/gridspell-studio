"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { featuredProjects } from "@/config/work";

type Target = {
  host: HTMLElement;
  slug: string;
  alt: string;
};

function variantPath(slug: string, variant: "tablet" | "mobile" | "small-phone") {
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
  variant: "tablet" | "mobile" | "small-phone";
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

        @media (max-width: 639px) {
          .selected-work-device-tablet {
            right: 2% !important;
            bottom: 5% !important;
            width: 38% !important;
            height: 50% !important;
          }

          .selected-work-device-mobile {
            right: 28% !important;
            width: 16% !important;
            height: 39% !important;
          }

          .selected-work-device-small {
            right: 19% !important;
            width: 12% !important;
            height: 32% !important;
          }

          .selected-work-device-set > span {
            display: none;
          }
        }
      `}</style>
      {targets.map((target, index) =>
        createPortal(
          <DeviceSet key={`${target.slug}-${index}`} slug={target.slug} alt={target.alt} />,
          target.host
        )
      )}
    </>
  );
}
