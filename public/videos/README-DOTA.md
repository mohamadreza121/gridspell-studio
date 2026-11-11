# Dota world background

The owner-supplied world video is hosted on Streamable:

- Watch page: https://streamable.com/6jy2g2
- Public MP4 endpoint: https://api-f.streamable.com/api/v1/videos/6jy2g2/mp4

`DotaCinematicExperience.tsx` uses the public MP4 endpoint in a native video
element, preserving the section's full-bleed crop, color treatment and controls.
The endpoint redirects to Streamable's current signed CDN URL. Do not paste a
temporary CDN URL with `Expires` and `Signature` parameters into the source.
The watch page itself is HTML and cannot be used as a video source.

The `01 / THE WORLD` section plays it muted, inline and on a loop while visible.
Playback pauses offscreen or in a hidden tab. Reduced-motion visitors get the
static background. A pause/play button appears when the video can play. Playback
errors or blocked autoplay leave the section readable over its charcoal fallback.

The video has subdued saturation, brightness and opacity, a warm tint, a dark
text scrim, and top/bottom fades into the neighboring sections. These live in
`DotaCinematicExperience.module.css` under `.worldVideo` and `.worldMedia::after`.

At integration on November 11, 2026, Streamable's page metadata marked this
upload as expiring on November 13, 2026 at 05:15:58 UTC. Ensure the upload is
retained or replace the endpoint with a permanently hosted public video URL.

Do not commit `public/videos/VideoDota2.mov`: the 119 MB original exceeds GitHub's
per-file limit. It is ignored by Git. If it was already committed locally before
a rejected push, remove it from that unpushed commit before synchronizing with
the remote branch; adding an ignore rule does not remove committed history.
