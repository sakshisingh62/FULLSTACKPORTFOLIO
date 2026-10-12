import React from 'react'
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi'

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="container">
        <span className="section-label">Academic Background</span>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">
          A blend of computer application studies and a strong foundation in communication and the humanities.
        </p>

        <div className="education-grid">
          <article className="education-card education-card-current">
            <div className="education-card-top">
              <span className="education-number">01</span>
              <span className="education-status">In progress</span>
            </div>
            <div className="education-icon" aria-hidden="true">
              <FiBookOpen />
            </div>
            <h3>Bachelor of Computer Applications</h3>
            <p className="education-institution">Eternal University, Baru Sahib</p>
            <div className="education-meta">
              <span><FiCalendar aria-hidden="true" /> July 2024 – Present</span>
              <span><FiMapPin aria-hidden="true" /> Baru Sahib</span>
            </div>
            <p className="education-description">Bachelor of Computer Application.</p>
          </article>

          <article className="education-card">
            <div className="education-card-top">
              <span className="education-number">02</span>
              <span className="education-status education-status-complete">Completed</span>
            </div>
            <div className="education-icon" aria-hidden="true">
              <FiBookOpen />
            </div>
            <h3>Bachelor of Art (English Honours)</h3>
            <p className="education-institution">Medininagar, Jharkhand</p>
            <div className="education-meta">
              <span><FiCalendar aria-hidden="true" /> July 2020 – December 2024</span>
              <span><FiMapPin aria-hidden="true" /> Medininagar</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
