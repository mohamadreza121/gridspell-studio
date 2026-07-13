import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Workflow
} from "lucide-react";

import { HomeDesignAnatomySection } from "@/components/home/HomeDesignAnatomySection";
import { Container } from "@/components/ui/Container";

const systemProof = [
  {
    title: "Lead capture",
    text: "Project forms can route useful details to email and the admin pipeline instead of sending vague contact messages.",
    icon: MessageSquareText
  },
  {
    title: "Admin dashboard",
    text: "New inquiries, estimated value, notes, status, and follow-up timing can live in one internal view.",
    icon: LayoutDashboard
  },
  {
    title: "Pricing logic",
    text: "Package-aware links carry scope, budget, and timeline context into the project brief.",
    icon: BarChart3
  },
  {
    title: "SEO foundation",
    text: "Metadata, sitemap, page structure, and service architecture are prepared before launch.",
    icon: SearchCheck
  },
  {
    title: "Mobile polish",
    text: "Layouts are checked for small phones, normal phones, tablets, and desktop screens.",
    icon: Smartphone
  },
  {
    title: "Launch reliability",
    text: "Performance, reduced motion, validation, and production deployment are treated as part of the build.",
    icon: Gauge
  },
  {
    title: "Client portal structure",
    text: "Projects can grow into secure workspaces for files, milestones, approvals, invoices, and messages.",
    icon: ShieldCheck
  },
  {
    title: "Business automation",
    text: "Forms, email, CRM, booking, analytics, and internal workflows can connect into one system.",
    icon: Workflow
  }
] as const;

const buildFacts = [
  "Service pages structured for clear buying decisions",
  "Responsive layouts across desktop, tablet, and phone",
  "Admin lead pipeline and project intake flow included",
  "SEO-ready metadata, sitemap, and page architecture"
] as const;

function storyDelay(index: number) {
  return { "--story-reveal-delay": `${index * 70}ms` } as CSSProperties;
}

export function HomeProofSections() {
  return (
    <div className="home-proof-sections home-story-band relative z-[3] isolate overflow-hidden bg-[#07080c] text-white max-[480px]:bg-transparent">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-30 max-[480px]:opacity-10" />
      <div aria-hidden="true" className="home-story-glow home-story-glow--purple pointer-events-none absolute right-[-18rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/12 blur-[150px] max-[480px]:hidden" />
      <div aria-hidden="true" className="home-story-glow home-story-glow--cyan pointer-events-none absolute left-[-18rem] top-[48rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px] max-[480px]:hidden" />

      <HomeDesignAnatomySection />

      <section className="home-story-section home-story-reveal relative border-t border-white/[0.06] py-24 max-[480px]:bg-transparent sm:py-32">
        <Container className="relative">
          <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <div className="home-story-reveal-item">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
                Proof in the build
              </p>
              <h2 className="mt-6 max-w-[12ch] text-balance font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
                More than a pretty homepage.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/45">
                GridSpell websites are structured around the pieces a business usually
                needs immediately after launch.
              </p>

              <div className="home-story-facts mt-8 rounded-[1.8rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-5 sm:p-6">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                  Real build facts
                </p>
                <ul className="mt-5 grid gap-3">
                  {buildFacts.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-white/52">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {systemProof.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    style={storyDelay(index + 1)}
                    className="home-story-card home-story-system-card home-story-reveal-item rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-[#8be9ff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/40">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="home-story-cta home-story-reveal-item mt-14 rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_82%_0%,rgba(41,214,255,0.12),transparent_20rem),rgba(255,255,255,0.03)] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                Build with the same system
              </p>
              <h3 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-white sm:text-4xl">
                Start with a website. Grow into the system behind it.
              </h3>
            </div>
            <Link
              href="/start-project"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5 lg:mt-0"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
