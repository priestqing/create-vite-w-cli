# Development Conventions

## Formatting

- Use 4 spaces for indentation.
- Use single quotes.
- Do not use semicolons.
- Prefer `const`; use `let` only when reassignment is required.
- Do not use `var`.
- Avoid unnecessary blank lines and unrelated formatting changes.
- Keep formatting changes limited to files that are part of the requested work.

## TypeScript

- Do not use `any`.
- Use explicit types for props, emits, API responses, stores, and shared state.
- Prefer `unknown` plus narrowing when a value is truly unknown.
- Keep type names meaningful and domain-oriented.
- Do not create duplicate interfaces or types with the same meaning.

## Type Ownership

- Domain entity types should live with the related API domain.
- Prefer `src/apis/*.types.ts` for shared domain, request, and response types.
- Example: user-related types should live in `src/apis/user.types.ts`.
- Component-local types are allowed only for UI-only state, display options, or local view models.
- If a component-local type is later needed by an API module, store, composable, or another component, move it to the related `src/apis/*.types.ts` file.
- Before creating a new type, search the related component, API module, store, composable, and `src/apis` for an existing equivalent type.
- After moving a type, update existing files to import the shared type instead of keeping local copies.
- Do not create `src/types` unless the user explicitly requests a cross-domain type directory.

## Naming

- Vue files use PascalCase: `UserProfile.vue`.
- TS/JS files use camelCase: `userProfile.ts`.
- API type files use camelCase plus `.types`: `user.types.ts`.
- Interface files may use `I` + PascalCase only when a standalone interface file is necessary: `IUserProfile.ts`.
- Interfaces may use `I` + PascalCase: `IUserProfile`.
- Class files may use PascalCase when they export or contain a class.
- Class methods use PascalCase.
- Folders use lowercase hyphenated names: `user-profile`.
- CSS/SCSS classes use lowercase hyphenated names: `user-card`.

## File Size

- Vue files must stay under 1500 lines.
- TS/JS files should stay focused and under 1500 lines.
- When files grow too large, extract components, composables, utilities, or type files.
- When type declarations exceed 50 lines, extract them into a related `.types.ts` file.