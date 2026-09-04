import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-gooey',
  background: (
    <div className="go-blobs" aria-hidden="true">
      <span />
      <span />
    </div>
  ),
  eyebrow: 'Open to opportunities',
})

export default Site
