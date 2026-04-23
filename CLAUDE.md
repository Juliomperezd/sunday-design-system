# Sunday — Design System + Prototypes

## Estructura del repositorio

```
sunday/
├── design-system/   # Librería de componentes (@mi-org/design-system)
└── prototypes/      # App de prototipos navegables
```

---

## design-system/

**Package:** `@mi-org/design-system`
**Stack:** React + Vite (library mode) + TypeScript + CSS Modules
**Sin** Tailwind ni librerías de UI externas.

### Arrancar el explorer
```bash
cd design-system
npm run dev:explorer   # → http://localhost:5174
```

### Build de la librería
```bash
npm run build   # genera dist/ con ESM + CJS + tipos
```

### Estructura completa
```
design-system/
├── assets/                        # Imágenes por prototipo
│   └── onboarding/                # PNGs/SVGs del flujo onboarding
├── icons/                         # SVG icons (auto-discovered)
├── src/
│   ├── index.ts                   # Barrel: exporta componentes y tokens de producción
│   ├── tokens/
│   │   ├── tokens.css             # Variables CSS (paleta raw + tokens semánticos)
│   │   └── tokens.ts              # Mismo árbol en JS/TS
│   ├── components/                # Componentes de producción
│   │   ├── Button/
│   │   ├── Alert/
│   │   ├── ActionSheet/
│   │   ├── Divider/
│   │   ├── Tag/
│   │   ├── SegmentedControl/
│   │   ├── SectionHeader/
│   │   ├── Thumbnail/
│   │   ├── NavBar/
│   │   ├── Feedback/
│   │   ├── Image/
│   │   ├── Cell/
│   │   ├── ActionButton/
│   │   ├── Header/
│   │   ├── PerformanceWidgetHorizontal/
│   │   ├── PerformanceWidgetVertical/
│   │   ├── Donut/
│   │   ├── InlineWidget/
│   │   ├── BarEvolution/
│   │   ├── InlineGraph/
│   │   ├── LineChart/
│   │   ├── Advice/
│   │   ├── Shift/
│   │   ├── ShiftPill/
│   │   ├── PerformanceWidgetSquare/
│   │   ├── ValueDot/
│   │   ├── Input/
│   │   └── Tips/
│   └── prototype-components/      # Solo para prototipos, no exportados en index.ts
│       ├── PushNotification/
│       ├── OSTopBar/
│       └── Icon/
└── explorer/                      # App de documentación visual (Vite)
    └── src/
        ├── App.tsx                # NAV + routing del explorer
        ├── pages/
        │   ├── TypographyPage.tsx
        │   ├── ColorsPage.tsx
        │   ├── ElevationPage.tsx
        │   ├── SpacingPage.tsx
        │   ├── ButtonPage.tsx
        │   ├── AlertPage.tsx
        │   ├── ActionSheetPage.tsx
        │   ├── DividerPage.tsx
        │   ├── TagPage.tsx
        │   ├── SegmentedControlPage.tsx
        │   ├── SectionHeaderPage.tsx
        │   ├── ThumbnailPage.tsx
        │   ├── NavBarPage.tsx
        │   ├── FeedbackPage.tsx
        │   ├── ImagePage.tsx
        │   ├── CellPage.tsx
        │   ├── ActionButtonPage.tsx
        │   ├── HeaderPage.tsx
        │   ├── PerformanceWidgetHorizontalPage.tsx
        │   ├── PerformanceWidgetVerticalPage.tsx
        │   ├── DonutPage.tsx
        │   ├── InlineGraphPage.tsx
        │   ├── TipsPage.tsx
        │   ├── RingsPage.tsx
        │   ├── AdvicePage.tsx
        │   ├── ShiftPage.tsx
        │   ├── ShiftPillPage.tsx
        │   ├── PerformanceWidgetSquarePage.tsx
        │   ├── ValueDotPage.tsx
        │   ├── InputPage.tsx
        │   ├── PushNotificationPage.tsx
        │   ├── OSTopBarPage.tsx
        │   ├── AssetsPage.tsx
        │   └── IconsPage.tsx
        └── components/
            ├── Sidebar/
            └── Playground/        # Canvas blanco + barra de controles reutilizable
```

