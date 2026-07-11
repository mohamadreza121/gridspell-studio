import type { Metadata } from "next";

import { EventLaunchExperience } from "@/components/landing-pages/EventLaunchExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "SIGNAL LIVE — Modern Event Launch Landing Page Demo",
  description:
    "A vibrant modern event landing page with a live countdown, immersive event imagery, speakers, an interactive schedule, ticket tiers, and a high-energy registration flow.",
  path: "/demo/event-launch"
});

export default function EventLaunchDemoPage() {
  return <EventLaunchExperience />;
}
