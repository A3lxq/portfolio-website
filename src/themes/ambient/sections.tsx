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

function Field({
  id,
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 20, scale: 0.98, duration: 0.4 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative z-[1]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div ref={ref} className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--am-accent)]">
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="am-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export function Hero() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, scale: 0.98, duration: 0.4, stagger: 0.09 })
  const pointerRef = usePointerTracking<HTMLElement>()
  return (
    <section ref={pointerRef} id="top" aria-label="Introduction" className="relative overflow-hidden">
      <div aria-hidden="true" className="am-blob" />
      <div ref={ref} className="relative z-[1] mx-auto max-w-3xl px-6 pb-20 pt-24 md:pt-32">
        <div className="am-card am-bubble p-8 shadow-sm sm:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--am-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--am-accent)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--am-accent)]" />
            Open to opportunities
          </p>
          <h1 className="am-display mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--am-ink-soft)]">{profile.tagline}</p>
          <p className="mt-2 text-sm text-[var(--am-ink-soft)]">{profile.location}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="rounded-full bg-[var(--am-accent)] px-5 py-2.5 text-sm font-medium text-white transition-transform duration-150 hover:scale-105"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            Download résumé
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="am-card rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-150 hover:scale-105"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="am-card rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-150 hover:scale-105"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="am-card rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-150 hover:scale-105"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

export function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 16, scale: 0.98, duration: 0.35 })
  return (
    <Field id="about" eyebrow="Profile" title="About">
      <div ref={ref} className="am-card am-bubble max-w-2xl p-7">
        <p className="text-lg leading-relaxed text-[var(--am-ink-soft)]">{profile.summary}</p>
      </div>
    </Field>
  )
}

export function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 16, scale: 0.97, duration: 0.32, stagger: 0.07 })
  return (
    <Field id="skills" eyebrow="Capabilities" title="Skills">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="am-card p-6">
            <h3 className="am-display text-sm font-semibold text-[var(--am-accent)]">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-[var(--am-accent-2)]/10 px-3 py-1 text-xs text-[var(--am-ink-soft)]"
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
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, scale: 0.97, duration: 0.34, stagger: 0.07 })
  return (
    <Field id="experience" eyebrow="Timeline" title="Experience">
      <div ref={ref} className="space-y-4">
        {experience.map((entry) => (
          <div key={`${entry.org}-${entry.period}`} className="am-card p-6">
            <p className="text-xs text-[var(--am-ink-soft)]">{entry.period}</p>
            <h3 className="am-display mt-1 text-lg font-semibold">
              {entry.title} <span className="text-[var(--am-ink-soft)]">· {entry.org}</span>
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--am-ink-soft)]">
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
  const ref = useStaggerReveal<HTMLDivElement>({ y: 20, scale: 0.97, duration: 0.34, stagger: 0.07 })
  const [feature, ...rest] = projects
  return (
    <Field id="projects" eyebrow="Selected work" title="Projects">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
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
      className={`am-card p-6 transition-transform duration-150 hover:-translate-y-1 ${featured ? 'sm:col-span-2' : ''}`}
      style={{ transitionTimingFunction: 'var(--am-ease)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="am-display text-xl font-semibold">{project.name}</h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-[var(--am-accent)]/10 px-3 py-1 text-xs text-[var(--am-accent)]"
          >
            Repo →
          </a>
        )}
      </div>
      {project.status && (
        <p className="mt-2 text-xs font-medium text-[var(--am-accent-2)]">{project.status}</p>
      )}
      <p className="mt-3 text-[var(--am-ink-soft)]">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-[var(--am-accent-2)]/10 px-3 py-1 text-xs text-[var(--am-ink-soft)]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Certifications() {
  const ref = useStaggerReveal<HTMLUListElement>({ y: 12, scale: 0.98, duration: 0.28, stagger: 0.03 })
  return (
    <Field id="certifications" eyebrow="Verified" title="Certifications">
      <ul ref={ref} className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <li key={cert} className="am-card rounded-full px-4 py-2 text-sm text-[var(--am-ink-soft)]">
            {cert}
          </li>
        ))}
      </ul>
    </Field>
  )
}

export function Education() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 16, scale: 0.98, duration: 0.3, stagger: 0.06 })
  return (
    <Field id="education" eyebrow="Foundation" title="Education">
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {education.map((entry) => (
          <div key={entry.school} className="am-card p-6">
            <h3 className="am-display text-lg font-semibold">{entry.school}</h3>
            <p className="mt-1 text-[var(--am-ink-soft)]">{entry.credential}</p>
            {entry.period && <p className="mt-1 text-xs text-[var(--am-ink-soft)]">{entry.period}</p>}
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
      <div className="am-card grid gap-8 p-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <AMInput id="name" label="Name" />
          <AMInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="block text-sm text-[var(--am-ink-soft)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full rounded-2xl border border-[var(--am-line)] bg-transparent p-3 text-sm outline-none focus:border-[var(--am-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-[var(--am-accent)] px-5 py-2.5 text-sm font-medium text-white transition-transform duration-150 hover:scale-105 disabled:opacity-50"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="text-sm text-[var(--am-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-[var(--am-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="hover:text-[var(--am-accent)]">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="rounded-full bg-[var(--am-accent)]/10 px-3 py-1 text-xs text-[var(--am-accent)]"
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
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--am-accent)]">
              LinkedIn
            </a>
            {' · '}
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--am-accent)]">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Field>
  )
}

function AMInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--am-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 w-full rounded-2xl border border-[var(--am-line)] bg-transparent p-3 text-sm outline-none focus:border-[var(--am-accent)]"
      />
    </div>
  )
}
