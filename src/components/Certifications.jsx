import React from 'react'
import { FiExternalLink } from 'react-icons/fi'

const certifications = [
  {
    issuer: 'Coursera · LearnQuest',
    title: 'Introduction to Docker',
    description: 'Completed a practical course covering containerization, Docker workflows, application deployment, and software development fundamentals.',
    date: 'July 2026',
    skills: ['Docker', 'Containerization', 'Virtualization', 'Application Security', 'Data Persistence'],
    url: 'https://www.coursera.org/account/accomplishments/verify/ZOG1L6THE641',
  },
  {
    issuer: 'Google · Coursera',
    title: 'Introduction to Git and GitHub',
    description: 'Learned Git fundamentals, GitHub workflows, remote repositories, code collaboration, and version control practices.',
    date: 'February 2025',
    skills: ['Git', 'GitHub', 'Code Review', 'Version Control'],
    url: 'https://www.coursera.org/account/accomplishments/verify/ZVEOEHNLDG05',
  },
  {
    issuer: 'Vanderbilt University · Coursera',
    title: 'Prompt Engineering for ChatGPT',
    description: 'Learned practical prompt design techniques and strategies for creating effective interactions with generative AI tools.',
    skills: ['Prompt Design', 'ChatGPT', 'Generative AI'],
    url: 'https://www.coursera.org/account/accomplishments/verify/YOPS40D76S4H',
  },
  {
    issuer: 'Meta · Coursera',
    title: 'Version Control',
    description: 'Built foundational skills in Git, GitHub repositories, command-line workflows, code revisions, and collaborative development.',
    date: 'January 2025',
    skills: ['Git', 'GitHub', 'Linux Commands', 'Version Control'],
    url: 'https://www.coursera.org/account/accomplishments/verify/YFFMVOX0S6TY',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <span className="section-label">Verified Learning</span>
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Verified learning milestones across software development, tools, and modern engineering practices.
        </p>

        <div className="projects-mini-grid certification-grid">
          {certifications.map((certificate) => (
            <article key={certificate.title} className="mini-card certification-card">
              <div>
                <div className="certification-card-top">
                  <span className="section-label certification-issuer">{certificate.issuer}</span>
                  <span className="certification-date">{certificate.date || 'Verified'}</span>
                </div>
                <h3>{certificate.title}</h3>
                <p className="certification-description">{certificate.description}</p>
                <div className="certification-skills">
                  {certificate.skills.map((skill) => (
                    <span key={skill} className="tech-pill">{skill}</span>
                  ))}
                </div>
              </div>

              {certificate.url && (
                <a href={certificate.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline certification-link">
                  View Certificate <FiExternalLink size={14} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
