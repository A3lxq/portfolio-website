import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'

function ScrollProgressBar() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="md-progress-track" aria-hidden="true">
      <div className="md-progress-bar" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-motiondriven',
  background: <ScrollProgressBar />,
  eyebrow: 'Open to opportunities',
})

export default Site
