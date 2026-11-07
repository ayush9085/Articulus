import React, { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HeroTransition } from './components/HeroTransition'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Intelligence } from './components/Intelligence'
import { BeyondServices } from './components/BeyondServices'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SpotlightTracker } from './components/SpotlightTracker'

// Lazy-load Three.js whole-website background scene
const BackgroundScene = lazy(() =>
  import('./components/BackgroundScene').then((module) => ({
    default: module.BackgroundScene,
  }))
)

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-primary-text flex flex-col font-sans selection:bg-accent-blue selection:text-white">
      {/* Interactive cursor spotlight tracking */}
      <SpotlightTracker />

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Whole-website Interactive Three.js Background Animation */}
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>

      {/* Main UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Hero />
          <HeroTransition />
          <Services />
          <Process />
          <Intelligence />
          <BeyondServices />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
