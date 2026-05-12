import { ArrowRightIcon, EnvelopeClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, compactVisualStyle, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

const contactLinks = [
  { label: 'Facebook', href: profile.facebook, mark: 'f' },
  { label: 'Zalo', href: profile.zalo, mark: 'Z' },
  { label: 'GitHub', href: profile.github, icon: <GitHubLogoIcon /> },
]

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
                  className="contact-title"
                  style={{ color: colors.ink, lineHeight: 1 }}
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
                <Flex
                  direction="column"
                  gap="5"
                  p={{ initial: '4', sm: '6' }}
                  className="contact-card"
                  style={{ ...outerFrameStyle, background: `${colors.teal}10` }}
                >
                  <Box>
                    <Text as="div" className="contact-card-title">
                      Kết nối nhanh
                    </Text>
                    <Text as="p" className="contact-card-copy">
                      Gửi email hoặc chọn kênh phù hợp để trao đổi về CV, dự án và cơ hội Frontend.
                    </Text>
                  </Box>

                  <a href={`mailto:${profile.email}`} className="contact-email">
                    <span className="contact-email-icon">
                      <EnvelopeClosedIcon />
                    </span>
                    <span>{profile.email}</span>
                  </a>

                  <Flex gap="3" wrap="wrap" className="contact-actions">
                    <Button size="3" asChild className="contact-primary">
                      <a href={`mailto:${profile.email}`}>
                        Liên hệ ngay
                        <ArrowRightIcon />
                      </a>
                    </Button>

                    {contactLinks.map((item) => (
                      <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="contact-link">
                        <span className="contact-link-icon">{item.icon ?? item.mark}</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
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
