// Raw palette — source of truth for semantic tokens
export const palette = {
  primary: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a',
  },
  neutral: {
    0: '#ffffff', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
    300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569',
    700: '#334155', 800: '#1e293b', 900: '#0f172a',
  },
  success: { 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
  warning: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
  error:   { 400: '#f87171', 500: '#ef4444', 600: '#dc2626' },
} as const;

export const colors = {
  background: {
    primary:   '#ffffff',
    secondary: 'rgb(0 0 0 / 0.04)',
    sunday:    '#ff17e9',
    success:   '#adf6c0',
    info:      '#ebedfb',
    warning:   '#fff4d1',
    error:     '#ffd1dc',
    buttonPrimary:           '#000000',
    buttonSecondary:         'rgb(0 0 0 / 0.08)',
    buttonDisabled:          'rgb(0 0 0 / 0.30)',
    buttonPrimaryReversed:   '#ffffff',
    buttonSecondaryReversed: 'rgb(255 255 255 / 0.30)',
    buttonDisabledReversed:  'rgb(255 255 255 / 0.30)',
    buttonSuccess:           'rgb(14 122 50 / 0.20)',
    buttonInfo:              'rgb(45 52 130 / 0.20)',
    buttonError:             'rgb(209 16 35 / 0.20)',
    buttonWarning:           'rgb(225 105 0 / 0.20)',
  },
  overlay: {
    70: 'rgb(0 0 0 / 0.70)',
    30: 'rgb(0 0 0 / 0.30)',
  },
  content: {
    primary:   '#000000',
    secondary: 'rgb(0 0 0 / 0.58)',
    disabled:  'rgb(0 0 0 / 0.30)',
    primaryReversed:  '#ffffff',
    secondaryReversed: 'rgb(255 255 255 / 0.58)',
    disabledReversed: 'rgb(255 255 255 / 0.30)',
    actionPrimary:           '#000000',
    actionSecondary:         'rgb(0 0 0 / 0.58)',
    actionDisabled:          'rgb(0 0 0 / 0.30)',
    actionPrimaryReversed:   '#000000',
    actionSecondaryReversed: 'rgb(0 0 0 / 0.58)',
    actionDisabledReversed:  'rgb(0 0 0 / 0.58)',
    success: '#0e7a32',
    info:    '#2d3482',
    error:   '#d11023',
    warning: '#e16900',
    sunday:  '#ff17e9',
  },
  stroke: {
    focus:   '#000000',
    default: 'rgb(0 0 0 / 0.14)',
    divider: 'rgb(0 0 0 / 0.04)',
    focusReversed:   '#ffffff',
    defaultReversed: 'rgb(255 255 255 / 0.30)',
    dividerReversed: 'rgb(255 255 255 / 0.14)',
    error:   '#d11023',
    warning: '#e16900',
    /** Gradient stroke — use with padding-box/border-box technique, not plain border */
    ai: 'linear-gradient(135deg, #f0968a 0%, #d46ec8 55%, #9b5fe0 100%)',
  },
} as const;

export const fontFamily = {
  base: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
} as const;

// ── Heading type tokens ──
// Each token: { size (rem), lineHeight (unitless), letterSpacing (em), weightRegular, weightEmphasized }
export const typeHeading = {
  hero:  { size: '6rem',       lineHeight: 0.85,  letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  xxxl:  { size: '4.5rem',     lineHeight: 0.90,  letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  xxl:   { size: '3.5rem',     lineHeight: 0.90,  letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  xl:    { size: '3rem',       lineHeight: 0.90,  letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  l:     { size: '2.5rem',     lineHeight: 1.0,   letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  m:     { size: '2rem',       lineHeight: 1.0,   letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  s:     { size: '1.75rem',    lineHeight: 1.1,   letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  xs:    { size: '1.5rem',     lineHeight: 1.058, letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
  xxs:   { size: '1.3125rem',  lineHeight: 1.1,   letterSpacing: '-0.05em', weightRegular: 400, weightEmphasized: 500 },
} as const;

// ── Body type tokens ──
export const typeBody = {
  l:  { size: '1.125rem', lineHeight: 1.111, letterSpacing: '-0.03em', weightRegular: 400, weightEmphasized: 500 },
  m:  { size: '1rem',     lineHeight: 1.25,  letterSpacing: '-0.03em', weightRegular: 400, weightEmphasized: 500 },
  s:  { size: '0.875rem', lineHeight: 1.286, letterSpacing: '-0.03em', weightRegular: 400, weightEmphasized: 500 },
  xs: { size: '0.75rem',  lineHeight: 1.167, letterSpacing: '-0.03em', weightRegular: 400, weightEmphasized: 500 },
} as const;

// ── Button type tokens ──
export const typeButton = {
  m: { size: '1rem',      lineHeight: 1.25,  letterSpacing: '-0.03em', weight: 500 },
  l: { size: '0.6875rem', lineHeight: 1.727, letterSpacing: '-0.03em', weight: 500 },
} as const;

// ── Emphasized — 10px ──
// For dense metadata, micro-labels, captions
export const typeEmphasized = {
  size: '0.625rem',
  lineHeight: 1.2,
  letterSpacing: '0.04em',
} as const;

// Spacing scale — number = px value
export const spacing = {
  4:   '0.25rem',   //   4px
  8:   '0.5rem',    //   8px
  12:  '0.75rem',   //  12px
  16:  '1rem',      //  16px
  20:  '1.25rem',   //  20px
  24:  '1.5rem',    //  24px
  32:  '2rem',      //  32px
  40:  '2.5rem',    //  40px
  48:  '3rem',      //  48px
  56:  '3.5rem',    //  56px
  64:  '4rem',      //  64px
  72:  '4.5rem',    //  72px
  80:  '5rem',      //  80px
  88:  '5.5rem',    //  88px
  96:  '6rem',      //  96px
  104: '6.5rem',    // 104px
  120: '7.5rem',    // 120px
} as const;

export const borderRadius = {
  none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem',
  xl: '1rem', '2xl': '1.5rem', full: '9999px',
} as const;

export const elevation = {
  100: '0 2px 8px 0 rgb(0 0 0 / 0.04)',
  200: '0 4px 24px 0 rgb(0 0 0 / 0.08)',
  300: '0 2px 8px 0 rgb(0 0 0 / 0.04), 0 12px 40px 0 rgb(0 0 0 / 0.12)',
} as const;

export const tokens = {
  palette, colors, fontFamily, fontWeight,
  typeHeading, typeBody, typeButton, typeEmphasized,
  spacing, borderRadius, elevation,
} as const;
