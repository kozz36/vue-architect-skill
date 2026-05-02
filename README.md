# vue-architect-skill

Vue-native architecture skill for AI agents and senior architects.
Specialized in the Vue.js 2026 ecosystem: Vue 3.5+, Nuxt 4, Vite 6,
Tailwind 4, PrimeVue 4, Pinia 3, Pinia Colada, and WCAG 2.2 / EAA compliance.

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

| Version | Status | Best For |
|---------|--------|----------|
| v1.0 | Canonical | Stable baseline — all 13 sections, decision tables, anti-patterns |
| v2.0 | Reference | Expanded rationale and additional decision trees |
| v2.0-lite | Quick ref | Condensed 350–400 line cheat sheet |

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
│   └── v2.0-lite/
│       └── SKILL.md
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
cp versions/v1.0/SKILL.md ~/.config/opencode/skills/vue-architect/SKILL.md

# Windows
mkdir "%USERPROFILE%\.config\opencode\skills\vue-architect"
copy "versions\v1.0\SKILL.md" "%USERPROFILE%\.config\opencode\skills\vue-architect\SKILL.md"
```

2. The skill auto-triggers when Vue, Nuxt, PrimeVue, Pinia, or Vite are mentioned.

## Design Priorities

- **Vue-native**: Every decision is scoped to the Vue ecosystem (Nuxt, Vite, PrimeVue).
- **Decision tables**: Comparisons are tables, not paragraphs.
- **Anti-patterns**: Each section includes at least one `⚠️ Anti-pattern` block.
- **Verifiable claims**: Version claims reference live URLs (Vite 6, Tailwind 4, etc.).
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
