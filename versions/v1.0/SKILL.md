---
name: vue-architect
description: >
  Vue-specialized architecture skill providing 2026 ecosystem expertise for projects
  already using Vue.js. Covers Vue 3.5+/Nuxt 4 toolchain, rendering (SPA/SSR/SSG/ISR/PPR),
  PrimeVue 4 + Tailwind 4, Pinia 3/Colada/TanStack Query, Vitest + Playwright testing,
  WCAG 2.2/EAA accessibility, AI-ready governance, ADRs, and green web.
  Trigger: When the project already uses Vue 3/Nuxt 4 and needs ecosystem-specific decisions
  — configuring PrimeVue/Tailwind, setting up Pinia/Colada, choosing rendering strategy
  within Vue, or writing Vue-specific ADRs.
license: Apache-2.0
metadata:
  author: kozz36
  version: "1.0"
---

## When to Use

- Starting a new Vue 3/Nuxt 4 project and need stack selection
- Configuring PrimeVue 4 + Tailwind 4 + CSS layers
- Designing state split between Pinia 3 (client) and server-state libraries
- Choosing rendering strategy (SPA, SSR, SSG, ISR, PPR) in the Vue ecosystem
- Establishing Vue-specific testing with Vitest + Playwright
- Making accessibility compliance decisions for EU-facing Vue apps
- Structuring a Vue codebase for AI agent consumption (Cursor, Claude Code)
- Writing ADRs for Vue architectural decisions

---

## 1. Vue Ecosystem & Core Evolution

### Market Reality (2026)

| Version | Status | Key Feature | Best For |
|---------|--------|-------------|----------|
| Vue 3.5 | Stable (LTS) | Stable reactivity, performance patches | Production apps, conservative teams |
| Vue 3.6 (beta) | Experimental | Vapor Mode (compiler-driven, no VDOM) | Performance-critical sub-trees |
| Nuxt 4 | Stable | Nitro engine, Layers, hybrid rendering | Full-stack Vue, SEO, edge deploy |

**Key 2026 fact**: VoidZero (led by Evan You, $4.6M seed) consolidates native Rust tooling.
Oxlint, Oxfmt, and Rolldown share a unified AST and resolver with Vite 6,
cutting cold-start dev-server times and CI build latencies logarithmically.

**Source**: https://medium.com/@revanthkumarpatha/vue-js-in-2025-vue-js-roadmap-2026-a-clear-performance-first-future-0b3ddabd7b00

### Decision Tree

```
Greenfield Vue project?
  YES → Vue 3.5+ (Composition API, <script setup> mandatory)
    Need SSR / file routing / API routes? → Nuxt 4
    SPA admin dashboard? → Vite 6 SPA
  NO → Legacy Vue 2 codebase
    Planning gradual migration? → Nuxt Bridge → Nuxt 4
    Stuck indefinitely? → Pinia 2 (compat), no new features
```

### Vapor Mode (Opt-in)

- Eliminates Virtual DOM for targeted sub-trees
- Compiles templates to native DOM mutation operations
- Reduces runtime bundle size and GC pressure
- Use for: high-frequency-update terminal components (data grids, live tickers)

```vue
<script setup>
import { shallowRef } from 'vue'
// Use shallowRef for large tabular data to avoid deep reactivity penalty
const rows = shallowRef([])
</script>
```

⚠️ Anti-pattern: Enabling Vapor Mode on an entire app without profiling first.
Vapor is opt-in per component in 2026; blanket adoption risks debugging pain.

---

## 2. Toolchain & Build Pipeline

### Vite 6 + Environment API

| Concern | Vite 6 Solution | Legacy Pitfall |
|---------|-----------------|----------------|
| SPA vs SSR config fragmentation | Environment API unifies module graphs | Separate vite.config / ssr config files |
| CSS minification | Lightning CSS (default in prod) | PostCSS-only pipeline |
| JSON serialization | Optimized JSON.stringify | Standard serialization |

