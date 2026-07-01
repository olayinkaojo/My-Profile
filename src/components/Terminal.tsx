"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { meta, projects, skillGroups } from "@/lib/data"
import { useTheme } from "@/lib/theme"

type ScriptLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string }

type RenderedLine = {
  type: "cmd" | "out" | "err" | "accent"
  text: string
}

const SCRIPT: ScriptLine[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "olayinka ojo — security engineer" },
  { type: "cmd", text: "cat stack.txt" },
  { type: "out", text: "javascript · python · go · ruby" },
  { type: "out", text: "burp-suite · splunk · nmap · wireshark" },
  { type: "cmd", text: "cat status.txt" },
  { type: "out", text: "available for serious work." },
  { type: "cmd", text: "help" },
  { type: "out", text: "this terminal is live — type a command." },
]

const MAX_LINES = 120

const HELP_TEXT: string[] = [
  "available commands:",
  "  whoami        who is this guy",
  "  ls            list projects",
  "  cat <name>    inspect a project (try: cat gologwatch)",
  "  stack         languages, tools, infrastructure",
  "  contact       how to reach me",
  "  cv            download my CV",
  "  blog          open the blog",
  "  theme         toggle dark / light",
  "  clear         wipe the screen",
  "  sudo hire-me  you know you want to",
]

