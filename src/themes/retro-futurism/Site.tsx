import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-retro-futurism',
  background: <div className="rf-sunburst" aria-hidden="true" />,
  heroDecoration: <div className="rf-stripe" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
