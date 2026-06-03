# Sunday — Design System + Prototypes

## Estructura del repositorio

```
sunday/
├── design-system/   # Librería de componentes (@mi-org/design-system)
└── prototypes/      # App de prototipos navegables
```

---

## Despliegue (Vercel)

Dos proyectos independientes en el mismo repo de GitHub. Cada push despliega ambos automáticamente.

| Proyecto | URL | Qué sirve |
|---|---|---|
| `sunday` | https://sunday-pi.vercel.app | Design System Explorer |
| `sunday-prototypes` | https://sunday-prototypes.vercel.app | App de prototipos |

**Build config:**
- Explorer: `buildCommand: cd design-system && npm install && npm run build:explorer` / `outputDirectory: design-system/dist-explorer` / `rootDirectory: null` (repo root)
- Prototypes: `buildCommand: npm install && npx vite build` / `outputDirectory: dist` / `rootDirectory: "prototypes"`

El Explorer sigue sin `vercel.json`. El proyecto Prototypes tiene `rootDirectory: "prototypes"`, lo que hace que `prototypes/vercel.json` aplique **solo** a ese proyecto. Ese archivo contiene el rewrite SPA (`/* → /index.html`) necesario para React Router.

El build de prototipos NO necesita compilar el design-system previamente — Vite resuelve los imports directamente desde el source via aliases en `prototypes/vite.config.ts`.

