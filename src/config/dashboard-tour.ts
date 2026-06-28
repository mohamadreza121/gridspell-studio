export type DashboardTourStepId =
  | "overview"
  | "tasks"
  | "files"
  | "approvals"
  | "messages"
  | "launch";

export type DashboardTourStep = {
  id: DashboardTourStepId;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  benefit: string;
  action: string;
  transform: {
    scale: number;
    x: string;
    y: string;
  };
  focus: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  cursor: {
    left: string;
    top: string;
  };
};

export const dashboardTourSteps: DashboardTourStep[] = [
  {
    id: "overview",
    number: "01",
    label: "Overview",
    eyebrow: "Know where the project stands",
    title: "The whole project at a glance.",
    description:
      "See the current phase, overall progress, upcoming milestone, and anything that needs your attention as soon as you sign in.",
    benefit:
      "You get a clear answer without searching through emails or asking for a status update.",
    action: "Review progress and the next milestone",
    transform: { scale: 1.08, x: "0%", y: "3%" },
    focus: { left: "19%", top: "13%", width: "77%", height: "24%" },
    cursor: { left: "77%", top: "24%" }
  },
  {
    id: "tasks",
    number: "02",
    label: "Tasks",
    eyebrow: "Keep responsibilities obvious",
    title: "See what needs your attention.",
    description:
      "Client tasks and GridSpell tasks stay separated, prioritized, and connected to real deadlines.",
    benefit:
      "You always know what GridSpell is handling and which action is waiting on you.",
    action: "Complete, review, or open a task",
    transform: { scale: 1.36, x: "-11%", y: "-9%" },
    focus: { left: "21%", top: "39%", width: "47%", height: "34%" },
    cursor: { left: "57%", top: "57%" }
  },
  {
    id: "files",
    number: "03",
    label: "Files",
    eyebrow: "Keep every asset together",
    title: "No more lost links or attachments.",
    description:
      "Logos, copy, images, documents, and approved deliverables stay organized inside the project workspace.",
    benefit:
      "Everyone works from the same version, and important assets do not disappear inside email threads.",
    action: "Upload, preview, and download files",
    transform: { scale: 1.5, x: "-16%", y: "-28%" },
    focus: { left: "21%", top: "75%", width: "47%", height: "20%" },
    cursor: { left: "58%", top: "84%" }
  },
  {
    id: "approvals",
    number: "04",
    label: "Approvals",
    eyebrow: "Turn feedback into decisions",
    title: "Review clearly. Approve confidently.",
    description:
      "Design reviews, comments, revision notes, and approval decisions stay attached to the work they belong to.",
    benefit:
      "Feedback is easier to understand, decisions are documented, and the project keeps moving.",
    action: "Comment, request a revision, or approve",
    transform: { scale: 1.42, x: "16%", y: "-10%" },
    focus: { left: "70%", top: "39%", width: "26%", height: "34%" },
    cursor: { left: "88%", top: "62%" }
  },
  {
    id: "messages",
    number: "05",
    label: "Updates",
    eyebrow: "Keep communication connected",
    title: "Project updates stay with the project.",
    description:
      "Important messages, meeting notes, reminders, and recent activity remain visible in one reliable place.",
    benefit:
      "You can return days later and understand what changed without reconstructing the conversation.",
    action: "Read updates and continue the conversation",
    transform: { scale: 1.43, x: "17%", y: "24%" },
    focus: { left: "70%", top: "75%", width: "26%", height: "20%" },
    cursor: { left: "87%", top: "85%" }
  },
  {
    id: "launch",
    number: "06",
    label: "Launch",
    eyebrow: "See what comes next",
    title: "A visible path all the way to launch.",
    description:
      "Milestones, completed work, launch checks, and upcoming dates show exactly how the project moves forward.",
    benefit:
      "There are no surprise deadlines and no mystery about what must happen before launch.",
    action: "Review milestones and launch readiness",
    transform: { scale: 1.3, x: "-8%", y: "19%" },
    focus: { left: "21%", top: "39%", width: "47%", height: "34%" },
    cursor: { left: "39%", top: "48%" }
  }
];
