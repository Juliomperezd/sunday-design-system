import { Playground } from '../components/Playground/Playground';
import { Background } from '../../../src/prototype-components/Background/Background';

export function BackgroundPage() {
  return (
    <Playground
      title="Background"
      description="Decorative background graphic for prototype screens. Native size 375×302px."
      controls={[]}
    >
      <Background />
    </Playground>
  );
}
