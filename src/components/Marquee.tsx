"use client"

const ITEMS = [
  "security engineering",
  "threat detection",
  "go",
  "python",
  "javascript",
  "devsecops",
  "siem",
  "penetration testing",
  "ci/cd",
  "15+ years",
  "systems that hold",
]

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className="font-mono text-sm uppercase tracking-[0.2em] px-8 whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </span>
          <span aria-hidden style={{ color: "var(--accent-green)" }}>
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      aria-hidden
      className="overflow-hidden py-5 select-none"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-surface)",
      }}
    >
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  )
}
