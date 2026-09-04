import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function MeshBackground() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="mg-mesh" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-meshgradient',
  background: <MeshBackground />,
  eyebrow: 'Open to opportunities',
})

export default Site
