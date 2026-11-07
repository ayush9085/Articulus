import React from 'react'

export const HeroTransition: React.FC = () => {
  const capabilities = [
    { name: 'SOFTWARE', gradient: 'hover:text-blue-400' },
    { name: 'AI', gradient: 'hover:text-emerald-400' },
    { name: 'RESEARCH', gradient: 'hover:text-blue-400' },
    { name: 'AUTOMATION', gradient: 'hover:text-emerald-400' },
  ]

  return (
    <aside aria-label="Core Capabilities" className="relative border-b border-subtle-border bg-background py-5 sm:py-6 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-subtle-border-hover to-transparent" />

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 text-xs sm:text-[13px] tracking-[0.28em] font-medium text-muted-text">
          {capabilities.map((item, idx) => (
            <React.Fragment key={item.name}>
              <span className={`transition-colors duration-200 cursor-default ${item.gradient}`}>
                {item.name}
              </span>
              {idx < capabilities.length - 1 && (
                <span className="text-white/20 select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  )
}
