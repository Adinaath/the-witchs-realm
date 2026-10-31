import React, { useState, useRef, useEffect, useCallback } from 'react'

const GALLERY_ITEMS = [
  {
    id: 'altar',
    src: '/images/cinematic/apothecary-altar.webp',
    fullSrc: '/images/cinematic/apothecary-altar.webp',
    title: 'The Apothecary Sanctuary',
    category: 'Alchemical Chamber',
    quote: '"Dried lavender, nightshade, and whispers from centuries past."',
    scale: 1.0,
    yOffset: 0,
  },
  {
    id: 'raven',
    src: '/images/cinematic/familiar-raven.webp',
    fullSrc: '/images/cinematic/familiar-raven.webp',
    title: 'Corvus the Shadow Familiar',
    category: 'Mythical Familiar',
    quote: '"Eyes that reflect stars from realms yet unvisited."',
    scale: 1.0,
    yOffset: 0,
  },
  {
    id: 'portal',
    src: '/images/cinematic/final-portal-vortex.webp',
    fullSrc: '/images/cinematic/final-portal-vortex.webp',
    title: 'The Dimensional Vortex',
    category: 'Gateway of the Stars',
    quote: '"When the celestial circle turns, all horizons converge."',
    scale: 1.0,
    yOffset: 0,
  },
  {
    id: 'elixirs',
    src: '/images/cinematic/elixir-flacons.webp',
    fullSrc: '/images/cinematic/elixir-flacons.webp',
    title: 'Trio of Midnight Elixirs',
    category: 'Forbidden Essences',
    quote: '"Distilled starlight bound in crystal and amethyst filigree."',
    scale: 1.0,
    yOffset: 0,
  },
]