export default function Terminal() {
  const [lines, setLines] = useState<RenderedLine[]>([])
  const [interactive, setInteractive] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const scriptIdx = useRef(0)
  const charIdx = useRef(0)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { toggle } = useTheme()

  const push = useCallback((newLines: RenderedLine[]) => {
    setLines((prev) => [...prev, ...newLines].slice(-MAX_LINES))
  }, [])

  const tick = () => {
    const idx = scriptIdx.current

    if (idx >= SCRIPT.length) {
      setInteractive(true)
      return
    }

    const entry = SCRIPT[idx]

    if (entry.type === "out") {
      timeout.current = setTimeout(() => {
        setLines((prev) => [...prev, { type: "out", text: entry.text }])
        scriptIdx.current++
        charIdx.current = 0
        tick()
      }, 180)
      return
    }

    // cmd — typewriter
    const ci = charIdx.current

    if (ci === 0) {
      setLines((prev) => [...prev, { type: "cmd", text: "" }])
    }

    if (ci < entry.text.length) {
      const delay = 45 + Math.random() * 65
      timeout.current = setTimeout(() => {
        const next = ci + 1
        setLines((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { type: "cmd", text: entry.text.slice(0, next) }
          return updated
        })
        charIdx.current = next
        tick()
      }, delay)
    } else {
      timeout.current = setTimeout(() => {
        scriptIdx.current++
        charIdx.current = 0
        tick()
      }, 380)
    }
  }

  useEffect(() => {
    const start = setTimeout(() => tick(), 900)
    return () => {
      clearTimeout(start)
      if (timeout.current) clearTimeout(timeout.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the latest output in view
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, interactive])

  const run = (raw: string) => {
    const cmd = raw.trim()
    const echo: RenderedLine = { type: "cmd", text: cmd }
    if (!cmd) return

    const [name, ...args] = cmd.toLowerCase().split(/\s+/)
    const arg = args.join(" ")
    const out: RenderedLine[] = []

    switch (name) {
      case "help":
      case "?":
        HELP_TEXT.forEach((t) => out.push({ type: "out", text: t }))
        break

      case "whoami":
        out.push({ type: "out", text: `${meta.name.toLowerCase()} — ${meta.role}` })
        out.push({ type: "out", text: meta.tagline.toLowerCase() + " " + meta.subtagline.toLowerCase() })
        break

      case "ls":
        projects.forEach((p) =>
          out.push({ type: "out", text: `${p.id}/  (${p.language.toLowerCase()})` })
        )
        out.push({ type: "out", text: "hint: cat <name> for details" })
        break

      case "cat": {
        if (!arg) {
          out.push({ type: "err", text: "cat: missing operand — try: cat gologwatch" })
          break
        }
        const proj = projects.find((p) => p.id.includes(arg) || arg.includes(p.id))
        if (proj) {
          out.push({ type: "accent", text: `# ${proj.title} [${proj.language.toLowerCase()}]` })
          out.push({ type: "out", text: proj.description })
        } else if (arg === "stack.txt") {
          skillGroups.forEach((g) =>
            out.push({ type: "out", text: `${g.category.toLowerCase()}: ${g.skills.slice(0, 6).join(" · ").toLowerCase()}` })
          )
        } else {
          out.push({ type: "err", text: `cat: ${arg}: no such file — try 'ls'` })
        }
        break
      }

      case "stack":
        skillGroups.forEach((g) =>
          out.push({ type: "out", text: `${g.category.toLowerCase()}: ${g.skills.join(" · ").toLowerCase()}` })
        )
        break

      case "contact":
        out.push({ type: "out", text: `email:    ${meta.email}` })
        out.push({ type: "out", text: `github:   ${meta.github.replace("https://", "")}` })
        out.push({ type: "out", text: `linkedin: ${meta.linkedin.replace("https://", "")}` })
        break

      case "cv":
      case "resume":
        out.push({ type: "accent", text: "fetching cv.pdf …" })
        setTimeout(() => window.open(meta.cv, "_blank"), 400)
        break

      case "blog":
        out.push({ type: "accent", text: "opening /blog …" })
        setTimeout(() => (window.location.href = "/blog"), 400)
        break

      case "theme":
        toggle()
        out.push({ type: "out", text: "theme toggled. (the terminal stays dark. always.)" })
        break

      case "clear":
        setLines([])
        setHistory((h) => [cmd, ...h])
        setHistoryIdx(-1)
        setInput("")
        return

      case "sudo":
        if (arg.includes("hire")) {
          out.push({ type: "accent", text: "[sudo] permission granted." })
          out.push({ type: "out", text: "redirecting to contact …" })
          setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }, 600)
        } else {
          out.push({ type: "err", text: `${meta.name.split(" ")[0].toLowerCase()} is not in the sudoers file. this incident will be reported.` })
        }
        break

      case "nmap":
        out.push({ type: "out", text: "Starting Nmap ( https://nmap.org )" })
        out.push({ type: "out", text: "PORT     STATE  SERVICE" })
        out.push({ type: "out", text: "22/tcp   open   dedication" })
        out.push({ type: "out", text: "443/tcp  open   secure-by-default" })
        out.push({ type: "out", text: "8080/tcp closed excuses" })
        break

      case "exit":
      case "logout":
        out.push({ type: "out", text: "nice try. this shell doesn't quit. neither do i." })
        break

      case "rm":
        out.push({ type: "err", text: "rm: permission denied — this portfolio is immutable infrastructure." })
        break

      case "pwd":
        out.push({ type: "out", text: "/home/olayinka/portfolio" })
        break

      default:
        out.push({ type: "err", text: `zsh: command not found: ${name} — type 'help'` })
    }

    push([echo, ...out])
    setHistory((h) => [cmd, ...h])
    setHistoryIdx(-1)
    setInput("")
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.length - 1)
      if (history[next] !== undefined) {
        setHistoryIdx(next)
        setInput(history[next])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = historyIdx - 1
      if (next < 0) {
        setHistoryIdx(-1)
        setInput("")
      } else {
        setHistoryIdx(next)
        setInput(history[next])
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  /* Terminal is always dark — pinned to hardcoded values, ignores theme */
  return (
    <div
      className="relative font-mono text-sm leading-7 w-full scanline"
      style={{
        background: "#0a0a0a",
        border: "1px solid #1e1e1e",
        borderRadius: "2px",
        cursor: "text",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Top label */}
      <div
        className="absolute top-0 right-0 px-3 py-1 font-mono text-xs z-10"
        style={{
          color: interactive ? "#00e87a" : "#444444",
          borderBottom: "1px solid #1e1e1e",
          borderLeft: "1px solid #1e1e1e",
          background: "#0a0a0a",
          transition: "color 0.4s ease",
        }}
      >
        {interactive ? "● live shell" : "terminal"}
      </div>

      <div
        ref={bodyRef}
        className="p-6 pt-10 space-y-0.5 overflow-y-auto"
        style={{ maxHeight: "420px", minHeight: "300px", scrollbarWidth: "thin" }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {line.type === "cmd" ? (
              <span className="break-all">
                <span style={{ color: "#00e87a" }}>$ </span>
                <span style={{ color: "#e8e8e8" }}>{line.text}</span>
                {i === lines.length - 1 && !interactive && (
                  <span
                    className="inline-block w-[7px] h-[14px] ml-px animate-blink align-middle"
                    style={{ background: "#00e87a", verticalAlign: "text-bottom" }}
                  />
                )}
              </span>
            ) : (
              <span
                className="whitespace-pre-wrap break-words"
                style={{
                  color:
                    line.type === "err"
                      ? "#ff3c5f"
                      : line.type === "accent"
                        ? "#00c8ff"
                        : "#888888",
                }}
              >
                {line.text}
              </span>
            )}
          </div>
        ))}

        {interactive && (
          <div className="flex items-center">
            <span style={{ color: "#00e87a" }}>$&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input — type 'help' for available commands"
              className="flex-1 bg-transparent outline-none border-none font-mono text-sm"
              style={{ color: "#e8e8e8", caretColor: "#00e87a" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
