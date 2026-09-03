/**
 * Zero-WebGL static fallback: the same falcon silhouette (see
 * ../../three/falconShape.ts) hand-encoded as an SVG path, with a soft
 * glow filter. Used when useCanRender3D() reports the device/preference
 * can't or shouldn't run the particle hologram — never a blank hero.
 */
export function FalconFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex h-24 w-24 items-center justify-center md:h-[320px] md:w-full md:max-w-md"
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full falcon-fallback-pulse"
        role="presentation"
      >
        <defs>
          <filter id="falcon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M100,54.5 L102.8,61.5 L112.25,66.75 L145.5,80.75 L184,98.25 L171.75,105.25 L135,101.75 L115.75,112.25 L114,131.5 L129.75,154.25 L110.5,143.75 L100,149 L89.5,143.75 L70.25,154.25 L86,131.5 L84.25,112.25 L65,101.75 L28.25,105.25 L16,98.25 L54.5,80.75 L87.75,66.75 L97.2,61.5 Z"
          fill="none"
          stroke="#39ff88"
          strokeWidth="1.4"
          strokeLinejoin="round"
          filter="url(#falcon-glow)"
        />
      </svg>
    </div>
  )
}
