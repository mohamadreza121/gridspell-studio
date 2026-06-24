import { ArrowUpRight, Code2, Layers3, MessageSquareMore, Target } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";

const principles = [
  {
    icon: Target,
    title: "Business before decoration",
    text: "The visual direction starts with the audience, offer, conversion path, and the result the project needs to create."
  },
  {
    icon: Layers3,
    title: "Systems, not isolated screens",
    text: "Components, content structures, and technical decisions are designed to remain coherent as the website grows."
  },
  {
    icon: Code2,
    title: "Design connected to production",
    text: "The same studio thinking shapes the interface and the implementation, reducing gaps between the concept and the final build."
  },
  {
    icon: MessageSquareMore,
    title: "Direct communication",
    text: "Clients work directly with the person planning and building the project instead of passing decisions through layers of account management."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About GridSpell"
        title="Structure, craft, and a little magic."
        description="GridSpell is an independent Toronto web design and development studio creating premium digital experiences for businesses that want to be taken seriously."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 border-b border-white/[0.08] pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
                The name
              </p>
              <h2 className="mt-6 max-w-[12ch] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                Grid is the discipline. Spell is the feeling.
              </h2>
            </div>
            <div className="space-y-7 text-lg leading-9 text-white/48">
              <p>
                The grid creates hierarchy, consistency, usability, and systems that
                scale. The spell creates distinction, emotion, movement, and the moment
                someone decides to keep exploring.
              </p>
              <p>
                GridSpell brings those two sides together: business-focused design and
                production-ready development, handled as one connected process.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="glass-panel rounded-[1.75rem] p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8be9ff]" />
                  </span>
                  <span className="font-mono text-xs text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.045em]">
                  {title}
                </h3>
                <p className="mt-5 leading-8 text-white/42">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 grid overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0b0d13] lg:grid-cols-3">
            {[
              ["Toronto", "Based in Ontario and available for remote client work."],
              ["One partner", "Strategy, design, development, and technical ownership."],
              ["Built to grow", "Modern foundations rather than a disposable template."]
            ].map(([title, text]) => (
              <div key={title} className="border-b border-white/[0.08] p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="font-display text-3xl font-semibold tracking-[-0.045em]">
                  {title}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/38">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="mx-auto max-w-[14ch] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Bring the business problem. We will build the path forward.
            </h2>
            <ActionLink href="/start-project" className="mt-9">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  );
}
