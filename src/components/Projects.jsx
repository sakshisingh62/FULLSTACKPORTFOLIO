import React from 'react'
import { useStore } from '../store/useStore'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import image1 from '../assets/image1.png'

const neximproveProject = {
  num: '01',
  title: 'Neximprove',
  category: 'Product Engineering Internship',
  tagline: 'SaaS Platform Development — Learning, Payroll, Sales & Gateway Portals',
  role: 'Frontend Developer Intern · Full-Stack Contributions',
  timeline: '6 Months · Completed',
  desc: 'Contributed to multiple production SaaS portals, building reusable React and TypeScript interfaces, full-stack workflows, white-label experiences, integrations, and quality improvements across the product codebase.',
  problem: 'Building scalable, enterprise-ready frontend interfaces and core security flows across complex SaaS modules while adhering to continuous deployment schedules and Agile team workflows.',
  workspaces: [
    { title: 'Learning Portal & White-labeling', desc: 'End-to-end white-label implementation, course workflows, course wizard tools, rich-text editing, Markdown support, and admin controls.' },
    { title: 'Payroll Portal', desc: 'Full-stack work across payroll portal features, application flows, API-connected screens, and responsive UI behavior.' },
    { title: 'Importer & Exporter', desc: 'Worked on data import and export workflows to support efficient product operations and application data movement.' },
    { title: 'Sales UI & Broker Portal', desc: 'Responsive frontend development, UI refinement, reusable components, and portal functionality.' },
    { title: 'Pricing Pages & SEO', desc: 'Implemented public page layouts, responsive UI debugging, onboarding improvements, and SEO optimizations.' },
    { title: 'Clearie Gateway', desc: 'Contributed to gateway portal functionality, UI flows, validation, environment testing, and issue resolution.' },
    { title: 'Authentication & 2FA', desc: 'Two-factor authentication implementation, OTP handling, refresh-related behavior, and debugging authentication issues.' },
    { title: 'Customer 360 / COP Portal', desc: 'Documentation, implementation tasks, responsive layouts, and code contributions.' },
    { title: 'Azure & Data Integration', desc: 'Worked with Azure database functionality, application data retrieval, Git pull requests, and UAT testing.' },
    { title: 'Development Workflow & UAT', desc: 'Git pull requests, sprint planning, bug fixing, user acceptance testing, and cross-functional collaboration.' },
  ],
  contributions: [
    { label: 'Learning Portal & White-labeling', desc: 'Implemented the Learning Portal white-label experience across core screens, branding behavior, course workflows, and admin-facing controls.' },
    { label: 'Payroll Portal — Full Stack', desc: 'Worked across frontend and backend payroll portal functionality, connecting user-facing flows with application APIs and improving responsive behavior.' },
    { label: 'Importer & Exporter', desc: 'Contributed to importer and exporter workflows for moving application data efficiently between product modules and operational processes.' },
    { label: 'Sales UI & Broker Portal', desc: 'Developed responsive interfaces and reusable components using React, TypeScript, and Tailwind CSS.' },
    { label: 'Pricing, Onboarding & SEO', desc: 'Implemented public page layouts, responsive UI fixes, onboarding improvements, and SEO optimizations across customer-facing flows.' },
    { label: 'Clearie Gateway', desc: 'Worked on Clearie Gateway portal flows, UI implementation, validation, environment testing, and debugging issues across sandbox and staging.' },
    { label: 'Authentication & 2FA', desc: 'Implemented two-factor authentication (2FA), OTP generation, state persistence, and auth debugging.' },
    { label: 'Customer 360 & COP Portal', desc: 'Implemented Customer 360 UI components, responsive layouts, documentation updates, and product contributions across portal workflows.' },
    { label: 'QA, UAT & Team Delivery', desc: 'Performed sandbox and staging validation, investigated bugs, raised Git pull requests, supported UAT, and collaborated through Agile delivery cycles.' },
  ],
  features: [
    'Learning Portal & White-labeling: Implemented white-label product experiences, course management workflows, course creation, rich-text editing, Markdown support, feedback styling, and admin-side controls.',
    'Payroll Portal: Contributed across frontend and backend functionality, application flows, API-connected screens, and responsive portal behavior.',
    'Importer & Exporter: Worked on data movement workflows that support importing and exporting information across product operations.',
    'Sales UI & Broker Portal: Developed and refined responsive interfaces, reusable UI components, and portal functionality using React, TypeScript, and Tailwind CSS.',
    'Pricing, Onboarding & SEO: Worked on public page implementation, responsive layouts, SEO improvements, and debugging across onboarding flows.',
    'Clearie Gateway: Contributed to gateway functionality, validation, sandbox and staging checks, issue investigation, and portal improvements.',
    'Authentication & Security (2FA): Worked on two-factor authentication (2FA), OTP generation, authentication issues, and fixing page reload behavior after refresh.',
    'Customer 360 / COP Portal: Contributed to documentation, UI implementation, responsive behavior, and pull requests.',
    'Database & Azure Integration: Worked with Azure database-related functionality and application data retrieval.',
    'Quality & Collaboration: Participated in UAT, debugging, issue discussions, Git/GitHub pull requests, sprint tasks, and collaboration with team members.',
  ],
  decisions: 'Adopted TypeScript interfaces for strict API contract validation, reusable modular component architecture to eliminate duplication, and standardized state handling for complex 2FA / OTP auth workflows.',
  challenges: 'Managing multi-portal state synchronization, persistent auth states across page refreshes, and staging environment validation for enterprise API integrations.',
  tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Agile/Scrum', 'Git', 'UAT', 'Azure', '2FA'],
  certificateUrl: 'https://drive.google.com/file/d/1573CNFDEyrAhnZKRcAMIuUUnu0Fe5pDC/view?usp=sharing',
  scopeLabel: 'ARCHITECTURE & SCOPE',
}

