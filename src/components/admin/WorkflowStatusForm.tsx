import type { ReactNode } from "react";

const statuses = [
  "not_started",
  "in_progress",
  "blocked",
  "in_review",
  "approved",
  "completed"
] as const;

export function WorkflowStatusForm({
  action,
  projectId,
  itemId,
  fieldName,
  status,
  children
}: {
  action: (formData: FormData) => void | Promise<void>;
  projectId: string;
  itemId: string;
  fieldName: "phaseId" | "milestoneId" | "taskId";
  status: string;
  children?: ReactNode;
}) {
  return (
    <form action={action} className="mt-4 flex gap-2 border-t border-white/[.07] pt-4">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name={fieldName} value={itemId} />
      <select name="status" defaultValue={status} className="form-field min-h-10 flex-1 py-2 text-xs">
        {statuses.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <button type="submit" className="rounded-full border border-white/10 px-4 text-xs text-white/52 transition hover:text-white">
        {children ?? "Save"}
      </button>
    </form>
  );
}
