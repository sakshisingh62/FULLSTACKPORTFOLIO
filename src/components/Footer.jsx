import React from 'react'
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="container">
        <div className="footer-connect-card">
          <span className="section-label">Let&apos;s connect</span>
          <h2 className="footer-title">Connect With Me</h2>
          <p className="footer-description">
            Have an opportunity, idea, or project in mind? I&apos;d love to hear from you.
          </p>

          <div className="footer-social-links">
            <a href="mailto:singhsakshi0365@gmail.com" className="footer-social-link">
              <FiMail aria-hidden="true" />
              <span>Email</span>
            </a>
            <a href="tel:+918709940015" className="footer-social-link">
              <FiPhone aria-hidden="true" />
              <span>Phone</span>
            </a>
            <a href="https://github.com/sakshisingh62" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FiGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sakshi-singh-a62017334/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FiLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a href="/Sakshi_FullStack_resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-social-link footer-resume-link">
              <FiFileText aria-hidden="true" />
              <span>Resume</span>
            </a>
          </div>

          <div className="footer-contact-details">
            <a href="mailto:singhsakshi0365@gmail.com">singhsakshi0365@gmail.com</a>
            <a href="tel:+918709940015">+91 8709940015</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <strong className="footer-name-shimmer">SAKSHI</strong>
            <span>Full-Stack Web Developer</span>
          </div>
          <span>© 2026 Sakshi. Built with care.</span>
        </div>
      </div>
    </footer>
  )
}
