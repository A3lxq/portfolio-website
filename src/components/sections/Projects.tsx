import { Section } from '../layout/Section'
import { projects } from '../../data/resume'

export function Projects() {
  return (
    <Section id="projects" title="Projects" eyebrow="ls -la ~/repos" tinted>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {project.name}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs underline underline-offset-2 text-neutral-600 dark:text-neutral-400"
                >
                  Repo
                </a>
              )}
            </div>
            {project.status && (
              <p className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                {project.status}
              </p>
            )}
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
