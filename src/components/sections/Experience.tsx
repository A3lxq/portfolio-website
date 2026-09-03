import { Section } from '../layout/Section'
import { experience } from '../../data/resume'

export function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="git log --author=immanuvel">
      <ol className="space-y-8 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {experience.map((entry) => (
          <li key={`${entry.org}-${entry.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100"
            />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.period}
            </p>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {entry.title} · {entry.org}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
