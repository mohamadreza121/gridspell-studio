import "server-only";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import type { EmailTemplate } from "@/lib/email/templates";

let resendClient: Resend | null = null;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

function getFromAddress() {
  const fallback =
    "GridSpell Studio <notifications@send.gridspellstudio.com>";

  const rawValue = process.env.RESEND_FROM_EMAIL?.trim();

  if (!rawValue) {
    return fallback;
  }

  // Protect against quotes accidentally being stored literally,
  // especially when copying values into Vercel.
  const value = rawValue.replace(/^["']|["']$/g, "").trim();

  const plainEmailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
  const namedEmailPattern =
    /^[^<>]+<\s*[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+\s*>$/;

  if (
    !plainEmailPattern.test(value) &&
    !namedEmailPattern.test(value)
  ) {
    throw new Error(
      `Invalid RESEND_FROM_EMAIL format: ${JSON.stringify(value)}. ` +
        'Use "GridSpell Studio <notifications@send.gridspellstudio.com>".'
    );
  }

  return value;
}

export async function sendTransactionalEmail(input: {
  to: string | string[];
  template: EmailTemplate;
  replyTo?: string;
  metadata?: Record<string, unknown>;
}) {
  const recipients = Array.isArray(input.to) ? input.to : [input.to];
  const normalizedRecipients = [...new Set(recipients.map((item) => item.trim().toLowerCase()).filter(Boolean))];
  if (!normalizedRecipients.length) return { status: "skipped" as const, id: null };

  const admin = createAdminClient();
  const resend = getResend();

  if (!resend) {
    await admin.from("email_deliveries").insert(
      normalizedRecipients.map((recipient) => ({
        template: input.template.key,
        recipient,
        subject: input.template.subject,
        status: "skipped",
        metadata: { ...input.metadata, reason: "RESEND_API_KEY is not configured" }
      }))
    );
    console.warn(`Email skipped (${input.template.key}): RESEND_API_KEY is not configured.`);
    return { status: "skipped" as const, id: null };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: normalizedRecipients,
      subject: input.template.subject,
      html: input.template.html,
      text: input.template.text,
      replyTo: input.replyTo || process.env.RESEND_REPLY_TO || undefined
    });

    if (error) throw new Error(error.message);

    await admin.from("email_deliveries").insert(
      normalizedRecipients.map((recipient) => ({
        template: input.template.key,
        recipient,
        subject: input.template.subject,
        provider_message_id: data?.id ?? null,
        status: "sent",
        sent_at: new Date().toISOString(),
        metadata: input.metadata ?? {}
      }))
    );

    return { status: "sent" as const, id: data?.id ?? null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    await admin.from("email_deliveries").insert(
      normalizedRecipients.map((recipient) => ({
        template: input.template.key,
        recipient,
        subject: input.template.subject,
        status: "failed",
        error_message: message,
        metadata: input.metadata ?? {}
      }))
    );
    console.error(`Email failed (${input.template.key}):`, message);
    throw error;
  }
}
