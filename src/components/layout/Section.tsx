import type { PropsWithChildren } from 'react'

export function Section({
  id,
  title,
  eyebrow,
  children,
  tinted = false,
}: PropsWithChildren<{
  id: string
  title: string
  eyebrow?: string
  tinted?: boolean
}>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={tinted ? 'bg-neutral-50 dark:bg-neutral-900/40' : undefined}
    >
      <div className="mx-auto max-w-5xl px-6 py-16">
        {eyebrow && (
          <p
            aria-hidden="true"
            className="prompt-eyebrow mb-2 font-mono text-xs text-neutral-500 dark:text-neutral-500"
          >
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}
