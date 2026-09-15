import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="cm-blob" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-claymorphism',
  background: <Background />,
  eyebrow: 'Open to opportunities',
  trackPointer: false,
})

export default Site
