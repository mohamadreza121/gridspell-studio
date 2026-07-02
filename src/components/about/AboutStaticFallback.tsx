import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/Container";

const chapters = [
  {
    number: "01",
    eyebrow: "About the founder",
    title:
      "Hi, I’m Mohammadreza. GridSpell is the studio I built to make serious businesses look and work the part online.",
    introduction:
      "I’m a Toronto-based web developer with a background in network engineering. I approach websites as complete digital systems: the presentation people see, the technology underneath it, and the path that turns attention into a real business result.",
    points: [
      "Direct collaboration from planning through launch",
      "Strategy, design, development, and production setup",
      "A practical technical foundation built around the business"
    ]
  },
  {
    number: "02",
    eyebrow: "About GridSpell",
    title: "Grid is the structure. Spell is the experience people remember.",
    introduction:
      "GridSpell is an independent web design and development studio for businesses that need more than a disposable template.",
    points: [
      "Business strategy before decoration",
      "Custom design rather than recycled templates",
      "Responsive development for every screen",
      "Clear conversion paths and measurable actions"
    ]
  },
  {
    number: "03",
    eyebrow: "What we build",
    title: "From focused business websites to working digital products.",
    introduction:
      "GridSpell builds digital experiences around what the business actually needs to communicate, automate, sell, or organize.",
    points: [
      "Professional business and service websites",
      "Complete redesigns and migrations",
      "Campaign and lead-generation landing pages",
      "Client portals and operational dashboards",
      "Custom full-stack web applications"
    ]
  },
  {
    number: "04",
    eyebrow: "Technology",
    title: "Modern tools selected for the project—not for the buzzword.",
    introduction:
      "The technology is selected around performance, maintainability, security, content needs, and future growth.",
    points: [
      "React, Next.js, TypeScript, and modern CSS",
      "Supabase, PostgreSQL, APIs, and secure permissions",
      "Vercel deployment, monitoring, and production setup"
    ]
  },
  {
    number: "05",
    eyebrow: "Search, advertising, and growth",
    title: "A launch matters when the right people can find the business and take action.",
    introduction:
      "Projects can include the measurement and visibility setup required to support search, advertising, and ongoing improvement.",
    points: [
      "Technical SEO and crawlability",
      "Google Search Console and Analytics",
      "Google Ads and conversion tracking",
      "Core Web Vitals and performance improvements"
    ]
  },
  {
    number: "06",
    eyebrow: "Infrastructure and integrations",
    title: "The invisible setup matters as much as the page people see.",
    introduction:
      "A production website often depends on domains, email delivery, databases, permissions, notifications, analytics, and outside platforms working together correctly.",
    points: [
      "Domains, DNS, hosting, and deployment",
      "Transactional email and customer notifications",
      "Payments, CRM, authentication, and databases",
      "API and third-party service integrations"
    ]
  },
  {
    number: "07",
    eyebrow: "Working with GridSpell",
    title: "One technical partner from the first idea to launch—and after.",
    introduction:
      "Projects move through a clear scope, information architecture, design direction, production development, testing, launch, and optional ongoing care.",
    points: [
      "Clear scope and responsibilities",
      "Direct and documented communication",
      "Visible milestones and approval points",
      "Production setup and launch support"
    ]
  }
] as const;

export function AboutStaticFallback() {
  return (
    <main className="relative isolate overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-28"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
            About GridSpell
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            Structure, craft, and a little magic.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg">
            An independent Toronto web design and development studio founded by
            Mohammadreza Heidarpoor.
          </p>
        </div>

        <div className="mt-20 grid gap-20">
          {chapters.map((chapter) => (
            <article
              key={chapter.number}
              className="border-t border-white/[0.08] pt-9"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                  {chapter.number}
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                  {chapter.eyebrow}
                </span>
              </div>

              <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="max-w-[18ch] font-display text-4xl font-semibold leading-[0.92] tracking-[-0.058em] text-white sm:text-6xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-white/52">
                    {chapter.introduction}
                  </p>
                </div>

                <div className="rounded-[1.7rem] border border-white/[0.09] bg-white/[0.025] p-6">
                  <ul className="grid gap-3">
                    {chapter.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-6 text-white/52"
                      >
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-3 border-t border-white/[0.08] pt-10">
          <Link
            href="/start-project"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <a
            href="mailto:hello@gridspellstudio.com"
            className="inline-flex min-h-12 items-center rounded-full border border-white/[0.11] bg-white/[0.03] px-6 text-sm font-semibold text-white/60"
          >
            Email the studio
          </a>
        </div>
      </Container>
    </main>
  );
}