### Tokens CSS (`tokens.css`)
Las variables se importan en los prototipos directamente desde `src/tokens/tokens.css` (path relativo).

**Tipografía:**
- `--type-heading-hero/xxxl/xxl/xl/l/m/s/xs/xxs-size/lh/ls`
- `--type-body-l/m/s/xs-size/lh/ls`
- `--type-button-m/l-size/lh/ls`
- `--font-weight-regular: 400` / `--font-weight-medium: 500`
- `--font-family-base: 'Helvetica Neue LT Std', Helvetica, Arial, sans-serif`

**Colores semánticos (4 categorías):**
- Background: `--color-bg-primary/secondary/button-primary/button-secondary/button-disabled/button-success/button-info/button-error/button-warning/success/info/error`
- Content: `--color-content-primary/secondary/disabled/error/info/success/warning/sunday/label-primary/label-secondary`
- Stroke: `--color-stroke-focus/default/divider/error/warning/ai`
- Overlay: `--color-overlay-100/70/30`

**Token especial — gradiente AI:**
```css
--color-stroke-ai: linear-gradient(135deg, #f0968a 0%, #d46ec8 55%, #9b5fe0 100%);
```
Es un gradiente CSS, no un color plano — no se puede usar directamente en `border` ni `outline`. Para bordes con gradiente usar la técnica `::before` + `mask-composite: exclude` (ver componente `Advice`).

⚠ Los valores hexadecimales de los colores son aproximados — Julio debe confirmar los códigos exactos del Figma.

---

### Componentes de producción

**Button** — `variant`: primary | secondary | ghost · `size`: sm | md | lg · `loading` · `fullWidth` · forwarded ref

**Alert** — `variant`: warning | error | info | success · `title` (required) · `subtitle` · `icon` (ReactNode, slot) · `action: { label, onClick }` · `onClose`

**ActionSheet** — modal bottom sheet con lista de acciones

**Divider** — separador horizontal, `variant`: default | subtle

**Tag** — `variant`: default | success | error | warning | info

**SegmentedControl** — tabs horizontales con estado activo

**SectionHeader** — `level`: hero | h1 | h2 | h3 | p1 | category · `align`: left | center · `action: { label, onClick }`
- `category`: body-xs medium uppercase, `--color-content-secondary` — para títulos de sección tipo etiqueta (12px emphasized). Siempre en mayúsculas vía `text-transform: uppercase`.

**Thumbnail** — imagen cuadrada con `variant`: sm | md | lg

**NavBar** — barra de navegación inferior · `items: NavItem[]` · `activeKey` · `onSelect`

**Feedback** — pantalla de feedback completa · `action: { label, onClick }`

**Image** — imagen con aspect ratio fijo

**Cell** — fila de lista con icono + texto + acción

**ActionButton** — botón circular con icono + label debajo

**Header** — cabecera de pantalla con dos variantes:
- `variant="inner"`: OSTopBar encima + fila con botón izquierda, título centrado, acciones derecha (grid `48px 1fr auto`)
- `variant="main"`: OSTopBar encima + fila con saludo izquierda y acciones derecha, imagen de fondo `mainBg`
- En ambas variantes, OSTopBar se integra automáticamente en la parte superior con `color` `--color-content-primary`

**PerformanceWidgetHorizontal** — widget métrica horizontal:
- Izquierda: `Icon` (variant default, 20px) + `label` (body-xs medium uppercase)
- Derecha: `value` (heading-xs) + `subValue` (body-xs) + `trendIconName` (Icon active)
- Fondo `--color-bg-secondary`, `border-radius: --radius-xl`

