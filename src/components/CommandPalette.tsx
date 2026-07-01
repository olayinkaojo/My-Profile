"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { articles, meta } from "@/lib/data"
import { useTheme } from "@/lib/theme"

type Command = {
  id: string
  label: string
  hint: string
  group: "Navigate" | "Writing" | "Actions" | "Connect"
  action: () => void
}

function goTo(hash: string) {
  if (window.location.pathname !== "/") {
    window.location.href = `/${hash}`
    return
  }
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { toggle } = useTheme()

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setSelected(0)
  }, [])

  const commands = useMemo<Command[]>(
    () => [
      { id: "about", label: "About", hint: "who I am", group: "Navigate", action: () => goTo("#about") },
      { id: "projects", label: "Projects", hint: "featured work", group: "Navigate", action: () => goTo("#projects") },
      { id: "security", label: "Security", hint: "credentials & CTF", group: "Navigate", action: () => goTo("#security") },
      { id: "writing", label: "Writing", hint: "recent articles", group: "Navigate", action: () => goTo("#writing") },
      { id: "contact", label: "Contact", hint: "get in touch", group: "Navigate", action: () => goTo("#contact") },
      { id: "blog", label: "Blog", hint: "all posts", group: "Navigate", action: () => (window.location.href = "/blog") },
      ...articles.map((a) => ({
        id: a.slug,
        label: a.title,
        hint: a.tag,
        group: "Writing" as const,
        action: () => (window.location.href = `/blog/${a.slug}`),
      })),
      { id: "theme", label: "Toggle theme", hint: "dark ↔ light", group: "Actions", action: toggle },
      { id: "cv", label: "Download CV", hint: "pdf", group: "Actions", action: () => window.open(meta.cv, "_blank") },
      {
        id: "email-copy",
        label: "Copy email address",
        hint: meta.email,
        group: "Actions",
        action: () => navigator.clipboard?.writeText(meta.email),
      },
      { id: "github", label: "GitHub", hint: "@olayinkaojo", group: "Connect", action: () => window.open(meta.github, "_blank") },
      { id: "linkedin", label: "LinkedIn", hint: "profile", group: "Connect", action: () => window.open(meta.linkedin, "_blank") },
      { id: "email", label: "Email me", hint: meta.email, group: "Connect", action: () => (window.location.href = `mailto:${meta.email}`) },
    ],
    [toggle]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    )
  }, [commands, query])

  const groups = useMemo(() => {
    const order: Command["group"][] = ["Navigate", "Writing", "Actions", "Connect"]
    return order
      .map((g) => ({ name: g, items: filtered.filter((c) => c.group === g) }))
      .filter((g) => g.items.length > 0)
  }, [filtered])

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery("")
        setSelected(0)
      } else if (e.key === "Escape") {
        close()
      }
    }
    const openHandler = () => {
      setOpen(true)
      setQuery("")
      setSelected(0)
    }
    window.addEventListener("keydown", handler)
    window.addEventListener("cmdk:open", openHandler)
    return () => {
      window.removeEventListener("keydown", handler)
      window.removeEventListener("cmdk:open", openHandler)
    }
  }, [close])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  useEffect(() => setSelected(0), [query])

  // Keep selection in view
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [selected])

  const execute = (cmd: Command) => {
    close()
    cmd.action()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === "Enter" && filtered[selected]) {
      e.preventDefault()
      execute(filtered[selected])
    }
  }

  let flatIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span className="font-mono text-sm" style={{ color: "var(--accent-green)" }}>
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                spellCheck={false}
                className="flex-1 bg-transparent outline-none border-none font-mono text-sm"
                style={{ color: "var(--text-primary)", caretColor: "var(--accent-green)" }}
              />
              <kbd
                className="font-mono text-xs px-1.5 py-0.5 hidden sm:block"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: "2px" }}
              >
                esc
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-5 py-6 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  no results for “{query}” — try “projects” or “blog”
                </p>
              )}

              {groups.map((group) => (
                <div key={group.name} className="pb-2">
                  <p
                    className="px-5 py-1.5 font-mono text-xs uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {group.name}
                  </p>
                  {group.items.map((cmd) => {
                    flatIndex++
                    const idx = flatIndex
                    const active = idx === selected
                    return (
                      <button
                        key={cmd.id}
                        data-index={idx}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelected(idx)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-2.5 text-left transition-colors duration-100"
                        style={{
                          background: active ? "var(--bg-elevated)" : "transparent",
                          borderLeft: active ? "2px solid var(--accent-green)" : "2px solid transparent",
                        }}
                      >
                        <span
                          className="font-sans text-sm truncate"
                          style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}
                        >
                          {cmd.label}
                        </span>
                        <span className="font-mono text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                          {cmd.hint}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer hints */}
            <div
              className="flex items-center gap-4 px-5 py-2.5 font-mono text-xs"
              style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto" style={{ color: "var(--accent-green)" }}>
                ⌘K
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
