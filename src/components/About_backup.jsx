import React from 'react'

export default function About() {
  return (
    <section id="about" className="about container card">
      <h2>About Me</h2>
      <p>
        I'm a frontend developer and BCA student passionate about building
        accessible and responsive user interfaces. I enjoy turning ideas into
        clean, maintainable code and learning modern tools like React and Node.js.
      </p>
      <p>
        Currently focused on improving my React skills and exploring backend
        fundamentals. I enjoy collaborating on projects and contributing to
        open-source.
      </p>

      <div className="actions">
        <a className="btn" href="/Sakshi_FullStack_resume.pdf" download>
          Download Resume
        </a>
      </div>
    </section>
  )
}
