import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-bauhaus',
  background: (
    <div className="bh-shapes" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  ),
  eyebrow: 'Open to opportunities',
})

export default Site
