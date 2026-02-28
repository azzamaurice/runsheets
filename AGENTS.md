# Project Requirements

## Node & Package Manager

- Node.js 22.22.0
- Yarn 4.12.0 (use `corepack enable` for easy setup)

## Dependencies

- **Vue 3** - UI framework
- **Tailwind CSS v4** - Styling via @tailwindcss/vite
- **shadcn-vue** - UI component library (Button, Input, Label). Components live in `src/components/ui/`
- **class-variance-authority (cva)** - Required for conditional classes
- **html2canvas-pro** - PNG export functionality (supports modern CSS color spaces)
- **axios** - HTTP client for API calls
- **@phosphor-icons/vue** - Icon library
- **floating-vue** - Dropdown/popover component
- **lodash** - Utility library (NOT lodash-es). Use `import { map, filter, find } from 'lodash'`
- **@vueuse/core** - Utility functions
- **@tanstack/vue-query** - Data fetching with caching and persistence (persisted to localStorage)

## shadcn-vue Components

### Button (`src/components/ui/button/`)

- `intent`: `primary` (default) | `secondary`
- `variant`: `default` | `outline` | `subtle` | `text`
- `icon`: boolean — enforces square 40px style
- Fixed height: 40px (`h-10`)
- Focus ring: 4px, 60% opacity

### Input (`src/components/ui/input/`)

- `intent`: `default` | `danger`
- Fixed height: 40px (`h-10`)
- Focus ring: 4px, 60% opacity

### Label (`src/components/ui/label/`)

- Standard label component

## Theming

- CSS variables defined in `src/style.css` under `:root`
- Core vars: `--background`, `--foreground`, `--primary`, `--secondary`, `--danger`
- No shadcn `destructive` — use `danger` everywhere
- No custom `--radius-*` vars — use native Tailwind `rounded-*` classes

## Code Quality

- **Prettier** - Code formatting (4-space for JS/Vue/HTML, 2-space for JSON)
- **ESLint** - Linting with Vue 3 and TypeScript support
- **Husky** - Git hooks (pre-commit runs lint-staged)
- **lint-staged** - Runs linters on staged files

## Patterns & Conventions

- **Shared state via composables** — components must NOT use props/emits for shared app state. Use composables (e.g. `useRunsheet`, `usePalette`) and call them directly inside components
- **cva for ALL conditional classes** — never use inline ternaries (`:class="x ? 'a' : 'b'"`) for styling. Always define a `cva` function with named variants instead
- **`size-` for equal dimensions** — always use `size-N` instead of `w-N h-N` when width and height are the same value
- **No inline CSS** — never use `style=` attribute for styling. Always use Tailwind classes (including arbitrary values like `bg-[color-mix(...)]`)
- **Arrow functions only** — no `function` declarations anywhere
- **No inferred types** — all variables, parameters and return types must be explicitly typed
- **Named interfaces over inline object types** — never use inline object types (e.g. `{ label: string; value: string }`). Always extract them into a named `interface` in `src/types/`. The only exception is Vue's `defineProps`/`defineEmits` compiler macros
- **Grouped exports at end of file** — never use `export` inline on declarations (e.g. `export const`, `export interface`). Instead, declare without `export` and add a single `export { ... }` (or `export type { ... }`) block at the end of the file. Re-exports like `export { default as Button } from './Button.vue'` in barrel files are exempt
- **Lodash everywhere** — always use lodash utility methods instead of native JS equivalents (e.g. `map` over `Array.map`, `filter` over `Array.filter`, `find` over `Array.find`, `cloneDeep` over structuredClone, `debounce` over custom debounce, etc.). Always use named imports: `import { map, filter, find } from 'lodash'`
- **Lodash chain for multiple operations** — when applying 2+ lodash methods in sequence on the same data, always use `chain(data).method1().method2().value()` instead of nesting calls or intermediate variables. Import chain as `import { chain } from 'lodash'`

## Commands

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Check code style
yarn lint:fix # Fix linting issues
yarn format   # Format with Prettier
```

## Print & Export

- Use Tailwind `print:` modifier to control what shows when printing
- PNG export uses html2canvas on the output ref
