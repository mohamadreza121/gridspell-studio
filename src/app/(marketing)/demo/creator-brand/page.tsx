import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Creator Brand Landing Page Demo",
  description: "An editorial personal brand landing page demo for creators, consultants, coaches, educators, and freelancers.",
  path: "/demo/creator-brand"
});

export default function CreatorBrandDemoPage() {
  return (
    <DemoConceptPage
      slug="creator-brand"
      eyebrow="Personal brand demo"
      headline="Turn attention into an audience."
      subheadline="An editorial landing page direction for creators and consultants who need to package their offer, proof, content, and email capture in one strong page."
      primaryAction="Start this creator page"
      secondaryAction="View audience flow"
      visualTitle="New subscribers"
      visualMetric="1.8k"
      proofPoints={["Offer clarity", "Newsletter CTA", "Content proof"]}
      featureCards={[
        { title: "Personal positioning", copy: "Explain who the creator helps, what they offer, and why the visitor should care quickly." },
        { title: "Lead magnet path", copy: "Create an email capture flow around a newsletter, guide, course, or free resource." },
        { title: "Proof stack", copy: "Show testimonials, social numbers, past work, podcasts, writing, or client outcomes." },
        { title: "Content hub preview", copy: "Highlight videos, articles, case studies, or resources without building a full content platform yet." }
      ]}
      sectionEyebrow="Audience flow"
      sectionTitle="A focused page for creators with something to sell or teach."
      sectionCopy="The structure gives the visitor a clear reason to follow, subscribe, book, or buy from the personal brand."
      closingTitle="Use this direction for a creator, educator, coach, or consultant."
    />
  );
}
