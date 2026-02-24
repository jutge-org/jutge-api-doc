# Jutge API Documentation

A comprehensive documentation site for the Jutge.org API, featuring an API client generator and an interactive playground.

## Project Overview

This repository contains two main parts:
1.  **Documentation Site (`/`):** A Next.js application that serves as the primary interface for Jutge API documentation. It fetches API definitions dynamically and renders them using MDX and custom components.
2.  **API Client Generator (`/jutge-api-clients`):** A specialized tool built with TypeScript and Bun that generates API clients for multiple programming languages (Python, TypeScript, Java, C++, JavaScript, and PHP).

### Core Technologies

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS 4, Radix UI, Framer Motion.
- **Documentation:** MDX, Shiki (for syntax highlighting via `@shikijs/rehype`).
- **Validation:** Valibot for environment variables and schema validation.
- **Client Generation:** TypeScript/Bun, Commander for CLI.

## Building and Running

### Main Documentation Site (Root)

- **Install dependencies:** `npm install` (or `bun install`)
- **Development server:** `npm run dev` (Runs on `localhost:3000`)
- **Build for production:** `npm run build`
- **Linting:** `npm run lint`

### API Client Generator (`/jutge-api-clients`)

- **Install dependencies:** `bun install`
- **Run all tests:** `bun run test-all` (Tests Python, TS, C++, JS, PHP, and Java clients)
- **Formatting:** `bun run format`

## Environment Variables

The project uses `valibot-env` for type-safe environment variables. Key variables include:

- `JUTGE_API_URL`: The base URL of the Jutge API.
- `JUTGE_API_CLIENTS_DIR`: Directory where generated clients are stored.

## Development Conventions

- **Architecture:** Follows the Next.js App Router pattern. UI components are located in `@/components/ui` (shadcn-style) and specialized components in `@/components/documentation`.
- **Styling:** Uses Tailwind CSS with a focus on dark mode support (via `next-themes`).
- **API Logic:** Centralized in `@/lib/api/` for fetching (`dir.ts`), searching (`search.ts`), and type definitions (`types.ts`).
- **Formatting:** Prettier is configured with `prettier-plugin-organize-imports`, 4-space indentation, and no semicolons.
- **Types:** Strict TypeScript is enforced. Path aliases (`@/*`) are used for clean imports.

## Project Structure

- `app/`: Next.js pages and layouts (Playground, Documentation, Clients, etc.).
- `components/`: Reusable React components.
- `jutge-api-clients/`: The core API client generator logic and multi-language tests.
- `lib/`: Utility functions and API integration logic.
- `public/code/`: Static code samples for different languages.
