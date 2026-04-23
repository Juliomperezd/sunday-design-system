import { useState } from 'react';
import { TabNav } from '../../../src/components/TabNav/TabNav';
import { Playground } from '../components/Playground/Playground';

export function TabNavPage() {
  const [value, setValue] = useState('Overview');

  return (
    <Playground
      title="Tab Nav"
      description="Navegación horizontal por pestañas. Sin fondo, indicador de selección mediante divider inferior que ajusta el ancho de la palabra."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
        <TabNav
          options={['Overview', 'Tips', 'Reviews', 'Sunday']}
          value={value}
          onChange={setValue}
        />
      </div>
    </Playground>
  );
}
