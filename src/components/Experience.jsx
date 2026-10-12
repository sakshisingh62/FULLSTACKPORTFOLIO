import React from 'react'

export default function Experience() {
  const experiences = [
    {
      company: 'Neximprove',
      role: 'Frontend Developer Intern',
      period: '6 Months · Completed',
      description: 'Worked with Next.js to develop responsive web applications and UI components.',
      bullets: [
        'Developed responsive web applications using Next.js.',
        'Built and refined reusable UI components.',
        'Certificate available as referenced in the resume.',
      ],
      tags: ['Next.js', 'React.js', 'Responsive UI', 'UI Components'],
    },
    {
      company: 'Neximprove',
      role: 'Full Stack Developer Intern',
      period: '2 Months · Present',
      description: 'Currently working across frontend and backend development.',
      bullets: [
        'Contributing to frontend development tasks.',
        'Contributing to backend development tasks.',
        'Collaborating to turn product ideas into functional projects.',
      ],
      tags: ['Frontend', 'Backend', 'Full Stack Development'],
    },
  ]

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <span className="section-label">Professional Background</span>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Frontend and full-stack development experience at Neximprove.
        </p>

        <div className="experience-list">
          {experiences.map((experience) => (
            <div key={experience.role} className="exp-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{experience.role}</h3>
                  <div className="exp-company">{experience.company}</div>
                </div>
                <span className="exp-period">{experience.period}</span>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {experience.description}
              </p>

              <ul className="exp-bullets">
                {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>

              <div className="cs-pills" style={{ marginTop: '1.25rem' }}>
                {experience.tags.map((tag) => <span key={tag} className="tech-pill">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
