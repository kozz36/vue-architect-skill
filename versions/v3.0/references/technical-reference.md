# Vue Architecture Technical Reference

This is the curated v3.0 technical basis for architecture decisions. It contains the detailed matrices, decision trees, anti-patterns, commands, and operational guidance that are intentionally too large for `../SKILL.md`.

## How to Use This Reference

- Read `../SKILL.md` first for activation, hard rules, and output contract.
- Use this file only when a decision needs deeper technical detail.
- Treat version-sensitive claims as requiring verification through `source-index.md` before updating changelogs or making new recommendations.

## Reference Scope

Vue/Nuxt/Vite, PrimeVue/Tailwind, state, network, testing, accessibility, AI-ready, and governance decisions.

## Provenance

This reference was curated for v3.0 from `versions/v2.0-lite/SKILL.md`. The previous lite skill remains preserved for backward compatibility; this file is now the local technical reference for v3.0, not a runtime skill.

---

## 1. Vue Ecosystem & Core Evolution

| Version | Status | Key Feature | Best For |
|---------|--------|-------------|----------|
| Vue 3.5 | Stable (LTS) | Stable reactivity | Production apps |
| Vue 3.6 beta.12 | Experimental prerelease | Vapor Mode (no VDOM) | Perf-critical sub-trees only after profiling |
| Nuxt 4.4.x | Stable | Nitro engine, Layers | Full-stack Vue, SEO |

**Key fact**: VoidZero consolidates Rust tooling around Oxlint, Oxfmt, Rolldown, and the Vite ecosystem. Vite 8 is the current supported major as of May 2026.

**Source**: https://medium.com/@revanthkumarpatha/vue-js-in-2025-vue-js-roadmap-2026-a-clear-performance-first-future-0b3ddabd7b00

```
Greenfield? → Vue 3.5+ (<script setup> mandatory)
  Need SSR/API routes? → Nuxt 4.4+
  SPA admin? → Vite 8
```

| Approach | Bundle | Memory |
|----------|--------|--------|
| Virtual DOM | Larger runtime | VNode churn |
| Vapor Mode | ~30-40% smaller | Near-zero VNode allocation |

⚠️ Anti-pattern: Vapor Mode on the entire app without profiling.
Opt-in per component only.

---

## 2. Toolchain & Build Pipeline

| Concern | Vite 8 Solution |
|---------|-----------------|
| SPA vs SSR config | Environment API unifies graphs |
| CSS minification | Lightning CSS (default prod) |
| JSON serialization | Optimized JSON.stringify |

```js
export default { css: { transformer: 'lightningcss' } }
```

**Tailwind 4**: `@import "tailwindcss";` replaces `@tailwind base/components`.
Install `@tailwindcss/vite`. No PostCSS.

| Tailwind 3.x | Tailwind 4.0 |
|--------------|--------------|
| `tailwind.config.js` monolith | Tokens in CSS / TypeScript |
| `@tailwind base; @tailwind components;` | `@import "tailwindcss";` |
| Manual `@layer` config | Automated layer structure in compiler |

Vite 8 ships with Rolldown as the unified bundler pipeline; prefer Vite 8 for new Vue/Vite projects unless project constraints require an older supported major.

**Source**: https://vite.dev/blog/announcing-vite8

⚠️ Anti-pattern: Adding unnecessary PostCSS plumbing for Tailwind in a modern Vite project. Use `@tailwindcss/vite` when Vite integration is available.

---

## 3. Rendering Strategy

| Context | Decision | Rationale |
|---------|----------|-----------|
| B2B + SEO | Nuxt 4 SSR/SSG | Nitro engine, file-based routing |
| Admin dashboard | Vite 8 SPA | Zero SSR complexity, fast HMR |
| Real-time portal | Nuxt 4 ISR/PPR | Hybrid edge rendering |
| Vue 2 legacy | Nuxt Bridge → Nuxt 4 | Incremental adoption |
| Content-heavy | Nuxt 4 SSG + islands | Minimal JS |

```
Static?   → SSG
Dynamic?  → SSR
Mix?      → ISR/PPR
No SEO?   → SPA
```

Nuxt Layers: shared base layer with components + composables, extended via Giget (`github:org/base`).

⚠️ Anti-pattern: SSR for an internal admin panel.
SSR adds hydration complexity with zero SEO benefit inside a VPN.

---

## 4. Design Systems

**Layer order**: `theme < base < primevue < components < utilities`

```css
@import "tailwindcss";
@plugin "tailwindcss-primeui";
```

```js
createApp(App).use(PrimeVue, {
  cssLayer: { order: 'theme, base, primevue, components, utilities' }
})
```

**Source**: https://primevue.org/tailwind/

