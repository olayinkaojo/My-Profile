"use client"

import { motion } from "framer-motion"
import { ctfEntries, certifications } from "@/lib/data"

export default function Security() {
  return (
    <section
      id="security"
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
        // 005 — Security
      </motion.p>

      <motion.h2
        className="font-sans font-black tracking-tight mb-16"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          color: "var(--text-primary)",
          letterSpacing: "-0.025em",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Credentials & track record
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* CTF / Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <h3
            className="font-mono text-xs tracking-widest uppercase mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            CTF / Platforms
          </h3>

          <div className="flex flex-col">
            {ctfEntries.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-6"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex flex-col items-center gap-2 mt-1">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "var(--accent-green)" }}
                  />
                  {i < ctfEntries.length - 1 && (
                    <div
                      className="w-px flex-1"
                      style={{
                        background: "var(--border)",
                        minHeight: "20px",
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 pb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {entry.year}
                  </span>
                  <span
                    className="font-sans text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {entry.platform}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {entry.achievement}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pen testing tools callout */}
          <div
            className="mt-8 p-5 font-mono text-xs"
            style={{
              border: "1px solid var(--border)",
              borderLeft: "2px solid var(--accent-red)",
              background: "var(--bg-surface)",
              borderRadius: "2px",
            }}
          >
            <p className="mb-2" style={{ color: "var(--accent-red)" }}>
              [TOOLS]
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              Burp Suite · Metasploit · Nmap · Wireshark ·{" "}
              Hydra · John the Ripper · Kali Linux · Nessus
            </p>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h3
            className="font-mono text-xs tracking-widest uppercase mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Certifications
          </h3>

          <div className="flex flex-col">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="font-sans text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cert.name}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {cert.issuer}
                  </span>
                </div>
                <span
                  className="font-mono text-xs shrink-0 mt-1"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
