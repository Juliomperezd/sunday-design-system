import { useState } from 'react';
import { Cell } from '../../../src/components/Cell/Cell';
import { Thumbnail } from '../../../src/components/Thumbnail/Thumbnail';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';
import styles from './CellPage.module.css';

const PlaceholderIcon = <Icon name="home-05-1" size={20} variant="active" />;

const ITEMS = [
  { title: 'Marie Dupont',   subtitle: 'Paris',    trailing: '4 200',  trailingSub: 'pts' },
  { title: 'Carlos García',  subtitle: 'Madrid',   trailing: '3 850',  trailingSub: 'pts' },
  { title: 'John Smith',     subtitle: 'New York', trailing: '3 410',  trailingSub: 'pts' },
  { title: 'Yuki Tanaka',    subtitle: 'Tokyo',    trailing: '2 990',  trailingSub: 'pts' },
];

export function CellPage() {
  const [withThumbnail,    setWithThumbnail]    = useState(true);
  const [thumbnailVariant, setThumbnailVariant] = useState<'image' | 'icon'>('image');
  const [withSubtitle,     setWithSubtitle]     = useState(true);
  const [withTrailing,     setWithTrailing]     = useState(false);
  const [withChevron,      setWithChevron]      = useState(false);

  return (
    <Playground
      title="Cell"
      description="Fila de lista. Sin background. Se apilan para formar listas y leaderboards."
      controls={[
        { type: 'toggle', label: 'thumbnail', value: withThumbnail, onChange: setWithThumbnail },
        ...(withThumbnail ? [{
          type: 'select' as const,
          label: 'thumbnail type',
          options: ['image', 'icon'],
          value: thumbnailVariant,
          onChange: (v: string) => setThumbnailVariant(v as 'image' | 'icon'),
        }] : []),
        { type: 'toggle', label: 'subtitle',  value: withSubtitle,  onChange: setWithSubtitle  },
        { type: 'toggle', label: 'trailing',  value: withTrailing,  onChange: setWithTrailing  },
        { type: 'toggle', label: 'chevron',   value: withChevron,   onChange: setWithChevron   },
      ]}
    >
      <div className={styles.list}>
        {ITEMS.map((item, i) => (
          <Cell
            key={item.title}
            title={item.title}
            subtitle={withSubtitle ? item.subtitle : undefined}
            thumbnail={withThumbnail
              ? thumbnailVariant === 'image'
                ? <Thumbnail variant="image" size="sm" src={`https://picsum.photos/seed/${i + 1}/36/36`} alt={item.title} />
                : <Thumbnail variant="icon" size="sm" icon={PlaceholderIcon} />
              : undefined
            }
            trailingTitle={withTrailing ? item.trailing : undefined}
            trailingSubtitle={withTrailing && withSubtitle ? item.trailingSub : undefined}
            chevron={withChevron}
          />
        ))}
      </div>
    </Playground>
  );
}
