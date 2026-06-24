import Link from "next/link";
import { MailCheck } from "lucide-react";
import { ActionLink } from "@/components/ui/ActionControl";

export default function SignUpPage() {
  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.04]">
        <MailCheck className="h-5 w-5 text-[#8be9ff]" />
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
        Invitation-only access
      </p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Client accounts begin with a project invitation.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        GridSpell creates the organization and sends the primary client contact a secure
        onboarding link. Public account creation is disabled so empty portal accounts
        cannot be created.
      </p>

      <ActionLink href="/login" className="mt-8 w-full">
        Sign in to an existing workspace
      </ActionLink>

      <p className="mt-6 text-center text-xs leading-6 text-white/28">
        Expecting an invitation? Check the exact email address used in your project
        agreement, including the spam folder.
      </p>

      <Link
        href="/contact"
        className="mt-5 block text-center text-sm text-white/38 transition-colors hover:text-white"
      >
        Contact GridSpell
      </Link>
    </div>
  );
}
