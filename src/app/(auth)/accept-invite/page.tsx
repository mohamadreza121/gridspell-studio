import { LockKeyhole, MailCheck, UserRound } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { acceptInvitationAction } from "@/features/auth/actions";
import { requireUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AcceptInvitePage({ searchParams }: Props) {
  const user = await requireUser();
  const params = await searchParams;
  const supabase = await createClient();

  const { data: invitations } = await supabase
    .from("client_invitations")
    .select("id, full_name, role, expires_at, organizations(name)")
    .eq("status", "pending")
    .ilike("email", user.email ?? "")
    .order("created_at", { ascending: false })
    .limit(1);

  const invitation = invitations?.[0];

  if (!invitation) {
    return (
      <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <MailCheck className="h-7 w-7 text-[#8be9ff]" />
        <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.055em]">
          No pending invitation was found.
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/42">
          You are signed in as {user.email}. Ask GridSpell to resend the invitation to
          this exact address.
        </p>
      </div>
    );
  }

  const organization = Array.isArray(invitation.organizations)
    ? invitation.organizations[0]
    : invitation.organizations;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
        Complete onboarding
      </p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Join {organization?.name ?? "your GridSpell workspace"}.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        Confirm your name and create the password you will use for the client portal.
      </p>

      {params.error ? (
        <p className="mt-6 rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm text-[#ff9aa3]">
          {params.error}
        </p>
      ) : null}

      <form action={acceptInvitationAction} className="mt-8 grid gap-5">
        <input type="hidden" name="invitationId" value={invitation.id} />

        <label className="grid gap-2 text-sm text-white/58">
          Full name
          <span className="relative block">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="fullName"
              autoComplete="name"
              required
              defaultValue={invitation.full_name ?? ""}
              className="form-field pl-11"
            />
          </span>
        </label>

        {[
          ["password", "Create password"],
          ["confirmPassword", "Confirm password"]
        ].map(([name, label]) => (
          <label key={name} className="grid gap-2 text-sm text-white/58">
            {label}
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
              <input
                name={name}
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
                className="form-field pl-11"
              />
            </span>
          </label>
        ))}

        <ActionButton type="submit" className="w-full">
          Activate client workspace
        </ActionButton>
      </form>
    </div>
  );
}
