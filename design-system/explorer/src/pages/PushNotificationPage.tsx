import { useState } from 'react';
import { PushNotification } from '../../../src/prototype-components/PushNotification';
import { Playground } from '../components/Playground/Playground';

const TIME_OPTIONS = ['ahora', 'hace 1 min', 'hace 5 min', 'hace 1 h'];

export function PushNotificationPage() {
  const [appName,   setAppName]   = useState('Sunday');
  const [time,      setTime]      = useState('ahora');
  const [showBody,  setShowBody]  = useState(true);
  const [clickable, setClickable] = useState(false);

  return (
    <Playground
      title="Push notification"
      description="Componente de prototipo — sólo para flujos. No se exporta al DS de producción."
      controls={[
        {
          type: 'select',
          label: 'appName',
          options: ['Sunday', 'Mi app', 'Delivery', 'Banking'],
          value: appName,
          onChange: setAppName,
        },
        {
          type: 'select',
          label: 'time',
          options: TIME_OPTIONS,
          value: time,
          onChange: setTime,
        },
        {
          type: 'toggle',
          label: 'body',
          value: showBody,
          onChange: setShowBody,
        },
        {
          type: 'toggle',
          label: 'onClick',
          value: clickable,
          onChange: setClickable,
        },
      ]}
    >
      <PushNotification
        appName={appName}
        time={time}
        title="Tienes un nuevo mensaje disponible"
        body={showBody ? 'Revisa los detalles en la aplicación para completar tu pedido.' : undefined}
        onClick={clickable ? () => {} : undefined}
      />
    </Playground>
  );
}
