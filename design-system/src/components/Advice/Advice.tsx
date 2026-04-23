import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './Advice.module.css';

export interface AdviceProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  /** Background image URL. When omitted, falls back to bg-secondary. */
  backgroundImage?: string;
}

export function Advice({ icon, title, subtitle, backgroundImage }: AdviceProps) {
  return (
    <div
      className={styles.advice}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      <SectionHeader level="p1" subtitle={subtitle}>
        {title}
      </SectionHeader>
    </div>
  );
}
