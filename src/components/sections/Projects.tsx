import { Section } from '../layout/Section'
import { projects } from '../../data/resume'

export function Projects() {
  return (
    <Section id="projects" title="Projects" tinted>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
