import { profile } from '../../data/resume'

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto flex max-w-5xl flex-col items-start px-6 pb-16 pt-20 md:pt-28"
    >
      <p
        aria-hidden="true"
        className="font-mono text-xs text-neutral-500 dark:text-neutral-500"
      >
        <span className="prompt-eyebrow">whoami</span>
      </p>
      <p className="mt-2 flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1 font-mono text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-hacker-green cursor-blink"
        />
        STATUS: OPEN_TO_OPPORTUNITIES
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
        {profile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
        {profile.tagline}
      </p>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        {profile.location}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          download
        >
          Download Résumé
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          GitHub
        </a>
        <a
          href="#contact"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          Contact
        </a>
      </div>
    </section>
  )
}
