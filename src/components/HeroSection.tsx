import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, copyStyle, kickerStyle, sectionStyle, visualStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

export function HeroSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="home" className="hero-section">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Grid columns={{ initial: '1', md: '0.95fr 1.05fr' }} gap="6" align="center">
            <Reveal direction="left">
              <Box className="hero-copy" style={copyStyle}>
                <Text as="div" style={kickerStyle}>
                  01 / Home
                </Text>
                <Text as="div" mt="4" size="2" weight="bold" style={{ color: colors.teal }}>
                  {profile.eyebrow}
                </Text>
                <Box mt="3">
                  <Heading
                    as="h1"
                    style={{
                      color: colors.ink,
                      lineHeight: 0.98,
                      letterSpacing: 0,
                    }}
                    className="hero-title"
                  >
                    {profile.headline}
                  </Heading>
                  <Text
                    as="div"
                    weight="bold"
                    style={{
                      color: colors.teal,
                      lineHeight: 1,
                      letterSpacing: 0,
                    }}
                    className="hero-accent"
                  >
                    {profile.headlineAccent}
                  </Text>
                </Box>
                <Text as="p" mt="3" size="4" className="hero-intro" style={{ color: colors.ink, lineHeight: 1.55 }}>
                  {profile.intro}
                </Text>
                <Flex gap="3" mt="4" wrap="wrap">
                  <Button size="3" asChild style={{ background: colors.teal, color: colors.amber }}>
                    <a href="#about">
                      Xem hồ sơ
                      <ArrowRightIcon />
                    </a>
                  </Button>
                  <Button size="3" variant="soft" asChild style={{ color: colors.teal }}>
                    <a href="#projects">Xem dự án</a>
                  </Button>
                </Flex>
              </Box>
            </Reveal>

            <Reveal direction="right" delay={120}>
              <Box className="hero-visual" style={visualStyle}>
                <PortfolioScene variant="heroPhoto" imageUrl={profile.homePhotoUrl} />
              </Box>
            </Reveal>
          </Grid>
        </Container>
      </section>
    </Box>
  )
}
