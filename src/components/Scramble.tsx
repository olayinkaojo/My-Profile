"use client"

import { useEffect, useState } from "react"

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&01"

/**
 * Renders text that "decodes" from random glyphs, left to right.
 * SSR-safe: server renders the final text, the effect runs on mount.
 */
export default function Scramble({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf: number
    const totalFrames = 34
    let frame = 0
    let started = false
    const startAt = performance.now() + delay

    const tick = (now: number) => {
      if (now < startAt) {
        if (!started) {
          // Hold fully-scrambled while waiting so the reveal reads as decoding
          setDisplay(
            text
              .split("")
              .map((c) => (c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join("")
          )
          started = true
        }
        raf = requestAnimationFrame(tick)
        return
      }

      frame++
      const resolved = Math.floor((frame / totalFrames) * text.length)
      let next = text.slice(0, resolved)
      for (let i = resolved; i < text.length; i++) {
        next += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setDisplay(next)

      if (resolved < text.length) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf = requestAnimationFrame(tick)
    // Guarantee resolution even if rAF stalls (backgrounded tab, throttling)
    const failsafe = setTimeout(() => {
      cancelAnimationFrame(raf)
      setDisplay(text)
    }, delay + 2500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
    }
  }, [text, delay])

  return (
    <span className={className} style={style} aria-label={text}>
      {display}
    </span>
  )
}
