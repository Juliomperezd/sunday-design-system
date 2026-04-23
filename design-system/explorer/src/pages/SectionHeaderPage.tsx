import { useState } from 'react';
import { SectionHeader, SectionHeaderLevel, SectionHeaderAlign } from '../../../src/components/SectionHeader/SectionHeader';
import { ButtonVariant } from '../../../src/components/Button/Button';
import { Playground } from '../components/Playground/Playground';

const PlaceholderIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SAMPLE_IMAGE = 'https://picsum.photos/64/64';

export function SectionHeaderPage() {
  const [level,           setLevel]          = useState<SectionHeaderLevel>('hero');
  const [align,           setAlign]          = useState<SectionHeaderAlign>('left');
  const [subtitle,        setSubtitle]       = useState(false);
  const [action,          setAction]         = useState(false);
  const [actionVariant,   setActionVariant]  = useState<ButtonVariant>('primary');
  const [thumb,           setThumb]          = useState(false);
  const [thumbVariant,    setThumbVariant]   = useState<'icon' | 'image'>('icon');

  const thumbnail = thumb
    ? thumbVariant === 'image'
      ? { variant: 'image' as const, src: SAMPLE_IMAGE, alt: 'Thumbnail' }
      : { variant: 'icon'  as const, icon: <Icon name="image" size={40} /> }
    : undefined;

  return (
    <Playground
      title="Section Header"
      description="Bloque de encabezado de sección. Thumbnail, título, subtítulo y acción opcionales."
      controls={[
        {
          type: 'select',
          label: 'level',
          options: ['hero', 'h1', 'h2', 'h3', 'p1', 'category'],
          value: level,
          onChange: (v) => setLevel(v as SectionHeaderLevel),
        },
        {
          type: 'select',
          label: 'align',
          options: ['left', 'center', 'right'],
          value: align,
          onChange: (v) => setAlign(v as SectionHeaderAlign),
        },
        {
          type: 'toggle',
          label: 'thumbnail',
          value: thumb,
          onChange: setThumb,
        },
        {
          type: 'select',
          label: 'thumbnail variant',
          options: ['icon', 'image'],
          value: thumbVariant,
          onChange: (v) => setThumbVariant(v as 'icon' | 'image'),
        },
        {
          type: 'toggle',
          label: 'subtitle',
          value: subtitle,
          onChange: setSubtitle,
        },
        {
          type: 'toggle',
          label: 'action',
          value: action,
          onChange: setAction,
        },
        {
          type: 'select',
          label: 'action variant',
          options: ['primary', 'secondary', 'tertiary'],
          value: actionVariant,
          onChange: (v) => setActionVariant(v as ButtonVariant),
        },
      ]}
    >
      <div style={{ width: '375px' }}>
        <SectionHeader
          level={level}
          align={align}
          thumbnail={thumbnail}
          subtitle={subtitle ? 'Texto de apoyo que complementa el título.' : undefined}
          action={action ? { label: 'Ver todo', variant: actionVariant } : undefined}
        >
          Section title
        </SectionHeader>
      </div>
    </Playground>
  );
}
