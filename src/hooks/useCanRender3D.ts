import { useEffect, useState } from 'react'

function detectWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!canvas.getContext('webgl2')
  } catch {
    return false
  }
}

/**
 * Coarse capability gate for the falcon hero scene. Deliberately
 * conservative: prefers-reduced-motion and no-WebGL2 always fall back to
 * the static SVG falcon (FalconFallback), never a broken/laggy canvas.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const hasWebGL2 = detectWebGL2()
    const cores = navigator.hardwareConcurrency ?? 4
    // Below md breakpoint: the corner "waypoint" badge scales relative to
    // canvas resolution, not CSS width, so it reads oversized on phones.
    // The SVG fallback already looks good at any size, so narrow viewports
    // just use it — no point tuning a bespoke mobile 3D tier for a small
    // decorative badge.
    const wideEnough = window.innerWidth >= 768
    const viable = !prefersReducedMotion && hasWebGL2 && cores >= 4 && wideEnough

    setCanRender(viable)
    setChecked(true)
  }, [])

  return { canRender, checked }
}
