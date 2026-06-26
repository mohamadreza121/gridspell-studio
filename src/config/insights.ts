export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type InsightArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  takeaway: string;
  accent: "violet" | "cyan" | "blue";
  featured?: boolean;
  sections: InsightSection[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "what-a-professional-business-website-should-accomplish",
    category: "Website strategy",
    title: "What a professional business website should actually accomplish",
    excerpt:
      "A website should do more than look current. It should establish trust, explain the offer, guide decisions, create measurable actions, and remain useful as the business grows.",
    readingTime: "8 min",
    takeaway:
      "The strongest business websites connect credibility, clarity, conversion, performance, and ownership.",
    accent: "violet",
    featured: true,
    sections: [
      {
        heading: "A website is part of the business—not a digital brochure",
        paragraphs: [
          "A professional website should help a visitor understand who the company serves, what it provides, why it is credible, and what to do next. A visually polished homepage is valuable, but appearance alone does not create a useful business system.",
          "The website should reduce uncertainty. It should answer the important questions before a visitor needs to call, email, or search elsewhere for information."
        ]
      },
      {
        heading: "It should establish credibility quickly",
        paragraphs: [
          "Visitors form an opinion before they read every word. Clear positioning, professional presentation, real project evidence, transparent contact information, and consistent branding all contribute to trust.",
          "Credibility also comes from details: accurate service descriptions, readable typography, working forms, fast loading, secure browsing, and a layout that behaves properly on every device."
        ],
        bullets: [
          "A clear statement of what the business does",
          "Specific services instead of broad claims",
          "Real projects, results, credentials, or reviews",
          "Visible contact information and service areas",
          "Consistent design across desktop and mobile"
        ]
      },
      {
        heading: "It should create clear paths for different visitors",
        paragraphs: [
          "Not every visitor arrives with the same level of knowledge or intent. One person may be comparing providers, another may need pricing guidance, and another may be ready to request an estimate immediately.",
          "A strong website gives each visitor an appropriate path without surrounding every paragraph with competing buttons."
        ],
        bullets: [
          "Learn about the company",
          "Understand individual services",
          "Review relevant work",
          "Read answers to common questions",
          "Request a quote, consultation, booking, or purchase"
        ]
      },
      {
        heading: "It should be measurable and maintainable",
        paragraphs: [
          "A business should know whether the website is generating useful activity. Important actions such as form submissions, calls, bookings, downloads, and purchases should be measurable.",
          "Ownership matters too. Domains, hosting, analytics, accounts, content, and source code should be organized so the website can be maintained and improved instead of becoming an abandoned one-time project."
        ]
      }
    ]
  },
  {
    slug: "why-case-studies-sell-better-than-galleries",
    category: "Sales and credibility",
    title: "Why case studies sell better than screenshot galleries",
    excerpt:
      "A gallery proves that work exists. A case study explains the problem, the decisions, the execution, and the value created by the work.",
    readingTime: "6 min",
    takeaway:
      "Show the reasoning behind the work, not only the finished surface.",
    accent: "cyan",
    sections: [
      {
        heading: "A screenshot only shows the final appearance",
        paragraphs: [
          "A polished screenshot can attract attention, but it rarely explains what made the project difficult or valuable. The viewer cannot see the original business problem, the constraints, the strategic decisions, or the technical work behind the result.",
          "Without that context, projects can begin to look interchangeable—even when the thinking behind them was completely different."
        ]
      },
      {
        heading: "A case study demonstrates judgment",
        paragraphs: [
          "Clients are not only paying for screens. They are paying for decisions. A useful case study shows how information was organized, why certain features were prioritized, how the design supported the audience, and how the final system was implemented.",
          "That explanation helps a potential client evaluate how the same process could apply to their own business."
        ],
        bullets: [
          "The original challenge",
          "The audience and business objective",
          "Important constraints",
          "The strategic and technical approach",
          "The finished experience",
          "The result or expected operational improvement"
        ]
      },
      {
        heading: "Specific evidence creates stronger credibility",
        paragraphs: [
          "A strong case study does not need exaggerated metrics. Honest evidence is more useful than vague claims. A redesigned service structure, a working lead workflow, improved mobile usability, or a new client portal can all be meaningful outcomes.",
          "When verified measurements exist, they can be included. When they do not, the case study should clearly describe the delivered capability without inventing performance claims."
        ]
      },
      {
        heading: "The case study should still be visual",
        paragraphs: [
          "Good case studies do not replace visuals with walls of text. They combine concise explanation with desktop, tablet, and mobile demonstrations, interface details, process material, and live links where appropriate.",
          "The result is a stronger sales asset because the work is both visible and understandable."
        ]
      }
    ]
  },
  {
    slug: "when-your-business-needs-a-client-portal",
    category: "Business systems",
    title: "When your business needs a client portal instead of more spreadsheets",
    excerpt:
      "Repeated status questions, scattered files, email approvals, and duplicated data are signs that the process may need one organized client system.",
    readingTime: "7 min",
    takeaway:
      "Build a portal when the business has a repeatable workflow that disconnected tools can no longer manage cleanly.",
    accent: "blue",
    sections: [
      {
        heading: "Spreadsheets are useful until the workflow outgrows them",
        paragraphs: [
          "Spreadsheets are flexible, familiar, and inexpensive. They are often the right place to test an early process. Problems begin when several people maintain different versions, clients require controlled access, or the spreadsheet becomes the unofficial database for the entire operation.",
          "At that stage, the team spends increasing time correcting information rather than using it."
        ]
      },
      {
        heading: "Common signs that a portal may be justified",
        paragraphs: [
          "A portal becomes valuable when the same communication and administrative problems happen repeatedly across many projects or clients."
        ],
        bullets: [
          "Clients repeatedly ask for project status",
          "Files are scattered across email threads and shared drives",
          "Approvals are difficult to locate",
          "Staff copy the same information between systems",
          "Different users require different permissions",
          "Invoices, messages, milestones, and documents have no shared home",
          "Reporting requires manual assembly every week or month"
        ]
      },
      {
        heading: "A portal should simplify an existing process",
        paragraphs: [
          "Software cannot rescue a process nobody understands. Before development begins, the business should identify the users, stages, permissions, required information, approval rules, and exceptions.",
          "The best portal is not the one with the most features. It is the one that removes the most repeated friction from a process the business performs regularly."
        ]
      },
      {
        heading: "Start with the operational core",
        paragraphs: [
          "A first version may only need authentication, project status, documents, messages, and approvals. Billing, reporting, automation, and advanced integrations can be introduced after the core workflow is proven.",
          "This phased approach lowers risk and makes it easier to learn from real usage."
        ]
      }
    ]
  },
  {
    slug: "what-affects-the-cost-of-a-custom-nextjs-website",
    category: "Project planning",
    title: "What affects the cost of a custom Next.js website",
    excerpt:
      "Project cost is shaped by scope, content, design depth, integrations, data, motion, testing, migration, and the level of responsibility included after launch.",
    readingTime: "9 min",
    takeaway:
      "The number of pages matters, but complexity, custom functionality, and project readiness usually matter more.",
    accent: "violet",
    sections: [
      {
        heading: "Page count is only one part of the scope",
        paragraphs: [
          "A five-page website can be straightforward or highly complex. A simple informational site with prepared content is different from a five-page experience containing custom animation, calculators, dynamic content, booking, authentication, and several third-party integrations.",
          "A realistic estimate requires understanding what each page needs to do—not only how many pages exist."
        ]
      },
      {
        heading: "Design depth changes the amount of work",
        paragraphs: [
          "A project based on an established visual system requires less exploration than one needing custom art direction, interaction design, responsive behavior, and a new brand language.",
          "Premium motion also requires planning. Animation must be designed, implemented, tested across devices, and adjusted for accessibility and performance."
        ],
        bullets: [
          "Template adaptation versus custom interface design",
          "Number of unique page layouts",
          "Responsive design complexity",
          "Custom illustration or motion",
          "Content and brand development"
        ]
      },
      {
        heading: "Functionality and integrations create technical scope",
        paragraphs: [
          "Forms, payments, authentication, databases, dashboards, email delivery, SMS, CRM systems, analytics, and external APIs all require configuration and testing.",
          "The visible interface may appear simple while the production workflow behind it involves validation, permissions, error handling, security rules, notifications, and data storage."
        ]
      },
      {
        heading: "Preparation affects both cost and timeline",
        paragraphs: [
          "Projects move faster when the business has clear decision-makers, approved services, usable brand assets, account access, and a reliable feedback process.",
          "Unplanned content creation, late feature additions, missing credentials, and repeated changes to approved direction increase the amount of production work."
        ]
      },
      {
        heading: "The estimate should define responsibility",
        paragraphs: [
          "A useful proposal explains what is included: strategy, design, development, content migration, analytics, SEO foundations, integrations, testing, deployment, training, maintenance, and post-launch support.",
          "Comparing prices without comparing responsibilities often creates a misleading picture of the actual project."
        ]
      }
    ]
  },
  {
    slug: "how-to-make-a-dark-website-feel-premium",
    category: "Interface design",
    title: "How to make a dark website feel premium without hurting readability",
    excerpt:
      "Premium dark interfaces depend on hierarchy, surface separation, typography, restrained light, and motion that supports the experience instead of competing with it.",
    readingTime: "7 min",
    takeaway:
      "Dark design works when contrast is deliberate and visual effects remain secondary to the content.",
    accent: "cyan",
    sections: [
      {
        heading: "Dark does not mean using one black background",
        paragraphs: [
          "A refined dark interface uses several closely related surfaces. The page background, raised panels, interactive controls, borders, and overlays should be distinguishable without looking like unrelated blocks.",
          "Subtle changes in lightness and transparency create depth while preserving a consistent atmosphere."
        ]
      },
      {
        heading: "Typography carries more responsibility",
        paragraphs: [
          "Large white headings on black can create immediate impact, but body text requires more restraint. Pure white used everywhere creates glare and removes hierarchy.",
          "Headings, supporting copy, labels, and metadata should use different levels of emphasis while maintaining enough contrast to remain readable."
        ],
        bullets: [
          "Use strong contrast for primary information",
          "Reduce emphasis for supporting copy without making it faint",
          "Keep line lengths controlled",
          "Use comfortable line spacing",
          "Test the interface on ordinary displays—not only a design monitor"
        ]
      },
      {
        heading: "Glow should describe focus—not decorate everything",
        paragraphs: [
          "Violet and cyan lighting can create a distinctive visual language, but excessive glow makes text, controls, and images feel soft. Light is most useful around interactive focus, important objects, or scene transitions.",
          "The more elements that glow, the less meaningful any individual highlight becomes."
        ]
      },
      {
        heading: "Motion should preserve orientation",
        paragraphs: [
          "Scroll-linked movement, transitions, and 3D effects can make a dark experience feel cinematic. They should still help the user understand where content came from, what is active, and where to go next.",
          "Reduced-motion support and responsive fallbacks are part of the design—not optional cleanup after the visual work is finished."
        ]
      }
    ]
  },
  {
    slug: "what-to-prepare-before-a-website-project",
    category: "Client preparation",
    title: "What to prepare before a website project begins",
    excerpt:
      "Clear goals, approved services, usable content, account access, and a dependable feedback process keep a website project moving efficiently.",
    readingTime: "6 min",
    takeaway:
      "Preparation does not require having every answer. It requires knowing who can make decisions and what the website must accomplish.",
    accent: "blue",
    sections: [
      {
        heading: "Begin with the business outcome",
        paragraphs: [
          "Before discussing colors or animation, define what the website needs to change. The goal may be generating better leads, presenting the company more professionally, selling products, reducing administrative work, or supporting a new service.",
          "A clear outcome helps every later design and technical decision."
        ]
      },
      {
        heading: "Clarify the audience and the offer",
        paragraphs: [
          "The project team should understand who the main visitors are, what they need, what concerns them, and what action the business wants them to take.",
          "Service names, product categories, geographic areas, pricing expectations, and qualification requirements should be discussed before the site structure is finalized."
        ]
      },
      {
        heading: "Gather content and access early",
        paragraphs: [
          "Projects often pause because essential material or account credentials arrive late. Preparing these items early allows design, development, migration, analytics, and launch work to proceed in the correct order."
        ],
        bullets: [
          "Logo and brand files",
          "Approved service and company information",
          "Photography, video, testimonials, and project examples",
          "Domain and DNS access",
          "Hosting and existing website access",
          "Analytics, advertising, email, CRM, and payment accounts",
          "Required policies, licenses, or legal information"
        ]
      },
      {
        heading: "Create a reliable feedback process",
        paragraphs: [
          "The business should identify who reviews the work, who provides consolidated feedback, and who gives final approval. Conflicting comments from several stakeholders create avoidable revisions.",
          "Feedback is most useful when it identifies the business or user problem rather than prescribing isolated visual changes without context."
        ]
      },
      {
        heading: "Expect decisions after launch",
        paragraphs: [
          "A website is improved through real usage. Analytics, search performance, form quality, customer questions, and operational feedback can reveal what should be refined.",
          "The launch should establish a strong production foundation and a clear process for continued ownership."
        ]
      }
    ]
  }
];

export function getInsightBySlug(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}