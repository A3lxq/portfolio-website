import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position within an element as CSS custom properties
 * --glow-x/--glow-y (percentages), meant to drive a radial-gradient
 * "spotlight" that follows the cursor. Skipped on devices with no hover
 * pointer (touch) — the gradient just stays at its CSS-default center.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return

    function handleMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      el!.style.setProperty('--glow-x', `${x}%`)
      el!.style.setProperty('--glow-y', `${y}%`)
    }

    el.addEventListener('pointermove', handleMove)
    return () => el.removeEventListener('pointermove', handleMove)
  }, [])

  return ref
}
