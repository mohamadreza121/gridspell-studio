import { MailCheck } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { confirmInvitationLinkAction } from "@/features/auth/actions";

export const dynamic = "force-dynamic";

export default function ConfirmInvitePage() {
  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.04]">
        <MailCheck className="h-5 w-5 text-[#8be9ff]" />
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
        Secure invitation
      </p>

      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Confirm your client invitation.
      </h2>

      <p className="mt-4 text-sm leading-7 text-white/42">
        Continue to verify your invitation and create the password for your
        GridSpell client workspace.
      </p>

      <form action={confirmInvitationLinkAction} className="mt-8">
        <ActionButton type="submit" className="w-full">
          Continue securely
        </ActionButton>
      </form>
    </div>
  );
}