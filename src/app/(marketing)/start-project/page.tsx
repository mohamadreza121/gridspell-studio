import { ArrowRight, CircleCheck, Clock3, SearchCheck } from "lucide-react";
import { ExperienceSelectionSummary } from "@/components/forms/ExperienceSelectionSummary";
import { PricingSelectionSummary } from "@/components/forms/PricingSelectionSummary";
import { ProjectBriefForm } from "@/components/forms/ProjectBriefForm";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

const nextSteps = [
  {
    icon: SearchCheck,
    title: "Fit and scope review",
    text: "GridSpell checks the goals, required functionality, budget, and timeline."
  },
  {
    icon: Clock3,
    title: "Discovery conversation",
    text: "Qualified projects move into a focused conversation about priorities and constraints."
  },
  {
    icon: ArrowRight,
    title: "Recommended next step",
    text: "You receive a clear direction: proposal, paid discovery, or a more suitable alternative."
  }
];

export default function StartProjectPage() {
  return (
    <>
      <PageIntro
        eyebrow="Start a project"
        title="Tell us what needs to change."
        description="The best projects begin with a clear business problem, a realistic investment, and shared expectations."
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
                <p className="text-sm font-semibold">A strong fit usually includes</p>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-white/42">
                <li>An established business or serious product idea</li>
                <li>A decision maker involved in the project</li>
                <li>A realistic budget and timeline</li>
                <li>Willingness to provide content and feedback</li>
              </ul>
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
