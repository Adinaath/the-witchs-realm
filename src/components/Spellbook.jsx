import React, { useState, useRef, useEffect } from 'react'

const SPELLBOOK_PAGES = [
  {
    num: 1,
    chapter: 'Tome of Shadows • Folio I',
    title: 'The Beginning',
    rune: '᛭',
    quote: 'Every realm begins with a whisper. Every spell begins with a thought.',
    body: [
      'Before mortal maps drew borders and named their kingdoms, the ancient woods kept eternal vigil beneath the blood moon.',
      'From the quiet stillness of the primeval shadows, she arose carrying the forgotten memories of stars long extinguished. The roots yielded beneath her silent footsteps, and the nocturnal ravens took flight as her couriers.',
      'They spoke her name in hushed, trembling tones across mortal fires. She embraced it not as an exile\'s curse, but as a sovereign crown woven from shadow and starlight.',
    ],
    seal: 'Inscribed under the Blood Moon',
  },
  {
    num: 2,
    chapter: 'Tome of Shadows • Folio II',
    title: 'The Art of Magic',
    rune: '⟡',
    quote: 'Magic is not merely power. It is the art of shaping what the world believes to be impossible.',
    body: [
      'True magic is never forced upon the waking world; it is a sacred pact negotiated in quiet contemplation. One must learn the vibration of obsidian stone, the hum of moonlight through spider silk, and the whispers of midnight mist.',
      'The glowing violet orb held aloft in her hand is neither flame nor solid crystal, but distilled living intention. It bends the fragile boundaries of physical space and grants sight beyond mortal horizons.',
      'To cast without reverence is to invite ruin. To cast with profound clarity is to mend the very seams of reality.',
    ],
    seal: 'Penned in Nightshade Ink',
  },
  {
    num: 3,
    chapter: 'Tome of Shadows • Folio III',
    title: 'The Forbidden Secret',
    rune: '✦',
    quote: 'Some doors are not meant to be opened. Yet every curious soul eventually finds a key.',
    body: [
      'Deep beneath the twisted roots of the enchanted grove lies the threshold between this realm and the astral void.',
      'The ancient covenant was carved upon standing monoliths three centuries past: so long as the moon climbs the evening sky, the forest shall never succumb to oblivion. In return, she remains its timeless warden.',
      'Those who seek the threshold with deceit in their hearts find only endless briars and illusions. But those who approach with reverence discover secrets that transcend mortality.',
    ],
    seal: 'Sealed with the Spiderweb Sigil',
  },
]

const INCANTATION_RUNES = [
  { id: 1, sym: 'ᚠ', name: 'Fehu', label: 'Spirit Spark' },
  { id: 2, sym: 'ᚢ', name: 'Uruz', label: 'Ancient Force' },
  { id: 3, sym: 'ᚦ', name: 'Thurisaz', label: 'Portal Ward' },
]

