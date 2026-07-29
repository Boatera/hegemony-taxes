# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page PWA that calculates tax payments for a round of the board game **Hegemony: Lead Your Class to Victory**. Players enter their board state (population, businesses, income) and the current government policy settings, and the app derives what each of the three classes (Working, Middle, Capitalist) owes. There is no backend — all state lives in the browser via `localStorage`. Deployed to GitHub Pages at `/hegemony-taxes/` (note the non-root `base` in `vite.config.ts`).

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # type-check (vue-tsc) + vite build, in parallel
npm run test:unit    # vitest (watch mode); append a path/name to scope it
npm run lint         # eslint --fix over .vue/.ts/etc.
npm run format       # prettier --write src/
npm run type-check   # vue-tsc --build --force only
```

There are currently **no test files** despite vitest being configured (`vitest.config.ts`, jsdom env). Add specs as `*.spec.ts` next to the code under test. Run a single file with `npx vitest run src/stores/policies.spec.ts` or filter by name with `-t`.

Deployment is automatic: pushing to `main` triggers `.github/workflows/publish.yml` (VuePagesAction) which builds and publishes to Pages. Do not commit `dist/`.

## Architecture

**Stack:** Vue 3 (`<script setup>`, Composition API) + Pinia + vue-i18n + vueuse. Sass for component styles. `@` aliases `src/`.

The game rules live entirely in **three Pinia stores** and the class components — this is the part worth understanding before changing behavior:

-   `src/stores/classes.ts` — the player's board inputs (population, businesses, income). Pure state.
-   `src/stores/policies.ts` — the government policy tracks (`fiscal`, `labor`, `tax`, `health`, `education`) **and the derived tax math**. `taxMultiplier` and `incomeTax` are computed here from lookup tables / formulas encoded directly in the store. This is the canonical source for income-tax and multiplier rules.
-   `src/stores/settings.ts` — UI/app preferences (language, formula visibility, IMF automation toggle). Default language is auto-detected from `navigator.languages` against `supportedLocales`.

Every store is persisted with vueuse `useStorage` under dotted keys (e.g. `policies.tax`, `classes.population`) — changing a key breaks existing users' saved state. Each store exposes a `$reset()`; the settings bar calls all three to reset the app.

Stores follow a two-function convention: `useXStore()` (the raw Pinia store) plus a `getXStore()` helper that returns `{ store, ...storeToRefs(store) }` so components can destructure reactive refs. Prefer `getXStore()` in components.

**Corporate tax** is the exception — its lookup table (`corporateTaxTable`) and `getCorporateTax()` live inside `src/components/CapitalistClass.vue`, not a store. If touching tax logic, check both the policy store and this component.

**IMF mode** (`$imf`, `imfLabor`, `imfActive`, `imfRelevant` in the policy store) models the game's IMF intervention: it snapshots/overrides the labor policy and, when `settings.setImfPolicies` is on, forces a specific policy configuration. `imfRelevant` drives the warning indicators shown in the class components when the effective labor value diverges from the player's own.

**Components** (`src/components/`) are presentational; the three `*Class.vue` files each read the stores, compute their class's liability, and render it through the shared `TaxFormula` layout. `NumberInput`, `TaxFormula`, and `vardis` (VardisIcon — the in-game currency symbol) are **registered globally** in `src/main.ts`, so they appear in templates without imports.

## i18n

Translations are plain TS objects in `src/translation/{en,de,es}.ts`; `index.ts` builds `messages` and derives `supportedLocales` from its keys. **Adding a locale = add the file, import it in `index.ts`, and add `public/icons/flag-<code>.svg`** (the settings bar renders a flag per available locale). `en` is the fallback; keep the key structure identical across all locale files.

## Conventions

-   4-space indent, single quotes, semicolons, no trailing commas enforced — see `.prettierrc.json`; run `npm run format` before committing.
-   `__APP_VERSION__`, `__APP_REPO__`, `__APP_URL__` are Vite `define` globals injected from `package.json` (declared in `env.d.ts`). Bump `version` in `package.json` for release-visible changes.
