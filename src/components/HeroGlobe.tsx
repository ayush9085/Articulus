import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const HeroGlobe: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -(y * 18), y: x * 18 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      className="relative w-full aspect-square max-w-[440px] sm:max-w-[480px] mx-auto flex items-center justify-center p-4 sm:p-6 select-none cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dual ambient gradient backdrops mirroring the globe hemispheres */}
      <div className="absolute -left-12 top-1/4 w-60 h-60 rounded-full bg-accent-green/[0.18] blur-[85px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute -right-12 bottom-1/4 w-60 h-60 rounded-full bg-accent-blue/[0.25] blur-[95px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      {/* Orbit 1: Outer Technical Ring with Cardinal Ticks */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/[0.07] pointer-events-none flex items-center justify-center">
        <span className="absolute top-1 text-[8px] font-mono text-muted-text/50">00°</span>
        <span className="absolute bottom-1 text-[8px] font-mono text-muted-text/50">180°</span>
        <span className="absolute left-1 text-[8px] font-mono text-muted-text/50">270°</span>
        <span className="absolute right-1 text-[8px] font-mono text-muted-text/50">90°</span>
      </div>

      {/* Orbit 2: Rotating Technical Dashed Circuit Ring */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 sm:inset-10 rounded-full border border-dashed border-white/[0.12] pointer-events-none"
      />

      {/* Orbit 3: Inner Counter-Rotating Precision Reticle */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-16 sm:inset-20 rounded-full border border-white/[0.05] pointer-events-none"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_#10B981]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_#2563EB]" />
      </motion.div>

      {/* Crosshair Accent Marks */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-white/30">+</div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-white/30">+</div>
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/30">+</div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/30">+</div>

      {/* Interactive 3D Card Container */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: shouldReduceMotion ? 0 : [0, -10, 0],
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 220, damping: 20 },
          rotateY: { type: 'spring', stiffness: 220, damping: 20 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-[78%] h-[78%] flex items-center justify-center"
      >
        {/* Glow halo directly behind the official emblem */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-accent-green/25 via-transparent to-accent-blue/35 blur-2xl pointer-events-none" />

        {/* The Official Articulus Circuit Globe Emblem */}
        <img
          src="/articulus-emblem.png"
          alt="Articulus Official Circuit Globe"
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_32px_rgba(37,99,235,0.45)] group-hover:drop-shadow-[0_0_48px_rgba(16,185,129,0.55)] transition-all duration-300"
        />

        {/* Bottom Floating Telemetry Badge */}
        <div className="absolute -bottom-4 z-20 px-3 py-1 rounded-full border border-white/[0.12] bg-[#080C14]/90 backdrop-blur-md flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-secondary-text uppercase font-medium">
            ARTICULUS // INTELLIGENCE CORE
          </span>
        </div>
      </motion.div>
    </div>
  )
}
