import './styles.css'
import { useEffect, useRef } from 'react'
import { buildThemeSite } from '../shared/ThemeKit'

function useScrollTilt<T extends HTMLElement>(degreesPerPixel: number, axis: 'x' | 'y' = 'y') {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    function apply() {
      if (!el) return
      const deg = (window.scrollY * degreesPerPixel) % 360
      el.style.transform = axis === 'y' ? `rotateY(${deg}deg) rotateX(${deg * 0.4}deg)` : `rotateX(${deg}deg) rotateY(${deg * 0.4}deg)`
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
  }, [degreesPerPixel, axis])
  return ref
}

function Scene3D() {
  const cube = useScrollTilt<HTMLDivElement>(0.12, 'y')
  const ring = useScrollTilt<HTMLDivElement>(-0.08, 'x')
  return (
    <div className="hr-scene" aria-hidden="true">
      <div ref={cube} className="hr-shape hr-shape--cube" />
      <div ref={ring} className="hr-shape hr-shape--ring" />
      <div className="hr-shape hr-shape--orb" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-hyperreal',
  background: <Scene3D />,
  eyebrow: 'Open to opportunities',
})

export default Site
