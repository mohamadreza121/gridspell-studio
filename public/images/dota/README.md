# Dota 2 demo artwork

The five 1440 × 1440 transparent hero renders were supplied by the project owner:

| Site asset       | Uploaded source     |
| ---------------- | ------------------- |
| axe.webp         | axe (1).png         |
| drow_ranger.webp | drow_ranger.png     |
| terrorblade.webp | terrorblade (1).png |
| juggernaut.webp  | juggernaut.png      |
| enigma.webp      | enigma (1).png      |

The source dimensions and transparency are preserved. Images are encoded as
WebP at quality 95 with exact transparent RGB preservation. No gradient is baked
into the artwork: SVG radial gradients sit behind the character cutouts inside
each letter, and matching CSS gradients sit behind the hero showcase. Individual
letter framing keeps the hero faces readable within the different letter shapes.

Enigma replaces Invoker in the fifth letter and throughout the hero showcase.
Dota 2 and hero artwork are by Valve Corporation; the demo includes Valve
attribution and identifies itself as an independent fan concept.

Letter silhouettes are original SVG paths in DotaCinematicExperience.tsx.
The extrusion uses CSS 3D layers; it does not require WebGL or a remote font.
