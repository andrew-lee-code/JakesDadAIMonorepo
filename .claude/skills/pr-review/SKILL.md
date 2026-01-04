---
name: pr-review
description: Review implemented code and create professional pull request. Use when code review is needed or when creating a PR for completed work that needs quality verification.
---

# PR Review Skill

Code review, E2E testing, user approval, and PR creation.

## Review Process

Read [review.md](../../agents/review.md) and verify:

### 1. Quality Checks
```bash
npm run lint && npm run test && npm run build
```

### 2. E2E Testing (REQUIRED)
```bash
# Critical flow tests MUST pass before PR
npm run test:e2e:critical
```

If tests fail, fix issues and re-run until all pass.

### 3. Code Review Checklist
- [ ] TypeScript strict (no `any`), components <200 lines
- [ ] Happy path + edge cases work (mobile + desktop)
- [ ] Design tokens used, touch targets ≥44px, keyboard nav works
- [ ] Input validated, no secrets, RLS policies applied
- [ ] Bundle <500KB, queries optimized

## User Approval Gate (REQUIRED)

**Before creating PR:**

1. Display E2E test results
2. Summarize all changes made
3. Ask user for approval using AskUserQuestion:
   - "Create PR now"
   - "Manual testing first" (wait for user to test locally)
   - "Review specific areas"

4. **WAIT** for explicit user approval - do NOT create PR automatically

## PR Creation (After Approval)

```bash
gh pr create --title "feat: [Feature]" --body "$(cat <<'EOF'
## Summary
[What and why]

## Changes
- Change 1
- Change 2

## Testing
- [x] E2E critical flow tests pass
- [x] Manual testing (mobile + desktop)
- [x] Unit tests pass, build successful
- [x] Accessibility verified

🤖 Generated with Claude Code
EOF
)"
```

## When to Use
- After implementation is complete
- Thorough review before merging
- Ensure production standards
