import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="y2k-chrome" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-y2k',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
