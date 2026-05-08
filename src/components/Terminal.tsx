"use client"

import { useEffect, useRef, useState } from "react"

type ScriptLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string }

type RenderedLine = {
  type: "cmd" | "out"
  text: string
}

const SCRIPT: ScriptLine[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "olayinka ojo — security engineer" },
  { type: "cmd", text: "cat stack.txt" },
  { type: "out", text: "javascript · python · go · ruby" },
  { type: "out", text: "burp-suite · splunk · nmap · wireshark" },
  { type: "cmd", text: "ls ./projects/" },
  { type: "out", text: "visual-threat-hub/  rbac-engine/" },
  { type: "out", text: "auth-module/        cicd-pipeline/" },
  { type: "cmd", text: "cat status.txt" },
  { type: "out", text: "available for serious work." },
]

export default function Terminal() {
  const [lines, setLines] = useState<RenderedLine[]>([])
  const [done, setDone] = useState(false)
  const scriptIdx = useRef(0)
  const charIdx = useRef(0)
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const tick = () => {
    const idx = scriptIdx.current

    if (idx >= SCRIPT.length) {
      setDone(true)
      return
    }

    const entry = SCRIPT[idx]

    if (entry.type === "out") {
      timeout.current = setTimeout(() => {
        setLines((prev) => [...prev, { type: "out", text: entry.text }])
        scriptIdx.current++
        charIdx.current = 0
        tick()
      }, 180)
      return
    }

    // cmd — typewriter
    const ci = charIdx.current

    if (ci === 0) {
      setLines((prev) => [...prev, { type: "cmd", text: "" }])
    }

    if (ci < entry.text.length) {
      const delay = 45 + Math.random() * 65
      timeout.current = setTimeout(() => {
        const next = ci + 1
        setLines((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { type: "cmd", text: entry.text.slice(0, next) }
          return updated
        })
        charIdx.current = next
        tick()
      }, delay)
    } else {
      timeout.current = setTimeout(() => {
        scriptIdx.current++
        charIdx.current = 0
        tick()
      }, 380)
    }
  }

  useEffect(() => {
    const start = setTimeout(() => tick(), 900)
    return () => {
      clearTimeout(start)
      if (timeout.current) clearTimeout(timeout.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="relative font-mono text-sm leading-7 p-6 w-full scanline"
      style={{
        background: "#0a0a0a",
        border: "1px solid var(--border)",
        borderRadius: "2px",
      }}
    >
      {/* Top label */}
      <div
        className="absolute top-0 right-0 px-3 py-1 font-mono text-xs"
        style={{
          color: "var(--text-muted)",
          borderBottom: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        terminal
      </div>

      <div className="mt-4 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {line.type === "cmd" ? (
              <span>
                <span style={{ color: "var(--accent-green)" }}>$ </span>
                <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
                {i === lines.length - 1 && !done && (
                  <span
                    className="inline-block w-[7px] h-[14px] ml-px animate-blink align-middle"
                    style={{ background: "var(--accent-green)", verticalAlign: "text-bottom" }}
                  />
                )}
              </span>
            ) : (
              <span style={{ color: "var(--text-secondary)", paddingLeft: "0" }}>
                {line.text}
              </span>
            )}
          </div>
        ))}

        {done && (
          <div>
            <span style={{ color: "var(--accent-green)" }}>$ </span>
            <span
              className="inline-block w-[7px] h-[14px] ml-px animate-blink align-middle"
              style={{ background: "var(--accent-green)", verticalAlign: "text-bottom" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
