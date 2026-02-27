# Runsheets

A Vue 3 + TypeScript application built with Vite and Tailwind CSS v4.

## Requirements

- **Node.js** 22.22.0
- **Yarn** 4.12.0

It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.

## Getting Started

```bash
# Enable corepack (for Yarn 4.x)
corepack enable

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Code Quality

This project uses:

- **Prettier** - Code formatting (4-space indent for JS/Vue/HTML, 2-space for JSON)
- **ESLint** - Linting with Vue 3 and TypeScript support
- **Husky** - Git hooks (pre-commit runs lint-staged)
- **lint-staged** - Runs linters on staged files

### Commands

```bash
# Check code style
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format
```

## Project Structure

```
src/
  App.vue       # Root component
  main.ts       # Application entry
  style.css     # Global styles (Tailwind)
```

## IDE Setup

Recommended: VSCode with these extensions:

- Vue - Official Vue.js extension
- Prettier - Code formatter
- ESLint - Linter
