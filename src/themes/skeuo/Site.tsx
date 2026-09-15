import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="sk-texture" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-skeuo',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
