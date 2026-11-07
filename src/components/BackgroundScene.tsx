import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  reducedMotion: boolean
  isMobile: boolean
}

const ParticleField: React.FC<ParticleFieldProps> = ({ reducedMotion, isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)

  // 65 points on mobile, 110 points on desktop for optimal performance & aesthetics
  const count = isMobile ? 65 : 110

  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []

    const colorGreen = new THREE.Color('#10B981')
    const colorBlue = new THREE.Color('#2563EB')
    const colorMuted = new THREE.Color('#334155')

    // Disperse particles across a wide 3D frustum box spanning the page depth
    const spreadX = isMobile ? 18 : 28
    const spreadY = 24
    const spreadZ = 16

    const pts: THREE.Vector3[] = []

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spreadX
      const y = (Math.random() - 0.5) * spreadY
      const z = (Math.random() - 0.5) * spreadZ - 2

      pts.push(new THREE.Vector3(x, y, z))
      pos.push(x, y, z)

      // Dual-palette distribution from Articulus brand colors
      const rand = Math.random()
      if (rand < 0.28) {
        col.push(colorGreen.r, colorGreen.g, colorGreen.b)
      } else if (rand < 0.56) {
        col.push(colorBlue.r, colorBlue.g, colorBlue.b)
      } else {
        col.push(colorMuted.r, colorMuted.g, colorMuted.b)
      }
    }

    // Connect close neighbors with subtle faint lines
    const linePos: number[] = []
    const lineCol: number[] = []
    const maxDist = isMobile ? 3.2 : 3.8

    for (let i = 0; i < pts.length; i++) {
      let connections = 0
      for (let j = i + 1; j < pts.length; j++) {
        const d = pts[i].distanceTo(pts[j])
        if (d < maxDist && connections < 2) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z)
          linePos.push(pts[j].x, pts[j].y, pts[j].z)

          const c1 = new THREE.Color(col[i * 3], col[i * 3 + 1], col[i * 3 + 2])
          const c2 = new THREE.Color(col[j * 3], col[j * 3 + 1], col[j * 3 + 2])
          lineCol.push(c1.r * 0.4, c1.g * 0.4, c1.b * 0.4)
          lineCol.push(c2.r * 0.4, c2.g * 0.4, c2.b * 0.4)
          connections++
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      linePositions: new Float32Array(linePos),
      lineColors: new Float32Array(lineCol),
    }
  }, [count, isMobile])

  // Scroll reaction
  const scrollOffset = useRef(0)
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      scrollOffset.current = progress * 6 // Subtle vertical travel over full page height
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse reaction
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    if (reducedMotion || isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion, isMobile])

  // Continuous gentle ambient drift
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    if (!reducedMotion) {
      // Gentle floating animation
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.08 + mouse.current.x * 0.2
      groupRef.current.rotation.x = Math.cos(t * 0.04) * 0.05 - mouse.current.y * 0.2
    }

    // Scroll vertical parallax interpolation
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      scrollOffset.current - 2,
      0.04
    )
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.095}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.16}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}

export const BackgroundScene: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(Boolean(gl))
    } catch {
      setWebglSupported(false)
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (webglSupported === false) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
    >
      {webglSupported && (
        <Canvas
          camera={{ position: [0, 0, 14], fov: 50 }}
          dpr={[1, isMobile ? 1.2 : 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          className="w-full h-full"
        >
          <ParticleField reducedMotion={reducedMotion} isMobile={isMobile} />
        </Canvas>
      )}
    </div>
  )
}
