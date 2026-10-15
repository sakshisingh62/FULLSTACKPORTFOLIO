import React from 'react'

export default function About() {
  const exploringTags = ['MERN Stack', 'Next.js', 'Responsive UI', 'Real-time Features', 'Secure Authentication', 'Collaborative Development']

  return (
    <section id="about" className="about-section">
      <div className="container">
        <span className="section-label">Identity & Context</span>
        <h2 className="section-title">About Me</h2>

        <div className="about-card">
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}
          >
            I'm a Full-Stack Web Developer with strong MERN skills and a focus on building user-friendly web applications. I have worked with Next.js to create responsive web applications and UI components, and I am currently contributing to both frontend and backend development at Neximprove.
          </p>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            I enjoy collaborating with teams, turning ideas into functional projects, and creating simple, responsive experiences for users.
          </p>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <span className="section-label" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
              FOCUS AREAS
            </span>
            <div className="cs-pills">
              {exploringTags.map((tag) => (
                <span key={tag} className="tech-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
