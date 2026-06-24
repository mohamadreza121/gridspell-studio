# Homepage single-scene fix

The earlier rebuild contained both a pinned desktop presentation and a normal static fallback.
The desktop presentation was enabled only when all of these conditions matched:

- viewport width at least 1024px
- viewport height at least 720px
- operating-system reduced-motion preference set to `no-preference`

On the affected Windows/browser setup, that media query did not match, so the static fallback was shown. The screenshot therefore displayed ordinary document scrolling even though the scene component existed.

## Corrected behavior

- The pinned single-scene presentation is now used at every viewport width of 900px or greater.
- It is no longer disabled by viewport height.
- It is no longer replaced by the static layout because of the operating-system motion preference.
- The track uses dynamic viewport units (`dvh`) so the pinned stage matches the real browser viewport.
- Mobile widths below 900px retain the ordinary sequential layout.

Desktop scene order:

1. Hero
2. Selected work
3. Capabilities
4. Process
5. Client experience
6. Investment
7. Final call to action

The scene background stays pinned while each content layer crossfades and transforms in the same viewport.
