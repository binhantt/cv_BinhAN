import { CheckCircledIcon, LightningBoltIcon, PersonIcon } from '@radix-ui/react-icons'
import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, compactVisualStyle, copyStyle, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

const aboutHighlights = [
  'Biến yêu cầu thành giao diện rõ ràng',
  'Ưu tiên responsive và trải nghiệm đọc nhanh',
  'Học công nghệ mới qua dự án thực tế',
]

export function AboutSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="about">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box style={{ ...copyStyle, maxWidth: 900, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  02 / Giới thiệu
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  className="section-title"
                  style={{ color: colors.ink, lineHeight: 1.08 }}
                >
                  Giới thiệu bản thân
                </Heading>
              </Box>
            </Reveal>

            <Grid columns={{ initial: '1', md: '0.92fr 1.08fr' }} gap="5" align="stretch" width="100%" className="about-layout">
              <Reveal direction="left">
                <Box className="compact-visual about-visual" style={compactVisualStyle}>
                  <PortfolioScene variant="profile" imageUrl={profile.avatarUrl} />
                </Box>
              </Reveal>

              <Reveal direction="right" delay={120}>
                <Flex
                  direction="column"
                  gap="4"
                  p={{ initial: '4', sm: '5' }}
                  className="content-card about-card"
                  style={{
                    ...outerFrameStyle,
                    background: `${colors.teal}14`,
                  }}
                >
                <Flex align="center" gap="3">
                  <Flex align="center" justify="center" style={{ width: 44, height: 44, borderRadius: 8, background: colors.teal, color: colors.amber }}>
                    <PersonIcon />
                  </Flex>
                  <Text weight="bold" size="4" style={{ color: colors.ink }}>
                    Giới thiệu bản thân
                  </Text>
                </Flex>

                <Text as="p" size="3" style={{ color: colors.ink, lineHeight: 1.65, margin: 0 }}>
                  {profile.about}
                </Text>

                <Grid columns={{ initial: '1', sm: '3' }} gap="2" className="about-highlight-grid">
                  {aboutHighlights.map((item) => (
                    <Flex
                      key={item}
                      direction="column"
                      gap="2"
                      p="3"
                      className="mini-card"
                      style={{
                        border: `1px solid ${colors.teal}55`,
                        borderRadius: 8,
                        background: `${colors.teal}0f`,
                      }}
                    >
                      <CheckCircledIcon color={colors.teal} />
                      <Text size="2" weight="bold" style={{ color: colors.ink, lineHeight: 1.35 }}>
                        {item}
                      </Text>
                    </Flex>
                  ))}
                </Grid>

                <Flex direction="column" gap="2">
                  <Flex align="center" gap="2">
                    <LightningBoltIcon color={colors.teal} />
                    <Text weight="bold" style={{ color: colors.ink }}>
                      Mục tiêu nghề nghiệp
                    </Text>
                  </Flex>
                  <Text as="p" size="2" style={{ color: colors.ink, lineHeight: 1.6, margin: 0 }}>
                    {profile.objective}
                  </Text>
                </Flex>
                </Flex>
              </Reveal>
            </Grid>
          </Flex>
        </Container>
      </section>
    </Box>
  )
}
