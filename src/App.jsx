import React, { useEffect } from 'react'
import { useStore } from './store/useStore'
import './styles/portfolio.css'

import SignatureIntro from './components/SignatureIntro'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import Hero from './components/Hero'
import ProofStrip from './components/ProofStrip'
import Projects from './components/Projects'
import GitHubActivity from './components/GitHubActivity'
import Experience from './components/Experience'
import SkillsEnhanced from './components/SkillsEnhanced'
import BeyondProjects from './components/BeyondProjects'
import GrowthJourney from './components/GrowthJourney'
import About from './components/About'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'

function App() {
  const { darkMode, toggleDarkMode } = useStore()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('theme') === 'light' && darkMode) {
      toggleDarkMode()
    } else if (params.get('theme') === 'dark' && !darkMode) {
      toggleDarkMode()
    }
  }, [darkMode, toggleDarkMode])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="portfolio-root">
      <SignatureIntro />
      <CustomCursor />
      <ProjectModal />

      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <Projects />
        <GitHubActivity />
        <Experience />
        <SkillsEnhanced />
        <BeyondProjects />
        <GrowthJourney />
        <About />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
