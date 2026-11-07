import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Stage {
  number: string
  title: string
  category: string
  description: string
  metric: string
}

const stages: Stage[] = [
  {
    number: '01',
    title: 'Discover',
    category: 'SCOPING & GOALS',
    description: 'Understand the business problem, goals and constraints.',
    metric: 'Requirement Clarity',
  },
  {
    number: '02',
    title: 'Research',
    category: 'INVESTIGATION',
    description: 'Analyze users, markets, technologies and relevant information.',
    metric: 'Evidence Triangulation',
  },
  {
    number: '03',
    title: 'Design',
    category: 'SYSTEM BLUEPRINT',
    description: 'Define the system, experience, architecture and solution.',
    metric: 'Architectural Spec',
  },
  {
    number: '04',
    title: 'Build',
    category: 'CORE IMPLEMENTATION',
    description: 'Develop, integrate and test the solution.',
    metric: 'Production Code',
  },
  {
    number: '05',
    title: 'Deploy',
    category: 'PRODUCTION RELEASE',
    description: 'Launch the system and make it operational.',
    metric: 'Operational SLA',
  },
  {
    number: '06',
    title: 'Improve',
    category: 'CONTINUOUS EVOLUTION',
    description: 'Measure, learn, optimize and continue evolving.',
    metric: 'Telemetry Feedback',
  },
]

export const Process: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="approach" className="relative py-24 sm:py-32 border-b border-subtle-border overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-accent-green/[0.04] blur-3xl pointer-events-none" />

      {/* Engineering crosshairs */}
      <div className="absolute top-8 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute top-8 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-16 sm:mb-24 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-green/[0.08] to-transparent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-green uppercase">
              OUR APPROACH
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
            From problem to solution.
          </h2>
          <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
            A systematic engineering methodology designed for predictable execution, zero bloat, and durable system value.
          </p>
        </motion.div>

        {/* Desktop: Interactive Horizontal Progression with Gradient Flow Line */}
        <div className="hidden lg:block relative">
          
          {/* Continuous horizontal gradient guide line */}
          <div 
            className="absolute top-4 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-teal-400 to-accent-blue opacity-40" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-6 gap-5 relative">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStage
              const isPast = idx <= activeStage

              return (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : idx * 0.08, ease: 'easeOut' }}
                  onMouseEnter={() => setActiveStage(idx)}
                  className={`pt-10 group relative p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.03] border border-accent-blue/40 shadow-[0_4px_24px_rgba(37,99,235,0.15)]'
                      : 'hover:bg-white/[0.015] border border-transparent'
                  }`}
                >
                  {/* Node point on the gradient line */}
                  <div 
                    className={`absolute top-[11px] left-4 w-[11px] h-[11px] rounded-full transition-all duration-300 border-2 border-[#080C14] ${
                      isPast
                        ? 'bg-gradient-to-r from-accent-green to-accent-blue shadow-[0_0_12px_#10B981] scale-110'
                        : 'bg-slate-700'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs tracking-wider transition-colors duration-150 ${
                      isActive ? 'text-accent-blue font-bold' : 'text-muted-text/70'
                    }`}>
                      {stage.number}
                    </span>
                    <span className="text-[9px] font-mono text-muted-text/50">
                      STEP {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-primary-text mb-1 tracking-tight group-hover:text-white transition-colors duration-150">
                    {stage.title}
                  </h3>

                  <span className="inline-block text-[10px] font-mono tracking-wider text-accent-green/80 uppercase mb-2">
                    {stage.category}
                  </span>

                  <p className="text-xs text-secondary-text leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-muted-text/60">
                    OUTPUT: <span className="text-secondary-text">{stage.metric}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Stack with Gradient Left Guide Line */}
        <div className="lg:hidden relative pl-6 border-l-2 border-gradient-to-b from-accent-green to-accent-blue space-y-8">
          {stages.map((stage, idx) => (
            <div key={stage.number} className="relative group p-4 rounded border border-white/[0.05] bg-white/[0.01]">
              {/* Node indicator on vertical line */}
              <div 
                className="absolute -left-[32px] top-6 w-[10px] h-[10px] rounded-full bg-accent-blue border-2 border-[#080C14] shadow-[0_0_8px_#2563EB]"
                aria-hidden="true"
              />

              <div className="flex items-baseline justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-accent-blue font-bold">
                    {stage.number}
                  </span>
                  <h3 className="text-lg font-semibold text-primary-text">
                    {stage.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-muted-text/60">PHASE 0{idx + 1}</span>
              </div>

              <p className="text-xs font-mono text-accent-green uppercase mb-2">
                {stage.category}
              </p>

              <p className="text-sm text-secondary-text leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
