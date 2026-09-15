import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="bt-grid" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-brutalist',
  background: <Background />,
  eyebrow: 'OPEN TO OPPORTUNITIES',
})

export default Site
