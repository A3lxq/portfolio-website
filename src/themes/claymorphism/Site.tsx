import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-claymorphism',
  background: <div className="cm-blob" aria-hidden="true" />,
  eyebrow: 'Open to opportunities',
  trackPointer: false,
})