Para gestionar los proyectos Vercel desde CLI:
```bash
# Cambiar proyecto activo (editar .vercel/project.json)
# Explorer: projectId prj_ZLjGOIyew6k2htTRpUgzdK3y9yNO
# Prototypes: projectId prj_iDMeyVARBpPxvAlnPG7pDKy53zAN
# orgId: team_bMMRzIwPl2RfRJ7mPKhHsqBC
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
│   │   ├── DatePickerStrip/
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

**Button** — `variant`: primary | secondary | ghost · `size`: large | small · `icon` (leading ReactNode) · `loading` · forwarded ref

**Alert** — `variant`: warning | error | info | success · `title` (required) · `subtitle` · `icon` (ReactNode, slot) · `action: { label, onClick }` · `onClose`

**ActionSheet** — modal bottom sheet con lista de acciones

**Divider** — separador horizontal, `variant`: simple | large

**Tag** — `variant`: default | success | error | warning | info

**SegmentedControl** — tabs horizontales con estado activo · `options: [string, string] | [string, string, string] | [string, string, string, string]` · `value` · `onChange` — pasar siempre con `as [string, string]` para evitar error de inferencia TS

**SectionHeader** — `level`: hero | h1 | h2 | h3 | p1 | category · `align`: left | center · `subtitle?` · `thumbnail?: ThumbnailProps` · `action?: { label, variant, onClick }`
- `category`: body-xs medium uppercase, `--color-content-secondary` — para títulos de sección tipo etiqueta (12px emphasized). Siempre en mayúsculas vía `text-transform: uppercase`.
- `thumbnail` se renderiza encima del texto (útil para estados validados con icono check)
- `action` con `withAction` pone el botón en la misma fila (flex row) — para botón debajo del texto, renderizarlo aparte

**Thumbnail** — `variant`: image | icon · `size`: sm | md

**NavBar** — `items: NavItem[]` · `activeKey` · `onSelect` · `embedded?: boolean`
- `embedded={true}`: cambia `position: fixed` a `position: relative` — **obligatorio** dentro de prototipos con MobileShell para que quede dentro del teléfono y no escape al viewport del navegador

**Feedback** — pantalla de feedback completa · `action: { label, onClick }`

**Image** — imagen con aspect ratio fijo

**Cell** — fila de lista interactiva:
- `title` · `subtitle?` · `thumbnail?` · `trailingTitle?` · `trailingSubtitle?` · `chevron?` · `checkable?` · `onClick?` · `onCheck?`
- `checkable`: añade checkbox circular a la izquierda. Al marcar: strikethrough animado de izquierda a derecha (sólo sobre el texto, no toda la celda) + explosión de 160 partículas de confetti repartidas por toda la celda
- `onCheck`: callback llamado una vez cuando el checkbox pasa de desmarcado a marcado (para lifting state al padre)
- `onClick`: navega o abre algo — se dispara al clickar el cuerpo de la celda (no el checkbox)
- Sin padding horizontal (0) — el padding lateral lo gestiona el contenedor padre
- Partículas: 40% desde el checkbox (velocidad alta), 60% esparcidas por el ancho de la celda (splatter)

**ActionButton** — botón circular con icono + label debajo

**Header** — cabecera de pantalla con dos variantes:
- `variant="inner"`: OSTopBar encima + `title` centrado + `onBack` (chevron izquierda) + `rightActions?: HeaderAction[]`
- `variant="main"`: OSTopBar encima + `leftButton: { label, icon, onClick? }` + `sundayAction` + `initialsAction`
- Para ocultar el gradiente rosa del Header main solo en un prototipo concreto (sin tocar el DS): usar CSS override `:global(img[aria-hidden="true"]) { display: none }` en el módulo CSS de la pantalla

**DatePickerStrip** — selector de días horizontal (componente de producción, exportado desde index.ts):
- Props: `days: DayItem[]` · `selectedIndex?` · `onSelect?` · `theme?: 'dark' | 'light'`
- `DayItem`: `{ label: string, number: number, completed: boolean }`
- `theme="light"`: fondo transparente, días completados con check verde, seleccionado con número destacado, divider inferior
- `theme="dark"`: fondo transparente, días completados con check azul/dorado

**PerformanceWidgetHorizontal** — widget métrica horizontal

**PerformanceWidgetVertical** — widget métrica vertical con slot `graph?: ReactNode`

**Donut** — gráfica de arco SVG animada (300°, arranca a las 7)

**InlineWidget** — wrapper slot neutro para gráficas (`overflow: visible` crítico)

**InlineGraph** — envuelve BarEvolution (`type='bar'`) o LineChart (`type='line'`)

**Rings** — tres anillos concéntricos animados

**Tips** — arco semicircular animado con propinas

**Advice** — tarjeta IA con borde gradiente

**Shift** + **ShiftPill** — bloque de turno con pills de tips/reviews

**PerformanceWidgetSquare** — widget cuadrado 160px

**ValueDot** — indicador métrico con contador animado y partículas

**Input** — campo de texto con floating label (`placeholder=" "` + `:not(:placeholder-shown)`)

---

### Componentes de prototipo (`prototype-components/`)
Viven en `design-system/src/prototype-components/` — **no se exportan** desde `src/index.ts`.

- **PushNotification** — `appName`, `appIcon` (ReactNode), `time`, `title`, `body`, `onClick`
- **OSTopBar** — `color` (default `var(--color-content-primary)`). Se integra automáticamente en `Header`. Usar directamente para superponer sobre imágenes hero en pantallas sin Header.
- **Icon** — `name` (IconName), `size` (default 24), `color` (default currentColor)
- **Background** — decoración SVG de fondo. `width`, `height`, `className`, `style`. Usar con `position: absolute; top: 0; z-index: 0` para el fondo de pantallas principales.

### Iconos (`icons/`)
SVGs en `design-system/icons/*.svg`. Se descubren automáticamente vía `import.meta.glob`.
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
  padding: 1px;
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

**Vite config crítica** (`prototypes/vite.config.ts`) — aliases para que Vite resuelva el DS desde source (no desde dist/):
```ts
resolve: {
  alias: {
    '@mi-org/design-system/tokens.css': resolve(__dirname, '../design-system/src/tokens/tokens.css'),
    '@mi-org/design-system': resolve(__dirname, '../design-system/src/index.ts'),
  },
}
```
El orden importa — el alias más específico (`/tokens.css`) debe ir primero.

### Arrancar
```bash
cd prototypes
npm run dev   # → http://localhost:5174
```

### Estructura src/
```
src/
├── main.tsx              # Importa tokens.css + global.css + monta app
├── global.css            # @font-face (HelveticaNeueLTStd-Roman.otf) + reset
├── prototypes.ts         # Array PROTOTYPES con todos los entries
├── pages/
│   ├── Index.tsx         # Página distribuidora (lista de prototipos + link al DS Explorer)
│   └── Index.module.css
├── components/
│   ├── MobileShell/      # Silueta iPhone + panel info derecho
│   └── BranchControl/    # Segmented control vertical para branches/flujos
└── flows/
    ├── onboarding/       # Prototipo: Splash → Login → Home
    ├── homepage/         # Prototipo: Homepage
    ├── end-of-service/   # Prototipo: End of service (flujo completo)
    ├── weekend-bets/     # Prototipo: Weekend Bets — social betting game para servidores
    └── microgoals/       # Prototipo: Microgoals — quests y recompensas para camareros
```

### Assets públicos de prototipos
Las imágenes de cada prototipo que se referencian como rutas públicas (`/assets/...`) van en:
```
prototypes/public/assets/{prototipo}/
```
(NO en `design-system/assets/` — eso es para assets importados en el DS, no para imágenes de prototipos.)

Ejemplo: `prototypes/public/assets/microgoals/mascot.png` → accesible como `/assets/microgoals/mascot.png`

### Flujos existentes

**`end-of-service/`** — Flujo completo de fin de servicio:
- `PushScreen` — pantalla de bloqueo con notificación push que aparece a los 900ms
- `SummaryScreen` — pantalla principal con:
  - Header main (sin gradiente via CSS override)
  - DatePickerStrip light con días de la semana
  - Vista de día actual: tareas con Cell checkable + chevron
  - Vista de día anterior validado: SectionHeader h2 con thumbnail check + "This day was validated" + "It has 4 comments" + botón "See details"
  - Drawer de comentarios (3 comentarios del equipo + input)
  - Drawer de selector de versión del prototipo (V0/V1/V2)
  - Celebración cuando ambas tareas están marcadas: overlay verde con check SVG animado + 110 partículas de confetti → transición a estado validado
- `ReviewFiguresScreen` — pantalla "Revenues":
  - SegmentedControl "By tender / By server"
  - SectionHeader hero "$1.000 / Total" + dos h2 "$800/Sales" y "$200/Tips"
  - Botón flotante "Validate the figures" → abre drawer con formulario de comentario + "Confirm" (navega back)
- `LeaveCommentScreen` — pantalla interior de comentario

**`weekend-bets/`** — Social betting game (Servers):
Juego de apuestas ligero: cada viernes los camareros apuestan a cuál compañero ganará una categoría playful durante el fin de semana (ej. "highest tip %"). Resultados el domingo por la noche + $5 si aciertan.

- `data.ts` — 9 teammates con nombre completo (ej. "Jake Turner"), emoji, color, lista de betters (solo nombres de pila: "Hélène", "Felix"…). `WINNER_ID = 3` (Jake Turner, finalValue 36.3%). Valores base ~24–28%, valores finales ~27–36%.
- `WeekendBetsContext.ts` — contexto React: `phase` (friday|live|simulating|result), `activeTab` (bet|live|history), funciones reset/placeBet/startSimulation/jumpToSunday
- `index.tsx` — provider del contexto + MobileShell. `startSimulation` aplica valores finales instantáneamente y pasa a phase `simulating` (sin animación de intervalo)
- `screens/LockScreen.tsx` — Primera pantalla:
  - Fondo gradiente púrpura oscuro, solo el AppIcon centrado con badge "1" (tappable)
  - Al tapear: el wallpaper desaparece revelando LiveScreen detrás; el drawer sube encima con scrim oscuro
  - **Drawer** (fondo `#000`): 🪙 + pregunta centrada en blanco + "Results drop Sunday night 🌙"
  - 9 tarjetas: fondo `rgba(255,255,255,0.07)` + border-radius 12px, selector circular gris → blanco con ✓ al seleccionar, no-seleccionados bajan a opacity 0.4
  - Betters: "Hélène, Felix +2 placed their bet" (nombres de pila únicamente)
  - Botón "Place Bet" blanco (`#ffffff`) forzado con `!important`
  - Confetti burst 28 pcs al confirmar → transición a LiveScreen vía context
- `screens/LiveScreen.tsx` — Standings:
  - Header main "Reset demo" sin gradiente rosa (override `img[aria-hidden="true"] { display: none }`)
  - LIVE badge + SectionHeader h1 poll question + meta Saturday 7:14 PM
  - **Podium visual top 3**: 3 tarjetas en fila (2º izquierda · 1º centro más alta · 3º derecha). Gradientes: dorado `#F9EDB5→#EDCC6A` (1º), plateado `#DDE5EF→#BFCEE0` (2º), cobre `#F5DCC0→#DEBB98` (3º). Sin avatar. Número de posición grande y muy sutil en el fondo (`rgba` opacidad ~0.08). Badge "Your pick" si el usuario apostó a alguien del top 3.
  - **Tabla 4º–9º** debajo: filas con Divider DS, rank | nombre + "Your pick" badge | avatares solapados de betters (max 3 + "+N") | tip %. Helper `nameToColor(name)` para color determinístico.
  - Botón "▶ Simulate weekend" → phase `simulating`
- `screens/SundayNightScreen.tsx` — Lock screen nocturna:
  - Fondo `#080612`, OSTopBar blanco, tiempo 10:47 / Sunday, June 8
  - PushNotification desliza a los 800ms: "🏆 You were right! Take your $5 reward" (siempre, para demo)
  - Cuerpo: "[Winner] got the highest tip — 36% ($68.00)"
  - Botón "Jump to Sunday 🌙" → phase `result`
- `screens/ResultOverlay.tsx` — Resultado:
  - Win: fondo gradiente púrpura, "You were right! / Enjoy your $5 reward", winner card sin emoji (nombre izquierda, "36.3% tip / $244 tip" derecha en blanco), social proof row centrado (3 avatares + "Hélène, Brett and +12 won their bet!"), 280 partículas confetti
  - Lose: fondo `#0d0d12`, "So close!", misma winner card, "New bets drop every Friday" sin fondo
  - Ambos estados: botón "See results" blanco (ancho completo) + "Replay demo" ghost blanco al fondo

**Patterns aprendidos en Weekend Bets:**
- **App icon como entry point**: `AppIcon size={96} badge={1}` centrado sobre wallpaper, sin notificación card
- **Drawer con app como fondo**: al abrir el drawer, el wallpaper desaparece; dentro del `drawerOverlay` se renderiza `<LiveScreen />` en un `div.livePreview` (position absolute, isolation: isolate) + `div.drawerScrim` con gradiente negro muy oscuro en la parte superior para tapar el header
- **Isolation para contener z-index**: `isolation: isolate` en `.livePreview` evita que el Header del DS escape hacia arriba del overlay
- **Tokens CSS vs hex en contexto oscuro**: `var(--color-bg-primary)` y `var(--color-content-primary)` pueden resolver a colores claros. Para fondos y textos en componentes propios del prototipo, usar siempre hex explícito (`#000`, `#ffffff`, `rgba(255,255,255,0.x)`)
- **Botón "invertido" sobre fondo oscuro**: `button { background: #ffffff !important; color: #111111 !important; border-color: #ffffff !important }` sobre el wrapper del CTA
- **Selector circular en dark theme**: border `rgba(255,255,255,0.25)` vacío → `background: #ffffff; color: #111` al seleccionar
- **Avatares solapados**: `margin-left: -6px` + `zIndex` decreciente + `border: 1.5px solid #ffffff`; primer elemento sin margin-left
- **Betters con apellidos**: los teammates tienen nombre completo en `name` (ej. "Marcus Lambert"); los `betters[]` son solo nombres de pila (sin apellido)
- **SundayNightScreen como fase intermedia**: `phase = 'simulating'` → LiveScreen devuelve `<SundayNightScreen />` antes de ResultOverlay. Permite mostrar lock screen nocturna sin nuevas rutas
- **Resultado siempre "ganador" en notificación**: la PushNotification de SundayNightScreen muestra siempre el mensaje de victoria para un demo más impactante; el win/lose real se diferencia en ResultOverlay
- **Podium con gradientes pastel sobre fondo oscuro**: las tarjetas del podium usan colores pastel claros (dorado/plateado/cobre) que contrastan bien sobre el fondo blanco de la LiveScreen. Sin avatares — solo nombre + porcentaje + número de posición muy sutil en el fondo. La tarjeta del 1º es más alta (`min-height` mayor). Orden visual: 2º izquierda, 1º centro, 3º derecha.

**`microgoals/`** — Quests y micro-objetivos para camareros (Servers):
- `MicrogoalsContext.ts` — contexto React con `completed: Set<number>`, `markComplete(id)`, `resetAll()`
- `index.tsx` — provider del contexto + MobileShell + Routes
- `screens/MicrogoalsScreen.tsx` — pantalla principal:
  - Header main con "Reset prototype" (llama `resetAll`)
  - Background component absoluto al fondo
  - Arco SVG de progreso 240° (r=200) con `stroke-dashoffset` animado en color `--color-content-sunday`
  - Mascota PNG (`/assets/microgoals/mascot.png`) detrás del arco (z-index 0), arc SVG encima (z-index 1)
  - Crop de mascota con `clip-path: inset(5px 0 5px 0)` para eliminar borde blanco del PNG
  - Lista de 5 quests: tarjetas con icono gris/negro, badge $5 rosa, chevron en todas
  - Quest completada: check verde, título tachado en negro, badge $5 tachado
  - Botón flotante "🏆 Emulate a win" → lock screen → push notification → confetti + salto mascota
  - 420 partículas de confetti en dos capas: burst radial desde centro (120 pcs) + lluvia desde arriba (300 pcs)
  - Mascota salta con `@keyframes mascotJump` (translateY + scale + rotate, 0.85s)
- `screens/GuestCheckingScreen.tsx` — pantalla interior Quest 1:
  - Sin Header DS — imagen hero full-bleed desde arriba (380px)
  - OSTopBar blanco superpuesto + botón back circular semitransparente con blur
  - Pill "You'll win $5" en rosa sunday + SectionHeader h1 con descripción corta
  - Botón "How to present the QR to Guests" (placeholder, sin acción)
  - Animación de entrada: `slideInRight` 0.28s
- `screens/WeeklyQuizScreen.tsx` — pantalla interior Quest 4:
  - Quiz de 3 preguntas con feedback inmediato (verde/rojo) + resultado final

**Patterns aprendidos en Microgoals:**
- **Pantalla light-theme sobre DS dark**: usar colores hex específicos para el prototipo, ignorar tokens de bg (que son oscuros)
- **Arco SVG animado**: usar `strokeDasharray={ARC_LENGTH}` + `strokeDashoffset={ARC_LENGTH - progress}` con `transition` en CSS. Mucho más limpio que animar `strokeDasharray`.
- **Mascota detrás del arc ring**: mascotWrap con `z-index: 0`, arcSvg con `z-index: 1`. El trazo del arco se renderiza encima de la imagen.
- **Lock screen emulation**: overlay `position: absolute; inset: 0; z-index: 10` con gradiente oscuro, OSTopBar blanco, y PushNotification que desliza con clase CSS aplicada con `setTimeout`.
- **Shared state entre pantallas**: usar React Context en `index.tsx` del flow, no useState en cada pantalla.
- **Hero image sin header**: quitar el Header DS y usar `position: relative` en el contenedor de imagen, con OSTopBar + back button superpuestos como `position: absolute`.

**Navigación en prototipos:** usar siempre rutas absolutas para evitar ambigüedad en contextos con `<Routes>` anidadas dentro de MobileShell:
```tsx
// ✓ Correcto
navigate('/end-of-service/review-figures')
// ✗ Evitar — puede resolver incorrectamente con zoom:0.8 del phone
navigate('review-figures')
```

### Página distribuidora (Index)
- Título: **"SFS Prototypes"**, 220px, `font-weight-medium`, `letter-spacing: -0.07em`, color blanco
- Filtros: selects de Status / Market / For
- Cards: status badge + nombre en `--type-heading-xxl` Regular
- Status badges: rosa `#ff7eb3` sobre fondo `#2e1a1a` con borde `#5a2d3a`
- Tarjeta "Design System Explorer" (tag azul "Tool") que abre https://sunday-pi.vercel.app

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
- **Centro:** silueta iPhone (`zoom: 0.8`) con notch, screen scrollable (`position: relative; overflow-y: auto`)
- **Móvil (<480px):** shell desaparece, contenido full screen

Pantallas interiores deben usar `position: absolute; inset: 0; display: flex; flex-direction: column` para llenar exactamente el área del teléfono:
```css
.screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
}
.scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}
.bottom {
  flex-shrink: 0; /* pega el NavBar al fondo */
}
```

---

## Reglas de diseño

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

### Regla 3 — Elevación (sombras)

| Token | Descripción | Valor |
|---|---|---|
| `--elevation-100` | Sutil | `0 2px 8px 0 rgb(0 0 0 / 0.04)` |
| `--elevation-200` | Media | `0 4px 24px 0 rgb(0 0 0 / 0.08)` |
| `--elevation-300` | Pronunciada | `0 2px 8px 0 rgb(0 0 0 / 0.04), 0 12px 40px 0 rgb(0 0 0 / 0.12)` |

### Regla 4 — Assets por prototipo
Imágenes en `design-system/assets/{prototipo}/`, iconos SVG en `design-system/icons/`.

### Regla 5 — Composición: usar siempre componentes del DS
Nunca reimplementar un elemento que ya existe como componente en el DS.

### Regla 6 — Páginas del explorer usan siempre Playground
(Ver sección Playground arriba)

### Regla 7 — Color de iconos

| Estado | Prop | Color |
|---|---|---|
| Default | `variant="default"` | `--color-content-secondary` |
| Active | `variant="active"` | `--color-content-primary` |

Para contextos semánticos usar `color="var(--color-content-success)"` etc. directamente. El color en Icon es inline style — no puede sobreescribirse desde CSS del padre.

### Regla 8 — NavBar en prototipos
Usar siempre `<NavBar embedded>` de `@mi-org/design-system`. El prop `embedded` es obligatorio dentro de MobileShell.

### Regla 9 — Layout de pantallas en prototipos
- Márgenes laterales: `padding: 0 var(--spacing-16)` siempre
- Gap entre secciones: `var(--spacing-32)`

### Regla 10 — Jerarquía de layout: Section › Bloc › Item
```
Section (gap 16px)
  └─ SectionHeader (opcional)
  └─ Bloc (gap 8px entre items)
       └─ Item
  └─ Bloc
       └─ Item
