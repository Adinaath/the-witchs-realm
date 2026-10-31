import React, { useEffect, useRef, useState, useCallback } from 'react'
import MagicOrb from '../three/MagicOrb'

// Atmospheric floating particles
const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 7 + 4,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.6 + 0.3,
  color: i % 3 === 0 ? '#d8b7ff' : i % 2 === 0 ? '#b56aff' : '#ffffff',
  depth: i % 3 === 0 ? 3 : 5,
}))

export default function Hero({ onExplore, onLearnMore }) {
  const heroRef = useRef(null)
  const bgImgRef = useRef(null)
  const orbContainerRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const [loaded, setLoaded] = useState(false)
  const [burstActive, setBurstActive] = useState(false)
  const [orbCoords, setOrbCoords] = useState(null)
  const [orbDiameter, setOrbDiameter] = useState(96)

  // Calculate the exact pixel location of the witch's hand holding the orb in the rendered image
  const updateOrbPosition = useCallback(() => {
    if (!heroRef.current) return
    const w = heroRef.current.clientWidth
    const h = heroRef.current.clientHeight
    const imgAspect = 2752 / 1536 // Aspect ratio of hero-witch-scene.webp
    const containerAspect = w / h

    // Exact normalized center of the glowing orb in hero-witch-scene.webp:
    // X = 1704 / 2752 ≈ 0.6192
    // Y = 560 / 1536 ≈ 0.3646
    const ORB_NATURAL_X = 0.6192
    const ORB_NATURAL_Y = 0.3646

    let renderedW, renderedH, imgLeft, imgTop

    if (containerAspect > imgAspect) {
      // Ultra-wide: image fills width, letterboxed/centered vertically
      renderedW = w
      renderedH = w / imgAspect
      imgLeft = 0
      imgTop = (h - renderedH) / 2
    } else {
      // Standard desktop, tablet, mobile: image fills height, right-aligned (object-position: right center)
      renderedH = h
      renderedW = h * imgAspect
      imgLeft = w - renderedW
      imgTop = 0
    }

    const orbX = imgLeft + renderedW * ORB_NATURAL_X
    const orbY = imgTop + renderedH * ORB_NATURAL_Y

    // Diameter natural proportion: ~6.2% of rendered height, clamped between 72px and 115px
    const diameter = Math.max(72, Math.min(115, Math.round(renderedH * 0.062)))

    setOrbCoords({ x: orbX, y: orbY })
    setOrbDiameter(diameter)
  }, [])

  useEffect(() => {
    updateOrbPosition()
    window.addEventListener('resize', updateOrbPosition)
    return () => window.removeEventListener('resize', updateOrbPosition)
  }, [updateOrbPosition])

  // Gentle mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseRef.current = { x, y }

      const offsetX = (x - 0.5) * 16
      const offsetY = (y - 0.5) * 12

      if (bgImgRef.current) {
        bgImgRef.current.style.transform = `scale(1.02) translate(${offsetX * -0.3}px, ${offsetY * -0.2}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    const timer = setTimeout(() => {
      setLoaded(true)
      updateOrbPosition()
    }, 120)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [updateOrbPosition])

  const triggerOrbBurst = () => {
    setBurstActive(true)
    setTimeout(() => setBurstActive(false), 900)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section"
      aria-label="The Witch's Realm — The Awakening"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#090711',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 1. MASTER CINEMATIC HERO SCENE (Gemini Generated 2752x1536) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <img
          ref={bgImgRef}
          src="/images/cinematic/hero-witch-scene.webp"
          alt="The Witch conjuring ethereal purple light deep within the ancient forest"
          onLoad={updateOrbPosition}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'right center',
            filter: 'contrast(1.08) brightness(0.96) saturate(1.1)',
            transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.4, 1), opacity 1.2s ease',
            opacity: loaded ? 1 : 0,
            pointerEvents: 'none',
          }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Left Dark Gradient Overlay — ensures crystal clear readable typography */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #090711 0%, rgba(9,7,17,0.96) 28%, rgba(9,7,17,0.72) 48%, rgba(9,7,17,0.2) 72%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Top & Bottom Vignettes — seamless section integration */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(9,7,17,0.75) 0%, transparent 15%, transparent 75%, #090711 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Ambient Purple Light Overlay on right side */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '60%',
            background:
              'radial-gradient(ellipse at 75% 45%, rgba(141,67,214,0.18) 0%, transparent 65%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>

      {/* 2. ATMOSPHERIC FLOATING PARTICLES */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            zIndex: p.depth,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      ))}

      {/* 3. 3D INTERACTIVE THREE.JS MAGIC ORB (Calculated to sit directly on the Witch's Hand) */}
      <div
        ref={orbContainerRef}
        className="hero-orb-interactive"
        style={{
          position: 'absolute',
          left: orbCoords ? `${orbCoords.x}px` : '62%',
          top: orbCoords ? `${orbCoords.y}px` : '36.5%',
          width: `${orbDiameter}px`,
          height: `${orbDiameter}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 8,
          cursor: 'pointer',
          borderRadius: '50%',
        }}
        onClick={triggerOrbBurst}
        title="Click the magic orb to release its power!"
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D magic orb"
      >
        <MagicOrb
          containerRef={orbContainerRef}
          mouseRef={mouseRef}
          onBurst={triggerOrbBurst}
        />

        {/* Ambient Pulsing Aura Behind 3D Orb */}
        <div
          style={{
            position: 'absolute',
            inset: '-15%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,155,255,0.75) 0%, rgba(141,67,214,0.45) 45%, rgba(75,28,120,0.1) 70%, transparent 100%)',
            filter: 'blur(10px)',
            animation: 'pulse-glow 3s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: -1,
          }}
          aria-hidden="true"
        />

        {/* Click Burst Shockwave Ripple */}
        {burstActive && (
          <div
            style={{
              position: 'absolute',
              inset: '-50%',
              borderRadius: '50%',
              border: '2px solid rgba(201,155,255,0.95)',
              boxShadow: '0 0 35px rgba(181,106,255,0.95)',
              animation: 'pulse-glow 0.8s ease-out forwards',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* 4. MAIN CONTENT CONTAINER (TYPOGRAPHY ON LEFT) */}
      <div
        className="max-w-7xl mx-auto px-6 w-full relative z-10 flex items-center min-h-screen py-24"
        style={{ position: 'relative' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* LEFT SIDE: TYPOGRAPHY & BUTTONS (6 cols) */}
          <div
            className="lg:col-span-6 xl:col-span-6 relative z-20"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition:
                'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Small Eyebrow: SPELLS • SECRETS • STORIES */}
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(181,106,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bright-purple)',
                  fontSize: 14,
                  boxShadow: '0 0 15px rgba(181,106,255,0.3)',
                  animation: 'rotate-slow 20s linear infinite',
                }}
              >
                ✦
              </div>
              <span
                className="font-cinzel text-xs tracking-widest uppercase font-semibold"
                style={{
                  color: 'var(--soft-lavender)',
                  letterSpacing: '0.3em',
                  textShadow: '0 0 12px rgba(181,106,255,0.5)',
                }}
              >
                SPELLS • SECRETS • STORIES
              </span>
            </div>

            {/* Main Title: The Witch */}
            <div style={{ marginBottom: 20 }}>
              <div
                className="font-cormorant italic"
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                  lineHeight: 1.0,
                  color: '#e4ccff',
                  letterSpacing: '0.04em',
                  textShadow: '0 0 25px rgba(181,106,255,0.6)',
                }}
              >
                The
              </div>
              <h1
                className="font-cinzel relative"
                style={{
                  fontSize: 'clamp(4rem, 8.5vw, 7.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #ecd6ff 30%, #b56aff 75%, #7935c9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter:
                    'drop-shadow(0 0 35px rgba(181,106,255,0.7)) drop-shadow(0 0 70px rgba(121,53,201,0.4))',
                  display: 'inline-block',
                }}
              >
                Witch
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-24px',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                    color: '#ffffff',
                    filter: 'drop-shadow(0 0 12px #b56aff)',
                    animation: 'star-twinkle 3s ease-in-out infinite',
                    WebkitTextFillColor: '#ffffff',
                  }}
                >
                  ✦
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(1.2rem, 2.4vw, 1.55rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: 480,
                marginBottom: 36,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              "Not all who wander are lost...<br />
              <span
                style={{
                  color: 'var(--soft-lavender)',
                  textShadow: '0 0 15px rgba(181,106,255,0.6)',
                }}
              >
                Some are just searching for magic.
              </span>"
            </p>

            {/* Buttons: Explore My World & Learn More (No emojis) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="btn-primary"
                onClick={onExplore}
                aria-label="Explore My World"
                style={{
                  padding: '14px 34px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  boxShadow:
                    '0 0 25px rgba(181,106,255,0.6), 0 4px 20px rgba(121,53,201,0.5)',
                }}
              >
                <span>✦</span>
                <span>Explore My World</span>
                <span style={{ fontSize: 14 }}>›</span>
              </button>

              <button
                className="btn-secondary"
                onClick={onLearnMore}
                aria-label="Learn More"
                style={{
                  padding: '13px 28px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  background: 'rgba(17,11,29,0.6)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(181,106,255,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Learn More</span>
              </button>
            </div>

            {/* Mystical Glyphs */}
            <div className="flex items-center gap-4 mt-8 opacity-45">
              {['⬡', '✦', '᛭', '⟡', '᛫'].map((glyph, i) => (
                <span
                  key={i}
                  style={{
                    color: 'var(--bright-purple)',
                    fontSize: 16,
                    animation: `star-twinkle ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {glyph}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: spacer allowing right side artwork and orb to shine */}
          <div className="hidden lg:block lg:col-span-6" />
        </div>
      </div>

      {/* 5. BOTTOM ANIMATED SCROLL INDICATOR */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: loaded ? 0.9 : 0,
          transition: 'opacity 1.5s ease 0.8s',
          cursor: 'pointer',
        }}
        onClick={onExplore}
      >
        <div
          style={{
            width: 22,
            height: 36,
            borderRadius: 14,
            border: '1.5px solid rgba(181,106,255,0.6)',
            boxShadow: '0 0 12px rgba(181,106,255,0.4)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: 3,
              height: 7,
              borderRadius: 2,
              background: 'var(--bright-purple)',
              boxShadow: '0 0 6px var(--bright-purple)',
              animation: 'float 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <span
          className="font-cinzel text-xs uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.28em',
            color: 'var(--soft-lavender)',
            opacity: 0.8,
            textShadow: '0 0 10px rgba(181,106,255,0.5)',
          }}
        >
          Scroll to Explore
        </span>
      </div>
    </section>
  )
}
