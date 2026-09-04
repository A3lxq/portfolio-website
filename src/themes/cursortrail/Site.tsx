import './styles.css'
import { useEffect, useRef } from 'react'
import { buildThemeSite } from '../shared/ThemeKit'

const DOT_COUNT = 8

function CursorTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const positions = Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 }))
    const target = { x: -100, y: -100 }
    let raf = 0
    let hasMoved = false

    function onMove(event: PointerEvent) {
      target.x = event.clientX
      target.y = event.clientY
      hasMoved = true
    }

    function tick() {
      if (hasMoved) {
        positions[0].x += (target.x - positions[0].x) * 0.35
        positions[0].y += (target.y - positions[0].y) * 0.35
        for (let i = 1; i < positions.length; i++) {
          positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35
          positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35
        }
        positions.forEach((pos, i) => {
          const dot = dotsRef.current[i]
          if (dot) dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
        })
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={layerRef} className="ct-layer" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el
          }}
          className="ct-dot"
          style={{
            // @ts-expect-error custom property
            '--ct-size': `${12 - i}px`,
            '--ct-color': i % 2 === 0 ? 'var(--t-accent)' : 'var(--t-accent-2)',
            '--ct-opacity': String(0.85 - i * 0.08),
          }}
        />
      ))}
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-cursortrail',
  background: <CursorTrail />,
  eyebrow: 'Open to opportunities',
})

export default Site
