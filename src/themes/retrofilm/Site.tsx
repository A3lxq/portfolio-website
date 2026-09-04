import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-retrofilm',
  background: <div className="rf2-grain" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
