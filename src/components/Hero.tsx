"use client"

import { motion } from "framer-motion"
import Terminal from "@/components/Terminal"
import { meta } from "@/lib/data"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center grid-texture"
      style={{ paddingTop: "4rem" }}
    >
      {/* Radial vignette to soften grid edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #080808 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--accent-green)" }}
            >
              &gt; {meta.role}
            </motion.p>

            <motion.h1
              {...fadeUp(0.22)}
              className="font-sans font-black leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              {meta.name}
            </motion.h1>

            <motion.div {...fadeUp(0.34)} className="flex flex-col gap-1">
              <p
                className="font-sans text-xl md:text-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {meta.tagline}
              </p>
              <p
                className="font-sans text-xl md:text-2xl font-semibold"
                style={{ color: "var(--accent-red)" }}
              >
                {meta.subtagline}
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="font-sans text-sm px-6 py-3 transition-all duration-200"
                style={{
                  border: "1px solid var(--accent-green)",
                  color: "var(--accent-green)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = "var(--terminal-glow)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = "transparent"
                }}
              >
                See my work
              </a>
              <a
                href="#writing"
                className="font-sans text-sm px-2 py-3 flex items-center gap-2 transition-colors duration-150"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                Read my writing <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="w-full"
          >
            <Terminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--text-muted), transparent)" }}
        />
      </motion.div>
    </section>
  )
}
