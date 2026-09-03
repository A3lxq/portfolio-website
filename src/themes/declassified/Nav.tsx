import { useState } from 'react'
import { navLinks, profile } from '../../data/resume'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Nav() {
  const { isDark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--dc-line)] bg-[var(--dc-bg)]/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
      >
        <a href="#top" className="dc-mono text-sm font-bold uppercase tracking-wide">
          {profile.name}
        </a>
        <ul className="dc-mono hidden gap-5 text-xs uppercase tracking-wide md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-100 hover:text-[var(--dc-accent)]"
              >
                [{link.label}]
              </a>
            </li>
          ))}
        </ul>
        <div className="dc-mono flex items-center gap-3 text-xs uppercase tracking-wide">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="border border-[var(--dc-line)] px-2 py-1 transition-colors duration-100 hover:bg-[var(--dc-accent)] hover:text-[var(--dc-bg)]"
          >
            {isDark ? 'LT' : 'DK'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="dc-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="border border-[var(--dc-line)] px-2 py-1 md:hidden"
          >
            {open ? 'X' : '≡'}
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="dc-mobile-menu"
          className="dc-mono flex flex-col gap-1 border-t-2 border-[var(--dc-line)] px-6 py-3 text-xs uppercase tracking-wide md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="block py-2">
                [{link.label}]
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
