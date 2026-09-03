import { Section } from '../layout/Section'
import { education } from '../../data/resume'

export function Education() {
  return (
    <Section id="education" title="Education" eyebrow="cat education.log" tinted>
      <div className="space-y-6">
        {education.map((entry) => (
          <div key={entry.school} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 font-mono text-signal-cyan-dim dark:text-signal-cyan"
            >
              ▸
            </span>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {entry.school}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {entry.credential}
              </p>
              {entry.period && (
                <p className="mt-0.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  {entry.period}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
