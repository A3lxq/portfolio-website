import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return <div ref={ref} className="bp-blobs" aria-hidden="true" />
}

const Site = buildThemeSite({
  themeClass: 'theme-biophilic',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