**PerformanceWidgetVertical** — widget métrica vertical:
- Fila superior: `Icon` (default, 20px) + `label` (body-xs medium uppercase) + chevron derecha
- `graph?: ReactNode` — slot opcional para gráficas (InlineWidget + InlineGraph); tiene `margin: --spacing-8 0`
- `description` — párrafo body-xs secondary, clamped a 3 líneas

**Donut** — gráfica de arco SVG animada:
- Arco de 300° que arranca a las 7 en punto (rotación 120°)
- `value` + `maxValue` determinan el fill; `label` (body-xs secondary) + `unit` (body-xs secondary) debajo del número grande
- Animación al montar: fill del arco con easeOut + contador numérico estilo tragaperras (1200ms)
- Ancho fijo 375px, padding `--spacing-32 --spacing-40`; span fantasma invisible bajo el número para centrado correcto

**InlineWidget** — wrapper slot neutro para gráficas dentro de widgets (fondo `--color-bg-secondary`, `border-radius: --radius-xl`, padding `--spacing-12`). `overflow: visible` crítico para que el pulse ring no se recorte.

**InlineGraph** — componente público que envuelve BarEvolution o LineChart según `type`:
- `type: 'bar'` → BarEvolution · `type: 'line'` → LineChart
- Props comunes: `data`, `comparisonData?`, `color?`
- Bar extra: `unit?` · Line: sin extras
- `comparisonData` muestra una segunda serie en `--color-content-secondary` (barras) / `--color-content-disabled` (línea)

**BarEvolution** — gráfica de barras de 7 días (implementación interna de InlineGraph):
- Props: `data: BarDay[]` · `comparisonData?: BarDay[]` · `barColor` · `unit`
- `BarDay`: `{ day, date, value?, isToday? }`
- Barras animadas con `barGrowShake` (con shake) para sunday, `barGrow` (sin shake) para comparison
- Partículas en el tip durante el crecimiento + explosión de confetti multicolor al acabar
- Valor flotante (`position: absolute; bottom: calc(100% + 2px)`) sobre la barra sunday
- Columna seleccionada: fondo `--color-bg-secondary`; sin selección por defecto

**LineChart** — gráfica de línea de 7 días (implementación interna de InlineGraph):
- Props: `data: LineChartDay[]` · `comparisonData?: LineChartDay[]` · `color?`
- `LineChartDay`: `{ day, date?, value }`
- `CHART_HEIGHT = 110px`, animación por `stroke-dashoffset` con easing easeInOutQuad (1600ms)
- Shake durante el dibujo aplicado solo al `<g>` de la línea (no al SVG entero — dividers no vibran)
- Partículas de color en el punto activo durante la animación
- Escala Y compartida entre línea principal y comparativa
- Comparativa se anima en el mismo RAF loop, sin shake ni partículas, en `--color-content-disabled`
- Después de la animación: dot sólido + ring fijo (stroke primary-reversed, 4px) + pulse ring animado (sunday)
- Sin selección por defecto; click en columna activa fondo `--color-bg-button-secondary` + tooltip

**Rings** — tres anillos concéntricos animados con métricas a los lados:
- Geometría: `R_OUTER=85`, `R_MIDDLE=74`, `R_INNER=63`, `STROKE=7`, `GAP=4`, `SIZE=184px`
- Colores: externo `--color-content-sunday` · medio `--color-content-success` · interno `--color-content-info`
- Props `RingMetric`: `value?` (0–100), `displayValue?`, `prefix?`, `suffix?`, `label?: React.ReactNode`, `icon?`
- `label` acepta `React.ReactNode` — permite estructuras multi-nivel con iconos (ej. Google icon + "5★" / "reviews")
- Animación al montar: arcos + contadores numéricos con easeOut (1200ms)
- Layout: stat izquierda (outer/sunday) | SVG central | stats derecha (middle + inner apilados)

