import { useState } from 'react'
import { navLinks, profile } from '../../data/resume'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--fn-line)] bg-[var(--fn-bg)]/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="fn-serif text-lg italic tracking-tight">
          {profile.name}
        </a>
        <ul className="hidden gap-6 text-sm text-[var(--fn-ink-soft)] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-150 ease-snap hover:text-[var(--fn-accent)]"
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
            className="text-xs uppercase tracking-wide text-[var(--fn-ink-soft)] underline decoration-[var(--fn-line)] underline-offset-4 transition-colors duration-150 ease-snap hover:text-[var(--fn-accent)]"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="fn-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="text-xs uppercase tracking-wide text-[var(--fn-ink-soft)] md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="fn-mobile-menu"
          className="flex flex-col gap-1 border-t border-[var(--fn-line)] px-6 py-3 text-sm md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
