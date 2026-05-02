# Contributing to vue-architect-skill

## Scope

This skill is scoped to the Vue.js 2026 ecosystem.
Do not add generic frontend advice that belongs in `frontend-architect`.

## Pull Request Rules

1. **Line count budgets are hard limits**
   - `versions/v1.0/SKILL.md`: 500–600 lines
   - `versions/v2.0-lite/SKILL.md`: 350–400 lines
   - Run `wc -l` before committing.

2. **Every section must have a decision aid**
   - Either a GFM table or an `⚠️ Anti-pattern:` block.
   - No exceptions.

3. **Version claims need live URLs**
   - Cite `https://` sources for every version number, CVE, or sizing metric.
   - If a URL is dead, replace it or remove the claim.

4. **No cross-section duplication**
   - Each of the 13 sections addresses exactly one concern.
   - Cross-reference with hyperlinks, not copy-paste.

5. **Use the existing file structure**
   - Canonical artifact: `versions/v{version}/SKILL.md`
   - Meta docs: `docs/CHANGELOG.md`, `docs/CONTRIBUTING.md`

## Versioning Policy

- **v1.0**: Frozen baseline. Patch-level typo fixes only.
- **v2.0**: Active development. New features, expanded rationale.
- **v2.0-lite**: Always derived from v2.0. Must stay under 400 lines.

## Verification

```bash
node scripts/verify.js
```
