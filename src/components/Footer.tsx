"use client"

import { useEffect, useState } from "react"
import { meta } from "@/lib/data"

function LagosClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Africa/Lagos",
        }).format(new Date())
      )
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
      {time || "--:--:--"} <span style={{ color: "var(--text-muted)" }}>WAT (UTC+1)</span>
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const columns = [
    {
      title: "Explore",
      links: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Writing", href: "#writing" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: meta.github },
        { label: "LinkedIn", href: meta.linkedin },
        { label: "Twitter/X", href: meta.twitter },
        { label: "Email", href: `mailto:${meta.email}` },
      ],
    },
  ]

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Identity */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span
              className="font-mono text-lg font-bold tracking-widest"
              style={{ color: "var(--accent-green)" }}
            >
              {meta.initials}
            </span>
            <p className="font-sans text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
              {meta.tagline} {meta.subtagline}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent-green)", boxShadow: "0 0 5px var(--accent-green)" }}
              />
              <LagosClock />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-sans text-sm w-fit transition-colors duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--accent-green)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} {meta.name} — Built with intent. Next.js · TypeScript · Tailwind
          </p>
          <div className="flex items-center gap-5">
            <p className="font-mono text-xs hidden md:block" style={{ color: "var(--text-muted)" }}>
              press <span style={{ color: "var(--accent-green)" }}>⌘K</span> to navigate
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-xs transition-colors duration-150"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent-green)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