**Tips** — arco semicircular animado con cantidad de propinas:
- Semicírculo (mitad superior) SVG: `R=130`, `STROKE=14`, `SVG_W=300`
- El arco se llena con `--color-content-sunday` al montar, animado con easeOut (1200ms)
- Props: `label?` (default `'Your tips'`) · `value?` (entero animado) · `percentage?` (0–100, fill del arco) · `prefix?` (default `'$'`) · `cents?` (default `'.00'`)
- Tipografía: label en body-m (16px medium) · amount en `--type-heading-xxxl` (~72px) con prefix/cents en heading-xs alineados al baseline
- Fondo `--color-bg-primary` (blanco) · texto jalado hacia arriba con `margin-top: calc(-1 * var(--spacing-96))` para entrar en el espacio del arco
- Requiere barrel `index.ts` en su carpeta para resolución por Rollup

**Advice** — tarjeta de consejo IA:
- Borde gradiente AI usando `::before` + `mask-composite: exclude` (1px, `--radius-xl`)
- Fila superior: `Icon` en 40px + `SectionHeader level="p1"` (title + body)
- `backgroundImage?: string` — URL de imagen opcional en el fondo (padding-box)
- Padding top `--spacing-64`, lados `--spacing-12`, bottom `--spacing-16`

**Shift** — bloque de turno:
- `pills?: ShiftPillProps[]` (0, 1 o 2) en el centro
- `day?: string` — día mostrado inline con `startTime` entre corchetes, ej. `[Sun] 18:00`
- `barFill?: number` (0–100, default 100) — porcentaje de relleno de la barra sunday
- Layout: `barra | pills | times` (de izquierda a derecha, space-between)
- **Barra** (leftmost, 3px × 32px, `--radius-full`): track gris (`--color-stroke-divider`) con fill sunday (`--color-content-sunday`) que crece desde abajo — track con `overflow: hidden` + fill `position: absolute; bottom: 0`
- `startTime` + `endTime` a la derecha (body-xs medium secondary, right-aligned)

**ShiftPill** — pill de turno individual:
- `variant`: `'tips'` | `'reviews'` · `value: number`
- Tips: fondo `--color-bg-success`, muestra `$value.00` · Reviews: fondo `--color-bg-info`, muestra `value ★`
- `--radius-md`, padding `--spacing-8 --spacing-12`

**PerformanceWidgetSquare** — widget métrico cuadrado 160px de alto:
- `iconName` (IconName, 16px, variant default) + `label` (body-xs medium uppercase secondary) con gap 4px
- `value` (heading-m, primary) con margin-top 16px
- `description?` (body-xs regular primary, clamped 2 líneas) anclada al fondo via flex spacer
- Padding: 12px vertical, 16px horizontal · `--color-bg-secondary` · `--radius-xl`
- Se usa siempre en grid 2 columnas con gap 8px

**ValueDot** — indicador de métrica compacto con contador animado:
- Props: `label` · `value: number` · `unit?` (default `%`) · `variant`
- `variant`: `sunday` (`--color-content-sunday`) | `non-sunday` (`--color-content-secondary`)
- Usa `currentColor` internamente — variant cambia todos los elementos
- Al montar: contador animado de 0 → value con easeOutCubic (1000ms)
- **Soporte de decimales:** si `value % 1 !== 0` usa `parseFloat(raw.toFixed(1))` en el RAF y `.toFixed(1)` en el render (ej. 22.5 → "22.5%", no "23%")
- Al acabar la animación en variant `sunday`: explosión de partículas desde el centro del número
- Para partículas: medir posición real con `getBoundingClientRect()` relativo al wrapper
- `display`: `single` (solo sunday) | `comparison` (sunday + non-sunday lado a lado, 50% cada uno)

