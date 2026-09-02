import { lazy, Suspense } from 'react'
import { useCanRender3D } from '../../hooks/useCanRender3D'
import { FalconFallback } from './FalconFallback'

const FalconScene = lazy(() => import('../../three/FalconScene'))

/**
 * Fixed full-viewport overlay housing the falcon motif. Transparent
 * canvas + pointer-events:none, so it never blocks interaction with the
 * real page underneath — it only ever adds glowing particles on top.
 * Gated behind capability detection; the SVG fallback covers everyone
 * else (reduced-motion, no WebGL2, low core count).
 */
export function FalconHero() {
  const { canRender, checked } = useCanRender3D()

  if (!checked) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden="true">
      {canRender ? (
        <Suspense fallback={<FalconFallbackOverlay />}>
          <FalconScene />
        </Suspense>
      ) : (
        <FalconFallbackOverlay />
      )}
    </div>
  )
}

function FalconFallbackOverlay() {
  return (
    <div className="flex h-full items-start justify-end pr-6 pt-24 md:pr-16 md:pt-28">
      <FalconFallback />
    </div>
  )
}
