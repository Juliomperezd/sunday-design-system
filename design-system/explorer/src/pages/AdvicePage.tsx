import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { Advice } from '../../../src/components/Advice/Advice';
import { Icon } from '../../../src/prototype-components/Icon/Icon';

export function AdvicePage() {
  const [withSubtitle, setWithSubtitle] = useState(true);

  return (
    <Playground
      title="AI-Advice"
      description="Card with AI gradient stroke. Pass backgroundImage (URL) to fill the interior with a photo. Without it, uses bg-secondary."
      controls={[
        {
          type: 'toggle',
          label: 'Subtitle',
          value: withSubtitle,
          onChange: setWithSubtitle,
        },
      ]}
    >
      <div style={{ width: 351 }}>
        <Advice
          icon={<Icon name="info-circle" size={40} variant="active" />}
          title="Your recovery is below average"
          subtitle={withSubtitle ? 'Try to get at least 7 hours of sleep tonight to improve your score.' : undefined}
        />
      </div>
    </Playground>
  );
}
