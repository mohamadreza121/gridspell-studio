import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing access to the GridSpell Studio website, public content, forms, client portal, and general online services.",
  alternates: { canonical: "/terms" }
};

const sections = [
  {
    title: "Website use",
    body: [
      "You may use this website for lawful informational and business purposes. You must not interfere with the website, attempt unauthorized access, submit malicious code, misuse forms, impersonate another person, scrape protected areas, or use the service in a way that harms GridSpell, its clients, or its providers."
    ]
  },
  {
    title: "No automatic professional engagement",
    body: [
      "Submitting a project inquiry, sending an email, creating a portal account, or reviewing public information does not automatically create a client relationship or require GridSpell to accept a project.",
      "Paid work is governed by the applicable proposal, statement of work, service agreement, invoice, or other written agreement accepted by the parties. If those documents conflict with these public terms, the signed project documents control for that engagement."
    ]
  },
  {
    title: "Content and intellectual property",
    body: [
      "Unless otherwise stated, the GridSpell name, site design, written content, graphics, code demonstrations, and original materials on this website are owned by GridSpell Studio or used with permission.",
      "You may view and share public page links for normal business purposes. You may not copy, resell, republish, remove attribution from, or create derivative commercial materials from protected content without written permission. Client work shown in case studies may include rights belonging to the relevant client or third party."
    ]
  },
  {
    title: "Client portal and account security",
    body: [
      "Portal access is intended only for authorized users. You are responsible for protecting your login credentials, using accurate account information, and notifying GridSpell if you believe an account or invitation link has been compromised.",
      "GridSpell may suspend access when necessary to investigate abuse, protect project information, maintain the system, or comply with legal obligations."
    ]
  },
  {
    title: "Payments and third-party services",
    body: [
      "Payment checkout and billing tools may be provided by Stripe. Other website features may rely on third-party hosting, database, communication, analytics, security, and monitoring services.",
      "Use of a third-party service may also be governed by that provider's terms and privacy practices."
    ]
  },
  {
    title: "Information and external links",
    body: [
      "Public articles and resources are general information, not legal, tax, accounting, security, or financial advice. Project decisions should be based on the specific business, technical, and contractual context.",
      "External links are provided for convenience. GridSpell does not control and is not responsible for third-party websites, availability, content, or security."
    ]
  },
  {
    title: "Availability and warranties",
    body: [
      "GridSpell aims to keep the website accurate and available, but the public website and portal may occasionally be interrupted for maintenance, provider outages, security work, or circumstances outside reasonable control.",
      "To the extent permitted by applicable law, public website content is provided without guarantees that it will always be complete, current, uninterrupted, or suitable for a particular purpose. Specific commitments for client deliverables are defined in the applicable written project agreement."
    ]
  },
  {
    title: "Liability",
    body: [
      "To the extent permitted by applicable law, GridSpell is not responsible for indirect or consequential loss arising only from use of, or inability to use, the public website. Nothing in these terms excludes rights or responsibilities that cannot legally be excluded.",
      "Liability relating to paid client services is governed by the applicable project agreement."
    ]
  },
  {
    title: "Governing law and contact",
    body: [
      "These public terms are governed by the laws applicable in Ontario, Canada, without limiting mandatory rights that may apply in another jurisdiction.",
      `Questions about these terms can be sent to ${siteConfig.email}.`
    ]
  },
  {
    title: "Changes",
    body: [
      "GridSpell may update these terms as the website and services evolve. The current version and effective date will remain available on this page."
    ]
  }
];

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of use."
        description="The rules for using GridSpell's public website, inquiry forms, client portal, and online services."
      />

      <section className="pb-24 pt-8 lg:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8be9ff]">
              Effective date
            </p>
            <p className="mt-3 text-sm text-white/52">June 26, 2026</p>
            <p className="mt-8 text-sm leading-7 text-white/34">
              Project-specific terms belong in the signed proposal or service agreement
              for that engagement.
            </p>
          </aside>

          <div className="max-w-3xl">
            <div className="rounded-[1.75rem] border border-white/[0.09] bg-white/[0.025] p-6 text-sm leading-7 text-white/46 sm:p-8">
              These are public website terms. They do not replace a signed client
              contract, proposal, or statement of work.
            </div>

            <div className="mt-10">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  className="border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-5">
                    <span className="mt-2 font-mono text-xs text-[#8be9ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-3xl font-semibold tracking-[-0.045em]">
                        {section.title}
                      </h2>
                      <div className="mt-5 space-y-5 text-base leading-8 text-white/46">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-8 text-sm text-white/36">
              See also the{" "}
              <Link href="/privacy" className="text-[#8be9ff] hover:text-white">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