export default function Spellbook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [bookTilt, setBookTilt] = useState({ x: 0, y: 0 })
  const [activatedRunes, setActivatedRunes] = useState([])
  const [ritualActive, setRitualActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const bookRef = useRef(null)
  const sectionRef = useRef(null)

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

  const handleMouseMove = (e) => {
    if (!bookRef.current) return
    const rect = bookRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setBookTilt({ x: x * 8, y: y * -8 })
  }

  const handleMouseLeave = () => {
    setBookTilt({ x: 0, y: 0 })
  }

  const toggleRune = (id) => {
    if (activatedRunes.includes(id)) {
      setActivatedRunes(activatedRunes.filter((r) => r !== id))
    } else {
      const next = [...activatedRunes, id]
      setActivatedRunes(next)
      if (next.length === 3) {
        setRitualActive(true)
        setTimeout(() => setRitualActive(false), 3500)
      }
    }
  }

  const page = SPELLBOOK_PAGES[currentPage]

  return (
    <section
      id="spellbook"
      ref={sectionRef}
      className="spellbook-section"
      aria-label="Section 5 — The Ancient Spellbook: Knowledge Written in Shadows"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '120px 0',
        background: 'radial-gradient(circle at 50% 50%, #150826 0%, #0d061a 50%, #090711 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Grimoire Glow Aura */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 60vw, 750px)',
          height: '420px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(181,106,255,0.2) 0%, rgba(121,53,201,0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'pulse-glow 5s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header with Exact Prompt Heading */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 56,
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
              ANCIENT GRIMOIRE
            </span>
            <span style={{ color: 'var(--bright-purple)' }}>✦</span>
          </div>

          <h2
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Knowledge Written in{' '}
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
              Shadows
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
            "Some knowledge was never meant to be forgotten."
          </p>
        </div>

        {/* ─────── THE LARGE FLOATING ANCIENT SPELLBOOK ─────── */}
        <div
          ref={bookRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: 18,
            background:
              'radial-gradient(ellipse at 50% 20%, #1e0b35 0%, #10061e 60%, #19092c 100%)',
            border: '2px solid rgba(181,106,255,0.38)',
            boxShadow:
              '0 35px 85px rgba(0,0,0,0.95), 0 0 55px rgba(181,106,255,0.4)',
            padding: 'clamp(28px, 5vw, 52px)',
            transform: `perspective(1000px) rotateY(${bookTilt.x}deg) rotateX(${bookTilt.y}deg)`,
            transition: 'transform 0.1s ease-out, box-shadow 0.4s ease',
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Subtle Spellbook Watermark Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/cinematic/spellbook-grimoire.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.12,
              borderRadius: 18,
              pointerEvents: 'none',
              filter: 'blur(3px)',
            }}
            aria-hidden="true"
          />

          {/* Book Spine Center Glow Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: 2,
              background:
                'linear-gradient(180deg, transparent, rgba(181,106,255,0.6), transparent)',
              boxShadow: '0 0 16px rgba(181,106,255,0.8)',
              zIndex: 2,
            }}
            aria-hidden="true"
          />

          {/* Spellbook Inner Page Content */}
          <div style={{ position: 'relative', zIndex: 5 }}>

            {/* Folio Header & Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-purple-900/40 gap-3">
              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontSize: 28,
                    color: 'var(--bright-purple)',
                    textShadow: '0 0 16px var(--bright-purple)',
                  }}
                >
                  {page.rune}
                </span>
                <div>
                  <span
                    className="font-cinzel text-xs uppercase"
                    style={{ color: 'var(--soft-lavender)', letterSpacing: '0.2em' }}
                  >
                    {page.chapter}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {page.title}
                  </h3>
                </div>
              </div>

              {/* Page Number Badge */}
              <div
                className="font-cinzel text-xs uppercase"
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  background: 'rgba(181,106,255,0.12)',
                  border: '1px solid rgba(181,106,255,0.3)',
                  color: 'var(--soft-lavender)',
                  letterSpacing: '0.15em',
                  alignSelf: 'flex-start',
                }}
              >
                Page {currentPage + 1} of {SPELLBOOK_PAGES.length}
              </div>
            </div>

            {/* Exact Required User Page Quote */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 10,
                background: 'rgba(141,67,214,0.12)',
                borderLeft: '3px solid var(--bright-purple)',
                marginBottom: 24,
                boxShadow: '0 0 20px rgba(141,67,214,0.15)',
              }}
            >
              <p
                className="font-cormorant italic text-lg sm:text-xl"
                style={{
                  color: '#ffffff',
                  lineHeight: 1.5,
                  textShadow: '0 0 12px rgba(201,155,255,0.6)',
                }}
              >
                "{page.quote}"
              </p>
            </div>

            {/* Page Lore Paragraphs */}
            <div style={{ minHeight: 170, marginBottom: 28 }}>
              {page.body.map((p, idx) => (
                <p
                  key={idx}
                  className="font-cormorant text-base sm:text-lg mb-4"
                  style={{
                    color: '#e2d5f0',
                    lineHeight: 1.8,
                    fontSize: '1.05rem',
                  }}
                >
                  {p}
                </p>
              ))}

              {/* Interactive Resonant Incantation Runes */}
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <span
                  className="font-cinzel text-xs uppercase tracking-widest block mb-3"
                  style={{ color: 'var(--soft-lavender)', fontSize: '10px' }}
                >
                  ✦ RESONATE RUNES TO EMPOWER THIS FOLIO ✦
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                  {INCANTATION_RUNES.map((r) => {
                    const isActive = activatedRunes.includes(r.id)
                    return (
                      <button
                        key={r.id}
                        onClick={() => toggleRune(r.id)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 20,
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(181,106,255,0.4), rgba(121,53,201,0.6))'
                            : 'rgba(17,11,29,0.7)',
                          border: isActive
                            ? '1px solid #ffffff'
                            : '1px solid rgba(181,106,255,0.25)',
                          boxShadow: isActive ? '0 0 20px rgba(181,106,255,0.7)' : 'none',
                          color: isActive ? '#ffffff' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 18,
                            color: isActive ? '#ffffff' : 'var(--bright-purple)',
                          }}
                        >
                          {r.sym}
                        </span>
                        <span
                          className="font-cinzel text-xs uppercase"
                          style={{ letterSpacing: '0.1em' }}
                        >
                          {r.name}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {ritualActive && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: '10px 18px',
                      borderRadius: 8,
                      background: 'rgba(75,20,120,0.75)',
                      border: '1px solid #b56aff',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.15em',
                      animation: 'rune-appear 0.4s ease-out',
                      boxShadow: '0 0 25px rgba(181,106,255,0.7)',
                    }}
                  >
                    ✦ CELESTIAL ALIGNMENT RESONATES • GRIMOIRE EMPOWERED ✦
                  </div>
                )}
              </div>
            </div>

            {/* Marginalia & Page Turn Controls */}
            <div
              style={{
                borderTop: '1px solid rgba(181,106,255,0.2)',
                paddingTop: 18,
                display: 'flex',
                flexDirection: 'column',
                smDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span
                className="font-cormorant italic text-xs"
                style={{ color: 'var(--soft-lavender)', opacity: 0.7 }}
              >
                ~ {page.seal} ~
              </span>

              {/* Navigation Page Turn Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 20,
                    fontSize: '11px',
                    fontFamily: 'Cinzel, serif',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: '1px solid rgba(181,106,255,0.3)',
                    color:
                      currentPage === 0
                        ? 'rgba(181,106,255,0.3)'
                        : 'var(--soft-lavender)',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  ‹ Previous
                </button>

                {/* Page indicator dots */}
                <div className="flex items-center gap-2">
                  {SPELLBOOK_PAGES.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background:
                          i === currentPage
                            ? 'var(--bright-purple)'
                            : 'rgba(181,106,255,0.25)',
                        boxShadow:
                          i === currentPage ? '0 0 10px var(--bright-purple)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(SPELLBOOK_PAGES.length - 1, currentPage + 1)
                    )
                  }
                  disabled={currentPage === SPELLBOOK_PAGES.length - 1}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 20,
                    fontSize: '11px',
                    fontFamily: 'Cinzel, serif',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: '1px solid rgba(181,106,255,0.3)',
                    color:
                      currentPage === SPELLBOOK_PAGES.length - 1
                        ? 'rgba(181,106,255,0.3)'
                        : 'var(--bright-purple)',
                    cursor:
                      currentPage === SPELLBOOK_PAGES.length - 1
                        ? 'not-allowed'
                        : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Next ›
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
