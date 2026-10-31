import React, { useRef, useState, useEffect } from 'react'

const RUNE_SYMBOLS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ']

// Ambient motes swirling into the vortex core
const PORTAL_PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  angle: (i / 36) * 360,
  radius: 90 + (i % 5) * 32,
  speed: 6 + (i % 4) * 2.5,
  size: (i % 3) * 1.5 + 2,
  color: i % 2 === 0 ? '#d8b7ff' : '#b56aff',
}))

export default function FinalPortal() {
  const sectionRef = useRef(null)
  const flashRef = useRef(null)
  const [portalExpanding, setPortalExpanding] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleAscend = () => {
    if (portalExpanding) return
    setPortalExpanding(true)

    // Screen flash sequence
    if (flashRef.current) {
      flashRef.current.style.opacity = '1'
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        if (flashRef.current) {
          flashRef.current.style.opacity = '0'
        }
        setPortalExpanding(false)
      }, 600)
    }, 700)
  }

  return (
    <section
      id="portal"
      ref={sectionRef}
      className="portal-section"
      aria-label="Section 7 — The Final Portal: Return to the Beginning"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '120px 24px',
        background: 'radial-gradient(circle at 50% 55%, #18092c 0%, #0d061a 50%, #090711 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Fullscreen Flash Overlay on Portal Activation */}
      <div
        ref={flashRef}
        className="portal-flash"
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(216,183,255,0.92) 35%, rgba(121,53,201,0.96) 100%)',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.45s ease-out',
        }}
        aria-hidden="true"
      />

      {/* 2. Background Atmospheric Vortex Image Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/cinematic/final-portal-vortex.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          filter: 'blur(4px) contrast(1.1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* 3. Section Header with Exact Prompt Heading */}
      <div
        style={{
          textAlign: 'center',
          zIndex: 10,
          maxWidth: 720,
          marginBottom: 44,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition:
            'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span style={{ color: 'var(--bright-purple)' }}>✦</span>
          <span
            className="font-cinzel text-xs tracking-widest uppercase font-semibold"
            style={{ color: 'var(--soft-lavender)', letterSpacing: '0.28em' }}
          >
            THE VORTEX GATEWAY
          </span>
          <span style={{ color: 'var(--bright-purple)' }}>✦</span>
        </div>

        <h2
          className="font-cinzel"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          You Have Reached the End<br />
          <span
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #ecd6ff 30%, #b56aff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px rgba(181,106,255,0.6))',
            }}
          >
            of This Realm
          </span>
        </h2>

        <p
          className="font-cormorant italic"
          style={{
            fontSize: 'clamp(1.2rem, 2.3vw, 1.5rem)',
            color: 'var(--soft-lavender)',
            textShadow: '0 0 15px rgba(181,106,255,0.4)',
          }}
        >
          "But every ending is just another beginning."
        </p>
      </div>

      {/* 4. THE GIANT INTERACTIVE MAGIC PORTAL */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'clamp(280px, 38vw, 440px)',
          height: 'clamp(280px, 38vw, 440px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 44,
        }}
      >
        {/* Swirling Inward Particle Field */}
        {PORTAL_PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) translateX(${p.radius}px)`,
              animation: `rotate-slow ${hovered ? p.speed * 0.4 : p.speed}s linear infinite`,
              transformOrigin: '0 0',
              pointerEvents: 'none',
              zIndex: 2,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Outer Rotating Runic Ring SVG */}
        <div
          style={{
            position: 'absolute',
            inset: -28,
            borderRadius: '50%',
            animation: `rotate-slow ${hovered ? '12s' : '40s'} linear infinite`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
            <circle
              cx="200"
              cy="200"
              r="192"
              fill="none"
              stroke="rgba(181,106,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            {RUNE_SYMBOLS.map((sym, i) => {
              const ang = (i / RUNE_SYMBOLS.length) * Math.PI * 2
              const rx = 200 + 178 * Math.cos(ang)
              const ry = 200 + 178 * Math.sin(ang)
              return (
                <text
                  key={i}
                  x={rx}
                  y={ry}
                  fill="#d8b7ff"
                  fontSize="12"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="serif"
                >
                  {sym}
                </text>
              )
            })}
          </svg>
        </div>

        {/* The Portal Arch Vortex Disk */}
        <div
          onClick={handleAscend}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleAscend()}
          aria-label="Return to the Beginning — Click the portal to ascend"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: hovered
              ? '0 0 90px rgba(216,183,255,0.95), 0 0 160px rgba(181,106,255,0.85), inset 0 0 60px rgba(255,255,255,0.9)'
              : '0 0 55px rgba(181,106,255,0.65), 0 0 110px rgba(121,53,201,0.55), inset 0 0 40px rgba(216,183,255,0.6)',
            transform: portalExpanding
              ? 'scale(2.6)'
              : hovered
              ? 'scale(1.06)'
              : 'scale(1)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            border: '3px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* Concentric Centered Portal Vortex Texture */}
          <img
            src="/images/cinematic/portal-vortex-centered.webp"
            alt="Swirling portal vortex"
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: hovered ? 'contrast(1.2) brightness(1.15)' : 'contrast(1.1)',
              transition: 'filter 0.4s ease',
            }}
          />

          {/* Inner Swirling Conic Gradient Overlay for intense vortex motion */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'conic-gradient(from 0deg, rgba(216,183,255,0.6), rgba(121,53,201,0.8), rgba(255,255,255,0.5), rgba(181,106,255,0.8), rgba(216,183,255,0.6))',
              mixBlendMode: 'color-dodge',
              animation: `rotate-slow ${hovered ? '2.5s' : '7s'} linear infinite`,
            }}
            aria-hidden="true"
          />

          {/* Center Threshold: Arcane Gateway Sigil */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.9)) drop-shadow(0 0 25px rgba(216,183,255,0.8))',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeDasharray="3 3"/>
                <circle cx="20" cy="20" r="14" stroke="rgba(216,183,255,0.6)" strokeWidth="1"/>
                <polygon points="20,5 33,28 7,28" stroke="#ffffff" strokeWidth="1.4" fill="rgba(216,183,255,0.15)"/>
                <polygon points="20,35 33,12 7,12" stroke="#ffffff" strokeWidth="1.4" fill="rgba(181,106,255,0.15)"/>
                <circle cx="20" cy="20" r="3.5" fill="#ffffff" />
              </svg>
            </div>

            <span
              className="font-cinzel text-xs uppercase font-bold"
              style={{
                letterSpacing: '0.24em',
                color: '#ffffff',
                textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 25px #ffffff',
                marginTop: 6,
              }}
            >
              ASCEND
            </span>
          </div>
        </div>
      </div>

      {/* 5. Action Button & Prompt with Exact Button Text */}
      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <button
          className="btn-primary"
          onClick={handleAscend}
          aria-label="Return to the Beginning"
          style={{
            padding: '14px 38px',
            borderRadius: 30,
            fontSize: '12px',
            letterSpacing: '0.18em',
            boxShadow:
              '0 0 30px rgba(181,106,255,0.7), 0 4px 25px rgba(121,53,201,0.6)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            <polyline points="21 3 21 9 15 9"/>
          </svg>
          <span>Return to the Beginning</span>
          <span>›</span>
        </button>

        <p
          className="font-cormorant italic text-sm mt-4"
          style={{ color: 'var(--soft-lavender)', opacity: 0.75 }}
        >
          Click the portal or the button above to journey back
        </p>
      </div>

      {/* 6. Mystical Footer */}
      <div
        style={{
          zIndex: 10,
          textAlign: 'center',
          borderTop: '1px solid rgba(181,106,255,0.18)',
          paddingTop: 36,
          marginTop: 64,
          width: '100%',
          maxWidth: 680,
        }}
      >
        <div className="flex justify-center items-center gap-4 mb-4 opacity-50">
          {['✦', '⟡', '᛭', '⟡', '✦'].map((r, i) => (
            <span
              key={i}
              style={{
                color: 'var(--bright-purple)',
                fontSize: 14,
                animation: `star-twinkle ${2.5 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {r}
            </span>
          ))}
        </div>

        <p
          className="font-cinzel text-xs uppercase"
          style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'var(--text-secondary)',
            opacity: 0.65,
          }}
        >
          The Witch's Realm © 2026 • An Interactive Fantasy Experience
        </p>
      </div>
    </section>
  )
}
