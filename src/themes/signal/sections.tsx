import { useState, type FormEvent, type PropsWithChildren } from 'react'
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useScrollReveal'
import { usePointerTracking } from '../../hooks/usePointerTracking'
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from '../../data/resume'

const FORMSPREE_ENDPOINT = ''

function Brackets() {
  return (
    <>
      <span aria-hidden="true" className="sg-bracket tl" />
      <span aria-hidden="true" className="sg-bracket tr" />
      <span aria-hidden="true" className="sg-bracket bl" />
      <span aria-hidden="true" className="sg-bracket br" />
    </>
  )
}

function Field({
  id,
  index,
  title,
  children,
}: PropsWithChildren<{ id: string; index: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 16, duration: 0.28 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative z-[1]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div ref={ref} className="mb-10 flex items-baseline gap-3">
          <span className="sg-display text-xs text-[var(--sg-accent)]">
            SIG/{index}
          </span>
          <h2 id={`${id}-heading`} className="sg-display text-3xl uppercase tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export function Hero() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 20, duration: 0.32, stagger: 0.08 })
  const pointerRef = usePointerTracking<HTMLElement>()
  return (
    <section
      ref={pointerRef}
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden"
    >
      <div aria-hidden="true" className="sg-scanline" />
      <div ref={ref} className="relative z-[1] mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
        <p className="sg-display flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--sg-accent)]">
          <span aria-hidden="true" className="sg-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--sg-accent)]" />
          Signal locked — open to opportunities
        </p>
        <h1 className="sg-display mt-5 text-5xl uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-[var(--sg-ink-soft)]">{profile.tagline}</p>
        <p className="mt-2 text-sm text-[var(--sg-ink-soft)]">{profile.location}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-wide">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="rounded border border-[var(--sg-accent)] bg-[var(--sg-accent)] px-4 py-2 text-white transition-opacity duration-150 ease-snap hover:opacity-85"
          >
            Download résumé
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="sg-panel rounded px-4 py-2 transition-colors duration-150 ease-snap hover:text-[var(--sg-accent)]"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="sg-panel rounded px-4 py-2 transition-colors duration-150 ease-snap hover:text-[var(--sg-accent)]"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="sg-panel rounded px-4 py-2 transition-colors duration-150 ease-snap hover:text-[var(--sg-accent)]"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

export function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 16, duration: 0.28 })
  return (
    <Field id="about" index="02" title="About">
      <div ref={ref} className="sg-panel relative max-w-3xl rounded-lg p-8">
        <Brackets />
        <p className="text-lg leading-relaxed text-[var(--sg-ink-soft)]">{profile.summary}</p>
      </div>
    </Field>
  )
}

export function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 14, duration: 0.24, stagger: 0.06 })
  return (
    <Field id="skills" index="03" title="Skills">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="sg-panel relative rounded-lg p-5">
            <Brackets />
            <h3 className="sg-display text-xs uppercase tracking-widest text-[var(--sg-accent-2)]">
              {group.title}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-[var(--sg-ink-soft)]">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--sg-accent)]" />
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
  const ref = useStaggerReveal<HTMLDivElement>({ y: 16, duration: 0.26, stagger: 0.06 })
  return (
    <Field id="experience" index="04" title="Experience">
      <div ref={ref} className="space-y-4">
        {experience.map((entry, i) => (
          <div key={`${entry.org}-${entry.period}`} className="sg-panel relative rounded-lg p-6">
            <Brackets />
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="sg-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--sg-accent)]"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <p className="text-xs uppercase tracking-wide text-[var(--sg-ink-soft)]">{entry.period}</p>
            </div>
            <h3 className="sg-display mt-2 text-lg uppercase tracking-tight">
              {entry.title} <span className="text-[var(--sg-ink-soft)]">— {entry.org}</span>
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--sg-ink-soft)]">
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
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, duration: 0.26, stagger: 0.06 })
  return (
    <Field id="projects" index="05" title="Projects">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="sg-panel group relative rounded-lg p-6 transition-colors duration-150 ease-snap hover:border-[var(--sg-accent)]"
          >
            <Brackets />
            <div className="flex items-start justify-between gap-2">
              <h3 className="sg-display text-base uppercase tracking-tight">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs uppercase text-[var(--sg-accent)] underline"
                >
                  Repo
                </a>
              )}
            </div>
            {project.status && (
              <p className="mt-1 text-xs uppercase tracking-wide text-[var(--sg-accent-2)]">
                {project.status}
              </p>
            )}
            <p className="mt-3 text-sm text-[var(--sg-ink-soft)]">{project.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-[var(--sg-line)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--sg-ink-soft)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Field>
  )
}

export function Certifications() {
  const ref = useStaggerReveal<HTMLUListElement>({ y: 10, duration: 0.2, stagger: 0.03 })
  return (
    <Field id="certifications" index="06" title="Certifications">
      <ul ref={ref} className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <li
            key={cert}
            className="sg-panel rounded px-3 py-1.5 text-xs text-[var(--sg-ink-soft)]"
          >
            {cert}
          </li>
        ))}
      </ul>
    </Field>
  )
}

export function Education() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 14, duration: 0.24, stagger: 0.06 })
  return (
    <Field id="education" index="07" title="Education">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {education.map((entry) => (
          <div key={entry.school} className="sg-panel relative rounded-lg p-5">
            <Brackets />
            <h3 className="sg-display text-sm uppercase tracking-tight">{entry.school}</h3>
            <p className="mt-1 text-sm text-[var(--sg-ink-soft)]">{entry.credential}</p>
            {entry.period && (
              <p className="mt-1 text-xs text-[var(--sg-ink-soft)]">{entry.period}</p>
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
    <Field id="contact" index="08" title="Contact">
      <div className="sg-panel relative grid gap-8 rounded-lg p-8 md:grid-cols-2">
        <Brackets />
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <SGInput id="name" label="Name" />
          <SGInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wide text-[var(--sg-ink-soft)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full rounded border border-[var(--sg-line)] bg-transparent p-2 text-sm outline-none focus:border-[var(--sg-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded border border-[var(--sg-accent)] bg-[var(--sg-accent)] px-4 py-2 text-xs uppercase tracking-wide text-white transition-opacity duration-150 ease-snap hover:opacity-85 disabled:opacity-50"
          >
            {status === 'sending' ? 'Transmitting…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="text-sm normal-case text-[var(--sg-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-sm text-[var(--sg-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="rounded border border-[var(--sg-line)] px-2 py-0.5 text-xs uppercase tracking-wide transition-colors duration-150 ease-snap hover:border-[var(--sg-accent)] hover:text-[var(--sg-accent)]"
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
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline">
              LinkedIn
            </a>
            {' · '}
            <a href={profile.github} target="_blank" rel="noreferrer" className="underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Field>
  )
}

function SGInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wide text-[var(--sg-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 w-full rounded border border-[var(--sg-line)] bg-transparent p-2 text-sm outline-none focus:border-[var(--sg-accent)]"
      />
    </div>
  )
}
