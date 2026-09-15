import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="rf2-grain" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-retrofilm',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
