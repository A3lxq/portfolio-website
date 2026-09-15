import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="mx-stickers" aria-hidden="true">
      <span>NEW!</span>
      <span>WOW</span>
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-maximalism',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
