import { useRef, type MouseEvent, type ReactNode, type Ref } from 'react'

/**
 * A button that eases a few pixels toward the cursor while hovered — the
 * "obsessive micro-interaction" signature of this theme. Skipped under
 * prefers-reduced-motion (the button just sits still). Content stays a
 * real, keyboard-operable link/button either way.
 */
export function MagneticButton({
  as: Tag = 'a',
  className = '',
  children,
  ...props
}: {
  as?: 'a' | 'button'
  className?: string
  children: ReactNode
  [key: string]: unknown
}) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  const Comp = Tag as 'a'
  return (
    <Comp
      ref={ref as Ref<HTMLAnchorElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </Comp>
  )
}
