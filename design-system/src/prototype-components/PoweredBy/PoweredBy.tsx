import darkSrc from './powered-dark.svg';
import lightSrc from './powered-light.svg';

export interface PoweredByProps {
  mode?: 'dark' | 'light';
  scale?: number;
}

export function PoweredBy({ mode = 'dark', scale = 1 }: PoweredByProps) {
  return (
    <img
      src={mode === 'dark' ? darkSrc : lightSrc}
      width={132 * scale}
      height={20 * scale}
      alt="Powered by Sunday"
      draggable={false}
    />
  );
}
