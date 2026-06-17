import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const title = searchParams.get("title") ?? "Writing — Olayinka Ojo"
  const tagsParam = searchParams.get("tags") ?? ""
  const tags = tagsParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4)

  const fontSize = title.length > 70 ? 48 : title.length > 50 ? 56 : 64

  const fontData = await fetch(`${origin}/fonts/inter-900.woff`).then((r) =>
    r.arrayBuffer()
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          padding: "56px 80px 56px 84px",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "100%",
            background: "#00e87a",
          }}
        />

        {/* Top row: name */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#444444",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Olayinka Ojo
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#222222",
              letterSpacing: "0.08em",
            }}
          >
            // Writing
          </span>
        </div>

        {/* Centre: title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: 900,
              color: "#e8e8e8",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom row: tags + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: "28px",
            borderTop: "1px solid #1e1e1e",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "13px",
                  color: "#00e87a",
                  border: "1px solid #1e1e1e",
                  padding: "4px 10px",
                  letterSpacing: "0.05em",
                  borderRadius: "2px",
                }}
              >
                [{tag}]
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: "14px",
              color: "#444444",
              letterSpacing: "0.06em",
            }}
          >
            olayinka.name.ng
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, style: "normal", weight: 900 }],
    }
  )
}
