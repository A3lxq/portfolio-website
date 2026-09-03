import { Section } from '../layout/Section'
import { profile } from '../../data/resume'

export function About() {
  return (
    <Section id="about" title="About" eyebrow="cat about.md">
      <p className="max-w-3xl text-neutral-700 dark:text-neutral-300">
        {profile.summary}
      </p>
    </Section>
  )
}
