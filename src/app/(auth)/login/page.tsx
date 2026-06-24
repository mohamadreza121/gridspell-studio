import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { signInAction } from "@/features/auth/actions";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">Client portal</p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Welcome back.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        Access projects, files, approvals, messages, and billing.
      </p>

      {params.error ? (
        <p className="mt-6 rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm leading-6 text-[#ff9aa3]">
          {params.error}
        </p>
      ) : null}

      {params.message ? (
        <p className="mt-6 rounded-2xl border border-[#35d07f]/25 bg-[#35d07f]/8 px-4 py-3 text-sm leading-6 text-[#7ce3aa]">
          {params.message}
        </p>
      ) : null}

      <form action={signInAction} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm text-white/58">
          Email address
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
          Password
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-field pl-11"
              placeholder="Enter your password"
            />
          </span>
        </label>

        <ActionButton type="submit" className="mt-2 w-full">
          Sign in to your workspace
        </ActionButton>
      </form>

      <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <Link className="transition-colors hover:text-white" href="/forgot-password">
          Forgot password?
        </Link>
        <Link className="transition-colors hover:text-white" href="/sign-up">
          Registration information
        </Link>
      </div>
    </div>
  );
}
