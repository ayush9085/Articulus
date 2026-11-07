import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrandLogo } from './BrandLogo'

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative py-24 sm:py-32 border-b border-subtle-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent-green/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-accent-blue/[0.06] blur-3xl pointer-events-none" />

      {/* Engineering crosshairs */}
      <div className="absolute top-8 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute top-8 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Heading & Official Brand Emblem Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-blue/[0.08] to-transparent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-blue uppercase">
                  ABOUT ARTICULUS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
                Built for What's Next.
              </h2>
            </div>

            {/* Official Logo Identity Card */}
            <div className="relative p-6 sm:p-8 rounded-lg border border-subtle-border bg-gradient-to-br from-surface via-[#0B101D] to-background shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Top gradient border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-blue to-accent-blue-deep" />
              
              <div className="flex flex-col items-center text-center space-y-4">
                <BrandLogo size="lg" showBadge={true} />
                <div className="pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-[11px] font-mono text-muted-text/80">
                  <span>FOUNDATION</span>
                  <span className="text-accent-green">TECHNOLOGY &amp; RESEARCH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Applied Principles */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-lg sm:text-xl text-secondary-text leading-relaxed font-normal">
              Articulus is a technology and research company focused on building useful digital systems for modern businesses. We combine software, artificial intelligence, research and technical expertise to turn complex problems into practical solutions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-subtle-border">
              <div className="group p-5 rounded-lg border border-subtle-border bg-white/[0.015] hover:border-accent-blue/40 hover:bg-white/[0.03] transition-all duration-200">
                <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue text-xs font-mono font-bold mb-3 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  01
                </div>
                <h3 className="text-sm font-semibold tracking-wider text-primary-text uppercase mb-2">
                  Applied Engineering
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  We write clean, production-grade software and architecture designed for stability and real operational demands.
                </p>
              </div>

              <div className="group p-5 rounded-lg border border-subtle-border bg-white/[0.015] hover:border-accent-green/40 hover:bg-white/[0.03] transition-all duration-200">
                <div className="w-8 h-8 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green text-xs font-mono font-bold mb-3 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  02
                </div>
                <h3 className="text-sm font-semibold tracking-wider text-primary-text uppercase mb-2">
                  Systematic Inquiry
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  Every technical decision is grounded in methodical research, domain understanding, and objective analysis.
                </p>
              </div>
            </div>

            {/* Engineering Values Ribbon */}
            <div className="p-4 rounded border border-white/[0.06] bg-black/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-text">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <span>PRECISION CODE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>EMPIRICAL BENCHMARKING</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>DURABLE ARCHITECTURE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
