import { ArrowUpRight, Check, Handshake, Route } from "lucide-react";
import { ClientDashboardTour } from "@/components/process/dashboard-tour/ClientDashboardTour";
import { ActionLink } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { processSteps } from "@/config/process";

const clientResponsibilities = [
  "Provide one clear decision maker",
  "Supply requested content and access",
  "Review deliverables within the agreed window",
  "Keep new scope separate from approved scope",
  "Raise concerns early rather than at launch"
];

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="Process"
        title="A clear path from idea to launch."
        description="A premium experience should feel organized behind the scenes. Every phase has an objective, a deliverable, and a decision."
      />

      <ClientDashboardTour />

      <section id="process-steps" className="scroll-mt-24 py-20 lg:py-28">
        <Container>
          <div className="grid gap-6">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                className="group grid gap-6 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 transition-colors hover:bg-white/[0.04] sm:p-9 lg:grid-cols-[110px_0.7fr_1.3fr] lg:items-start"
              >
                <div className="flex items-center justify-between lg:block">
                  <span className="font-mono text-sm text-[#8be9ff]">{step.number}</span>
                  <span className="text-xs uppercase tracking-[0.26em] text-white/20 lg:mt-4 lg:block">
                    Phase {index + 1}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  {step.title}
                </h2>
                <div>
                  <p className="max-w-2xl leading-8 text-white/44">{step.text}</p>
                  <div className="mt-7 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/26">
                    <Route className="h-4 w-4 text-[#8be9ff]" />
                    Clear deliverable · clear decision
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="glass-panel rounded-[2rem] p-7 sm:p-9">
              <Handshake className="h-6 w-6 text-[#8be9ff]" />
              <h2 className="mt-7 font-display text-4xl font-semibold tracking-[-0.055em]">
                What GridSpell owns.
              </h2>
              <ul className="mt-8 grid gap-4 text-sm leading-7 text-white/46">
                {[
                  "Project planning and technical direction",
                  "Design system and responsive implementation",
                  "Clear milestones, communication, and documentation",
                  "Testing, production configuration, and launch support",
                  "Honest recommendations when scope or timing needs to change"
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9">
              <h2 className="font-display text-4xl font-semibold tracking-[-0.055em]">
                What keeps the project moving.
              </h2>
              <ul className="mt-8 grid gap-4 text-sm leading-7 text-white/46">
                {clientResponsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="mx-auto max-w-[15ch] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              A clear process creates room for better creative work.
            </h2>
            <ActionLink href="/start-project" className="mt-9">
              Start the first step
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  );
}
