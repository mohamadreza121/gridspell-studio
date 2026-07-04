import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { packages } from "@/config/packages";

const formatter = new Intl.NumberFormat("en-CA", {
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

export function SmallPhonePricingFallback() {
  return (
    <main className="small-phone-pricing-page">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-[#29d6ff]/10 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9rem] top-96 h-72 w-72 rounded-full bg-[#7c5cff]/13 blur-[90px]" />

      <Container className="relative">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
          Clear scope. Honest pricing.
        </p>

        <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,16vw,4.25rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-white">
          Choose a starting point.
        </h1>

        <p className="mt-6 text-base leading-8 text-white/48">
          Small screens get a simplified pricing view so every package, price, and
          call-to-action stays easy to tap.
        </p>

        <div className="mt-9 grid gap-4">
          {packages.map((item) => {
            const high = highRange(item.startingPrice);

            return (
              <article
                key={item.id}
                className={item.highlighted ? "small-phone-card small-phone-card--featured" : "small-phone-card"}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                      {item.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
                      {item.name}
                    </h2>
                  </div>

                  {item.highlighted ? (
                    <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-3 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-[#8be9ff]">
                      Popular
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-white">
                  {formatter.format(item.startingPrice)}–{formatter.format(high)}
                </p>
                <p className="mt-2 text-sm text-[#8be9ff]">{item.timeline}</p>
                <p className="mt-5 text-sm leading-7 text-white/46">{item.summary}</p>

                <ul className="mt-6 grid gap-3 border-t border-white/[0.08] pt-5">
                  {item.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-white/56">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={startProjectHref(item, high)}
                  className="small-phone-button mt-7"
                >
                  Start with {item.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-7 rounded-[1.4rem] border border-white/[0.09] bg-white/[0.025] p-4">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
            Need help choosing?
          </p>
          <p className="mt-3 text-sm leading-7 text-white/46">
            Send the project form and GridSpell will recommend the correct scope,
            timeline, and starting point before anything is approved.
          </p>
          <a href="/start-project" className="small-phone-button mt-5">
            Request a recommendation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </main>
  );
}