Activate Lightning CSS:
```js
// vite.config.js
export default {
  css: { transformer: 'lightningcss' }
}
```

**Source**: https://vite.dev/blog/announcing-vite6

### Tailwind CSS 4

| Tailwind 3.x | Tailwind 4.0 |
|--------------|--------------|
| `tailwind.config.js` monolith | Tokens in CSS / TypeScript |
| `@tailwind base; @tailwind components;` | `@import "tailwindcss";` |
| Manual `@layer` config | Automated layer structure in compiler |

Install the Vite plugin:
```bash
npm i -D @tailwindcss/vite
```

**Source**: https://gearboxgo.com/articles/web-application-development/primevue-with-tailwind-40/

### Rolldown Integration

Rolldown (Rust bundler) is the next Vite production bundler.
- Single AST shared with dev server
- Faster builds, identical output semantics
- Drop-in: no config changes required when Vite adopts it

---

## 3. Rendering Strategy

### Vue-Only Decision Matrix

| Context | Decision | Rationale |
|---------|----------|-----------|
| Multi-tenant B2B app with SEO | Nuxt 4 SSR/SSG | Nitro engine, file-based routing, edge-ready |
| Internal admin dashboard | Vite 6 SPA | Zero SSR complexity, fast HMR |
| Real-time data portal | Nuxt 4 ISR/PPR | Hybrid edge rendering, stale-while-revalidate |
| Legacy Vue 2 migration | Nuxt Bridge → Nuxt 4 | Incremental adoption, shared composables |
| Content-heavy marketing site | Nuxt 4 SSG + islands | Minimal JS, static shell |

### Server-First Patterns

```
Mostly static content?        → SSG (Nuxt generate)
Dynamic personalized content? → SSR (Nuxt server routes)
Mix static + dynamic?         → ISR / PPR (revalidateTag, cacheLife)
No SEO, auth-gated?           → Vite SPA (PrimeVue admin)
```

⚠️ Anti-pattern: Running full SSR for an internal admin panel.
SSR adds hydration complexity with zero SEO benefit inside a VPN.

---

## 4. Design Systems

### PrimeVue 4 + Tailwind 4 CSS Layer Ordering

Required layer order (lowest → highest specificity):
```
theme < base < primevue < components < utilities
```

CSS entry file:
```css
@import "tailwindcss";
@plugin "tailwindcss-primeui";
```

PrimeVue initialization:
```js
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'

createApp(App)
  .use(PrimeVue, {
    cssLayer: { order: 'theme, base, primevue, components, utilities' }
  })
  .mount('#app')
```

**Source**: https://primevue.org/tailwind/

### Decision Tree

```
Need full brand control + headless primitives?
  → Ark UI (Vue) + Tailwind 4

Need fast delivery + native dark mode + DataTable/Charts?
  → PrimeVue 4 (Aura theme) + Tailwind 4 utilities

Building admin panels?
  → PrimeVue 4 + Tailwind 4 (standard 2026 stack)
```

### Design Tokens

Use CSS custom properties. Map to Tailwind 4 via CSS-native config.
Never hardcode values in components.

```css
:root {
  --color-primary: oklch(55% 0.2 250);
  --radius-md: 0.5rem;
  --spacing-base: 0.25rem;
}
```

⚠️ Anti-pattern: Hardcoding `bg-blue-500` directly in 47 components.
Centralize tokens; override via CSS variables for theming.

---

## 5. State Architecture

### Strict Separation

```
Server state (API data, caching, sync)
  → TanStack Query v5 (Vue Query)
  → Pinia Colada (~2kb, tree-shakable, built on Pinia)

Client/UI state (theme, sidebar, selected tab, wizard step)
  → Pinia 3 (official, DevTools, Composition API native)

Local component state
  → ref / reactive — escalate to Pinia only when shared across 3+ components
```

### Decision Rules

```
Is it server data?       → TanStack Query / Pinia Colada. Period.
Is it UI state global?   → Pinia 3
Is it UI state local?    → ref / reactive
Is it form state?        → VeeValidate + Zod
```

