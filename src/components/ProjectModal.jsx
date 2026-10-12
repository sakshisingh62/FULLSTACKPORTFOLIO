import React from 'react'
import { useStore } from '../store/useStore'
import { FiX, FiGithub, FiExternalLink, FiCalendar, FiUser, FiLayers } from 'react-icons/fi'

export default function ProjectModal() {
  const { selectedProject, setSelectedProject } = useStore()

  if (!selectedProject) return null

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <button
          className="modal-close"
          onClick={() => setSelectedProject(null)}
          aria-label="Close Case Study"
        >
          <FiX size={18} />
        </button>

        <span className="section-label" style={{ marginBottom: '0.25rem' }}>
          ENGINEERING CASE STUDY
        </span>
        <h2 id="case-study-title" className="cs-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {selectedProject.title}
        </h2>
        <div className="cs-tagline" style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          {selectedProject.tagline || selectedProject.desc}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
          }}
        >
          {selectedProject.role && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiUser style={{ color: 'var(--accent-blue)' }} />
              <strong>Role:</strong> {selectedProject.role}
            </div>
          )}
          {selectedProject.timeline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiCalendar style={{ color: 'var(--accent-blue)' }} />
              <strong>Timeline:</strong> {selectedProject.timeline}
            </div>
          )}
        </div>

        {/* Problem Section */}
        {selectedProject.problem && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              The Problem & Scope
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {selectedProject.problem}
            </p>
          </div>
        )}

        {/* Architecture Diagram if available */}
        {selectedProject.architecture && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLayers style={{ color: 'var(--accent-blue)' }} /> System Architecture
            </h3>
            <div className="architecture-diagram">{selectedProject.architecture}</div>
          </div>
        )}

        {/* What I Built */}
        {selectedProject.features && selectedProject.features.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              What I Built
            </h3>
            <ul className="exp-bullets">
              {selectedProject.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Decisions */}
        {selectedProject.decisions && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Key Technical Decisions
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {selectedProject.decisions}
            </p>
          </div>
        )}

        {/* Challenges & Solutions */}
        {selectedProject.challenges && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Challenges & Lessons
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {selectedProject.challenges}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Technologies Used
          </h3>
          <div className="cs-pills">
            {selectedProject.tech.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {selectedProject.liveUrl && (
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Live Project <FiExternalLink size={16} />
            </a>
          )}
          {selectedProject.certificateUrl && (
            <a
              href={selectedProject.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Certificate Link <FiExternalLink size={16} />
            </a>
          )}
          {selectedProject.lorUrl && (
            <a
              href={selectedProject.lorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LOR Link <FiExternalLink size={16} />
            </a>
          )}
          {selectedProject.githubUrls?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {link.label} GitHub <FiGithub size={16} />
            </a>
          ))}
          {!selectedProject.githubUrls && selectedProject.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              GitHub Code <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
