import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position within an element as CSS custom properties
 * --px/--py (percentages, 0-100), for cursor-reactive effects (a
 * following glow, a tracking reticle, a magnetic pull). Skipped on
 * touch-only devices (no hover pointer to track) and left inert under
 * prefers-reduced-motion — the element just keeps its CSS default.
 */
export function usePointerTracking<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function handleMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      el!.style.setProperty('--px', `${x}%`)
      el!.style.setProperty('--py', `${y}%`)
    }

    el.addEventListener('pointermove', handleMove)
    return () => el.removeEventListener('pointermove', handleMove)
  }, [])

  return ref
}
