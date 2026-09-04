import { profile } from '../../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-[var(--sg-line)] py-8 text-center text-xs uppercase tracking-wide text-[var(--sg-ink-soft)]">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
