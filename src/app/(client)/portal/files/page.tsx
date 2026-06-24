import { Download, FileText, UploadCloud } from "lucide-react";
import {
  EmptyState,
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  formatBytes,
  formatDateTime
} from "@/components/portal/PortalUi";
import { uploadProjectFileAction } from "@/features/portal/actions";
import { getPortalFiles } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function PortalFilesPage({ searchParams }: Props) {
  const [data, query] = await Promise.all([getPortalFiles(), searchParams]);
  const writableProjects = data.projects.filter((project) => project.canContribute);

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Files"
        description="Upload content, review shared deliverables, and download files through short-lived private links."
      />
      <FlashMessage error={query.error} message={query.message} />

      {writableProjects.length > 0 ? (
        <PortalPanel className="mt-9">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
              <UploadCloud className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Upload to your project</h2>
              <p className="mt-1 text-sm text-white/34">PDF, image, Word, Excel, ZIP, or text. Maximum 10 MB.</p>
            </div>
          </div>

          <form action={uploadProjectFileAction} className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px_180px_auto] lg:items-end">
            <label className="grid gap-2 text-sm text-white/52">
              File
              <input
                type="file"
                name="file"
                required
                className="form-field file:mr-4 file:rounded-full file:border-0 file:bg-white/[.08] file:px-4 file:py-2 file:text-xs file:text-white/70"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/52">
              Project
              <select name="projectId" className="form-field" required defaultValue={writableProjects[0]?.id}>
                {writableProjects.map((project) => (
                  <option key={project.id} value={project.id} className="bg-[#0b0d13]">
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-white/52">
              Folder
              <input name="folder" className="form-field" defaultValue="Shared" maxLength={80} />
            </label>
            <button
              type="submit"
              className="min-h-12 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-medium text-white"
            >
              Upload file
            </button>
          </form>
        </PortalPanel>
      ) : (
        <PortalPanel className="mt-9">
          <p className="text-sm text-white/38">Your current role can view files but cannot upload new ones.</p>
        </PortalPanel>
      )}

      <div className="mt-5">
        {data.files.length === 0 ? (
          <EmptyState
            title="No shared files yet"
            text="Files uploaded by GridSpell or your organization will appear here."
          />
        ) : (
          <PortalPanel>
            <div className="grid gap-3">
              {data.files.map((file) => {
                const project = data.projects.find((item) => item.id === file.project_id);
                return (
                  <div
                    key={file.id}
                    className="grid gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/70">{file.file_name}</p>
                      <p className="mt-1 text-xs text-white/28">
                        {project?.name ?? "Project file"} · {file.folder ?? "Shared"} · {formatBytes(file.size_bytes)} · {formatDateTime(file.created_at)}
                      </p>
                    </div>
                    {file.downloadUrl ? (
                      <a
                        href={file.downloadUrl}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-xs text-white/58 transition hover:bg-white/[.07] hover:text-white"
                      >
                        Download <Download className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-white/24">Unavailable</span>
                    )}
                  </div>
                );
              })}
            </div>
          </PortalPanel>
        )}
      </div>
    </>
  );
}
