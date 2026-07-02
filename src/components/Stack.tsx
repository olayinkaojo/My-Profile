"use client"

import { motion } from "framer-motion"
import SectionHeader from "@/components/SectionHeader"
import { skillGroups } from "@/lib/data"

export default function Stack() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <SectionHeader number="004" label="Stack" title="What I work with" />

      <div className="flex flex-col gap-8">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span
              className="font-mono text-xs pt-2 sm:text-right"
              style={{ color: "var(--text-muted)" }}
            >
              {group.category}
            </span>
            <div className="sm:col-span-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-2 transition-all duration-150 cursor-default"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-secondary)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--accent-cyan)"
                    el.style.color = "var(--text-primary)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--border)"
                    el.style.color = "var(--text-secondary)"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
