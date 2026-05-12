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
              <Box style={{ ...copyStyle, textAlign: 'center' }}>
                <Text as="div" style={kickerStyle}>
                  02 / About
                </Text>
                <Heading
                  as="h2"
                  mt="3"
                  style={{ color: colors.ink, fontSize: 'clamp(2.4rem, 4.6vw, 4.4rem)', lineHeight: 1 }}
                >
                  Tôi xây dựng sản phẩm web gọn, đẹp và dễ dùng.
                </Heading>
              </Box>
            </Reveal>

            <Grid columns={{ initial: '1', md: '0.9fr 1.1fr' }} gap="5" align="stretch" width="100%">
              <Reveal direction="left">
                <Box style={compactVisualStyle}>
                  <PortfolioScene variant="profile" imageUrl={profile.avatarUrl} />
                </Box>
              </Reveal>

              <Reveal direction="right" delay={120}>
                <Flex
                  direction="column"
                  gap="5"
                  p={{ initial: '5', sm: '6' }}
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

                <Text as="p" size="3" style={{ color: colors.ink, lineHeight: 1.75, margin: 0 }}>
                  {profile.about}
                </Text>

                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {aboutHighlights.map((item) => (
                    <Flex
                      key={item}
                      direction="column"
                      gap="2"
                      p="3"
                      style={{
                        border: `1px solid ${colors.teal}55`,
                        borderRadius: 8,
                        background: `${colors.teal}0f`,
                      }}
                    >
                      <CheckCircledIcon color={colors.teal} />
                      <Text size="2" weight="bold" style={{ color: colors.ink }}>
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
                  <Text as="p" size="2" style={{ color: colors.ink, lineHeight: 1.7, margin: 0 }}>
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
