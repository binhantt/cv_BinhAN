import { Box, Theme } from '@radix-ui/themes'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { AcademicSection } from './components/AcademicSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { DecorativeLayer } from './components/DecorativeLayer'
import { pageStyle } from './design'

function App() {
  return (
    <Theme appearance="dark" accentColor="ruby" grayColor="sand" radius="small" scaling="100%">
      <Box className="site-shell" style={pageStyle}>
        <DecorativeLayer />
        <Header />
        <main className="site-main">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <AcademicSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </Box>
    </Theme>
  )
}

export default App
