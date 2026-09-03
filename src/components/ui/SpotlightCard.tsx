import { useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

/**
 * Mouse-tracked spotlight border, adapted from Skiper UI's FeatureCard
 * pattern (skiper-ui.com) — ported off its Next.js/static-image props to a
 * plain, content-agnostic wrapper for this Vite project. Falls back to a
 * static border with no listener on touch devices.
 */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const [hovering, setHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(57, 255, 136, 0.14), transparent 70%)`

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors duration-150 ease-snap hover:border-hacker-green-dim dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-hacker-green ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ background, opacity: hovering ? 1 : 0 }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
