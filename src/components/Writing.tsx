"use client"

import { motion } from "framer-motion"
import SectionHeader from "@/components/SectionHeader"
import { articles } from "@/lib/data"

export default function Writing() {
  return (
    <section
      id="writing"
      className="max-w-6xl mx-auto px-6 py-24 lg:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <SectionHeader number="007" label="Writing" title="Writing">
        <a
          href="/blog"
          className="font-sans text-sm hidden sm:flex items-center gap-1 transition-opacity duration-150"
          style={{ color: "var(--accent-green)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Read all →
        </a>
      </SectionHeader>

      <div className="flex flex-col">
        {articles.map((article, i) => (
          <motion.a
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex items-center justify-between gap-6 py-6 transition-all duration-150"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: i === articles.length - 1 ? "1px solid var(--border)" : "none",
            }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <div className="flex items-baseline gap-6 min-w-0">
              <span
                className="font-mono text-xs shrink-0 hidden sm:block"
                style={{ color: "var(--text-muted)" }}
              >
                {article.date}
              </span>
              <span
                className="font-sans text-base font-semibold truncate transition-colors duration-150"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--accent-cyan)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
              >
                {article.title}
              </span>
            </div>
            <span
              className="font-mono text-xs shrink-0 px-2 py-0.5"
              style={{
                border: "1px solid var(--border)",
                color: "var(--accent-green)",
                borderRadius: "2px",
              }}
            >
              [{article.tag}]
            </span>
          </motion.a>
        ))}
      </div>

      <motion.a
        href="/blog"
        className="mt-6 font-sans text-sm sm:hidden flex items-center gap-1 transition-opacity duration-150"
        style={{ color: "var(--accent-green)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        Read all →
      </motion.a>
    </section>
  )
}
