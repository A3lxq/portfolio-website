import { useState, type FormEvent, type PropsWithChildren } from 'react'
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useScrollReveal'
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from '../../data/resume'

const FORMSPREE_ENDPOINT = ''

function Cross({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`dc-cross ${className}`} />
}

function Field({
  id,
  index,
  title,
  children,
}: PropsWithChildren<{ id: string; index: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 8, duration: 0.16 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative">
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <Cross className="left-4 top-4" />
        <Cross className="right-4 top-4" />
        <div ref={ref} className="mb-10 border-b-2 border-[var(--dc-line)] pb-4">
          <p className="dc-mono text-xs uppercase tracking-widest text-[var(--dc-accent)]">
            SEC/{index}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-1 text-4xl font-black uppercase tracking-tight sm:text-5xl"
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export function Hero() {
  const topRule = useRevealOnScroll<HTMLDivElement>({ y: 0, duration: 0.01 })
  return (
    <section id="top" aria-label="Introduction" className="relative">
      <div className="dc-rule h-1 w-full bg-[var(--dc-line)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Cross className="left-4 top-4" />
        <Cross className="right-4 top-4" />
        <p ref={topRule} className="dc-mono text-xs uppercase tracking-widest text-[var(--dc-accent)]">
          FILE_01 — PERSONNEL RECORD
        </p>
        <h1 className="mt-3 break-words text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
          {profile.name}
        </h1>
        <p className="dc-mono mt-6 max-w-xl text-sm uppercase tracking-wide text-[var(--dc-ink-soft)]">
          {profile.tagline}
        </p>
        <div className="dc-mono mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-wide">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="border-2 border-[var(--dc-line)] bg-[var(--dc-accent)] px-4 py-2 text-[var(--dc-bg)] transition-opacity duration-100 hover:opacity-80"
          >
            Download résumé
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-[var(--dc-line)] px-4 py-2 transition-colors duration-100 hover:bg-[var(--dc-line)] hover:text-[var(--dc-bg)]"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-[var(--dc-line)] px-4 py-2 transition-colors duration-100 hover:bg-[var(--dc-line)] hover:text-[var(--dc-bg)]"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="border-2 border-[var(--dc-line)] px-4 py-2 transition-colors duration-100 hover:bg-[var(--dc-line)] hover:text-[var(--dc-bg)]"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="dc-rule h-1 w-full bg-[var(--dc-line)]" />
    </section>
  )
}

export function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 8, duration: 0.16 })
  return (
    <Field id="about" index="02" title="About">
      <div
        ref={ref}
        className="max-w-3xl border-l-4 border-double border-[var(--dc-accent)] pl-6 text-lg leading-relaxed text-[var(--dc-ink-soft)]"
      >
        <p>{profile.summary}</p>
        <p className="dc-mono mt-4 text-xs uppercase tracking-wide">{profile.location}</p>
      </div>
    </Field>
  )
}

