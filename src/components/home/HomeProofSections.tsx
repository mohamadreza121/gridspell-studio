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

import { Container } from "@/components/ui/Container";
import { featuredProjects, type FeaturedProject } from "@/config/work";

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

const projectPackageMap: Record<string, { id: string; low: number; high: number; timeline: string }> = {
  "desa-foam-insulation": { id: "growth", low: 4500, high: 5200, timeline: "5–7 weeks" },
  "gridspell-studio": { id: "custom", low: 7500, high: 8650, timeline: "8+ weeks" },
  "network-engineering-portfolio": { id: "launch", low: 1800, high: 2500, timeline: "3–4 weeks" }
};

function startProjectHref(project: FeaturedProject) {
  const packageInfo = projectPackageMap[project.slug] ?? projectPackageMap["desa-foam-insulation"];
  const params = new URLSearchParams({
    package: packageInfo.id,
    estimateLow: String(packageInfo.low),
    estimateHigh: String(packageInfo.high),
    timeline: packageInfo.timeline,
    source: project.slug
  });

  return `/start-project?${params.toString()}`;
}

function MiniInterfacePreview({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#07080c] p-4">
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/12" />
        <span className="h-2 w-2 rounded-full bg-white/[0.07]" />
        <span className="ml-auto rounded-full border border-white/[0.08] px-3 py-1 text-[0.52rem] uppercase tracking-[0.16em] text-white/24">
          {project.slug.replaceAll("-", ".")}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="h-2 w-20 rounded-full bg-[#8be9ff]/40" />
        <div className="h-8 w-[78%] rounded-xl bg-white/[0.09]" />
        <div className="h-8 w-[58%] rounded-xl bg-white/[0.055]" />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <span className="h-16 rounded-xl border border-white/[0.06] bg-white/[0.035]" />
          <span className="h-16 rounded-xl border border-[#8be9ff]/12 bg-[#8be9ff]/7" />
          <span className="h-16 rounded-xl border border-white/[0.06] bg-white/[0.035]" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-[#7c5cff]/18 blur-3xl" />
    </div>
  );
}

export function HomeProofSections() {
  return (
    <div className="home-proof-sections relative z-[3] isolate overflow-hidden bg-[#07080c] text-white max-[480px]:bg-transparent">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-30 max-[480px]:opacity-10" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-18rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/12 blur-[150px] max-[480px]:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-18rem] top-[48rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px] max-[480px]:hidden" />

      <section className="home-proof-selected-section relative border-t border-white/[0.06] py-24 max-[480px]:bg-transparent sm:py-32">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[0.68fr_1.32fr] xl:items-end">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
                Selected builds
              </p>
              <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
                Real proof, not just polish.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-white/46 sm:text-lg">
              GridSpell does not just design pages. The work connects positioning,
              responsive interfaces, lead flow, SEO foundations, dashboards, and launch
              systems so the website keeps working after the first impression.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article
                key={project.slug}
                className="group rounded-[1.8rem] border border-white/[0.09] bg-white/[0.028] p-4 transition duration-300 hover:border-[#8be9ff]/22 hover:bg-white/[0.042] sm:p-5"
              >
                <MiniInterfacePreview project={project} />

                <div className="mt-6">
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                    {String(index + 1).padStart(2, "0")} · {project.category}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.055em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/44">
                    {project.description}
                  </p>
                </div>

                {project.proof ? (
                  <div className="mt-6 grid gap-3 border-t border-white/[0.08] pt-5">
                    {([
                      ["Problem", project.proof.problem],
                      ["Built", project.proof.built],
                      ["Result", project.proof.result]
                    ] as const).map(([label, text]) => (
                      <div key={label}>
                        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/24">
                          {label}
                        </p>
                        <p className="mt-1.5 text-xs leading-6 text-white/44">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-4 text-xs font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12"
                  >
                    View case study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={startProjectHref(project)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-4 text-xs font-semibold text-white/54 transition hover:border-white/20 hover:text-white"
                  >
                    Start similar project
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/[0.06] py-24 max-[480px]:bg-transparent sm:py-32">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <div>
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

              <div className="mt-8 rounded-[1.8rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-5 sm:p-6">
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
              {systemProof.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5"
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

          <div className="mt-14 rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_82%_0%,rgba(41,214,255,0.12),transparent_20rem),rgba(255,255,255,0.03)] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
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
