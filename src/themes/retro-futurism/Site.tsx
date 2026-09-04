import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-retro-futurism',
  background: <div className="rf-sunburst" aria-hidden="true" />,
  heroDecoration: <div className="rf-stripe" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})
