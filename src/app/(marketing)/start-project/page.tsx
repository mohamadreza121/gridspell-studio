import type { Metadata } from "next";
import { ArrowRight, CircleCheck, Clock3, SearchCheck } from "lucide-react";

import { ExperienceSelectionSummary } from "@/components/forms/ExperienceSelectionSummary";
import { PricingSelectionSummary } from "@/components/forms/PricingSelectionSummary";
import { ProjectBriefForm } from "@/components/forms/ProjectBriefForm";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Web Design Project",
  description:
    "Submit a structured project brief for a website, redesign, landing page, client portal, dashboard, or full-stack application with GridSpell Studio.",
  path: "/start-project"
});

const nextSteps = [
  {
    icon: SearchCheck,
    title: "Scope and fit review",
    text: "GridSpell checks the package, business goal, budget range, timeline, and required services."
  },
  {
    icon: Clock3,
    title: "Practical recommendation",
    text: "You receive a clear next step: a proposal path, paid discovery, or a better-fit alternative."
  },
  {
    icon: ArrowRight,
    title: "Proposal or project plan",
    text: "Qualified projects move into a focused scope, timeline, payment structure, and launch plan."
  }
];

export default function StartProjectPage() {
  return (
    <>
      <PageIntro
        eyebrow="Start a project"
        title="Tell GridSpell what you are building."
        description="Use this form to share the business goal, package, budget range, timeline, and services needed. You will receive a practical recommendation before anything is approved."
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
                What happens next
              </p>
              <div className="mt-8 grid gap-4">
                {nextSteps.map(({ icon: Icon, title, text }, index) => (
                  <div
                    key={title}
                    className="grid grid-cols-[48px_1fr] gap-4 rounded-[1.4rem] border border-white/[0.075] bg-black/10 p-4"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-[#8be9ff]" />
                    </span>
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/24">
                        Step {index + 1}
                      </p>
                      <h2 className="mt-2 text-sm font-semibold">{title}</h2>
                      <p className="mt-2 text-xs leading-6 text-white/36">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-[#7c5cff]/24 bg-[#7c5cff]/7 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <CircleCheck className="h-5 w-5 text-[#8be9ff]" />
                <p className="text-sm font-semibold">A strong inquiry includes</p>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-white/42">
                <li>A clear business goal or problem to solve</li>
                <li>The current website or brand context</li>
                <li>A realistic budget range and timeline</li>
                <li>Services needed, such as design, development, SEO, booking, CRM, or support</li>
              </ul>
            </div>

            <div className="mt-5 rounded-[2rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                Pricing note
              </p>
              <p className="mt-4 text-sm leading-7 text-white/44">
                Payment plans are available for approved projects. The form captures your
                package and budget range so the first reply is specific, not generic.
              </p>
            </div>
          </aside>

          <div className="grid gap-5">
            <PricingSelectionSummary />
            <ExperienceSelectionSummary />
            <ProjectBriefForm />
          </div>
        </Container>
      </section>
    </>
  );
}
