import { CSSProperties } from 'react';

// Auto-discovers SVGs from icons/default/ and icons/active/
const defaultModules = import.meta.glob<string>('../../../icons/default/*.svg', {
  eager: true, query: '?raw', import: 'default',
});
const activeModules = import.meta.glob<string>('../../../icons/active/*.svg', {
  eager: true, query: '?raw', import: 'default',
});

function buildMap(modules: Record<string, string>): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [path, content] of Object.entries(modules)) {
    const name = path.split('/').pop()!.replace('.svg', '');
    map[name] = content;
  }
  return map;
}

const defaultMap = buildMap(defaultModules);
const activeMap  = buildMap(activeModules);

export type IconName    = string;
export type IconVariant = 'default' | 'active';

const VARIANT_COLOR: Record<IconVariant, string> = {
  default: 'var(--color-content-secondary)',
  active:  'var(--color-content-primary)',
};

export interface IconProps {
  name: IconName;
  size?: number;
  /** default → content-secondary · active → content-primary
   *  Usar `color` directamente en componentes con estados semánticos */
  variant?: IconVariant;
  /** Override manual para estados semánticos (success, error, warning, info) */
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 24, variant = 'active', color, className, style }: IconProps) {
  const map = variant === 'default' ? defaultMap : activeMap;
  const raw = map[name];
  if (!raw) return null;

  const resolvedColor = color ?? VARIANT_COLOR[variant];

  const sized = raw
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"');

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        color: resolvedColor,
        flexShrink: 0,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}
