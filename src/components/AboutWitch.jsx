import React, { useEffect, useRef, useState } from 'react'

const RAVEN_STATS = [
  {
    label: 'Guardian Role',
    val: 'Midnight Watcher',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b56aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" fill="rgba(181,106,255,0.3)" />
      </svg>
    ),
  },
  {
    label: 'Realm Duty',
    val: 'Whisper Carrier',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b56aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
  {
    label: 'Arcane Sight',
    val: 'Omnipresent Vision',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b56aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="rgba(181,106,255,0.25)" />
      </svg>
    ),
  },
  {
    label: 'Ancient Bond',
    val: 'Eclipse Pact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b56aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" fill="rgba(181,106,255,0.25)" />
      </svg>
    ),
  },
]

export default function AboutWitch() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [expandedLore, setExpandedLore] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      aria-label="Section 3 — The Witch's Companion: The Raven"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '120px 0',
        background: 'radial-gradient(ellipse at 40% 50%, #130724 0%, #090711 75%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Soft Purple Glow & Radial Nebula */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(141,67,214,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─────── LEFT: THE RAVEN CINEMATIC ARTWORK (6 cols) ─────── */}
          <div
            className="lg:col-span-6 relative flex justify-center items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition:
                'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Rotating Arcane Circle in Background */}
            <div
              style={{
                position: 'absolute',
                width: 'clamp(320px, 46vw, 560px)',
                height: 'clamp(320px, 46vw, 560px)',
                borderRadius: '50%',
                zIndex: 1,
                pointerEvents: 'none',
                animation: 'rotate-slow 40s linear infinite',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
                <circle
                  cx="200"
                  cy="200"
                  r="192"
                  fill="none"
                  stroke="rgba(181,106,255,0.32)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="178"
                  fill="none"
                  stroke="rgba(216,183,255,0.35)"
                  strokeWidth="1"
                />
                <polygon
                  points="200,30 346,310 54,310"
                  fill="none"
                  stroke="rgba(181,106,255,0.22)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="200,370 346,90 54,90"
                  fill="none"
                  stroke="rgba(181,106,255,0.22)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="125"
                  fill="none"
                  stroke="rgba(181,106,255,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="10 8"
                />
                <text x="200" y="24" fill="#d8b7ff" fontSize="13" textAnchor="middle" fontFamily="serif">ᚠ</text>
                <text x="382" y="205" fill="#d8b7ff" fontSize="13" textAnchor="middle" fontFamily="serif">᛭</text>
                <text x="200" y="394" fill="#d8b7ff" fontSize="13" textAnchor="middle" fontFamily="serif">⟡</text>
                <text x="18" y="205" fill="#d8b7ff" fontSize="13" textAnchor="middle" fontFamily="serif">✦</text>
              </svg>
            </div>

            {/* Glowing violet aura behind the portrait */}
            <div
              style={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(181,106,255,0.35) 0%, rgba(121,53,201,0.18) 50%, transparent 75%)',
                filter: 'blur(40px)',
                zIndex: 0,
                animation: 'pulse-glow 5s ease-in-out infinite',
              }}
              aria-hidden="true"
            />

            {/* The Raven Ornate Frame Container */}
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: 460,
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: hovered
                  ? '0 30px 75px rgba(0,0,0,0.95), 0 0 50px rgba(181,106,255,0.55)'
                  : '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(181,106,255,0.3)',
                border: '1.5px solid rgba(181,106,255,0.4)',
                background: 'rgba(17,11,29,0.85)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              {/* Primary Generated Raven Image */}
              <div style={{ position: 'relative', width: '100%', height: 490, overflow: 'hidden' }}>
                <img
                  src="/images/cinematic/familiar-raven.webp"
                  alt="Corvus the Mythical Raven Familiar perched in the enchanted misty forest"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.6s ease, filter 0.4s ease',
                    transform: hovered ? 'scale(1.04)' : 'scale(1)',
                    filter: hovered
                      ? 'contrast(1.1) brightness(1.04) saturate(1.15)'
                      : 'contrast(1.05) saturate(1.1)',
                  }}
                  loading="lazy"
                  decoding="async"
                />

                {/* Bottom Shadow Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 60%, rgba(9,7,17,0.92) 100%)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />

                {/* Aspect Badge overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    padding: '6px 14px',
                    borderRadius: 20,
                    background: 'rgba(9,7,17,0.8)',
                    border: '1px solid rgba(181,106,255,0.45)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '10px',
                    fontFamily: 'Cinzel, serif',
                    letterSpacing: '0.15em',
                    color: 'var(--soft-lavender)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: 'var(--bright-purple)' }}>✦</span>
                  <span>MYTHICAL FAMILIAR</span>
                </div>
              </div>

              {/* Bottom Inscription Plate */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'rgba(13,6,26,0.95)',
                  borderTop: '1px solid rgba(181,106,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    className="font-cinzel text-xs uppercase"
                    style={{ color: 'var(--soft-lavender)', letterSpacing: '0.18em', fontSize: '10px' }}
                  >
                    CORVUS • OBSIDIAN WATCHER
                  </div>
                  <div
                    className="font-cormorant italic text-sm"
                    style={{ color: 'var(--text-secondary)', marginTop: 2 }}
                  >
                    Eyes reflecting forgotten worlds
                  </div>
                </div>

                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid rgba(181,106,255,0.4)',
                    background: 'rgba(141,67,214,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bright-purple)',
                    fontSize: 14,
                  }}
                >
                  ᛭
                </div>
              </div>
            </div>
          </div>

          {/* ─────── RIGHT: STORY LORE & STATS (6 cols) ─────── */}
          <div
            className="lg:col-span-6 relative z-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition:
                'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {/* Section Badge with Exact Required Heading: THE WITCH'S COMPANION */}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: 'var(--bright-purple)', fontSize: 14 }}>✦</span>
              <span
                className="font-cinzel text-xs tracking-widest uppercase font-semibold"
                style={{ color: 'var(--soft-lavender)', letterSpacing: '0.28em' }}
              >
                THE WITCH'S COMPANION
              </span>
              <span style={{ color: 'var(--bright-purple)', fontSize: 14 }}>✦</span>
            </div>

            {/* Exact Required Main Title: The Raven */}
            <h2
              className="font-cinzel"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 18,
              }}
            >
              The{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #ecd6ff 40%, #b56aff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 25px rgba(181,106,255,0.6))',
                }}
              >
                Raven
              </span>
            </h2>

            {/* Exact Required Supporting Line */}
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(1.2rem, 2.3vw, 1.48rem)',
                color: 'var(--soft-lavender)',
                lineHeight: 1.6,
                marginBottom: 20,
                borderLeft: '2px solid var(--bright-purple)',
                paddingLeft: '18px',
                textShadow: '0 0 15px rgba(181,106,255,0.4)',
              }}
            >
              "Not every messenger speaks. Some simply watch... and remember."
            </p>

            {/* Exact Required Description */}
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
                fontSize: '1.02rem',
                marginBottom: 28,
              }}
            >
              A silent guardian of the forgotten realm, the raven watches from the shadows,
              carrying whispers between worlds. Its eyes have witnessed ancient spells,
              forgotten secrets, and paths that only the worthy may follow.
            </p>

            {/* Arcane Attributes Grid (Clean SVG icons, NO EMOJIS) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {RAVEN_STATS.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 10,
                    background: 'rgba(17,11,29,0.7)',
                    border: '1px solid rgba(181,106,255,0.22)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  }}
                >
                  <div style={{ flexShrink: 0 }}>{stat.icon}</div>
                  <div>
                    <div
                      className="font-cinzel text-xs uppercase"
                      style={{
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.12em',
                        fontSize: '9px',
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="font-cinzel font-bold text-sm"
                      style={{ color: '#ffffff', letterSpacing: '0.06em', marginTop: 2 }}
                    >
                      {stat.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6">
              <button
                className="btn-primary"
                onClick={() => setExpandedLore(!expandedLore)}
                style={{
                  padding: '12px 28px',
                  borderRadius: 24,
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                }}
                aria-expanded={expandedLore}
              >
                <span>✦</span>
                <span>{expandedLore ? 'Conceal Chronicles' : 'Unveil Chronicles'}</span>
                <span>›</span>
              </button>

              <button
                onClick={() =>
                  document.getElementById('powers')?.scrollIntoView({ behavior: 'smooth' })
                }
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--bright-purple)',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Explore Forbidden Arts</span>
                <span>↓</span>
              </button>
            </div>

            {/* Expandable Lore Drawer */}
            {expandedLore && (
              <div
                style={{
                  marginTop: 24,
                  padding: '22px 26px',
                  borderRadius: 10,
                  background: 'rgba(30,12,50,0.7)',
                  border: '1px solid rgba(181,106,255,0.35)',
                  backdropFilter: 'blur(12px)',
                  animation: 'rune-appear 0.4s ease-out',
                }}
              >
                <div
                  className="font-cinzel text-xs uppercase mb-2 font-bold"
                  style={{ color: 'var(--bright-purple)', letterSpacing: '0.16em' }}
                >
                  ᛭ THE OBSIDIAN CHRONICLE ᛭
                </div>
                <p
                  className="font-cormorant italic"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.08rem',
                    lineHeight: 1.7,
                  }}
                >
                  "Carrying secrets older than the moss-covered stone arches, Corvus perches
                  where the veil between realms is thinnest. It does not speak with human voice,
                  but its wings ripple with the memory of every spell ever spoken in this forest."
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
