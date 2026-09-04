import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

const Site = buildThemeSite({
  themeClass: 'theme-claymorphism',
  background: <div className="cm-blob" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
  trackPointer: false,
})

export default Site
