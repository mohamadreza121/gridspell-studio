export type DashboardTourStepId =
  | "overview"
  | "projects"
  | "tasks"
  | "approvals"
  | "files"
  | "messages"
  | "billing"
  | "support";

export type DashboardTourStep = {
  id: DashboardTourStepId;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  benefit: string;
  actions: string[];
};

export const dashboardTourSteps: DashboardTourStep[] = [
  {
    id: "overview",
    number: "01",
    label: "Overview",
    eyebrow: "Start with the full picture",
    title: "Your project status in one clear view.",
    description:
      "The overview combines current phase, percent complete, next milestone, client actions, recent activity, and the latest project update.",
    benefit:
      "You can understand what changed, what is coming next, and whether anything needs your attention in less than a minute.",
    actions: [
      "Check project health and completion percentage",
      "Open the next milestone or client action",
      "Review the latest update from GridSpell"
    ]
  },
  {
    id: "projects",
    number: "02",
    label: "Projects",
    eyebrow: "Keep scope and delivery visible",
    title: "The engagement details stay attached to the work.",
    description:
      "Each project shows its scope, current phase, delivery dates, included deliverables, project owner, team, and agreed investment.",
    benefit:
      "The client always has a reliable source of truth for what is included, who is responsible, and where the engagement currently stands.",
    actions: [
      "Review the approved scope and deliverables",
      "See start date, target launch, and project owner",
      "Open the project workspace and activity history"
    ]
  },
  {
    id: "tasks",
    number: "03",
    label: "Tasks",
    eyebrow: "Make responsibilities unmistakable",
    title: "Every next action has an owner and a deadline.",
    description:
      "Tasks are separated by client responsibility and GridSpell responsibility, with status, priority, due date, and related project information.",
    benefit:
      "There is no confusion about what GridSpell is handling, what the client must provide, or which item is blocking progress.",
    actions: [
      "Filter by owner, status, or priority",
      "Open task details and related files",
      "Mark client actions complete"
    ]
  },
  {
    id: "approvals",
    number: "04",
    label: "Approvals",
    eyebrow: "Turn review into a documented decision",
    title: "Feedback and approval happen beside the deliverable.",
    description:
      "Design versions, review deadlines, comments, requested revisions, and approval history stay connected to the exact item being reviewed.",
    benefit:
      "Feedback remains specific, decisions are recorded, and GridSpell knows exactly when the project can move into the next phase.",
    actions: [
      "Preview the submitted design version",
      "Leave a clear revision request",
      "Approve the deliverable and record the decision"
    ]
  },
  {
    id: "files",
    number: "05",
    label: "Files",
    eyebrow: "Keep every project asset organized",
    title: "One file library, with versions and ownership.",
    description:
      "Brand assets, content, references, contracts, design exports, and launch files include upload date, owner, category, and current version.",
    benefit:
      "The team works from the correct files without searching email attachments, outdated links, or disconnected storage folders.",
    actions: [
      "Upload client content and brand assets",
      "Preview or download the current version",
      "Filter files by category or project"
    ]
  },
  {
    id: "messages",
    number: "06",
    label: "Messages",
    eyebrow: "Keep communication in context",
    title: "Project conversations stay connected to the project.",
    description:
      "Updates, questions, meeting notes, decisions, and attachments are organized in a searchable project conversation rather than scattered across inboxes.",
    benefit:
      "A client can return after several days and understand the conversation, the decision, and the next step without reconstructing an email chain.",
    actions: [
      "Read the latest GridSpell update",
      "Reply with a question or attachment",
      "Search previous decisions and meeting notes"
    ]
  },
  {
    id: "billing",
    number: "07",
    label: "Billing",
    eyebrow: "Make the financial status transparent",
    title: "Invoices, payments, and balances are visible together.",
    description:
      "The billing area shows the agreed project value, amount paid, remaining balance, invoice status, due dates, and downloadable receipts.",
    benefit:
      "Clients can confirm what has been paid and what is due without requesting a separate account statement.",
    actions: [
      "Review paid and outstanding invoices",
      "Download invoices and receipts",
      "Open the secure payment action when available"
    ]
  },
  {
    id: "support",
    number: "08",
    label: "Support",
    eyebrow: "Give every request a trackable path",
    title: "Questions and production issues become managed requests.",
    description:
      "Clients can select the related project, choose a priority, explain the request, and follow its status through a protected support workflow.",
    benefit:
      "Nothing depends on an untracked message. Each request has context, ownership, priority, and a visible response history.",
    actions: [
      "Create a project or account support request",
      "Set normal, high, or urgent priority",
      "Track open, in-progress, and resolved requests"
    ]
  }
];
