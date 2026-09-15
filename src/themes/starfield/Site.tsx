import './styles.css'
import { buildThemeSite } from '../shared/ThemeKit'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { VideoBackground } from '../shared/VideoBackground'
import nebulaVideo from './assets/nebula.mp4'

function Background() {
  const ref = useScrollProgress<HTMLDivElement>()
  return (
    <div ref={ref} className="sf-sky" aria-hidden="true">
      <VideoBackground src={nebulaVideo} className="sf-video" />
    </div>
  )
}

const Site = buildThemeSite({
  themeClass: 'theme-starfield',
  background: <Background />,
  eyebrow: 'Open to opportunities',
})

export default Site
