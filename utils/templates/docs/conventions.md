# Development Conventions

## Formatting

- Use 4 spaces for indentation.
- Use single quotes.
- Do not use semicolons.
- Prefer `const`; use `let` only when reassignment is required.
- Do not use `var`.
- Avoid unnecessary blank lines and unrelated formatting changes.

## TypeScript

- Do not use `any`.
- Use explicit types for props, emits, API responses, stores, and shared state.
- Move type declarations to a separate file when they exceed 50 lines.
- Shared types should live in `src/types`.
- Local-only types may stay near the component or module that uses them.

## Naming

- Vue files use PascalCase: `UserProfile.vue`.
- TS/JS files use camelCase: `userProfile.ts`.
- Interface files may use `I` + PascalCase: `IUserProfile.ts`.
- Interfaces may use `I` + PascalCase: `IUserProfile`.
- Class files may use PascalCase when they export or contain a class.
- Class methods use PascalCase.
- Folders use lowercase hyphenated names: `user-profile`.
- CSS/SCSS classes use lowercase hyphenated names: `user-card`.

## File Size

- Vue files must stay under 1500 lines.
- TS/JS files should stay focused and under 1500 lines.
- When files grow too large, extract components, composables, utilities, or type files.