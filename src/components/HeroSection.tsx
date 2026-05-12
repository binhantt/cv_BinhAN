import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, copyStyle, kickerStyle, sectionStyle, visualStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

export function HeroSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="home">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Grid columns={{ initial: '1', md: '0.95fr 1.05fr' }} gap="7" align="center">
            <Reveal direction="left">
              <Box style={copyStyle}>
                <Text as="div" style={kickerStyle}>
                  01 / Home
                </Text>
                <Text as="div" mt="5" size="2" weight="bold" style={{ color: colors.teal }}>
                  {profile.eyebrow}
                </Text>
                <Box mt="3">
                  <Heading
                    as="h1"
                    style={{
                      color: colors.ink,
                      fontSize: 'clamp(3rem, 6vw, 5.7rem)',
                      lineHeight: 0.98,
                      letterSpacing: 0,
                    }}
                  >
                    {profile.headline}
                  </Heading>
                  <Text
                    as="div"
                    weight="bold"
                    style={{
                      color: colors.teal,
                      fontSize: 'clamp(2.5rem, 5vw, 4.7rem)',
                      lineHeight: 1,
                      letterSpacing: 0,
                    }}
                  >
                    {profile.headlineAccent}
                  </Text>
                </Box>
                <Text as="p" mt="4" size="4" style={{ color: colors.ink, lineHeight: 1.7 }}>
                  {profile.intro}
                </Text>
                <Flex gap="3" mt="6" wrap="wrap">
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
              <Box style={visualStyle}>
                <PortfolioScene variant="heroPhoto" imageUrl={profile.homePhotoUrl} />
              </Box>
            </Reveal>
          </Grid>
        </Container>
      </section>
    </Box>
  )
}
