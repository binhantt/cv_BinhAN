import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { skillGroups } from '../database/portfolio'
import { colors, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene, type SceneVariant } from './PortfolioScene'
import { Reveal } from './Reveal'

const skillVisuals: Record<string, SceneVariant> = {
  Frontend: 'skillFrontend',
  Backend: 'skillBackend',
  'Database / Tools': 'skillData',
}

export function SkillsSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="skills">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box style={{ maxWidth: 760, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  03 / Skills
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  style={{ color: colors.ink, fontSize: 'clamp(2.3rem, 4.2vw, 4rem)', lineHeight: 1 }}
                >
                  Bộ kỹ năng tập trung vào giao diện, dữ liệu và sản phẩm web.
                </Heading>
              </Box>
            </Reveal>

            <Grid columns="1" gap="5" width="100%">
              {skillGroups.map((group, index) => {
                const visualFirst = group.title === 'Database / Tools'
                return (
                  <Reveal key={group.title} delay={index * 90} direction={visualFirst ? 'left' : 'right'}>
                    <Grid
                      columns={{ initial: '1', md: visualFirst ? '1.05fr 0.95fr' : '0.95fr 1.05fr' }}
                      gap="5"
                      align="center"
                      p={{ initial: '4', sm: '6' }}
                      style={{
                        ...outerFrameStyle,
                        background: index === 1 ? `${colors.teal}14` : `${colors.teal}0f`,
                      }}
                    >
                      {visualFirst ? (
                        <Box style={{ height: 280, minHeight: 260 }}>
                          <PortfolioScene variant={skillVisuals[group.title]} />
                        </Box>
                      ) : null}

                      <Flex direction="column" gap="4">
                        <Text size="6" weight="bold" style={{ color: colors.ink }}>
                          {group.title}
                        </Text>
                        <Flex gap="3" wrap="wrap">
                          {group.items.map((skill) => (
                            <Text
                              key={skill}
                              size="2"
                              weight="bold"
                              style={{
                                color: colors.teal,
                                background: `${colors.teal}14`,
                                borderRadius: 8,
                                padding: '8px 10px',
                              }}
                            >
                              {skill}
                            </Text>
                          ))}
                        </Flex>
                      </Flex>

                      {!visualFirst ? (
                        <Box style={{ height: 280, minHeight: 260 }}>
                          <PortfolioScene variant={skillVisuals[group.title]} />
                        </Box>
                      ) : null}
                    </Grid>
                  </Reveal>
                )
              })}
            </Grid>
          </Flex>
        </Container>
      </section>
    </Box>
  )
}
