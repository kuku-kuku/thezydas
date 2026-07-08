import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TheZydas — rain.gg Leaderboard, code THEZYDAS";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050505 0%, #070d0e 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 50%, rgba(45,224,224,0.18), transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 10,
            color: "#2de0e0",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          RAIN.GG AFFILIATE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 2,
          }}
        >
          THE<span style={{ color: "#2de0e0" }}>ZYDAS</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a3c1c3",
            marginTop: 28,
            fontFamily: "monospace",
          }}
        >
          WAGER · CLIMB · WIN — CODE THEZYDAS
        </div>
      </div>
    ),
    { ...size }
  );
}
