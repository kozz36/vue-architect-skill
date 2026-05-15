# vue-architect-skill

> **Vue-specialized** architecture skill providing **2026 ecosystem expertise** for projects
> **already using Vue.js**. Covers Vue 3.5+, Nuxt 4, Vite 8, Tailwind 4, PrimeVue 4,
> Pinia 3, Pinia Colada, TanStack Query, Vitest + Playwright, and WCAG 2.2 / EAA compliance.
>
> **Scope**: This skill triggers AFTER the team has already chosen Vue. For framework
> selection (React vs Vue vs Svelte, etc.), use `frontend-architect-skill` instead.

## When to Use

This skill triggers automatically when the conversation touches:

- Building with Vue 3 or Nuxt 4
- Choosing PrimeVue or configuring Tailwind 4 CSS layers
- Setting up Pinia, Pinia Colada, or TanStack Query in Vue
- Rendering strategy decisions (SPA, SSR, SSG, ISR, PPR)
- Establishing Vitest + Playwright testing for Vue
- Accessibility audits for EU-facing Vue apps (EAA)
- Structuring a Vue repo for AI agents (Cursor, Claude Code)
- Writing Architecture Decision Records (ADRs) for Vue stacks

## Version Matrix

| Version   | Status               | Best For                                                                                        |
| --------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| v3.0      | Current              | Compact runtime contract with curated references and May 2026 source index                      |
| v2.0      | Historical           | Expanded rationale; preserved for backward compatibility, verify claims against v3 before reuse |
| v2.0-lite | Historical quick ref | Preserved for backward compatibility; v3.0 replaces it for active runtime ingestion             |
| v1.0      | Historical baseline  | Preserved for backward compatibility                                                            |

## Repository Structure

```
.
├── README.md
├── LICENSE
├── versions/
│   ├── v1.0/
│   │   └── SKILL.md
│   ├── v2.0/
│   │   └── SKILL.md
│   ├── v2.0-lite/
│   │   └── SKILL.md
│   └── v3.0/
│       ├── SKILL.md
│       └── references/
│           ├── technical-reference.md
│           └── source-index.md
└── docs/
    ├── CHANGELOG.md
    └── CONTRIBUTING.md
```

## Quick Start

### Install as a local OpenCode skill

1. Copy or symlink the version you want:

```bash
# Linux / macOS
mkdir -p ~/.config/opencode/skills/vue-architect
cp versions/v3.0/SKILL.md ~/.config/opencode/skills/vue-architect/SKILL.md

# Windows
mkdir "%USERPROFILE%\.config\opencode\skills\vue-architect"
copy "versions\v3.0\SKILL.md" "%USERPROFILE%\.config\opencode\skills\vue-architect\SKILL.md"
```

2. The skill auto-triggers when Vue, Nuxt, PrimeVue, Pinia, or Vite are mentioned.

## Design Priorities

- **Vue-native**: Every decision is scoped to the Vue ecosystem (Nuxt, Vite, PrimeVue).
- **Decision tables**: Comparisons are tables, not paragraphs.
- **Anti-patterns**: Each section includes at least one `⚠️ Anti-pattern` block.
- **Verifiable claims**: Active v3 claims reference `versions/v3.0/references/source-index.md` (Vite 8, Tailwind 4, etc.).
- **AI-ready**: Governance files (`CLAUDE.md`, `.cursorrules`) and composable-first architecture.

## Verification

Run the lightweight verification script (recommended after edits):

```bash
node scripts/verify.js
```

Checks:

- Line count budgets (v1.0: 500–600, v2.0-lite: 350–400)
- 13 sections in order
- Every section has ≥1 table or anti-pattern block
- All `https://` URLs are reachable

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## Changelog

See [docs/CHANGELOG.md](docs/CHANGELOG.md).

## License

Apache-2.0 — see [LICENSE](LICENSE).

## Related Skills

- **[frontend-architect-skill](https://github.com/kozz36/frontend-architect-skill)** — Framework selection (React vs Vue vs Angular). Use this FIRST if you haven't chosen your stack yet.
- **[backend-architect-skill](https://github.com/kozz36/backend-architect-skill)** — API design, database architecture, auth patterns, caching, and scaling decisions.
