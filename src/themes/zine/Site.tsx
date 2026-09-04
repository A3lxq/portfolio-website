import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-zine',
  background: <div className="zn-texture" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
