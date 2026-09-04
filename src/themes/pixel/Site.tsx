import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-pixel',
  background: <div className="px-scan" aria-hidden="true" />,
  eyebrow: 'OPEN TO OPPORTUNITIES',
})
