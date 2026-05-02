# Technical Design: vue-architect-skill v1.0

## status
ready_to_build

---

## executive_summary

Implement a Vue-native architecture skill (`vue-architect`) scoped to the 2026 ecosystem. The deliverable is a local skill repository at `D:\Skills\vue-architect-skill\` that mirrors the `frontend-architect-skill` versioning convention (SKILL.md per version folder). The v1.0 artifact is `versions/v1.0/SKILL.md`, a 500–600 line single-file guide covering 13 Vue-specific sections derived from `docs/Evolución Vue.js_ Arquitectura Moderna y IA.md`. All version claims (Vite 6, Vue 3.5, etc.) are traceable to live URLs. Decision tables and anti-pattern blocks replace narrative text in every section.

---

## design_decisions

### 1. File Layout: Mirror frontend-architect Pattern

| Attribute | Choice | Rationale |
|-----------|--------|-----------|
| Versioning | `versions/v{major}.{minor}/SKILL.md` | Identical to frontend-architect v2.0 repo layout; enables skill loaders to discover versions deterministically |
| Master copy | `versions/v1.0/SKILL.md` | Spec requires v1.0 as the canonical original, with v2.0 and v2.0-lite as downstream variants |
| Backups | Not exported | No `.md.v1-backup` files; version control is the source of truth |

### 2. Content Depth: Line Count Budgets

| Artifact | Budget | Rationale |
|----------|--------|-----------|
| `versions/v1.0/SKILL.md` | 500–600 lines | Spec hard limit; verified via `wc -l` |
| `versions/v2.0-lite/SKILL.md` | 350–400 lines | Condensed reference; drops extended rationale but keeps all 13 sections and ≥1 table per section |
| `README.md` | 90–120 lines | Landing page: purpose, install, usage, version matrix |
| `LICENSE` | 201 lines | Apache-2.0 full text; unmodified |

### 3. Decision Table Patterns

| Pattern | Format | Example Location |
|---------|--------|------------------|
| Comparison matrices | GFM table | Section 1 (Vue Ecosystem), Section 6 (HTTP clients) |
| Decision trees | `if X → Y` bullets | Section 3 (Rendering Strategy) |
| Anti-pattern blocks | `⚠️ Anti-pattern:` prefix + `Do NOT` directive | Sections 1, 3, 4, 5, 6, 9, 10 |

**Rule**: Every section header (1–13) MUST contain at least one table or anti-pattern block. No exceptions.

### 4. Verification Methodology for Version Claims

| Claim | Live URL | Verification Action |
|-------|----------|---------------------|
| Vite 6 | https://vite.dev/blog/announcing-vite6 | `webfetch` HEAD; expect HTTP 200 |
| Tailwind 4 + PrimeVue 4 CSS layers | https://gearboxgo.com/articles/web-application-development/primevue-with-tailwind-40/ | `webfetch` GET; verify `@plugin "tailwindcss-primeui"` present in content |
| Axios March 2026 compromise | https://dev.to/asmaa-almadhoun/why-fetch-can-be-safer-than-axios-after-the-2026-axios-hack-6n5 | `webfetch` GET; verify date and versions cited |
| Pinia 3 / TanStack Query | https://pinia.vuejs.org/, https://tanstack.com/query | `webfetch` HEAD health check |

**Rule**: If a live URL fails (non-200), the build MUST emit a warning and fall back to a cached excerpt; the claim MUST NOT be removed or weakened.

### 5. Cross-References to Source Research

| Skill Section | Source Document Anchors |
|---------------|-------------------------|
| Toolchain (Rolldown, Vite 6 Env API) | "El Ecosistema VoidZero", "Vite 6, la API de Entornos" |
| Vapor Mode | "El Paradigma de Vapor Mode" |
| Design Systems (CSS layers) | "Evolución a Tailwind CSS 4", "Orquestación de PrimeVue 4" |
| Network (Axios ban, ofetch) | "Anatomía del Incidente de Seguridad de Marzo de 2026", "La Inmunidad Estructural de Fetch" |
| State (Pinia 3 vs Colada) | "El Rol Restringido de Pinia 3", "TanStack Query v5 y Pinia Colada" |
| AI-Ready | "Arquitectura Preparada para IA" |
| Accessibility (EAA / WCAG 2.2) | "Cumplimiento Regulatorio 2026" |

### 6. Skill Format: `SKILL.md` in `~/.config/opencode/skills/vue-architect/`

| Concern | Decision |
|---------|----------|
| Metadata block | YAML front-matter (`name`, `description`, `license`, `metadata.version`) identical to frontend-architect pattern |
| Trigger clause | Embedded in `description` to auto-load when Vue/Nuxt/PrimeVue/Pinia context is detected |
| Local install path | `~/.config/opencode/skills/vue-architect/SKILL.md` (or `D:\Skills\vue-architect-skill\` during build, then copy to user skills dir) |

---

## implementation_notes

### Content Sourcing Strategy
- **No hallucinated facts**: Every version number, CVE reference, and sizing metric must map to a paragraph in `docs/Evolución Vue.js_ Arquitectura Moderna y IA.md` or the live URL cited.
- **Runnable snippets**: All Vue SFC examples MUST include `<script setup>` and valid imports (`import { shallowRef } from 'vue'`).
- **No cross-section mixing**: Each of the 13 sections addresses exactly one concern. Cross-cutting concerns (e.g., security) are summarized within their native section and referenced, not duplicated.

### Line Count Control
- **Tables compress**: Use tables for comparisons instead of paragraphs.
- **Decision trees as bullets**: `if X → Y` lists are ~1 line per branch.
- **Anti-pattern blocks**: 3–4 lines each (`⚠️ Anti-pattern:` + example + correction).
- **Budget check**: After drafting v1.0, run `wc -l`. If >600, trim the "Decision Framework" examples first (they are expandable in v2.0).

### Verification CI (Recommended)
Add a lightweight verification script (Node or Python) that:
1. Reads `versions/v1.0/SKILL.md`
2. Counts lines (assert 500–600)
3. Regex-scans for 13 section headers in order
4. Asserts every section contains `|` (table) or `⚠️`
5. Head-requests every `https://` URL; warns on non-200

---

## file_structure

| Path | Action | Description |
|------|--------|-------------|
| `D:\Skills\vue-architect-skill\README.md` | Create | 90–120 line landing page |
| `D:\Skills\vue-architect-skill\LICENSE` | Create | Apache-2.0 full text (201 lines) |
| `D:\Skills\vue-architect-skill\versions\v1.0\SKILL.md` | Create | Canonical skill (500–600 lines) |
| `D:\Skills\vue-architect-skill\versions\v2.0\SKILL.md` | Create | Full reference (expanded version) |
| `D:\Skills\vue-architect-skill\versions\v2.0-lite\SKILL.md` | Create | Condensed reference (350–400 lines) |
| `D:\Skills\vue-architect-skill\docs\CHANGELOG.md` | Create | Version history |
| `D:\Skills\vue-architect-skill\docs\CONTRIBUTING.md` | Create | Contribution guidelines |
