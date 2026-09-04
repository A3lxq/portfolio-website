import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-cyberpunk',
  background: <div className="cp-scan" aria-hidden="true" />,
  eyebrow: 'OPEN TO OPPORTUNITIES',
})

export default Site
