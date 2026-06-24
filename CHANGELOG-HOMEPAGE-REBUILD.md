# Homepage rebuild — scroll scenes

The previous stack, carousel, and mixed sticky experiments were removed from the
homepage. The new homepage is built around one predictable presentation model:

- one shared dark GridSpell background
- one sticky visual stage beneath the navigation
- seven scenes in the same viewport
- reversible fade/movement transitions tied directly to native scroll progress
- no wheel interception and no fullPage.js dependency
- normal sequential sections on smaller screens and for reduced-motion users

## Main implementation

```text
src/components/home/HomeExperience.tsx
src/app/globals.css
src/app/(marketing)/page.tsx
```

## Project previews

The Selected Work scene uses the screenshot paths in `src/config/work.ts`.
DESA Foam Insulation and GridSpell already have preview images. Add a Pure
Timepieces WebP screenshot to `public/images/work/` and connect its path in the
config when ready.

## Validation completed

```text
npm run type-check
npm run lint
npm run build
```

The production build completed successfully with all 48 routes generated.
