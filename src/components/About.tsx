"use client"

import { motion } from "framer-motion"
import { meta, stats } from "@/lib/data"

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
    >
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        // 001 — About
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Bio — 3/5 */}
        <motion.div
          className="lg:col-span-3 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <h2
            className="font-sans font-black tracking-tight"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
            }}
          >
            Building at the edge of<br />
            <span style={{ color: "var(--accent-green)" }}>engineering</span> and{" "}
            <span style={{ color: "var(--accent-cyan)" }}>adversarial thinking</span>.
          </h2>

          <p
            className="font-sans text-base leading-relaxed"
            style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}
          >
            {meta.bio}
          </p>

          <div
            className="font-mono text-xs py-4 px-5 flex flex-col gap-1"
            style={{
              border: "1px solid var(--border)",
              borderLeft: "2px solid var(--accent-green)",
              background: "var(--bg-surface)",
              borderRadius: "2px",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>B.Sc. Information Technology</span>
            <span style={{ color: "var(--text-secondary)" }}>National Open University of Nigeria</span>
          </div>
        </motion.div>

        {/* Stats — 2/5 */}
        <motion.div
          className="lg:col-span-2 grid grid-cols-2 gap-px"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{ border: "1px solid var(--border)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col justify-end p-6 gap-2"
              style={{
                background: i % 2 === 0 ? "var(--bg-surface)" : "var(--bg-elevated)",
                borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="font-sans font-black leading-none"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--accent-green)",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono text-xs leading-snug"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