function OrnateGalleryFrame({ item, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const frameRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 10, y: y * -10 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${
          hovered ? 1.03 : 1
        })`,
        transition: hovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 340,
      }}
    >
      {/* Vintage Ornate Golden/Bronze Outer Frame */}
      <div
        style={{
          position: 'relative',
          padding: '12px',
          borderRadius: 14,
          background:
            'linear-gradient(135deg, #4d3822 0%, #1e1309 30%, #8a6a3b 60%, #30200e 100%)',
          boxShadow: hovered
            ? '0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(181,106,255,0.6), inset 0 0 15px rgba(255,215,140,0.5)'
            : '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(121,53,201,0.3), inset 0 0 10px rgba(180,140,80,0.3)',
          border: '2px solid rgba(212,175,55,0.6)',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
          width: '100%',
        }}
      >
        {/* Frame Corner Studs */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((pos, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              ...pos,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#d4af37',
              boxShadow: '0 0 8px rgba(212,175,55,0.9)',
            }}
            aria-hidden="true"
          />
        ))}

        {/* Inner Bevel & Image Container */}
        <div
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            border: '2px solid rgba(13,6,26,0.9)',
            position: 'relative',
            background: '#090711',
            height: 350,
          }}
        >
          <img
            src={item.src}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: hovered
                ? 'contrast(1.1) brightness(1.04)'
                : 'contrast(1.02) brightness(0.95)',
              transition: 'filter 0.4s ease',
            }}
            loading="lazy"
            decoding="async"
          />

          {/* Golden Sheen Overlay on Hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered
                ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(181,106,255,0.15) 100%)'
                : 'linear-gradient(180deg, transparent 70%, rgba(9,7,17,0.7) 100%)',
              transition: 'background 0.4s ease',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Frame Caption Plate */}
      <div style={{ marginTop: 14, textAlign: 'center', width: '100%' }}>
        <span
          className="font-cinzel text-xs uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'var(--soft-lavender)',
            opacity: 0.85,
            display: 'block',
            marginBottom: 4,
          }}
        >
          {item.category}
        </span>
        <h3
          className="font-cinzel font-bold text-sm"
          style={{
            color: hovered ? '#ffffff' : 'var(--text-primary)',
            textShadow: hovered ? '0 0 15px var(--bright-purple)' : 'none',
            transition: 'color 0.3s ease',
          }}
        >
          {item.title}
        </h3>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    )
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    )
  }, [])

  const handleClose = useCallback(() => {
    setSelectedIdx(null)
  }, [])

  // Sync body class for cursor visibility and scroll locking
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.classList.add('lightbox-open')
    } else {
      document.body.classList.remove('lightbox-open')
    }
    return () => {
      document.body.classList.remove('lightbox-open')
    }
  }, [selectedIdx])

  // Keyboard navigation: Escape to close, Left/Right arrows to flip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIdx, handleClose, handlePrev, handleNext])

  const selectedPhoto = selectedIdx !== null ? GALLERY_ITEMS[selectedIdx] : null

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="gallery-section"
      aria-label="Section 6 — The Witch's Gallery: Fragments of the Realm"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '120px 0',
        background: 'radial-gradient(ellipse at 50% 60%, #150826 0%, #0d061a 50%, #090711 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(300px, 60vw, 750px)',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(141,67,214,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with Exact Prompt Heading */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 64,
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
              VISUAL CHRONICLES
            </span>
            <span style={{ color: 'var(--bright-purple)' }}>✦</span>
          </div>

          <h2
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Fragments of the{' '}
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
              Realm
            </span>
          </h2>

          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              color: 'var(--text-secondary)',
              maxWidth: 550,
              margin: '0 auto',
            }}
          >
            "Captured moments from a world beyond imagination."
          </p>
        </div>

        {/* ─────── BALANCED 4-IMAGE GALLERY GRID ─────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(24px, 3vw, 36px)',
            justifyItems: 'center',
            alignItems: 'start',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <OrnateGalleryFrame
              key={item.id}
              item={item}
              onSelect={() => setSelectedIdx(idx)}
            />
          ))}
        </div>

        {/* Bottom Hint */}
        <div style={{ textAlign: 'center', marginTop: 48, opacity: 0.65 }}>
          <span
            className="font-cinzel text-xs uppercase"
            style={{ letterSpacing: '0.2em', color: 'var(--soft-lavender)' }}
          >
            ✦ Click any portrait to open fullscreen viewer • Use arrows to browse ✦
          </span>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal with Fixed Cursor & High Z-Index */}
      {selectedPhoto && (
        <div
          className="lightbox"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing portrait: ${selectedPhoto.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99990,
            background: 'rgba(9, 7, 17, 0.96)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'default',
          }}
        >
          {/* Prominent Accessible Close Button (Z-Index 100005, Guaranteed Clickable) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            style={{
              position: 'fixed',
              top: 24,
              right: 24,
              background: 'rgba(26, 12, 45, 0.9)',
              border: '1.5px solid rgba(181, 106, 255, 0.6)',
              borderRadius: '50%',
              width: 50,
              height: 50,
              color: '#ffffff',
              fontSize: 22,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(181, 106, 255, 0.65), 0 4px 15px rgba(0,0,0,0.8)',
              zIndex: 100005,
              pointerEvents: 'auto',
              transition: 'all 0.25s ease',
            }}
            aria-label="Close fullscreen viewer"
            title="Close viewer (Escape)"
          >
            ✕
          </button>

          {/* Previous Image Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            style={{
              position: 'fixed',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(26, 12, 45, 0.9)',
              border: '1.5px solid rgba(181, 106, 255, 0.5)',
              borderRadius: '50%',
              width: 52,
              height: 52,
              color: '#ffffff',
              fontSize: 26,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(181, 106, 255, 0.55), 0 4px 15px rgba(0,0,0,0.8)',
              zIndex: 100005,
              pointerEvents: 'auto',
              transition: 'all 0.25s ease',
            }}
            aria-label="Previous image"
            title="Previous (Left Arrow)"
          >
            ‹
          </button>

          {/* Next Image Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            style={{
              position: 'fixed',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(26, 12, 45, 0.9)',
              border: '1.5px solid rgba(181, 106, 255, 0.5)',
              borderRadius: '50%',
              width: 52,
              height: 52,
              color: '#ffffff',
              fontSize: 26,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(181, 106, 255, 0.55), 0 4px 15px rgba(0,0,0,0.8)',
              zIndex: 100005,
              pointerEvents: 'auto',
              transition: 'all 0.25s ease',
            }}
            aria-label="Next image"
            title="Next (Right Arrow)"
          >
            ›
          </button>

          {/* Modal Card Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 720,
              width: '100%',
              textAlign: 'center',
              animation: 'rune-appear 0.3s ease-out',
              position: 'relative',
              zIndex: 99995,
              pointerEvents: 'auto',
            }}
          >
            {/* Ornate Gold Outer Modal Frame */}
            <div
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '3px solid rgba(212, 175, 55, 0.85)',
                boxShadow:
                  '0 0 60px rgba(181, 106, 255, 0.5), 0 30px 80px rgba(0, 0, 0, 0.95)',
                background: '#090711',
                marginBottom: 18,
              }}
            >
              <img
                src={selectedPhoto.fullSrc}
                alt={selectedPhoto.title}
                style={{
                  width: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <span
                className="font-cinzel text-xs uppercase"
                style={{ color: 'var(--bright-purple)', letterSpacing: '0.22em' }}
              >
                {selectedPhoto.category}
              </span>
              <span style={{ color: 'rgba(181, 106, 255, 0.4)' }}>•</span>
              <span
                className="font-cinzel text-xs uppercase"
                style={{ color: 'var(--soft-lavender)', letterSpacing: '0.15em' }}
              >
                {selectedIdx + 1} of {GALLERY_ITEMS.length}
              </span>
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-white mt-1 mb-2">
              {selectedPhoto.title}
            </h3>

            <p
              className="font-cormorant italic text-lg"
              style={{ color: 'var(--soft-lavender)' }}
            >
              {selectedPhoto.quote}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
