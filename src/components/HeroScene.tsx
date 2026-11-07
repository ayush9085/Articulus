import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HeroVisualFallback } from './HeroVisualFallback'

interface NetworkProps {
  reducedMotion: boolean
  isMobile: boolean
}

const NetworkGraph: React.FC<NetworkProps> = ({ reducedMotion, isMobile }) => {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  // Node count: 36 on mobile, 48 on desktop
  const nodeCount = isMobile ? 36 : 48

  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const colArray: number[] = []

    const colorGreen = new THREE.Color('#10B981')
    const colorGreenBright = new THREE.Color('#22C55E')
    const colorBlue = new THREE.Color('#2563EB')
    const colorBlueDeep = new THREE.Color('#0038A8')
    const colorWhite = new THREE.Color('#F8FAFC')

    // Construct a dual-hemisphere circuit sphere matching the logo
    for (let i = 0; i < nodeCount; i++) {
      const u = (i + 0.5) / nodeCount
      const phi = Math.acos(1 - 2 * u)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i // Fibonacci spherical distribution

      // Radius with slight structured variations to feel like circuit layers
      const radius = 1.45 + (i % 4 === 0 ? 0.2 : i % 4 === 2 ? -0.15 : 0.05)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.95
      const z = radius * Math.cos(phi)

      const pt = new THREE.Vector3(x, y, z)
      pts.push(pt)

      // Dual-hemisphere palette from the Articulus logo:
      // Left side (x < -0.1) -> Circuit Green
      // Right side (x > 0.1) -> Circuit Blue
      // Center seam (-0.1 <= x <= 0.1) -> Transition white/core
      if (x < -0.15) {
        const c = i % 2 === 0 ? colorGreen : colorGreenBright
        colArray.push(c.r, c.g, c.b)
      } else if (x > 0.15) {
        const c = i % 2 === 0 ? colorBlue : colorBlueDeep
        colArray.push(c.r, c.g, c.b)
      } else {
        colArray.push(colorWhite.r, colorWhite.g, colorWhite.b)
      }
    }

    // Connect nodes within a proximity threshold
    const lineCoords: number[] = []
    const lineColArray: number[] = []
    const maxDist = isMobile ? 1.05 : 0.98

    for (let i = 0; i < pts.length; i++) {
      let connections = 0
      for (let j = i + 1; j < pts.length; j++) {
        const d = pts[i].distanceTo(pts[j])
        if (d < maxDist && connections < 3) {
          lineCoords.push(pts[i].x, pts[i].y, pts[i].z)
          lineCoords.push(pts[j].x, pts[j].y, pts[j].z)

          // Color line based on which hemisphere it connects
          const avgX = (pts[i].x + pts[j].x) / 2
          if (avgX < -0.1) {
            lineColArray.push(colorGreen.r, colorGreen.g, colorGreen.b)
            lineColArray.push(colorGreen.r, colorGreen.g, colorGreen.b)
          } else if (avgX > 0.1) {
            lineColArray.push(colorBlue.r, colorBlue.g, colorBlue.b)
            lineColArray.push(colorBlue.r, colorBlue.g, colorBlue.b)
          } else {
            lineColArray.push(colorWhite.r * 0.8, colorWhite.g * 0.8, colorWhite.b * 0.8)
            lineColArray.push(colorWhite.r * 0.8, colorWhite.g * 0.8, colorWhite.b * 0.8)
          }
          connections++
        }
      }
    }

    return {
      positions: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
      colors: new Float32Array(colArray),
      linePositions: new Float32Array(lineCoords),
      lineColors: new Float32Array(lineColArray),
    }
  }, [nodeCount, isMobile])

  // Track subtle mouse move on window for interactive depth
  useEffect(() => {
    if (reducedMotion || isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 0.4
      const ny = (e.clientY / window.innerHeight - 0.5) * 0.3
      targetRotation.current = { x: ny, y: nx }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion, isMobile])

  // Frame animation: continuous orbital rotation with mouse parallax dampening
  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.08
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Node Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.055 : 0.065}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>

      {/* Thin Interconnecting Circuit Traces */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Center Kernel Anchor */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#F8FAFC" />
      </mesh>
    </group>
  )
}

export const HeroScene: React.FC = () => {
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
    return <HeroVisualFallback />
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
      {/* Dual ambient gradient glows reflecting the logo hemispheres */}
      <div className="absolute -left-8 top-1/3 w-48 h-48 rounded-full bg-accent-green/12 blur-3xl pointer-events-none" />
      <div className="absolute -right-8 bottom-1/3 w-48 h-48 rounded-full bg-accent-blue/18 blur-3xl pointer-events-none" />

      {/* Subtle outer geometric orbit boundary */}
      <div className="absolute inset-4 rounded-full border border-white/[0.05] pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-dashed border-white/[0.04] pointer-events-none" />

      {webglSupported && (
        <Canvas
          camera={{ position: [0, 0, 4.3], fov: 45 }}
          dpr={[1, isMobile ? 1.2 : 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          className="w-full h-full"
          aria-label="Interactive 3D network visualization representing the Articulus circuit sphere"
        >
          <NetworkGraph reducedMotion={reducedMotion} isMobile={isMobile} />
        </Canvas>
      )}
    </div>
  )
}
