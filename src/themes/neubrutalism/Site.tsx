import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'

export default buildThemeSite({
  themeClass: 'theme-neubrutalism',
  background: (
    <>
      <div className="nb-block nb-block--1" aria-hidden="true" />
      <div className="nb-block nb-block--2" aria-hidden="true" />
    </>
  ),
  eyebrow: 'Open to opportunities',
})
