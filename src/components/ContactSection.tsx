import { ArrowRightIcon, EnvelopeClosedIcon, GitHubLogoIcon, MobileIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, compactVisualStyle, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

export function ContactSection() {
  return (
    <Box asChild style={sectionStyle}>
      <section id="contact">
        <Container size="3" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box style={{ maxWidth: 720, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  06 / Contact
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  style={{ color: colors.ink, fontSize: 'clamp(2.3rem, 4.2vw, 4rem)', lineHeight: 1 }}
                >
                  Sẵn sàng gửi CV, portfolio hoặc trao đổi về cơ hội mới.
                </Heading>
              </Box>
            </Reveal>

            <Grid columns={{ initial: '1', md: '0.85fr 1.15fr' }} gap="5" align="stretch" width="100%">
              <Reveal direction="left">
                <Box style={compactVisualStyle}>
                  <PortfolioScene variant="contact" />
                </Box>
              </Reveal>

              <Reveal direction="right" delay={120}>
                <Flex direction="column" gap="4" p={{ initial: '4', sm: '6' }} style={{ ...outerFrameStyle, background: `${colors.teal}10` }}>
                <Flex align="center" gap="3">
                  <EnvelopeClosedIcon color={colors.teal} />
                  <a href={`mailto:${profile.email}`} style={{ color: colors.ink, textDecoration: 'none', fontWeight: 700 }}>
                    {profile.email}
                  </a>
                </Flex>
                <Flex align="center" gap="3">
                  <MobileIcon color={colors.teal} />
                  <a href={`tel:${profile.phone.replaceAll('.', '')}`} style={{ color: colors.ink, textDecoration: 'none', fontWeight: 700 }}>
                    {profile.phone}
                  </a>
                </Flex>
                <Flex align="center" gap="3">
                  <GitHubLogoIcon color={colors.teal} />
                  <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: colors.ink, textDecoration: 'none', fontWeight: 700 }}>
                    GitHub
                  </a>
                </Flex>
                <Text as="p" style={{ color: colors.ink, lineHeight: 1.7 }}>
                  {profile.location}
                </Text>

                <Flex gap="3" mt="4" wrap="wrap">
                  <Button size="3" asChild style={{ background: colors.teal, color: colors.amber }}>
                    <a href={`mailto:${profile.email}`}>
                      Liên hệ ngay
                      <ArrowRightIcon />
                    </a>
                  </Button>
                  <Button size="3" variant="soft" asChild style={{ color: colors.teal }}>
                    <a href={profile.facebook} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  </Button>
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
