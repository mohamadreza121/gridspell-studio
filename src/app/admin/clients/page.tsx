import { ActionButton } from "@/components/ui/ActionControl";
import {
  inviteClientAction,
  revokeInvitationAction
} from "@/features/admin/client-invitations/actions";
import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function ClientsPage({ searchParams }: Props) {
  await requireStaff(["owner", "admin", "team_member"]);
  const params = await searchParams;
  const supabase = await createClient();

  const [{ data: invitations }, { data: members }] = await Promise.all([
    supabase
      .from("client_invitations")
      .select("id, email, full_name, role, status, expires_at, created_at, organizations(name)")
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("organization_members")
      .select("user_id, role, created_at, organizations(name), profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(25)
  ]);

  return (
    <section>
      <p className="text-xs uppercase tracking-[.34em] text-[#8be9ff]">Admin</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Clients and invitations.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/40">
        Client registration is invitation-only. Creating an invitation also creates the
        organization that will own the client workspace.
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

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <form
          action={inviteClientAction}
          className="rounded-[1.5rem] border border-white/[.09] bg-white/[.025] p-6"
        >
          <p className="text-xs uppercase tracking-[.28em] text-white/28">New invitation</p>
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-white/58">
              Client full name
              <input name="fullName" required className="form-field" />
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Client email
              <input name="email" type="email" required className="form-field" />
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Organization name
              <input name="organizationName" required className="form-field" />
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Workspace role
              <select name="role" defaultValue="client" className="form-field">
                <option value="client">Client — can participate</option>
                <option value="client_viewer">Client viewer — read-only</option>
              </select>
            </label>
            <ActionButton type="submit" className="mt-2 w-full">
              Create organization and send invite
            </ActionButton>
          </div>
        </form>

        <div className="rounded-[1.5rem] border border-white/[.09] bg-white/[.025] p-6">
          <p className="text-xs uppercase tracking-[.28em] text-white/28">Recent invitations</p>
          <div className="mt-6 grid gap-3">
            {(invitations ?? []).length ? (
              invitations?.map((invitation) => {
                const organization = Array.isArray(invitation.organizations)
                  ? invitation.organizations[0]
                  : invitation.organizations;

                return (
                  <article
                    key={invitation.id}
                    className="grid gap-4 rounded-2xl border border-white/[.075] bg-black/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{invitation.full_name}</p>
                      <p className="mt-1 text-sm text-white/42">{invitation.email}</p>
                      <p className="mt-2 text-xs uppercase tracking-[.2em] text-white/25">
                        {organization?.name ?? "Organization"} · {invitation.role} · {invitation.status}
                      </p>
                    </div>
                    {invitation.status === "pending" ? (
                      <form action={revokeInvitationAction}>
                        <input type="hidden" name="invitationId" value={invitation.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/48 transition hover:border-white/25 hover:text-white"
                        >
                          Revoke
                        </button>
                      </form>
                    ) : null}
                  </article>
                );
              })
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/32">
                No invitations yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/[.09] bg-white/[.025] p-6">
        <p className="text-xs uppercase tracking-[.28em] text-white/28">Active members</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {(members ?? []).length ? (
            members?.map((member) => {
              const organization = Array.isArray(member.organizations)
                ? member.organizations[0]
                : member.organizations;
              const profile = Array.isArray(member.profiles)
                ? member.profiles[0]
                : member.profiles;

              return (
                <article
                  key={`${member.user_id}-${organization?.name ?? "organization"}`}
                  className="rounded-2xl border border-white/[.075] bg-black/10 p-4"
                >
                  <p className="font-medium text-white">{profile?.full_name || "Client user"}</p>
                  <p className="mt-2 text-xs uppercase tracking-[.2em] text-white/25">
                    {organization?.name ?? "Organization"} · {member.role}
                  </p>
                </article>
              );
            })
          ) : (
            <p className="text-sm text-white/32">No accepted client memberships yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
