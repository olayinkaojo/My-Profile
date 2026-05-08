"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "@/lib/data"

export default function Projects() {
  return (
    <section
      id="projects"
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
        // 004 — Work
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
        Featured projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ border: "1px solid var(--border)" }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0]
  index: number
  total: number
}) {
  const [hovered, setHovered] = useState(false)

  const isLastOdd = total % 2 !== 0 && index === total - 1

  return (
    <motion.div
      className={`relative p-8 flex flex-col gap-5 transition-colors duration-200 ${isLastOdd ? "md:col-span-2" : ""}`}
      style={{
        background: hovered ? "var(--bg-surface)" : "var(--bg-base)",
        borderBottom: index < total - 1 ? "1px solid var(--border)" : "none",
        borderRight: index % 2 === 0 && !isLastOdd ? "1px solid var(--border)" : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {project.number}
        </span>
        <div className="flex items-center gap-3">
          {project.status === "wip" && (
            <span
              className="font-mono text-xs px-2 py-0.5"
              style={{
                border: "1px solid var(--accent-green)",
                color: "var(--accent-green)",
                borderRadius: "2px",
              }}
            >
              wip
            </span>
          )}
          <span
            className="font-mono text-xs"
            style={{ color: "var(--accent-cyan)" }}
          >
            {project.language}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-sans font-semibold text-lg leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="font-sans text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-5 pt-1">
        {project.github && (
          <a
            href={project.github}
            className="font-sans text-xs transition-colors duration-150 flex items-center gap-1"
            style={{ color: "var(--accent-green)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            GitHub →
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            className="font-sans text-xs transition-colors duration-150 flex items-center gap-1"
            style={{ color: "var(--accent-green)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Live →
          </a>
        )}
      </div>

      {/* Hover accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px transition-opacity duration-200"
        style={{
          background: "var(--accent-green)",
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  )
}
