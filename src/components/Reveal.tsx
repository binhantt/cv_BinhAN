import type { ReactNode } from 'react'
import { Box } from '@radix-ui/themes'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

type RevealProps = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()
  const offset = direction === 'up' ? '0, 34px' : '0, 24px'

  return (
    <Box
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(${offset}, 0)`,
        transition: `opacity 720ms ease ${delay}ms, transform 720ms ease ${delay}ms`,
        willChange: 'opacity, transform',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
      }}
    >
      {children}
    </Box>
  )
}
