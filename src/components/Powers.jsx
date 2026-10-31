import React, { useRef, useState, useEffect } from 'react'

const FORBIDDEN_ARTS = [
  {
    id: 'crystal_ball',
    name: 'Crystal Ball',
    subtitle: 'Orb of Foresight',
    category: 'Divination Relic',
    image: '/images/cinematic/relic-crystal-ball.webp',
    description: 'A window into possibilities yet to unfold.',
    lore: 'Crafted from petrified starlight and infused with lunar ether, it peers through the veil of time itself, revealing glimpses of forgotten memories and hidden pathways.',
    rune: '᛭',
    powerLevel: 'Unbounded',
    color: '#9B30FF',
    accent: '#d8b7ff',
  },
  {
    id: 'potion',
    name: 'Potion Bottle',
    subtitle: 'Elixir of Midnight',
    category: 'Alchemical Brew',
    image: '/images/cinematic/relic-potion-bottle.webp',
    description: 'A carefully crafted essence of mystery and transformation.',
    lore: 'Distilled beneath the blood moon from crushed nightshade petals, dew of graveyard moss, and distilled celestial comet dust. A single drop can dissolve the boundary between flesh and spirit.',
    rune: 'ᛃ',
    powerLevel: 'High Potency',
    color: '#7935C9',
    accent: '#b56aff',
  },
  {
    id: 'wand',
    name: 'Ancient Wand',
    subtitle: 'The Twilight Conduit',
    category: 'Channeling Focus',
    image: '/images/cinematic/relic-wand.webp',
    description: 'A conduit through which forgotten magic awakens.',
    lore: 'Carved from the heartwood of an ancient enchanted elder tree that absorbed centuries of magical ley-line power. Crowned with an uncut amethyst shard that hums with arcane energy.',
    rune: 'ᛟ',
    powerLevel: 'Focus Channel',
    color: '#B56AFF',
    accent: '#ffffff',
  },
  {
    id: 'crystal',
    name: 'Enchanted Crystal',
    subtitle: 'Shadow Geode',
    category: 'Prismatic Conduit',
    image: '/images/cinematic/relic-crystal.webp',
    description: 'A fragment of ancient energy, preserved beyond time.',
    lore: 'Sprouting from raw obsidian rock in deep cavern vaults untouched by sun, its geometric violet facets refract light into spectrums unseen by mortal eyes.',
    rune: 'ᛞ',
    powerLevel: 'Catalyst',
    color: '#D8B7FF',
    accent: '#9b30ff',
  },
]

