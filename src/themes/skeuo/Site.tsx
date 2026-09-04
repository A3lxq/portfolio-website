import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-skeuo',
  background: <div className="sk-texture" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