**Input** — campo de texto con floating label:
- Props: extiende `HTMLInputAttributes` · `placeholder?` (actúa como floating label)
- Default: borde `--color-stroke-default`, fondo transparente
- Focus: borde `--color-stroke-focus`, fondo `--color-bg-button-secondary`
- Floating label: en reposo centrado verticalmente (body-m, disabled), en focus/con valor sube a top-8px (body-xs, primary/secondary)
- Truco CSS: input tiene `placeholder=" "` (espacio); `:not(:placeholder-shown)` mantiene el label arriba cuando hay valor
- `forwardRef` para compatibilidad con formularios

---

### Componentes de prototipo (`prototype-components/`)
Viven en `design-system/src/prototype-components/` — **no se exportan** desde `src/index.ts`.
En el explorer aparecen bajo la sección **Prototype**.

- **PushNotification** — `appName`, `appIcon` (ReactNode), `time`, `title`, `body`, `onClick`
- **OSTopBar** — `color` (default `var(--color-content-primary)`); muestra hora "9:41" a la izquierda y batería/wifi/señal a la derecha con SVGs `fill="currentColor"`. Se integra automáticamente en `Header`.
- **Icon** — `name` (IconName), `size` (default 24), `color` (default currentColor)

### Iconos (`icons/`)
SVGs en `design-system/icons/*.svg`. Se descubren automáticamente vía `import.meta.glob`.
- Explorer (Assets > Icons): grid con preview, buscador, click para copiar nombre
- En prototipos: `<Icon name="arrow-right" size={20} />`
- Los SVGs deben usar `currentColor` en fill/stroke

---

### Explorer NAV actual
- **Tokens:** Typography · Colors · Elevation · Spacing
- **Components:** Button · Alert · Action Sheet · Divider · Tag · Segmented Control · Section Header · Thumbnail · NavBar · Feedback · Image · Cell · ActionButton · Header · Performance Widget Horizontal · Performance Widget Vertical · AI-Advice · Shift · Shift Pill · Performance Widget Square · Input
- **Data graphs:** Donut · Inline Graph · Value Dot · Tips · Rings
- **Prototype:** Push notification · OS Top Bar
- **Assets:** Images · Icons

---

### Regla 6 — Páginas de componentes en el explorer usan siempre Playground
Toda página de componente en el explorer **debe usar el componente `Playground`** (`explorer/src/components/Playground/`):
- Canvas blanco centrado donde vive la preview del componente
- Barra de controles encima con `select` y/o `toggle` para todas las props relevantes
- Nunca una página custom con su propio layout de controles

Si el componente necesita un contenedor especial en la preview (e.g. frame de móvil para componentes `fixed`), ese contenedor va **dentro** del canvas del Playground, no fuera.

Para añadir una página al explorer:
1. Crear `explorer/src/pages/MiPagina.tsx` + `.module.css`
2. Usar siempre `<Playground title="" description="" controls={[...]}>` como wrapper
3. Importar y añadir al array `NAV` en `explorer/src/App.tsx`

**Tipo de controles disponibles en Playground:**
```ts
type ControlDef =
  | { type: 'select'; label: string; options: string[]; value: string; onChange: (v: string) => void }
  | { type: 'toggle'; label: string; value: boolean; onChange: (v: boolean) => void };
```

---

### Técnica de borde con gradiente (Advice / AI border)
Para bordes con gradiente + border-radius no usar `border` (no soporta gradientes). Usar `::before` con `mask-composite`:

