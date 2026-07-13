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

      <style jsx global>{`
        .home-deferred-placeholder {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          min-height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .home-faq-section {
          content-visibility: visible !important;
          contain-intrinsic-size: 0px !important;
          padding-top: 0 !important;
        }
      `}</style>
    </>
  );
}
