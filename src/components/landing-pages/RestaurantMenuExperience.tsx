import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChefHat,
  Clock,
  Flame,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Sparkles,
  Star,
  Utensils,
  Wine
} from "lucide-react";

const menuGroups = [
  {
    eyebrow: "To begin",
    title: "Small plates",
    items: [
      ["Charred ricotta toast", "$14", "Whipped ricotta, chili honey, roasted garlic, grilled sourdough"],
      ["Crispy artichokes", "$16", "Lemon aioli, pecorino, parsley, smoked salt"],
      ["Ember meatballs", "$18", "Tomato sugo, whipped parmesan, basil oil"]
    ]
  },
  {
    eyebrow: "From the pasta room",
    title: "Handmade pasta",
    items: [
      ["Wild mushroom tagliatelle", "$26", "Brown butter, cracked pepper, parmesan snow"],
      ["Braised lamb pappardelle", "$29", "Tomato, rosemary, red wine, pecorino"],
      ["Ricotta gnocchi", "$25", "Roasted squash, sage, hazelnut, aged balsamic"]
    ]
  },
  {
    eyebrow: "From the fire",
    title: "Main plates",
    items: [
      ["Wood-fired branzino", "$32", "Fennel, capers, ember potatoes, lemon herb oil"],
      ["Ember short rib", "$36", "Roasted garlic mash, red wine jus, crispy shallots"],
      ["Half roast chicken", "$30", "Charred grapes, rosemary pan sauce, warm bread"]
    ]
  },
  {
    eyebrow: "A sweet finish",
    title: "Dessert",
    items: [
      ["Citrus olive cake", "$12", "Mascarpone cream, toasted pistachio, orange zest"],
      ["Dark chocolate budino", "$13", "Sea salt, espresso cream, hazelnut praline"],
      ["Affogato", "$9", "Vanilla gelato, espresso, orange biscotti"]
    ]
  }
] as const;

const hours = [
  ["Tuesday – Thursday", "5 PM – 10 PM"],
  ["Friday – Saturday", "5 PM – 11 PM"],
  ["Sunday", "4 PM – 9 PM"],
  ["Monday", "Closed"]
] as const;

const reviews = [
  ["A hidden neighborhood dining room with the polish of a destination restaurant.", "Mina R."],
  ["The pasta alone is worth the reservation. The room makes you stay for another glass.", "Toronto Table"],
  ["Warm, confident, and effortless—from the first click to the final course.", "Local guest"]
] as const;

function DecorativeRule({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 text-[#9c6d46]">
      <span className="h-px flex-1 bg-[#4d2417]/18" />
      {label ? (
        <span className="text-[0.58rem] font-black uppercase tracking-[0.34em]">{label}</span>
      ) : (
        <span className="text-lg">✦</span>
      )}
      <span className="h-px flex-1 bg-[#4d2417]/18" />
    </div>
  );
}

function MenuItem({ name, price, detail }: { name: string; price: string; detail: string }) {
  return (
    <article className="border-b border-[#4d2417]/10 py-4 last:border-b-0">
      <div className="grid gap-2 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-4">
        <h4 className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.045em] text-[#32160f]">
          {name}
        </h4>
        <span aria-hidden="true" className="hidden border-b border-dotted border-[#4d2417]/24 sm:block" />
        <p className="font-display text-[1.35rem] font-semibold tracking-[-0.045em] text-[#7a1f1f]">
          {price}
        </p>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7b5844]">{detail}</p>
    </article>
  );
}

function MenuGroup({
  eyebrow,
  title,
  items
}: {
  eyebrow: string;
  title: string;
  items: readonly (readonly [string, string, string])[];
}) {
  return (
    <section className="menu-page-section rounded-[1.5rem] border border-[#4d2417]/10 bg-[#f8edd8]/72 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.65)] sm:p-7">
      <p className="text-[0.58rem] font-black uppercase tracking-[0.3em] text-[#9c6d46]">{eyebrow}</p>
      <h3 className="mt-3 font-display text-4xl font-semibold leading-none tracking-[-0.06em] text-[#32160f]">
        {title}
      </h3>
      <div className="mt-5">
        {items.map(([name, price, detail]) => (
          <MenuItem key={name} name={name} price={price} detail={detail} />
        ))}
      </div>
    </section>
  );
}

