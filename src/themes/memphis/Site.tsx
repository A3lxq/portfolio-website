import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="mm-shapes" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-memphis',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
