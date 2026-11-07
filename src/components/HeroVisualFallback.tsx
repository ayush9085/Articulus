import React from 'react'

export const HeroVisualFallback: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center p-4">
      {/* Ambient gradient backdrops reflecting logo colors */}
      <div className="absolute -left-10 top-1/4 w-48 h-48 rounded-full bg-accent-green/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-10 bottom-1/4 w-48 h-48 rounded-full bg-accent-blue/15 blur-3xl pointer-events-none" />

      {/* Subtle outer geometric frames */}
      <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
      <div className="absolute inset-8 rounded-full border border-dashed border-white/[0.08]" />
      <div className="absolute inset-16 rounded-full border border-white/[0.04]" />

      <svg
        className="w-full h-full filter drop-shadow-[0_0_24px_rgba(37,99,235,0.2)]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34D399" />
            <stop offset="60%" stop-color="#10B981" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
          <linearGradient id="heroBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="60%" stop-color="#2563EB" />
            <stop offset="100%" stop-color="#0038A8" />
          </linearGradient>
          <linearGradient id="heroCenter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="50%" stop-color="#3B82F6" />
            <stop offset="100%" stop-color="#0038A8" />
          </linearGradient>
        </defs>

        {/* Central split dividing axis */}
        <line x1="200" y1="48" x2="200" y2="352" stroke="url(#heroCenter)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

        {/* Left Hemisphere (Circuit Green) */}
        <path
          d="M 194 60 A 140 140 0 0 0 194 340"
          stroke="url(#heroGreen)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Left Traces */}
        <path d="M 85 150 L 135 150 L 165 190 L 165 240" stroke="url(#heroGreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 80 260 L 120 260 L 150 295" stroke="url(#heroGreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 185 100 L 185 240 L 140 285" stroke="url(#heroGreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Left Circuit Node Pads */}
        <circle cx="85" cy="150" r="5" fill="#080C14" stroke="url(#heroGreen)" strokeWidth="2.5" />
        <circle cx="80" cy="260" r="5" fill="#080C14" stroke="url(#heroGreen)" strokeWidth="2.5" />
        <circle cx="165" cy="240" r="4" fill="url(#heroGreen)" />
        <circle cx="150" cy="295" r="4.5" fill="url(#heroGreen)" />
        <circle cx="185" cy="100" r="4" fill="url(#heroGreen)" />

        {/* Right Hemisphere (Circuit Blue) */}
        <path
          d="M 206 60 A 140 140 0 0 1 206 340"
          stroke="url(#heroBlue)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Right Traces */}
        <path d="M 215 95 L 245 130 L 245 195" stroke="url(#heroBlue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 315 160 L 275 160 L 250 215 L 250 270" stroke="url(#heroBlue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 315 265 L 265 265 L 230 305" stroke="url(#heroBlue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Right Circuit Node Pads */}
        <circle cx="315" cy="160" r="5" fill="#080C14" stroke="url(#heroBlue)" strokeWidth="2.5" />
        <circle cx="315" cy="265" r="5" fill="#080C14" stroke="url(#heroBlue)" strokeWidth="2.5" />
        <circle cx="245" cy="195" r="4.5" fill="url(#heroBlue)" />
        <circle cx="250" cy="270" r="4" fill="url(#heroBlue)" />
        <circle cx="230" cy="305" r="4.5" fill="url(#heroBlue)" />

        {/* Center Kernel Fusion Node */}
        <circle cx="200" cy="200" r="7" fill="#F8FAFC" />
        <circle cx="200" cy="200" r="14" stroke="url(#heroCenter)" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    </div>
  )
}
