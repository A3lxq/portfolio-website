import { Canvas } from '@react-three/fiber'
import { FalconRig } from './FalconRig'
import { ConstellationField } from './ConstellationField'

export default function FalconScene() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      style={{ pointerEvents: 'none' }}
    >
      <ConstellationField />
      <FalconRig />
    </Canvas>
  )
}
