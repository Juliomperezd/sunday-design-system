import src from './background.svg';

export interface BackgroundProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function Background({ width = 375, height = 302, className, style }: BackgroundProps) {
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      style={style}
      alt=""
      draggable={false}
    />
  );
}
