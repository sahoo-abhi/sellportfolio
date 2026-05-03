import { VideoBackground } from './components/VideoBackground'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { MarqueeSection } from './components/MarqueeSection'
import { AboutSection } from './components/AboutSection'
import { EducationSection } from './components/EducationSection'
import { SkillsWheel } from './components/SkillsWheel'
import { ServicesSection } from './components/ServicesSection'
import { ProjectsSection } from './components/ProjectsSection'
import { CinematicHero } from './components/CinematicHero'
import { StarCursor } from './components/StarCursor'

export default function App() {
  return (
    <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <StarCursor />
      {/* Hero — fullscreen with video bg */}
      <div id="home" className="relative h-screen flex flex-col overflow-x-clip">
        <VideoBackground />
        <Navbar />
        <HeroSection />
      </div>

      {/* Remaining sections */}
      <MarqueeSection />
      <div id="about"><AboutSection /></div>
      <div id="experience"><EducationSection /></div>
      <div id="skills"><SkillsWheel /></div>
      <div id="services"><ServicesSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="contact"><CinematicHero /></div>
    </div>
  )
}
