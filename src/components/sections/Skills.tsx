import { Section } from '../layout/Section'
import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { skillGroups } from '../../data/resume'

export function Skills() {
  const groupsRef = useStaggerReveal<HTMLDivElement>()

  return (
    <Section id="skills" title="Skills" eyebrow="ls -la ./skills" tinted>
      <div ref={groupsRef} className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-sm font-semibold text-signal-cyan-dim dark:text-signal-cyan">
              ./{group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/
            </h3>
            <ul className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200 font-mono text-sm dark:divide-neutral-800 dark:border-neutral-800">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 py-2 text-neutral-700 dark:text-neutral-300"
                >
                  <span aria-hidden="true" className="text-hacker-green-dim dark:text-hacker-green">
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
