import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { VideoBackground } from '../shared/VideoBackground'
import auroraVideo from './assets/aurora-borealis.mp4'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="au-sky" aria-hidden="true">
      <VideoBackground src={auroraVideo} className="au-video" />
      <span />
      <span />
      <span />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-aurora',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
