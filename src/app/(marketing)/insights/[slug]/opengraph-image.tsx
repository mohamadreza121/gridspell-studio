import { ImageResponse } from "next/og";
import { getInsightBySlug } from "@/config/insights";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  const title = article?.title ?? "GridSpell Insights";
  const category = article?.category ?? "Web strategy and development";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "62px 68px",
        background:
          "radial-gradient(circle at 82% 20%, rgba(41,214,255,.22), transparent 30%), radial-gradient(circle at 18% 80%, rgba(124,92,255,.30), transparent 34%), #07080c",
        color: "#f6f7fb",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800 }}>
          Grid<span style={{ color: "#9d87ff" }}>Spell</span>
        </div>
        <div
          style={{
            color: "#8be9ff",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase"
          }}
        >
          Insights
        </div>
      </div>

      <div style={{ maxWidth: 1030 }}>
        <div
          style={{
            color: "#8be9ff",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: ".17em",
            textTransform: "uppercase"
          }}
        >
          {category}
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: title.length > 58 ? 62 : 76,
            lineHeight: 0.95,
            letterSpacing: "-.055em",
            fontWeight: 800
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ color: "#a8adbd", fontSize: 21 }}>
        Practical thinking for better digital decisions.
      </div>
    </div>,
    size
  );
}
