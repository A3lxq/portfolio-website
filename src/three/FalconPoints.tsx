import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import { buildFalconGeometry } from './falconShape'

const PARTICLE_COUNT = 2400

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vRandom;

  void main() {
    vRandom = aRandom;
    float eased = uProgress < 0.5
      ? 4.0 * uProgress * uProgress * uProgress
      : 1.0 - pow(-2.0 * uProgress + 2.0, 3.0) / 2.0;
    vec3 pos = mix(aScatter, position, eased);

    // gentle drift/shimmer once assembled
    float settle = smoothstep(0.85, 1.0, uProgress);
    pos.x += sin(uTime * 0.6 + aRandom * 6.28) * 0.015 * settle;
    pos.y += cos(uTime * 0.5 + aRandom * 6.28) * 0.015 * settle;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (0.9 + aRandom * 0.7) * (26.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, alpha * (0.55 + 0.45 * vRandom));
  }
`

export type FalconPointsHandle = {
  setProgress: (value: number) => void
}

export function FalconPoints({
  progressRef,
  color = '#39ff88',
}: {
  progressRef: React.MutableRefObject<number>
  color?: string
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const falconGeometry = buildFalconGeometry()
    const mesh = new THREE.Mesh(falconGeometry)
    const sampler = new MeshSurfaceSampler(mesh).build()

    const targets = new Float32Array(PARTICLE_COUNT * 3)
    const scatter = new Float32Array(PARTICLE_COUNT * 3)
    const randoms = new Float32Array(PARTICLE_COUNT)
    const tmp = new THREE.Vector3()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sampler.sample(tmp)
      targets[i * 3] = tmp.x
      targets[i * 3 + 1] = tmp.y
      targets[i * 3 + 2] = tmp.z

      const radius = 1.6 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      scatter[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      scatter[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      scatter[i * 3 + 2] = radius * Math.cos(phi)

      randoms[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(targets, 3))
    geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    return geo
  }, [])

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color],
  )

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uProgress.value = progressRef.current
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
