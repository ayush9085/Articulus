import React from 'react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showWordmark?: boolean
  showBadge?: boolean
  className?: string
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showBadge = false,
  className = '',
}) => {
  const sizeConfig = {
    sm: { emblem: 'w-7 h-7', text: 'text-base tracking-[0.18em]', gap: 'gap-2.5' },
    md: { emblem: 'w-9 h-9', text: 'text-lg sm:text-xl tracking-[0.2em]', gap: 'gap-3' },
    lg: { emblem: 'w-12 h-12', text: 'text-2xl sm:text-3xl tracking-[0.22em]', gap: 'gap-3.5' },
    xl: { emblem: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-3xl sm:text-4xl tracking-[0.24em]', gap: 'gap-5' },
  }[size]

  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} ${className}`}>
      {/* Precision Vector Circuit Emblem */}
      <div className={`relative ${sizeConfig.emblem} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
        <img
          src="/articulus-emblem.png"
          alt="Articulus Circuit Mark"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(37,99,235,0.35)]"
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <div className={`font-bold font-sans text-primary-text flex items-center select-none ${sizeConfig.text}`}>
            {/* The signature 'A' with green triangular delta inside */}
            <span className="relative inline-flex items-center justify-center font-black">
              <span>A</span>
              <span
                className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-accent-green"
                aria-hidden="true"
              />
            </span>
            <span className="tracking-[0.16em]">RTICULUS</span>
          </div>

          {showBadge && (
            <div className="flex items-center justify-center gap-2 mt-1 text-[10px] tracking-[0.3em] font-mono font-medium text-accent-green uppercase">
              <span className="w-4 h-[1px] bg-accent-green/50" />
              <span>SINCE 2026</span>
              <span className="w-4 h-[1px] bg-accent-green/50" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

