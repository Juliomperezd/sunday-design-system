import { ActionIcon } from '../../../src/components/ActionIcon/ActionIcon';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';

const ICONS = ['bell-02', 'settings-01', 'chevron-right', 'chevron-left', 'mail-01', 'user-02'];

export function ActionIconPage() {
  return (
    <Playground
      title="ActionIcon"
      description="Botón táctil 48×48. Fondo transparente. Icono centrado 20×20 en estado active."
      controls={[]}
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ICONS.map((name) => (
          <ActionIcon
            key={name}
            icon={<Icon name={name} size={20} variant="active" />}
            label={name}
            onClick={() => {}}
          />
        ))}
      </div>
    </Playground>
  );
}
