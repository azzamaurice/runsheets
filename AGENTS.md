# Project Requirements

## Node & Package Manager

- Node.js 22.22.0
- Yarn 4.12.0 (use `corepack enable` for easy setup)

## Dependencies

- **Vue 3** - UI framework
- **Tailwind CSS v4** - Styling via @tailwindcss/vite
- **class-variance-authority (cva)** - Required for conditional classes
- **html2canvas** - PNG export functionality
- **axios** - HTTP client for API calls
- **@phosphor-icons/vue** - Icon library
- **floating-vue** - Dropdown/popover component
- **@vueuse/core** - Utility functions
- **@tanstack/vue-query** - Data fetching with caching and persistence

## Code Quality

- **Prettier** - Code formatting (4-space for JS/Vue/HTML, 2-space for JSON)
- **ESLint** - Linting with Vue 3 and TypeScript support
- **Husky** - Git hooks (pre-commit runs lint-staged)
- **lint-staged** - Runs linters on staged files

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
