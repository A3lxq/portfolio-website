import { useState, type FormEvent, type PropsWithChildren, type ReactNode } from 'react'
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

function Field({
  id,
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const headingRef = useRevealOnScroll<HTMLDivElement>()
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative z-[1]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div ref={headingRef} className="mb-10 flex items-baseline gap-4">
          <span className="fn-serif text-sm italic text-[var(--fn-accent)]">
            {eyebrow}
          </span>
          <h2
            id={`${id}-heading`}
            className="fn-serif text-3xl font-medium tracking-tight sm:text-4xl"
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
  const heroRef = useStaggerReveal<HTMLDivElement>({ y: 20, duration: 0.3, stagger: 0.08 })
  const pointerRef = usePointerTracking<HTMLElement>()
  const firstSentence = profile.summary.split(/(?<=[.!?])\s+/)[0]

  return (
    <section
      ref={pointerRef}
      id="top"
      aria-label="Introduction"
      className="fn-hero-glow relative z-[1] overflow-hidden"
    >
      <div
        ref={heroRef}
        className="relative z-[1] mx-auto grid max-w-5xl gap-10 px-6 pb-20 pt-24 md:grid-cols-[1.3fr_1fr] md:pt-32"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--fn-ink-soft)]">
            Portfolio — {new Date().getFullYear()}
          </p>
          <h1 className="fn-serif mt-4 text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-md text-lg text-[var(--fn-ink-soft)]">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
              download
              className="border-b border-[var(--fn-accent)] pb-0.5 text-[var(--fn-accent)] transition-opacity duration-150 ease-snap hover:opacity-70"
            >
              Download résumé
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[var(--fn-line)] pb-0.5 transition-colors duration-150 ease-snap hover:border-[var(--fn-accent)] hover:text-[var(--fn-accent)]"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[var(--fn-line)] pb-0.5 transition-colors duration-150 ease-snap hover:border-[var(--fn-accent)] hover:text-[var(--fn-accent)]"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="border-b border-[var(--fn-line)] pb-0.5 transition-colors duration-150 ease-snap hover:border-[var(--fn-accent)] hover:text-[var(--fn-accent)]"
            >
              Contact
            </a>
          </div>
        </div>
        <blockquote className="fn-serif fn-breathe-border border-l-2 border-[var(--fn-accent)] pl-6 text-xl italic leading-relaxed text-[var(--fn-ink-soft)] md:mt-4">
          “{firstSentence}”
        </blockquote>
      </div>
    </section>
  )
}

export function About() {
  const ref = useRevealOnScroll<HTMLDivElement>()
  const sentences = profile.summary.split(/(?<=[.!?])\s+/)
  const rest = sentences.slice(1).join(' ')

  return (
    <Field id="about" eyebrow="01" title="About">
      <div ref={ref} className="max-w-2xl text-lg leading-relaxed text-[var(--fn-ink-soft)]">
        <p>{rest}</p>
        <p className="mt-4 text-sm">{profile.location}</p>
      </div>
    </Field>
  )
}

export function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>()
  return (
    <Field id="skills" eyebrow="02" title="Skills">
      <div ref={ref} className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="border-t border-[var(--fn-line)] pt-4">
            <h3 className="fn-serif text-sm italic text-[var(--fn-accent)]">
              {group.title}
            </h3>
            <p className="mt-2 text-[var(--fn-ink-soft)]">{group.items.join(', ')}</p>
          </div>
        ))}
      </div>
    </Field>
  )
}

