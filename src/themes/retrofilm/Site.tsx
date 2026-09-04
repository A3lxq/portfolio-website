import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-retrofilm',
  background: <div className="rf2-grain" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})
