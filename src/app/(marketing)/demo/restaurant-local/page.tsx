import type { Metadata } from "next";

import { RestaurantMenuExperience } from "@/components/landing-pages/RestaurantMenuExperience";
import { RestaurantMenuFinishingTouches } from "@/components/landing-pages/RestaurantMenuFinishingTouches";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("restaurant-local");

export const metadata: Metadata = createPageMetadata({
  title: "Casa Ember — Restaurant Menu Landing Page Demo",
  description:
    "A warm restaurant landing page designed as a complete printed menu, with signature dishes, dining-room atmosphere, reservations, hours, location, and guest notes.",
  path: "/demo/restaurant-local"
});

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "restaurant-local",
    design: concept?.title ?? "Restaurant Local"
  });

  return `/start-project?${params.toString()}`;
}

export default function RestaurantLocalDemoPage() {
  const href = startHref();

  return (
    <>
      <RestaurantMenuExperience startHref={href} />
      <RestaurantMenuFinishingTouches startHref={href} />
    </>
  );
}
