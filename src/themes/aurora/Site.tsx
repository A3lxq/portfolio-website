import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-aurora',
  background: (
    <div className="au-sky" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  ),
  eyebrow: 'Open to opportunities',
})

export default Site
