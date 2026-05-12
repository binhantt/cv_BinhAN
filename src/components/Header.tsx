import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons'
import { Box, Button, Container, Flex, Text } from '@radix-ui/themes'
import { navItems, profile } from '../database/portfolio'
import { colors, outerFrameStyle } from '../design'

export function Header() {
  return (
    <Box
      asChild
      style={{
        position: 'sticky',
        top: 16,
        zIndex: 20,
        marginTop: 16,
      }}
    >
      <header>
        <Container size="4" px={{ initial: '4', sm: '6' }}>
          <Flex
            align="center"
            justify="between"
            gap="4"
            p="3"
            style={{
              ...outerFrameStyle,
              minHeight: 76,
              background: colors.amber,
              boxShadow: `0 18px 50px ${colors.teal}12`,
            }}
          >
            <Flex align="center" gap="3">
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 8,
                  background: colors.teal,
                  color: colors.amber,
                }}
              >
                <FileTextIcon width="19" height="19" />
              </Flex>
              <Box>
                <Text as="div" weight="bold" style={{ color: colors.ink }}>
                  {profile.name}
                </Text>
                <Text as="div" size="1" style={{ color: colors.teal }}>
                  {profile.role}
                </Text>
              </Box>
            </Flex>

            <Box asChild display={{ initial: 'none', md: 'block' }}>
              <nav aria-label="Main navigation">
                <Flex align="center" justify="center" gap="3" wrap="wrap">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant="ghost"
                      size="2"
                      style={{ color: colors.teal, whiteSpace: 'nowrap' }}
                    >
                      <a href={item.href}>{item.label}</a>
                    </Button>
                  ))}
                </Flex>
              </nav>
            </Box>

            <Button size="2" style={{ background: colors.teal, color: colors.amber, whiteSpace: 'nowrap' }}>
              <DownloadIcon />
              Tải CV
            </Button>
          </Flex>
        </Container>
      </header>
    </Box>
  )
}