| Need | Decision |
|------|----------|
| Full brand control + headless | Ark UI (Vue) + Tailwind 4 |
| Fast delivery + DataTable/Charts | PrimeVue 4 + Tailwind 4 |
| Admin panels | PrimeVue 4 (standard 2026 stack) |

| Layer | Purpose |
|-------|---------|
| theme | Aura tokens |
| base | Tailwind base |
| primevue | PrimeVue component styles |
| components | Project components |
| utilities | Tailwind utilities (highest specificity) |

⚠️ Anti-pattern: Hardcoding utility classes in 47 components.
Centralize tokens; override via CSS variables for theming.

---

## 5. State Architecture

| Concern | Tool | Scope |
|---------|------|-------|
| Server state | TanStack Query v5 / Pinia Colada | API caching, sync |
| Client state | Pinia 3 | Theme, sidebar, wizard |
| Local state | ref / reactive | Single component |
| Form state | VeeValidate + Zod | Validation |

```
Server data?  → TanStack Query / Pinia Colada
UI global?    → Pinia 3
UI local?     → ref / reactive
Form?         → VeeValidate + Zod
```

⚠️ Anti-pattern: Storing API arrays in Pinia 3.
Migrate to `useQuery({ queryKey: ['users'], queryFn: fetchUsers })`.

---

## 6. Network & Security

| Client | Base | Size | Verdict |
|--------|------|------|---------|
| ofetch | Fetch | ~6kb | **Default** — Nuxt/Vue standard |
| xior.js | Fetch | ~3kb | Axios migration clone |
| ky | Fetch | ~5kb | Mature pioneer |
| **Axios** | XHR | ~13kb | Use only with pinned safe versions, lockfile integrity, and supply-chain monitoring |

**Source**: Axios compromise confirmed by axios postmortem, Datadog, Snyk, and Microsoft security reporting.

Axios was supply-chain compromised March 2026 (malicious 1.14.1 / 0.30.4 with RAT dropper via `plain-crypto-js`).

```
New project?     → ofetch
Legacy Axios?    → xior.js then replace interceptors
Need retries?    → ofetch supports hooks
```

### Security Checklist

```
□ No secrets in localStorage / sessionStorage / IndexedDB
□ Cookies: HttpOnly + Secure + SameSite=Strict
□ CSP header configured
□ npm audit in CI blocks on critical vulns
□ All admin routes server-gated
□ No sensitive data in URL params
```

⚠️ Anti-pattern: Adding `axios` to a new project's `package.json`.

---

## 7. Performance & Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| LCP | ≤ 2.5s | 2.5-4.0s | > 4.0s |
| INP | ≤ 200ms | 200-500ms | > 500ms |
| CLS | ≤ 0.1 | 0.1-0.25 | > 0.25 |

- `defineAsyncComponent` for lazy loading
- `nuxt/image`, WebP/AVIF
- `shallowRef` for large data sets

⚠️ Anti-pattern: Using `ref` for large JSON payloads from APIs.
Use `shallowRef` to avoid deep reactivity traversal.

---

## 8. Testing Strategy

| Layer | Tool | Notes |
|-------|------|-------|
| Unit + Component | Vitest 4 | Vite-native, Browser Mode available |
| Component (browser) | vitest-browser-vue | Snapshots, ARIA |
| E2E | Playwright | Critical paths, cross-browser |
| Nuxt integration | @nuxt/test-utils | SSR hydration tests |

**Source**: https://vitest.dev/guide/browser/

### Playwright Best Practices

- Isolated browser contexts per test (no shared state)
- Page Object Model for selectors
- Prefer `getByRole` over fixed timeouts
- Visual regression on Linux CI only

⚠️ Anti-pattern: Using Cypress for new Vue projects unless legacy suite exists.
Playwright + Vitest 4 is the validated May 2026 testing baseline for Vue projects.

---

## 9. Accessibility

**Target**: WCAG 2.2 AA (mandatory under EAA since June 2025).
Penalties and market actions are defined by Member State implementation; verify the target jurisdiction.

**Source**: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en

| Criterion | Action |
|-----------|--------|
| 2.4.11 Focus Not Obscured | Managed z-index (PrimeVue Dialog) |
| 2.5.8 Target Size | WCAG 2.2 AA minimum is 24×24 CSS px; prefer 44×44 px as an enhanced touch baseline |
| 3.3.7 Redundant Entry | Persist wizard state in Pinia 3 |
| 3.3.8 Accessible Auth | WebAuthn / password manager |

PrimeVue documents WCAG 2.1 AA compliance guidance per component, but open issues show teams must still test keyboard, focus, and contrast behavior in their own themes.
Automated tools catch only 30-40% of issues; manual testing is mandatory for payment flows.

⚠️ Anti-pattern: Relying only on automated a11y scans for EU-facing products.
Provide manual testing evidence (VPAT/ACR documentation).

---

## 10. AI-Ready Architecture

