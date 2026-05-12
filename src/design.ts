import type { CSSProperties } from 'react'

export const colors = {
  ink: '#07130d',
  teal: '#16a34a',
  amber: '#f7fff8',
}

export const pageStyle: CSSProperties = {
  minHeight: '100vh',
  margin: '-8px',
  padding: '88px 0 56px',
  color: colors.ink,
  background: `radial-gradient(circle at 12% 18%, ${colors.teal}18, transparent 28%), radial-gradient(circle at 88% 42%, ${colors.teal}12, transparent 30%), ${colors.amber}`,
}

export const sectionStyle: CSSProperties = {
  minHeight: '100svh',
  display: 'flex',
  alignItems: 'center',
  padding: '24px 0 56px',
  scrollMarginTop: 96,
}

export const outerFrameStyle: CSSProperties = {
  border: `1px solid ${colors.teal}40`,
  borderRadius: 8,
  background: `${colors.teal}0c`,
}

export const visualStyle: CSSProperties = {
  ...outerFrameStyle,
  height: 'min(500px, 58svh)',
  minHeight: 320,
  overflow: 'hidden',
}

export const compactVisualStyle: CSSProperties = {
  ...visualStyle,
  height: '100%',
  minHeight: 360,
}

export const copyStyle: CSSProperties = {
  maxWidth: 620,
  lineHeight: 1.7,
}

export const kickerStyle: CSSProperties = {
  color: colors.teal,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
}
