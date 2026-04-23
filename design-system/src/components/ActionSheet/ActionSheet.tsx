import { Button, ButtonVariant } from '../Button/Button';
import styles from './ActionSheet.module.css';

interface ActionItem {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

export interface ActionSheetProps {
  primaryAction: ActionItem;
  secondaryAction?: ActionItem;
  background?: boolean;
}

export function ActionSheet({
  primaryAction,
  secondaryAction,
  background = true,
}: ActionSheetProps) {
  return (
    <div className={[styles.sheet, background ? styles.withBackground : ''].filter(Boolean).join(' ')}>
      <Button
        variant={primaryAction.variant ?? 'primary'}
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </Button>
      {secondaryAction && (
        <Button
          variant={secondaryAction.variant ?? 'secondary'}
          onClick={secondaryAction.onClick}
        >
          {secondaryAction.label}
        </Button>
      )}
    </div>
  );
}
