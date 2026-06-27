import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GridSpell Studio collects, uses, protects, and shares personal information through its website, project inquiries, client portal, and billing workflows.",
  alternates: { canonical: "/privacy" }
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "GridSpell may collect information you provide directly, including your name, email address, phone number, company, project requirements, files, messages, approvals, support requests, and billing-related details.",
      "When you use the website or client portal, technical information may also be processed, including IP address, browser and device information, page activity, authentication events, error details, and security signals used to protect forms and accounts."
    ]
  },
  {
    title: "How we use information",
    body: [
      "Information is used to respond to inquiries, assess project fit, prepare proposals, deliver services, operate the client portal, communicate project updates, process payments, provide support, improve website performance, measure marketing activity, prevent abuse, and meet legal or accounting obligations.",
      "GridSpell does not sell personal information."
    ]
  },
  {
    title: "Payments",
    body: [
      "Payments are processed by Stripe. GridSpell receives transaction status, customer identifiers, invoice references, and limited billing information required to maintain project records. Full payment-card numbers are not stored in the GridSpell database."
    ]
  },
  {
    title: "Service providers",
    body: [
      "GridSpell uses carefully selected providers to operate the business and website. These may include Vercel for hosting, Supabase for database and authentication services, Resend for transactional email, Stripe for payments, Cloudflare Turnstile for bot protection, Google Analytics for website measurement, and Sentry for error monitoring.",
      "These providers may process information in jurisdictions outside your province or country under their own contractual and security obligations."
    ]
  },
  {
    title: "Cookies and analytics",
    body: [
      "The website may use essential cookies for authentication and security. If analytics is enabled, measurement technologies may collect information about pages viewed, device type, referral source, and actions taken on the site.",
      "You can limit cookies through your browser settings. Blocking essential authentication cookies may prevent the client portal from working correctly."
    ]
  },
  {
    title: "Retention and safeguards",
    body: [
      "Information is retained only for as long as reasonably required for inquiries, active projects, client support, financial records, security, dispute resolution, and legal obligations. Retention periods vary by record type.",
      "GridSpell uses access controls, encrypted connections, role-based permissions, database security policies, account authentication, monitoring, and restricted administrative access. No online system can be guaranteed completely secure."
    ]
  },
  {
    title: "Your choices and requests",
    body: [
      "You may ask to access, correct, or delete personal information held by GridSpell, subject to identity verification and any records that must be retained for legal, security, contractual, or accounting reasons.",
      `Privacy requests can be sent to ${siteConfig.privacyEmail}.`
    ]
  },
  {
    title: "Changes to this policy",
    body: [
      "This policy may be updated as the website, services, or legal requirements change. The current version will be posted on this page with its effective date."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy policy."
        description="How GridSpell handles information submitted through the public website, project workflows, client portal, and payment systems."
      />

      <section className="pb-24 pt-8 lg:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8be9ff]">
              Effective date
            </p>
            <p className="mt-3 text-sm text-white/52">June 26, 2026</p>
            <p className="mt-8 text-sm leading-7 text-white/34">
              Questions or privacy requests can be sent to{" "}
              <a
                href={`mailto:${siteConfig.privacyEmail}`}
                className="text-[#8be9ff] hover:text-white"
              >
                {siteConfig.privacyEmail}
              </a>
              .
            </p>
          </aside>

          <div className="max-w-3xl">
            <div className="rounded-[1.75rem] border border-white/[0.09] bg-white/[0.025] p-6 text-sm leading-7 text-white/46 sm:p-8">
              This policy describes GridSpell Studio&apos;s current operating practices.
              It should be reviewed periodically as vendors, services, and legal
              requirements change.
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
              <Link href="/terms" className="text-[#8be9ff] hover:text-white">
                Terms of Use
              </Link>
              .
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
