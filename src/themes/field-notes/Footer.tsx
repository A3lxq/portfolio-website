import { profile } from '../../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-[var(--fn-line)] py-8 text-center text-sm text-[var(--fn-ink-soft)]">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
