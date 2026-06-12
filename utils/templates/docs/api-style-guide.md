# API Style Guide

## API Modules

- Put API request modules in `src/apis`.
- Group API files by business domain.
- Keep request functions small and typed.
- Do not put UI logic in API modules.
- Reuse the project request utility instead of creating another HTTP client.

## API File Structure

- Use one API module per business domain when practical.
- Use `src/apis/user.ts` for user request functions.
- Use `src/apis/user.types.ts` for user domain, request, and response types.
- Use `src/apis/order.ts` and `src/apis/order.types.ts` for order-related APIs and types.
- Keep API modules focused on request construction, response typing, and request utility usage.

## Type Ownership

- API modules must reuse existing domain types instead of redeclaring them.
- Domain entity types, request params, and response types should live near the related API module.
- Prefer `src/apis/*.types.ts` for API-related shared types.
- If an API response returns a user entity, reuse `IUser` from `src/apis/user.types.ts` when it already exists.
- Do not define another `IUser` in `src/apis/user.ts` or a Vue component if `IUser` already exists in `src/apis/user.types.ts`.
- Component-local types should not duplicate API/domain entity types.
- If a type is used by UI, API, stores, or composables, keep a single exported definition in the related `src/apis/*.types.ts` file.
- Do not create `src/types` unless the user explicitly requests a cross-domain type directory.

## Type Naming

- Interfaces use `I` + PascalCase, such as `IUser`, `IUserListParams`, `IUserListResponse`.
- Type aliases use PascalCase, such as `UserStatus`.
- API request function names use camelCase.
- Function names should describe the operation: `getUserList`, `createOrder`, `updateProfile`.

## Error Handling

- Keep common error handling in the request wrapper.
- Business-specific errors should be handled close to the feature that understands them.
- Avoid swallowing errors silently.
- Avoid direct `console.log`; generated projects treat console usage as a warning.

## Request Wrapper

- Reuse the project request utility.
- Keep base URL, token injection, and response normalization centralized.
- Do not create another request wrapper unless there is a clear project-level reason.