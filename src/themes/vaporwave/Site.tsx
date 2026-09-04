import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-vaporwave',
  background: <div className="vw-sky" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})
