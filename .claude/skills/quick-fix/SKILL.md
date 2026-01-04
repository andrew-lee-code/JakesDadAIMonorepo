---
name: quick-fix
description: Fast iteration for bug fixes and minor features without full workflow. Use for bug fixes, small UI tweaks, minor features, refactoring, or documentation updates where the solution is straightforward.
---

# Quick Fix Skill

Streamlined workflow—no planning or design phases.

## Workflow

### 1. Understand
- **Bugs**: Reproduce, identify root cause, plan minimal fix
- **Features**: Clarify requirements, identify files, plan implementation

### 2. Implement
Follow [build.md](../../agents/build.md): Minimal changes, existing patterns, keep simple.

### 3. Test
```bash
npm run test && npm run lint && npm run build && npm run dev
```
Add regression test for bug fixes. Test edge cases.

### 4. Commit
Use conventional commits: `fix:`, `feat:`, `refactor:`, `test:`, `docs:`, `style:`

## When to Use
- Bug fixes, UI tweaks, minor features
- Refactoring, documentation
- Solution is clear

**Upgrade to `/feature-flow`** if: architecture changes needed, unclear requirements, new UI design required.

## Guidelines
- Fix one thing at a time
- Don't refactor while fixing bugs
- Still follow code standards and write tests
