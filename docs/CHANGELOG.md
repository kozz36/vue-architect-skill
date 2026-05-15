# Changelog

## [v3.0] - 2026-05-15

### Added
- Added `versions/v3.0/SKILL.md` using the skill-creator compact runtime contract.
- Added `versions/v3.0/references/technical-reference.md` as the curated v3.0 technical basis.
- Added `versions/v3.0/references/source-index.md` for source links and verification status.

### Changed
- Validated v3.0 technical reference against current May 2026 sources and corrected stale or over-strong claims.
- Curated v3.0 references so they are robust local technical bases rather than historical lite dumps.
- Preserved existing lite versions for backward compatibility; v3.0 is the new references-based skill version.

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-05-01

### Added
- Initial v1.0 SKILL.md with 13 sections:
  1. Vue Ecosystem & Core Evolution
  2. Toolchain & Build Pipeline
  3. Rendering Strategy
  4. Design Systems
  5. State Architecture
  6. Network & Security
  7. Performance & Core Web Vitals
  8. Testing Strategy
  9. Accessibility
  10. AI-Ready Architecture
  11. Governance: ADRs
  12. Green Web & DX
  13. Decision Framework
- v2.0 full reference (expanded rationale)
- v2.0-lite condensed quick-reference (350–400 lines)
- Apache-2.0 license
- Verification script (`scripts/verify.js`) for build-time checks
- CHANGELOG and CONTRIBUTING docs

### Relationships
- Complements `frontend-architect-skill`: use `frontend-architect` to choose Vue, then `vue-architect` to design the Vue stack
- Replaces `vue-admin`: `vue-admin` was component-level only (too narrow)
