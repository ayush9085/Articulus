import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { HeroGlobe } from './HeroGlobe'

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      className="relative pt-[115px] sm:pt-[130px] lg:pt-[140px] pb-16 md:pb-24 flex items-center min-h-[690px] lg:min-h-[780px] border-b border-subtle-border/60 overflow-hidden"
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-subtle-grid opacity-70 pointer-events-none" />

      {/* Engineering crosshairs in section corners */}
      <div className="absolute top-24 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute top-24 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute bottom-6 left-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>
      <div className="absolute bottom-6 right-8 text-xs font-mono text-white/20 select-none pointer-events-none hidden sm:block">+</div>

      {/* Dual ambient gradient glows inspired by the Articulus logo */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full bg-accent-green/[0.08] blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full bg-accent-blue/[0.12] blur-[150px] pointer-events-none" />

      <div className="relative max-w-content mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* 60% Content Column (lg:col-span-7) */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
            className="lg:col-span-7 space-y-7 sm:space-y-8"
          >
            {/* Top Status & Brand Label */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-subtle-border bg-gradient-to-r from-accent-green/[0.08] via-white/[0.02] to-accent-blue/[0.08] shadow-sm backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_#2563EB]" />
              </div>
              <p className="text-xs sm:text-[13px] font-medium tracking-[0.22em] text-secondary-text uppercase">
                Technology · Research · Intelligence
              </p>
            </motion.div>

            {/* Main Headline with Logo-Inspired Gradient Accents */}
            <motion.h1
              variants={fadeUp}
              className="text-[36px] xs:text-[44px] sm:text-[58px] lg:text-[74px] font-bold tracking-tight text-primary-text leading-[1.04] break-words"
            >
              Technology.<br />
              <span className="bg-gradient-to-r from-blue-300 via-accent-blue to-blue-500 bg-clip-text text-transparent">
                Research.
              </span><br />
              <span className="bg-gradient-to-r from-emerald-300 via-accent-green to-teal-400 bg-clip-text text-transparent">
                Intelligence.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg lg:text-[19px] text-secondary-text max-w-xl leading-relaxed font-normal"
            >
              Articulus builds digital systems through software, artificial intelligence, research and automation.
            </motion.p>

            {/* CTAs with Elevated Interactions */}
            <motion.div variants={fadeUp} className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded text-sm sm:text-base font-medium bg-gradient-to-r from-accent-blue to-blue-700 hover:from-blue-500 hover:to-accent-blue text-white transition-all duration-200 shadow-[0_4px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_32px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Subtle light sweep shine */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                
                <span className="relative z-10">Work With Us</span>
                <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-150">→</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded text-sm sm:text-base font-medium border border-subtle-border hover:border-accent-green/50 text-secondary-text hover:text-primary-text bg-white/[0.02] hover:bg-gradient-to-r hover:from-white/[0.04] hover:to-accent-green/[0.06] transition-all duration-200 backdrop-blur-sm"
              >
                Explore
              </a>
            </motion.div>

            {/* Technical Capability Line */}
            <motion.div
              variants={fadeUp}
              className="pt-4 flex items-center gap-4 text-xs font-mono text-muted-text/70 border-t border-white/[0.06]"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>APPLIED ENGINEERING</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                <span>SYSTEM REASONING</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="items-center gap-2 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>RIGOROUS EXECUTION</span>
              </div>
            </motion.div>

          </motion.div>

          {/* 40% Visual Column (lg:col-span-5) - The Official Articulus Circuit Globe */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroGlobe />
          </div>

        </div>
      </div>
    </section>
  )
}
