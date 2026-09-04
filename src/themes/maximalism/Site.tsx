import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-maximalism',
  background: (
    <div className="mx-stickers" aria-hidden="true">
      <span>NEW!</span>
      <span>WOW</span>
    </div>
  ),
  eyebrow: 'Open to opportunities',
})
