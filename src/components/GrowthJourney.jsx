import React, { useRef } from 'react'
import { motion as Motion, useScroll, useSpring } from 'framer-motion'

export default function GrowthJourney() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 50%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const timelineEvents = [
    {
      year: '2020 – 2024',
      title: 'Bachelor of Art (English Honours)',
      desc: 'Completed Bachelor of Art (English Honours) in Medininagar, Jharkhand.',
    },
    {
      year: 'July 2024 – Present',
      title: 'Bachelor of Computer Application',
      desc: 'Pursuing a Bachelor of Computer Application at Eternal University, Baru Sahib.',
    },
    {
      year: 'Navgurukul Experiences',
      title: 'Jury Member',
      desc: 'Standardized evaluation metrics and provided technical feedback to 50+ students, aligning project architectures with industry standards.',
    },
    {
      year: 'Navgurukul Experiences',
      title: 'Facility In-Charge',
      desc: 'Optimized campus logistics and administrative workflows while spearheading facility management initiatives to improve operational efficiency.',
    },
    {
      year: '6 months',
      title: 'Neximprove — Frontend Developer Intern',
      desc: 'Worked with Next.js to develop responsive web applications and UI components.',
    },
    {
      year: '2 months – Present',
      title: 'Neximprove — Full Stack Developer Intern',
      desc: 'Currently working on frontend and backend development.',
    },
    {
      year: 'NOW',
      title: 'Seeking Full-Stack Developer Internship Opportunities',
      desc: 'Eager to gain more real-world experience through an internship and contribute to functional, user-friendly web applications.',
    },
  ]

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        <span className="section-label">Growth & Milestones</span>
        <h2 className="section-title">Development Journey</h2>
        <p className="section-subtitle">
          Education, professional experience, and community responsibilities from the resume.
        </p>

        <div className="timeline-container" ref={containerRef}>
          {/* Static high-contrast background guide line */}
          <div className="timeline-guide-line" />

          {/* Glowing active progress line animated with scroll */}
          <Motion.div
            className="timeline-progress-line"
            style={{ scaleY, originY: 0 }}
          />

          {timelineEvents.map((item, idx) => (
            <Motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
