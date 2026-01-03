# PR Review Skill

**Usage**: `/pr-review [feature description]`

**Purpose**: Review implemented code and create professional pull request

## What This Skill Does

Automated code review and PR creation:

1. Review code quality against standards
2. Test functionality (manual + automated)
3. Verify design compliance and accessibility
4. Check security and performance
5. Create professional PR with comprehensive documentation

## When to Use

- After feature implementation is complete
- When you want thorough review before merging
- To ensure production quality standards

## Review Checklist

Read [.claude/agents/review.md](.claude/agents/review.md) and verify:

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

## Example Usage

```
User: /pr-review player comparison feature

Claude:
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
