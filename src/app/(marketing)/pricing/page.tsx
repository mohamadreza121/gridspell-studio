import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { packages } from "@/config/packages";

const carePlans = [
  {
    name: "Essential",
    price: "CAD $149/month",
    text: "Managed updates, monitoring, minor content support, and standard assistance."
  },
  {
    name: "Growth",
    price: "CAD $349/month",
    text: "Monthly improvement time, analytics review, performance checks, and priority support."
  },
  {
    name: "Partner",
    price: "CAD $699/month",
    text: "A larger monthly development allowance, strategic improvements, and fastest response priority."
  }
];

const questions = [
  {
    question: "Why are these starting prices instead of fixed packages?",
    answer:
      "The number of templates, content readiness, integrations, motion, data, and timeline can change the real effort significantly. The starting range keeps expectations clear without pretending every project is identical."
  },
  {
    question: "What normally increases project cost?",
    answer:
      "Custom application functionality, large content migrations, e-commerce, advanced animation, copywriting, multilingual content, complex integrations, and compressed timelines."
  },
  {
    question: "How are projects usually paid?",
    answer:
      "A common structure is 40% to schedule the project, 30% after design approval, and 30% before production launch. The final proposal defines the actual schedule."
  },
  {
    question: "Are hosting and third-party services included?",
    answer:
      "The proposal identifies third-party costs separately so ownership and recurring expenses stay transparent."
  }
];

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="Premium work with a clear starting point."
        description="These ranges are positioning anchors, not instant quotes. Final pricing follows the approved scope, content, integrations, and timeline."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`relative overflow-hidden rounded-[2rem] border p-7 sm:p-9 ${
                  item.highlighted
                    ? "border-[#7c5cff]/55 bg-[linear-gradient(145deg,rgba(124,92,255,.16),rgba(11,13,19,.92))]"
                    : "border-white/[0.09] bg-white/[0.025]"
                }`}
              >
                {item.highlighted ? (
                  <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#7c5cff]/16 blur-[80px]" />
                ) : null}
                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
                      {item.name}
                    </p>
                    {item.highlighted ? (
                      <span className="rounded-full border border-white/[0.09] bg-white/[0.05] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-white/50">
                        Most requested
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-8 font-display text-4xl font-semibold tracking-[-0.055em]">
                    {item.price}
                  </p>
                  <p className="mt-5 max-w-xl leading-8 text-white/42">{item.summary}</p>
                  <ul className="mt-8 grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6 text-white/52">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
              Ongoing care
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Launch is a milestone, not the end of ownership.
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {carePlans.map((plan) => (
                <article
                  key={plan.name}
                  className="rounded-[1.75rem] border border-white/[0.09] bg-white/[0.025] p-7"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/28">
                    {plan.name}
                  </p>
                  <p className="mt-7 font-display text-2xl font-semibold">{plan.price}</p>
                  <p className="mt-5 text-sm leading-7 text-white/40">{plan.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-white/[0.08] pt-20 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <CircleHelp className="h-6 w-6 text-[#8be9ff]" />
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.055em]">
                Pricing questions.
              </h2>
            </div>
            <div className="grid gap-4">
              {questions.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-6"
                >
                  <h3 className="font-semibold text-white/78">{item.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/40">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-[2rem] border border-[#7c5cff]/24 bg-[#7c5cff]/7 p-8 text-center sm:p-12">
            <h2 className="mx-auto max-w-[16ch] font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              The useful number comes after the useful questions.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/42">
              Share the goals, scope, timeline, and investment range so GridSpell can
              recommend the right engagement.
            </p>
            <ActionLink href="/start-project" className="mt-8">
              Build your project brief
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  );
}
