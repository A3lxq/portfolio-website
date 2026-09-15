import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { profile } from '../../data/resume'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const marqueeText = `${profile.name} — ${profile.tagline} — `

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="kn-marquee" aria-hidden="true">
      <span>{marqueeText.repeat(4)}</span>
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-kinetic',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
