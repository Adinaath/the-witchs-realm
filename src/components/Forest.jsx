import React, { useEffect, useRef, useState } from 'react'

const FIREFLIES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  initialX: Math.random() * 100,
  initialY: 15 + Math.random() * 70,
  size: Math.random() * 3.5 + 1.5,
  color: i % 2 === 0 ? '#ecd6ff' : '#b56aff',
  duration: 4 + Math.random() * 5,
  delay: Math.random() * 6,
}))

const LANTERNS = [
  { id: 1, left: '16%', top: '24%', swingDelay: '0s' },
  { id: 2, left: '82%', top: '22%', swingDelay: '1.2s' },
  { id: 3, left: '26%', top: '48%', swingDelay: '0.6s' },
  { id: 4, left: '74%', top: '52%', swingDelay: '1.8s' },
]

export default function Forest() {
  const textRef = useRef(null)
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -rect.top / window.innerHeight
      if (scrollProgress >= -0.5 && scrollProgress <= 1.5) {
        bgRef.current.style.transform = `scale(1.08) translateY(${scrollProgress * 40}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="forest"
      ref={sectionRef}
      className="forest-section"
      aria-label="Section 2 — Enter the Enchanted Forest"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#07040e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. CINEMATIC FOREST ARTWORK BACKGROUND */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: 'url(/images/cinematic/flow-forest-2-hd.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.2) saturate(1.15)',
          opacity: 0.65,
          transition: 'transform 0.1s linear',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Dark vignette blending edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(9,7,17,0.2) 0%, rgba(9,7,17,0.85) 75%, #090711 100%), linear-gradient(180deg, #090711 0%, transparent 20%, transparent 80%, #090711 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* 2. SWINGING ENCHANTED LANTERNS */}
      {LANTERNS.map((lantern) => (
        <div
          key={lantern.id}
          style={{
            position: 'absolute',
            left: lantern.left,
            top: lantern.top,
            zIndex: 3,
            transformOrigin: 'top center',
            animation: `floatSlow 5s ease-in-out infinite`,
            animationDelay: lantern.swingDelay,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {/* Lantern cord */}
          <div
            style={{
              width: 1,
              height: 35,
              background: 'linear-gradient(180deg, rgba(181,106,255,0.4), rgba(255,200,120,0.6))',
              margin: '0 auto',
            }}
          />
          {/* Lantern body */}
          <div
            style={{
              width: 16,
              height: 24,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #2b1238 0%, #150820 100%)',
              border: '1px solid rgba(255,210,140,0.5)',
              position: 'relative',
              boxShadow: '0 0 25px rgba(255,180,80,0.7), 0 0 50px rgba(181,106,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Glowing flame core */}
            <div
              style={{
                width: 6,
                height: 10,
                borderRadius: '50% 50% 40% 40%',
                background: '#ffeedd',
                boxShadow: '0 0 10px #ffbb66, 0 0 20px #b56aff',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      ))}

      {/* 3. GLOWING ILLUMINATED PATHWAY */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 35vw, 450px)',
          height: '60%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(181,106,255,0.3) 0%, rgba(121,53,201,0.15) 40%, transparent 80%)',
          filter: 'blur(25px)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* 4. FLOATING FOREST FIREFLIES */}
      {FIREFLIES.map((f) => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: `${f.initialX}%`,
            top: `${f.initialY}%`,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            background: f.color,
            boxShadow: `0 0 8px ${f.color}, 0 0 16px var(--bright-purple)`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            zIndex: 4,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      ))}

      {/* 5. MULTI-LAYER DRIFTING MIST */}
      <div
        className="fog-layer animate-fog"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-10%',
          width: '120%',
          height: '200px',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(79,25,125,0.4) 0%, transparent 70%)',
          filter: 'blur(25px)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* 6. CENTRAL STORYTELLING TYPOGRAPHY */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 820,
          padding: '0 24px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Ancient sigil badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(181,106,255,0.4)',
            background: 'rgba(17,11,29,0.7)',
            backdropFilter: 'blur(10px)',
            color: 'var(--bright-purple)',
            fontSize: 20,
            marginBottom: 28,
            boxShadow: '0 0 25px rgba(181,106,255,0.4)',
            animation: 'rotate-slow 25s linear infinite',
          }}
          aria-hidden="true"
        >
          ⬡
        </div>

        <p
          className="font-cinzel tracking-widest uppercase font-semibold glow-text"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.45rem)',
            letterSpacing: '0.22em',
            color: 'var(--bright-purple)',
            marginBottom: 20,
          }}
        >
          Every spell begins with a story...
        </p>

        <h2
          className="font-cormorant font-light"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: 28,
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          Beyond the ordinary lies a world filled with{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ecd6ff 30%, #b56aff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 400,
              filter: 'drop-shadow(0 0 20px rgba(181,106,255,0.7))',
            }}
          >
            forgotten secrets, ancient magic
          </span>{' '}
          and mysterious wonders.
        </h2>

        {/* Decorative Runes Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            marginTop: 36,
          }}
        >
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(181,106,255,0.6))' }} />
          {['✦', '⟡', '᛭', '⟡', '✦'].map((r, i) => (
            <span
              key={i}
              style={{
                color: 'var(--soft-lavender)',
                fontSize: 14,
                animation: `star-twinkle ${2.5 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {r}
            </span>
          ))}
          <div style={{ width: 60, height: 1, background: 'linear-gradient(270deg, transparent, rgba(181,106,255,0.6))' }} />
        </div>
      </div>
    </section>
  )
}
