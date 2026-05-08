import { meta } from "@/lib/data"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="max-w-6xl mx-auto px-6 py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {meta.name} — Built with intent.
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {year}
        </p>
      </div>
    </footer>
  )
}
