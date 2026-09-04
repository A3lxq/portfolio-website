import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useParallax } from '../../hooks/useParallax'

function DepthLayers() {
  const near = useParallax<HTMLSpanElement>(0.22)
  const mid = useParallax<HTMLSpanElement>(0.12)
  const far = useParallax<HTMLSpanElement>(0.05)
  return (
    <div className="dm-depth" aria-hidden="true">
      <span ref={near} />
      <span ref={mid} />
      <span ref={far} />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-dimensional',
  background: <DepthLayers />,
  eyebrow: 'Open to opportunities',
})

export default Site