```css
.component {
  position: relative;
  border-radius: var(--radius-xl);
}
.component::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* grosor del borde */
  background: linear-gradient(135deg, #f0968a 0%, #d46ec8 55%, #9b5fe0 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## prototypes/

**Stack:** React + Vite + React Router v6 + TypeScript
**Importa tokens** de `../../design-system/src/tokens/tokens.css` (path relativo en `main.tsx`)
**Importa componentes** via `@mi-org/design-system` (dependencia `file:../design-system`)

### Arrancar
```bash
cd prototypes
npm run dev   # → http://localhost:5173
```

### Estructura src/
```
src/
├── main.tsx              # Importa tokens.css + global.css + monta app
├── global.css            # @font-face (HelveticaNeueLTStd-Roman.otf) + reset
├── prototypes.ts         # Array PROTOTYPES con todos los entries
├── pages/
│   ├── Index.tsx         # Página distribuidora (lista de prototipos)
│   └── Index.module.css
├── components/
│   ├── MobileShell/      # Silueta iPhone + panel info derecho
│   └── BranchControl/    # Segmented control vertical para branches/flujos
└── flows/
    └── onboarding/       # Primer prototipo: Splash → Login → Home
```

### Página distribuidora (Index)
- Título: **"SFS Prototypes"**, 220px, `font-weight-medium`, `letter-spacing: -0.07em`, color blanco
- Nav Q2/Q3: chips pill — activa en blanco con texto negro, inactiva en `#1a1a1a`
- Filtros: selects de Status / Market / For
- Cards: status badge + nombre en `--type-heading-xxl` Regular
- Status badges: rosa `#ff7eb3` sobre fondo `#2e1a1a` con borde `#5a2d3a` — igual para los 3 estados

### Añadir un nuevo prototipo
1. Añadir entry en `src/prototypes.ts`:
   ```ts
   {
     key: 'mi-prototipo',
     name: 'Nombre visible',
     description: 'Descripción corta.',
     path: '/mi-prototipo',
     screens: 4,
     quarter: 'Q2·2026',
     status: 'Discovery',       // 'Discovery' | 'Aligning' | 'Ready to dev'
     market: ['Francia'],        // 'Francia' | 'US'
     for: ['Managers'],          // 'Managers' | 'Servers'
     notionUrl: '',
     prdUrl: '',
     info: '',
   }
   ```
2. Crear `src/flows/mi-prototipo/index.tsx` — usar `MobileShell` con `prototype` + `resetPath`
3. Añadir ruta en `src/App.tsx` (React Router)

### MobileShell
Layout: `80px | 1fr | 280px` (o `120px | 1fr | 280px` si hay branches)
- **Izquierda:** flecha ← + `BranchControl` opcional (gris oscuro, vertical)
- **Centro:** silueta iPhone (zoom 0.8) con notch, status bar, screen scrollable, home indicator
- **Derecha:** panel con nombre, status badge, Notion link, Link to PRD (siempre visible), info text, Reset Prototype (texto centrado)
- **Móvil (<480px):** shell desaparece, contenido full screen

Props opcionales para branches:
```tsx
<MobileShell
  prototype={proto}
  resetPath="/mi-prototipo"
  branches={['Default', 'After login', 'Error state']}
  activeBranch={branch}
  onBranchChange={setBranch}
>
```

---

## Reglas de diseño

### Regla 10 — Jerarquía de layout: Section › Bloc › Item
Toda pantalla de prototipo organiza su contenido en tres niveles anidados:

```
Section
  └─ SectionHeader (opcional)      ← category / h3 / etc.
  └─ Bloc                          ← 16px gap desde header o desde bloc anterior
       └─ Item                     ← 8px gap entre items del mismo bloc
       └─ Item
  └─ Bloc                          ← 16px gap desde el bloc anterior
       └─ Item
```

**Reglas de espaciado:**
- **Entre SectionHeader y primer Bloc:** `var(--spacing-16)` (16px)
- **Entre Blocs dentro de un Section:** `var(--spacing-16)` (16px)
- **Entre Items dentro de un Bloc:** `var(--spacing-8)` (8px)

**CSS base:**
```css
/* Section: gap 16px gestiona header→bloc y bloc→bloc */
.section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-16);
}

/* Bloc: gap 8px gestiona item→item */
.bloc {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-8);
}

/* Item: ocupa el ancho completo */
.item {
  width: 100%;
}
```

