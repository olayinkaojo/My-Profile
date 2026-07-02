"use client"

import { motion } from "framer-motion"
import Terminal from "@/components/Terminal"
import Scramble from "@/components/Scramble"
import { meta } from "@/lib/data"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero() {
  const [firstName, lastName] = meta.name.split(" ")

  return (
    <section
      className="relative min-h-screen flex items-center grid-texture overflow-hidden"
      style={{ paddingTop: "4rem" }}
    >
      {/* Glow accents */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-10%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(circle, var(--terminal-glow) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(0, 200, 255, 0.05) 0%, transparent 65%)",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--bg-base) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-24 lg:py-28">
        {/* Availability + role */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          {meta.availableNow && (
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 w-fit">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: "var(--accent-green)",
                  boxShadow: "0 0 6px var(--accent-green)",
                }}
              />
              <span
                className="font-mono text-xs"
                style={{ color: "var(--accent-green)" }}
              >
                {meta.availability}
              </span>
            </motion.div>
          )}

          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            &gt; {meta.role}
          </motion.p>
        </div>

        {/* Giant name — decodes on load, last name outlined */}
        <motion.h1
          {...fadeUp(0.18)}
          className="font-sans font-black uppercase mb-10"
          style={{
            fontSize: "clamp(3.2rem, 12.5vw, 9rem)",
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
          }}
        >
          <Scramble text={firstName} delay={300} className="block" />
          <Scramble text={lastName} delay={900} className="block text-outline" />
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-start">
          {/* Left — tagline + CTAs */}
          <div className="flex flex-col gap-7">
            <motion.div {...fadeUp(0.38)} className="flex flex-col gap-1">
              <p
                className="font-sans font-semibold"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {meta.tagline}
              </p>
              <p
                className="font-sans font-semibold"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "var(--accent-red)",
                  letterSpacing: "-0.02em",
                }}
              >
                {meta.subtagline}
              </p>
            </motion.div>

            <motion.p
              {...fadeUp(0.46)}
              className="font-sans text-base leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Security engineer and software developer — 15+ years of building
              secure infrastructure, from auth systems to threat detection
              platforms.
            </motion.p>

            <motion.div {...fadeUp(0.54)} className="flex flex-wrap gap-4 pt-1">
              <a
                href="#projects"
                className="font-sans text-sm font-semibold px-7 py-3.5 transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--accent-green)",
                  color: "#050505",
                  borderRadius: "2px",
                  boxShadow: "0 0 24px var(--terminal-glow)",
                }}
              >
                See my work ↓
              </a>

              <a
                href={meta.cv}
                download
                className="font-sans text-sm px-7 py-3.5 transition-all duration-200"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-secondary)"
                  e.currentTarget.style.color = "var(--text-primary)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)"
                  e.currentTarget.style.color = "var(--text-secondary)"
                }}
              >
                Download CV
              </a>
            </motion.div>

            <motion.p
              {...fadeUp(0.62)}
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              psst — the terminal is real. type{" "}
              <span style={{ color: "var(--accent-green)" }}>help</span>. or press{" "}
              <span style={{ color: "var(--accent-green)" }}>⌘K</span>.
            </motion.p>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
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
