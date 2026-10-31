import React, { useEffect, useRef } from 'react'

/**
 * Ultra-lightweight Scroll Progress Bar
 * - GPU accelerated via transform: scaleX()
 * - Throttled via requestAnimationFrame
 * - 0 React re-renders during scrolling
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = document.documentElement
          const scrolled = el.scrollTop || document.body.scrollTop
          const total = el.scrollHeight - el.clientHeight
          const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0
          bar.style.transform = `scaleX(${progress})`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        transformOrigin: '0 0',
        transform: 'scaleX(0)',
        willChange: 'transform',
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  )
}
