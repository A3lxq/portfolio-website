import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-spatial',
  heroDecoration: <div className="sp-glow" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
  trackPointer: true,
})
