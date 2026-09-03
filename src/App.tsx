import { useState } from 'react'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Certifications } from './components/sections/Certifications'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'
import { FalconHero } from './components/hero/FalconHero'
import { BootSequence } from './components/boot/BootSequence'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()
  const [booting, setBooting] = useState(true)

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 scanlines">
      {booting && <BootSequence onDone={() => setBooting(false)} />}
      <FalconHero />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
