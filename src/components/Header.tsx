import { DownloadIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Text } from '@radix-ui/themes'
import { navItems, profile } from '../database/portfolio'
import { colors, outerFrameStyle } from '../design'

const cvButtonStyle = {
  background: colors.teal,
  color: colors.amber,
  borderRadius: 8,
  whiteSpace: 'nowrap',
  boxShadow: `0 12px 28px ${colors.teal}22`,
} as const

export function Header() {
  const navPills = (
    <Flex align="center" justify={{ initial: 'start', md: 'center' }} gap="1" wrap="nowrap" style={{ minWidth: 'max-content' }}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            color: colors.teal,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            borderRadius: 6,
            padding: '8px 13px',
            fontSize: 13,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {item.label}
        </a>
      ))}
    </Flex>
  )

  return (
    <Box
      asChild
      style={{
        position: 'fixed',
        top: 6,
        left: 0,
        right: 0,
        zIndex: 20,
      }}
    >
      <header className="portfolio-header">
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex
            align={{ initial: 'stretch', md: 'center' }}
            justify="between"
            gap="3"
            direction={{ initial: 'column', md: 'row' }}
            p="3"
            style={{
              ...outerFrameStyle,
              minHeight: 64,
              background: `${colors.amber}f2`,
              backdropFilter: 'blur(16px)',
              boxShadow: `0 18px 48px ${colors.teal}10`,
            }}
          >
            <Flex align="center" justify="between" gap="3" style={{ minWidth: 0 }}>
              <Flex align="center" gap="3" style={{ minWidth: 0 }}>
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: 42,
                    height: 42,
                    flex: '0 0 auto',
                    borderRadius: 8,
                    background: colors.teal,
                    color: colors.amber,
                    boxShadow: `0 10px 24px ${colors.teal}24`,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/logo.svg"
                    alt={`${profile.name} logo`}
                    width="42"
                    height="42"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  />
                </Flex>
                <Box style={{ minWidth: 0 }}>
                  <Text as="div" weight="bold" style={{ color: colors.ink }}>
                    {profile.name}
                  </Text>
                  <Text as="div" size="1" weight="bold" style={{ color: colors.teal }}>
                    {profile.role}
                  </Text>
                </Box>
              </Flex>

              <Box className="mobile-cv-button">
                <Button size="2" asChild style={cvButtonStyle}>
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                    <DownloadIcon />
                    Xem CV
                  </a>
                </Button>
              </Box>
            </Flex>

            <Box asChild className="desktop-nav" style={{ flex: 1 }}>
              <nav aria-label="Main navigation">
                {navPills}
              </nav>
            </Box>

            <Box className="desktop-cv-button">
              <Button size="2" asChild style={cvButtonStyle}>
                <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                  <DownloadIcon />
                  Xem CV
                </a>
              </Button>
            </Box>

            <Box asChild className="mobile-nav">
              <nav
                aria-label="Mobile navigation"
                style={{
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {navPills}
              </nav>
            </Box>
          </Flex>
        </Container>
      </header>
    </Box>
  )
}
