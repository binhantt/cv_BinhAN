import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { projects } from '../database/portfolio'
import { colors, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

export function ProjectsSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="projects">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box className="section-heading" style={{ maxWidth: 900, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  05 / Work
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  className="section-title"
                  style={{ color: colors.ink, lineHeight: 1.08 }}
                >
                  Dự án nổi bật.
                </Heading>
                <Text as="p" mt="3" style={{ color: colors.ink, lineHeight: 1.7 }}>
                  Mỗi project được viết gọn để người tuyển dụng đọc nhanh trong một màn hình.
                </Text>
              </Box>
            </Reveal>

            <Grid columns={{ initial: '1', md: '2' }} gap="5" width="100%">
              {projects.map((project, index) => (
                <Reveal key={project.name} delay={(index % 2) * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <Flex
                    direction="column"
                    gap="4"
                    p="4"
                    className="project-card"
                    style={{
                      ...outerFrameStyle,
                      background: 'rgba(24, 24, 27, 0.64)',
                    }}
                  >
                  <Box className="scene-panel" display={{ initial: 'none', md: 'block' }}>
                    <PortfolioScene variant="projectImage" imageUrl={project.imageUrl} />
                  </Box>
                  <Box className="project-mobile-image">
                    <img src={project.imageUrl} alt={project.name} />
                  </Box>

                  <Box>
                    <Heading as="h3" size="5" className="project-title" style={{ color: colors.ink }}>
                      {project.name}
                    </Heading>
                    <Text as="div" size="2" mt="1" weight="bold" className="project-stack" style={{ color: colors.teal }}>
                      {project.stack}
                    </Text>
                    <Text as="p" mt="3" style={{ color: colors.ink, lineHeight: 1.65 }}>
                      {project.detail}
                    </Text>
                    <Flex gap="2" mt="4" wrap="wrap" className="project-actions">
                      {'demoUrl' in project && project.demoUrl ? (
                        <Button size="2" asChild className="bg-[#F43F5E] text-[#0F0F0F] shadow-md shadow-rose-500/15">
                          <a href={project.demoUrl} target="_blank" rel="noreferrer">
                            <ExternalLinkIcon />
                            Demo
                          </a>
                        </Button>
                      ) : null}
                      {'githubUrl' in project && project.githubUrl ? (
                        <Button size="2" variant="soft" asChild style={{ color: colors.teal }}>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer">
                            <GitHubLogoIcon />
                            Mã nguồn
                          </a>
                        </Button>
                      ) : null}
                    </Flex>
                  </Box>
                  </Flex>
                </Reveal>
              ))}
            </Grid>
          </Flex>
        </Container>
      </section>
    </Box>
  )
}
