import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

/**
 * Cinematic Three.js Interactive Magic Orb (Fully Optimized)
 * - Glowing violet/magenta core with pulsing inner energy
 * - Transparent rotating outer plasma shell
 * - Orbiting runic energy rings
 * - Responsive stardust particle emission with hover acceleration & click explosion
 * - Fully stops rendering loop when offscreen (0% CPU / 0% GPU when scrolled away)
 * - DPR capped to 1.25, low-overhead geometries & materials
 * - Complete WebGL resource disposal on unmount
 */
export default function MagicOrb({ containerRef, mouseRef, onBurst }) {
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rafRef = useRef(null)
  const isVisibleRef = useRef(true)

  // Mesh refs
  const coreRef = useRef(null)
  const shellRef = useRef(null)
  const ringRef = useRef(null)
  const ring2Ref = useRef(null)
  const particlesRef = useRef(null)
  const burstParticlesRef = useRef(null)
  const pointLightRef = useRef(null)

  // Interactive state
  const isHoveredRef = useRef(false)
  const burstTimeRef = useRef(0)

  // Geometries and materials to dispose
  const disposablesRef = useRef([])

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    // Cleanly dispose all GPU resources
    disposablesRef.current.forEach((res) => {
      try {
        if (res.dispose) res.dispose()
      } catch {}
    })
    disposablesRef.current = []

    if (rendererRef.current) {
      try {
        rendererRef.current.dispose()
        rendererRef.current.forceContextLoss()
        if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement)
        }
      } catch {}
      rendererRef.current = null
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // WebGL Check
    try {
      const test = document.createElement('canvas')
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl')
      if (!gl) return
    } catch {
      return
    }

    const w = container.clientWidth || 140
    const h = container.clientHeight || 140

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'auto'
    renderer.domElement.style.cursor = 'pointer'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
    camera.position.z = 3.6
    cameraRef.current = camera

    const disposables = disposablesRef.current

    // 1. Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.55, 14, 14)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    })
    disposables.push(coreGeo, coreMat)
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)
    coreRef.current = core

    // 2. Inner Energy Aura Sphere
    const auraGeo = new THREE.SphereGeometry(0.72, 14, 14)
    const auraMat = new THREE.MeshLambertMaterial({
      color: 0xb56aff,
      emissive: 0x9b30ff,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.75,
    })
    disposables.push(auraGeo, auraMat)
    const aura = new THREE.Mesh(auraGeo, auraMat)
    scene.add(aura)

    // 3. Outer Plasma Shell (Icosahedron wireframe)
    const shellGeo = new THREE.IcosahedronGeometry(0.92, 1)
    const shellMat = new THREE.MeshPhongMaterial({
      color: 0x7935c9,
      emissive: 0x30104d,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.45,
      shininess: 90,
      wireframe: true,
    })
    disposables.push(shellGeo, shellMat)
    const shell = new THREE.Mesh(shellGeo, shellMat)
    scene.add(shell)
    shellRef.current = shell

    // 4. Orbiting Energy Ring 1 (Torus)
    const ringGeo = new THREE.TorusGeometry(1.15, 0.025, 6, 24)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd8b7ff,
      transparent: true,
      opacity: 0.75,
    })
    disposables.push(ringGeo, ringMat)
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)
    ringRef.current = ring

    // 5. Orbiting Energy Ring 2
    const ring2Geo = new THREE.TorusGeometry(1.28, 0.018, 5, 24)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xb56aff,
      transparent: true,
      opacity: 0.5,
    })
    disposables.push(ring2Geo, ring2Mat)
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    ring2.rotation.z = Math.PI / 6
    scene.add(ring2)
    ring2Ref.current = ring2

    // 6. Ambient Stardust Particles (32 particles - lightweight)
    const pCount = 32
    const pGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(pCount * 3)

    for (let i = 0; i < pCount; i++) {
      const radius = 0.8 + Math.random() * 0.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pPositions[i * 3 + 2] = radius * Math.cos(phi)
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))

    const pMat = new THREE.PointsMaterial({
      color: 0xd8b7ff,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    disposables.push(pGeo, pMat)
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)
    particlesRef.current = { points: particles, positions: pPositions }

    // 7. Click Burst Particles (24 particles)
    const bCount = 24
    const bGeo = new THREE.BufferGeometry()
    const bPositions = new Float32Array(bCount * 3)
    const bDirs = new Float32Array(bCount * 3)
    for (let i = 0; i < bCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      bDirs[i * 3] = Math.sin(phi) * Math.cos(theta)
      bDirs[i * 3 + 1] = Math.sin(phi) * Math.sin(theta)
      bDirs[i * 3 + 2] = Math.cos(phi)
    }
    bGeo.setAttribute('position', new THREE.BufferAttribute(bPositions, 3))
    const bMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
    disposables.push(bGeo, bMat)
    const burstPoints = new THREE.Points(bGeo, bMat)
    scene.add(burstPoints)
    burstParticlesRef.current = { points: burstPoints, positions: bPositions, dirs: bDirs, mat: bMat }

    // Lights
    const ambient = new THREE.AmbientLight(0x2a0050, 1.2)
    scene.add(ambient)

    const pointLight = new THREE.PointLight(0xd8b7ff, 3, 6)
    pointLight.position.set(0, 0, 0)
    scene.add(pointLight)
    pointLightRef.current = pointLight

    // Event Listeners for Interaction
    const dom = renderer.domElement
    const handleMouseEnter = () => { isHoveredRef.current = true }
    const handleMouseLeave = () => { isHoveredRef.current = false }
    const handleClick = () => {
      burstTimeRef.current = 1.0 // Trigger burst
      if (onBurst) onBurst()
    }

    dom.addEventListener('mouseenter', handleMouseEnter)
    dom.addEventListener('mouseleave', handleMouseLeave)
    dom.addEventListener('click', handleClick)

    // Animation Loop
    let t = 0
    let lastTime = performance.now()

    const animate = (now) => {
      // If offscreen, stop the loop completely
      if (!isVisibleRef.current) {
        rafRef.current = null
        return
      }

      rafRef.current = requestAnimationFrame(animate)

      const delta = Math.min((now - lastTime) * 0.001, 0.1)
      lastTime = now
      t += delta * (isHoveredRef.current ? 2.2 : 1.2)

      // Core pulse
      if (coreRef.current) {
        const pulse = 1.0 + Math.sin(t * 3.5) * 0.08
        coreRef.current.scale.set(pulse, pulse, pulse)
      }

      // Shell rotation
      if (shellRef.current) {
        shellRef.current.rotation.y = t * 0.4
        shellRef.current.rotation.x = Math.sin(t * 0.5) * 0.3
      }

      // Energy rings rotation
      if (ringRef.current) {
        ringRef.current.rotation.z = t * 0.8
        ringRef.current.rotation.y = Math.cos(t * 0.4) * 0.5
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z = -t * 0.6
        ring2Ref.current.rotation.x = Math.sin(t * 0.6) * 0.4
      }

      // Stardust particles swirling
      if (particlesRef.current) {
        particlesRef.current.points.rotation.y = t * 0.3
        particlesRef.current.points.rotation.x = Math.sin(t * 0.2) * 0.2
      }

      // Light intensity
      if (pointLightRef.current) {
        const targetIntensity = isHoveredRef.current ? 4.5 : 2.5 + Math.sin(t * 2) * 0.6
        pointLightRef.current.intensity = targetIntensity
      }

      // Burst animation
      if (burstTimeRef.current > 0 && burstParticlesRef.current) {
        burstTimeRef.current -= delta * 1.5
        const progress = 1.0 - Math.max(0, burstTimeRef.current)
        const bp = burstParticlesRef.current
        const pos = bp.positions
        const dirs = bp.dirs

        for (let i = 0; i < bCount; i++) {
          const dist = progress * 2.5
          pos[i * 3] = dirs[i * 3] * dist
          pos[i * 3 + 1] = dirs[i * 3 + 1] * dist
          pos[i * 3 + 2] = dirs[i * 3 + 2] * dist
        }
        bp.points.geometry.attributes.position.needsUpdate = true
        bp.mat.opacity = Math.max(0, burstTimeRef.current)
      }

      // Gentle Mouse Parallax
      if (mouseRef?.current) {
        const mx = (mouseRef.current.x - 0.5) * 0.4
        const my = (mouseRef.current.y - 0.5) * -0.4
        camera.position.x += (mx - camera.position.x) * 0.08
        camera.position.y += (my - camera.position.y) * 0.08
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }

    // Visibility Observer - start/stop rendering loop strictly on viewport presence
    const observer = new IntersectionObserver(([e]) => {
      const wasVisible = isVisibleRef.current
      isVisibleRef.current = e.isIntersecting
      if (e.isIntersecting && !wasVisible && !rafRef.current) {
        lastTime = performance.now()
        rafRef.current = requestAnimationFrame(animate)
      }
    }, { threshold: 0.05 })
    observer.observe(container)

    // Start initial loop
    rafRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      if (!container || !renderer) return
      const rw = container.clientWidth || 140
      const rh = container.clientHeight || 140
      camera.aspect = rw / rh
      camera.updateProjectionMatrix()
      renderer.setSize(rw, rh)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      dom.removeEventListener('mouseenter', handleMouseEnter)
      dom.removeEventListener('mouseleave', handleMouseLeave)
      dom.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      cleanup()
    }
  }, [containerRef, mouseRef, onBurst, cleanup])

  return null
}
