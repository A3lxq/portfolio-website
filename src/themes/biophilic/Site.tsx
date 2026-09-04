import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-biophilic',
  background: <div className="bp-blobs" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})

export default Site