```

---

## Convenciones técnicas

- **CSS Modules** en todo. Sin Tailwind, sin styled-components.
- **Tokens CSS** siempre con variables, nunca hex hardcodeado en el DS.
- Prototipos en fondo negro `#000000`.
- SVGs de iconos siempre con `fill="currentColor"` — nunca `fill="black"` hardcodeado.
- Para bordes con gradiente + border-radius: usar `::before` + `mask-composite: exclude`.
- **Partículas con posición correcta:** usar `getBoundingClientRect()` relativo al wrapper.
- **TypeScript falsos positivos en prototipos:** `npx tsc` en prototipos puede dar errores porque resuelve `@mi-org/design-system` a `dist/` (tipos viejos), mientras que Vite usa source. Son falsos positivos — el runtime funciona correctamente. No usar `tsc` como paso de build en prototipos.
- **Floating label inputs:** usar `placeholder=" "` (espacio) + label absolutamente posicionado; `:not(:placeholder-shown)` mantiene el label arriba.

---

## Pendiente

- [ ] Confirmar códigos hex exactos de los colores semánticos con Figma (marcados ⚠ en `tokens.css`)
- [ ] Añadir iconos reales al slot `icon` del componente Alert
- [ ] Rellenar `notionUrl`, `prdUrl` e `info` en cada prototipo de `prototypes.ts`
- [ ] Construir los flujos restantes: Email invitation, Manager's challenges, Server's challenges, Send rewards to your bank
- [ ] End-of-service V1 y V2 (actualmente solo V0 — The Green Olive)
- [ ] Weekend Bets: agregar History tab (actualmente solo Lock + Live + Result)
- [ ] Weekend Bets: múltiples polls/rondas y navegación entre ellas
- [ ] Microgoals: definir contenido real de la pantalla interior "Get your first guest checking their bill" (actualmente placeholder)
- [ ] Microgoals: añadir más quests interactivas (actualmente solo Quest 1 y Quiz tienen pantalla interior)
