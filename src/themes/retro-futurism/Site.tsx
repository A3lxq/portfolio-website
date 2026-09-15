import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="rf-sunburst" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-retro-futurism',
  background: <Background />,
  heroDecoration: <div className="rf-stripe" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
