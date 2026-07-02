"use client"

import { motion } from "framer-motion"
import CountUp from "@/components/CountUp"
import { meta, stats } from "@/lib/data"

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
    >
      <div className="relative mb-14">
        <span aria-hidden className="ghost-number">
          001
        </span>
        <motion.p
          className="section-label relative pt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          // 001 — About
        </motion.p>
      </div>

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
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
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

        {/* Stats — 2/5, counts up on scroll */}
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
              <CountUp
                value={stat.value}
                className="font-sans font-black leading-none"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  color: "var(--accent-green)",
                  letterSpacing: "-0.03em",
                }}
              />
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
