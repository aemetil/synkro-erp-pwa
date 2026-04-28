import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Synkro — Gestion d'entreprise pour PME haïtiennes"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800, color: "white", letterSpacing: "-3px", lineHeight: 1 }}>
          Synkro
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Gestion d'entreprise pour PME haïtiennes
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: 40,
          }}
        >
          {["Finance", "Ventes", "Stock", "Santé"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: 20,
                color: "white",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