const neighbourhoodProject = {
  num: '02',
  title: 'Neighbourhood Helper',
  category: 'Website',
  tagline: 'A simple platform for asking for help and offering help locally.',
  role: 'Full-Stack Developer',
  timeline: 'Featured Project',
  desc: 'Developed a neighbourhood help platform where users can ask for help or offer help easily through a simple, responsive interface.',
  problem: 'Make it easier for people in a neighbourhood to connect around help requests while keeping request progress visible and user access secure.',
  contributions: [
    { label: 'Help Requests', desc: 'Enabled users to ask for help and offer help through a focused platform workflow.' },
    { label: 'Real-time Updates', desc: 'Added Socket.io updates when requests are created, accepted, or completed.' },
    { label: 'Secure Access', desc: 'Built a secure login system for a smoother and safer user experience.' },
  ],
  workspaces: [
    { title: 'Ask for Help', desc: 'Users can create neighbourhood help requests.' },
    { title: 'Offer Help', desc: 'Users can respond to requests and offer support.' },
    { title: 'Request Status', desc: 'Real-time updates show created, accepted, and completed states.' },
  ],
  features: [
    'Built a neighbourhood help platform with React.js and Redux.',
    'Created backend services with Node.js, Express.js, and REST APIs.',
    'Added real-time request updates using Socket.io.',
    'Implemented secure login with JWT.',
    'Designed a simple, responsive interface with Tailwind CSS.',
  ],
  decisions: 'Used Socket.io for real-time status updates and JWT for secure login, while keeping the interface simple and responsive for everyday use.',
  challenges: 'Coordinating request state changes across users while keeping the experience clear and responsive.',
  tech: ['React.js', 'Redux', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'REST APIs', 'JWT', 'Tailwind CSS'],
  image: '/image.png',
  liveUrl: 'http://localhost:5173/login',
  githubUrls: [
    { label: 'Frontend', url: 'https://github.com/sakshisingh62/neighbouhoodhelper-F' },
    { label: 'Backend', url: 'https://github.com/sakshisingh62/neighbourhoodhelper-B' },
  ],
  scopeLabel: 'PROJECT SCOPE',
}

