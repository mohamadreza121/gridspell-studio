import { readFile, writeFile } from "node:fs/promises";

async function replaceInFile(path, replacements) {
  let source = await readFile(path, "utf8");

  for (const [from, to] of replacements) {
    if (!source.includes(from)) {
      throw new Error(`Expected source not found in ${path}: ${from.slice(0, 120)}`);
    }
    source = source.replace(from, to);
  }

  await writeFile(path, source);
}

await replaceInFile("src/app/(marketing)/demo/ecommerce-drop/page.tsx", [
  ['import { PulseCanRealismPortal } from "@/components/landing-pages/PulseCanRealismPortal";\n', ""],
  ['import { PulseFlavorCardCanPortal } from "@/components/landing-pages/PulseFlavorCardCanPortal";\n', ""],
  [
    `  return (\n    <>\n      <EcommerceDropExperience />\n      <PulseCanRealismPortal />\n      <PulseFlavorCardCanPortal />\n    </>\n  );`,
    `  return <EcommerceDropExperience />;`
  ]
]);

await replaceInFile("src/components/landing-pages/EcommerceDropExperience.tsx", [
  [
    'import { PulseCan3D, pulseFlavors, type PulseFlavor, type PulseFlavorKey } from "@/components/landing-pages/PulseCan3D";',
    'import { pulseFlavors, type PulseFlavor, type PulseFlavorKey } from "@/components/landing-pages/PulseFlavorData";'
  ],
  [
    '<PulseCan3D flavor={activeFlavor} className="absolute inset-0" />',
    `<div className="absolute inset-0 grid place-items-center" aria-label={\`Pulse Drip ${activeFlavor.name} product can\`}>\n              <div className="pulse-hero-can relative scale-[1.42] transition-transform duration-500 sm:scale-[1.72] lg:scale-[1.95]">\n                <MiniCan flavor={activeFlavor} />\n              </div>\n            </div>`
  ],
  ['text-white/42">Clean energy system', 'text-white/72">Clean energy system'],
  ['text-white/40">{unit}', 'text-white/72">{unit}'],
  ['text-white/48">{copy}', 'text-white/68">{copy}'],
  ['className="max-w-sm text-sm leading-7 text-black/52"', 'className="max-w-sm text-sm leading-7 text-black/72"'],
  ['index === 1 ? "text-white/42" : "opacity-55"', 'index === 1 ? "text-white/72" : "opacity-75"'],
  ['className="mt-9 flex flex-wrap gap-3 text-[0.53rem] font-black uppercase tracking-[0.17em] text-white/44"', 'className="mt-9 flex flex-wrap gap-3 text-[0.53rem] font-black uppercase tracking-[0.17em] text-white/72"'],
  ['className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2"', 'className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/[0.035] px-3 py-2"'],
  ['text-white/34">Selected flavor', 'text-white/72">Selected flavor'],
  ['text-white/34">Choose your case', 'text-white/72">Choose your case'],
  ['text-white/34">One-time purchase', 'text-white/72">One-time purchase'],
  ['text-white/28">Demo checkout', 'text-white/64">Demo checkout'],
  ['text-white/34">\n            <Link className="hover:text-[var(--pulse-primary)]"', 'text-white/72">\n            <Link className="transition-colors hover:text-[var(--pulse-primary)]"'],
  [
    '.pulse-spin { animation: pulse-spin 22s linear infinite; }',
    `.pulse-spin { animation: pulse-spin 22s linear infinite; }\n\n        .pulse-hero-can {\n          filter: drop-shadow(0 32px 38px rgba(0, 0, 0, 0.36));\n          will-change: transform;\n        }\n\n        main > section:nth-of-type(n + 3) {\n          content-visibility: auto;\n          contain-intrinsic-size: 900px;\n        }\n\n        @media (max-width: 767px) {\n          main { transition: none !important; }\n          .pulse-spin,\n          .pulse-droplet { animation: none !important; }\n          .pulse-hero-can {\n            filter: drop-shadow(0 20px 24px rgba(0, 0, 0, 0.3));\n            will-change: auto;\n          }\n          .backdrop-blur-xl,\n          .backdrop-blur-2xl,\n          .backdrop-blur-sm {\n            -webkit-backdrop-filter: none !important;\n            backdrop-filter: none !important;\n          }\n        }\n\n        @media (prefers-reduced-motion: reduce) {\n          .pulse-spin,\n          .pulse-droplet { animation: none !important; }\n          .pulse-hero-can,\n          main { transition: none !important; }\n        }`
  ]
]);

console.log("Optimized ecommerce drop performance and contrast.");
