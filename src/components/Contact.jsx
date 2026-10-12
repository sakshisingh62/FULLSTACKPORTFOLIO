import React, { useState } from 'react'
import { FiMail, FiFileText, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const endpoint = 'https://formspree.io/f/xqezbwao'

    try {
      const form = e.currentTarget
      const gotcha = form.querySelector('input[name="_gotcha"]')
      if (gotcha && gotcha.value) {
        setLoading(false)
        return
      }

      const formData = new FormData(form)

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (res.ok) {
        setSuccess(true)
        form.reset()
      } else {
        const data = await res.json().catch(() => null)
        setError((data && data.error) || 'Failed to send message')
      }
    } catch (err) {
      console.error('Contact form error', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card">
          <span className="section-label" style={{ marginBottom: '0.5rem' }}>
            GET IN TOUCH
          </span>
          <h2 className="contact-title">Let's build something.</h2>
          <p className="contact-sub">
            I'm currently seeking internship opportunities in frontend and full-stack web development.
          </p>

          <div className="contact-links-grid">
            <a href="mailto:singhsakshi0365@gmail.com" className="btn btn-outline">
              <FiMail size={16} /> Email Me →
            </a>
            <a
              href="https://www.linkedin.com/in/sakshi-singh-a62017334/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FiLinkedin size={16} /> LinkedIn →
            </a>
            <a
              href="https://github.com/sakshisingh62"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FiGithub size={16} /> GitHub →
            </a>
            <a
              href="/Sakshi_FullStack_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FiFileText size={16} /> Resume ↗
            </a>
          </div>

          <form
            action="https://formspree.io/f/xqezbwao"
            method="POST"
            onSubmit={handleSubmit}
            style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}
          >
            <input type="text" name="_gotcha" tabIndex="-1" style={{ display: 'none' }} />
            <input type="hidden" name="_subject" value="New portfolio inquiry for Sakshi" />

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="jane@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Hi Sakshi, I would love to talk about..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Direct Message'} <FiSend size={15} />
            </button>

            {success && (
              <p style={{ marginTop: '1rem', color: 'var(--accent-green)', fontSize: '0.9rem' }}>
                ✓ Message sent successfully! I will get back to you shortly.
              </p>
            )}

            {error && (
              <p style={{ marginTop: '1rem', color: '#f87171', fontSize: '0.9rem' }}>
                ✕ {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
