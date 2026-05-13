import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Box } from '@radix-ui/themes'

type RevealProps = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

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