function RelicPedestal({ obj, index, onSelect }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 14, y: y * -14 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(obj)}
      style={{
        position: 'relative',
        borderRadius: 16,
        padding: '32px 20px 24px',
        background:
          'radial-gradient(ellipse at 50% 20%, rgba(32, 12, 54, 0.8) 0%, rgba(13, 6, 26, 0.95) 85%)',
        border: hovered ? `1.5px solid ${obj.color}` : '1.5px solid rgba(181, 106, 255, 0.22)',
        boxShadow: hovered
          ? `0 25px 60px rgba(0,0,0,0.95), 0 0 40px ${obj.color}66`
          : '0 12px 35px rgba(0,0,0,0.6)',
        transform: visible
          ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(${
              hovered ? '-10px' : '0'
            })`
          : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transition: hovered
          ? 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Ancient Rune Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 18,
          fontSize: 18,
          color: obj.color,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
          fontFamily: 'serif',
          textShadow: hovered ? `0 0 10px ${obj.color}` : 'none',
        }}
      >
        {obj.rune}
      </div>

      {/* Relic Image on Floating Magical Pedestal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 180,
          aspectRatio: '1',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Pedestal Base Ring */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            width: '84%',
            height: 18,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(65, 20, 100, 0.95) 0%, rgba(15, 7, 28, 0.98) 80%)',
            border: '1px solid rgba(181, 106, 255, 0.4)',
            boxShadow: `0 0 25px ${obj.color}55`,
            zIndex: 1,
          }}
        />

        {/* Floating High-Res Relic Image */}
        <div
          style={{
            position: 'relative',
            width: '85%',
            height: '85%',
            zIndex: 3,
            animation: 'float 4s ease-in-out infinite',
            animationDelay: `${index * 0.7}s`,
            filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 20px ${obj.color}88)`,
          }}
        >
          <img
            src={obj.image}
            alt={obj.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Ambient Pedestal Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${obj.color}35 0%, transparent 70%)`,
            filter: 'blur(16px)',
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.4s ease',
            zIndex: 0,
          }}
        />
      </div>

      {/* Category Tag */}
      <span
        className="font-cinzel text-xs uppercase font-semibold"
        style={{
          fontSize: '9px',
          letterSpacing: '0.22em',
          color: obj.accent,
          opacity: 0.85,
          marginBottom: 6,
        }}
      >
        {obj.category}
      </span>

      {/* Relic Name */}
      <h3
        className="font-cinzel font-bold text-lg mb-2"
        style={{
          color: hovered ? '#ffffff' : 'var(--text-primary)',
          textShadow: hovered ? `0 0 15px ${obj.color}` : 'none',
          transition: 'color 0.3s ease',
        }}
      >
        {obj.name}
      </h3>

      {/* User Prompt Relic Description */}
      <p
        className="font-cormorant italic text-sm mb-5"
        style={{
          color: 'var(--soft-lavender)',
          lineHeight: 1.5,
          fontSize: '0.96rem',
          maxWidth: 240,
        }}
      >
        "{obj.description}"
      </p>

      {/* Examine Prompt Button */}
      <div
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 18px',
          borderRadius: 20,
          background: hovered ? `${obj.color}33` : 'rgba(181, 106, 255, 0.08)',
          border: `1px solid ${hovered ? obj.color : 'rgba(181, 106, 255, 0.25)'}`,
          color: hovered ? '#ffffff' : obj.color,
          fontSize: '10px',
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          boxShadow: hovered ? `0 0 15px ${obj.color}66` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <span>Examine Relic</span>
        <span>›</span>
      </div>
    </div>
  )
}

export default function Powers() {
  const sectionRef = useRef(null)
  const [selectedObj, setSelectedObj] = useState(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="powers"
      ref={sectionRef}
      className="powers-section"
      aria-label="Section 4 — The Witch's Powers: A Collection of Forbidden Arts"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '120px 0',
        background: 'radial-gradient(circle at 50% 40%, #150826 0%, #0d061a 50%, #090711 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Altar Accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 60vw, 750px)',
          height: '240px',
          backgroundImage: 'url(/images/cinematic/apothecary-altar.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with Exact Prompt Heading */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 64,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
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
              FORBIDDEN RELICS
            </span>
            <span style={{ color: 'var(--bright-purple)' }}>✦</span>
          </div>

          <h2
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            A Collection of{' '}
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
              Forbidden Arts
            </span>
          </h2>

          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              color: 'var(--text-secondary)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            "Every relic holds a secret. Every secret commands power."
          </p>
        </div>

        {/* 4 Interactive Relic Pedestals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {FORBIDDEN_ARTS.map((obj, i) => (
            <RelicPedestal
              key={obj.id}
              obj={obj}
              index={i}
              onSelect={setSelectedObj}
            />
          ))}
        </div>

        {/* Bottom Hint */}
        <div style={{ textAlign: 'center', marginTop: 44, opacity: 0.65 }}>
          <span
            className="font-cinzel text-xs uppercase"
            style={{ letterSpacing: '0.2em', color: 'var(--soft-lavender)' }}
          >
            ✦ Click any relic to inspect its grimoire inscription & power lore ✦
          </span>
        </div>

      </div>

      {/* Relic Inscription Modal */}
      {selectedObj && (
        <div
          className="info-panel"
          onClick={() => setSelectedObj(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(9,7,17,0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'rune-appear 0.3s ease-out',
          }}
        >
          <div
            className="info-panel-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: 540,
              width: '100%',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #18092c 0%, #0d061a 100%)',
              border: `1.5px solid ${selectedObj.color}`,
              boxShadow: `0 0 60px ${selectedObj.color}66, 0 25px 50px rgba(0,0,0,0.95)`,
              padding: '40px 36px',
              textAlign: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedObj(null)}
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(181,106,255,0.3)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                color: 'var(--soft-lavender)',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Relic Image Preview in Modal */}
            <div
              style={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                filter: `drop-shadow(0 0 25px ${selectedObj.color})`,
                animation: 'float 3.5s ease-in-out infinite',
              }}
            >
              <img
                src={selectedObj.image}
                alt={selectedObj.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div
              className="font-cinzel text-xs uppercase"
              style={{
                color: selectedObj.accent,
                letterSpacing: '0.22em',
                marginBottom: 8,
              }}
            >
              {selectedObj.category} • {selectedObj.powerLevel}
            </div>

            <h3
              className="font-cinzel font-bold text-2xl mb-3"
              style={{
                color: '#ffffff',
                textShadow: `0 0 20px ${selectedObj.color}`,
              }}
            >
              {selectedObj.name}
            </h3>

            <p
              className="font-cormorant italic text-xl mb-4"
              style={{ color: 'var(--soft-lavender)', lineHeight: 1.5 }}
            >
              "{selectedObj.description}"
            </p>

            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '0.96rem',
                marginBottom: 28,
              }}
            >
              {selectedObj.lore}
            </p>

            <button
              className="btn-primary"
              onClick={() => setSelectedObj(null)}
              style={{
                padding: '10px 30px',
                borderRadius: 24,
                fontSize: '11px',
                letterSpacing: '0.16em',
              }}
            >
              <span>Seal Inscription</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
