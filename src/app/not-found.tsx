import { ArrowLeft } from "lucide-react";
import { ActionLink } from "@/components/ui/ActionControl";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07080c] p-6 text-center">
      <div className="page-grid absolute inset-0 -z-20 opacity-40" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/12 blur-[140px]" />
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[#8be9ff]">404</p>
        <h1 className="mt-6 max-w-[12ch] font-display text-6xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-8xl">
          That page escaped the grid.
        </h1>
        <ActionLink href="/" className="mt-9">
          <ArrowLeft className="h-4 w-4" />
          Return home
        </ActionLink>
      </div>
    </main>
  );
}
