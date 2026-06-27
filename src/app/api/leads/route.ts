import { NextResponse } from "next/server";
import {
  adminLeadNotificationTemplate,
  leadConfirmationTemplate
} from "@/lib/email/templates";
import { sendTransactionalEmail } from "@/lib/email/send";
import { getSiteUrl } from "@/lib/env";
import { consumeRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, getRequestFingerprint } from "@/lib/security/request";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSubmissionSchema } from "@/validations/lead";

const MAX_BODY_BYTES = 24_000;
const MIN_COMPLETION_MS = 2_000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

function jsonError(message: string, status: number, retryAfter?: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: retryAfter ? { "Retry-After": String(Math.max(1, retryAfter)) } : undefined
    }
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("The submitted form is too large.", 413);
  }

  const fingerprint = getRequestFingerprint(request);
  const ipLimit = await consumeRateLimit({
    namespace: "lead-ip",
    identifier: fingerprint,
    limit: 5,
    windowSeconds: 15 * 60,
    blockSeconds: 60 * 60
  });

  if (!ipLimit.allowed) {
    return jsonError(
      "Too many project inquiries were submitted from this connection. Please try again later.",
      429,
      ipLimit.retryAfterSeconds
    );
  }

  try {
    const parsed = leadSubmissionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonError("Please review the required fields and try again.", 400);
    }

    const lead = parsed.data;
    const now = Date.now();
    const formAge = now - lead.formStartedAt;

    // Hidden honeypot and timing checks reject common automated submissions
    // before any database or email work occurs.
    if (lead.website || formAge < MIN_COMPLETION_MS || formAge > MAX_FORM_AGE_MS) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const emailLimit = await consumeRateLimit({
      namespace: "lead-email",
      identifier: lead.email,
      limit: 3,
      windowSeconds: 60 * 60,
      blockSeconds: 6 * 60 * 60
    });

    if (!emailLimit.allowed) {
      return jsonError(
        "This email address has submitted several inquiries recently. Please try again later.",
        429,
        emailLimit.retryAfterSeconds
      );
    }

    const turnstile = await verifyTurnstile({
      token: lead.turnstileToken,
      remoteIp: getClientIp(request),
      expectedAction: "lead_form"
    });

    if (!turnstile.success) {
      console.warn("Turnstile validation failed:", turnstile.errors.join(", "));
      return jsonError(
        "The security check could not be verified. Refresh the page and try again.",
        400
      );
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        phone: lead.phone || null,
        project_type: lead.projectType,
        budget_range: lead.budget,
        timeline: lead.timeline || null,
        message: lead.message,
        source: "website"
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error(error);
      return jsonError("The inquiry could not be saved. Please try again.", 500);
    }

    const siteUrl = getSiteUrl();
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

    const emailJobs: Promise<unknown>[] = [
      sendTransactionalEmail({
        to: lead.email,
        template: leadConfirmationTemplate({
          name: lead.name,
          projectType: lead.projectType,
          timeline: lead.timeline,
          siteUrl
        }),
        replyTo: adminEmail || undefined,
        metadata: { leadId: data.id }
      })
    ];

    if (adminEmail) {
      emailJobs.push(
        sendTransactionalEmail({
          to: adminEmail,
          template: adminLeadNotificationTemplate({
            name: lead.name,
            email: lead.email,
            company: lead.company,
            projectType: lead.projectType,
            budget: lead.budget,
            timeline: lead.timeline,
            message: lead.message,
            adminUrl: `${siteUrl}/admin/leads`
          }),
          replyTo: lead.email,
          metadata: { leadId: data.id }
        })
      );
    }

    await Promise.allSettled(emailJobs);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return jsonError("The form is temporarily unavailable. Please try again.", 503);
  }
}
