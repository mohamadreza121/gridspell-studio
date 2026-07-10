import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Fitness Coach Landing Page Demo",
  description: "A bold fitness landing page demo for gyms, personal trainers, coaching programs, and wellness offers.",
  path: "/demo/fitness-coach"
});

export default function FitnessCoachDemoPage() {
  return (
    <DemoConceptPage
      slug="fitness-coach"
      eyebrow="Fitness offer demo"
      headline="Turn motivation into program applications."
      subheadline="A bold, high-energy landing page direction for trainers and gyms that need to show programs, results, pricing, and a clear apply CTA."
      primaryAction="Start this fitness page"
      secondaryAction="View program flow"
      visualTitle="Program applications"
      visualMetric="56 leads"
      proofPoints={["Program cards", "Result-focused proof", "Apply CTA"]}
      featureCards={[
        { title: "Transformation story", copy: "Structure the page around outcomes, coaching style, and what the client can expect." },
        { title: "Program comparison", copy: "Show training packages, online coaching, group classes, or challenge offers in a clean layout." },
        { title: "Social proof", copy: "Add before/after, testimonials, numbers, and screenshots to build confidence." },
        { title: "Application path", copy: "Drive visitors toward a form, consultation, or booking call without too many distractions." }
      ]}
      sectionEyebrow="Fitness funnel"
      sectionTitle="A campaign page for programs, challenges, and coaching offers."
      sectionCopy="The structure gives prospects motivation, proof, and a clear next step while keeping the page visually energetic."
      closingTitle="Use this direction for a gym, trainer, or coaching program."
    />
  );
}
