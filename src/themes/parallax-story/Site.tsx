import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useParallax } from '../../hooks/useParallax'

function ParallaxLayers() {
  const slow = useParallax<HTMLDivElement>(0.08)
  const fast = useParallax<HTMLDivElement>(0.18)
  return (
    <div aria-hidden="true">
      <div ref={slow} className="px-layer px-layer-1" />
      <div ref={fast} className="px-layer px-layer-2" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-parallax-story',
  background: <ParallaxLayers />,
  eyebrow: 'Open to opportunities',
})

export default Site
