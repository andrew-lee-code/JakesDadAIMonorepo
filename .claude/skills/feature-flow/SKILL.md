---
name: feature-flow
description: Complete AI workflow for new features requiring plan, architecture, design, implementation, and review phases. Use when building new features with UI components or when a structured approach with quality gates is needed.
---

# Feature Flow

Full feature lifecycle with approval gates.

## Phases

1. **Plan** → Read [plan.md](../../agents/plan.md), create spec. **Wait for approval.**

2. **Architect + Design** (parallel) → Read [architect.md](../../agents/architect.md) + [design.md](../../agents/design.md). **Wait for approval.**

3. **Build** → Read [build.md](../../agents/build.md), implement with tests. Verify: `npm run test && npm run build`. **Wait for approval.**

4. **Review & PR** → Read [review.md](../../agents/review.md). Run `npm run test:e2e:critical`. Get user approval before creating PR.

## When to Use
New features with UI, unclear requirements, or need for structured approach.

**Not for**: Bug fixes, small tweaks → use `/quick-fix`
