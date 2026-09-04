import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-brutalist',
  background: <div className="bt-grid" aria-hidden="true" />,
  eyebrow: 'OPEN TO OPPORTUNITIES',
})

export default Site
