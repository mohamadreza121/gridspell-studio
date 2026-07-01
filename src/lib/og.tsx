import { ImageResponse } from "next/og";

export const ogSize = {
  width: 1200,
  height: 630
};

export const ogContentType = "image/png";

type CreateOgImageOptions = {
  eyebrow?: string;
  title: string;
  description?: string;
  footer?: string;
};

export function createOgImage({
  eyebrow = "GridSpell Studio",
  title,
  description = "Premium websites • dashboards • digital systems",
  footer = "Toronto • Web design • Development"
}: CreateOgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#05070d",
          color: "white",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.22
          }}
        />

        {/* Purple glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "540px",
            height: "540px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(124,92,255,0.28) 0%, rgba(124,92,255,0.12) 42%, rgba(124,92,255,0.00) 72%)"
          }}
        />

        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "120px",
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(41,214,255,0.16) 0%, rgba(41,214,255,0.08) 36%, rgba(41,214,255,0.00) 72%)"
          }}
        />

        {/* Big G background */}
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "-10px",
            width: "700px",
            height: "700px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "560px",
            lineHeight: 0.82,
            fontWeight: 700,
            letterSpacing: "-0.08em",
            background:
              "linear-gradient(135deg, rgba(168,149,255,0.20) 0%, rgba(124,92,255,0.16) 35%, rgba(78,142,255,0.16) 72%, rgba(41,214,255,0.18) 100%)",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text"
          }}
        >
          G
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "72px 86px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              maxWidth: "680px"
            }}
          >
            {/* Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "-0.04em"
              }}
            >
              <span style={{ color: "#ffffff" }}>Grid</span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #A895FF 0%, #7C5CFF 34%, #4E8EFF 72%, #29D6FF 100%)",
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text"
                }}
              >
                Spell
              </span>
            </div>

            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                color: "#8BE9FF",
                opacity: 0.95
              }}
            >
              {eyebrow}
            </div>

            {/* Headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "72px",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.065em",
                color: "#f4f7ff",
                maxWidth: "760px"
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.72)",
                maxWidth: "760px"
              }}
            >
              {description}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "rgba(255,255,255,0.54)",
              letterSpacing: "-0.02em"
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}