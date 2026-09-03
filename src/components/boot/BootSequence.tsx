import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  '[    0.000000] IMMANUVEL-OS 6.2.0 (falcon-hardened) booting...',
  '[    0.184213] Initializing network stack............... [ OK ]',
  '[    0.362981] Mounting /home/experience.................. [ OK ]',
  '[    0.548102] Loading kernel module: cybersecurity.ko.... [ OK ]',
  '[    0.771244] Loading kernel module: ai_automation.ko.... [ OK ]',
  '[    0.958873] Loading kernel module: networking.ko....... [ OK ]',
  '[    1.203015] Starting falcon.service..................... [ OK ]',
  '[    1.421559] Establishing secure session................ [ OK ]',
]
const WELCOME_LINE = 'Welcome, Immanuvel Alex.'
const GLITCH_LINE_INDEXES = new Set([2, 5])

const LINE_DELAY_MS = 190
const CHAR_DELAY_MS = 18
const HOLD_MS = 400
const FADE_MS = 300
const STORAGE_KEY = 'falcon-boot-seen'

// Exported so other mount-time entrances (e.g. the Hero stagger reveal)
// can hand off right as the boot overlay finishes, instead of animating
// invisibly underneath it.
export const BOOT_SEQUENCE_TOTAL_MS =
  BOOT_LINES.length * LINE_DELAY_MS +
  WELCOME_LINE.length * CHAR_DELAY_MS +
  HOLD_MS +
  FADE_MS
export const BOOT_SEQUENCE_STORAGE_KEY = STORAGE_KEY

/**
 * A brief, skippable Linux-boot-style splash — the site's "one distinctive
 * visual moment." Never blocks real content: the page underneath is fully
 * rendered in the DOM the whole time, this is a decorative overlay only.
 * Skipped entirely under prefers-reduced-motion or if already seen this
 * session, and dismissible instantly via click/keypress.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [welcomeChars, setWelcomeChars] = useState(0)
  const [fading, setFading] = useState(false)
  const timeouts = useRef<number[]>([])
  const finished = useRef(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY) === '1'
    if (reducedMotion || alreadySeen) {
      onDone()
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    BOOT_LINES.forEach((_, i) => {
      const id = window.setTimeout(
        () => setVisibleCount(i + 1),
        i * LINE_DELAY_MS,
      )
      timeouts.current.push(id)
    })

    const linesDoneAt = BOOT_LINES.length * LINE_DELAY_MS
    for (let c = 1; c <= WELCOME_LINE.length; c++) {
      const id = window.setTimeout(
        () => setWelcomeChars(c),
        linesDoneAt + c * CHAR_DELAY_MS,
      )
      timeouts.current.push(id)
    }

    const finishId = window.setTimeout(
      finish,
      linesDoneAt + WELCOME_LINE.length * CHAR_DELAY_MS + HOLD_MS,
    )
    timeouts.current.push(finishId)

    window.addEventListener('keydown', finish)

    return () => {
      timeouts.current.forEach(clearTimeout)
      window.removeEventListener('keydown', finish)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    if (finished.current) return
    finished.current = true
    timeouts.current.forEach(clearTimeout)
    sessionStorage.setItem(STORAGE_KEY, '1')
    setFading(true)
    window.setTimeout(onDone, FADE_MS)
  }

  return (
    <div
      aria-hidden="true"
      onClick={finish}
      className={`boot-crt-in fixed inset-0 z-50 flex cursor-pointer flex-col justify-center overflow-hidden bg-black px-6 font-mono text-sm text-hacker-green transition-opacity sm:text-base ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div aria-hidden="true" className="scanlines-boot pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-xl">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <p key={line} className={GLITCH_LINE_INDEXES.has(i) ? 'boot-glitch opacity-90' : 'opacity-90'}>
            {line}
          </p>
        ))}
        {visibleCount >= BOOT_LINES.length && welcomeChars > 0 && (
          <p className="mt-3 font-medium text-white">
            {WELCOME_LINE.slice(0, welcomeChars)}
            {welcomeChars < WELCOME_LINE.length && <span className="cursor-blink">▌</span>}
          </p>
        )}
        {visibleCount > 0 &&
          visibleCount < BOOT_LINES.length && <span className="cursor-blink">▌</span>}
      </div>
      <p className="absolute right-4 top-4 rounded border border-hacker-green-dim px-2.5 py-1 text-xs font-medium text-hacker-green sm:right-6 sm:top-6 sm:text-sm">
        skip &gt;&gt; click or press any key
      </p>
    </div>
  )
}
