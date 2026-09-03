import type { PropsWithChildren } from 'react'
import { useRevealOnScroll } from '../../hooks/useScrollReveal'

export function Section({
  id,
  title,
  eyebrow,
  children,
  tinted = false,
  wide = false,
  titleClassName = 'font-mono text-section font-semibold tracking-tight text-neutral-900 dark:text-neutral-100',
}: PropsWithChildren<{
  id: string
  title: string
  eyebrow?: string
  tinted?: boolean
  wide?: boolean
  titleClassName?: string
}>) {
  const headingRef = useRevealOnScroll<HTMLDivElement>()

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={tinted ? 'bg-neutral-50 dark:bg-neutral-900/40' : undefined}
    >
      <div
        className={`mx-auto px-6 py-16 sm:py-20 ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}
      >
        <div ref={headingRef}>
          {eyebrow && (
            <p
              aria-hidden="true"
              className="prompt-eyebrow mb-3 font-mono text-xs text-neutral-500 dark:text-neutral-500"
            >
              {eyebrow}
            </p>
          )}
          <h2 id={`${id}-heading`} className={titleClassName}>
            {title}
          </h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
