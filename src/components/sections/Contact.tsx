import { useState, type FormEvent } from 'react'
import { Section } from '../layout/Section'
import { profile } from '../../data/resume'

// Set this once a Formspree form is created (https://formspree.io) to switch
// from the mailto: fallback to a real hosted POST endpoint.
const FORMSPREE_ENDPOINT = ''

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    } finally {
      setTimeout(() => setCopyState('idle'), 2500)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" title="Contact" eyebrow="./contact --secure">
      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p role="status" aria-live="polite" className="text-sm">
            {status === 'sent' &&
              (FORMSPREE_ENDPOINT
                ? 'Message sent — thank you!'
                : "Opening your email client — if nothing happens, copy the email address alongside and send it directly.")}
            {status === 'error' &&
              'Something went wrong — please email directly instead.'}
          </p>
        </form>
        <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-2"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="rounded-md border border-neutral-300 px-2 py-0.5 text-xs text-neutral-600 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              {copyState === 'copied'
                ? 'Copied!'
                : copyState === 'failed'
                  ? 'Select & copy manually'
                  : 'Copy'}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copyState === 'copied' && 'Email address copied to clipboard.'}
              {copyState === 'failed' &&
                'Could not copy automatically — please select and copy the address manually.'}
            </span>
          </p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          <p>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              LinkedIn
            </a>
            {' · '}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
