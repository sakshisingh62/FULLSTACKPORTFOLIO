import React, { useState } from 'react'
import { FiMenu, FiX, FiExternalLink } from 'react-icons/fi'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'GitHub', href: '#github' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="header-nav">
      <div className="container nav-container">
        <a href="#hero" className="brand-mark">
          <span className="brand-dot" />
          <span className="brand-text-shimmer">SAKSHI</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <DarkModeToggle />

          <a
            href="/Sakshi_FullStack_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
          >
            Resume <FiExternalLink size={13} />
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Theme</span>
            <DarkModeToggle />
          </div>
          <a
            href="/Sakshi_FullStack_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: '0.75rem', width: '100%' }}
            onClick={() => setMobileOpen(false)}
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  )
}
