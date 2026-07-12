import { readFile, writeFile } from "node:fs/promises";

const replacements = [
  {
    path: "src/components/home/HomeProofSections.tsx",
    changes: [
      [
        'className="ml-auto rounded-full border border-white/[0.08] px-3 py-1 text-[0.52rem] uppercase tracking-[0.16em] text-white/24"',
        'className="ml-auto rounded-full border border-white/[0.18] bg-white/[0.055] px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-white/72"'
      ]
    ]
  },
  {
    path: "src/components/layout/Footer.tsx",
    changes: [
      ['<span className="block text-white/28">', '<span className="block text-white/62">'],
      ['<p className="text-xs uppercase tracking-[0.34em] text-white/24">Explore</p>', '<p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/68">Explore</p>'],
      ['<p className="text-xs uppercase tracking-[0.34em] text-white/24">Contact</p>', '<p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/68">Contact</p>'],
      ['className="text-sm text-white/48 transition-colors hover:text-white"', 'className="text-sm text-white/68 transition-colors hover:text-white"'],
      ['<div className="mt-6 grid gap-3 text-sm text-white/48">', '<div className="mt-6 grid gap-3 text-sm text-white/68">'],
      ['className="mt-16 flex flex-col gap-3 border-t border-white/[0.08] pt-8 text-xs text-white/28 sm:flex-row sm:justify-between"', 'className="mt-16 flex flex-col gap-3 border-t border-white/[0.08] pt-8 text-xs text-white/62 sm:flex-row sm:justify-between"']
    ]
  },
  {
    path: "src/components/home/HomeExperience.tsx",
    changes: [
      ['<h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.04em] text-white">\n            A premium first impression built to convert.\n          </h3>', '<h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.04em] text-white">\n            A premium first impression built to convert.\n          </h2>']
    ]
  },
  {
    path: "src/app/(marketing)/page.tsx",
    changes: [
      ['    <>\n      <HomeBackgroundBoundary />\n      <HomeExperience />\n      <HomeHeroModeShowcase />\n      <HomeDeferredSections />\n    </>', '    <main id="main-content">\n      <HomeBackgroundBoundary />\n      <HomeExperience />\n      <HomeHeroModeShowcase />\n      <HomeDeferredSections />\n    </main>']
    ]
  }
];

for (const { path, changes } of replacements) {
  let source = await readFile(path, "utf8");
  for (const [from, to] of changes) {
    if (!source.includes(from)) {
      throw new Error(`Expected source not found in ${path}: ${from.slice(0, 100)}`);
    }
    source = source.replace(from, to);
  }
  await writeFile(path, source);
}

console.log("Applied homepage accessibility fixes.");
