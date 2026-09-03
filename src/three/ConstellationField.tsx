import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 90

const vertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  varying float vTwinkle;

  void main() {
    vTwinkle = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * 0.8 + aPhase * 6.28));
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (18.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, alpha * vTwinkle * 0.5);
  }
`

/**
 * A sparse, twinkling backdrop layer rendered behind the falcon — adds
 * depth to the hero instead of a flat black void behind the particle
 * hologram. Inspired by ThreeUI's Constellation Field background
 * component (threeui.com/backgrounds/constellation-field); its source
 * isn't publicly served, so this is a from-scratch reimplementation kept
 * deliberately cheap — a shader-driven opacity twinkle on a static point
 * field, no per-frame distance/connection calculations.
 */
export function ConstellationField({ color = '#39d9ff' }: { color?: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    const sizes = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = -4 - Math.random() * 6
      phases[i] = Math.random()
      sizes[i] = 0.6 + Math.random() * 1.2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } }),
    [color],
  )

  useFrame((state) => {
    if (!materialRef.current) return
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
