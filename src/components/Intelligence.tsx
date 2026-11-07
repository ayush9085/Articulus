import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  {
    label: 'DATA',
    desc: 'Raw signals & unstructured inputs',
    transform: 'Ingestion & Vector Normalization',
    stage: 'PHASE 01',
    accent: 'border-slate-700',
  },
  {
    label: 'RESEARCH',
    desc: 'Systematic inquiry & verification',
    transform: 'Hypothesis & Empirical Testing',
    stage: 'PHASE 02',
    accent: 'border-slate-700',
  },
  {
    label: 'KNOWLEDGE',
    desc: 'Synthesized context & domain models',
    transform: 'Ontological Structuring & Reranking',
    stage: 'PHASE 03',
    accent: 'border-slate-700',
  },
  {
    label: 'INTELLIGENCE',
    desc: 'Actionable insight & pattern discovery',
    transform: 'Autonomous Inference & Synthesis',
    stage: 'PHASE 04',
    highlight: true,
    accent: 'border-accent-blue',
  },
  {
    label: 'DECISION',
    desc: 'Calculated strategy & architectural choice',
    transform: 'Risk Weighting & Tradeoff Scoring',
    stage: 'PHASE 05',
    accent: 'border-slate-700',
  },
  {
    label: 'ACTION',
    desc: 'Executed systems & high-impact results',
    transform: 'Deterministic Execution Engine',
    stage: 'PHASE 06',
    accent: 'border-accent-green',
  },
]

export const Intelligence: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3) // Default highlighted on INTELLIGENCE
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="intelligence" className="relative py-24 sm:py-32 border-b border-subtle-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-accent-green/[0.06] via-accent-blue/[0.10] to-transparent blur-[130px] pointer-events-none" />

      {/* Engineering crosshairs */}
      <div className="absolute top-8 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute top-8 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>

      <div className="relative max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-16 sm:mb-24 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-blue/[0.08] to-transparent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-blue uppercase">
              INTELLIGENCE
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
            From Information to Intelligence
          </h2>
          <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
            A disciplined architecture for transforming raw operational data into autonomous, high-conviction execution.
          </p>
        </motion.div>

        {/* Desktop Pipeline Visual Sequence */}
        <div className="hidden lg:grid grid-cols-6 gap-3.5 items-stretch">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : idx * 0.08, ease: 'easeOut' }}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative p-5 rounded-lg border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-accent-blue/60 bg-gradient-to-b from-accent-blue/[0.10] via-white/[0.02] to-transparent shadow-[0_4px_30px_rgba(37,99,235,0.22)] scale-[1.02]'
                    : 'border-subtle-border bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03]'
                }`}
              >
                {/* Top border accent line on active */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-accent-green to-accent-blue opacity-100 shadow-[0_0_8px_#2563EB]'
                      : 'opacity-0 group-hover:opacity-60 bg-white/30'
                  }`}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className={isSelected ? 'text-accent-blue font-bold' : 'text-muted-text/60'}>
                      {step.stage}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className={`font-mono text-sm transition-transform duration-200 ${
                        isSelected ? 'text-accent-blue translate-x-1 font-bold' : 'text-muted-text/40'
                      }`} aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold tracking-wider mb-2 transition-colors ${
                    isSelected ? 'text-white' : 'text-primary-text group-hover:text-white'
                  }`}>
                    {step.label}
                  </h3>

                  <p className="text-xs text-secondary-text leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-1">
                  <span className="text-[9px] font-mono tracking-wider text-muted-text/60 uppercase block">
                    Core Function
                  </span>
                  <p className={`text-[11px] font-mono leading-tight ${
                    isSelected ? 'text-accent-green' : 'text-muted-text/80'
                  }`}>
                    {step.transform}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile & Tablet Vertical Sequence */}
        <div className="lg:hidden flex flex-col space-y-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className={`p-5 rounded-lg border ${
                step.highlight
                  ? 'border-accent-blue/50 bg-gradient-to-b from-accent-blue/[0.08] to-accent-green/[0.04]'
                  : 'border-subtle-border bg-white/[0.015]'
              }`}>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-bold tracking-wider text-primary-text">
                    {step.label}
                  </h3>
                  <span className="text-xs font-mono text-muted-text/60">
                    {step.stage}
                  </span>
                </div>
                <p className="text-sm text-secondary-text mb-2">
                  {step.desc}
                </p>
                <div className="text-xs font-mono text-accent-blue">
                  FN: {step.transform}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center text-muted-text/50 my-1" aria-hidden="true">
                  <span className="text-base font-mono text-accent-blue/70">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
