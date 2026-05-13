import { BackpackIcon } from '@radix-ui/react-icons'
import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { academics, learnedTopics } from '../database/portfolio'
import { colors, compactVisualStyle, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

export function AcademicSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="academic">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box className="section-heading" style={{ maxWidth: 900, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  04 / Study
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  className="section-title"
                  style={{ color: colors.ink, lineHeight: 1.08 }}
                >
                  Nền tảng học tập.
                </Heading>
              </Box>
            </Reveal>

            <Grid columns={{ initial: '1', md: '0.9fr 1.1fr' }} gap="5" align="stretch" width="100%">
              <Reveal direction="left">
                <Box className="compact-visual" style={compactVisualStyle}>
                  <PortfolioScene variant="academic" />
                </Box>
              </Reveal>

              <Reveal direction="right" delay={120}>
                <Flex direction="column" gap="4" p={{ initial: '4', sm: '6' }} className="content-card" style={{ ...outerFrameStyle, background: `${colors.teal}10` }}>
                {academics.map((item) => (
                  <Flex key={item.label} align="start" gap="3">
                    <BackpackIcon color={colors.teal} />
                    <Box>
                      <Text as="div" size="2" weight="bold" style={{ color: colors.teal }}>
                        {item.label}
                      </Text>
                      <Text as="div" size="3" weight="bold" style={{ color: colors.ink }}>
                        {item.value}
                      </Text>
                    </Box>
                  </Flex>
                ))}

                <Box mt="3">
                  <Text weight="bold" size="4" style={{ color: colors.ink }}>
                    Tôi đã học gì
                  </Text>
                  <Flex gap="3" wrap="wrap" mt="3" className="topic-list">
                    {learnedTopics.map((topic) => (
                      <Text key={topic} size="2" style={{ color: colors.ink }}>
                        {topic}
                      </Text>
                    ))}
                  </Flex>
                </Box>
                </Flex>
              </Reveal>
            </Grid>
          </Flex>
        </Container>
      </section>
    </Box>
  )
}
