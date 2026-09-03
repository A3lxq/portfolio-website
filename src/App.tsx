import { lazy, Suspense } from 'react'
import { ThemeProvider, useSiteTheme } from './theme/ThemeContext'
import { ThemeSwitcher } from './theme/ThemeSwitcher'

const FieldNotesSite = lazy(() => import('./themes/field-notes/Site'))
const DeclassifiedSite = lazy(() => import('./themes/declassified/Site'))
const CascadeSite = lazy(() => import('./themes/cascade/Site'))

function ActiveTheme() {
  const { theme } = useSiteTheme()
  if (theme === 'declassified') return <DeclassifiedSite />
  if (theme === 'cascade') return <CascadeSite />
  return <FieldNotesSite />
}

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-neutral-950" />}>
        <ActiveTheme />
      </Suspense>
      <ThemeSwitcher />
    </ThemeProvider>
  )
}

export default App
