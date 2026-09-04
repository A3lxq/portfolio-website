import { profile } from '../../data/resume'

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[var(--am-line)] py-8 text-center text-sm text-[var(--am-ink-soft)]">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
