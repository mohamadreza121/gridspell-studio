"use client";

import dynamic from "next/dynamic";

import { useMediaQuery } from "@/hooks/useMediaQuery";

function DesktopLoadingFrame() {
  return (
    <div
      className="relative min-h-dvh overflow-hidden bg-[#07080c] pt-32"
      aria-hidden="true"
    >
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="mx-auto w-full max-w-[1440px] px-12 2xl:px-16">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
          About GridSpell
        </p>
        <p className="mt-7 max-w-[9ch] text-balance font-display text-[clamp(6rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
          Structure, craft, and a little magic.
        </p>
      </div>
    </div>
  );
}

const DesktopAboutExperience = dynamic(
  () =>
    import("@/components/about/AboutExperience").then(
      (module) => module.AboutExperience
    ),
  {
    ssr: false,
    loading: DesktopLoadingFrame
  }
);

export function AboutDesktopLoader() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (!isDesktop) {
    return <DesktopLoadingFrame />;
  }

  return <DesktopAboutExperience />;
}
