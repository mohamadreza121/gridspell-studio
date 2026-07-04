import { ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { packages } from "@/config/packages";

const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

function highRange(startingPrice: number) {
  return startingPrice + Math.max(700, Math.round((startingPrice * 0.15) / 50) * 50);
}

function startProjectHref(item: (typeof packages)[number], high: number) {
  const params = new URLSearchParams({
    package: item.id,
    estimateLow: String(item.startingPrice),
    estimateHigh: String(high),
    timeline: item.timeline
  });

  return `/start-project?${params.toString()}`;
}

export function SmallPhoneHomePricing() {
  return (
    <section className="small-phone-home-pricing">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />
      <Container className="relative">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
          Investment
        </p>
        <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,15vw,4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
          Start with a clear range.
        </h2>
        <p className="mt-5 text-sm leading-7 text-white/46">
          Pick a starting point below. Each option opens the project form with the
          correct package attached, so the first conversation is easier.
        </p>

        <div className="mt-7 grid gap-3">
          {packages.map((item) => {
            const high = highRange(item.startingPrice);

            return (
              <a
                key={item.id}
                href={startProjectHref(item, high)}
                className={item.highlighted ? "small-phone-card small-phone-card--featured block" : "small-phone-card block"}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em] text-white">
                      {item.name}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" aria-hidden="true" />
                </div>
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                  {money.format(item.startingPrice)}–{money.format(high)}
                </p>
                <p className="mt-2 text-xs text-white/36">Typical timeline: {item.timeline}</p>
                <ul className="mt-4 grid gap-2">
                  {item.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex gap-2 text-xs leading-5 text-white/48">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}
        </div>

        <a href="/pricing" className="small-phone-button mt-6">
          View full pricing
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
