import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  rootMargin?: string
  threshold?: number
}

export function useRevealOnScroll<TElement extends HTMLElement>({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.18,
}: RevealOptions = {}) {
  const ref = useRef<TElement>(null)
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
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, visible }
}