⚠️ Anti-pattern: Storing API response arrays inside Pinia 3.
```js
// Do NOT do this
const useBadStore = defineStore('bad', () => {
  const users = ref([]) // server data lives in the wrong layer
  async function fetchUsers() { users.value = await api.get('/users') }
  return { users, fetchUsers }
})
```
Migrate to:
```js
import { useQuery } from '@tanstack/vue-query'
const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
```

---

## 6. Network & Security

### HTTP Client Decision

| Client | Base | Size | Verdict 2026 |
|--------|------|------|--------------|
| ofetch | Fetch native | ~6kb | **Default** for Vue/Nuxt. Smart parsing, retries. |
| xior.js | Fetch native | ~3kb | Best for Axios-to-fetch migration |
| wretch | Fetch native | ~2kb | Fluent chain API |
| ky | Fetch native | ~5kb | Mature pioneer |
| **Axios** | XMLHttpRequest | ~13kb | **SHALL NOT use** — supply-chain compromised March 2026 |

**Source**: https://dev.to/asmaa-almadhoun/why-fetch-can-be-safer-than-axios-after-the-2026-axios-hack-6n5

### Axios Red Flag

⚠️ Anti-pattern: Adding `axios` to a new project's `package.json`.

On 31 March 2026, attackers compromised an Axios maintainer NPM account,
published malicious versions (1.14.1, 0.30.4) containing a post-install dropper
(`plain-crypto-js`) that installed a cross-platform RAT.

**Rule**: New Vue projects SHALL use `ofetch`.
Existing Axios code SHOULD migrate via `xior.js` (API-compatible clone).

### Security Checklist

```
□ No secrets in localStorage / sessionStorage / IndexedDB
□ Cookies: HttpOnly + Secure + SameSite=Strict
□ CSP header configured
□ npm audit in CI blocks on critical vulns
□ All admin routes server-gated (never client-side feature flags)
□ No sensitive data in URL params
```

---

## 7. Performance & Core Web Vitals

### 2026 Targets

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| LCP | ≤ 2.5s | 2.5-4.0s | > 4.0s |
| INP | ≤ 200ms | 200-500ms | > 500ms |
| CLS | ≤ 0.1 | 0.1-0.25 | > 0.25 |

### Vue-Specific Checklist

- Route-based code splitting (auto in Nuxt 4)
- Lazy load non-critical components: `defineAsyncComponent(() => import('./Heavy.vue'))`
- Image optimization: `nuxt/image` or `vite-imagetools`, WebP/AVIF
- Tree shake: named imports only, no side-effect barrel files
- Bundle analysis: `vite-bundle-visualizer`
- Use `shallowRef` for large data sets to avoid deep reactivity overhead

### PWA (Narrowed Use Cases)

- **Recommended**: Offline field tools, poor connectivity, mobile-first B2B
- **Tooling**: `vite-plugin-pwa`, Workbox
- **Skip**: Standard SaaS dashboards with good CDN

---

## 8. Testing Strategy

### Tool Assignment

| Layer | Tool | Notes |
|-------|------|-------|
| Unit + Component | Vitest 4 | Vite-native, fast, Vue test utils |
| E2E | Playwright | Critical paths, cross-browser |
| Visual regression | Vitest 4 Browser Mode | Component snapshots, pixelmatch |
| E2E visual diffs | Playwright snapshots | Full-page, deterministic rendering on Linux CI |

**Source**: https://vitest.dev/guide/browser/

### Admin Panel Testing Priorities

```
1. Data tables: filtering, sorting, pagination (Vitest component)
2. Forms: validation, submission, errors (Vitest + VeeValidate)
3. Auth flows: login, redirect, token expiry (Playwright E2E)
4. Critical CRUD paths (Playwright E2E)
5. Visual regression: dashboard layout, chart rendering (Vitest Browser Mode)
```

### Playwright Best Practices

- Isolated browser contexts per test (no shared state)
- Page Object Model for selectors
- Prefer `getByRole` and auto-waits over fixed timeouts
- Visual regression on Linux CI only (font subpixel differences across OS)

