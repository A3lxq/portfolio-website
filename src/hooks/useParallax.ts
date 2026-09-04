import { useEffect, useRef } from 'react'

/**
 * Moves an element vertically at a fraction of scroll speed to fake depth.
 * No-ops under prefers-reduced-motion — the element simply stays put.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    function apply() {
      if (!el) return
      el.style.transform = `translateY(${window.scrollY * speed}px)`
      ticking = false
    }
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
