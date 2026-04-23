import { Image } from '../../../src/components/Image/Image';
import { Playground } from '../components/Playground/Playground';
import styles from './ImagePage.module.css';

const SAMPLE = 'https://picsum.photos/800/600';

export function ImagePage() {
  return (
    <Playground
      title="Image"
      description="Siempre width 100% del contenedor. El alto lo determina la imagen."
      controls={[]}
    >
      <div className={styles.frame}>
        <Image src={SAMPLE} alt="Sample" />
      </div>
    </Playground>
  );
}
