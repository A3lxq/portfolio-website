import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { VideoBackground } from '../shared/VideoBackground'
import neonLiquidVideo from './assets/neon-liquid.mp4'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="vw-sky" aria-hidden="true">
      <VideoBackground src={neonLiquidVideo} className="vw-video" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-vaporwave',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
