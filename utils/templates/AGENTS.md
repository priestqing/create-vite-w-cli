# Agent Instructions

## Scope

- These rules apply to the entire project unless a closer `AGENTS.md` overrides them.
- Read project docs before changing related code:
    - `docs/conventions.md`
    - `docs/architecture.md`
    - `docs/ui-style-guide.md`
    - `docs/api-style-guide.md`

## Hard Rules

- Read and write files with UTF-8 encoding.
- Write code comments in Chinese.
- Use 4 spaces for indentation.
- Do not use semicolons in TS/JS.
- Use single quotes for strings.
- Do not use `any` in TypeScript.
- Prefer Tailwind CSS when suitable.
- Vue files use PascalCase and must not exceed 1500 lines.
- Vue block order must be `<script setup lang="ts">`, then `<template>`, then `<style scoped lang="scss">`.
- Style nesting depth must not exceed 3 levels.
- Do not proactively run git diff, build, tests, eslint, or stylelint unless explicitly requested or necessary.