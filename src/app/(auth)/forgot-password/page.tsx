import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { forgotPasswordAction } from "@/features/auth/actions";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.04]">
        <ShieldCheck className="h-5 w-5 text-[#8be9ff]" />
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
        Account recovery
      </p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Reset your password.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        Enter the email address connected to your GridSpell workspace.
      </p>

      {params.error ? (
        <p className="mt-6 rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm text-[#ff9aa3]">
          {params.error}
        </p>
      ) : null}

      {params.message ? (
        <p className="mt-6 rounded-2xl border border-[#35d07f]/25 bg-[#35d07f]/8 px-4 py-3 text-sm text-[#7ce3aa]">
          {params.message}
        </p>
      ) : null}

      <form action={forgotPasswordAction} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm text-white/58">
          Account email
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-field form-field-with-icon"
              placeholder="you@company.com"
            />
          </span>
        </label>
        <ActionButton type="submit" className="w-full">
          Send password reset link
        </ActionButton>
      </form>

      <Link
        href="/login"
        className="mt-7 inline-flex text-sm text-white/38 transition-colors hover:text-white"
      >
        Return to login
      </Link>
    </div>
  );
}
