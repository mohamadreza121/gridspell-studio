export default function WorkLoading() {
  return (
    <main className="min-h-svh bg-[#07080c] pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl" aria-live="polite" aria-busy="true">
          <div className="h-3 w-28 animate-pulse rounded-full bg-[#8be9ff]/30" />
          <div className="mt-7 h-16 w-[82%] animate-pulse rounded-2xl bg-white/[0.07] sm:h-24" />
          <div className="mt-4 h-16 w-[58%] animate-pulse rounded-2xl bg-white/[0.045] sm:h-20" />
          <p className="mt-7 text-sm font-semibold text-white/42">Opening case study…</p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">
          <div className="aspect-[4/3] animate-pulse rounded-[1.3rem] bg-white/[0.055]" />
        </div>
      </div>
    </main>
  );
}
