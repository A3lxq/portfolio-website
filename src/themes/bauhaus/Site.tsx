import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="bh-shapes" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-bauhaus',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
