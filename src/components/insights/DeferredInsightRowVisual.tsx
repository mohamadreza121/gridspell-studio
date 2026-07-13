"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { InsightArticle } from "@/config/insights";

const InsightRowVisual = dynamic(
  () =>
    import("@/components/insights/InsightRowVisual").then(
      (module) => module.InsightRowVisual
    ),
  { ssr: false }
);

export function DeferredInsightRowVisual({
  article
}: {
  article: InsightArticle;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "480px 0px", threshold: 0.01 }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef}>
      {ready ? (
        <InsightRowVisual article={article} />
      ) : (
        <div
          aria-hidden="true"
          className="relative h-[260px] overflow-hidden sm:h-[300px] lg:h-[330px]"
        >
          <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.1),rgba(41,214,255,0.035)_45%,transparent_72%)]" />
          <div className="absolute left-[18%] top-1/2 h-px w-[64%] bg-gradient-to-r from-transparent via-[#8be9ff]/20 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8be9ff]/35 bg-[#8be9ff]/10" />
        </div>
      )}
    </div>
  );
}
