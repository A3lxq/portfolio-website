import { useEffect, useRef, useState } from 'react'
import { THEME_LABELS, useSiteTheme } from './ThemeContext'

const PROXIMITY_RADIUS = 100

/**
 * The hidden-in-plain-sight control that cycles between the three site
 * designs. A small, low-contrast dot rather than a labeled "Switch theme"
 * button — but a real, keyboard-focusable, properly-labeled <button>, not
 * a purely visual trick. Mouse users get two extra discovery flourishes
 * (a proximity "detector" beep, a "Surprise" hover callout); keyboard and
 * screen-reader users get a plain accessible name and an aria-live
 * announcement of the change instead — the flourish is additive, never
 * the only way to find or operate the control.
 */
export function ThemeSwitcher() {
  const { theme, cycle } = useSiteTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const inZoneRef = useRef(false)
  const [hovering, setHovering] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const firstRender = useRef(true)

  // Browsers block audio until a real user gesture — lazily create/resume
  // the AudioContext on the page's first click or keypress.
  useEffect(() => {
    function ensureAudioContext() {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!AudioContextCtor) return
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextCtor()
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }
    window.addEventListener('pointerdown', ensureAudioContext, { once: true })
    window.addEventListener('keydown', ensureAudioContext, { once: true })
    return () => {
      window.removeEventListener('pointerdown', ensureAudioContext)
      window.removeEventListener('keydown', ensureAudioContext)
    }
  }, [])

  function playDetectorBeep() {
    const ctx = audioCtxRef.current
    if (!ctx || ctx.state !== 'running') return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.13)
  }

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const el = buttonRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy)
      const inZone = distance < PROXIMITY_RADIUS
      if (inZone && !inZoneRef.current) {
        playDetectorBeep()
      }
      inZoneRef.current = inZone
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setAnnouncement(`Theme changed to ${THEME_LABELS[theme]}`)
  }, [theme])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={cycle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        aria-label={`Cycle site theme (currently ${THEME_LABELS[theme]})`}
        className="fixed bottom-4 right-4 z-[999] h-2.5 w-2.5 rounded-full bg-neutral-500 opacity-25 transition-opacity duration-150 ease-snap hover:opacity-90 focus-visible:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500"
      />
      {hovering && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed bottom-8 right-4 z-[999] rounded bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg"
        >
          Surprise
        </span>
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </>
  )
}
