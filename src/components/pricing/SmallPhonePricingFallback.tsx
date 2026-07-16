import { ArrowUpRight, Check } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-[#8e78ff] to-[#8be9ff]" />
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-[#8be9ff]">
            Investment system · CAD
          </p>
        </div>

        <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(3.1rem,16vw,4.4rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
          Price the right build.
        </h1>

        <p className="mt-7 text-base leading-8 text-white/48">
          Compare realistic starting ranges. Your selected package, estimate, and timeline stay attached to the project brief.
        </p>

        <div className="mt-8 grid grid-cols-2 border border-white/[0.1]">
          <div className="border-r border-white/[0.1] p-4">
            <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">04</p>
            <p className="mt-1 text-[0.54rem] uppercase tracking-[0.17em] text-white/30">starting paths</p>
          </div>
          <div className="p-4">
            <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">Human</p>
            <p className="mt-1 text-[0.54rem] uppercase tracking-[0.17em] text-white/30">scope review</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {packages.map((item, index) => {
            const high = highRange(item.startingPrice);

            return (
              <article
                key={item.id}
                className="relative overflow-hidden border border-white/[0.1] bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.012))] p-5 [clip-path:polygon(0_0,calc(100%_-_1rem)_0,100%_1rem,100%_100%,1rem_100%,0_calc(100%_-_1rem))]"
              >
                <span className="absolute right-0 top-0 grid h-11 w-11 place-items-center border-b border-l border-white/[0.1] text-[0.56rem] tracking-[0.18em] text-white/26">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="pr-12 text-[0.56rem] font-bold uppercase tracking-[0.23em] text-[#8be9ff]">
                  {item.eyebrow}
                </p>
                <h2 className="mt-4 pr-12 font-display text-4xl font-semibold tracking-[-0.065em] text-white">
                  {item.name}
                </h2>

                <div className="mt-6 border-y border-white/[0.09] py-5">
                  <p className="text-[0.54rem] font-bold uppercase tracking-[0.19em] text-white/28">
                    Planning range
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.065em] text-white">
                    {formatter.format(item.startingPrice)}–{formatter.format(high)}
                  </p>
                  <p className="mt-2 text-sm text-[#8be9ff]">{item.timeline}</p>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/46">{item.summary}</p>

                <ul className="mt-6 grid gap-3 border-t border-white/[0.08] pt-5">
                  {item.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-white/54">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={startProjectHref(item, high)}
                  className="mt-7 flex min-h-12 items-center justify-between border-t border-[#8be9ff]/35 pt-5 text-sm font-semibold text-white"
                >
                  Start with {item.name}
                  <ArrowUpRight className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-7 border border-[#8be9ff]/22 bg-[#8be9ff]/[0.035] p-5 [clip-path:polygon(0_0,calc(100%_-_1rem)_0,100%_1rem,100%_100%,1rem_100%,0_calc(100%_-_1rem))]">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.23em] text-[#8be9ff]">
            Need a recommendation?
          </p>
          <p className="mt-4 text-sm leading-7 text-white/46">
            Send the business goal, budget range, and timeline. GridSpell will recommend the right scope before anything is approved.
          </p>
          <a href="/start-project" className="mt-6 flex min-h-12 items-center justify-between border-t border-white/[0.1] pt-5 text-sm font-semibold text-white">
            Request a recommendation
            <ArrowUpRight className="h-4 w-4 text-[#8be9ff]" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </main>
  );
}
