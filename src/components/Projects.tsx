"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SectionHeader from "@/components/SectionHeader"
import { projects } from "@/lib/data"
import type { Project } from "@/types"

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <SectionHeader number="005" label="Work" title="Featured projects" />

      {/* Flagship — full width */}
      <FeaturedProject project={featured} />

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px mt-px"
        style={{ border: "1px solid var(--border)", borderTop: "none" }}
      >
        {rest.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={rest.length} />
        ))}
      </div>
    </section>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 transition-colors duration-200"
      style={{
        border: "1px solid var(--border)",
        background: hovered ? "var(--bg-surface)" : "var(--bg-base)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left — identity */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span
            className="font-sans font-black leading-none"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px var(--accent-green)",
            }}
            aria-hidden
          >
            {project.number}
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5"
            style={{
              border: "1px solid var(--accent-green)",
              color: "var(--accent-green)",
              borderRadius: "2px",
            }}
          >
            flagship
          </span>
        </div>

        <h3
          className="font-sans font-black tracking-tight"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
            color: hovered ? "var(--accent-green)" : "var(--text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            transition: "color 0.2s ease",
          }}
        >
          {project.title}
        </h3>

        <span className="font-mono text-xs" style={{ color: "var(--accent-cyan)" }}>
          {project.language} · 50k+ events/sec · &lt;50ms alerts
        </span>
      </div>

      {/* Right — detail */}
      <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
        <p
          className="font-sans text-base leading-relaxed"
          style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}
        >
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                #{tag}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              className="font-sans text-sm font-semibold transition-opacity duration-150"
              style={{ color: "var(--accent-green)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>

      {/* Hover accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200"
        style={{ background: "var(--accent-green)", opacity: hovered ? 1 : 0 }}
      />
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
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
        borderBottom: index < total - 2 ? "1px solid var(--border)" : "none",
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
        <span
          className="font-sans font-black text-2xl leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px var(--text-muted)",
            letterSpacing: "-0.03em",
          }}
          aria-hidden
        >
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
          <span className="font-mono text-xs" style={{ color: "var(--accent-cyan)" }}>
            {project.language}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-sans font-bold text-xl leading-snug tracking-tight"
        style={{
          color: hovered ? "var(--accent-green)" : "var(--text-primary)",
          transition: "color 0.2s ease",
        }}
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
          <span key={tag} className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
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