---

## 9. Accessibility

### Compliance Target

**WCAG 2.2 AA** is mandatory for EU-facing projects under the
European Accessibility Act (EAA), enforced since June 2025.
Non-compliance risks fines up to 5% of global revenue and product withdrawal.

**Source**: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en

### EAA Checklist for Vue Apps

| Criterion | Requirement | Vue/PrimeVue Action |
|-----------|-------------|---------------------|
| 2.4.11 Focus Not Obscured | Focus ring never hidden by sticky headers/modals | Use PrimeVue OverlayPanel/Dialog (managed z-index) |
| 2.5.8 Target Size | Clickable area ≥ 44×44px | PrimeVue components ship compliant sizing |
| 3.3.7 Redundant Entry | Don't make users re-enter data already provided | Use Pinia 3 to persist wizard state across steps |
| 3.3.8 Accessible Authentication | Offer WebAuthn / password-manager support | Implement WebAuthn flow, avoid cognitive password tests |

### ARIA Patterns

```
Tables          → role="grid", aria-sort, aria-rowcount, aria-colcount
Modals/Dialogs  → role="dialog", aria-modal="true", focus trap
Forms           → aria-required, aria-invalid, aria-describedby
Tabs            → role="tablist", role="tab", aria-selected, aria-controls
Dropdowns       → role="combobox", aria-expanded, aria-activedescendant
Alerts/Toasts   → role="alert", aria-live="polite"
```

**Rule**: Use PrimeVue 4 (pre-audited WCAG 2.1 AA) or Ark UI for ARIA primitives.
Do NOT build custom modals/dropdowns from scratch.

### Testing Tools

- axe-core (automated, integrates with Vitest/Playwright)
- NVDA / VoiceOver (manual testing mandatory for payment flows)

⚠️ Anti-pattern: Relying solely on automated a11y scans.
Automated tools catch only 30-40% of real barriers; manual testing is required
for legal defensibility (VPAT/ACR documentation).

---

## 10. AI-Ready Architecture

### Repository Governance Files

Every Vue repo consumed by AI agents MUST contain:
- `CLAUDE.md` or `.cursorrules` with project boundaries (stack, conventions, forbidden APIs)
- Composable-first architecture: all business logic externalized from SFCs
- `shallowRef` for large data sets in components

### SFC Rules for AI Agents

1. **`<script setup>` mandatory**: Required for static analysis and future Vapor Mode compatibility.
2. **Props down, Events up**: Explicit data flow prevents AI from inventing implicit state channels.
3. **Externalize logic**: Move orchestration, complex calculations, and side effects to typed composables (`useUserPermissions()`, `useDataSync()`).
4. **Keep components under token window**: Monolithic SFCs > context window degrade LLM reasoning.
5. **No deep `v-model` across layers**: Reserve two-way binding for atomic input components only.

### AI Agent Boundary Review

```
GIVEN an AI generates a new component
WHEN the skill audits it
THEN it MUST verify <script setup> is used
AND props/events flow follows "Props down, Events up"
AND complex logic is delegated to a composable
```

⚠️ Anti-pattern: "Freestyling" — letting an AI agent work without architectural boundaries.
Results in distributional convergence: generic components, inconsistent reactivity,
and accumulating tech debt.

---

## 11. Governance: ADRs

Every significant architectural turn must be documented immutably.

### ADR Template

```markdown
# ADR-042: [Title]

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## Context
[What problem forces this decision?]

## Decision Drivers
- [Factor 1: e.g. team Vue familiarity]
- [Factor 2: e.g. INP budget < 200ms]

## Decision
[Chosen approach]

## Alternatives Considered
| Option | Pros | Cons |
|--------|------|------|
| A | ... | ... |
| B | ... | ... |

## Consequences
### Positive
- [Benefit 1]

### Negative / Risks
- [Trade-off 1]
```

### ADR Rules

