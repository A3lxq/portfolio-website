import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-biophilic',
  background: <div className="bp-blobs" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
})
