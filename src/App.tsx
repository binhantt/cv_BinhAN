import { Box, Theme } from '@radix-ui/themes'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { AcademicSection } from './components/AcademicSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { colors, pageStyle } from './design'

function App() {
  return (
    <Theme accentColor="green" grayColor="gray" radius="small" scaling="100%">
      <Box style={pageStyle}>
        <Box
          aria-hidden="true"
          display={{ initial: 'none', md: 'block' }}
          style={{
            position: 'fixed',
            top: 132,
            bottom: 48,
            left: 22,
            width: 8,
            borderRadius: 8,
            background: colors.teal,
            opacity: 0.28,
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden="true"
          display={{ initial: 'none', md: 'block' }}
          style={{
            position: 'fixed',
            top: 230,
            bottom: 148,
            right: 22,
            width: 8,
            borderRadius: 8,
            background: colors.teal,
            opacity: 0.16,
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden="true"
          display={{ initial: 'none', lg: 'block' }}
          style={{
            position: 'fixed',
            top: '44%',
            left: 42,
            width: 54,
            height: 54,
            borderRadius: 8,
            background: `${colors.teal}12`,
            border: `1px solid ${colors.teal}44`,
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden="true"
          display={{ initial: 'none', lg: 'block' }}
          style={{
            position: 'fixed',
            right: 42,
            bottom: 76,
            width: 76,
            height: 76,
            borderRadius: 8,
            background: `${colors.teal}14`,
            zIndex: 0,
          }}
        />
        <Header />
        <main style={{ position: 'relative', zIndex: 1 }}>
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
