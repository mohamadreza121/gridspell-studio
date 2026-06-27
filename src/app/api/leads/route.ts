import { NextResponse } from "next/server";
import { adminLeadNotificationTemplate, leadConfirmationTemplate } from "@/lib/email/templates";
import { sendTransactionalEmail } from "@/lib/email/send";
import { getSiteUrl } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema } from "@/validations/lead";

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete every required field." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();
    const lead = parsed.data;
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
      return NextResponse.json(
        { error: "The inquiry could not be saved. Check Supabase setup." },
        { status: 500 }
      );
    }

    const siteUrl = getSiteUrl();
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      "";

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
    return NextResponse.json(
      { error: "The form is unavailable until environment variables are configured." },
      { status: 503 }
    );
  }
}
