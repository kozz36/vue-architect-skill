---
name: vue-architect
description: "Trigger: Vue 3, Nuxt 4, Vite, PrimeVue, Pinia, Vue testing, accessibility. Make Vue-specific architecture decisions."
license: Apache-2.0
metadata:
  author: kozz36
  version: "3.0"
---

## Activation Contract

Use this skill for vue architecture decisions when the agent must choose, review, or document production-ready technical direction.

- Working in an existing Vue 3, Nuxt, Vite, or PrimeVue project.
- Choosing Vue rendering, state, network, testing, accessibility, or build-tool patterns.
- Reviewing Vue architecture for SSR complexity, state boundaries, or agent maintainability.

Do not use this skill for generic explanation, copy editing, or one-off code changes that do not affect architecture or reusable implementation patterns.

## Hard Rules

- Use Vue-native conventions first: Composition API, script setup, composables, and explicit ownership boundaries.
- Do not enable SSR for internal dashboards unless SEO, sharing, or server data constraints justify it.
- Split Pinia client state from server-state libraries; avoid global stores for cache ownership.
- Treat Tailwind and PrimeVue layer order as an integration contract.
- Keep the main answer decision-first; move deep rationale to local references instead of long inline prose.
- Verify new version/API claims before adding them to changelogs or decision guidance.

## Decision Gates

| Need | Action |
|------|--------|
| Public Vue app | Nuxt SSR/SSG when SEO or route-level server behavior matters. |
| Admin/dashboard | Vite SPA unless there is a concrete SSR requirement. |
| Remote data | Use TanStack Query/Pinia Colada style server-state ownership. |
| PrimeVue + Tailwind | Define CSS layer order before component work starts. |

## Execution Steps

1. Identify product constraints, team skill, runtime, data ownership, security boundary, and validation path.
2. Select the smallest architecture that satisfies those constraints.
3. Read `references/technical-reference.md` when detailed matrices, anti-patterns, commands, or source links are needed.
4. State the chosen pattern, rejected alternatives, and what breaks at runtime if the choice is wrong.
5. Add or update changelog entries only for verified technical changes.

## Output Contract

Return:
- Recommended decision and why.
- Alternatives rejected with concrete tradeoffs.
- Runtime risks, failure triggers, and mitigation.
- Validation steps or evidence needed before adoption.

## References

- `references/technical-reference.md` — curated technical basis for v3.0 decisions.
- `references/source-index.md` — source links and verification status for version-sensitive claims.
