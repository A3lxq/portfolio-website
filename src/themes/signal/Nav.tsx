import { useState } from 'react'
import { navLinks, profile } from '../../data/resume'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sg-line)] bg-[var(--sg-bg)]/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="sg-display text-sm font-semibold uppercase tracking-widest">
          {profile.name}
        </a>
        <ul className="hidden gap-6 text-xs uppercase tracking-wide text-[var(--sg-ink-soft)] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-150 ease-snap hover:text-[var(--sg-accent)]"
              >
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
            className="sg-panel rounded px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--sg-ink-soft)] transition-colors duration-150 ease-snap hover:text-[var(--sg-accent)]"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="sg-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="sg-panel rounded px-3 py-1.5 text-xs uppercase tracking-wide md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="sg-mobile-menu"
          className="flex flex-col gap-1 border-t border-[var(--sg-line)] px-6 py-3 text-sm md:hidden"
        >
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
