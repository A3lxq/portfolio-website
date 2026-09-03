import { Section } from '../layout/Section'
import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { certifications } from '../../data/resume'

const TONE_CLASSES = [
  'border-hacker-green-dim/50 text-hacker-green-dim dark:border-hacker-green/50 dark:text-hacker-green',
  'border-signal-cyan-dim/50 text-signal-cyan-dim dark:border-signal-cyan/50 dark:text-signal-cyan',
  'border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400',
]

export function Certifications() {
  const listRef = useStaggerReveal<HTMLUListElement>({ stagger: 0.03 })

  return (
    <Section id="certifications" title="Certifications" eyebrow="cat certifications.log">
      <ul ref={listRef} className="flex flex-wrap gap-2 font-mono text-xs">
        {certifications.map((cert, i) => (
          <li
            key={cert}
            className={`rounded border px-3 py-1.5 ${TONE_CLASSES[i % TONE_CLASSES.length]}`}
          >
            {cert}
          </li>
        ))}
      </ul>
    </Section>
  )
}
