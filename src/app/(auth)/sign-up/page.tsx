import Link from "next/link";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { signUpAction } from "@/features/auth/actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">Registration</p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Invitation only.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        Client accounts are created after a project is approved. Use the email address
        that received your GridSpell invitation.
      </p>

      {params.error ? (
        <p className="mt-6 rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm leading-6 text-[#ff9aa3]">
          {params.error}
        </p>
      ) : null}

      <form action={signUpAction} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm text-white/58">
          Full name
          <span className="relative block">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="fullName"
              autoComplete="name"
              required
              className="form-field pl-11"
              placeholder="Your full name"
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm text-white/58">
          Invited email address
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-field pl-11"
              placeholder="you@company.com"
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm text-white/58">
          Create password
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="form-field pl-11"
              placeholder="At least 8 characters"
            />
          </span>
        </label>

        <ActionButton type="submit" className="mt-2 w-full">
          Activate client account
        </ActionButton>
      </form>

      <p className="mt-6 border-t border-white/[0.08] pt-6 text-sm leading-7 text-white/36">
        Already activated?{" "}
        <Link className="text-[#8be9ff] transition-colors hover:text-white" href="/login">
          Sign in here.
        </Link>
      </p>
    </div>
  );
}