Required repo files:
- `CLAUDE.md` / `.cursorrules` (boundaries)
- Composable-first architecture
- `shallowRef` for large data

SFC rules for AI:
1. `<script setup>` mandatory
2. Props down, Events up
3. Externalize logic to typed composables
4. Keep components under token window
5. Reserve `v-model` for atomic inputs

| Rule | Implementation |
|------|----------------|
| Script order | `<script setup>` mandatory at top |
| Data flow | Props down, Events up |
| Deep reactivity | Avoid for large arrays; use `shallowRef` |
| Composables | Typed, single-purpose, externalized |

⚠️ Anti-pattern: "Freestyling" — AI without architectural boundaries.
Also: Do NOT generate components without `<script setup>`; the compiler cannot optimize for Vapor Mode.

---

## 11. Governance: ADRs

| Status | Meaning |
|--------|---------|
| Proposed | Under discussion |
| Accepted | Active decision |
| Deprecated | Superseded by newer ADR |
| Obsolete | No longer relevant |

ADR template must include: Context, Decision Drivers, Decision, Alternatives Considered (table), Consequences.

| Decision | Example |
|----------|---------|
| Adopt Vapor Mode | Component-level migration ADR |
| Migrate to ofetch | Security boundary ADR |
| Choose ISR vs SSR | Rendering strategy ADR |

Store in `/docs/adr/`.
One ADR per decision; immutable; review in PRs.

⚠️ Anti-pattern: Changing architecture without an ADR.
ADRs prevent AI semantic drift and knowledge loss.

---

## 12. Green Web & DX

| Technique | Impact |
|-----------|--------|
| WebP/AVIF images | Up to 70% weight reduction |
| Font subsetting | Load only glyphs used |
| Route-based code splitting | Conditional module loading |
| Vapor Mode (opt-in) | Reduced bundle + GC pressure |
| Green hosting audit | Verify 100% renewable (Green Web Foundation API) |

- Carbon target: ≤ 0.36g CO2/page view
- `strict: true` in `tsconfig.json`
- pnpm + Turborepo (small-mid) / Nx (large)
- Vite 8 current supported major; verify exact HMR performance in the target project
- Nuxt Layers for deduplication across monorepo apps

⚠️ Anti-pattern: Shipping a full Vue runtime for a mostly static marketing page.
Use Astro or Nuxt SSG with islands.

---

## 13. Decision Framework

### Vue-only stack selector

- if admin panel / internal tool → SPA (Vite 8 + PrimeVue 4 + Pinia 3)
- if SaaS with mixed SEO → Nuxt 4 SSR/ISR
- if content-heavy / blog → Astro 5 (Vue islands) or Nuxt Content SSG
- if PWA / mobile-first → Nuxt 4 + vite-plugin-pwa
- if enterprise / strict governance → Nuxt 4 + PrimeVue 4 + Vitest 4 + Playwright

```
Admin, no SEO:
  → Vue 3.5 + Vite 8 + PrimeVue 4 + Pinia 3 + Pinia Colada + Vitest + Playwright
SaaS, mixed SEO:
  → Nuxt 4 + PrimeVue/Ark + Pinia Colada + Vitest + Playwright
Content, SEO critical:
  → Nuxt 4 SSG + ISR
E-commerce, high perf:
  → Nuxt 4 hybrid rendering; keep Vapor Mode experimental until Vue 3.6 stabilizes
Enterprise, strict:
  → Nuxt 4 + Nx + ADR docs/adr/ + WCAG 2.2 AA
```

### Red Flags

- CSS-in-JS with SSR → Tailwind 4
- Pinia holding server data → Pinia Colada / TanStack Query
- Custom ARIA → PrimeVue 4 / Ark UI
- Skipping TypeScript on team projects >3 mo
- Webpack → Vite 8
- Axios → `ofetch`
- JWT in localStorage → HttpOnly Secure SameSite=Strict cookies
- No ADRs on >2 dev projects
- Omitting a11y CI → EAA legal risk

⚠️ Anti-pattern: Choosing a stack in isolation without team skill assessment.
Nuxt 4 for a Vue 2 team with no migration budget guarantees project failure.

---

## Resources

- **Vue**: https://vuejs.org/
- **Nuxt 4**: https://nuxt.com/
- **Vite 8**: https://vite.dev/blog/announcing-vite8
- **PrimeVue 4**: https://primevue.org/tailwind/
- **Pinia Colada**: https://pinia-colada.esm.dev/
- **TanStack Query Vue**: https://tanstack.com/query/latest/docs/framework/vue/overview
- **ofetch**: https://github.com/unjs/ofetch
- **Vitest Browser**: https://vitest.dev/guide/browser/
- **WCAG 2.2**: https://www.w3.org/TR/WCAG22/
- **EAA**: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en
