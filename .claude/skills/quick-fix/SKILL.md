---
name: quick-fix
description: Fast iteration for bug fixes and minor features without full workflow. Use for bug fixes, small UI tweaks, minor features, refactoring, or documentation updates where the solution is straightforward.
---

# Quick Fix

No planning or design phases—straight to implementation.

## Workflow

1. **Understand**: Reproduce bug or clarify requirements
2. **Implement**: Follow [build.md](../../agents/build.md), minimal changes
3. **Test**: `npm run test && npm run lint && npm run build`
4. **Commit**: `fix:`, `feat:`, `refactor:`, etc.

## When to Use
Bug fixes, UI tweaks, minor features, refactoring, docs.

**Upgrade to `/feature-flow`** if architecture changes or new UI design needed.

## Guidelines
- Fix one thing at a time
- Don't refactor while fixing bugs
