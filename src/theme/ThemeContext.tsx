import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

export type ThemeName = 'field-notes' | 'declassified' | 'cascade'

export const THEME_ORDER: ThemeName[] = ['field-notes', 'declassified', 'cascade']
export const THEME_LABELS: Record<ThemeName, string> = {
  'field-notes': 'Field Notes',
  declassified: 'Declassified',
  cascade: 'Cascade',
}

const STORAGE_KEY = 'site-theme'

const ThemeStateContext = createContext<{
  theme: ThemeName
  cycle: () => void
} | null>(null)

function readStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'field-notes'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return (THEME_ORDER as string[]).includes(stored ?? '')
    ? (stored as ThemeName)
    : 'field-notes'
}

/**
 * Which of the three fully independent site designs is active. Field Notes
 * is the default first impression; Declassified and Cascade are reached
 * only via the hidden ThemeSwitcher control. Persists across visits.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeName>(readStoredTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function cycle() {
    setTheme((current) => {
      const idx = THEME_ORDER.indexOf(current)
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length]
    })
  }

  return (
    <ThemeStateContext.Provider value={{ theme, cycle }}>
      {children}
    </ThemeStateContext.Provider>
  )
}

export function useSiteTheme() {
  const ctx = useContext(ThemeStateContext)
  if (!ctx) throw new Error('useSiteTheme must be used within ThemeProvider')
  return ctx
}
