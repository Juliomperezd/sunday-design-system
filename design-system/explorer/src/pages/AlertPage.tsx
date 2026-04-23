import { useState } from 'react';
import { Alert, AlertVariant } from '../../../src/components/Alert';
import { Playground } from '../components/Playground/Playground';

export function AlertPage() {
  const [variant, setVariant]       = useState<AlertVariant>('info');
  const [showSubtitle, setSubtitle] = useState(true);
  const [showAction, setAction]     = useState(false);
  const [showClose, setClose]       = useState(false);
  const [dismissed, setDismissed]   = useState(false);

  const COPY: Record<AlertVariant, { title: string; subtitle: string }> = {
    warning: { title: 'Atención requerida',    subtitle: 'Algunos datos no han podido verificarse. Revisa la información antes de continuar.' },
    error:   { title: 'Error al procesar',      subtitle: 'No hemos podido completar la acción. Inténtalo de nuevo o contacta con soporte.' },
    info:    { title: 'Información importante', subtitle: 'Esta acción afectará a todos los usuarios del equipo a partir de mañana.' },
    success: { title: 'Cambios guardados',      subtitle: 'La configuración se ha actualizado correctamente y ya está disponible.' },
  };

  return (
    <Playground
      title="Alert"
      description="Mensajes contextuales con 4 variantes: warning, error, info y success."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['info', 'warning', 'error', 'success'],
          value: variant,
          onChange: (v) => { setVariant(v as AlertVariant); setDismissed(false); },
        },
        {
          type: 'toggle',
          label: 'subtitle',
          value: showSubtitle,
          onChange: setSubtitle,
        },
        {
          type: 'toggle',
          label: 'action',
          value: showAction,
          onChange: setAction,
        },
        {
          type: 'toggle',
          label: 'onClose',
          value: showClose,
          onChange: (v) => { setClose(v); setDismissed(false); },
        },
      ]}
    >
      {dismissed ? (
        <button
          onClick={() => setDismissed(false)}
          style={{
            background: 'none',
            border: '1px solid var(--color-stroke-default)',
            borderRadius: 'var(--radius-full)',
            padding: 'var(--spacing-8) var(--spacing-16)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-body-s-size)',
            color: 'var(--color-content-secondary)',
            cursor: 'pointer',
          }}
        >
          Restaurar
        </button>
      ) : (
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <Alert
            variant={variant}
            title={COPY[variant].title}
            subtitle={showSubtitle ? COPY[variant].subtitle : undefined}
            action={showAction ? { label: 'Ver detalles', onClick: () => {} } : undefined}
            onClose={showClose ? () => setDismissed(true) : undefined}
          />
        </div>
      )}
    </Playground>
  );
}
