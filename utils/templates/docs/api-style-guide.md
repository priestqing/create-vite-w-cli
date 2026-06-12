# API Style Guide

## API Modules

- Put API request modules in `src/apis`.
- Group API files by business domain.
- Keep request functions small and typed.
- Do not put UI logic in API modules.

## Types

- Define request and response types for public API functions.
- Do not use `any`.
- Shared API types should live in `src/types` or a nearby `types.ts` file.
- If API type declarations exceed 50 lines, move them into a dedicated type file.

## Naming

- API functions use camelCase.
- Function names should describe the operation: `getUserList`, `createOrder`, `updateProfile`.
- Response interfaces may use `I` + PascalCase, such as `IUserListResponse`.

## Error Handling

- Keep common error handling in the request wrapper.
- Business-specific errors should be handled close to the feature that understands them.
- Avoid swallowing errors silently.
- Avoid direct `console.log`; generated projects treat console usage as a warning.

## Request Wrapper

- Reuse the project request utility.
- Do not create another HTTP client unless there is a clear reason.
- Keep base URL, token injection, and response normalization centralized.