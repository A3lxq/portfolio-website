import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-liquidglass',
  background: (
    <div className="lg-glow" aria-hidden="true">
      <span />
      <span />
    </div>
  ),
  eyebrow: 'Open to opportunities',
})

export default Site
