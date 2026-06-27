import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, MessagesSquare } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GridSpell Studio in Toronto to discuss a website, redesign, landing page, portal, dashboard, or custom web application.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Contact GridSpell Studio in Toronto to discuss a website, redesign, landing page, portal, dashboard, or custom web application.",
    url: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start with the problem."
        description="A useful first conversation covers what is not working, what the business is trying to accomplish, and what a successful launch would change."
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[2rem] p-7 sm:p-10">
            <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
              New projects
            </p>
            <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              The structured project brief is the best place to begin.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-white/44">
              It gives GridSpell enough context to understand the business, requested
              scope, investment range, timing, and the outcome you need.
            </p>
            <ActionLink href="/start-project" className="mt-9">
              Open the project brief
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </div>

          <div className="grid gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 transition-colors hover:bg-white/[0.045] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                  <Mail className="h-5 w-5 text-[#8be9ff]" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/20 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/28">
                Email
              </p>
              <p className="mt-3 break-all font-display text-2xl font-semibold tracking-[-0.035em]">
                {siteConfig.email}
              </p>
            </a>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/[0.09] bg-white/[0.025] p-6">
                <MapPin className="h-5 w-5 text-[#8be9ff]" />
                <p className="mt-7 text-xs uppercase tracking-[0.28em] text-white/28">
                  Location
                </p>
                <p className="mt-3 text-sm leading-7 text-white/52">
                  {siteConfig.location}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/[0.09] bg-white/[0.025] p-6">
                <Clock3 className="h-5 w-5 text-[#8be9ff]" />
                <p className="mt-7 text-xs uppercase tracking-[0.28em] text-white/28">
                  Availability
                </p>
                <p className="mt-3 text-sm leading-7 text-white/52">
                  Remote client work and scheduled discovery calls.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/[0.09] bg-[#0b0d13] p-7 sm:p-10 lg:col-span-2">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <MessagesSquare className="h-6 w-6 text-[#8be9ff]" />
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.045em]">
                  A useful first message includes:
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "What the business does",
                  "What is not working now",
                  "What needs to be built",
                  "Preferred timeline",
                  "Realistic investment range",
                  "Any required integrations"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white/46"
                  >
                    {item}
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
