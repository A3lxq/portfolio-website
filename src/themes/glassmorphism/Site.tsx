import './styles.css'
import { useState, type FormEvent, type PropsWithChildren } from 'react'
import { useRevealOnScroll, useStaggerReveal } from '../../hooks/useScrollReveal'
import { usePointerTracking } from '../../hooks/usePointerTracking'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  certifications,
  education,
  experience,
  navLinks,
  profile,
  projects,
  skillGroups,
} from '../../data/resume'

const FORMSPREE_ENDPOINT = ''

function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 px-6 py-4">
      <nav aria-label="Primary" className="gl-panel-sm mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-[var(--gl-display)] text-base font-bold">
          {profile.name}
        </a>
        <ul className="hidden gap-6 text-sm text-[var(--gl-ink-soft)] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-[var(--gl-accent)]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="gl-panel-sm px-4 py-2 text-xs font-semibold"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="gl-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="gl-panel-sm px-4 py-2 text-xs font-semibold md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="gl-mobile-menu" className="gl-panel-sm mx-auto mt-3 flex max-w-5xl flex-col gap-1 p-3 text-sm md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="block py-2">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-[var(--gl-ink-soft)]">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}

function Field({
  id,
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 18, duration: 0.3 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div ref={ref} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gl-accent)]">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="mt-2 font-[var(--gl-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function Hero() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, duration: 0.32, stagger: 0.08 })
  const pointerRef = usePointerTracking<HTMLDivElement>()
  return (
    <section id="top" aria-label="Introduction" ref={pointerRef} className="gl-hero relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-5xl px-6 pb-24 pt-24 md:pt-32">
        <div className="gl-panel-sm inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--gl-accent)]" />
          Open to opportunities
        </div>
        <h1 className="mt-6 font-[var(--gl-display)] text-5xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--gl-ink-soft)]">{profile.tagline}</p>
        <p className="mt-2 text-sm text-[var(--gl-ink-soft)]">{profile.location}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="gl-panel px-5 py-2.5 text-[var(--gl-accent)]"
          >
            Download résumé
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="gl-panel px-5 py-2.5">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="gl-panel px-5 py-2.5">
            GitHub
          </a>
          <a href="#contact" className="gl-panel px-5 py-2.5">
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 16, duration: 0.28 })
  return (
    <Field id="about" eyebrow="Profile" title="About">
      <div ref={ref} className="gl-panel max-w-3xl p-8">
        <p className="text-lg leading-relaxed text-[var(--gl-ink-soft)]">{profile.summary}</p>
      </div>
    </Field>
  )
}

function Skills() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 14, duration: 0.26, stagger: 0.06 })
  return (
    <Field id="skills" eyebrow="Capabilities" title="Skills">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="gl-panel p-6">
            <h3 className="font-[var(--gl-display)] text-sm font-bold text-[var(--gl-accent)]">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="gl-panel-sm px-3 py-1 text-xs text-[var(--gl-ink-soft)]">
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

function Experience() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 16, duration: 0.28, stagger: 0.06 })
  return (
    <Field id="experience" eyebrow="Timeline" title="Experience">
      <div ref={ref} className="space-y-5">
        {experience.map((entry) => (
          <div key={`${entry.org}-${entry.period}`} className="gl-panel p-6">
            <p className="text-xs text-[var(--gl-ink-soft)]">{entry.period}</p>
            <h3 className="mt-1 font-[var(--gl-display)] text-lg font-bold">
              {entry.title} <span className="font-normal text-[var(--gl-ink-soft)]">· {entry.org}</span>
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--gl-ink-soft)]">
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

function Projects() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, duration: 0.28, stagger: 0.06 })
  return (
    <Field id="projects" eyebrow="Selected work" title="Projects">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="gl-panel p-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-[var(--gl-display)] text-lg font-bold">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-semibold text-[var(--gl-accent)] underline"
                >
                  Repo →
                </a>
              )}
            </div>
            {project.status && <p className="mt-1 text-xs font-semibold text-[var(--gl-accent)]">{project.status}</p>}
            <p className="mt-3 text-[var(--gl-ink-soft)]">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="gl-panel-sm px-2.5 py-1 text-xs text-[var(--gl-ink-soft)]">
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

function Certifications() {
  const ref = useStaggerReveal<HTMLUListElement>({ y: 10, duration: 0.22, stagger: 0.03 })
  return (
    <Field id="certifications" eyebrow="Verified" title="Certifications">
      <ul ref={ref} className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <li key={cert} className="gl-panel-sm px-4 py-2 text-sm text-[var(--gl-ink-soft)]">
            {cert}
          </li>
        ))}
      </ul>
    </Field>
  )
}

function Education() {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 14, duration: 0.26, stagger: 0.06 })
  return (
    <Field id="education" eyebrow="Foundation" title="Education">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {education.map((entry) => (
          <div key={entry.school} className="gl-panel p-6">
            <h3 className="font-[var(--gl-display)] text-lg font-bold">{entry.school}</h3>
            <p className="mt-1 text-[var(--gl-ink-soft)]">{entry.credential}</p>
            {entry.period && <p className="mt-1 text-xs text-[var(--gl-ink-soft)]">{entry.period}</p>}
          </div>
        ))}
      </div>
    </Field>
  )
}

function Contact() {
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
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Field id="contact" eyebrow="Get in touch" title="Contact">
      <div className="gl-panel grid gap-8 p-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <GLInput id="name" label="Name" />
          <GLInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="block text-sm text-[var(--gl-ink-soft)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="gl-panel-sm mt-1 w-full bg-transparent p-3 text-sm outline-none"
            />
          </div>
          <button type="submit" disabled={status === 'sending'} className="gl-panel px-5 py-2.5 text-sm font-semibold text-[var(--gl-accent)] disabled:opacity-50">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="text-sm text-[var(--gl-ink-soft)]">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-[var(--gl-ink-soft)]">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            <button type="button" onClick={handleCopyEmail} className="gl-panel-sm px-3 py-1 text-xs font-semibold">
              {copyState === 'copied' ? 'Copied!' : copyState === 'failed' ? 'Select & copy manually' : 'Copy'}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copyState === 'copied' && 'Email address copied to clipboard.'}
              {copyState === 'failed' && 'Could not copy automatically — please select and copy the address manually.'}
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

function GLInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--gl-ink-soft)]">
        {label}
      </label>
      <input id={id} name={id} type={type} required className="gl-panel-sm mt-1 w-full bg-transparent p-3 text-sm outline-none" />
    </div>
  )
}

export default function Site() {
  return (
    <div className="gl-root min-h-screen">
      <div className="gl-backdrop" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--gl-accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="gl-content">
        <Nav />
        <main id="main" tabIndex={-1} className="relative outline-none">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
