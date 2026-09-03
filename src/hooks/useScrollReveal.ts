import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'expo.out'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Reveals a single element (fade + translate-up) the first time it enters
 * the viewport. Sub-300ms, custom expo-out easing — not GSAP/CSS defaults.
 * Under prefers-reduced-motion, the element is shown at its final state
 * immediately (never stuck at opacity 0).
 */
export function useRevealOnScroll<T extends HTMLElement>(options: {
  y?: number
  scale?: number
  duration?: number
  delay?: number
  start?: string
} = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 })
      return
    }

    const { y = 16, scale = 1, duration = 0.22, delay = 0, start = 'top 85%' } = options
    gsap.set(el, { opacity: 0, y, scale })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, scale: 1, duration, delay, ease: EASE })
      },
    })

    return () => trigger.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/**
 * Reveals the direct children of a container with a short stagger, the
 * first time the container enters the viewport. Used for card grids,
 * lists, and timelines so items arrive in sequence rather than all at
 * once. Reduced-motion shows every child at its final state immediately.
 */
export function useStaggerReveal<T extends HTMLElement>(options: {
  y?: number
  scale?: number
  duration?: number
  stagger?: number
  start?: string
} = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = Array.from(container.children) as HTMLElement[]
    if (items.length === 0) return

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0, scale: 1 })
      return
    }

    const { y = 14, scale = 1, duration = 0.18, stagger = 0.05, start = 'top 85%' } = options
    gsap.set(items, { opacity: 0, y, scale })
    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(items, { opacity: 1, y: 0, scale: 1, duration, stagger, ease: EASE })
      },
    })

    return () => trigger.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
