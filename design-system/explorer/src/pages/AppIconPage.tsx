import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { AppIcon } from '../../../src/prototype-components/AppIcon/AppIcon';

export function AppIconPage() {
  const [badge, setBadge] = useState(false);

  return (
    <Playground
      title="App Icon"
      description="Sunday app icon with name. Optional notification badge."
      controls={[
        {
          label: 'Badge',
          type: 'toggle',
          value: badge,
          onChange: setBadge,
        },
      ]}
    >
      <AppIcon size={160} badge={badge ? 4 : undefined} />
    </Playground>
  );
}
