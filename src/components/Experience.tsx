"use client"

import { motion } from "framer-motion"
import { experiences } from "@/lib/data"

export default function Experience() {
  return (
    <section
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
        // 002 — Experience
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
        Where I&apos;ve worked
      </motion.h2>

      <div className="flex flex-col gap-0">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 py-10"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: i === experiences.length - 1 ? "1px solid var(--border)" : "none",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            {/* Left: meta */}
            <div className="lg:col-span-1 flex flex-col gap-2 pt-1">
              <span
                className="font-mono text-xs"
                style={{ color: "var(--accent-green)" }}
              >
                {exp.period}
              </span>
              <span
                className="font-sans text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {exp.role}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.company}
              </span>
            </div>

            {/* Right: detail */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <p
                className="font-sans text-sm font-semibold py-3 px-4"
                style={{
                  color: "var(--accent-cyan)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--accent-cyan)",
                  borderRadius: "2px",
                }}
              >
                {exp.highlight}
              </p>
              <ul className="flex flex-col gap-3">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span
                      className="font-mono text-xs mt-1 shrink-0"
                      style={{ color: "var(--accent-green)" }}
                    >
                      →
                    </span>
                    <span
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
