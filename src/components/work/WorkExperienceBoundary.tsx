"use client";

import { ExperienceLab } from "@/components/work/experience-lab/ExperienceLab";
import { WorkRollScene } from "@/components/work/WorkRollScene";
import { WorkStaticFallback } from "@/components/work/WorkStaticFallback";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function WorkExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1024px)");

  if (reduceMotion || !useDesktopExperience) {
    return <WorkStaticFallback />;
  }

  return (
    <>
      <ExperienceLab />
      <WorkRollScene />
    </>
  );
}