1. One ADR per decision (framework, state strategy, rendering, security boundary)
2. Status lifecycle: Proposed → Accepted → Deprecated (with superseding reference)
3. Store in `/docs/adr/` as Markdown — ingestible by RAG pipelines
4. Review in PRs: architecture-changing PRs MUST reference the relevant ADR
5. Do not delete ADRs; update status only

---

## 12. Green Web & DX

### Carbon Budget

- Target: ≤ 0.36g CO2/page view (global average)
- High-traffic platforms: every 0.01g reduction = metric tons saved monthly

### Optimization Checklist

| Technique | Impact |
|-----------|--------|
| WebP/AVIF images | Up to 70% visual asset weight reduction |
| Font subsetting | Load only glyphs used in your locale |
| Route-based code splitting | Conditional module loading |
| Vapor Mode (opt-in) | Reduced bundle + GC pressure |
| Green hosting audit | Verify 100% renewable (Green Web Foundation API) |

### DX Standards

- `strict: true` in `tsconfig.json` (mandatory for AI agents)
- `@typescript-eslint` + `eslint-plugin-vue`
- Monorepo: pnpm workspaces + Turborepo (small-mid) or Nx (large org)
- HMR: Vite 6 sub-50ms standard

---

## 13. Decision Framework

### Quick Vue Stack Selector

```
Given:
  Team size:     S (1-3) | M (4-10) | L (10+)
  Project type:  Admin | SaaS | Content | E-commerce
  SEO required:  Yes | No
  Performance:   Standard | Critical

Admin panel, any team, no SEO:
  → Vue 3.5 + Vite 6 + PrimeVue 4 + Pinia 3 + Pinia Colada + Vitest 4 + Playwright
  → Tailwind 4 + Lightning CSS

SaaS app, M/L team, mixed SEO:
  → Nuxt 4 + PrimeVue/Ark UI + Pinia Colada + Vitest 4 + Playwright

Content site, SEO critical:
  → Nuxt 4 SSG + ISR for dynamic sections

E-commerce, high performance, SEO:
  → Nuxt 4 ISR/PPR + Vapor Mode (critical components)

Enterprise, large team, strict governance:
  → Nuxt 4 + Nx monorepo + ADR docs/adr/ + WCAG 2.2 AA audit
```

### Red Flags to Avoid

- CSS-in-JS with SSR (runtime cost + hydration complexity) — use Tailwind 4
- Global Pinia stores holding server data — use Pinia Colada / TanStack Query
- Custom ARIA implementations without headless library — use PrimeVue 4 or Ark UI
- Skipping TypeScript on team projects > 3 months
- Webpack in new Vue projects — use Vite 6 or Rolldown
- Axios in new projects — use `ofetch`
- Storing JWT in localStorage — use HttpOnly Secure SameSite=Strict cookies
- No ADRs on projects with >2 developers
- Omitting a11y testing in CI (EAA legal risk in EU)

⚠️ Anti-pattern: Choosing a stack in isolation without team skill assessment.
Nuxt 4 for a Vue 2 team with no migration budget guarantees project failure.

---

## Resources

- **Vue RFCs & Roadmap**: https://github.com/vuejs/rfcs
- **Nuxt 4 Docs**: https://nuxt.com/
- **Vite 6 Announcement**: https://vite.dev/blog/announcing-vite6
- **Tailwind CSS 4**: https://tailwindcss.com/
- **PrimeVue 4 + Tailwind 4**: https://primevue.org/tailwind/
- **Pinia 3**: https://pinia.vuejs.org/
- **Pinia Colada**: https://pinia-colada.esm.dev/
- **TanStack Query Vue**: https://tanstack.com/query/latest/docs/framework/vue/overview
- **ofetch**: https://github.com/unjs/ofetch
- **Vitest Browser Mode**: https://vitest.dev/guide/browser/
- **WCAG 2.2**: https://www.w3.org/TR/WCAG22/
- **EAA**: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en
- **ADR Templates**: https://adr.github.io/
- **Green Web Foundation**: https://www.thegreenwebfoundation.org/
