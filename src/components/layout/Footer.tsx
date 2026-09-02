import { profile } from '../../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <p>© {new Date().getFullYear()} {profile.name}. Built with React, TypeScript &amp; Three.js.</p>
    </footer>
  )
}