Esta regla se aplica dentro de cada Section de pantalla. Las Sections entre sí tienen `var(--spacing-32)` (Regla 9).

Ver documentación visual en el explorer: **Tokens › Layout**.

---

### Regla 1 — Usar siempre el Design System
Todo lo que se diseñe o desarrolle debe usar tipografía, colores y componentes del DS:
- **Tipografía:** usar siempre `--type-heading-*` / `--type-body-*` / `--type-button-*`
- **Colores:** usar siempre `--color-bg-*` / `--color-content-*` / `--color-stroke-*` / `--color-overlay-*`. Nunca hex hardcodeado en componentes del DS.
- **Componentes:** antes de crear cualquier UI, comprobar si ya existe en `design-system/src/components/`. Si no existe, **preguntar al usuario** si crearlo como componente nuevo del DS.

### Regla 2 — Escala de espaciado fija
Todo `margin`, `padding`, `gap` debe ser uno de estos valores (via token CSS):

| Token | Valor | | Token | Valor |
|---|---|---|---|---|
| `--spacing-4` | 4px | | `--spacing-56` | 56px |
| `--spacing-8` | 8px | | `--spacing-64` | 64px |
| `--spacing-12` | 12px | | `--spacing-72` | 72px |
| `--spacing-16` | 16px | | `--spacing-80` | 80px |
| `--spacing-20` | 20px | | `--spacing-88` | 88px |
| `--spacing-24` | 24px | | `--spacing-96` | 96px |
| `--spacing-32` | 32px | | `--spacing-104` | 104px |
| `--spacing-40` | 40px | | `--spacing-120` | 120px |
| `--spacing-48` | 48px | | | |

No usar valores arbitrarios. Si no cabe en la escala, elegir el más cercano.

### Regla 3 — Elevación (sombras)
Usar siempre uno de estos 3 tokens — nunca `box-shadow` con valores personalizados:

| Token | Descripción | Valor |
|---|---|---|
| `--elevation-100` | Sutil | `0 2px 8px 0 rgb(0 0 0 / 0.04)` |
| `--elevation-200` | Media | `0 4px 24px 0 rgb(0 0 0 / 0.08)` |
| `--elevation-300` | Pronunciada | `0 2px 8px 0 rgb(0 0 0 / 0.04), 0 12px 40px 0 rgb(0 0 0 / 0.12)` |

### Regla 4 — Assets por prototipo
Imágenes en `design-system/assets/{prototipo}/`, iconos SVG en `design-system/icons/`.
Ambos se descubren automáticamente en el explorer. Subir antes de usar en prototipos.

### Regla 5 — Composición: usar siempre componentes del DS
Cuando un componente de UI contiene dentro otro elemento que ya existe como componente en el design system, **debe usar ese componente — nunca reimplementarlo**.

Ejemplos:
- Un `ActionSheet` con botones → usar `<Button>`, nunca un `<button>` propio.
- Un `Modal` con un botón de cierre → usar `<Button variant="tertiary">`, no un `<button>`.
- Un componente con icono → usar `<IconContainer>`, no un `<span>` ad-hoc.

Esto aplica a todos los entornos: componentes de producción, prototype-components y prototipos.

### Regla 6 — Páginas de componentes en el explorer usan siempre Playground
(Ver sección Playground arriba)

### Regla 7 — Color de iconos
Los iconos tienen dos estados base, controlados con la prop `variant` del componente `Icon`:

| Estado | Prop | Color |
|---|---|---|
| Default | `variant="default"` | `--color-content-secondary` |
| Active | `variant="active"` | `--color-content-primary` |

**Excepción:** cuando el icono forma parte de un componente con estado semántico (success, error, warning, info) o sobre un fondo de color (sunday, overlay…), usar `color="var(--color-content-success)"` / `color="var(--color-content-primary-reversed)"` etc. directamente — no `variant`. El `Icon` aplica el color como inline style en su propio `<span>`, por lo que **ninguna regla CSS del componente padre puede sobreescribirlo** — el color siempre debe pasarse explícitamente al Icon.

