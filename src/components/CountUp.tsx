"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

/**
 * Animates the numeric part of a stat (e.g. "35%" → 0..35 + "%")
 * when it scrolls into view.
 */
export default function CountUp({
  value,
  className,
  style,
}: {
  value: string
  className?: string
  style?: React.CSSProperties
}) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target)
      return
    }

    const duration = 1300
    const t0 = performance.now()
    let raf: number

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, match])

  return (
    <span ref={ref} className={className} style={style}>
      {match ? `${n}${suffix}` : value}
    </span>
  )
}
