# UI Style Guide

## Vue Components

- Use `<script setup lang="ts">`.
- Vue block order:
    1. `<script setup lang="ts">`
    2. `<template>`
    3. `<style scoped lang="scss">`
- Use typed `defineProps` and `defineEmits`.
- Keep component responsibilities narrow.
- Extract child components when template logic becomes hard to scan.

## Tailwind

- Prefer Tailwind utilities for layout, spacing, typography, color, flex/grid, and responsive states.
- Use SCSS only when Tailwind is not expressive enough or when styling third-party components.
- Avoid duplicating the same long Tailwind class group repeatedly; extract a component when repetition appears.

## SCSS / Stylelint

- Class names must be lowercase and hyphenated.
- Do not use ID selectors.
- Nesting depth must not exceed 3 levels.
- Avoid deep selector coupling to component internals.
- Use scoped styles for component-specific styles.
- Shared global styles should stay in the project’s global style entry.

## Component Naming

- Component files use PascalCase.
- Component names should describe domain meaning, not layout only.
- Prefer clear names like `UserTable.vue`, `OrderForm.vue`, `SearchPanel.vue`.