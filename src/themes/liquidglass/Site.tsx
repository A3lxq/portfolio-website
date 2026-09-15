import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { VideoBackground } from '../shared/VideoBackground'
import liquidGlassVideo from './assets/liquid-glass.mp4'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="lg-glow" aria-hidden="true">
      <VideoBackground src={liquidGlassVideo} className="lg-video" />
      <span />
      <span />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-liquidglass',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
