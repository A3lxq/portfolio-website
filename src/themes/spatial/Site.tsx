import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-spatial',
  heroDecoration: <div className="sp-glow" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
  trackPointer: true,
})

export default Site
