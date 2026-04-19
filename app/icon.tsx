import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "sans-serif",
          color: "#e6edf3",
          borderRadius: 12,
        }}
      >
        R<span style={{ color: "#00e5ff" }}>/</span>
      </div>
    ),
    { ...size },
  );
}
