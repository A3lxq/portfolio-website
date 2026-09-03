import { profile } from '../../data/resume'

export function Footer() {
  return (
    <footer className="dc-mono border-t-2 border-[var(--dc-line)] py-6 text-center text-xs uppercase tracking-wide text-[var(--dc-ink-soft)]">
      <p>
        © {new Date().getFullYear()} {profile.name} — END OF FILE
      </p>
    </footer>
  )
}
