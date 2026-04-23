# @mi-org/design-system

Design system en React para prototipos de app móvil.

## Desarrollo

```bash
npm install
npm run dev:explorer   # Abre el explorador de componentes en localhost:5173
```

## Build del paquete

```bash
npm run build   # Genera /dist listo para publicar
```

## Añadir un nuevo componente

1. Crear la carpeta `src/components/NombreComponente/`
2. Añadir los tres archivos:

```
NombreComponente/
├── NombreComponente.tsx       # Componente React
├── NombreComponente.module.css
└── index.ts                   # Re-exporta el componente y sus tipos
```

3. Exportar desde `src/index.ts`:

```ts
export { NombreComponente } from './components/NombreComponente';
export type { NombreComponenteProps } from './components/NombreComponente';
```

4. Añadir una página al explorer en `explorer/src/pages/NombreComponentePage.tsx`

5. Registrar la página en `explorer/src/App.tsx`:

```ts
const PAGES = {
  // ...existentes
  nombreComponente: { label: 'NombreComponente', component: NombreComponentePage },
};
```

## Tokens

Los design tokens viven en `src/tokens/`:
- `tokens.css` — variables CSS (usar en estilos con `var(--nombre)`)
- `tokens.ts` — objetos TypeScript exportados (usar en lógica JS si hace falta)

## Publicar el paquete

```bash
# 1. Subir la versión en package.json (patch / minor / major)
npm version patch

# 2. Build
npm run build

# 3. Publicar
npm publish --access public
```

Los consumidores importan el CSS de tokens aparte:

```ts
import '@mi-org/design-system/tokens.css';
import { Button } from '@mi-org/design-system';
```
