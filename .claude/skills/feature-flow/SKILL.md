---
name: feature-flow
description: Complete AI workflow for new features requiring plan, architecture, design, implementation, and review phases. Use when building new features with UI components or when a structured approach with quality gates is needed.
---

# Feature Flow

Full feature lifecycle with approval gates.

## Phases

1. **Plan** → Use `EnterPlanMode`, explore codebase, create comprehensive plan, `ExitPlanMode`.

2. **Architect + Design (parallel)** → Use `frontend-design` skill to create mockups in `apps/mockups/`. Read [architect.md](../../agents/architect.md) for architecture blueprint. **STOP - Wait for user approval.**

3. **Build** → Read [build.md](../../agents/build.md), implement in main app with tests. Verify: `npm run test && npm run build`. **STOP - Wait for user approval.**

4. **Review & PR** → Read [review.md](../../agents/review.md). Run `npm run test:e2e:critical`. Get user approval, then create PR.

## When to Use

New features with UI, unclear requirements, or need for structured approach.

**Not for**: Bug fixes, small tweaks → use `/quick-fix`
