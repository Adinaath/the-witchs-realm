import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

const OBJECT_CONFIGS = {
  crystal_ball: {
    color: 0x9B30FF,
    emissive: 0x6010CC,
    geometry: 'sphere',
    particleColor: 0xB56AFF,
  },
  potion: {
    color: 0x5B10AA,
    emissive: 0x400080,
    geometry: 'cylinder',
    particleColor: 0xD8B7FF,
  },
  wand: {
    color: 0x2a0050,
    emissive: 0x7935C9,
    geometry: 'wand',
    particleColor: 0xB56AFF,
  },
  crystal: {
    color: 0x7935C9,
    emissive: 0x5B10AA,
    geometry: 'octahedron',
    particleColor: 0xD8B7FF,
  },
}

export default function MagicObject({ containerRef, type = 'crystal_ball', isHovered = false }) {
  const rendererRef = useRef(null)
  const rafRef = useRef(null)
  const isVisibleRef = useRef(true)
  const isHoveredRef = useRef(isHovered)
  const disposablesRef = useRef([])

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
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
    const container = containerRef?.current
    if (!container) return

    try {
      const test = document.createElement('canvas')
      const gl = test.getContext('webgl') || test.getContext('experimental-webgl')
      if (!gl) return
    } catch { return }

    const cfg = OBJECT_CONFIGS[type] || OBJECT_CONFIGS.crystal_ball

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    renderer.setPixelRatio(dpr)
    const w = container.clientWidth || 180
    renderer.setSize(w, w)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = false
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.zIndex = '2'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 3

    const disposables = disposablesRef.current

    let geo
    if (cfg.geometry === 'sphere') geo = new THREE.SphereGeometry(0.8, 12, 12)
    else if (cfg.geometry === 'cylinder') geo = new THREE.CylinderGeometry(0.4, 0.55, 1.4, 10)
    else if (cfg.geometry === 'wand') geo = new THREE.CylinderGeometry(0.08, 0.12, 2.0, 8)
    else if (cfg.geometry === 'octahedron') geo = new THREE.OctahedronGeometry(0.8, 1)
    else geo = new THREE.SphereGeometry(0.8, 10, 10)

    const mat = new THREE.MeshPhongMaterial({
      color: cfg.color,
      emissive: cfg.emissive,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9,
      shininess: 60,
    })
    disposables.push(geo, mat)

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe cage
    const wireGeo = geo.clone()
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xD8B7FF, wireframe: true, transparent: true, opacity: 0.25 })
    disposables.push(wireGeo, wireMat)
    const wire = new THREE.Mesh(wireGeo, wireMat)
    wire.scale.set(1.12, 1.12, 1.12)
    scene.add(wire)

    // Ambient light
    const light = new THREE.PointLight(cfg.particleColor, 1.8, 8)
    light.position.set(1, 1, 2)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0x100520, 1.2))

    let t = 0
    let last = performance.now()

    const animate = (now) => {
      if (!isVisibleRef.current) {
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(animate)

      const dt = Math.min((now - last) * 0.001, 0.1)
      last = now
      t += dt * (isHoveredRef.current ? 2.2 : 0.8)

      mesh.rotation.y = t * 0.6
      mesh.rotation.x = Math.sin(t * 0.4) * 0.2
      wire.rotation.y = -t * 0.4

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(([e]) => {
      const wasVisible = isVisibleRef.current
      isVisibleRef.current = e.isIntersecting
      if (e.isIntersecting && !wasVisible && !rafRef.current) {
        last = performance.now()
        rafRef.current = requestAnimationFrame(animate)
      }
    }, { threshold: 0.05 })
    observer.observe(container)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      cleanup()
    }
  }, [containerRef, type, cleanup])

  return null
}
