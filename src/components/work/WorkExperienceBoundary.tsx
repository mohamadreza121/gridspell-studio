"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { ExperienceLab } from "@/components/work/experience-lab/ExperienceLab";
import { WorkStaticFallback } from "@/components/work/WorkStaticFallback";
import { featuredProjects } from "@/config/work";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

const workRollHeight = `${featuredProjects.length * 120 + 40}dvh`;

function WorkRollPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="relative bg-[#07080c]"
      style={{ height: workRollHeight }}
    />
  );
}

const WorkRollScene = dynamic(
  () =>
    import("@/components/work/WorkRollScene").then(
      (module) => module.WorkRollScene
    ),
  { ssr: false, loading: WorkRollPlaceholder }
);

function DeferredWorkRollScene() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={triggerRef}>
      {shouldLoad ? (
        <WorkRollScene />
      ) : (
        <WorkRollPlaceholder />
      )}
    </div>
  );
}

export function WorkExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1024px)");

  if (reduceMotion || !useDesktopExperience) {
    return <WorkStaticFallback />;
  }

  return (
    <>
      <ExperienceLab />
      <DeferredWorkRollScene />
    </>
  );
}
