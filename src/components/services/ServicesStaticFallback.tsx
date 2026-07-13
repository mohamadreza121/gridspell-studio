import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { services } from "@/config/services";

function serviceVisualPath(slug: string) {
  return `/images/services/mobile/${slug}.webp`;
}

export function ServicesStaticFallback() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-28 text-white sm:pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-38"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-16rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/14 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-17rem] top-[42rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[3%] top-28 whitespace-nowrap font-display text-[38vw] font-semibold leading-none tracking-[-0.1em] text-white/[0.014] sm:text-[27vw]"
      >
        SYSTEMS
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff] sm:text-[0.64rem] sm:tracking-[0.38em]">
              Services · Systems in motion
            </p>
          </div>

          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(3.7rem,15vw,7rem)] font-semibold leading-[0.82] tracking-[-0.078em] text-white">
            Digital systems built to move business forward.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
            Strategy, design, development, secure data, and ongoing improvement—organized
            around what the business needs to achieve next.
          </p>
        </div>

        <nav
          aria-label="Service chapters"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#service-${service.slug}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/45 transition active:border-[#8be9ff]/30 active:text-[#8be9ff]"
            >
              <span className="font-mono text-[#8be9ff]">{service.number}</span>
              {service.shortTitle}
            </a>
          ))}
        </nav>

        <div className="mt-8 grid gap-7 sm:mt-10 sm:gap-10">
          {services.map((service, index) => (
            <article
              id={`service-${service.slug}`}
              key={service.slug}
              className="group scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#090b11]/92 shadow-[0_28px_90px_rgba(0,0,0,0.3)] lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch"
            >
              <div className="relative aspect-[1.05/1] min-h-[18rem] overflow-hidden border-b border-white/[0.08] bg-[#07080c] sm:min-h-[24rem] lg:aspect-auto lg:min-h-[36rem] lg:border-b-0 lg:border-r">
                <div
                  aria-hidden="true"
                  className="page-grid pointer-events-none absolute inset-0 opacity-30"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/12 blur-[75px]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 font-display text-[13rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.018] sm:text-[18rem]"
                >
                  {service.number}
                </span>

                <Image
                  src={serviceVisualPath(service.slug)}
                  alt={`${service.shortTitle} system visualization`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) 46vw, 560px"
                  className="relative z-10 object-contain p-2 sm:p-5 lg:p-7"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#090b11] to-transparent lg:hidden"
                />
              </div>

              <div className="relative flex flex-col p-6 sm:p-8 lg:justify-center lg:p-10">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                    {service.number}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                    {service.shortTitle}
                  </span>
                </div>

                <h2 className="mt-6 text-balance font-display text-[clamp(2.55rem,11vw,4.4rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white lg:text-[clamp(3rem,4.5vw,4.6rem)]">
                  {service.title}
                </h2>

                <p className="mt-5 text-base leading-8 text-white/46">
                  {service.summary}
                </p>

                <div className="mt-6 border-l border-[#8be9ff]/30 pl-5">
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-white/28">
                    Ideal for
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/56">
                    {service.idealFor}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.deliverables.slice(0, 3).map((deliverable) => (
                    <span
                      key={deliverable}
                      className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-[0.56rem] uppercase tracking-[0.14em] text-white/42"
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-7 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white px-6 text-sm font-semibold text-[#08090d] transition active:scale-[0.98]"
                >
                  Explore this service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-[#8be9ff]/16 bg-gradient-to-br from-[#7c5cff]/10 to-[#29d6ff]/5 p-7 sm:p-9">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
            Not sure where to start?
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl">
            Start with the business problem. We’ll shape the right system around it.
          </h2>
          <Link
            href="/start-project"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-semibold text-[#05070b]"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
