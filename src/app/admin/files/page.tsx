import Link from "next/link";
import { ActionButton } from "@/components/ui/ActionControl";
import { AdminHeader, AdminNotice, AdminPanel, EmptyState, formatDate } from "@/components/admin/AdminUi";
import { deleteAdminFileAction, toggleAdminFileVisibilityAction, uploadAdminFileAction } from "@/features/admin/actions";
import { getAdminFiles } from "@/features/admin/data";

type Props = { searchParams: Promise<{ project?: string; error?: string; message?: string }> };

function formatSize(value: number | null) {
  if (!value) return "Unknown size";
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default async function AdminFilesPage({ searchParams }: Props) {
  const params = await searchParams;
  const { files, projects } = await getAdminFiles(params.project);
  return (
    <section>
      <AdminHeader title="File management." text="Upload project assets, control client visibility, create secure download links, and remove outdated files." />
      <AdminNotice error={params.error} message={params.message} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
        <AdminPanel eyebrow="Upload" title="Add a project file">
          <form action={uploadAdminFileAction} encType="multipart/form-data" className="mt-6 grid gap-4"><input type="hidden" name="returnTo" value="/admin/files" /><label className="grid gap-2 text-sm text-white/55">Project<select name="projectId" required className="form-field"><option value="">Select project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><label className="grid gap-2 text-sm text-white/55">File<input name="file" type="file" required className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Folder<input name="folder" defaultValue="Shared" className="form-field" /></label><label className="flex items-center gap-3 text-sm text-white/48"><input name="clientVisible" type="checkbox" defaultChecked /> Visible to client</label><ActionButton type="submit">Upload file</ActionButton></form>
        </AdminPanel>
        <AdminPanel eyebrow="Library" title="Project files">
          <div className="mt-5 flex flex-wrap gap-2"><Link href="/admin/files" className={`rounded-full border px-3 py-2 text-xs ${!params.project ? "border-[#8be9ff]/45 text-[#8be9ff]" : "border-white/10 text-white/35"}`}>All projects</Link>{projects.map((project) => <Link key={project.id} href={`/admin/files?project=${project.id}`} className={`rounded-full border px-3 py-2 text-xs ${params.project === project.id ? "border-[#8be9ff]/45 text-[#8be9ff]" : "border-white/10 text-white/35"}`}>{project.name}</Link>)}</div>
          <div className="mt-6 grid gap-3">{files.length ? files.map((file) => { const project = Array.isArray(file.projects) ? file.projects[0] : file.projects; const uploader = Array.isArray(file.profiles) ? file.profiles[0] : file.profiles; return <article key={file.id} className="grid gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="font-medium text-white">{file.file_name}</p><p className="mt-1 text-sm text-white/34">{project?.name || "Project"} · {file.folder || "Shared"} · {formatSize(file.size_bytes)}</p><p className="mt-2 text-xs text-white/22">Uploaded by {uploader?.full_name || "Staff"} · {formatDate(file.created_at)}</p></div><div className="flex flex-wrap items-center gap-2">{file.downloadUrl ? <a href={file.downloadUrl} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/48 hover:text-white">Download</a> : null}<form action={toggleAdminFileVisibilityAction}><input type="hidden" name="fileId" value={file.id} /><input type="hidden" name="visible" value={String(!file.client_visible)} /><input type="hidden" name="returnTo" value="/admin/files" /><button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/48 hover:text-white" type="submit">{file.client_visible ? "Make internal" : "Share with client"}</button></form><form action={deleteAdminFileAction}><input type="hidden" name="fileId" value={file.id} /><input type="hidden" name="returnTo" value="/admin/files" /><button className="rounded-full border border-[#ff5f6d]/20 px-3 py-2 text-xs text-[#ff9aa3] hover:border-[#ff5f6d]/45" type="submit">Delete</button></form></div></article>; }) : <EmptyState>No files found.</EmptyState>}</div>
        </AdminPanel>
      </div>
    </section>
  );
}
