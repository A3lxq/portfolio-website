import { Section } from '../layout/Section'
import { experience } from '../../data/resume'

export function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="git log --author=immanuvel">
      <ol className="space-y-2">
        {experience.map((entry, i) => (
          <li key={`${entry.org}-${entry.period}`} className="grid grid-cols-[2rem_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hacker-green-dim font-mono text-[10px] text-hacker-green-dim dark:border-hacker-green dark:text-hacker-green"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < experience.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-1 w-px flex-1 bg-neutral-200 dark:bg-neutral-800"
                />
              )}
            </div>
            <div className="pb-8">
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {entry.period}
              </p>
              <h3 className="mt-1 font-medium text-neutral-900 dark:text-neutral-100">
                {entry.title} · {entry.org}
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