export function Experience() {
  const ref = useStaggerReveal<HTMLDivElement>()
  return (
    <Field id="experience" eyebrow="03" title="Experience">
      <div ref={ref} className="divide-y divide-[var(--fn-line)]">
        {experience.map((entry) => (
          <div key={`${entry.org}-${entry.period}`} className="grid gap-1 py-6 sm:grid-cols-[10rem_1fr]">
            <p className="text-sm text-[var(--fn-ink-soft)]">{entry.period}</p>
            <div>
              <h3 className="fn-serif text-xl">
                {entry.title} <span className="text-[var(--fn-ink-soft)]">· {entry.org}</span>
              </h3>
              <ul className="mt-2 space-y-1 text-[var(--fn-ink-soft)]">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
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
  const ref = useStaggerReveal<HTMLDivElement>({ y: 20 })
  const [feature, ...rest] = projects

  return (
    <Field id="projects" eyebrow="04" title="Projects">
      <div ref={ref} className="space-y-12">
        <ProjectRow project={feature} featured />
        <div className="grid gap-10 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </div>
    </Field>
  )
}

function ProjectRow({
  project,
  featured = false,
}: {
  project: (typeof projects)[number]
  featured?: boolean
}) {
  return (
    <article className={featured ? 'border-t border-[var(--fn-line)] pt-6' : ''}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className={featured ? 'fn-serif text-2xl' : 'fn-serif text-xl'}>
          {project.name}
        </h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="border-b border-[var(--fn-accent)] text-sm text-[var(--fn-accent)] transition-opacity duration-150 ease-snap hover:opacity-70"
          >
            Repo →
          </a>
        )}
      </div>
      {project.status && (
        <p className="mt-1 text-xs uppercase tracking-wide text-[var(--fn-accent)]">
          {project.status}
        </p>
      )}
      <p className="mt-2 text-[var(--fn-ink-soft)]">{project.description}</p>
      <p className="mt-3 text-sm text-[var(--fn-ink-soft)]">{project.tags.join(' · ')}</p>
    </article>
  )
}

export function Certifications() {
  const ref = useRevealOnScroll<HTMLParagraphElement>()
  return (
    <Field id="certifications" eyebrow="05" title="Certifications">
      <p ref={ref} className="max-w-3xl leading-loose text-[var(--fn-ink-soft)]">
        {certifications.join('  ·  ')}
      </p>
    </Field>
  )
}

export function Education() {
  const ref = useStaggerReveal<HTMLDivElement>()
  return (
    <Field id="education" eyebrow="06" title="Education">
      <div ref={ref} className="space-y-6">
        {education.map((entry) => (
          <div key={entry.school}>
            <h3 className="fn-serif text-xl">{entry.school}</h3>
            <p className="text-[var(--fn-ink-soft)]">{entry.credential}</p>
            {entry.period && (
              <p className="text-sm text-[var(--fn-ink-soft)]">{entry.period}</p>
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
    <Field id="contact" eyebrow="07" title="Contact">
      <div className="grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FieldInput id="name" label="Name" />
          <FieldInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="block text-sm text-[var(--fn-ink-soft)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full border-b border-[var(--fn-line)] bg-transparent py-1 outline-none transition-colors duration-150 ease-snap focus:border-[var(--fn-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="border-b border-[var(--fn-accent)] pb-0.5 text-sm text-[var(--fn-accent)] transition-opacity duration-150 ease-snap hover:opacity-70 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send message →'}
          </button>
          <p role="status" aria-live="polite" className="text-sm text-[var(--fn-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-[var(--fn-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="border-b border-[var(--fn-line)]"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-xs uppercase tracking-wide underline decoration-[var(--fn-line)] underline-offset-4 transition-colors duration-150 ease-snap hover:text-[var(--fn-accent)]"
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
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="border-b border-[var(--fn-line)]">
              LinkedIn
            </a>
            {' · '}
            <a href={profile.github} target="_blank" rel="noreferrer" className="border-b border-[var(--fn-line)]">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Field>
  )
}

function FieldInput({
  id,
  label,
  type = 'text',
}: {
  id: string
  label: string
  type?: string
}): ReactNode {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--fn-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 w-full border-b border-[var(--fn-line)] bg-transparent py-1 outline-none transition-colors duration-150 ease-snap focus:border-[var(--fn-accent)]"
      />
    </div>
  )
}
