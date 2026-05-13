import type { CSSProperties } from 'react'

export const colors = {
  ink: '#07130d',
  teal: '#16a34a',
  amber: '#f7fff8',
}

export const pageStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '76px 0 56px',
  color: colors.ink,
  background: `
    linear-gradient(90deg, rgba(22, 163, 74, 0.07) 1px, transparent 1px),
    linear-gradient(180deg, rgba(22, 163, 74, 0.06) 1px, transparent 1px),
    radial-gradient(circle at 14% 16%, ${colors.teal}1c, transparent 30%),
    radial-gradient(circle at 86% 32%, ${colors.teal}14, transparent 32%),
    radial-gradient(circle at 50% 92%, ${colors.teal}10, transparent 30%),
    ${colors.amber}
  `,
  backgroundSize: '72px 72px, 72px 72px, auto, auto, auto, auto',
}

export const sectionStyle: CSSProperties = {
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '64px 0',
  scrollMarginTop: 132,
}

export const outerFrameStyle: CSSProperties = {
  border: `1px solid ${colors.teal}40`,
  borderRadius: 8,
  background: `${colors.teal}0c`,
}

export const visualStyle: CSSProperties = {
  ...outerFrameStyle,
  height: 440,
  minHeight: 320,
  overflow: 'hidden',
}

export const compactVisualStyle: CSSProperties = {
  ...visualStyle,
  height: 360,
  minHeight: 300,
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
