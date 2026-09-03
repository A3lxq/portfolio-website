import { Section } from '../layout/Section'
import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { profile } from '../../data/resume'

export function About() {
  const lines = profile.summary.split(/(?<=[.!?])\s+/).filter(Boolean)
  const listRef = useStaggerReveal<HTMLDivElement>()

  return (
    <Section id="about" title="About" eyebrow="cat about.md">
      <div ref={listRef} className="max-w-2xl space-y-3">
        {lines.map((line, i) => (
          <div key={line} className="grid grid-cols-[2rem_1fr] gap-3 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
            <span
              aria-hidden="true"
              className="select-none pt-0.5 font-mono text-xs text-neutral-400 dark:text-neutral-600"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-neutral-700 dark:text-neutral-300">{line}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
