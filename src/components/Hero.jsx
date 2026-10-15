import React from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowRight, FiExternalLink, FiBriefcase, FiBookOpen, FiCode, FiMail } from 'react-icons/fi'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-left">
            <Motion.div variants={itemVariants} className="hero-badge-tag">
              <span className="status-dot-pulse" />
              Open to Frontend & Full-Stack Developer Opportunities
            </Motion.div>

            <Motion.div variants={itemVariants} className="hero-title-container">
              <span className="hero-salutation">Hi, I'm</span>
              <h1 className="hero-name-attractive">
                <span className="name-text-shimmer">Sakshi</span>
                <span className="name-sparkle name-sparkle-top" aria-hidden="true">✦</span>
                <span className="name-sparkle name-sparkle-bottom" aria-hidden="true">✦</span>
              </h1>
            </Motion.div>

            <Motion.div variants={itemVariants} className="hero-subtitle">
              Full-Stack Web Developer building user-friendly web applications.
            </Motion.div>

            <Motion.p variants={itemVariants} className="hero-bio">
              I build responsive web applications with MongoDB, Express.js, React, Next.js, and Node.js. I enjoy turning ideas into functional products and collaborating on practical solutions.
            </Motion.p>

            <Motion.div variants={itemVariants} className="hero-ctas">
              <a href="#work" className="btn btn-primary">
                View My Work <FiArrowRight size={16} />
              </a>
              <a
                href="/Sakshi_FullStack_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Resume <FiExternalLink size={16} />
              </a>
              <a
                href="mailto:singhsakshi0365@gmail.com"
                className="hero-email-quick"
              >
                <FiMail size={14} /> singhsakshi0365@gmail.com
              </a>
            </Motion.div>
          </div>

          <Motion.div variants={itemVariants} className="hero-right">
            <div className="hero-photo-frame">
              <div className="photo-container">
                <img
                  src="/sakshi.jpg"
                  alt="Sakshi"
                  className="hero-photo-img"
                />
              </div>

              <div className="status-card-header">
                <FiCode size={14} /> Core Tech Stack
              </div>

              <div className="cs-pills" style={{ marginBottom: '1.25rem' }}>
                <span className="tech-pill">React.js</span>
                <span className="tech-pill">Next.js</span>
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Azure</span>
              </div>

              <div className="status-item">
                <FiBookOpen className="status-icon" size={18} />
                <div>
                  <div className="status-label">Bachelor of Computer Application</div>
                  <div className="status-val">Eternal University (July 2024 – Present)</div>
                </div>
              </div>

              <div className="status-item">
                <FiBriefcase className="status-icon" size={18} />
                <div>
                  <div className="status-label">Neximprove</div>
                  <div className="status-val">Frontend Developer Intern · 6 months completed</div>
                </div>
              </div>

              <div className="status-item">
                <FiBriefcase className="status-icon" size={18} />
                <div>
                  <div className="status-val">Full Stack Developer Intern · 2 months – Present</div>
                </div>
              </div>

              <div className="status-item" style={{ borderBottom: 'none' }}>
                <span className="status-dot-pulse" style={{ marginTop: '0.3rem' }} />
                <div>
                  <div className="status-label" style={{ color: 'var(--accent-green)' }}>
                    Available for Hiring
                  </div>
                  <div className="status-val">Full-Time / Software Engineering, Full Stack & AI/ML roles</div>
                </div>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  )
}
