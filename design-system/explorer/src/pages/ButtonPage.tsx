import { useState } from 'react';
import { Button, ButtonVariant, ButtonSize } from '../../../src/components/Button';
import { Playground } from '../components/Playground/Playground';

const PLACEHOLDER_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function ButtonPage() {
  const [variant,       setVariant]       = useState<ButtonVariant>('primary');
  const [size,          setSize]          = useState<ButtonSize>('large');
  const [disabled,      setDisabled]      = useState(false);
  const [showIcon,      setShowIcon]      = useState(false);
  const [showTrailing,  setShowTrailing]  = useState(false);

  return (
    <Playground
      title="Button"
      description="3 variantes · 2 tamaños · estado disabled · icono izquierdo y derecho opcionales."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['primary', 'secondary', 'tertiary'],
          value: variant,
          onChange: (v) => setVariant(v as ButtonVariant),
        },
        {
          type: 'select',
          label: 'size',
          options: ['large', 'small'],
          value: size,
          onChange: (v) => setSize(v as ButtonSize),
        },
        { type: 'toggle', label: 'disabled',       value: disabled,     onChange: setDisabled     },
        { type: 'toggle', label: 'leading icon',   value: showIcon,     onChange: setShowIcon     },
        { type: 'toggle', label: 'trailing icon',  value: showTrailing, onChange: setShowTrailing },
      ]}
    >
      <div style={{ width: '375px' }}>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          icon={showIcon ? PLACEHOLDER_ICON : undefined}
          trailingIcon={showTrailing ? PLACEHOLDER_ICON : undefined}
        >
          Button label
        </Button>
      </div>
    </Playground>
  );
}
