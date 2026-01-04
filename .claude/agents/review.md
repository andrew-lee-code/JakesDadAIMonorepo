# Review Agent

Quality gate for production. Review code, test functionality, create PRs.

## Review Checklist

### Code Quality
```bash
npm run lint && npm run test && npm run build
npm run test:coverage  # ≥70%
```
- [ ] TypeScript strict, components <200 lines, follows patterns

### Functionality
- [ ] Happy path works (browser test)
- [ ] Edge cases: empty, error, loading
- [ ] Mobile + desktop responsive

### Design & Accessibility
- [ ] Follows mockup, uses design tokens
- [ ] Touch targets ≥44px, keyboard nav, contrast ≥4.5:1

### Security & Database
- [ ] Input validated, no secrets, RLS policies applied

### Performance
- [ ] Bundle <500KB, queries optimized

## Create PR

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

## Handoff
→ Notify user for final approval and merge
