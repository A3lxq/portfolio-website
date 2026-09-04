import { useState, type FormEvent, type ReactNode, type PropsWithChildren } from 'react'
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

export interface ThemeKitConfig {
  /** e.g. "theme-claymorphism" — the styles.css for this theme scopes every rule under this class. */
  themeClass: string
  /** Fixed decorative layer behind everything (blobs, grid, gradient sky, grain…). Optional. */
  background?: ReactNode
  /** Extra markup inside the hero, after the CTA row (brackets, scanlines, chrome bar…). Optional. */
  heroDecoration?: ReactNode
  /** Text shown in the hero eyebrow pill. */
  eyebrow?: string
  /** When true, the hero <h1> also gets a data-text attribute for a CSS glitch/duplicate-layer trick. */
  glitchTitle?: boolean
  /** When true, the hero tracks pointer position into --px/--py CSS vars on the hero element. */
  trackPointer?: boolean
}

function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)
  return (
    <header className="t-nav-wrap sticky top-0 z-40 px-6 py-4">
      <nav aria-label="Primary" className="t-panel-sm t-nav mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="t-display text-base font-bold">
          {profile.name}
        </a>
        <ul className="t-ink-soft hidden gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="t-nav-link transition-colors">
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
            className="t-panel-sm px-4 py-2 text-xs font-semibold"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="t-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="t-panel-sm px-4 py-2 text-xs font-semibold md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="t-mobile-menu" className="t-panel-sm mx-auto mt-3 flex max-w-5xl flex-col gap-1 p-3 text-sm md:hidden">
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
    <footer className="t-ink-soft py-8 text-center text-sm">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}

function Field({ id, eyebrow, title, children }: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 18, duration: 0.3 })
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div ref={ref} className="mb-10">
          <p className="t-accent-text text-xs font-semibold uppercase tracking-widest">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="t-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function Hero({ cfg }: { cfg: ThemeKitConfig }) {
  const ref = useStaggerReveal<HTMLDivElement>({ y: 18, duration: 0.32, stagger: 0.08 })
  const pointerRef = usePointerTracking<HTMLDivElement>()
  return (
    <section
      id="top"
      aria-label="Introduction"
      ref={cfg.trackPointer ? pointerRef : undefined}
      className="t-hero relative overflow-hidden"
    >
      <div ref={ref} className="relative z-[1] mx-auto max-w-5xl px-6 pb-24 pt-24 md:pt-32">
        <div className="t-panel-sm inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold">
          <span aria-hidden="true" className="t-dot h-1.5 w-1.5 rounded-full" />
          {cfg.eyebrow ?? 'Open to opportunities'}
        </div>
        <h1
          className="t-display t-hero-title mt-6 text-5xl font-bold tracking-tight sm:text-6xl"
          data-text={cfg.glitchTitle ? profile.name : undefined}
        >
          {profile.name}
        </h1>
        <p className="t-ink-soft mt-4 max-w-xl text-lg">{profile.tagline}</p>
        <p className="t-ink-soft mt-2 text-sm">{profile.location}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeUrl.replace(/^\//, '')}`}
            download
            className="t-panel t-accent-text px-5 py-2.5"
          >
            Download résumé
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="t-panel px-5 py-2.5">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="t-panel px-5 py-2.5">
            GitHub
          </a>
          <a href="#contact" className="t-panel px-5 py-2.5">
            Contact
          </a>
        </div>
        {cfg.heroDecoration}
      </div>
    </section>
  )
}

function About() {
  const ref = useRevealOnScroll<HTMLDivElement>({ y: 16, duration: 0.28 })
  return (
    <Field id="about" eyebrow="Profile" title="About">
      <div ref={ref} className="t-panel max-w-3xl p-8">
        <p className="t-ink-soft text-lg leading-relaxed">{profile.summary}</p>
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
          <div key={group.title} className="t-panel p-6">
            <h3 className="t-display t-accent-text text-sm font-bold">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="t-panel-sm t-ink-soft px-3 py-1 text-xs">
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
          <div key={`${entry.org}-${entry.period}`} className="t-panel p-6">
            <p className="t-ink-soft text-xs">{entry.period}</p>
            <h3 className="t-display mt-1 text-lg font-bold">
              {entry.title} <span className="t-ink-soft font-normal">· {entry.org}</span>
            </h3>
            <ul className="t-ink-soft mt-2 space-y-1 text-sm">
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
          <article key={project.name} className="t-panel p-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="t-display text-lg font-bold">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="t-accent-text shrink-0 text-xs font-semibold underline"
                >
                  Repo →
                </a>
              )}
            </div>
            {project.status && <p className="t-accent-text mt-1 text-xs font-semibold">{project.status}</p>}
            <p className="t-ink-soft mt-3">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="t-panel-sm t-ink-soft px-2.5 py-1 text-xs">
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
          <li key={cert} className="t-panel-sm t-ink-soft px-4 py-2 text-sm">
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
          <div key={entry.school} className="t-panel p-6">
            <h3 className="t-display text-lg font-bold">{entry.school}</h3>
            <p className="t-ink-soft mt-1">{entry.credential}</p>
            {entry.period && <p className="t-ink-soft mt-1 text-xs">{entry.period}</p>}
          </div>
        ))}
      </div>
    </Field>
  )
}

function TInput({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="t-ink-soft block text-sm">
        {label}
      </label>
      <input id={id} name={id} type={type} required className="t-panel-sm mt-1 w-full bg-transparent p-3 text-sm outline-none" />
    </div>
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
      <div className="t-panel grid gap-8 p-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <TInput id="name" label="Name" />
          <TInput id="email" label="Email" type="email" />
          <div>
            <label htmlFor="message" className="t-ink-soft block text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="t-panel-sm mt-1 w-full bg-transparent p-3 text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="t-panel t-accent-text px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="t-ink-soft text-sm">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' && 'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="t-ink-soft space-y-2">
          <p className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            <button type="button" onClick={handleCopyEmail} className="t-panel-sm px-3 py-1 text-xs font-semibold">
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

export function buildThemeSite(cfg: ThemeKitConfig) {
  return function ThemeSite() {
    return (
      <div className={`t-root ${cfg.themeClass} min-h-screen`}>
        {cfg.background}
        <a
          href="#main"
          className="t-accent-text sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="relative z-[1]">
          <Nav />
          <main id="main" tabIndex={-1} className="relative outline-none">
            <Hero cfg={cfg} />
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
}
