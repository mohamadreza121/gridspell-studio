import type { Metadata } from "next";

import { FitnessCoachExperience } from "@/components/landing-pages/FitnessCoachExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "VOLT — Modern Fitness Coach Landing Page Demo",
  description:
    "A high-energy modern fitness coaching landing page with cinematic training video, interactive programs, results, coaching credibility, and a bold application flow.",
  path: "/demo/fitness-coach"
});

export default function FitnessCoachDemoPage() {
  return <FitnessCoachExperience />;
}
