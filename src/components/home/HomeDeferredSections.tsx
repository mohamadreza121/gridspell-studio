"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DeferredHomeProofSections = dynamic(
  () =>
    import("@/components/home/HomeProofSections").then(
      (module) => module.HomeProofSections
    ),
  {
    ssr: false,
    loading: () => <div className="home-deferred-placeholder" aria-hidden="true" />
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setReady(true);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) {
    return <div className="home-deferred-placeholder" aria-hidden="true" />;
  }

  return (
    <>
      <DeferredHomeProofSections />
      <DeferredHomeFAQSection />
    </>
  );
}
