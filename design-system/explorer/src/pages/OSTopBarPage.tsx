import { Playground } from '../components/Playground/Playground';
import { OSTopBar } from '../../../src/prototype-components/OSTopBar/OSTopBar';

export function OSTopBarPage() {
  return (
    <Playground
      title="OS Top Bar"
      description="Native iOS status bar with time on the left and system indicators (battery, Wi-Fi, signal) on the right. Background is transparent — inherits from parent."
      controls={[]}
    >
      <div style={{ width: 375, background: '#000', borderRadius: 8, overflow: 'hidden' }}>
        <OSTopBar color="#fff" />
      </div>
    </Playground>
  );
}
