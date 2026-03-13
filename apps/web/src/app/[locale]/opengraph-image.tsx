import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/get-site-config";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const siteConfig = await getSiteConfig();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {siteConfig.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#a1a1aa",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {siteConfig.description}
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
