import { ActionButton } from '../../../src/components/ActionButton/ActionButton';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';

export function ActionButtonPage() {
  return (
    <Playground
      title="ActionButton"
      description="Botón táctil 48×48. 3 variantes: icon · image · initials."
      controls={[]}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ActionButton
          variant="icon"
          icon={<Icon name="bell-02" size={20} variant="active" />}
          label="Notifications"
        />
        <ActionButton
          variant="image"
          src="https://picsum.photos/seed/ab/48/48"
          alt="User avatar"
        />
        <ActionButton
          variant="initials"
          initials="JD"
          label="John Doe"
        />
        <ActionButton
          variant="sunday"
          icon={<Icon name="check-circle" size={20} color="var(--color-content-primary-reversed)" />}
          label="Sunday"
        />
      </div>
    </Playground>
  );
}
