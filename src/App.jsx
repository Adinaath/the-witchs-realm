import React, { Suspense, lazy } from 'react'
import './styles/global.css'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Code-split below-the-fold sections for instant initial page load
const Forest = lazy(() => import('./components/Forest'))
const AboutWitch = lazy(() => import('./components/AboutWitch'))
const Powers = lazy(() => import('./components/Powers'))
const Spellbook = lazy(() => import('./components/Spellbook'))
const Gallery = lazy(() => import('./components/Gallery'))
const FinalPortal = lazy(() => import('./components/FinalPortal'))

function MagicalDivider() {
  return (
    <div style={{ position: 'relative', padding: '0', overflow: 'hidden' }}>
      <div className="magical-divider" />
    </div>
  )
}

export default function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Global UI */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Page sections */}
      <main>
        {/* Eagerly rendered Hero for instant FCP / LCP */}
        <Hero
          onExplore={() => scrollTo('forest')}
          onLearnMore={() => scrollTo('about')}
        />

        <Suspense fallback={null}>
          <MagicalDivider />
          <Forest />
          <MagicalDivider />
          <AboutWitch />
          <MagicalDivider />
          <Powers />
          <MagicalDivider />
          <Spellbook />
          <MagicalDivider />
          <Gallery />
          <MagicalDivider />
          <FinalPortal />
        </Suspense>
      </main>
    </>
  )
}