const zaikahubProject = {
  title: 'ZaikaHub',
  category: 'RECIPE DISCOVERY WEB APP',
  timeline: '2024',
  role: 'Frontend Developer',
  desc: 'Built a React-based recipe discovery platform with REST API integration and responsive Tailwind CSS user interface.',
  tech: ['React', 'React Router', 'REST API', 'Tailwind CSS', 'Netlify'],
  image: image1,
  liveUrl: 'https://zaikahubb.netlify.app/',
  githubUrl: 'https://github.com/24-Harshdeep/Zaikahub',
  features: [
    'Built a recipe discovery platform with React.',
    'Integrated recipe data through REST APIs.',
    'Created a responsive interface with Tailwind CSS.',
  ],
}

function CaseStudyCard({ project, actionLabel }) {
  const { setSelectedProject } = useStore()

  return (
    <div className="case-study-card featured">
      <div>
        <span className="cs-number">{project.num} — {project.category.toUpperCase()}</span>
        <h3 className="cs-title">{project.title}</h3>
        <div className="cs-tagline">{project.tagline}</div>
        <p className="cs-desc">{project.desc}</p>

        <div className="cs-pills">
          {project.tech.map((technology) => <span key={technology} className="tech-pill">{technology}</span>)}
        </div>

        <div className="contributions-box">
          <span className="section-label" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>
            KEY CONTRIBUTIONS
          </span>
          <ul className="contributions-list">
            {project.contributions.map((contribution) => (
              <li key={contribution.label}>
                <strong>{contribution.label}:</strong> {contribution.desc}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={() => setSelectedProject(project)}>
            {actionLabel} <FiArrowRight size={16} />
          </button>

          {project.certificateUrl && (
            <a href={project.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Certificate <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="cs-visual-box">
        {project.image && (
          <img src={project.image} alt={`${project.title} preview`} className="project-preview-image" />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span className="section-label" style={{ fontSize: '0.7rem', margin: 0 }}>{project.scopeLabel}</span>
          <span className="tech-pill" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
            {project.workspaces.length} {project.image ? 'Core Flows' : 'Key Workspaces'}
          </span>
        </div>
        <div className="workspace-list-scroll">
          {project.workspaces.map((workspace, index) => (
            <div key={workspace.title} className="workspace-mini-item">
              <div className="workspace-item-title">
                <span className="workspace-num">{index + 1}.</span> {workspace.title}
              </div>
              <div className="workspace-item-desc">{workspace.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdditionalProjectCard({ project }) {
  const { setSelectedProject } = useStore()

  return (
    <div className="mini-card">
      <div>
        {project.image && (
          <img src={project.image} alt={`${project.title} preview`} className="cs-thumb-img" />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="section-label" style={{ fontSize: '0.72rem', margin: 0 }}>
            {project.category || 'FULL-STACK WEBSITE'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {project.timeline || 'PROJECT'}
          </span>
        </div>

        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {project.title}
        </h4>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {project.desc}
        </p>
      </div>

      <div>
        <div className="cs-pills" style={{ marginBottom: '1.25rem' }}>
          {project.tech.map((technology) => <span key={technology} className="tech-pill">{technology}</span>)}
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.825rem', padding: '0.4rem 0.85rem' }}
            onClick={() => setSelectedProject(project)}
          >
            Details <FiArrowRight size={12} />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '0.825rem', padding: '0.4rem 0.85rem' }}
            >
              Live <FiExternalLink size={12} />
            </a>
          )}

          {(project.githubUrls || (project.githubUrl ? [{ label: 'GitHub', url: project.githubUrl }] : [])).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '0.825rem', padding: '0.4rem 0.85rem' }}
            >
              {link.label} <FiGithub size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="work-section">
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-label">INDUSTRY & PRODUCT EXPERIENCE</span>
          <h2 className="section-title">Neximprove</h2>
          <p className="section-subtitle">
            In-depth engineering case study of product development, SaaS module architecture, and full-stack collaboration.
          </p>
          <CaseStudyCard project={neximproveProject} actionLabel="View Engineering Case Study" />
        </div>

        <div>
          <span className="section-label">ADDITIONAL PROJECTS & SOFTWARE</span>
          <h2 className="section-title">Additional Projects & Software</h2>
          <div className="projects-mini-grid">
            <AdditionalProjectCard project={neighbourhoodProject} />
            <AdditionalProjectCard project={zaikahubProject} />
          </div>
        </div>
      </div>
    </section>
  )
}
