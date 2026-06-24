import { LockKeyhole } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionControl";
import { updatePasswordAction } from "@/features/auth/actions";
import { requireUser } from "@/lib/supabase/auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function UpdatePasswordPage({ searchParams }: Props) {
  await requireUser();
  const params = await searchParams;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">Security</p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Choose a new password.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        Use at least 12 characters and avoid reusing a password from another service.
      </p>

      {params.error ? (
        <p className="mt-6 rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm text-[#ff9aa3]">
          {params.error}
        </p>
      ) : null}

      <form action={updatePasswordAction} className="mt-8 grid gap-5">
        {[
          ["password", "New password", "new-password"],
          ["confirmPassword", "Confirm new password", "new-password"]
        ].map(([name, label, autoComplete]) => (
          <label key={name} className="grid gap-2 text-sm text-white/58">
            {label}
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
              <input
                name={name}
                type="password"
                autoComplete={autoComplete}
                minLength={12}
                required
                className="form-field pl-11"
              />
            </span>
          </label>
        ))}

        <ActionButton type="submit" className="w-full">
          Update password
        </ActionButton>
      </form>
    </div>
  );
}
