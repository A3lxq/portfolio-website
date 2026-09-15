import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} aria-hidden="true">
      <div className="nb-block nb-block--1" />
      <div className="nb-block nb-block--2" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-neubrutalism',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