function PageNumber({ children }: { children: string }) {
  return (
    <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[#4d2417]/14 bg-[#f5e6ca] px-3 font-mono text-[0.58rem] font-semibold tracking-[0.18em] text-[#8e6041]">
      {children}
    </span>
  );
}

export function RestaurantMenuExperience({ startHref }: { startHref: string }) {
  return (
    <main id="top" className="restaurant-menu-demo min-h-screen overflow-x-clip bg-[#160b08] text-[#32160f]">
      <style>{`
        @keyframes menu-enter {
          from { opacity: 0; transform: translateY(28px) scale(.986); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes ember-glow {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: .82; transform: scale(1.06); }
        }

        .restaurant-menu-shell {
          animation: menu-enter .85s cubic-bezier(.2,.75,.2,1) both;
        }

        .restaurant-menu-paper {
          background-color: #f4e7cf;
          background-image:
            radial-gradient(circle at 18% 10%, rgba(255,255,255,.52), transparent 22rem),
            radial-gradient(circle at 84% 15%, rgba(137,73,35,.07), transparent 28rem),
            repeating-linear-gradient(0deg, rgba(77,36,23,.018) 0 1px, transparent 1px 4px);
        }

        .restaurant-menu-cover::before {
          content: "";
          position: absolute;
          inset: 9px;
          border: 1px solid rgba(231,196,137,.26);
          border-radius: inherit;
          pointer-events: none;
        }

        .restaurant-menu-spine {
          background:
            linear-gradient(90deg, rgba(0,0,0,.24), transparent 35%, rgba(255,255,255,.04) 52%, transparent 72%),
            #35140f;
        }

        .menu-photo img {
          transition: transform .8s cubic-bezier(.2,.75,.2,1), filter .8s ease;
        }

        .menu-photo:hover img {
          transform: scale(1.035);
          filter: saturate(1.08) contrast(1.04);
        }

        .menu-ember {
          animation: ember-glow 4.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .restaurant-menu-shell,
          .menu-ember {
            animation: none !important;
          }

          .menu-photo img {
            transition: none !important;
          }
        }
      `}</style>

      <div aria-hidden="true" className="fixed inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(157,63,28,.34),transparent_28rem),radial-gradient(circle_at_88%_10%,rgba(220,163,82,.18),transparent_30rem),linear-gradient(145deg,#1c0d09,#090403_78%)]" />
      <div aria-hidden="true" className="fixed inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative mx-auto max-w-[100rem] px-2 pb-28 pt-[6.6rem] sm:px-4 sm:pt-[7.4rem] lg:px-8 lg:pb-14 lg:pt-[8rem]">
        <div className="restaurant-menu-shell restaurant-menu-cover relative rounded-[1.85rem] border border-[#e7c489]/24 bg-[#401812] p-[7px] shadow-[0_45px_150px_rgba(0,0,0,.58)] sm:rounded-[2.5rem] sm:p-3 lg:rounded-[3rem] lg:p-5">
          <span aria-hidden="true" className="absolute left-5 top-5 h-12 w-12 border-l border-t border-[#e7c489]/45 sm:left-8 sm:top-8" />
          <span aria-hidden="true" className="absolute right-5 top-5 h-12 w-12 border-r border-t border-[#e7c489]/45 sm:right-8 sm:top-8" />
          <span aria-hidden="true" className="absolute bottom-5 left-5 h-12 w-12 border-b border-l border-[#e7c489]/45 sm:bottom-8 sm:left-8" />
          <span aria-hidden="true" className="absolute bottom-5 right-5 h-12 w-12 border-b border-r border-[#e7c489]/45 sm:bottom-8 sm:right-8" />

          <div className="restaurant-menu-paper relative overflow-hidden rounded-[1.45rem] border border-[#4d2417]/14 shadow-[inset_0_1px_0_rgba(255,255,255,.68)] sm:rounded-[2rem] lg:rounded-[2.35rem]">
            <div className="restaurant-menu-spine absolute inset-y-0 left-0 z-20 w-3 border-r border-[#e7c489]/18 sm:w-5 lg:w-7">
              <div className="absolute inset-y-6 left-1/2 border-l border-dashed border-[#e7c489]/32" />
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-20 h-20 w-20 bg-[linear-gradient(225deg,#fff7e8_0_48%,rgba(102,53,31,.18)_49%,transparent_52%)] sm:h-28 sm:w-28" />

            <div className="relative pl-3 sm:pl-5 lg:pl-7">
              <header className="border-b border-[#4d2417]/12 px-5 py-5 sm:px-8 lg:px-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link href="/landing-pages" className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#8d6042] transition hover:text-[#5e2d1e]">
                    <ArrowLeft className="h-4 w-4" />
                    Gallery
                  </Link>

                  <div className="text-center">
                    <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-[#32160f] sm:text-4xl">Casa Ember</p>
                    <p className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.34em] text-[#9c6d46]">Wood-fired kitchen · Toronto</p>
                  </div>

                  <nav className="flex items-center gap-1 text-[0.58rem] font-black uppercase tracking-[0.16em] text-[#7b5844]">
                    <a href="#menu" className="rounded-full px-3 py-2 transition hover:bg-[#4d2417]/7">Menu</a>
                    <a href="#story" className="hidden rounded-full px-3 py-2 transition hover:bg-[#4d2417]/7 sm:inline-flex">Story</a>
                    <a href="#visit" className="rounded-full px-3 py-2 transition hover:bg-[#4d2417]/7">Visit</a>
                  </nav>
                </div>
              </header>

              <section className="relative grid min-h-[calc(100svh-10rem)] items-center gap-12 border-b border-[#4d2417]/12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:px-12 lg:py-20">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-[#8d6042]">
                    <Utensils className="h-4 w-4 text-[#7a1f1f]" />
                    <span className="text-[0.62rem] font-black uppercase tracking-[0.3em]">Dinner · Wine · Late evenings</span>
                  </div>

                  <DecorativeRule label="Est. 1998" />

                  <h1 className="mt-8 max-w-[8.7ch] font-display text-[clamp(4.5rem,9vw,10rem)] font-semibold leading-[0.72] tracking-[-0.09em] text-[#32160f]">
                    A menu worth arriving hungry for.
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6f4d3b] sm:text-xl sm:leading-9">
                    Handmade pasta, wood-fired plates, cellar pours, and a dining room designed for slow evenings in the city.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link href={startHref} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#7a1f1f] px-6 text-sm font-black text-white shadow-[0_18px_48px_rgba(122,31,31,.24)] transition hover:-translate-y-0.5 hover:bg-[#8d2828]">
                      Reserve a table
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <a href="#menu" className="inline-flex min-h-13 items-center rounded-full border border-[#4d2417]/14 bg-[#fbf1df] px-6 text-sm font-black text-[#32160f] transition hover:-translate-y-0.5 hover:bg-white">
                      Read the menu
                    </a>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.2rem] border border-[#4d2417]/10 bg-[#f8ead4]/72 p-4">
                      <Clock className="h-5 w-5 text-[#7a1f1f]" />
                      <p className="mt-3 font-display text-xl font-semibold tracking-[-0.04em]">Open tonight</p>
                      <p className="mt-1 text-sm text-[#7b5844]">5 PM – 11 PM</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-[#4d2417]/10 bg-[#f8ead4]/72 p-4">
                      <Wine className="h-5 w-5 text-[#7a1f1f]" />
                      <p className="mt-3 font-display text-xl font-semibold tracking-[-0.04em]">Cellar pours</p>
                      <p className="mt-1 text-sm text-[#7b5844]">Seasonal list</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-[#4d2417]/10 bg-[#f8ead4]/72 p-4">
                      <MapPin className="h-5 w-5 text-[#7a1f1f]" />
                      <p className="mt-3 font-display text-xl font-semibold tracking-[-0.04em]">King West</p>
                      <p className="mt-1 text-sm text-[#7b5844]">Toronto, ON</p>
                    </div>
                  </div>
                </div>

                <div className="menu-photo relative min-h-[31rem] overflow-hidden rounded-[1.9rem] border-[8px] border-[#efe0c3] bg-[#2b120d] shadow-[0_34px_90px_rgba(74,31,18,.28)] sm:min-h-[38rem]">
                  <Image width={1600} height={1000} sizes="100vw" unoptimized
                    src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=88"
                    alt="Handmade pasta served at Casa Ember"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,10,6,.82),transparent_56%),linear-gradient(120deg,rgba(84,27,15,.18),transparent_45%)]" />
                  <div className="menu-ember absolute right-8 top-8 h-28 w-28 rounded-full bg-[#f2b35d]/28 blur-[46px]" />

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/18 bg-black/22 px-4 py-2 text-[0.58rem] font-black uppercase tracking-[0.22em] backdrop-blur">Tonight&apos;s feature</span>
                      <Flame className="h-6 w-6 text-[#f0bd65]" />
                    </div>
                    <p className="mt-5 max-w-[9ch] font-display text-5xl font-semibold leading-[0.84] tracking-[-0.07em] sm:text-6xl">Wild mushroom tagliatelle.</p>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/68">Brown butter, cracked pepper, parmesan snow, and a cellar red poured at the table.</p>
                  </div>
                </div>
              </section>

              <section id="menu" className="border-b border-[#4d2417]/12 px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <PageNumber>01</PageNumber>
                      <Sparkles className="h-5 w-5 text-[#c17433]" />
                    </div>
                    <p className="mt-8 text-[0.62rem] font-black uppercase tracking-[0.32em] text-[#9c6d46]">The dinner menu</p>
                    <h2 className="mt-4 max-w-[9ch] font-display text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.76] tracking-[-0.085em] text-[#32160f]">
                      Printed like a keepsake.
                    </h2>
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-[#6f4d3b] sm:text-lg">
                    A restaurant page should feel as considered as the room itself. Every dish reads clearly, prices stay easy to scan, and the menu becomes part of the atmosphere.
                  </p>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-2">
                  {menuGroups.map((group) => (
                    <MenuGroup key={group.title} {...group} />
                  ))}
                </div>
              </section>

              <section id="story" className="grid gap-6 border-b border-[#4d2417]/12 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-20">
                <div className="menu-photo relative min-h-[34rem] overflow-hidden rounded-[1.8rem] bg-[#28110b] shadow-[0_26px_80px_rgba(74,31,18,.2)]">
                  <Image width={1600} height={1000} sizes="100vw" unoptimized
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=86"
                    alt="Warm restaurant dining room"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,9,5,.9),transparent_62%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.3em] text-[#f0bd65]">The room</p>
                    <h2 className="mt-4 max-w-[10ch] font-display text-5xl font-semibold leading-[0.82] tracking-[-0.075em] sm:text-7xl">Made for long conversations.</h2>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/64">Low light, open-kitchen energy, generous pours, and enough time between courses to forget what time it is.</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-[1.6rem] border border-[#4d2417]/10 bg-[#f8edd8]/74 p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <PageNumber>02</PageNumber>
                      <ChefHat className="h-6 w-6 text-[#7a1f1f]" />
                    </div>
                    <p className="mt-8 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#9c6d46]">From the chef</p>
                    <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.85] tracking-[-0.07em] text-[#32160f]">Cooked over flame. Finished with restraint.</h3>
                    <p className="mt-6 text-base leading-8 text-[#6f4d3b]">Casa Ember keeps the menu focused: handmade pasta, fire-led mains, seasonal vegetables, and wines chosen for the food rather than the label.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.6rem] bg-[#7a1f1f] p-6 text-white shadow-[0_24px_65px_rgba(122,31,31,.22)] sm:p-8">
                    <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[22px] border-white/8" />
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.28em] text-[#f0bd65]">Chef&apos;s pairing</p>
                    <p className="mt-5 max-w-[12ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em]">Ember short rib + cellar syrah.</p>
                    <p className="mt-5 max-w-md text-sm leading-7 text-white/66">Roasted garlic mash, red wine jus, crispy shallots, and a pour with enough structure for the fire.</p>
                  </div>
                </div>
              </section>

              <section id="reserve" className="border-b border-[#4d2417]/12 px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                  <div>
                    <PageNumber>03</PageNumber>
                    <p className="mt-8 text-[0.62rem] font-black uppercase tracking-[0.3em] text-[#9c6d46]">Reservation card</p>
                    <h2 className="mt-4 max-w-[9ch] font-display text-[clamp(3.8rem,6vw,7rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-[#32160f]">Your table is almost ready.</h2>
                    <p className="mt-6 max-w-lg text-base leading-8 text-[#6f4d3b]">A clear reservation path, designed like a card tucked inside the menu instead of a generic booking widget.</p>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.8rem] border border-[#4d2417]/12 bg-[#fbf1df] p-4 shadow-[0_28px_85px_rgba(74,31,18,.15)] sm:p-6">
                    <div className="absolute inset-y-0 left-[38%] hidden border-l border-dashed border-[#4d2417]/18 sm:block" />
                    <div className="grid gap-5 sm:grid-cols-[0.62fr_1.38fr]">
                      <div className="rounded-[1.35rem] bg-[#32160f] p-5 text-white">
                        <CalendarDays className="h-6 w-6 text-[#f0bd65]" />
                        <p className="mt-6 text-[0.56rem] font-black uppercase tracking-[0.26em] text-[#f0bd65]">Tonight</p>
                        <p className="mt-3 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">5–11 PM</p>
                        <p className="mt-4 text-sm leading-6 text-white/58">Walk-ins welcome before 6:30 PM.</p>
                      </div>

                      <div className="grid gap-3">
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            ["Guests", "2 people"],
                            ["Date", "Tonight"],
                            ["Time", "7:30 PM"]
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[1.15rem] border border-[#4d2417]/10 bg-[#f4e3c5] p-4">
                              <p className="text-[0.52rem] font-black uppercase tracking-[0.22em] text-[#9c6d46]">{label}</p>
                              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.04em]">{value}</p>
                            </div>
                          ))}
                        </div>
                        <Link href={startHref} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[1.15rem] bg-[#7a1f1f] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#8d2828]">
                          Confirm reservation
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="visit" className="grid gap-6 border-b border-[#4d2417]/12 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-20">
                <div className="rounded-[1.7rem] border border-[#4d2417]/10 bg-[#f8edd8]/72 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <PageNumber>04</PageNumber>
                    <Clock className="h-6 w-6 text-[#7a1f1f]" />
                  </div>
                  <p className="mt-8 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#9c6d46]">Hours</p>
                  <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.84] tracking-[-0.07em]">The back page.</h2>
                  <div className="mt-7">
                    {hours.map(([day, time]) => (
                      <div key={day} className="flex items-center justify-between gap-5 border-b border-[#4d2417]/10 py-4 last:border-b-0">
                        <span className="text-sm font-semibold text-[#5f3927]">{day}</span>
                        <span className="font-display text-xl font-semibold tracking-[-0.04em] text-[#7a1f1f]">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[31rem] overflow-hidden rounded-[1.7rem] border border-[#4d2417]/10 bg-[#ead4ae] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.55)] sm:p-8">
                  <div aria-hidden="true" className="absolute inset-0 opacity-45 bg-[linear-gradient(rgba(77,36,23,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(77,36,23,.08)_1px,transparent_1px)] bg-[size:38px_38px]" />
                  <div aria-hidden="true" className="absolute left-[12%] top-[18%] h-40 w-64 rotate-[-14deg] rounded-full border border-[#4d2417]/14" />
                  <div aria-hidden="true" className="absolute right-[12%] top-[24%] h-56 w-44 rotate-12 rounded-full border border-[#4d2417]/12" />
                  <div aria-hidden="true" className="absolute left-[46%] top-[45%] h-4 w-4 rounded-full bg-[#7a1f1f] shadow-[0_0_0_10px_rgba(122,31,31,.12),0_0_60px_rgba(122,31,31,.35)]" />

                  <div className="relative flex min-h-[27rem] flex-col justify-between">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.58rem] font-black uppercase tracking-[0.28em] text-[#8e6041]">King West · Toronto</p>
                      <Navigation className="h-5 w-5 text-[#7a1f1f]" />
                    </div>
                    <div className="rounded-[1.35rem] border border-[#4d2417]/12 bg-[#fbf1df]/90 p-5 backdrop-blur">
                      <p className="font-display text-3xl font-semibold tracking-[-0.055em]">123 King Street West</p>
                      <p className="mt-2 text-sm leading-6 text-[#7b5844]">Near the theatre district · street parking nearby · five minutes from St. Andrew station</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href="tel:+14165550100" className="inline-flex items-center gap-2 rounded-full border border-[#4d2417]/12 bg-[#f4e3c5] px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-[#5f3927]">
                          <Phone className="h-4 w-4" /> Call
                        </a>
                        <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-[#4d2417]/12 bg-[#f4e3c5] px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-[#5f3927]">
                          <MapPin className="h-4 w-4" /> Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-b border-[#4d2417]/12 px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
                  <div>
                    <PageNumber>05</PageNumber>
                    <p className="mt-8 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#9c6d46]">Guest notes</p>
                    <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.84] tracking-[-0.07em]">Notes left in the margin.</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {reviews.map(([quote, name], index) => (
                      <article key={name} className={`rounded-[1.45rem] border border-[#4d2417]/10 bg-[#fbf1df] p-5 shadow-[0_16px_45px_rgba(74,31,18,.08)] ${index === 1 ? "md:translate-y-5 md:rotate-[.8deg]" : ""}`}>
                        <Quote className="h-5 w-5 text-[#c17433]" />
                        <p className="mt-5 text-sm leading-7 text-[#6f4d3b]">“{quote}”</p>
                        <div className="mt-5 flex gap-1 text-[#c17433]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="mt-5 font-semibold text-[#32160f]">{name}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                <div className="relative overflow-hidden rounded-[1.8rem] bg-[#32160f] p-8 text-center text-white shadow-[0_28px_85px_rgba(50,22,15,.22)] sm:p-12">
                  <div aria-hidden="true" className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border-[34px] border-[#f0bd65]/10" />
                  <p className="relative text-[0.6rem] font-black uppercase tracking-[0.3em] text-[#f0bd65]">The final course</p>
                  <h2 className="relative mx-auto mt-6 max-w-[11ch] font-display text-[clamp(3.8rem,7vw,7.5rem)] font-semibold leading-[0.76] tracking-[-0.085em]">Turn hungry visitors into reservations.</h2>
                  <p className="relative mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62">Use this direction for a restaurant, cafe, bakery, wine bar, private dining room, or local food brand that deserves more than a generic template.</p>
                  <div className="relative mt-9 flex flex-wrap justify-center gap-3">
                    <Link href={startHref} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#f3dfba] px-6 text-sm font-black text-[#32160f] transition hover:-translate-y-0.5 hover:bg-white">
                      Start with this design
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link href="/landing-pages" className="inline-flex min-h-13 items-center rounded-full border border-white/14 bg-white/6 px-6 text-sm font-black text-white/72 transition hover:bg-white/10 hover:text-white">
                      Back to gallery
                    </Link>
                  </div>
                </div>

                <footer className="grid gap-6 px-2 pb-2 pt-10 sm:px-4 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="font-display text-4xl font-semibold tracking-[-0.06em]">Casa Ember</p>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-[#7b5844]">Wood-fired kitchen, handmade pasta, seasonal plates, and a reservation flow that feels like part of the menu.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {["Dinner", "Wine room", "Private dining", "Reservations"].map((item) => (
                      <span key={item} className="rounded-full border border-[#4d2417]/10 bg-[#f4e3c5] px-4 py-2 text-[0.56rem] font-black uppercase tracking-[0.18em] text-[#7b5844]">{item}</span>
                    ))}
                  </div>
                </footer>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-[1.35rem] border border-[#e7c489]/22 bg-[#2d120d]/94 p-2 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur lg:hidden">
        <a href="tel:+14165550100" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/7 text-xs font-black text-white">
          <Phone className="h-4 w-4" /> Call
        </a>
        <a href="#visit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/7 text-xs font-black text-white">
          <MapPin className="h-4 w-4" /> Visit
        </a>
        <Link href={startHref} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f3dfba] text-xs font-black text-[#32160f]">Reserve</Link>
      </div>
    </main>
  );
}
