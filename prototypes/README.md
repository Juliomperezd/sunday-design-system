# Prototypes

Prototipos navegables de la app móvil, construidos con React + React Router.

## Desarrollo

```bash
npm install
npm run dev   # localhost:5173
```

## Añadir un nuevo prototipo

### 1. Crear el flujo

```
src/flows/nombre-del-flujo/
├── screens/
│   ├── PantallA.tsx
│   ├── PantallA.module.css
│   └── PantallB.tsx
└── index.tsx       # Define las rutas del flujo
```

### 2. Definir rutas en `index.tsx`

```tsx
import { Routes, Route } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PantallaA } from './screens/PantallaA';
import { PantallaB } from './screens/PantallaB';

export function MiFlujoFlow() {
  return (
    <MobileShell>
      <Routes>
        <Route index element={<PantallaA />} />
        <Route path="b" element={<PantallaB />} />
      </Routes>
    </MobileShell>
  );
}
```

### 3. Registrar en el router (`src/App.tsx`)

```tsx
import { MiFlujoFlow } from './flows/mi-flujo';

// Dentro de <Routes>:
<Route path="/mi-flujo/*" element={<MiFlujoFlow />} />
```

### 4. Añadir al índice (`src/prototypes.ts`)

```ts
{
  key: 'mi-flujo',
  name: 'Nombre del Flujo',
  description: 'Descripción breve de qué hace este prototipo.',
  path: '/mi-flujo',
  screens: 2,
}
```

La tarjeta aparecerá automáticamente en la página de inicio.

## Estructura de carpetas

```
src/
├── components/
│   └── MobileShell/    # Silueta iPhone + responsive
├── flows/
│   └── [nombre]/       # Cada prototipo aquí
├── pages/
│   └── Index.tsx       # Página de inicio con tarjetas
├── prototypes.ts       # Registro de prototipos
└── App.tsx             # Router raíz
```

## MobileShell

En **desktop** (≥ 480px): muestra la silueta de un iPhone centrado en pantalla.
En **móvil real** (< 480px): desaparece y el contenido ocupa toda la pantalla.
