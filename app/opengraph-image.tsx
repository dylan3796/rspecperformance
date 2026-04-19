import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.ogImageAlt;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(0,229,255,0.25) 0%, #07090b 70%)",
          color: "#e6edf3",
          fontFamily: "sans-serif",
          padding: "80px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
          <span style={{ fontWeight: 700, letterSpacing: 2 }}>R</span>
          <span style={{ fontWeight: 700, color: "#00e5ff", letterSpacing: 2 }}>
            /
          </span>
          <span style={{ fontWeight: 700, letterSpacing: 2 }}>SPEC</span>
          <span
            style={{
              marginLeft: 16,
              opacity: 0.7,
              letterSpacing: 6,
              fontSize: 18,
            }}
          >
            PERFORMANCE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Dealer-level precision.</span>
            <span
              style={{
                background: "linear-gradient(90deg,#e6edf3,#00e5ff)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Tuner-level ambition.
            </span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 26,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            Nissan & JDM specialists · ECU tuning, builds, diagnostics.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            opacity: 0.75,
          }}
        >
          <span>rspecperformance.com</span>
          <span>{site.socials.instagramHandle}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
