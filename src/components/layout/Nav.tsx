import { navLinks, profile } from '../../data/resume'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Nav() {
  const { isDark, toggle } = useDarkMode()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/80">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <a
          href="#top"
          className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          {profile.name}
        </a>
        <ul className="hidden gap-6 text-sm text-neutral-600 md:flex dark:text-neutral-300">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  )
}
