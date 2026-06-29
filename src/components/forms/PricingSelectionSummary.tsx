"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, CircleDollarSign, Layers3 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { packages } from "@/config/packages";

const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

export function PricingSelectionSummary() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const selectedPackage = packages.find((item) => item.id === packageId);

  if (!selectedPackage) return null;

  const estimateLow = Number(searchParams.get("estimateLow"));
  const estimateHigh = Number(searchParams.get("estimateHigh"));
  const timeline = searchParams.get("timeline") || selectedPackage.timeline;
  const addOns = searchParams.get("addOns");
  const hasEstimate = Number.isFinite(estimateLow) && Number.isFinite(estimateHigh);

  return (
    <div className="rounded-[2rem] border border-[#8be9ff]/20 bg-[radial-gradient(circle_at_90%_0%,rgba(41,214,255,0.1),transparent_18rem),rgba(11,13,19,0.9)] p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/20 bg-[#8be9ff]/7">
              <CircleDollarSign className="h-4 w-4 text-[#8be9ff]" />
            </span>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              Pricing selection
            </p>
          </div>

          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
            {selectedPackage.name} package
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/44">
            This planning range will be included as context. GridSpell will confirm the final
            scope and investment after reviewing the complete brief.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-4 text-xs font-semibold text-white/54 transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Adjust estimate
        </Link>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
            <Layers3 className="h-3.5 w-3.5 text-[#8be9ff]" />
            Package
          </dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">{selectedPackage.name}</dd>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
            <CircleDollarSign className="h-3.5 w-3.5 text-[#8be9ff]" />
            Planning range
          </dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">
            {hasEstimate
              ? `${currencyFormatter.format(estimateLow)}–${currencyFormatter.format(estimateHigh)}`
              : selectedPackage.price}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
            <CalendarDays className="h-3.5 w-3.5 text-[#8be9ff]" />
            Timeline
          </dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">{timeline}</dd>
        </div>
      </dl>

      {addOns ? (
        <p className="mt-4 rounded-2xl border border-white/[0.07] bg-black/15 px-4 py-3 text-xs leading-6 text-white/38">
          <span className="font-semibold text-white/58">Selected additions:</span> {addOns}
        </p>
      ) : null}
    </div>
  );
}
