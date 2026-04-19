import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07090b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "sans-serif",
          color: "#e6edf3",
        }}
      >
        R<span style={{ color: "#00e5ff" }}>/</span>
      </div>
    ),
    { ...size },
  );
}
