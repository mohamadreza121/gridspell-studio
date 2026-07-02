import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { services } from "@/config/services";

export function ServicesStaticFallback() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-34"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
            Services
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            A complete digital partner.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Strategy, interface design, production development, secure data, and
            ongoing improvement—organized around the business result.
          </p>
        </div>

        <div className="mt-16 grid gap-16">
          {services.map((service) => (
            <article
              key={service.slug}
              className="border-t border-white/[0.08] pt-9"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                {service.number} · {service.shortTitle}
              </p>

              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl">
                {service.title}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/44">
                {service.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {service.deliverables.slice(0, 3).map((deliverable) => (
                  <span
                    key={deliverable}
                    className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-white/42"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
              >
                Explore service
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
