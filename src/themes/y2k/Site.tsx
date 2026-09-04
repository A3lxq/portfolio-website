import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-y2k',
  background: <div className="y2k-chrome" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