export function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 8, duration: 0.16, stagger: 0.04 })
  return (
    <Field id="skills" index="03" title="Skills">
      <div ref={ref} className="divide-y-2 divide-[var(--dc-line)] border-y-2 border-[var(--dc-line)]">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-2 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
            <h3 className="dc-mono text-xs uppercase tracking-widest text-[var(--dc-accent)]">
              [{group.title}]
            </h3>
            <p className="text-[var(--dc-ink-soft)]">{group.items.join(' / ')}</p>
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Experience() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 8, duration: 0.16, stagger: 0.04 })
  return (
    <Field id="experience" index="04" title="Experience">
      <div ref={ref} className="space-y-0">
        {experience.map((entry, i) => (
          <div
            key={`${entry.org}-${entry.period}`}
            className="grid gap-2 border-t-2 border-[var(--dc-line)] py-6 sm:grid-cols-[8rem_1fr]"
          >
            <div>
              <p className="dc-mono text-xs text-[var(--dc-accent)]">
                LOG.{String(i + 1).padStart(2, '0')}
              </p>
              <p className="dc-mono mt-1 text-xs text-[var(--dc-ink-soft)]">{entry.period}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {entry.title} <span className="text-[var(--dc-ink-soft)]">/ {entry.org}</span>
              </h3>
              <ul className="mt-2 space-y-1 text-[var(--dc-ink-soft)]">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>— {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Projects() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 12, duration: 0.16, stagger: 0.05 })
  return (
    <Field id="projects" index="05" title="Projects">
      <div ref={ref} className="grid gap-0 border-y-2 border-l-2 border-[var(--dc-line)] sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="border-b-2 border-r-2 border-[var(--dc-line)] p-6"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold uppercase tracking-tight">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="dc-mono shrink-0 text-xs uppercase text-[var(--dc-accent)] underline"
                >
                  Repo
                </a>
              )}
            </div>
            {project.status && (
              <p className="dc-mono mt-1 inline-block border border-[var(--dc-accent)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--dc-accent)]">
                {project.status}
              </p>
            )}
            <p className="mt-3 text-[var(--dc-ink-soft)]">{project.description}</p>
            <p className="dc-mono mt-3 text-xs uppercase tracking-wide text-[var(--dc-ink-soft)]">
              {project.tags.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </Field>
  )
}

export function Certifications() {
  const ref = useStaggerReveal<HTMLUListElement>({ y: 6, duration: 0.14, stagger: 0.02 })
  return (
    <Field id="certifications" index="06" title="Certifications">
      <ul ref={ref} className="dc-mono grid gap-2 text-sm sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert} className="border-b border-[var(--dc-line)] py-1.5 text-[var(--dc-ink-soft)]">
            · {cert}
          </li>
        ))}
      </ul>
    </Field>
  )
}

export function Education() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 8, duration: 0.16, stagger: 0.04 })
  return (
    <Field id="education" index="07" title="Education">
      <div ref={ref} className="space-y-0">
        {education.map((entry) => (
          <div key={entry.school} className="border-t-2 border-[var(--dc-line)] py-4">
            <h3 className="text-lg font-bold uppercase tracking-tight">{entry.school}</h3>
            <p className="text-[var(--dc-ink-soft)]">{entry.credential}</p>
            {entry.period && (
              <p className="dc-mono mt-1 text-xs text-[var(--dc-ink-soft)]">{entry.period}</p>
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
      <div className="grid gap-8 border-2 border-[var(--dc-line)] p-6 md:grid-cols-2 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 dc-mono text-sm" noValidate>
          <DCInput id="name" label="NAME" />
          <DCInput id="email" label="EMAIL" type="email" />
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wide text-[var(--dc-ink-soft)]">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full border-2 border-[var(--dc-line)] bg-transparent p-2 outline-none focus:border-[var(--dc-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="border-2 border-[var(--dc-line)] bg-[var(--dc-accent)] px-4 py-2 text-xs uppercase tracking-wide text-[var(--dc-bg)] transition-opacity duration-100 hover:opacity-80 disabled:opacity-50"
          >
            {status === 'sending' ? 'TRANSMITTING…' : '[ SEND ]'}
          </button>
          <p role="status" aria-live="polite" className="text-xs normal-case text-[var(--dc-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="dc-mono space-y-2 text-sm text-[var(--dc-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="border border-[var(--dc-line)] px-2 py-0.5 text-xs uppercase tracking-wide transition-colors duration-100 hover:bg-[var(--dc-accent)] hover:text-[var(--dc-bg)]"
            >
              {copyState === 'copied'
                ? 'COPIED'
                : copyState === 'failed'
                  ? 'SELECT MANUALLY'
                  : 'COPY'}
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
            {' / '}
            <a href={profile.github} target="_blank" rel="noreferrer" className="underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Field>
  )
}

function DCInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wide text-[var(--dc-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 w-full border-2 border-[var(--dc-line)] bg-transparent p-2 outline-none focus:border-[var(--dc-accent)]"
      />
    </div>
  )
}
