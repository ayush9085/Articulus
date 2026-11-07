import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const BeyondServices: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32 border-b border-subtle-border bg-gradient-to-b from-white/[0.015] via-transparent to-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-accent-blue/[0.06] blur-[110px] pointer-events-none" />

      {/* Engineering crosshairs */}
      <div className="absolute top-8 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute top-8 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl space-y-8"
        >
          {/* Label with Green Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-green/[0.08] to-transparent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-green uppercase">
              BEYOND SERVICES
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
            Building beyond the brief.
          </h2>

          {/* Copy */}
          <p className="text-lg sm:text-xl text-secondary-text leading-relaxed font-normal">
            We are exploring how software, research and artificial intelligence can work together to help organizations understand complex information and make better decisions.
          </p>

          {/* Core Progression with Elevated Technical Frame */}
          <div className="pt-6 sm:pt-10">
            <div className="relative p-6 sm:p-8 rounded-lg border border-subtle-border bg-gradient-to-br from-surface via-[#0B101D] to-background shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-blue to-accent-blue-deep" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-accent-green uppercase">
                    LONG-TERM SYSTEM CONVERGENCE
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    The Articulus Trajectory
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-muted-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span>ACTIVE INITIATIVE</span>
                </div>
              </div>

              {/* Dynamic Step Sequence */}
              <div className="pt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="text-base sm:text-lg font-semibold tracking-wide text-primary-text">
                    Information
                  </span>
                </div>

                <span className="text-accent-blue font-mono text-xl" aria-hidden="true">→</span>

                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_#2563EB]" />
                  <span className="text-base sm:text-lg font-semibold tracking-wide bg-gradient-to-r from-blue-300 to-accent-blue bg-clip-text text-transparent">
                    Intelligence
                  </span>
                </div>

                <span className="text-accent-green font-mono text-xl" aria-hidden="true">→</span>

                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10B981]" />
                  <span className="text-base sm:text-lg font-semibold tracking-wide bg-gradient-to-r from-emerald-300 to-accent-green bg-clip-text text-transparent">
                    Action
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
