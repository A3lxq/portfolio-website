import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-starfield',
  background: <div className="sf-sky" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
