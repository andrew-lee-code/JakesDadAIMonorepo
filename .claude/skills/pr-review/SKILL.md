---
name: pr-review
description: Review implemented code and create professional pull request. Use when code review is needed or when creating a PR for completed work that needs quality verification.
---

# PR Review Skill

Code review and PR creation with quality checks.

## Review Process

Read [review.md](../../agents/review.md) and verify:

### Quality Checks
```bash
npm run lint && npm run test && npm run build
npm run test:coverage  # ≥70%
```

### Checklist
- [ ] TypeScript strict (no `any`), components <200 lines
- [ ] Happy path + edge cases work (mobile + desktop)
- [ ] Design tokens used, touch targets ≥44px, keyboard nav works
- [ ] Input validated, no secrets, RLS policies applied
- [ ] Bundle <500KB, queries optimized

## PR Creation

```bash
gh pr create --title "feat: [Feature]" --body "$(cat <<'EOF'
## Summary
[What and why]

## Changes
- Change 1
- Change 2

## Testing
- [x] Manual testing (mobile + desktop)
- [x] Tests pass, build successful
- [x] Accessibility verified

🤖 Generated with Claude Code
EOF
)"
```

## When to Use
- After implementation is complete
- Thorough review before merging
- Ensure production standards
