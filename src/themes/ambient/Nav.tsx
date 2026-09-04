import { useState } from 'react'
import { navLinks, profile } from '../../data/resume'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--am-line)] bg-[var(--am-bg)]/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="am-display text-base font-semibold">
          {profile.name}
        </a>
        <ul className="hidden gap-6 text-sm text-[var(--am-ink-soft)] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-150 ease-snap hover:text-[var(--am-accent)]"
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
            className="am-card rounded-full px-4 py-1.5 text-xs text-[var(--am-ink-soft)] transition-transform duration-150 hover:scale-105"
            style={{ transitionTimingFunction: 'var(--am-ease)' }}
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="am-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="am-card rounded-full px-4 py-1.5 text-xs md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="am-mobile-menu"
          className="flex flex-col gap-1 border-t border-[var(--am-line)] px-6 py-3 text-sm md:hidden"
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
