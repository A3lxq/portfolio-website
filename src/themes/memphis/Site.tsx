import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-memphis',
  background: (
    <div className="mm-shapes" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  ),
  eyebrow: 'Open to opportunities',
})

export default Site
