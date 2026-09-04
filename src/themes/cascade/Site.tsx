import './styles.css'
import { Nav } from './Nav'
import { Footer } from './Footer'
import {
  About,
  Certifications,
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
} from './sections'

export default function Site() {
  return (
    <div className="cs-root min-h-screen">
      <div aria-hidden="true" className="cs-photo-mesh" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--cs-accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="relative outline-none">
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
