"use client"

import { motion } from "framer-motion"
import { testimonials } from "@/lib/data"

export default function Testimonials() {
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
        // 003 — Social proof
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
        What people say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ border: "1px solid var(--border)" }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="flex flex-col justify-between gap-8 p-8"
            style={{
              background: "var(--bg-surface)",
              borderRight: i < testimonials.length - 1 ? "1px solid var(--border)" : "none",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            {/* Opening mark */}
            <div className="flex flex-col gap-5">
              <span
                className="font-mono text-3xl leading-none select-none"
                style={{ color: "var(--accent-green)", opacity: 0.4 }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}
              >
                {t.quote}
              </p>
            </div>

            <div
              className="pt-6 flex flex-col gap-0.5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span
                className="font-sans text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {t.name}
              </span>
              {t.role && (
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.role}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-6 font-mono text-xs"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Full recommendations available on{" "}
        <a
          href="https://linkedin.com/in/olayinka-ojo"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150"
          style={{ color: "var(--accent-cyan)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          LinkedIn →
        </a>
      </motion.p>
    </section>
  )
}
