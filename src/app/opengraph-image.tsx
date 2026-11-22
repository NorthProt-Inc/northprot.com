import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jongmin Lee — northprot.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lab-notebook style OG card. No images, no logos, no decoration —
// just paper, ink, and a hairline rule above and below.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAF7F1",
          color: "#1A1A1F",
          display: "flex",
          flexDirection: "column",
          padding: "72px 96px",
          fontFamily: "serif",
        }}
      >
        {/* Top date stamp */}
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5A5A66",
          }}
        >
          2026.05 · MILKY WAY
        </div>
        <div
          style={{
            marginTop: 20,
            height: 1,
            width: "100%",
            backgroundColor: "#D4D2D8",
          }}
        />

        {/* Center block */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#1A1A1F",
            }}
          >
            Jongmin Lee
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 44,
              fontStyle: "italic",
              lineHeight: 1.3,
              color: "#5A5A66",
            }}
          >
            bioinformatics, biology with root access.
          </div>
        </div>

        {/* Bottom hairline + URL stamp */}
        <div
          style={{
            marginBottom: 20,
            height: 1,
            width: "100%",
            backgroundColor: "#D4D2D8",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1A1F2E",
          }}
        >
          northprot
        </div>
      </div>
    ),
    { ...size },
  );
}
