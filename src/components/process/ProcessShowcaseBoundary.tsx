"use client";

import { ClientDashboardTour } from "@/components/process/dashboard-tour/ClientDashboardTour";
import { ProcessPhoneMockup } from "@/components/process/ProcessPhoneMockup";
import { ProcessTabletPortalPreview } from "@/components/process/ProcessTabletPortalPreview";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function ProcessShowcaseBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const isTablet = useMediaQuery("(min-width: 640px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (reduceMotion) {
    return isTablet ? <ProcessTabletPortalPreview /> : <ProcessPhoneMockup />;
  }

  if (isDesktop) {
    return <ClientDashboardTour />;
  }

  return isTablet ? <ProcessTabletPortalPreview /> : <ProcessPhoneMockup />;
}