Nunca usar colores hardcodeados en iconos. Si no se pasa ni `variant` ni `color`, hereda `currentColor` del contenedor.

### Regla 9 — Layout de pantallas en prototipos
Toda pantalla de prototipo sigue este layout base obligatorio:

- **Márgenes laterales:** `padding: 0 var(--spacing-16)` — siempre 16px a cada lado.
- **Componentes a ancho completo:** todos los componentes dentro de la pantalla tienen `width: 100%` y se ajustan al ancho disponible (375px − 32px = 343px útiles).
- **Secciones apiladas en vertical:** el contenido se organiza en secciones (`<section>`) que se apilan en columna con `gap` entre ellas usando tokens de espaciado.

Estructura CSS base de una pantalla:
```css
.screen {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background: /* color o gradiente */;
  padding: 0 var(--spacing-16);
  box-sizing: border-box;
  gap: var(--spacing-24); /* o el espaciado entre secciones que corresponda */
}
```

Cada sección dentro de la pantalla:
```css
.section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12); /* o el token que corresponda internamente */
  width: 100%;
}
```

El gap **entre secciones** es siempre `var(--spacing-32)` (32px). El gap **dentro de una sección** (entre sus elementos internos) es libre según el diseño.

Nunca usar márgenes laterales distintos a 16px. Nunca anchos fijos para componentes dentro de la pantalla.

---

### Regla 8 — NavBar en prototipos
Siempre que un prototipo tenga navegación entre secciones (tabs), **debe usar el componente `<NavBar>`** de `@mi-org/design-system`. Nunca crear una navegación inferior custom.

- Importar `NavBar` y `NavItem` desde `@mi-org/design-system`
- Definir los `NavItem[]` con `activeIconName` + `defaultIconName` de la librería de iconos
- Gestionar `activeKey` con `useState` en el componente raíz del prototipo
- El mercado (US/FR) determina qué items se muestran (ver `NavBarPage.tsx` como referencia)

---

## Convenciones técnicas

- **CSS Modules** en todo. Sin Tailwind, sin styled-components.
- **Tokens CSS** siempre con variables, nunca hex hardcodeado en el DS.
- **No JS para tipografía fluida** — usar `max()` / `clamp()` en CSS.
- Prototipos en fondo negro `#000000`.
- Los headers del explorer (tokens + componentes) usan `--type-heading-xl` medium + `--type-body-m` para la descripción.
- Las páginas de componentes usan el componente `Playground` (canvas blanco + controles interactivos).
- SVGs de iconos siempre con `fill="currentColor"` y `stroke="currentColor"` — nunca `fill="black"` hardcodeado.
- Para bordes con gradiente + border-radius: usar `::before` + `mask-composite: exclude` (ver técnica documentada arriba).
- **Partículas con posición correcta:** usar `getBoundingClientRect()` relativo al wrapper para calcular coordenadas — nunca `offsetLeft/offsetTop` en contextos flex ni `top/left: 50%` en spans inline.
- **Floating label inputs:** usar `placeholder=" "` (espacio) en el input real + label absolutamente posicionado; CSS `:not(:placeholder-shown)` mantiene el label arriba cuando hay valor sin necesidad de JS.

---

## Pendiente

- [ ] Confirmar códigos hex exactos de los colores semánticos con Figma (marcados ⚠ en `tokens.css`)
- [ ] Añadir iconos reales al slot `icon` del componente Alert
- [ ] Rellenar `notionUrl`, `prdUrl` e `info` en cada prototipo de `prototypes.ts`
- [ ] Construir los flujos de los 5 prototipos: Email invitation, Manager's challenges, Server's challenges, Homepage, Send rewards to your bank
