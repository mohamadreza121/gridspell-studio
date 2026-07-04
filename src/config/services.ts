import type { PricingPackageId } from "@/config/packages";

export type ServiceProcessStep = {
  title: string;
  text: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  salesHeadline: string;
  problem: string;
  promise: string;
  idealFor: string;
  outcomes: readonly string[];
  deliverables: readonly string[];
  process: readonly ServiceProcessStep[];
  proofPoints: readonly string[];
  faqs: readonly ServiceFaq[];
  packageId: PricingPackageId;
};

export const services: readonly Service[] = [
  {
    slug: "business-websites",
    number: "01",
    title: "Business Website Design & Development",
    shortTitle: "Business Websites",
    summary:
      "Custom business websites that make your company look credible, explain your offer clearly, and turn visitors into qualified leads.",
    salesHeadline:
      "A professional website built to earn trust before a customer calls.",
    problem:
      "Most small-business websites either look generic, explain too little, or make visitors work too hard to understand why they should trust the company.",
    promise:
      "GridSpell turns your services, proof, and customer journey into a fast, responsive website with clear pages, strong calls to action, and a clean lead flow.",
    idealFor:
      "Service businesses, consultants, trades, local companies, and professional teams that need a custom 3–5 page website instead of a template or one-page placeholder.",
    outcomes: [
      "A clearer first impression for customers comparing you against competitors",
      "Service pages that explain what you do, who it is for, and why it matters",
      "A simple path from interest to inquiry, quote request, or discovery call",
      "A technical foundation for SEO, analytics, speed, and future growth"
    ],
    deliverables: [
      "Website strategy and page structure",
      "Custom responsive design system",
      "Next.js development and deployment",
      "Lead-generation form or quote request flow",
      "Technical SEO, metadata, sitemap, and analytics setup",
      "Launch support and post-launch checks"
    ],
    process: [
      {
        title: "Clarify the offer",
        text: "We define the main services, target customer, proof points, and the action each page should drive."
      },
      {
        title: "Build the page system",
        text: "The website is structured around homepage, services, proof, about, and contact content so visitors can make a decision quickly."
      },
      {
        title: "Launch with tracking",
        text: "The site ships with responsive QA, metadata, analytics basics, and a reliable inquiry path."
      }
    ],
    proofPoints: [
      "Designed around conversion, not just visuals",
      "Built with reusable sections so the site can grow later",
      "Search and performance foundations included from the start"
    ],
    faqs: [
      {
        question: "Do I need all the content ready first?",
        answer:
          "No. The project can start with rough notes, service lists, and examples. Final copy can be shaped during the strategy and content phase."
      },
      {
        question: "Can this become a bigger website later?",
        answer:
          "Yes. The structure is built so additional services, projects, articles, and integrations can be added without rebuilding the entire site."
      }
    ],
    packageId: "launch"
  },
  {
    slug: "website-redesign",
    number: "02",
    title: "Strategic Website Redesign",
    shortTitle: "Website Redesign",
    summary:
      "A full redesign for websites that feel outdated, confusing, slow, or no longer match the quality of the business behind them.",
    salesHeadline:
      "Turn an underperforming website into a clearer sales asset.",
    problem:
      "A dated website can quietly make the business look smaller, less trustworthy, or less capable than it really is—even when the service is strong.",
    promise:
      "GridSpell audits what is holding the current site back, rebuilds the structure around stronger sales content, and launches a cleaner, faster, more credible experience.",
    idealFor:
      "Established businesses with an existing website that needs better positioning, cleaner design, stronger service pages, improved mobile experience, or a safer migration plan.",
    outcomes: [
      "A sharper brand impression without losing the business identity customers already know",
      "Improved page structure, navigation, and content hierarchy",
      "A safer launch plan with redirects, metadata, and old-page cleanup considered",
      "A website that better supports ads, search, referrals, and direct sales conversations"
    ],
    deliverables: [
      "Current-site audit and conversion review",
      "New sitemap and page structure",
      "Updated visual system and responsive layouts",
      "Content cleanup, migration, and page rewriting guidance",
      "Redirect, metadata, and launch checklist",
      "Performance, accessibility, and SEO pass"
    ],
    process: [
      {
        title: "Audit what exists",
        text: "We review the current pages, messaging, mobile layout, SEO basics, and conversion path to find the biggest opportunities."
      },
      {
        title: "Rebuild the structure",
        text: "The new site map, page sections, and calls to action are planned around how customers actually decide."
      },
      {
        title: "Launch without chaos",
        text: "The replacement is deployed with redirects, metadata, QA, and checks so the redesign does not create avoidable SEO or user-experience problems."
      }
    ],
    proofPoints: [
      "Redesign strategy comes before visual polish",
      "Old pages and SEO signals are considered before launch",
      "Better mobile clarity is treated as a core requirement"
    ],
    faqs: [
      {
        question: "Will the old website disappear immediately?",
        answer:
          "No. The new site can be built separately and launched when ready, so the current website does not need to be taken down during production."
      },
      {
        question: "Can you keep parts of the old content?",
        answer:
          "Yes. Strong existing content can be reused, cleaned up, or reorganized instead of rewritten from zero."
      }
    ],
    packageId: "growth"
  },
  {
    slug: "landing-pages",
    number: "03",
    title: "Campaign & Landing Pages",
    shortTitle: "Landing Pages",
    summary:
      "Focused landing pages for one offer, one audience, and one measurable action—built for campaigns, launches, and fast validation.",
    salesHeadline:
      "A sharper page for one clear conversion goal.",
    problem:
      "Sending traffic to a generic homepage makes paid ads, outreach, and launches harder to measure because the visitor sees too many options and not enough focused proof.",
    promise:
      "GridSpell creates a focused page around the offer, audience, objections, proof, and form flow so every section supports the same conversion goal.",
    idealFor:
      "New offers, ad campaigns, product or service launches, personal brands, lead magnets, event pages, and businesses that need a professional page quickly.",
    outcomes: [
      "A clear message for one audience and one offer",
      "A simple conversion path for forms, booking, quote requests, or waitlists",
      "A stronger place to send ad traffic than a general homepage",
      "Analytics-ready structure for campaign performance review"
    ],
    deliverables: [
      "Offer positioning and page strategy",
      "Conversion copy structure",
      "Custom responsive landing page design",
      "Lead form, booking link, or CTA integration",
      "Analytics event and conversion tracking setup",
      "Launch-ready metadata and performance checks"
    ],
    process: [
      {
        title: "Define the offer",
        text: "We identify the audience, promise, objections, proof, and one primary action for the page."
      },
      {
        title: "Build the conversion path",
        text: "The page is designed around the flow from problem to proof to action instead of general website navigation."
      },
      {
        title: "Prepare for traffic",
        text: "Forms, tracking, metadata, and responsive QA are checked before the campaign or launch goes live."
      }
    ],
    proofPoints: [
      "Useful for testing an offer before building a full website",
      "CTA and form flow are built into the page strategy",
      "Can be expanded into a full website later"
    ],
    faqs: [
      {
        question: "Can a landing page be done faster than a full website?",
        answer:
          "Usually yes, because the scope is focused on one page and one goal. Timing still depends on how ready the offer, copy, and assets are."
      },
      {
        question: "Can this connect to ads or analytics?",
        answer:
          "Yes. The page can include conversion events, forms, booking links, and the tracking structure needed for campaign review."
      }
    ],
    packageId: "starter"
  },
  {
    slug: "client-portals",
    number: "04",
    title: "Client Portals & Dashboards",
    shortTitle: "Portals & Dashboards",
    summary:
      "Secure portals and dashboards for clients, teams, files, approvals, reporting, invoices, and internal workflows.",
    salesHeadline:
      "Replace messy email chains with a system clients can actually use.",
    problem:
      "When updates, files, approvals, invoices, and client communication are spread across email threads and spreadsheets, the business loses time and looks less organized.",
    promise:
      "GridSpell designs and builds a secure portal experience with the right roles, data structure, dashboard views, and workflows for how your business operates.",
    idealFor:
      "Agencies, service companies, consultants, contractors, and teams that need client logins, project tracking, approvals, documents, reporting, or internal admin tools.",
    outcomes: [
      "A clearer client experience after the sale",
      "One place for project status, files, notes, approvals, and next steps",
      "Admin views that help your team manage work without chasing information",
      "A scalable foundation for future workflows, payments, or automation"
    ],
    deliverables: [
      "Portal strategy and user-flow planning",
      "Authentication and account states",
      "Role-based access and permissions",
      "Database architecture and secure server functionality",
      "Client dashboard and internal admin views",
      "Deployment, testing, and launch support"
    ],
    process: [
      {
        title: "Map the workflow",
        text: "We define who logs in, what each role can see, and which actions matter most for clients and admins."
      },
      {
        title: "Design the portal experience",
        text: "Dashboards, states, empty screens, permissions, and key workflows are planned before development."
      },
      {
        title: "Build and test securely",
        text: "Authentication, database rules, server actions, and deployment are handled with careful testing before launch."
      }
    ],
    proofPoints: [
      "Designed like a product, not a hidden page",
      "Role and permission planning comes before development",
      "Built for real business workflows instead of generic portal templates"
    ],
    faqs: [
      {
        question: "Is this different from a normal website?",
        answer:
          "Yes. A portal usually includes accounts, protected pages, database records, permissions, and workflows, so it is scoped like a custom application."
      },
      {
        question: "Can it start small?",
        answer:
          "Yes. A portal can begin with a focused first version, such as project status and files, then grow into approvals, invoices, messaging, or reporting."
      }
    ],
    packageId: "custom"
  },
  {
    slug: "full-stack-apps",
    number: "05",
    title: "Custom Full-Stack Web Applications",
    shortTitle: "Web Applications",
    summary:
      "Purpose-built web applications for businesses that need custom UX, secure data, workflows, dashboards, and scalable product foundations.",
    salesHeadline:
      "Custom software shaped around how the business actually works.",
    problem:
      "Off-the-shelf tools often force the business to change its workflow, duplicate data, or connect too many disconnected systems just to get simple work done.",
    promise:
      "GridSpell plans, designs, and builds custom web applications with the right product flow, database structure, permissions, and deployment path for the first usable version.",
    idealFor:
      "Founders, operators, and teams building an MVP, internal tool, booking workflow, reporting system, approval process, or business-specific web application.",
    outcomes: [
      "A usable first version instead of an endless feature list",
      "Product flows that make sense for the user and the business",
      "Secure database-backed functionality with practical permissions",
      "A maintainable foundation for future features and integrations"
    ],
    deliverables: [
      "Product planning and technical architecture",
      "Application UX and interface design",
      "Frontend, backend, and database implementation",
      "Authentication, permissions, and account states",
      "API, workflow, or payment integrations where needed",
      "Deployment, monitoring, and release planning"
    ],
    process: [
      {
        title: "Scope the first version",
        text: "We define the core users, jobs to be done, data, permissions, and the smallest useful version worth building."
      },
      {
        title: "Design the product flow",
        text: "The application is mapped around screens, states, edge cases, and user actions before build work expands."
      },
      {
        title: "Ship in controlled stages",
        text: "The app is built with checkpoints, testing, deployment planning, and a clear path for future releases."
      }
    ],
    proofPoints: [
      "Built around a defined product roadmap",
      "Data and permissions are treated as core architecture",
      "Designed for staged releases instead of uncontrolled scope creep"
    ],
    faqs: [
      {
        question: "Can you build an MVP?",
        answer:
          "Yes. The first step is usually narrowing the idea into a focused version that can be designed, built, tested, and improved."
      },
      {
        question: "How is pricing handled for custom apps?",
        answer:
          "Custom applications are quoted after discovery because the cost depends on users, permissions, data, integrations, and the first release scope."
      }
    ],
    packageId: "custom"
  },
  {
    slug: "care-plans",
    number: "06",
    title: "Website Care & Growth",
    shortTitle: "Care Plans",
    summary:
      "Ongoing website care, updates, monitoring, reporting, and improvement support after launch so the site keeps working for the business.",
    salesHeadline:
      "Keep the website reliable, current, and useful after launch.",
    problem:
      "A website can slowly become outdated, unmonitored, or technically risky when no one owns updates, forms, content changes, analytics checks, or small improvements.",
    promise:
      "GridSpell gives the site a technical owner after launch with maintenance, monitoring, improvements, and priority support matched to the business need.",
    idealFor:
      "Businesses that want one reliable technical partner for updates, performance checks, content changes, analytics review, conversion improvements, and ongoing support.",
    outcomes: [
      "Less stress around updates, broken forms, and technical maintenance",
      "A safer path for ongoing content changes and small improvements",
      "Regular checks on performance, analytics, and conversion tracking",
      "A partner who already understands the website when the business needs changes"
    ],
    deliverables: [
      "Software and dependency updates",
      "Uptime, form, and health monitoring",
      "Backups and maintenance checks",
      "Small content updates or improvement tasks",
      "Analytics and conversion tracking review",
      "Priority support and improvement planning"
    ],
    process: [
      {
        title: "Stabilize the website",
        text: "We check the technical setup, forms, analytics, and update process so maintenance has a reliable baseline."
      },
      {
        title: "Handle recurring care",
        text: "Updates, monitoring, backups, small content changes, and support requests are handled on a predictable cadence."
      },
      {
        title: "Improve over time",
        text: "When the business needs more than maintenance, the care plan can support conversion improvements, new pages, and feature planning."
      }
    ],
    proofPoints: [
      "Useful after launch, redesign, or active marketing campaigns",
      "Keeps ownership clear instead of reactive",
      "Can support both maintenance and growth work"
    ],
    faqs: [
      {
        question: "Is a care plan required?",
        answer:
          "No. Care plans are optional, but they are useful when you want one partner responsible for updates, checks, and ongoing improvements."
      },
      {
        question: "Can care include new pages or features?",
        answer:
          "Yes, depending on the plan. Larger features may still be quoted separately, but care gives the work a cleaner support path."
      }
    ],
    packageId: "growth"
  }
] as const;

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
