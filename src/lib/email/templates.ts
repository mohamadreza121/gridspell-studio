import "server-only";

export type EmailTemplate = {
  key:
    | "lead_confirmation"
    | "admin_lead_notification"
    | "client_invitation"
    | "milestone_ready"
    | "approval_request"
    | "payment_confirmation"
    | "launch_complete";
  subject: string;
  preview: string;
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#039;",
      '"': "&quot;"
    };
    return entities[character] ?? character;
  });
}

function paragraph(value: string) {
  return `<p style="margin:0 0 18px;color:#b8bdca;font-size:16px;line-height:1.7">${escapeHtml(value)}</p>`;
}

function button(label: string, href: string) {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin-top:8px;padding:14px 20px;border-radius:999px;background:linear-gradient(90deg,#7657ff,#35c9ff);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700">${escapeHtml(label)}</a>`;
}

function detailRows(rows: Array<[string, string | null | undefined]>) {
  const visible = rows.filter(([, value]) => value);
  if (!visible.length) return "";

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;border-collapse:collapse;border:1px solid #252938;border-radius:16px;overflow:hidden">${visible
    .map(
      ([label, value]) =>
        `<tr><td style="padding:12px 16px;border-bottom:1px solid #252938;color:#747b8e;font-size:12px;text-transform:uppercase;letter-spacing:.12em">${escapeHtml(label)}</td><td style="padding:12px 16px;border-bottom:1px solid #252938;color:#f3f5fb;font-size:14px;text-align:right">${escapeHtml(String(value))}</td></tr>`
    )
    .join("")}</table>`;
}

function layout(input: {
  eyebrow: string;
  title: string;
  preview: string;
  content: string;
  footer?: string;
}) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(input.title)}</title></head>
<body style="margin:0;background:#07080c;font-family:Inter,Arial,sans-serif;color:#ffffff">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(input.preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#07080c;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border:1px solid #202331;border-radius:24px;background:#0c0e14;overflow:hidden">
        <tr><td style="padding:26px 30px;border-bottom:1px solid #202331">
          <table role="presentation" width="100%"><tr><td style="font-size:20px;font-weight:800;letter-spacing:-.03em">Grid<span style="color:#8c7cff">Spell</span></td><td align="right" style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#667085">Client experience</td></tr></table>
        </td></tr>
        <tr><td style="padding:38px 30px 34px">
          <div style="margin-bottom:16px;color:#65dfff;font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase">${escapeHtml(input.eyebrow)}</div>
          <h1 style="margin:0 0 22px;color:#ffffff;font-size:34px;line-height:1.08;letter-spacing:-.045em">${escapeHtml(input.title)}</h1>
          ${input.content}
        </td></tr>
        <tr><td style="padding:22px 30px;border-top:1px solid #202331;color:#697083;font-size:12px;line-height:1.6">${escapeHtml(input.footer ?? "This message was sent by GridSpell regarding a website or client project.")}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function leadConfirmationTemplate(input: {
  name: string;
  projectType: string;
  timeline?: string | null;
  siteUrl: string;
}): EmailTemplate {
  const firstName = input.name.trim().split(/\s+/)[0] || input.name;
  const subject = "We received your GridSpell project inquiry";
  const preview = "Your project brief is safely in our queue.";
  const text = `Hi ${firstName},\n\nThanks for reaching out to GridSpell. We received your inquiry for ${input.projectType}. We will review the scope and reply with the clearest next step.\n\n${input.timeline ? `Preferred timeline: ${input.timeline}\n\n` : ""}GridSpell\n${input.siteUrl}`;
  const content = [
    paragraph(`Hi ${firstName},`),
    paragraph(`Thanks for reaching out. We received your inquiry for ${input.projectType} and will review the scope, goals, and timeline before replying with the clearest next step.`),
    detailRows([["Project type", input.projectType], ["Preferred timeline", input.timeline]]),
    paragraph("You do not need to submit the form again. We will contact you directly at this email address."),
    button("Visit GridSpell", input.siteUrl)
  ].join("");

  return { key: "lead_confirmation", subject, preview, text, html: layout({ eyebrow: "Inquiry received", title: "Your project is in the queue.", preview, content }) };
}

export function adminLeadNotificationTemplate(input: {
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  budget: string;
  timeline?: string | null;
  message: string;
  adminUrl: string;
}): EmailTemplate {
  const subject = `New GridSpell lead — ${input.name}`;
  const preview = `${input.projectType} inquiry from ${input.email}`;
  const text = `New lead\n\nName: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company ?? "—"}\nProject type: ${input.projectType}\nBudget: ${input.budget}\nTimeline: ${input.timeline ?? "—"}\n\n${input.message}\n\n${input.adminUrl}`;
  const content = [
    paragraph("A new website inquiry was submitted."),
    detailRows([
      ["Name", input.name],
      ["Email", input.email],
      ["Company", input.company],
      ["Project type", input.projectType],
      ["Budget", input.budget],
      ["Timeline", input.timeline]
    ]),
    paragraph(input.message),
    button("Open lead pipeline", input.adminUrl)
  ].join("");
  return { key: "admin_lead_notification", subject, preview, text, html: layout({ eyebrow: "New lead", title: input.name, preview, content }) };
}

export function clientInvitationTemplate(input: {
  fullName: string;
  organizationName: string;
  invitedByName?: string | null;
  inviteUrl: string;
}): EmailTemplate {
  const firstName = input.fullName.trim().split(/\s+/)[0] || input.fullName;
  const subject = `Your ${input.organizationName} workspace is ready`;
  const preview = "Accept your secure GridSpell client portal invitation.";
  const text = `Hi ${firstName},\n\n${input.invitedByName ?? "GridSpell"} invited you to the ${input.organizationName} client workspace. Use the secure link below to create your password and finish setup.\n\n${input.inviteUrl}\n\nThis invitation link is intended only for you.`;
  const content = [
    paragraph(`Hi ${firstName},`),
    paragraph(`${input.invitedByName ?? "GridSpell"} invited you to the secure ${input.organizationName} workspace. The portal keeps project progress, files, approvals, messages, and billing in one place.`),
    button("Accept invitation", input.inviteUrl),
    paragraph("This link is intended only for you. If you were not expecting this invitation, you can ignore this email.")
  ].join("");
  return { key: "client_invitation", subject, preview, text, html: layout({ eyebrow: "Client invitation", title: "Your workspace is ready.", preview, content }) };
}

export function milestoneReadyTemplate(input: {
  clientName?: string | null;
  projectName: string;
  milestoneTitle: string;
  dueDate?: string | null;
  portalUrl: string;
}): EmailTemplate {
  const greeting = input.clientName ? `Hi ${input.clientName.trim().split(/\s+/)[0]},` : "Hello,";
  const subject = `${input.milestoneTitle} is ready — ${input.projectName}`;
  const preview = "A new project milestone is ready in your portal.";
  const text = `${greeting}\n\nThe milestone “${input.milestoneTitle}” for ${input.projectName} is ready. Review the latest project status in your GridSpell portal.\n\n${input.portalUrl}`;
  const content = [
    paragraph(greeting),
    paragraph(`The milestone “${input.milestoneTitle}” for ${input.projectName} is ready. Open the portal to review the latest status, files, and next steps.`),
    detailRows([["Project", input.projectName], ["Milestone", input.milestoneTitle], ["Due date", input.dueDate]]),
    button("Review milestone", input.portalUrl)
  ].join("");
  return { key: "milestone_ready", subject, preview, text, html: layout({ eyebrow: "Milestone ready", title: input.milestoneTitle, preview, content }) };
}

export function approvalRequestTemplate(input: {
  clientName?: string | null;
  projectName: string;
  approvalTitle: string;
  description?: string | null;
  portalUrl: string;
}): EmailTemplate {
  const greeting = input.clientName ? `Hi ${input.clientName.trim().split(/\s+/)[0]},` : "Hello,";
  const subject = `Approval requested — ${input.projectName}`;
  const preview = "A project decision is waiting in your GridSpell portal.";
  const text = `${greeting}\n\nGridSpell requested your approval for “${input.approvalTitle}” on ${input.projectName}.\n${input.description ?? ""}\n\n${input.portalUrl}`;
  const content = [
    paragraph(greeting),
    paragraph(`A decision is ready for “${input.approvalTitle}” on ${input.projectName}. You can approve it or request changes directly in the client portal.`),
    input.description ? paragraph(input.description) : "",
    button("Review approval", input.portalUrl)
  ].join("");
  return { key: "approval_request", subject, preview, text, html: layout({ eyebrow: "Approval requested", title: "A decision is waiting.", preview, content }) };
}

export function paymentConfirmationTemplate(input: {
  clientName?: string | null;
  invoiceNumber: string;
  amount: string;
  projectName?: string | null;
  billingUrl: string;
}): EmailTemplate {
  const greeting = input.clientName ? `Hi ${input.clientName.trim().split(/\s+/)[0]},` : "Hello,";
  const subject = `Payment received — ${input.invoiceNumber}`;
  const preview = `GridSpell received your payment of ${input.amount}.`;
  const text = `${greeting}\n\nWe received your payment of ${input.amount} for ${input.invoiceNumber}.\n${input.projectName ? `Project: ${input.projectName}\n` : ""}\n${input.billingUrl}`;
  const content = [
    paragraph(greeting),
    paragraph(`We received your payment of ${input.amount}. Your billing record has been updated automatically.`),
    detailRows([["Invoice", input.invoiceNumber], ["Project", input.projectName], ["Payment", input.amount]]),
    button("View billing", input.billingUrl)
  ].join("");
  return { key: "payment_confirmation", subject, preview, text, html: layout({ eyebrow: "Payment confirmed", title: "Payment received.", preview, content }) };
}

export function launchCompleteTemplate(input: {
  clientName?: string | null;
  projectName: string;
  websiteUrl?: string | null;
  portalUrl: string;
}): EmailTemplate {
  const greeting = input.clientName ? `Hi ${input.clientName.trim().split(/\s+/)[0]},` : "Hello,";
  const subject = `${input.projectName} is live`;
  const preview = "Your GridSpell project has officially launched.";
  const text = `${greeting}\n\n${input.projectName} has officially launched.${input.websiteUrl ? `\nWebsite: ${input.websiteUrl}` : ""}\n\n${input.portalUrl}`;
  const content = [
    paragraph(greeting),
    paragraph(`${input.projectName} has officially launched. Thank you for trusting GridSpell with the work.`),
    input.websiteUrl ? button("Visit live website", input.websiteUrl) : "",
    button("Open project portal", input.portalUrl),
    paragraph("The portal will remain the home for final files, billing records, and future support requests.")
  ].join("");
  return { key: "launch_complete", subject, preview, text, html: layout({ eyebrow: "Launch complete", title: "Your project is live.", preview, content }) };
}
