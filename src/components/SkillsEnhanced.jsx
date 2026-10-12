import React from 'react'
import {
  FiCheckCircle,
  FiCompass,
  FiDatabase,
  FiGitBranch,
  FiLayout,
  FiMessageSquare,
  FiServer,
  FiUsers,
} from 'react-icons/fi'
import {
  SiCanva,
  SiCss3,
  SiExpress,
  SiGit,
  SiGithub,
  SiGoogledocs,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export default function SkillsEnhanced() {
  const categories = [
    {
      icon: <FiLayout size={20} />,
      title: 'Frontend',
      skills: [
        { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
        { name: 'CSS', icon: SiCss3, color: '#1572b6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
        { name: 'React.js', icon: SiReact, color: '#61dafb' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
        { name: 'Redux', icon: SiRedux, color: '#764abc' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      ],
    },
    {
      icon: <FiServer size={20} />,
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: 'currentColor' },
        { name: 'REST APIs', icon: FiServer, color: '#0284c7' },
        { name: 'Socket.io', icon: SiSocketdotio, color: 'currentColor' },
        { name: 'JWT', icon: SiJsonwebtokens, color: '#d63aff' },
      ],
    },
    {
      icon: <FiDatabase size={20} />,
      title: 'Data & Services',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
        { name: 'SQL', icon: SiMysql, color: '#4479a1' },
        { name: 'Azure SQL', icon: FiDatabase, color: '#0078d4' },
        { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
      ],
    },
    {
      icon: <FiGitBranch size={20} />,
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git', icon: SiGit, color: '#f05032' },
        { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
        { name: 'Excel', icon: FiDatabase, color: '#217346' },
        { name: 'Google Sheets', icon: SiGooglesheets, color: '#34a853' },
        { name: 'Google Docs', icon: SiGoogledocs, color: '#4285f4' },
        { name: 'Canva', icon: SiCanva, color: '#00c4cc' },
        { name: 'VS Code', icon: VscVscode, color: '#007acc' },
        { name: 'Jira', icon: SiJira, color: '#0052cc' },
        { name: 'Trello', icon: SiTrello, color: '#0e75b6' },
      ],
    },
    {
      icon: <FiCompass size={20} />,
      title: 'Working Style',
      skills: [
        { name: 'User-friendly interfaces', icon: FiLayout, color: '#0284c7' },
        { name: 'Collaboration', icon: FiUsers, color: '#0d9488' },
        { name: 'Technical feedback', icon: FiMessageSquare, color: '#9333ea' },
        { name: 'Project evaluation', icon: FiCheckCircle, color: '#16a34a' },
      ],
    },
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <span className="section-label">Engineering Stack</span>
        <h2 className="section-title">Technical Expertise</h2>
        <p className="section-subtitle">
          Technologies, tools, and working practices I use to build user-friendly web applications.
        </p>

        <div className="engineering-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="eng-card">
              <h3 className="eng-card-title">
                {cat.icon}
                {cat.title}
              </h3>
              <div className="eng-skills-list">
                {cat.skills.map((skill) => {
                  const SkillIcon = skill.icon

                  return (
                    <div key={skill.name} className="skill-icon-card" title={skill.name}>
                      <SkillIcon className="skill-icon" aria-hidden="true" style={{ color: skill.color }} />
                      <span>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
