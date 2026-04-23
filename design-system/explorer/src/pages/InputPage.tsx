import { Playground } from '../components/Playground/Playground';
import { Input } from '../../../src/components/Input/Input';

export function InputPage() {
  return (
    <Playground
      title="Input"
      description="Text input with floating label. The label lives inside the field and floats to the top on focus or when the field has content."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
      </div>
    </Playground>
  );
}
