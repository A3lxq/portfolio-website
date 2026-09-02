import { Section } from '../layout/Section'
import { certifications } from '../../data/resume'

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={cert}
            className="rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
          >
            {cert}
          </li>
        ))}
      </ul>
    </Section>
  )
}
