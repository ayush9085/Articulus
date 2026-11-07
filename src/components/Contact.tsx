import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ContactForm } from './ContactForm'

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-b border-subtle-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-accent-blue/[0.08] blur-3xl pointer-events-none" />

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
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle-border bg-gradient-to-r from-accent-blue/[0.08] to-transparent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-accent-blue uppercase">
                  GET IN TOUCH
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-primary-text leading-[1.15]">
                Have Something Worth Building?
              </h2>
              <p className="text-base sm:text-lg text-secondary-text leading-relaxed pt-2">
                Tell us what you're working on. We'll review your requirements and get back to you.
              </p>
            </div>

            {/* Direct Intake Info Card */}
            <div className="p-6 rounded-lg border border-subtle-border bg-gradient-to-br from-surface to-background space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-accent-green">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span>DIRECT INTAKE ACTIVE</span>
              </div>
              <p className="text-xs text-muted-text leading-relaxed font-mono">
                Every request is evaluated by engineering and technical research personnel to assess technical scope and feasibility.
              </p>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted-text/80">
                <span>RESPONSE TIMELINE</span>
                <span className="text-primary-text">&lt; 24 business hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-lg border border-subtle-border bg-gradient-to-br from-surface via-[#0B101D] to-background shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Top gradient border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-blue to-accent-blue-deep" />
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
