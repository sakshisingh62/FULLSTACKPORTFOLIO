import React from 'react'
import { FiAward, FiBriefcase } from 'react-icons/fi'

export default function BeyondProjects() {
  const items = [
    {
      icon: <FiAward size={22} />,
      title: 'Jury Member',
      badge: 'Navgurukul Experiences',
      date: 'Community Experience',
      desc: 'Supported student project evaluation and helped align project architectures with industry standards.',
      bullets: [
        'Standardized evaluation metrics for consistent project reviews.',
        'Provided technical feedback to more than 50 students.',
        'Aligned project architectures with industry standards.',
      ],
      tags: ['Evaluation Metrics', 'Technical Feedback', '50+ Students'],
    },
    {
      icon: <FiBriefcase size={22} />,
      title: 'Facility In-Charge',
      badge: 'Navgurukul Experiences',
      date: 'Community Experience',
      desc: 'Managed campus logistics and administrative workflows with a focus on operational efficiency.',
      bullets: [
        'Optimized campus logistics and administrative processes.',
        'Spearheaded facility management initiatives.',
        'Improved day-to-day operational efficiency.',
      ],
      tags: ['Campus Logistics', 'Administration', 'Operations'],
    },
  ]

  return (
    <section id="beyond" className="beyond-section">
      <div className="container">
        <span className="section-label">Community Experience</span>
        <h2 className="section-title">Navgurukul Experiences</h2>
        <p className="section-subtitle">
          Leadership and operations experience supporting student evaluation and campus workflows.
        </p>

        <div className="projects-mini-grid">
          {items.map((item) => (
            <div key={item.title} className="mini-card" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--accent-cyan)' }}>{item.icon}</div>
                  <span className="tech-pill" style={{ color: 'var(--accent-cyan)', borderColor: 'var(--border-hover)' }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {item.date}
                </div>

                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {item.desc}
                </p>

                <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet} style={{ marginBottom: '0.4rem', lineHeight: 1.5 }}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="cs-pills">
                {item.tags.map((tag) => <span key={tag} className="tech-pill">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
