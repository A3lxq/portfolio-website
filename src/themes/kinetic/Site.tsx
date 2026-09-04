import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { profile } from '../../data/resume'

const marqueeText = `${profile.name} — ${profile.tagline} — `

export default buildThemeSite({
  themeClass: 'theme-kinetic',
  background: (
    <div className="kn-marquee" aria-hidden="true">
      <span>{marqueeText.repeat(2)}</span>
    </div>
  ),
  eyebrow: 'Open to opportunities',
})
