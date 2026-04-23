import { useId } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'gold' | 'silver' | 'bronze';
export type BadgeSize = 'sm' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const RANK: Record<BadgeVariant, string | null> = {
  default: null,
  gold: '1',
  silver: '2',
  bronze: '3',
};

const GRADIENT_STOPS: Record<BadgeVariant, { from: string; mid: string; to: string } | null> = {
  default: null,
  gold:   { from: '#ffe566', mid: '#f5a623', to: '#e8832a' },
  silver: { from: '#f4f4f4', mid: '#c8cdd8', to: '#8e949e' },
  bronze: { from: '#f0a878', mid: '#c87038', to: '#7a3a10' },
};

// Shield path: rounded top corners, straight sides, curved point at bottom
// viewBox 0 0 100 100
const SHIELD_PATH = 'M 8 0 L 92 0 Q 100 0 100 8 L 100 60 Q 100 76 50 100 Q 0 76 0 60 L 0 8 Q 0 0 8 0 Z';

const SIZES: Record<BadgeSize, number> = { lg: 64, sm: 20 };

export function Badge({ variant = 'default', size = 'lg' }: BadgeProps) {
  const uid = useId();
  const gradientId = `badge-grad-${uid}`;
  const rank = size === 'lg' ? RANK[variant] : null;
  const dim = SIZES[size];
  const stops = GRADIENT_STOPS[variant];

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.badge}
      aria-hidden="true"
    >
      <defs>
        {stops && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={stops.from} />
            <stop offset="55%"  stopColor={stops.mid}  />
            <stop offset="100%" stopColor={stops.to}   />
          </linearGradient>
        )}
      </defs>

      <path
        d={SHIELD_PATH}
        fill={stops ? `url(#${gradientId})` : 'rgba(0,0,0,0.58)'}
      />

      {rank && (
        <text
          x="50"
          y="43"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="44"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="500"
          fill="#000000"
        >
          {rank}
        </text>
      )}
    </svg>
  );
}
