## setup

credentials:
- forontend-repo : make sure the `.env`, look at the `.env.example`
- backend-repo : add `service_account.json`at root of  `backend-repo`

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `backend-repo`: an [Express](https://expressjs.com/) server
- `forontend-repo`: a [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/entities`: shared entities
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
