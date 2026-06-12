# Architecture

## Directory Responsibilities

- `src/components`: reusable UI components.
- `src/pages` or `src/views`: route-level pages.
- `src/router`: route definitions and navigation guards.
- `src/store`: Pinia stores and persisted state.
- `src/apis`: API modules grouped by business domain.
- `src/utils`: framework-independent utilities.
- `src/hooks` or `src/composables`: reusable composition logic.
- `src/types`: shared TypeScript types.
- `src/assets`: static assets.

## Module Boundaries

- Pages may compose components, stores, APIs, and hooks.
- Components should avoid direct API calls unless they are strongly domain-specific.
- API modules should not depend on Vue components.
- Utilities should not depend on Vue runtime unless they are placed in composables/hooks.
- Shared business state should live in Pinia stores.

## Change Principles

- Prefer small, local changes.
- Follow existing project structure before adding new folders.
- Do not introduce new architecture patterns without clear need.
- Extract reusable logic only after duplication or complexity is visible.