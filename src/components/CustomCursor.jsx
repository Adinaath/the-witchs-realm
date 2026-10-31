import React, { useEffect, useRef } from 'react'

/**
 * High-Performance Hardware-Accelerated Custom Cursor
 * - 0ms latency: dot moves instantly via pointermove & translate3d (compositor thread)
 * - Smooth follower: ring lerps at 60/120fps with auto-sleep when resting
 * - 0 React re-renders on pointer movements or hover transitions
 * - Event delegation for interactive elements (handles dynamic modals & cards)
 * - Safe: pointer-events: none, strictly inert, disabled on mobile/touch screens
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Disable completely on touch devices or fine pointer absence
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHovering = false
    let isMoving = false
    let rafId = null

    const updateRing = () => {
      // Lerp ring towards mouse position
      const dx = mouseX - ringX
      const dy = mouseY - ringY

      ringX += dx * 0.22
      ringY += dy * 0.22

      // Offset by half dimensions (ring is 32px normal, 48px hovering)
      const offset = isHovering ? 24 : 16
      ring.style.transform = `translate3d(${ringX - offset}px, ${ringY - offset}px, 0)`

      // Keep animation running as long as movement hasn't fully settled
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || isMoving) {
        rafId = requestAnimationFrame(updateRing)
      } else {
        rafId = null
      }
    }

    const onPointerMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot moves with zero latency (instant 1:1 hardware synchronization)
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`

      isMoving = true
      if (!rafId) {
        rafId = requestAnimationFrame(updateRing)
      }

      // Settle flag after short delay
      clearTimeout(onPointerMove._settleTimer)
      onPointerMove._settleTimer = setTimeout(() => {
        isMoving = false
      }, 50)
    }

    // High performance event delegation for hover triggers
    const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [data-cursor="pointer"], .gallery-item, .relic-pedestal'

    const onPointerOver = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) {
        isHovering = true
        ring.classList.add('hovering')
        if (!rafId) rafId = requestAnimationFrame(updateRing)
      }
    }

    const onPointerOut = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) {
        isHovering = false
        ring.classList.remove('hovering')
        if (!rafId) rafId = requestAnimationFrame(updateRing)
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerout', onPointerOut, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(onPointerMove._settleTimer)
    }
  }, [])

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
