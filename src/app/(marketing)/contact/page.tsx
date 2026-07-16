import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessagesSquare,
  Phone
} from "lucide-react";

import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact GridSpell Studio",
  description:
    "Contact GridSpell Studio in Toronto to discuss a premium website, redesign, client portal, dashboard, or custom digital system.",
  path: "/contact"
});

const messageChecklist = [
  "What the business does",
  "What is not working now",
  "What needs to be built",
  "Preferred timeline",
  "Realistic investment range",
  "Any required integrations"
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="page-grid absolute inset-0 -z-20 opacity-35" />
        <div className="absolute -right-32 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/10 blur-[130px]" />
        <div className="absolute left-[42%] top-[28%] -z-10 h-64 w-64 rounded-full bg-[#29d6ff]/[0.055] blur-[110px]" />

        <Container className="relative grid gap-14 pb-20 pt-36 lg:grid-cols-[minmax(0,1.14fr)_minmax(22rem,0.86fr)] lg:items-end lg:gap-16 lg:pb-28 lg:pt-48">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
              Contact
            </p>
            <h1 className="mt-8 max-w-[10ch] font-display text-[clamp(4rem,8.6vw,9rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
              Start with the problem.
            </h1>
            <p className="mt-9 max-w-2xl text-lg leading-9 text-white/48">
              A useful first conversation covers what is not working, what the business
              is trying to accomplish, and what a successful launch would change.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.22em] text-white/30">
              <span>Toronto based</span>
              <span className="hidden text-white/12 sm:inline" aria-hidden="true">
                / 
              </span>
              <span>Remote friendly</span>
              <span className="hidden text-white/12 sm:inline" aria-hidden="true">
                / 
              </span>
              <span>Projects across Canada</span>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#0a0c12]/90 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-4">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/70 to-transparent" />
            <div className="flex items-center justify-between px-3 pb-4 pt-2 sm:px-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                  Direct contact
                </p>
                <p className="mt-2 text-sm text-white/38">Choose the easiest way to reach GridSpell.</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                <MessagesSquare className="h-4 w-4 text-white/45" aria-hidden="true" />
              </span>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group min-w-0 rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5 transition-[background-color,border-color] duration-200 hover:border-[#8be9ff]/25 hover:bg-white/[0.045] sm:p-6"
                aria-label={`Email GridSpell at ${siteConfig.email}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <Mail className="h-[1.1rem] w-[1.1rem] text-[#8be9ff]" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/18 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8be9ff]" aria-hidden="true" />
                </div>
                <p className="mt-7 text-[0.62rem] uppercase tracking-[0.28em] text-white/28">Email</p>
                <p className="mt-3 break-all font-display text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
                  {siteConfig.email}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/35">Best for project details and files.</p>
              </a>

              <a
                href={siteConfig.phoneHref}
                className="group min-w-0 rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5 transition-[background-color,border-color] duration-200 hover:border-[#8be9ff]/25 hover:bg-white/[0.045] sm:p-6"
                aria-label={`Call GridSpell at ${siteConfig.phone}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <Phone className="h-[1.1rem] w-[1.1rem] text-[#8be9ff]" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/18 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8be9ff]" aria-hidden="true" />
                </div>
                <p className="mt-7 text-[0.62rem] uppercase tracking-[0.28em] text-white/28">Phone</p>
                <p className="mt-3 font-display text-xl font-semibold tracking-[-0.035em] text-white">
                  {siteConfig.phone}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/35">Call or text for a direct conversation.</p>
              </a>
            </div>
          </aside>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.16fr)_minmax(20rem,0.84fr)]">
            <article className="glass-panel relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 bg-[#7c5cff]/[0.07] blur-[80px]" />
              <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">New projects</p>
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Turn the first conversation into a clear project direction.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/44">
                The structured project brief gives GridSpell the business context, requested scope,
                investment range, timeline, and outcome needed to recommend the right next step.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <ActionLink href="/start-project">
                  Open the project brief
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ActionLink>
                <p className="text-sm text-white/30">No commitment required.</p>
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <MapPin className="h-5 w-5 text-[#8be9ff]" aria-hidden="true" />
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/20">01</span>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/28">Location</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em]">
                  {siteConfig.location}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/38">
                  Local collaboration with remote delivery for clients across Canada.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <Clock3 className="h-5 w-5 text-[#8be9ff]" aria-hidden="true" />
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/20">02</span>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/28">Availability</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em]">
                  Scheduled discovery calls
                </p>
                <p className="mt-4 text-sm leading-7 text-white/38">
                  Calls are arranged around project fit so the conversation stays focused and useful.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/[0.09] bg-[#0b0d13] p-7 sm:p-10">
            <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <MessagesSquare className="h-6 w-6 text-[#8be9ff]" aria-hidden="true" />
                <h2 className="mt-6 max-w-md font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  A useful first message includes:
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/38">
                  A few practical details make the first reply more specific and save unnecessary back-and-forth.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {messageChecklist.map((item, index) => (
                  <div
                    key={item}
                    className="flex min-h-14 items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white/48"
                  >
                    <span className="font-mono text-[0.62rem] text-[#8be9ff]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
