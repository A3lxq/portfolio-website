import { useState, type FormEvent, type PropsWithChildren } from 'react'
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useScrollReveal'
import { usePointerTracking } from '../../hooks/usePointerTracking'
import { MagneticButton } from './MagneticButton'
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from '../../data/resume'

const FORMSPREE_ENDPOINT = ''

function Field({
  id,
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 28, scale: 0.98, duration: 0.4 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative z-[1]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div ref={ref} className="mb-12">
          <p className="cs-display text-xs uppercase tracking-[0.25em] text-[var(--cs-accent)]">
            {eyebrow}
          </p>
          <h2 className="cs-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export function Hero() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 24, scale: 0.98, duration: 0.5, stagger: 0.1 })
  const pointerRef = usePointerTracking<HTMLElement>()
  return (
    <section
      ref={pointerRef}
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden"
    >
      <div className="cs-glow cs-glow-breathe" aria-hidden="true" />
      <div
        ref={ref}
        className="relative z-[1] mx-auto flex max-w-6xl flex-col items-start px-6 pb-24 pt-28 md:pt-40"
      >
        <span className="cs-panel rounded-full px-4 py-1.5 text-xs text-[var(--cs-ink-soft)]">
          Open to opportunities
        </span>
        <h1 className="cs-display mt-6 text-6xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-xl text-xl text-[var(--cs-ink-soft)]">{profile.tagline}</p>
        <p className="mt-2 text-sm text-[var(--cs-ink-soft)]">{profile.location}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="rounded-full bg-[var(--cs-accent)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--cs-accent-soft)]"
          >
            Download résumé
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cs-panel rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ease-snap hover:text-[var(--cs-accent)]"
          >
            LinkedIn
          </MagneticButton>
          <MagneticButton
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="cs-panel rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ease-snap hover:text-[var(--cs-accent)]"
          >
            GitHub
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="cs-panel rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ease-snap hover:text-[var(--cs-accent)]"
          >
            Contact
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 24, scale: 0.98, duration: 0.4 })
  return (
    <Field id="about" eyebrow="Profile" title="About">
      <div ref={ref} className="cs-panel max-w-3xl rounded-3xl p-8 sm:p-10">
        <p className="text-xl leading-relaxed text-[var(--cs-ink-soft)]">{profile.summary}</p>
      </div>
    </Field>
  )
}

export function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 20, scale: 0.97, duration: 0.35, stagger: 0.08 })
  return (
    <Field id="skills" eyebrow="Capabilities" title="Skills">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="cs-panel rounded-2xl p-6 transition-transform duration-200 ease-snap hover:-translate-y-1"
          >
            <h3 className="cs-display text-sm font-semibold text-[var(--cs-accent)]">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--cs-line)] px-3 py-1 text-xs text-[var(--cs-ink-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Experience() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 24, scale: 0.98, duration: 0.4, stagger: 0.08 })
  return (
    <Field id="experience" eyebrow="Timeline" title="Experience">
      <div ref={ref} className="relative space-y-6 border-l border-[var(--cs-line)] pl-8">
        {experience.map((entry) => (
          <div
            key={`${entry.org}-${entry.period}`}
            className="cs-panel relative rounded-2xl p-6 transition-transform duration-200 ease-snap hover:-translate-y-1"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-7 h-2.5 w-2.5 rounded-full bg-[var(--cs-accent)]"
            />
            <p className="text-xs text-[var(--cs-ink-soft)]">{entry.period}</p>
            <h3 className="cs-display mt-1 text-lg font-semibold">
              {entry.title} <span className="text-[var(--cs-ink-soft)]">· {entry.org}</span>
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-[var(--cs-ink-soft)]">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Projects() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 28, scale: 0.97, duration: 0.4, stagger: 0.08 })
  const [feature, ...rest] = projects

  return (
    <Field id="projects" eyebrow="Selected work" title="Projects">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        <ProjectCard project={feature} featured />
        {rest.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Field>
  )
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[number]
  featured?: boolean
}) {
  return (
    <article
      className={`cs-panel group relative overflow-hidden rounded-3xl p-7 transition-transform duration-200 ease-snap hover:-translate-y-1 ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="cs-display text-2xl font-semibold">{project.name}</h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-[var(--cs-line)] px-3 py-1 text-xs transition-colors duration-150 ease-snap group-hover:border-[var(--cs-accent)] group-hover:text-[var(--cs-accent)]"
          >
            Repo →
          </a>
        )}
      </div>
      {project.status && (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-[var(--cs-accent)]">
          {project.status}
        </p>
      )}
      <p className="mt-3 max-w-2xl text-[var(--cs-ink-soft)]">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-[var(--cs-line)] px-3 py-1 text-xs text-[var(--cs-ink-soft)]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Certifications() {
  const ref = useStaggerReveal<HTMLUListElement>({ y: 14, scale: 0.98, duration: 0.28, stagger: 0.03 })
  return (
    <Field id="certifications" eyebrow="Verified" title="Certifications">
      <ul ref={ref} className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <li
            key={cert}
            className="cs-panel rounded-full px-4 py-2 text-sm text-[var(--cs-ink-soft)]"
          >
            {cert}
          </li>
        ))}
      </ul>
    </Field>
  )
}

export function Education() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 20, scale: 0.98, duration: 0.32, stagger: 0.06 })
  return (
    <Field id="education" eyebrow="Foundation" title="Education">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {education.map((entry) => (
          <div key={entry.school} className="cs-panel rounded-2xl p-6">
            <h3 className="cs-display text-lg font-semibold">{entry.school}</h3>
            <p className="mt-1 text-[var(--cs-ink-soft)]">{entry.credential}</p>
            {entry.period && (
              <p className="mt-1 text-xs text-[var(--cs-ink-soft)]">{entry.period}</p>
            )}
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    } finally {
      setTimeout(() => setCopyState('idle'), 2500)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Field id="contact" eyebrow="Get in touch" title="Contact">
      <div className="cs-panel grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <CSInput id="name" label="Name" />
          <CSInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="block text-sm text-[var(--cs-ink-soft)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full rounded-xl border border-[var(--cs-line)] bg-transparent p-3 outline-none transition-colors duration-150 ease-snap focus:border-[var(--cs-accent)]"
            />
          </div>
          <MagneticButton
            as="button"
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-[var(--cs-accent)] px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </MagneticButton>
          <p role="status" aria-live="polite" className="text-sm text-[var(--cs-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-[var(--cs-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="hover:text-[var(--cs-accent)]">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="rounded-full border border-[var(--cs-line)] px-3 py-1 text-xs transition-colors duration-150 ease-snap hover:border-[var(--cs-accent)] hover:text-[var(--cs-accent)]"
            >
              {copyState === 'copied'
                ? 'Copied!'
                : copyState === 'failed'
                  ? 'Select & copy manually'
                  : 'Copy'}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copyState === 'copied' && 'Email address copied to clipboard.'}
              {copyState === 'failed' &&
                'Could not copy automatically — please select and copy the address manually.'}
            </span>
          </p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          <p>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--cs-accent)]">
              LinkedIn
            </a>
            {' · '}
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--cs-accent)]">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Field>
  )
}

function CSInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--cs-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 w-full rounded-xl border border-[var(--cs-line)] bg-transparent p-3 outline-none transition-colors duration-150 ease-snap focus:border-[var(--cs-accent)]"
      />
    </div>
  )
}
