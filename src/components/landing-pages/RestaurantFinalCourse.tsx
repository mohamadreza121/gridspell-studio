import Link from "next/link";
import { ArrowUpRight, CalendarDays, Flame, Users } from "lucide-react";

export function RestaurantFinalCourse({ startHref }: { startHref: string }) {
  return (
    <div className="relative overflow-hidden rounded-[1.95rem] border border-[#e8bd79]/18 bg-[#25100b] text-white shadow-[0_34px_100px_rgba(50,22,15,.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(231,159,73,.2),transparent_22rem),linear-gradient(120deg,rgba(19,7,4,.98)_0_47%,rgba(19,7,4,.62)_62%,rgba(19,7,4,.18)_100%)]" />
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=88"
        alt="Candlelit dinner table at Casa Ember"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-54 sm:w-[62%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#25100b_0_42%,rgba(37,16,11,.84)_58%,rgba(37,16,11,.2)_100%)]" />

      <div aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[34px] border-[#f0bd65]/8" />
      <div aria-hidden="true" className="absolute bottom-[-5rem] right-[18%] h-52 w-52 rounded-full bg-[#c66b31]/18 blur-[80px]" />

      <div className="relative grid min-h-[38rem] gap-10 p-7 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:p-14">
        <div className="max-w-3xl self-center">
          <div className="flex items-center gap-3 text-[#f0bd65]">
            <Flame className="h-5 w-5" />
            <p className="text-[0.6rem] font-black uppercase tracking-[0.32em]">The final course</p>
          </div>

          <h2 className="mt-7 max-w-[9.5ch] font-display text-[clamp(4rem,7vw,8.2rem)] font-semibold leading-[0.75] tracking-[-0.09em]">
            Make the reservation feel like the first course.
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/64 sm:text-lg">
            The strongest restaurant pages do more than show a menu. They build anticipation, make the next step effortless, and carry the mood of the dining room all the way to the booking.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={startHref}
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#f3dfba] px-7 text-sm font-black text-[#32160f] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/landing-pages"
              className="inline-flex min-h-14 items-center rounded-full border border-white/14 bg-white/7 px-7 text-sm font-black text-white/72 transition hover:bg-white/12 hover:text-white"
            >
              Back to gallery
            </Link>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="mx-auto max-w-md rotate-[1.2deg] rounded-[1.7rem] border border-[#f3dfba]/20 bg-[#f5e6ca] p-3 text-[#32160f] shadow-[0_30px_90px_rgba(0,0,0,.42)]">
            <div className="rounded-[1.35rem] border border-dashed border-[#6b321f]/22 bg-[#fbf1df] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-5 border-b border-[#4d2417]/12 pb-5">
                <div>
                  <p className="text-[0.54rem] font-black uppercase tracking-[0.24em] text-[#9c6d46]">Casa Ember</p>
                  <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em]">Dinner reservation</p>
                </div>
                <span className="rounded-full bg-[#7a1f1f] px-3 py-1.5 text-[0.52rem] font-black uppercase tracking-[0.18em] text-white">Ready</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[#f0dcc0] p-4">
                  <CalendarDays className="h-4 w-4 text-[#7a1f1f]" />
                  <p className="mt-3 text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#9c6d46]">Date</p>
                  <p className="mt-1 font-display text-xl font-semibold">Tonight</p>
                </div>
                <div className="rounded-xl bg-[#f0dcc0] p-4">
                  <Users className="h-4 w-4 text-[#7a1f1f]" />
                  <p className="mt-3 text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#9c6d46]">Guests</p>
                  <p className="mt-1 font-display text-xl font-semibold">2 people</p>
                </div>
                <div className="rounded-xl bg-[#f0dcc0] p-4">
                  <Flame className="h-4 w-4 text-[#7a1f1f]" />
                  <p className="mt-3 text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#9c6d46]">Time</p>
                  <p className="mt-1 font-display text-xl font-semibold">7:30 PM</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-dashed border-[#4d2417]/18 pt-5">
                <p className="max-w-[22rem] text-xs leading-6 text-[#7b5844]">A warm table, handmade pasta, and one less decision between arrival and dinner.</p>
                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#9c6d46]">CE-0730</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
