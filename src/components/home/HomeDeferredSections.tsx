"use client";

import dynamic from "next/dynamic";

const DeferredHomeProofSections = dynamic(
  () =>
    import("@/components/home/HomeProofSections").then(
      (module) => module.HomeProofSections
    ),
  {
    ssr: false,
    loading: () => null
  }
);

const DeferredHomeFAQSection = dynamic(
  () =>
    import("@/components/home/HomeFAQSection").then(
      (module) => module.HomeFAQSection
    ),
  {
    ssr: false,
    loading: () => null
  }
);

export function HomeDeferredSections() {
  return (
    <>
      <DeferredHomeProofSections />
      <DeferredHomeFAQSection />
    </>
  );
}
