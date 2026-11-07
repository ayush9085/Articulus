import React, { useState, useEffect } from 'react'
import { BrandLogo } from './BrandLogo'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Approach', href: '#approach' },
    { name: 'Intelligence', href: '#intelligence' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-subtle-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand with Official Circuit Logo */}
        <a
          href="#"
          className="hover:opacity-95 transition-opacity duration-150"
          aria-label="Articulus Homepage"
        >
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary-text hover:text-primary-text transition-colors tracking-wide relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gradient-h group-hover:w-full transition-all duration-200" />
            </a>
          ))}

          {/* Understated CTA with Subtle Gradient Accent */}
          <a
            href="#contact"
            className="relative text-sm font-medium px-4 py-2 rounded border border-subtle-border hover:border-accent-blue/50 text-primary-text bg-white/[0.03] hover:bg-gradient-to-r hover:from-accent-blue/10 hover:to-accent-green/10 transition-all duration-200 shadow-sm"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-secondary-text hover:text-primary-text focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-subtle-border px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-base font-medium text-secondary-text hover:text-primary-text transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-muted-text/50">→</span>
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={closeMenu}
                className="inline-block w-full text-center text-sm font-medium px-4 py-2.5 rounded border border-accent-blue/40 text-primary-text bg-gradient-to-r from-accent-blue/20 to-accent-green/20 hover:from-accent-blue/30 hover:to-accent-green/30 transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
