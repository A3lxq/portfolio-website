import { lazy, Suspense } from 'react'

const THEME_ORDER = [
  'field-notes',
  'declassified',
  'cascade',
  'signal',
  'ambient',
  'neumorphism',
  'glassmorphism',
  'claymorphism',
  'retro-futurism',
  'neubrutalism',
  'bento',
  'y2k',
  'memphis',
  'vaporwave',
  'swiss',
  'pixel',
  'eink',
  'rawhtml',
  'rgbsplit',
  'retrofilm',
  'bauhaus',
  'biophilic',
  'maximalism',
  'kinetic',
  'spatial',
] as const
type ThemeName = (typeof THEME_ORDER)[number]
const STORAGE_KEY = 'site-theme-index'

const SITES: Record<ThemeName, ReturnType<typeof lazy>> = {
  'field-notes': lazy(() => import('./themes/field-notes/Site')),
  declassified: lazy(() => import('./themes/declassified/Site')),
  cascade: lazy(() => import('./themes/cascade/Site')),
  signal: lazy(() => import('./themes/signal/Site')),
  ambient: lazy(() => import('./themes/ambient/Site')),
  neumorphism: lazy(() => import('./themes/neumorphism/Site')),
  glassmorphism: lazy(() => import('./themes/glassmorphism/Site')),
  claymorphism: lazy(() => import('./themes/claymorphism/Site')),
  'retro-futurism': lazy(() => import('./themes/retro-futurism/Site')),
  neubrutalism: lazy(() => import('./themes/neubrutalism/Site')),
  bento: lazy(() => import('./themes/bento/Site')),
  y2k: lazy(() => import('./themes/y2k/Site')),
  memphis: lazy(() => import('./themes/memphis/Site')),
  vaporwave: lazy(() => import('./themes/vaporwave/Site')),
  swiss: lazy(() => import('./themes/swiss/Site')),
  pixel: lazy(() => import('./themes/pixel/Site')),
  eink: lazy(() => import('./themes/eink/Site')),
  rawhtml: lazy(() => import('./themes/rawhtml/Site')),
  rgbsplit: lazy(() => import('./themes/rgbsplit/Site')),
  retrofilm: lazy(() => import('./themes/retrofilm/Site')),
  bauhaus: lazy(() => import('./themes/bauhaus/Site')),
  biophilic: lazy(() => import('./themes/biophilic/Site')),
  maximalism: lazy(() => import('./themes/maximalism/Site')),
  kinetic: lazy(() => import('./themes/kinetic/Site')),
  spatial: lazy(() => import('./themes/spatial/Site')),
}

/**
 * Advances to the next theme in sequence every time the page is loaded
 * or refreshed — no button required. Persisted via localStorage so the
 * rotation continues across visits, not just within one session.
 * Evaluated once at module scope (not inside the component), so it's a
 * single deterministic pick per page load, not something that changes
 * on re-render.
 */
function getNextTheme(): ThemeName {
  if (typeof window === 'undefined') return THEME_ORDER[0]
  const stored = Number(window.localStorage.getItem(STORAGE_KEY))
  const currentIndex = Number.isInteger(stored) ? stored : -1
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length
  window.localStorage.setItem(STORAGE_KEY, String(nextIndex))
  return THEME_ORDER[nextIndex]
}

const ActiveSite = SITES[getNextTheme()]

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-neutral-950" />}>
      <ActiveSite />
    </Suspense>
  )
}

export default App
