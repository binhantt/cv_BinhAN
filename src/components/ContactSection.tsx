import { useState } from 'react'
import { ArrowRightIcon, EnvelopeClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { profile } from '../database/portfolio'
import { colors, compactVisualStyle, kickerStyle, outerFrameStyle, sectionStyle } from '../design'
import { PortfolioScene } from './PortfolioScene'
import { Reveal } from './Reveal'

const contactChannels = [
  {
    label: 'Facebook',
    href: profile.facebook,
    mark: 'f',
    title: 'Facebook cá nhân',
    detail: 'Kênh phù hợp để xem hoạt động cá nhân và nhắn tin nhanh về cơ hội việc làm.',
  },
  {
    label: 'Zalo',
    href: profile.zalo,
    mark: 'Z',
    title: 'Zalo liên hệ nhanh',
    detail: `Nhắn trực tiếp qua số ${profile.phone} để trao đổi nhanh về CV, dự án hoặc lịch phỏng vấn.`,
  },
  {
    label: 'GitHub',
    href: profile.github,
    icon: <GitHubLogoIcon />,
    title: 'GitHub dự án',
    detail: 'Nơi xem source code, project cá nhân và cách triển khai sản phẩm thực tế.',
  },
]

export function ContactSection() {
  const [selectedChannel, setSelectedChannel] = useState(contactChannels[0])

  return (
    <Box asChild style={sectionStyle}>
      <section id="contact">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex direction="column" align="center" gap="6">
            <Reveal>
              <Box className="section-heading" style={{ maxWidth: 980, textAlign: 'center' }}>
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

            <Grid columns={{ initial: '1', md: '0.9fr 1.1fr' }} gap="5" align="stretch" width="100%">
              <Reveal direction="left">
                <Box className="compact-visual" style={compactVisualStyle}>
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
                  </Flex>

                  <Grid columns={{ initial: '1', sm: '3' }} gap="3" className="contact-channel-grid">
                    {contactChannels.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className={`contact-channel-card${selectedChannel.label === item.label ? ' is-active' : ''}`}
                        onClick={() => setSelectedChannel(item)}
                      >
                        <span className="contact-link-icon">{item.icon ?? item.mark}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </Grid>

                  <Box className="contact-channel-detail">
                    <Text as="div" weight="bold" className="contact-channel-title">
                      {selectedChannel.title}
                    </Text>
                    <Text as="p" className="contact-channel-copy">
                      {selectedChannel.detail}
                    </Text>
                    <a href={selectedChannel.href} target="_blank" rel="noreferrer" className="contact-channel-open">
                      Mở {selectedChannel.label}
                      <ArrowRightIcon />
                    </a>
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
