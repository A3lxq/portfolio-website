import { useEffect, useRef } from 'react'

/**
 * Fixed, full-bleed, muted looping background video. Pauses itself under
 * prefers-reduced-motion (still visible as a static first frame) instead
 * of not rendering at all, so the theme's background never goes blank.
 */
export function VideoBackground({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
    }
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
