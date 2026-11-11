# Dota world background

After merging PR #83 and pulling the code, put the owner-supplied video here:

`public/videos/VideoDota2.mov`

Keep the filename and capitalization exactly as shown, then commit and push the
video. The browser URL is `/videos/VideoDota2.mov`; do not include `public` in it.
The video itself is intentionally absent from this change.

The `01 / THE WORLD` section plays it muted, inline and on a loop while visible.
Reduced-motion visitors get the static background. A pause/play button appears
when the video can play. Missing files, playback errors or blocked autoplay leave
the section readable over its charcoal fallback.

The video has subdued saturation, brightness and opacity, a warm tint, a dark
text scrim, and top/bottom fades into the neighboring sections. These live in
`DotaCinematicExperience.module.css` under `.worldVideo` and `.worldMedia::after`.

Verify playback with the actual file after adding it. If a browser cannot decode
the MOV, export a web-compatible H.264 MP4 and update the source path to match;
renaming the extension alone does not convert the video.
