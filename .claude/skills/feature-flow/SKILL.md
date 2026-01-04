---
name: feature-flow
description: Complete AI workflow for new features requiring plan, architecture, design, implementation, and review phases. Use when building new features with UI components or when a structured approach with quality gates is needed.
---

# Feature Flow Skill

Full feature lifecycle with quality gates at each phase.

## Phases

### 1. Planning
Read [plan.md](../../agents/plan.md) → Create spec (problem, solution, requirements, success criteria, out of scope).

**Wait for approval.**

### 2. Solutioning (Parallel)
- **Architect** ([architect.md](../../agents/architect.md)): Technical approach, data model, API design
- **Designer** ([design.md](../../agents/design.md)): UI mockup in `apps/mockups/`

**Wait for approval.**

### 3. Implementation
Read [build.md](../../agents/build.md) → Implement DB, backend, frontend, tests (≥70% coverage).

Verify: `npm run test && npm run lint && npm run build`

**Wait for approval.**

### 4. Review & PR
Read [review.md](../../agents/review.md) → Code quality, functionality, accessibility, create PR.

## When to Use
- New features with UI
- Structured approach with quality gates
- Unclear requirements needing exploration

**Not for**: Bug fixes, small tweaks (use `/quick-fix`)
