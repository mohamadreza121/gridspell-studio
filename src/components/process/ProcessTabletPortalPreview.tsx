import {
  CheckCircle2,
  Clock3,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

const phases = [
  ["Discovery", "Complete"],
  ["Strategy", "Complete"],
  ["Design", "Current"],
  ["Build", "Next"],
  ["Launch", "Planned"]
] as const;

const statistics: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
}> = [
  { label: "Progress", value: "64%", icon: CheckCircle2 },
  { label: "Next review", value: "Jul 08", icon: Clock3 },
  { label: "Open actions", value: "2", icon: ShieldCheck }
];

export function ProcessTabletPortalPreview() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] border border-white/[0.14] bg-[#080a0f] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.48)]">
        <div className="overflow-hidden rounded-[1.5rem] border border-black bg-[#07090e]">
          <header className="flex h-14 items-center justify-between border-b border-white/[0.07] bg-[#090b10] px-5">
            <div>
              <p className="text-sm font-semibold text-white/86">Client Portal</p>
              <p className="mt-0.5 text-[0.58rem] text-white/28">
                Northstar Co. · Demo workspace
              </p>
            </div>
            <span className="rounded-full border border-[#69e6ad]/20 bg-[#69e6ad]/10 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#7aefb9]">
              On track
            </span>
          </header>

          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            <section className="rounded-2xl border border-white/[0.075] bg-[#0d1016] p-5 sm:col-span-2">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                    Project overview
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                    Northstar website rebuild
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/38">
                    A clear view of progress, client actions, approvals, files, and the next milestone.
                  </p>
                </div>
                <LayoutDashboard className="h-5 w-5 shrink-0 text-[#8be9ff]" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {statistics.map(({ label, value, icon: StatIcon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-[#090c12] p-4"
                  >
                    <StatIcon className="h-4 w-4 text-[#8be9ff]" />
                    <p className="mt-4 text-[0.56rem] uppercase tracking-[0.16em] text-white/24">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white/76">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.075] bg-[#0d1016] p-5">
              <div className="flex items-center gap-2 text-[#8be9ff]">
                <Clock3 className="h-4 w-4" />
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em]">
                  Delivery path
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {phases.map(([label, status], index) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#090c12] px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-white/[0.09] text-[0.58rem] text-white/46">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-white/58">{label}</span>
                    </div>
                    <span className="text-[0.54rem] uppercase tracking-[0.14em] text-white/26">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4">
              <div className="rounded-2xl border border-white/[0.075] bg-[#0d1016] p-5">
                <div className="flex items-center gap-2 text-[#8be9ff]">
                  <FileText className="h-4 w-4" />
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em]">
                    Latest file
                  </p>
                </div>
                <p className="mt-4 text-sm font-semibold text-white/66">
                  Homepage-direction-v3.pdf
                </p>
                <p className="mt-2 text-xs leading-5 text-white/30">
                  Ready for client review and approval.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.075] bg-[#0d1016] p-5">
                <div className="flex items-center gap-2 text-[#8be9ff]">
                  <MessageSquareText className="h-4 w-4" />
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em]">
                    Latest update
                  </p>
                </div>
                <p className="mt-4 text-sm font-semibold text-white/66">
                  Homepage direction is ready
                </p>
                <p className="mt-2 text-xs leading-5 text-white/30">
                  Version 3 includes the revised service hierarchy and mobile navigation.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
