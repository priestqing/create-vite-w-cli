# Agent Instructions

## Scope

- These rules apply to the entire project unless a closer `AGENTS.md` overrides them.
- Before changing code, read the relevant docs:
    - General code: `docs/conventions.md`
    - Architecture or module boundaries: `docs/architecture.md`
    - UI, Vue components, or styles: `docs/ui-style-guide.md`
    - API modules or shared types: `docs/api-style-guide.md`

## Hard Rules

- Use UTF-8, 4-space indentation, single quotes, and no TS/JS semicolons.
- Write code comments in Chinese.
- Do not use TypeScript `any`.
- Prefer Tailwind CSS when suitable.
- Vue files must use PascalCase, stay under 1500 lines, and follow this block order: `<script setup lang="ts">`, `<template>`, `<style scoped lang="scss">`.
- Style nesting depth must not exceed 3 levels.
- Do not duplicate TypeScript interfaces or types; reuse or move shared types to the related `src/apis/*.types.ts` file.
- Keep component-local types only when they are purely UI-specific and not reused elsewhere.
- Do not create `src/types` unless the user explicitly requests a cross-domain type directory.
- Do not proactively run git diff, build, tests, eslint, or stylelint unless explicitly requested or necessary.