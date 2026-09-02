import * as THREE from 'three'

/**
 * Stylized falcon-in-flight silhouette (soaring, wings spread, viewed from
 * below/behind) — a symmetric outline built by mirroring one half. Used both
 * for the WebGL particle hologram and as the basis for the static SVG
 * fallback (see FalconFallback.tsx, which encodes the same silhouette by
 * hand as an SVG path).
 */
const RIGHT_HALF: [number, number][] = [
  [0, 1.3],
  [0.08, 1.1],
  [0.35, 0.95],
  [1.3, 0.55],
  [2.4, 0.05],
  [2.05, -0.15],
  [1.0, -0.05],
  [0.45, -0.35],
  [0.4, -0.9],
  [0.85, -1.55],
  [0.3, -1.25],
  [0, -1.4],
]

export function buildFalconShape(): THREE.Shape {
  const shape = new THREE.Shape()
  const [firstX, firstY] = RIGHT_HALF[0]
  shape.moveTo(firstX, firstY)
  for (let i = 1; i < RIGHT_HALF.length; i++) {
    const [x, y] = RIGHT_HALF[i]
    shape.lineTo(x, y)
  }
  for (let i = RIGHT_HALF.length - 2; i >= 0; i--) {
    const [x, y] = RIGHT_HALF[i]
    shape.lineTo(-x, y)
  }
  shape.closePath()
  return shape
}

export function buildFalconGeometry(): THREE.ExtrudeGeometry {
  const shape = buildFalconShape()
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: false,
    curveSegments: 4,
  })
  geometry.center()
  return geometry
}
