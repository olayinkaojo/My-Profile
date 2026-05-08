"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { meta } from "@/lib/data"

const socials = [
  { label: "GitHub", href: meta.github },
  { label: "LinkedIn", href: meta.linkedin },
  { label: "Twitter/X", href: meta.twitter },
  { label: "Email", href: `mailto:${meta.email}` },
]

const availabilityDetails = [
  { label: "Status", value: "Open to opportunities" },
  { label: "Type", value: "Full-time & Contract" },
  { label: "Location", value: "Remote (any timezone)" },
  { label: "Notice", value: "Available immediately" },
]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        // 008 — Contact
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: header + availability + socials */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="flex flex-col gap-4">
            <h2
              className="font-sans font-black tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s talk.
            </h2>
            <p
              className="font-sans text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Available for security consulting, contract engineering,
              and interesting problems. I work across time zones.
            </p>
          </div>

          {/* Availability grid */}
          <div
            className="grid grid-cols-2 gap-px"
            style={{ border: "1px solid var(--border)" }}
          >
            {availabilityDetails.map((item, i) => (
              <div
                key={item.label}
                className="px-5 py-4 flex flex-col gap-1"
                style={{
                  background: "var(--bg-surface)",
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </span>
                <span
                  className="font-sans text-sm font-semibold"
                  style={{ color: item.label === "Status" ? "var(--accent-green)" : "var(--text-primary)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Socials + CV */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs transition-colors duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--accent-green)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href={meta.cv}
              download
              className="font-mono text-xs w-fit transition-colors duration-150 flex items-center gap-2"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              Download CV (PDF) →
            </a>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {submitted ? (
            <div
              className="h-full flex flex-col justify-center items-start gap-4 p-8"
              style={{
                border: "1px solid var(--border)",
                borderLeft: "2px solid var(--accent-green)",
                background: "var(--bg-surface)",
                borderRadius: "2px",
              }}
            >
              <p className="font-mono text-sm" style={{ color: "var(--accent-green)" }}>
                Message received.
              </p>
              <p className="font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
                I&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {(["name", "email"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label
                    htmlFor={field}
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {field}
                  </label>
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-4 py-3 font-sans text-sm outline-none transition-all duration-150"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      color: "var(--text-primary)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent-cyan)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 font-sans text-sm outline-none resize-none transition-all duration-150"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent-cyan)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                />
              </div>

              <button
                type="submit"
                className="self-start font-sans text-sm px-8 py-3 transition-all duration-200"
                style={{
                  border: "1px solid var(--accent-green)",
                  color: "var(--accent-green)",
                  background: "transparent",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--terminal-glow)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                }}
              >
                Send message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
