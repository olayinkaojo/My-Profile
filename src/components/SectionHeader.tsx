"use client"

import { motion } from "framer-motion"

/**
 * Shared section header: giant outlined "ghost" numeral behind
 * a mono label and a heavyweight title. Optional right-aligned slot.
 */
export default function SectionHeader({
  number,
  label,
  title,
  children,
}: {
  number: string
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative mb-16">
      <span aria-hidden className="ghost-number">
        {number}
      </span>

      <div className="relative pt-14 flex items-end justify-between gap-6">
        <div>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            // {number} — {label}
          </motion.p>

          <motion.h2
            className="font-sans font-black tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>

        {children && <div className="shrink-0 pb-1">{children}</div>}
      </div>
    </div>
  )
}
