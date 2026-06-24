# Homepage scroll-story system

The homepage uses one tall scroll track and one sticky viewport beneath the fixed
navigation. All seven scenes share the same background and occupy the same visual
stage.

## Scene order

1. Introduction
2. Selected work
3. Capabilities
4. Process
5. Client experience
6. Investment
7. Start a project

## How it works

- `src/components/home/HomeExperience.tsx` owns the complete experience.
- The desktop track is `700svh` tall, creating roughly one viewport of scroll per
  scene transition.
- The visual stage remains sticky below the 80px navbar.
- Each scene is absolutely positioned in the same stage.
- Global scroll progress controls opacity, movement, scale, perspective, and blur.
- Adjacent scenes overlap during transitions, producing a true crossfade rather
  than an empty gap.
- Scrolling upward reverses every transition naturally.
- The right-side scene rail can jump smoothly to any scene.
- The background is rendered once and moves subtly throughout the whole story.

## Responsive behavior

The presentation system is enabled when all of these are true:

```text
Viewport width: at least 1024px
Viewport height: at least 720px
Reduced motion: not requested
```

Smaller screens and reduced-motion users receive a regular sequential homepage.
This prevents sticky clipping, hidden content, and scroll hijacking on devices
where a full-screen presentation is not appropriate.

## Adjusting transition intensity

In `HomeExperience.tsx`, edit `SCENE_VARIANTS`.

Each scene defines:

- `enter`: where the scene begins
- `active`: its settled state
- `exit`: where it moves while fading away

Keep movement controlled. Large rotations and extreme blur make text difficult to
read and can cause GPU stutter.

## Adjusting transition timing

The `sceneTimeline()` helper uses:

```ts
const fade = step * 0.62;
const hold = step * 0.12;
```

- Increase `fade` for longer crossfades.
- Increase `hold` for more time with one scene fully visible.
- Keep `fade` greater than half of `step` so adjacent scenes overlap.

## Project previews

Project screenshots are configured in:

```text
src/config/work.ts
```

Images belong in:

```text
public/images/work/
```

Use a homepage screenshot around 1440px wide, export it as WebP, and set
`previewImage` on the project entry. The Selected Work scene automatically places
it inside the browser frame.
