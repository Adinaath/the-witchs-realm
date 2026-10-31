import React, { useState, useEffect, useRef } from 'react'

const LINKS = [
  { label: 'Home',      href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Powers',    href: '#powers' },
  { label: 'Spellbook', href: '#spellbook' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Contact',   href: '#portal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section with IntersectionObserver
  useEffect(() => {
    const ids = ['hero', 'forest', 'about', 'powers', 'spellbook', 'gallery', 'portal']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.25 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Web Audio synthesizer for ambient sound (no external file needed, strictly muted by default)
  const toggleAudio = () => {
    if (!audioEnabled) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx()
          audioCtxRef.current = ctx

          const masterGain = ctx.createGain()
          masterGain.gain.setValueAtTime(0.08, ctx.currentTime)
          masterGain.connect(ctx.destination)
          gainNodeRef.current = masterGain

          // Deep ambient drone oscillator (low E ~41.2 Hz)
          const osc1 = ctx.createOscillator()
          osc1.type = 'sine'
          osc1.frequency.setValueAtTime(41.2, ctx.currentTime)

          // Soft resonant harmonic (B ~123.5 Hz)
          const osc2 = ctx.createOscillator()
          osc2.type = 'sine'
          osc2.frequency.setValueAtTime(123.47, ctx.currentTime)

          // Low-pass filter for velvety magical warmth
          const filter = ctx.createBiquadFilter()
          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(320, ctx.currentTime)

          const oscGain = ctx.createGain()
          oscGain.gain.setValueAtTime(0.4, ctx.currentTime)

          osc1.connect(filter)
          osc2.connect(filter)
          filter.connect(oscGain)
          oscGain.connect(masterGain)

          osc1.start()
          osc2.start()
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume()
        }
        setAudioEnabled(true)
      } catch (err) {
        console.warn('Audio setup:', err)
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend()
      }
      setAudioEnabled(false)
    }
  }

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled
            ? 'rgba(9, 7, 17, 0.88)'
            : 'linear-gradient(180deg, rgba(9, 7, 17, 0.8) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(181, 106, 255, 0.18)' : '1px solid transparent',
          padding: scrolled ? '14px 0' : '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-3 group"
            aria-label="The Witch's Realm — Return to Top"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(181,106,255,0.25) 0%, transparent 70%)',
                border: '1px solid rgba(181,106,255,0.4)',
                boxShadow: '0 0 12px rgba(181,106,255,0.5)',
              }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
                  stroke="#b56aff"
                  strokeWidth="1.6"
                  fill="rgba(181,106,255,0.2)"
                />
                <polygon points="17 4 18 7 21 8 18 9 17 12 16 9 13 8 16 7" fill="#ffffff" />
              </svg>
            </div>
            <span
              className="font-cinzel text-sm sm:text-base font-bold tracking-widest"
              style={{
                color: '#ffffff',
                letterSpacing: '0.22em',
                textShadow: '0 0 15px rgba(181, 106, 255, 0.6)',
              }}
            >
              THE WITCH
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              const isActive = activeSection === id
              return (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--bright-purple)' : 'var(--text-secondary)',
                    position: 'relative',
                    padding: '6px 2px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    textShadow: isActive ? '0 0 12px rgba(181,106,255,0.7)' : 'none',
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '15%',
                        right: '15%',
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, var(--bright-purple), transparent)',
                        boxShadow: '0 0 8px var(--bright-purple)',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </button>
              )
            })}

            {/* Ambient Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              style={{
                background: audioEnabled ? 'rgba(181,106,255,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${audioEnabled ? 'rgba(181,106,255,0.5)' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: '20px',
                padding: '6px 14px',
                color: audioEnabled ? 'var(--soft-lavender)' : 'var(--text-secondary)',
                fontSize: '11px',
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: audioEnabled ? '0 0 15px rgba(181,106,255,0.4)' : 'none',
                transition: 'all 0.3s ease',
              }}
              title={audioEnabled ? 'Mute ambient sound' : 'Enable ambient magical sound'}
              aria-label={audioEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {audioEnabled ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )}
              <span className="hidden lg:inline">{audioEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleAudio}
              style={{
                background: 'none',
                border: 'none',
                color: audioEnabled ? 'var(--bright-purple)' : 'var(--soft-lavender)',
                padding: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle sound"
            >
              {audioEnabled ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )}
            </button>

            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: 24,
                    height: 2,
                    borderRadius: 1,
                    background: mobileOpen && i === 1 ? 'transparent' : 'var(--bright-purple)',
                    boxShadow: '0 0 8px rgba(181,106,255,0.6)',
                    transition: 'all 0.3s ease',
                    transform: mobileOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 2
                        ? 'rotate(-45deg) translate(5px, -5px)'
                        : 'none'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-menu${mobileOpen ? '' : ' hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 890,
          background: 'rgba(9, 7, 17, 0.96)',
          backdropFilter: 'blur(20px)',
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 24,
        }}
      >
        {LINKS.map(({ label, href }) => {
          const id = href.replace('#', '')
          const isActive = activeSection === id
          return (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Cinzel, serif',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--bright-purple)' : 'var(--text-primary)',
                textShadow: isActive ? '0 0 15px rgba(181,106,255,0.8)' : 'none',
                cursor: 'pointer',
                padding: '8px 16px',
              }}
            >
              {label}
            </button>
          )
        })}

        <div style={{ marginTop: 24, color: 'var(--bright-purple)', fontSize: 24, opacity: 0.6 }}>
          ✦
        </div>
      </div>
    </>
  )
}
