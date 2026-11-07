import React from 'react'
import { BrandLogo } from './BrandLogo'

export const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Approach', href: '#approach' },
    { name: 'Intelligence', href: '#intelligence' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative py-16 sm:py-20 bg-background text-secondary-text overflow-hidden">
      {/* Top subtle gradient border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-subtle-border to-transparent" />

      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-subtle-border">
          
          {/* Brand with Official Logo & Positioning */}
          <div className="space-y-3">
            <a href="#" className="inline-block hover:opacity-95 transition-opacity">
              <BrandLogo size="md" />
            </a>
            <p className="text-sm text-muted-text tracking-wide">
              Technology · Research · Intelligence
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-secondary-text hover:text-primary-text transition-colors duration-150 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gradient-h group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

        </div>

        {/* Copyright & Signoff */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-text/80 font-mono">
          <p>© 2026 Articulus. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden="true" />
            <span className="text-muted-text/60">Modern engineering &amp; research systems.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
