import { Section } from '../layout/Section'
import { SpotlightCard } from '../ui/SpotlightCard'
import { useStaggerReveal } from '../../hooks/useScrollReveal'
import { projects, type ProjectEntry } from '../../data/resume'

export function Projects() {
  const [feature, ...rest] = projects
  const gridRef = useStaggerReveal<HTMLDivElement>({ y: 20 })

  return (
    <Section id="projects" title="Projects" eyebrow="ls -la ~/repos" tinted wide>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SpotlightCard className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <ProjectBody project={feature} featured />
        </SpotlightCard>
        {rest.map((project) => (
          <SpotlightCard key={project.name}>
            <ProjectBody project={project} />
          </SpotlightCard>
        ))}
      </div>
    </Section>
  )
}

function ProjectBody({
  project,
  featured = false,
}: {
  project: ProjectEntry
  featured?: boolean
}) {
  return (
    <article className={featured ? 'flex h-full flex-col p-6 sm:p-8' : 'p-5'}>
      <div className="flex items-start justify-between gap-2">
        <h3
          className={
            featured
              ? 'font-mono text-lg font-semibold text-neutral-900 dark:text-neutral-100'
              : 'font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100'
          }
        >
          {project.name}
        </h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-xs text-signal-cyan-dim underline underline-offset-2 transition-colors duration-150 ease-snap hover:text-hacker-green-dim dark:text-signal-cyan dark:hover:text-hacker-green"
          >
            Repo
          </a>
        )}
      </div>
      {project.status && (
        <p className="mt-1 font-mono text-xs font-medium text-alert-amber-dim dark:text-alert-amber">
          {project.status}
        </p>
      )}
      <p
        className={
          featured
            ? 'mt-3 text-sm text-neutral-700 dark:text-neutral-300'
            : 'mt-2 text-sm text-neutral-700 dark:text-neutral-300'
        }
      >
        {project.description}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-neutral-200 px-2.5 py-1 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}
