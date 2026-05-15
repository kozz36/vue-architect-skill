# Vue Architecture Source Index

Source index for `../SKILL.md` and `technical-reference.md`.

## Verification Policy

- Do not add new version/API/security claims to `../SKILL.md`, `technical-reference.md`, or `../../../docs/CHANGELOG.md` without checking the live source.
- Record newly verified claims with date, source URL, and what was confirmed.
- Existing URLs below were extracted from the pre-v3 lite material and should be re-checked when used for new claims.

## Extracted Sources

| Source | URL | Verification Status |
|--------|-----|---------------------|
| medium.com | https://medium.com/@revanthkumarpatha/vue-js-in-2025-vue-js-roadmap-2026-a-clear-performance-first-future-0b3ddabd7b00 | Needs re-verification before new changelog claims. |
| primevue.org | https://primevue.org/tailwind/ | Needs re-verification before new changelog claims. |
| dev.to | https://dev.to/asmaa-almadhoun/why-fetch-can-be-safer-than-axios-after-the-2026-axios-hack-6n5 | Needs re-verification before new changelog claims. |
| vitest.dev | https://vitest.dev/guide/browser/ | Needs re-verification before new changelog claims. |
| commission.europa.eu | https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en | Needs re-verification before new changelog claims. |
| vuejs.org | https://vuejs.org/ | Needs re-verification before new changelog claims. |
| nuxt.com | https://nuxt.com/ | Needs re-verification before new changelog claims. |
| pinia-colada.esm.dev | https://pinia-colada.esm.dev/ | Needs re-verification before new changelog claims. |
| tanstack.com | https://tanstack.com/query/latest/docs/framework/vue/overview | Needs re-verification before new changelog claims. |
| github.com | https://github.com/unjs/ofetch | Needs re-verification before new changelog claims. |
| w3.org | https://www.w3.org/TR/WCAG22/ | Needs re-verification before new changelog claims. |

## New Verification Log

| Date | Claim | Source | Result |
|------|-------|--------|--------|
| 2026-05-15 | Vue stable is 3.5.34; Vue 3.6 beta.12/Vapor remains prerelease. | https://vuejs.org/about/releases and https://github.com/vuejs/core/releases/tag/v3.6.0-beta.12 | Confirmed. |
| 2026-05-15 | Vite 8.0.x is current supported major and ships Rolldown pipeline; Vite 6 should not be the new-project default. | https://vite.dev/releases and https://vite.dev/blog/announcing-vite8 | Updated guidance from Vite 6 to Vite 8. |
| 2026-05-15 | PrimeVue 4.5.5 current npm package; PrimeVue documents WCAG 2.1 AA guidance but open issues mean project-level a11y testing remains required. | https://www.npmjs.com/package/primevue and https://primevue.org/guides/accessibility/ | Confirmed with caveat. |
| 2026-05-15 | Pinia 3.0.4 and TanStack Query v5 are current validated state-management baselines. | https://www.npmjs.com/package/pinia and https://tanstack.com/query/v5/docs/framework | Confirmed. |
| 2026-05-15 | Axios malicious versions 1.14.1 and 0.30.4 with plain-crypto-js RAT were confirmed by axios postmortem and security vendors. | https://github.com/axios/axios/issues/10636 and https://securitylabs.datadoghq.com/articles/axios-npm-supply-chain-compromise | Confirmed. |
| 2026-05-15 | v3.0 restructuring only; no new technical/version claims added. | Local migration from `versions/v2.0-lite/SKILL.md` | Structural change only. |
