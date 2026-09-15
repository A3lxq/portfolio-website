import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="px-scan" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-pixel',
  background: <Background />,
  eyebrow: 'OPEN TO OPPORTUNITIES',
})

export default Site
