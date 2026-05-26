import type { CSSProperties } from 'react'

export const colors = {
  ink: '#FFF8F8',
  teal: '#F43F5E',
  amber: '#0F0F0F',
  muted: '#A1A1AA',
  panel: '#18181B',
}

export const pageStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '0 0 56px',
  color: colors.ink,
  background: `
    linear-gradient(90deg, rgba(250, 250, 250, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, rgba(250, 250, 250, 0.028) 1px, transparent 1px),
    radial-gradient(circle at 18% 18%, ${colors.teal}12, transparent 34%),
    radial-gradient(circle at 86% 28%, rgba(250, 250, 250, 0.05), transparent 30%),
    radial-gradient(circle at 50% 94%, ${colors.teal}0a, transparent 32%),
    ${colors.amber}
  `,
  backgroundSize: '96px 96px, 96px 96px, auto, auto, auto, auto',
}

export const sectionStyle: CSSProperties = {
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '48px 0',
  scrollMarginTop: 134,
}

export const outerFrameStyle: CSSProperties = {
  border: `1px solid ${colors.teal}26`,
  borderRadius: 8,
  background: 'rgba(24, 24, 27, 0.62)',
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
