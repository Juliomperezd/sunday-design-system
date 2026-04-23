import { useState } from 'react';
import { Thumbnail, ThumbnailVariant, ThumbnailSize } from '../../../src/components/Thumbnail/Thumbnail';
import { Playground } from '../components/Playground/Playground';

const PlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SAMPLE_IMAGE = 'https://picsum.photos/64/64';

export function ThumbnailPage() {
  const [variant, setVariant] = useState<ThumbnailVariant>('icon');
  const [size,    setSize]    = useState<ThumbnailSize>('md');

  return (
    <Playground
      title="Thumbnail"
      description="md: 64×64 con icono 40×40. sm: 36×36 con icono 20×20. Imagen siempre circular con stroke inset."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['icon', 'image'],
          value: variant,
          onChange: (v) => setVariant(v as ThumbnailVariant),
        },
        {
          type: 'select',
          label: 'size',
          options: ['md', 'sm'],
          value: size,
          onChange: (v) => setSize(v as ThumbnailSize),
        },
      ]}
    >
      {variant === 'icon'
        ? <Thumbnail variant="icon" size={size} icon={PlaceholderIcon} />
        : <Thumbnail variant="image" size={size} src={SAMPLE_IMAGE} alt="Sample" />
      }
    </Playground>
  );
}
