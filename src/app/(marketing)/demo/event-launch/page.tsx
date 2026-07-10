import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Event Launch Landing Page Demo",
  description: "A campaign-style event landing page demo for workshops, conferences, launches, ticket pages, and local events.",
  path: "/demo/event-launch"
});

export default function EventLaunchDemoPage() {
  return (
    <DemoConceptPage
      slug="event-launch"
      eyebrow="Event campaign demo"
      headline="Turn interest into registrations."
      subheadline="A high-energy event page direction for workshops, conferences, meetups, and launches with speakers, schedule, ticket tiers, venue details, and registration CTAs."
      primaryAction="Start this event page"
      secondaryAction="View registration flow"
      visualTitle="Tickets claimed"
      visualMetric="327"
      proofPoints={["Speaker cards", "Schedule blocks", "Registration CTA"]}
      featureCards={[
        { title: "Campaign hero", copy: "Lead with the event promise, date, location, and registration action in a campaign-style first impression." },
        { title: "Speaker lineup", copy: "Show hosts, guests, instructors, or panelists with quick credibility blocks." },
        { title: "Schedule clarity", copy: "Break the event into sessions, agenda points, workshop modules, or launch moments." },
        { title: "Ticket tiers", copy: "Present free, early bird, VIP, or group options with a direct registration path." }
      ]}
      sectionEyebrow="Event funnel"
      sectionTitle="A landing page for urgency, clarity, and signups."
      sectionCopy="The layout helps visitors understand why the event matters, who it is for, and how to reserve their spot."
      closingTitle="Use this direction for a workshop, conference, meetup, or launch event."
    />
  );
}
