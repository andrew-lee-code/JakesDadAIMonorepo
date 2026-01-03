---
name: pr-review
description: Review implemented code and create professional pull request. Use when code review is needed or when creating a PR for completed work that needs quality verification.
---

# PR Review Skill

Automated code review and PR creation with comprehensive quality checks.

## Review Process

Read [.claude/agents/review.md](../../agents/review.md) and perform:

1. Code quality review against standards
2. Functionality testing (manual + automated)
3. Design compliance and accessibility verification
4. Security and performance checks
5. Professional PR creation with comprehensive documentation

## Review Checklist

### Code Quality
```bash
npm run lint              # No errors
npm run test              # All pass
npm run build             # Successful
npm run test:coverage     # ≥70%
```

- [ ] TypeScript strict mode (no `any`)
- [ ] Components <200 lines
- [ ] Follows existing patterns
- [ ] No unnecessary complexity

### Functionality
- [ ] Happy path works (test in browser)
- [ ] Edge cases handled (empty, error, loading)
- [ ] Mobile + desktop responsive
- [ ] Data persists correctly

### Design & Accessibility
- [ ] Follows design mockup
- [ ] Uses design tokens (teal, gold, spacing)
- [ ] Touch targets ≥44x44px
- [ ] Keyboard navigation works
- [ ] Color contrast ≥4.5:1

### Security & Database
- [ ] User input validated
- [ ] No secrets committed
- [ ] RLS policies applied
- [ ] Migrations tested

### Performance
- [ ] Bundle <500KB
- [ ] No unnecessary re-renders
- [ ] Database queries optimized

## PR Creation

After review passes, create PR:

```bash
gh pr create --title "feat: [Feature]" --body "$(cat <<'EOF'
## Summary
[What changed and why]

## Changes
- Change 1
- Change 2

## Testing
- [x] Manual testing (mobile + desktop)
- [x] Unit tests pass
- [x] Build successful
- [x] Accessibility verified

## Screenshots
[If UI changes]

## Review Checklist
- [x] Code quality verified
- [x] Design system followed
- [x] Tests written (≥70%)
- [x] Security reviewed
- [x] Performance acceptable
EOF
)"
```

## When to Use

- After feature implementation is complete
- When you want thorough review before merging
- To ensure production quality standards

## Example

```
User: Please review the player comparison feature and create a PR

Claude: I'll use the pr-review skill to thoroughly review and create a professional PR.

Running code review for player comparison feature...

✅ Code Quality
- Lint: Pass
- Tests: Pass (78% coverage)
- Build: Successful
- TypeScript: Strict mode, no any

✅ Functionality
- Happy path tested
- Edge cases handled
- Mobile/desktop responsive

✅ Design & Accessibility
- Follows design mockup
- Touch targets ≥44px
- Keyboard navigation works
- WCAG 2.1 AA compliant

✅ Security
- Input validation present
- RLS policies applied

⚠️ Performance
- Bundle size: 487KB (within limit)
- Consider lazy loading player images

Creating pull request...
[Creates PR with full documentation]
```

## Output

Professional PR with:
- Clear summary of changes
- Comprehensive testing checklist
- Screenshots (if UI changes)
- Review notes
- Link to PR for user approval
